#!/usr/bin/env node
/**
 * Validates the control crosswalk dataset (data/controls/*.yaml).
 *
 * Enforces the schema's intent plus the integrity rules from the Remediation
 * plan: no duplicate ids; every mapping targets a valid framework and carries a
 * confidence + rationale; related_controls resolve (no dangling references); no
 * self-framework mappings; every entry is sourced and reviewed within 12 months
 * (warn at 9). Exits non-zero on any error so it gates CI.
 */
import { readdir, readFile } from "node:fs/promises";
import { join, relative, basename } from "node:path";
import { parse as parseYaml } from "yaml";

const ROOT = process.cwd();
const DIR = join(ROOT, "data", "controls");

const FRAMEWORKS = ["iso-27001", "nist-csf", "soc-2", "cis", "gdpr"];
const CONFIDENCE = ["equivalent", "partial", "related"];
const CATEGORIES = [
  "Identity & Access",
  "Data Protection",
  "Detection",
  "Threat & Vulnerability",
  "Resilience",
  "Infrastructure",
];
const REQUIRED = ["id", "title", "objective", "framework", "framework_version", "clause", "source_url", "last_reviewed"];
const ID_RE = /^[a-z0-9-]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const NOW = new Date();
const monthsBetween = (d) => (NOW - new Date(d)) / (1000 * 60 * 60 * 24 * 30.4);

const errors = [];
const warnings = [];

let files;
try {
  files = (await readdir(DIR)).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"));
} catch {
  console.error(`✗ No dataset directory at ${relative(ROOT, DIR)}`);
  process.exit(1);
}

const entries = [];
for (const file of files) {
  const rel = relative(ROOT, join(DIR, file));
  let data;
  try {
    data = parseYaml(await readFile(join(DIR, file), "utf8"));
  } catch (e) {
    errors.push(`${rel}: YAML parse error — ${e.message}`);
    continue;
  }
  entries.push({ rel, data, file });
}

const ids = new Set();

for (const { rel, data, file } of entries) {
  if (!data || typeof data !== "object") {
    errors.push(`${rel}: not a mapping`);
    continue;
  }
  for (const key of REQUIRED) if (data[key] === undefined) errors.push(`${rel}: missing "${key}"`);

  if (data.id !== undefined) {
    if (!ID_RE.test(data.id)) errors.push(`${rel}: id "${data.id}" must match ${ID_RE}`);
    if (ids.has(data.id)) errors.push(`${rel}: duplicate id "${data.id}"`);
    ids.add(data.id);
    if (basename(file, ".yaml") !== data.id) warnings.push(`${rel}: filename does not match id "${data.id}"`);
  }
  if (typeof data.title === "string" && data.title.length < 5) errors.push(`${rel}: title too short`);
  if (typeof data.objective === "string" && data.objective.length < 40) errors.push(`${rel}: objective too short`);
  if (data.category !== undefined && !CATEGORIES.includes(data.category)) {
    errors.push(`${rel}: invalid category "${data.category}"`);
  }
  if (data.framework !== undefined && !FRAMEWORKS.includes(data.framework)) {
    errors.push(`${rel}: invalid framework "${data.framework}"`);
  }
  if (typeof data.source_url === "string" && !/^https?:\/\//.test(data.source_url)) {
    errors.push(`${rel}: source_url must be an http(s) URL`);
  }
  if (data.last_reviewed !== undefined) {
    const d = data.last_reviewed instanceof Date ? data.last_reviewed.toISOString().slice(0, 10) : String(data.last_reviewed);
    if (!DATE_RE.test(d)) errors.push(`${rel}: last_reviewed must be ISO (YYYY-MM-DD)`);
    else {
      const age = monthsBetween(d);
      if (age > 12) errors.push(`${rel}: stale — last reviewed ${Math.round(age)} months ago`);
      else if (age > 9) warnings.push(`${rel}: review is ${Math.round(age)} months old`);
    }
  }
  if (data.evidence_artifact !== undefined) {
    if (!Array.isArray(data.evidence_artifact) || data.evidence_artifact.length < 1) {
      errors.push(`${rel}: evidence_artifact must be a non-empty array`);
    }
  }

  const maps = data.mappings ?? [];
  if (!Array.isArray(maps)) {
    errors.push(`${rel}: mappings must be an array`);
  } else {
    for (const [i, m] of maps.entries()) {
      const at = `${rel} mappings[${i}]`;
      for (const key of ["framework", "clause", "confidence", "rationale"]) {
        if (m?.[key] === undefined) errors.push(`${at}: missing "${key}"`);
      }
      if (m?.framework && !FRAMEWORKS.includes(m.framework)) errors.push(`${at}: invalid framework "${m.framework}"`);
      if (m?.confidence && !CONFIDENCE.includes(m.confidence)) errors.push(`${at}: invalid confidence "${m.confidence}"`);
      if (typeof m?.rationale === "string" && m.rationale.length < 30) errors.push(`${at}: rationale too short`);
      if (m?.framework && m.framework === data.framework) {
        errors.push(`${at}: maps to its own framework "${m.framework}" — remove or re-scope`);
      }
    }
  }
}

// Dangling-reference check: every related_controls id resolves to a real entry.
for (const { rel, data } of entries) {
  for (const ref of data?.related_controls ?? []) {
    if (!ids.has(ref)) errors.push(`${rel}: related_controls references unknown id "${ref}"`);
  }
}

for (const w of warnings) console.warn(`⚠ ${w}`);

if (errors.length) {
  console.error(`✗ Controls dataset validation failed (${errors.length} issue(s)):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`✓ Controls dataset valid — ${entries.length} controls, ${warnings.length} warning(s).`);
