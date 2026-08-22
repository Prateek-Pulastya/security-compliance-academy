# Contributing

Thanks for helping build a free, open security education resource.

## Getting started

```bash
npm install
npm run dev
```

## Before you open a PR

Run the full check locally:

```bash
npm run check
```

This runs ESLint, TypeScript, and content + dataset validation. CI runs the same plus the Vitest
suite and a production build.

## Standards

- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`,
  `docs:`, `chore:`, `content:`).
- **Content accuracy:** Distinguish official requirement text from explanation; cite primary
  sources. When in doubt, link the standard rather than paraphrase it.
- **Accessibility:** Semantic HTML, keyboard navigation, visible focus, and sufficient contrast.
- **Components:** Prefer small, reusable components and semantic Tailwind tokens.
- **No secrets or personal data** in the repo.

## Adding content

See [CONTENT_PIPELINE.md](./CONTENT_PIPELINE.md). Every content file must be dated
(`last_reviewed` or `updated`) and cite at least one primary source, or the build fails.

## Adding a control to the crosswalk dataset

The dataset in [`data/controls/`](../data/controls/) is the project's core. To add a control:

1. Copy the shape of an existing file (e.g. `data/controls/mfa-privileged-access.yaml`). One control
   per file; the filename should match the `id`.
2. Fill in the required fields — `id`, `title`, `objective`, `framework`, `framework_version`,
   `clause`, `source_url`, `last_reviewed` — and the `mappings` to other frameworks.
3. **Cite primary sources.** `source_url` must point at the authoritative standard, not a blog.
4. **Grade every mapping.** Each mapping needs a `confidence` (`equivalent` / `partial` / `related`)
   and a `rationale` that says *why* — flat "equivalent" claims are usually wrong and will be
   rejected in review. A good rationale names what differs (scope, cadence, wording).
5. Validate:

   ```bash
   npm run validate:controls
   ```

   This checks the schema, rejects duplicate ids and dangling references, and fails stale entries
   (a `last_reviewed` older than 12 months). Update `data/COVERAGE.md` if you change scope.

## Citation standard

Cite the **version** and a **primary-source URL**, and date it. ISO by clause (e.g. `A.8.5`), NIST
CSF by subcategory (e.g. `PR.AA-03`), GDPR by Article, CIS by control/safeguard number. Undated or
uncited compliance content is treated as incorrect.
