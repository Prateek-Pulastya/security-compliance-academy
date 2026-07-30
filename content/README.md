# Content

Authoritative learning content lives here as **MDX with YAML frontmatter**. In Phase 2 this
directory is wired into the site via a content pipeline (frontmatter → typed data → MDX render).
Until then, these files are the canonical source of truth and are validated in CI.

## Structure

| Directory                  | Purpose                                                    |
| -------------------------- | ---------------------------------------------------------- |
| `frameworks/`              | One MDX file per framework (ISO 27001, NIST CSF, …)        |
| `cloud/`                   | Cloud security guides (AWS, Azure, GCP, Kubernetes)        |
| `ai/`                      | AI security topics (OWASP LLM, ATLAS, AI RMF, …)           |
| `labs/`                    | Hands-on lab walkthroughs                                  |
| `quizzes/`                 | Quiz question banks                                        |
| `interview-guides/`        | Interview questions and model answers                      |
| `diagrams/`                | Mermaid / architecture diagram sources                     |

## Frontmatter contract

Every content MDX file must begin with YAML frontmatter containing at least:

```yaml
---
title: "ISO/IEC 27001"
slug: iso-27001
category: GRC # GRC | Cloud | AI | Privacy | Operational Resilience
status: draft # draft | in-progress | published
summary: "One-sentence description."
updated: 2026-07-30 # ISO date
sources: # authoritative primary sources
  - name: "ISO"
    url: "https://www.iso.org/standard/27001"
---
```

`scripts/validate-content.mjs` enforces this contract (run via `npm run validate:content`).

## Core principle: official vs. explanation

Always **distinguish official requirement text from our explanation**. Use the `<Official>` callout
convention for verbatim/normative requirements and plain prose for teaching. Never paraphrase a
normative requirement and present it as authoritative — link to the primary source instead.
