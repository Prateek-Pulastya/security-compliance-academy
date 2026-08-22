#!/usr/bin/env node
/**
 * Compiles data/controls/*.yaml into a single public/controls.json — the whole
 * crosswalk dataset as one fetchable, machine-readable file. Next copies
 * public/ into the static export, so it ships at /controls.json.
 */
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";

const ROOT = process.cwd();
const DIR = join(ROOT, "data", "controls");
const OUT = join(ROOT, "public", "controls.json");

const files = (await readdir(DIR)).filter((f) => f.endsWith(".yaml") || f.endsWith(".yml")).sort();
const controls = [];
for (const f of files) {
  controls.push(parseYaml(await readFile(join(DIR, f), "utf8")));
}
controls.sort((a, b) => String(a.id).localeCompare(String(b.id)));

const payload = { schema_version: "1.0", count: controls.length, controls };

await mkdir(join(ROOT, "public"), { recursive: true });
await writeFile(OUT, JSON.stringify(payload, null, 2) + "\n", "utf8");
console.log(`✓ Wrote public/controls.json (${controls.length} controls).`);
