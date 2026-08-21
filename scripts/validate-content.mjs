#!/usr/bin/env node
/**
 * Directory-aware content validator.
 *
 * Walks content recursively for .mdx files (except partials prefixed with `_`)
 * and enforces the frontmatter contract for each collection. Exits non-zero on
 * failure so it gates CI. Integrity rules (see the Remediation plan):
 *   - every file is dated (last_reviewed or updated) — undated content is wrong content
 *   - compliance/technical content cites primary sources
 *   - files marked `stub: true` must carry an explicit last_reviewed date
 *   - a last_reviewed date warns after 9 months and fails after 12
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative, basename } from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, "content");

const CATEGORIES = ["GRC", "Cloud", "AI", "Privacy", "Operational Resilience"];
const STATUSES = ["draft", "in-progress", "published"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

/** Collections whose content makes compliance/technical claims and must cite sources. */
const SOURCED = new Set(["frameworks", "ai-security", "cloud", "labs"]);

/** Per-collection required scalar fields + enum constraints. */
const COLLECTIONS = {
  frameworks: { required: ["category", "status"], enums: { category: CATEGORIES, status: STATUSES } },
  labs: { required: ["difficulty", "duration"], enums: { difficulty: DIFFICULTIES } },
  blog: { required: ["author", "date"], enums: {} },
  "ai-security": { required: ["kind"], enums: { kind: ["Framework", "Threat", "Practice"] } },
  cloud: { required: ["kind"], enums: { kind: ["Provider", "Practice", "Concept"] } },
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const NOW = new Date();
const monthsBetween = (d) => (NOW - new Date(d)) / (1000 * 60 * 60 * 24 * 30.4);

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.isFile() && e.name.endsWith(".mdx") && !basename(e.name).startsWith("_")) out.push(full);
  }
  return out;
}

function collectionOf(relPath) {
  const parts = relPath.split(/[\\/]/);
  const idx = parts.indexOf("content");
  return idx >= 0 ? parts[idx + 1] : undefined;
}

const files = await walk(CONTENT_DIR);
const errors = [];
const warnings = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  let data;
  try {
    ({ data } = matter(await readFile(file, "utf8")));
  } catch {
    errors.push(`${rel}: malformed frontmatter`);
    continue;
  }

  const collection = collectionOf(rel);
  const rules = COLLECTIONS[collection] ?? { required: [], enums: {} };

  for (const key of ["title", "slug", "summary", ...rules.required]) {
    if (!data[key]) errors.push(`${rel}: missing required field "${key}"`);
  }
  for (const [key, allowed] of Object.entries(rules.enums)) {
    if (data[key] && !allowed.includes(data[key])) {
      errors.push(`${rel}: invalid ${key} "${data[key]}" (expected ${allowed.join(", ")})`);
    }
  }

  // Dating: last_reviewed (preferred) or updated; must be a valid ISO date.
  // YAML auto-parses unquoted dates to Date objects — normalize both forms.
  const rawDate = data.last_reviewed ?? data.updated;
  const reviewDate = rawDate instanceof Date ? rawDate.toISOString().slice(0, 10) : String(rawDate ?? "");
  if (!rawDate) {
    errors.push(`${rel}: missing a review date (last_reviewed or updated)`);
  } else if (!DATE_RE.test(reviewDate)) {
    errors.push(`${rel}: review date must be ISO (YYYY-MM-DD)`);
  } else {
    const age = monthsBetween(reviewDate);
    if (age > 12) errors.push(`${rel}: content is stale (last reviewed ${Math.round(age)} months ago)`);
    else if (age > 9) warnings.push(`${rel}: review is ${Math.round(age)} months old — refresh soon`);
  }

  // Stubs must be explicitly dated with last_reviewed.
  if (data.stub === true && !data.last_reviewed) {
    errors.push(`${rel}: stub must have an explicit last_reviewed date`);
  }

  // Sourced collections must cite at least one primary source.
  if (SOURCED.has(collection)) {
    if (!Array.isArray(data.sources) || data.sources.length === 0) {
      errors.push(`${rel}: missing sources (at least one primary source required)`);
    }
  }
}

for (const w of warnings) console.warn(`⚠ ${w}`);

if (errors.length) {
  console.error(`✗ Content validation failed (${errors.length} issue(s)):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`✓ Content validation passed (${files.length} file(s) checked, ${warnings.length} warning(s)).`);
