import { describe, it, expect } from "vitest";
import { getAllFrameworks, getFrameworkDoc } from "@/lib/content";

describe("framework content", () => {
  const frameworks = getAllFrameworks();

  it("loads frameworks with required metadata", () => {
    expect(frameworks.length).toBeGreaterThan(0);
    for (const f of frameworks) {
      expect(f.slug).toMatch(/^[a-z0-9-]+$/);
      expect(f.title.length).toBeGreaterThan(0);
      expect(f.summary.length).toBeGreaterThan(0);
    }
  });

  it("parses the deep ISO 27001 guide and it is not a stub", () => {
    const doc = getFrameworkDoc("iso-27001");
    expect(doc).not.toBeNull();
    expect(doc!.meta.stub).toBe(false);
    expect(doc!.body.length).toBeGreaterThan(500);
    expect(doc!.meta.sources.length).toBeGreaterThan(0);
  });

  it("marks reference notes as stubs", () => {
    const doc = getFrameworkDoc("cis-controls");
    expect(doc!.meta.stub).toBe(true);
  });
});
