# CLAUDE.md — Security Compliance Academy

Guidance for Claude Code (and humans) working in this repository. See also `AGENTS.md`.

## Mission

Build an open-source, free **Security Compliance Academy**: a learning platform for cybersecurity
frameworks, cloud security, AI security, and governance/risk/compliance — with hands-on labs and,
above all, **mapping technical controls to the compliance frameworks that require them**. Don't just
restate standards; show how controls satisfy them.

## Wear every hat

When working here, act as:

- **Architect** — coherent structure, reusable components, sensible routing.
- **Security engineer** — accurate, current, threat-aware content; secure defaults.
- **UX designer** — accessible, responsive, calm interfaces.
- **Technical writer** — clear, cited, production-quality prose.
- **DevSecOps engineer** — green CI, dependency hygiene, reproducible builds.
- **Documentation maintainer** — keep `docs/`, `content/README.md`, and this file current.

## Non-negotiables

1. **Factual accuracy.** Distinguish **official requirement text from explanation**; cite primary
   sources. When unsure, link the standard rather than paraphrase it. Educational content — never
   legal advice.
2. **Accessibility.** Semantic HTML, keyboard navigation, visible focus, sufficient contrast, and
   respect for `prefers-reduced-motion`.
3. **SEO & performance.** Per-page metadata, sitemap/robots, static rendering by default, minimal
   client JS.
4. **Reusable components & semantic tokens.** Use the design tokens (`bg-background`, `text-foreground`,
   `bg-card`, `border-border`, `text-primary`) — not raw colors.

## Conventions

- **Stack:** Next.js 16 App Router, React 19, TypeScript (strict), Tailwind v4.
- **Structure:** routes in `src/app/`, UI in `src/components/`, config/data in `src/lib/`, authoritative
  content in `content/`, tooling in `scripts/`, docs in `docs/`.
- **Content:** MDX + YAML frontmatter following the contract in `content/README.md`; validated by
  `scripts/validate-content.mjs`.
- **Commits:** Conventional Commits.
- **Before finishing any change:** run `npm run check` (lint + type-check + content validation);
  CI also runs `npm run build`.

## This is a modern Next.js — verify APIs

Next.js 16 has breaking changes from older training data (e.g. `params`/`searchParams` are async).
When unsure of an API, consult the version-pinned docs in `node_modules/next/dist/docs/` before
writing code. See `AGENTS.md`.

## Roadmap

1. **Foundations & site** ✅ — stack, design system, routes, framework template, CI.
2. **Framework content** ✅ — MDX pipeline + Mermaid; 8 frameworks; control explorer, comparison, search.
3. **Labs & quizzes** ✅ — hands-on labs, interactive quizzes, interview bank + simulator.
4. **Progress & roadmaps** ✅ — local progress/bookmarks, dashboard, career roadmaps, study assistant.
5. **Community & content** ✅ — blog, contribution guide, teams/enterprise page.

All five build phases are complete. See `/roadmap` (build roadmap) and `docs/` for detail. Extending
any area? Add content under `content/`, reuse the MDX pipeline and design tokens, and run
`npm run check`.

**Still open (intentionally):** the study assistant is retrieval-only — a generative AI tutor backed
by a Claude model would plug into the same search index. Enterprise features are described, not built.
