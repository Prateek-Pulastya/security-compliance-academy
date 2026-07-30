# Security Compliance Academy

> Learn how technical controls map to compliance frameworks.

A free, open-source platform for learning cybersecurity frameworks, cloud security, AI security, and
governance/risk/compliance — with hands-on labs and control-to-framework mapping.

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

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · lucide-react · Framer Motion ·
MDX content pipeline · Vercel.

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

## License

Content and code are intended to be open-source and free. Educational material only — not legal or
compliance advice.
