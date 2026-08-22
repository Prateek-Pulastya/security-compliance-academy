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

## Data — the control crosswalk

The differentiator: a **cited, machine-readable control-to-framework crosswalk**. Every mapping
carries a version, a primary-source URL, a `last_reviewed` date, and a **confidence grade with a
rationale** — because flat "equivalent" claims between frameworks are usually wrong.

- **Source of truth:** [`data/controls/*.yaml`](./data/controls/) (schema in
  [`data/schema/control.schema.json`](./data/schema/control.schema.json))
- **Coverage & limits:** [`data/COVERAGE.md`](./data/COVERAGE.md) — read this first
- **Validation:** `npm run validate:controls` (schema, dangling references, duplicate ids,
  staleness) — wired into CI
- **Published:** the whole dataset compiles to one fetchable file at
  **`/controls.json`**:

```js
const res = await fetch("https://prateek-pulastya.github.io/security-compliance-academy/controls.json");
const { controls } = await res.json();
```

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
| `npm run validate:content` | Validate content frontmatter (dating + citations) |
| `npm run validate:controls`| Validate the crosswalk dataset         |
| `npm run test`             | Run the Vitest test suite              |
| `npm run check`            | Lint + type-check + validate content + controls |

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

Dual-licensed, because a software licence says nothing coherent about prose and data:

- **Code** (`src/`, `scripts/`, config) — MIT, see [LICENSE](./LICENSE).
- **Content & data** (`content/`, `data/`) — CC BY-SA 4.0, see
  [LICENSE-CONTENT](./LICENSE-CONTENT). Reuse is welcome; attribution and share-alike apply.

Cite the dataset via [CITATION.cff](./CITATION.cff). Security policy:
[SECURITY.md](./SECURITY.md). Educational material only — not legal or compliance advice.
