# Security Policy

## Scope

This project is an educational static website plus a machine-readable control
crosswalk dataset. There is no backend, no user accounts, and no data collection
— progress and bookmarks are stored only in the visitor's own browser.

In scope:

- Vulnerabilities in the site's build or client-side code (e.g. an XSS via
  rendered content).
- Integrity issues in the dataset — a wrong mapping, a broken/incorrect
  primary-source citation, or a dangling reference.
- Supply-chain concerns in the repository's tooling or CI.

Out of scope: findings against the third-party hosts we link to, and
availability of GitHub Pages itself.

## Reporting

- **Preferred:** open a private report via **GitHub Security Advisories**
  (Security → Report a vulnerability) on this repository.
- **Content inaccuracies:** open a normal issue using the *Content issue*
  template, and include the primary-source citation that supports the fix.

Please do not open a public issue for a code vulnerability before it is fixed.

## Response

This is a personal, part-time project. Expect an initial acknowledgement within
about **7 days**. There is no bug-bounty program.
