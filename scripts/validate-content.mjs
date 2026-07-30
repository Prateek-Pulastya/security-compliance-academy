#!/usr/bin/env node
/**
 * Zero-dependency, directory-aware content validator.
 *
 * Walks content recursively for .mdx files and checks each one (except partials
 * prefixed with `_`) against the frontmatter contract for its collection. Exits
 * non-zero on failure so it can gate CI. See content/README.md.
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative, basename } from "node:path";

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, "content");

const BASE_REQUIRED = ["title", "slug", "summary", "updated"];

const CATEGORIES = ["GRC", "Cloud", "AI", "Privacy", "Operational Resilience"];
const STATUSES = ["draft", "in-progress", "published"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

/** Per-collection rules keyed by top-level directory under content/. */
const COLLECTIONS = {
  frameworks: {
    required: ["category", "status"],
    enums: { category: CATEGORIES, status: STATUSES },
  },
  labs: {
    required: ["difficulty", "duration"],
    enums: { difficulty: DIFFICULTIES },
  },
  blog: {
    required: ["author", "date"],
    enums: {},
  },
};

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
    else if (e.isFile() && e.name.endsWith(".mdx") && !basename(e.name).startsWith("_")) {
      out.push(full);
    }
  }
  return out;
}

function parseFrontmatter(text) {
  if (!text.startsWith("---")) return null;
  const end = text.indexOf("\n---", 3);
  if (end === -1) return null;
  const block = text.slice(3, end).trim();
  const data = {};
  for (const line of block.split("\n")) {
    const m = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (m) data[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
  }
  return data;
}

function collectionOf(relPath) {
  const parts = relPath.split(/[\\/]/);
  const idx = parts.indexOf("content");
  return idx >= 0 ? parts[idx + 1] : undefined;
}

const files = await walk(CONTENT_DIR);
const errors = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  const text = await readFile(file, "utf8");
  const fm = parseFrontmatter(text);
  if (!fm) {
    errors.push(`${rel}: missing or malformed YAML frontmatter`);
    continue;
  }

  const rules = COLLECTIONS[collectionOf(rel)] ?? { required: [], enums: {} };
  const required = [...BASE_REQUIRED, ...rules.required];

  for (const key of required) {
    if (!fm[key]) errors.push(`${rel}: missing required frontmatter field "${key}"`);
  }
  for (const [key, allowed] of Object.entries(rules.enums)) {
    if (fm[key] && !allowed.includes(fm[key])) {
      errors.push(`${rel}: invalid ${key} "${fm[key]}" (expected ${allowed.join(", ")})`);
    }
  }
  if (fm.updated && !/^\d{4}-\d{2}-\d{2}$/.test(fm.updated)) {
    errors.push(`${rel}: "updated" must be an ISO date (YYYY-MM-DD)`);
  }
}

if (errors.length) {
  console.error(`✗ Content validation failed (${errors.length} issue(s)):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`✓ Content validation passed (${files.length} file(s) checked).`);
