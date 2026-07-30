/**
 * Comparison matrix data for the Compliance Comparison page. Keyed by the same
 * slugs used in content/frameworks. Kept deliberately factual and high-level.
 */

export type ComparisonRow = {
  slug: string;
  name: string;
  region: string;
  nature: string;
  obligation: "Voluntary" | "Contractual" | "Legal";
  assurance: string;
};

export const comparisonRows: ComparisonRow[] = [
  {
    slug: "iso-27001",
    name: "ISO/IEC 27001",
    region: "International",
    nature: "Standard (ISMS)",
    obligation: "Voluntary",
    assurance: "Accredited certification",
  },
  {
    slug: "nist-csf",
    name: "NIST CSF 2.0",
    region: "US / International",
    nature: "Framework (outcomes)",
    obligation: "Voluntary",
    assurance: "Self-assessment / profiles",
  },
  {
    slug: "soc-2",
    name: "SOC 2",
    region: "US (widely used)",
    nature: "Attestation (TSC)",
    obligation: "Contractual",
    assurance: "CPA-firm report (Type I/II)",
  },
  {
    slug: "gdpr",
    name: "GDPR",
    region: "EU / EEA",
    nature: "Regulation (privacy)",
    obligation: "Legal",
    assurance: "Supervisory-authority enforcement",
  },
  {
    slug: "cis-controls",
    name: "CIS Controls v8",
    region: "International",
    nature: "Control catalog",
    obligation: "Voluntary",
    assurance: "Self-assessment (IG1–IG3)",
  },
  {
    slug: "dora",
    name: "DORA",
    region: "EU (financial sector)",
    nature: "Regulation (resilience)",
    obligation: "Legal",
    assurance: "Regulatory supervision",
  },
  {
    slug: "nis2",
    name: "NIS2",
    region: "EU (essential/important)",
    nature: "Directive (security)",
    obligation: "Legal",
    assurance: "Competent-authority supervision",
  },
  {
    slug: "iso-42001",
    name: "ISO/IEC 42001",
    region: "International",
    nature: "Standard (AIMS)",
    obligation: "Voluntary",
    assurance: "Accredited certification",
  },
];

export const obligationStyles: Record<ComparisonRow["obligation"], string> = {
  Voluntary: "bg-muted text-muted-foreground",
  Contractual: "bg-accent/15 text-accent",
  Legal: "bg-primary/15 text-primary",
};
