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

This runs ESLint, TypeScript, and content validation. CI runs the same plus a production build.

## Standards

- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`,
  `docs:`, `chore:`, `content:`).
- **Content accuracy:** Distinguish official requirement text from explanation; cite primary
  sources. When in doubt, link the standard rather than paraphrase it.
- **Accessibility:** Semantic HTML, keyboard navigation, visible focus, and sufficient contrast.
- **Components:** Prefer small, reusable components and semantic Tailwind tokens.
- **No secrets or personal data** in the repo.

## Adding content

See [CONTENT_PIPELINE.md](./CONTENT_PIPELINE.md).
