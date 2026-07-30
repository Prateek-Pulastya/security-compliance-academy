# Content pipeline

The academy's value is **accurate content that maps controls to frameworks**. This document defines
how content is authored and validated.

## Principles

1. **One section at a time.** Author and review content in small, complete units.
2. **Official vs. explanation.** Never present a paraphrase as normative. Quote/flag official
   requirement text distinctly and always link the primary source.
3. **Cite everything.** Each content file lists authoritative `sources` in its frontmatter.
4. **Validated in CI.** Frontmatter, links, and diagrams are checked before merge.

## Authoring a framework

1. Copy `content/frameworks/_template.mdx` to `content/frameworks/<slug>.mdx`.
2. Fill in the frontmatter (see the contract in `content/README.md`).
3. Complete each template section: Overview, Purpose, Architecture, Core Concepts, Controls,
   Real-world Examples, Cloud Mapping, Implementation Guidance, Labs, Interview Questions, Quiz,
   References.
4. Run `npm run validate:content`.
5. Add the framework to `src/lib/frameworks.ts` until the MDX loader (Phase 2) sources it directly.

## Validation

`scripts/validate-content.mjs` (zero-dependency) enforces required frontmatter fields, allowed
`category`/`status` values, and ISO `updated` dates. It runs in CI via `npm run validate:content`.

## Roadmap for this pipeline

- **Phase 2:** MDX loader → typed content collection; render into section pages; Mermaid diagrams;
  Pagefind search; link-checking in CI.
- **Phase 3+:** Quizzes and labs sourced from `content/quizzes` and `content/labs`.
