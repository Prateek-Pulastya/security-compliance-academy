import { describe, it, expect } from "vitest";
import { buildSearchIndex } from "@/lib/search";

describe("search index", () => {
  const index = buildSearchIndex();

  it("builds a non-empty index", () => {
    expect(index.length).toBeGreaterThan(0);
  });

  it("every entry has a title, href, and section", () => {
    for (const doc of index) {
      expect(doc.title.length).toBeGreaterThan(0);
      expect(doc.href.startsWith("/")).toBe(true);
      expect(doc.section.length).toBeGreaterThan(0);
    }
  });

  it("indexes frameworks and controls", () => {
    const sections = new Set(index.map((d) => d.section));
    expect(sections.has("Framework")).toBe(true);
    expect(sections.has("Control")).toBe(true);
  });
});
