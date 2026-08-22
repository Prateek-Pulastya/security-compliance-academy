import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";
import { FRAMEWORK_LABELS, type Control, type ControlMapping } from "./controls";

/**
 * Server-only loader for the control crosswalk dataset (`data/controls/*.yaml`).
 * Reads the files at build time and adapts each entry to the UI `Control` shape.
 * Do NOT import this from a client component — it uses `node:fs`.
 */

type DatasetMapping = { framework: string; clause: string; confidence: string; rationale: string };
type DatasetControl = {
  id: string;
  title: string;
  category?: string;
  objective: string;
  framework: string;
  clause: string;
  mappings?: DatasetMapping[];
};

const label = (slug: string) => FRAMEWORK_LABELS[slug] ?? slug;
const oneLine = (s: string) => s.replace(/\s+/g, " ").trim();

function toControl(d: DatasetControl): Control {
  const primary: ControlMapping = {
    framework: label(d.framework),
    reference: d.clause,
    note: oneLine(d.objective),
  };
  const mapped = (d.mappings ?? []).map((m) => ({
    framework: label(m.framework),
    reference: m.clause,
    note: `${m.confidence} — ${oneLine(m.rationale)}`,
  }));
  return {
    id: d.id,
    name: d.title,
    category: d.category ?? "General",
    summary: oneLine(d.objective),
    mappings: [primary, ...mapped],
  };
}

export function getControls(): Control[] {
  const dir = join(process.cwd(), "data", "controls");
  return readdirSync(dir)
    .filter((f) => f.endsWith(".yaml") || f.endsWith(".yml"))
    .map((f) => parseYaml(readFileSync(join(dir, f), "utf8")) as DatasetControl)
    .map(toControl)
    .sort((a, b) => a.name.localeCompare(b.name));
}
