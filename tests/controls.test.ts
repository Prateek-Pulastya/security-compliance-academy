import { describe, it, expect } from "vitest";
import { getControls } from "@/lib/controls-data";
import { coverageFrameworks, coverageRef } from "@/lib/controls";

describe("control crosswalk", () => {
  const controls = getControls();

  it("loads controls from the dataset", () => {
    expect(controls.length).toBeGreaterThan(0);
  });

  it("has no duplicate ids", () => {
    const ids = controls.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("resolves coverage against known frameworks", () => {
    for (const c of controls) {
      // Every control is ISO-anchored, so ISO coverage must resolve.
      expect(coverageRef(c, "ISO/IEC 27001")).not.toBeNull();
      // coverageRef returns null for an unmapped framework without throwing.
      for (const f of coverageFrameworks) {
        const ref = coverageRef(c, f);
        expect(ref === null || typeof ref === "string").toBe(true);
      }
    }
  });

  it("carries confidence-graded mappings beyond the anchor", () => {
    const withMappings = controls.filter((c) => c.mappings.length > 1);
    expect(withMappings.length).toBeGreaterThan(0);
  });
});
