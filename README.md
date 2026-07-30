# Security Compliance Academy

> Learn how technical controls map to compliance frameworks.

A free, open-source platform for learning cybersecurity frameworks, cloud security, AI security, and
governance/risk/compliance — with hands-on labs and control-to-framework mapping.

**Live site:** https://Prateek-Pulastya.github.io/security-compliance-academy/

## Status

**All five build phases complete.** The platform includes:

- **Content pipeline** — MDX + YAML frontmatter with Mermaid diagrams; eight frameworks, two labs,
  and blog posts render from `content/`.
- **Interactive tools** — control explorer (search + filter), framework comparison matrix, quizzes,
  interview bank + simulator, and site-wide search (⌘K).
- **Personalization** — local progress tracking, bookmarks, and a dashboard (browser-only, no
  backend), plus a retrieval-based study assistant.
- **Career roadmaps**, cloud & secure-SDLC guides, threat modeling, blog, contribution guide, and a
  teams/enterprise page.

See the [build roadmap](/roadmap) and [`docs/`](./docs). Content is illustrative and educational —
not legal or compliance advice.

## Tech stack

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS v4 · lucide-react ·
Framer Motion · MDX content pipeline · Mermaid · GitHub Pages.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script                     | What it does                           |
| -------------------------- | -------------------------------------- |
| `npm run dev`              | Start the dev server                   |
| `npm run build`            | Production build                       |
| `npm run lint`             | ESLint                                 |
| `npm run typecheck`        | TypeScript, no emit                    |
| `npm run validate:content` | Validate content frontmatter           |
| `npm run check`            | Lint + type-check + content validation |

## Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [Content pipeline](./docs/CONTENT_PIPELINE.md)
- [Contributing](./docs/CONTRIBUTING.md)
- [CLAUDE.md](./CLAUDE.md) — guidance for AI-assisted development

## Deployment

The site is a **static export** deployed to **GitHub Pages** via GitHub Actions
([`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)). Every push to `main` rebuilds
and publishes automatically.

One-time setup (in the GitHub repo):

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Push to `main` (or run the workflow manually). The Actions run builds `out/` and deploys it.

Notes:

- `NEXT_PUBLIC_BASE_PATH` is set automatically in CI from the Pages base path, so assets resolve
  under the `/security-compliance-academy/` sub-path. Local `npm run dev` uses no base path.
- `npm run build` produces a fully static site in `out/` — no server required.

## License

MIT — see [LICENSE](./LICENSE). Educational material only — not legal or compliance advice.
