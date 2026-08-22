# Dataset coverage

This states plainly what the control crosswalk covers, at what depth, and what it
does not — so the rest of the dataset can be trusted.

## Frameworks

| Framework | Version | Role in the dataset |
| --- | --- | --- |
| ISO/IEC 27001 | 2022 (Annex A) | Anchor — every control's primary `framework`/`clause` |
| NIST CSF | 2.0 | Mapped by outcome (subcategory) |
| SOC 2 | 2017 TSC (2022 points of focus) | Mapped, directional — see below |
| CIS Controls | v8.1 | Mapped by control/safeguard |
| GDPR | Regulation (EU) 2016/679, by Article | Mapped where a technical control is relevant |

## Depth

- **Controls in the dataset:** 6 (see `data/controls/`). This is an early, deliberately
  small set — a correct 6 beats a half-wrong 60.
- Each control carries an objective, a technical implementation note, the specific
  **audit-evidence artifacts** an assessor asks for, and confidence-graded mappings
  with a rationale.

## Confidence grades

Every mapping is graded — flat "equivalent" claims are usually wrong:

- **equivalent** — the two clauses require the same outcome.
- **partial** — related but narrower/broader on one side; the rationale says how.
- **related** — the same theme, but not a requirement-to-requirement match.

## Out of scope (for now)

- **DORA** and **NIS2** — present as framework reference notes on the site, but **not**
  in the crosswalk dataset yet.
- **PCI DSS, HIPAA** — not covered.
- Non-technical / purely organizational controls where there is no meaningful technical
  implementation to map.

## Known-incomplete

- The set is small and ISO-anchored; mappings are one-directional (ISO → others) and
  not yet reversed.
- SOC 2 and CIS mappings are frequently **directional** rather than one-to-one; the
  rationale field says so per mapping.
- Clause-level precision is being expanded control by control. Corrections with a
  primary-source citation are welcome — see `docs/CONTRIBUTING.md`.
