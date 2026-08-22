/**
 * Client-safe control types and pure helpers. The data itself is loaded from
 * the crosswalk dataset by `controls-data.ts` (server-only, uses fs) and passed
 * into the interactive components as props.
 */

export type ControlMapping = { framework: string; reference: string; note: string };

export type Control = {
  id: string;
  name: string;
  category: string;
  summary: string;
  mappings: ControlMapping[];
};

/** Framework slug → display name used across the UI. */
export const FRAMEWORK_LABELS: Record<string, string> = {
  "iso-27001": "ISO/IEC 27001",
  "nist-csf": "NIST CSF 2.0",
  "soc-2": "SOC 2",
  cis: "CIS Controls v8",
  gdpr: "GDPR",
};

/** Compliance frameworks used as columns in the coverage matrix. */
export const coverageFrameworks = [
  "ISO/IEC 27001",
  "NIST CSF 2.0",
  "SOC 2",
  "CIS Controls v8",
  "GDPR",
] as const;

/** Distinct framework names across the given controls, for filtering. */
export function allFrameworks(controls: Control[]): string[] {
  const set = new Set<string>();
  for (const c of controls) for (const m of c.mappings) set.add(m.framework);
  return Array.from(set).sort();
}

/** The mapping reference for a control under a framework, or null if unmapped. */
export function coverageRef(control: Control, framework: string): string | null {
  return control.mappings.find((m) => m.framework === framework)?.reference ?? null;
}
