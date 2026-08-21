# Security Compliance Academy

> Learn how technical controls map to compliance frameworks.

A free, open-source platform for learning cybersecurity frameworks, cloud security, AI security, and
governance/risk/compliance — with hands-on labs and control-to-framework mapping.

**Live site:** https://Prateek-Pulastya.github.io/security-compliance-academy/

## Status — early, work in progress

This is an active build, not a finished platform. Honest current state:

| Area | State |
| --- | --- |
| In-depth framework guides | 4 (ISO/IEC 27001:2022, NIST CSF 2.0, SOC 2, GDPR) |
| Reference stubs | ~10 — short orientation notes that link to primary sources, marked `stub` |
| Control crosswalk dataset | in progress — see [`data/controls/`](./data/controls/) |
| Hands-on labs | 2 |
| Quiz bank | small, hardcoded — see [`src/lib/quizzes.ts`](./src/lib/quizzes.ts) |
| Interview questions | small, hardcoded — see [`src/lib/interview.ts`](./src/lib/interview.ts) |

Pages marked **stub** are deliberately short: they orient you and point at the
primary source. They are not a substitute for reading the standard.

The site also has a small quiz bank and keyword search over site content.

Educational material only — not legal or compliance advice.

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
