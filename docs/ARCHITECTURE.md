# Architecture

## Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 with CSS-variable design tokens; class-based dark mode
- **Icons:** lucide-react
- **Animation:** Framer Motion (used progressively)
- **Content:** MDX + YAML frontmatter (pipeline lands in Phase 2)
- **Search:** Pagefind (Phase 2+)
- **Hosting:** Vercel (primary); GitHub Pages optional for static export

## Directory layout

```
content/            Authoritative MDX content (frameworks, cloud, ai, labs, quizzes, …)
docs/               Project documentation
scripts/            Build/validation tooling (e.g. content validation)
src/
  app/              App Router routes (one folder per major section)
    frameworks/     Framework Explorer + [slug] framework template
  components/       Reusable UI (header, footer, primitives)
  lib/              Config and typed data (site.ts, frameworks.ts, utils.ts)
.github/            CI workflows, Dependabot, PR template
```

## Design tokens

Colors are CSS variables defined in `src/app/globals.css` for light and `.dark`, then mapped to
Tailwind utilities via `@theme inline`. Use semantic utilities (`bg-background`, `text-foreground`,
`bg-card`, `border-border`, `text-primary`) rather than raw color classes so theming stays coherent.

## Routing

Every "Major Website Section" from the blueprint has a route under `src/app/`. Sections whose rich
content arrives in a later phase render a `ComingSoon` placeholder tagged with the roadmap phase, so
navigation is complete from day one.

## Content flow (target, Phase 2)

```
content/**.mdx ──▶ frontmatter validation (scripts/validate-content.mjs)
              └──▶ typed data + MDX render ──▶ Framework Explorer & section pages
```
