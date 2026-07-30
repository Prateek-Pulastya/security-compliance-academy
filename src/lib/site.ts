/**
 * Central site configuration: identity, navigation, and section metadata.
 * Sections mirror the Master Blueprint's "Major Website Sections".
 */

export const siteConfig = {
  name: "Security Compliance Academy",
  shortName: "SCA",
  description:
    "A free, open-source platform for learning cybersecurity frameworks, cloud security, AI security, and governance, risk & compliance — with hands-on labs and control-to-framework mapping.",
  url: "https://security-compliance-academy.example",
  tagline: "Learn how technical controls map to compliance frameworks.",
  repo: "https://github.com/your-org/security-compliance-academy",
} as const;

export type NavSection = {
  title: string;
  href: string;
  /** Short description shown on the home grid and section landing. */
  blurb: string;
  /** lucide-react icon name, resolved in components. */
  icon: string;
  /** Roadmap phase that introduces meaningful content for this section. */
  phase: 1 | 2 | 3 | 4 | 5;
};

export const navSections: NavSection[] = [
  {
    title: "Framework Explorer",
    href: "/frameworks",
    blurb:
      "Deep dives into ISO 27001, NIST CSF, SOC 2, GDPR, DORA, NIS2 and more — each with controls, architecture, and labs.",
    icon: "LibraryBig",
    phase: 2,
  },
  {
    title: "Compliance Comparison",
    href: "/compare",
    blurb: "Side-by-side comparison of frameworks by scope, controls, and audit model.",
    icon: "GitCompareArrows",
    phase: 2,
  },
  {
    title: "Control Mapping",
    href: "/control-mapping",
    blurb:
      "Map one control (e.g. Access Control) across ISO 27001, NIST CSF, SOC 2, GDPR Art. 32, CIS, and cloud IAM.",
    icon: "Network",
    phase: 2,
  },
  {
    title: "Cloud Security",
    href: "/cloud",
    blurb: "AWS, Azure, GCP, and Kubernetes security patterns tied back to compliance controls.",
    icon: "Cloud",
    phase: 2,
  },
  {
    title: "AI Security",
    href: "/ai-security",
    blurb:
      "OWASP LLM Top 10, MITRE ATLAS, NIST AI RMF, ISO/IEC 42001, EU AI Act, prompt injection, RAG, MCP & agent security.",
    icon: "BrainCircuit",
    phase: 2,
  },
  {
    title: "Threat Modeling",
    href: "/threat-modeling",
    blurb: "STRIDE, attack trees, and data-flow diagrams with worked examples.",
    icon: "ShieldAlert",
    phase: 3,
  },
  {
    title: "Secure SDLC",
    href: "/secure-sdlc",
    blurb: "Build security into every phase — from design review to DevSecOps pipelines.",
    icon: "GitBranch",
    phase: 3,
  },
  {
    title: "Labs",
    href: "/labs",
    blurb: "Hands-on, guided labs that turn controls and standards into practice.",
    icon: "FlaskConical",
    phase: 3,
  },
  {
    title: "Quizzes",
    href: "/quizzes",
    blurb: "Short, interactive quizzes with instant feedback across the frameworks.",
    icon: "ListChecks",
    phase: 3,
  },
  {
    title: "Interview Prep",
    href: "/interview-prep",
    blurb: "Curated questions, model answers, and an interview simulator.",
    icon: "MessagesSquare",
    phase: 3,
  },
  {
    title: "Career Roadmaps",
    href: "/roadmaps",
    blurb: "Structured paths for GRC, cloud security, AppSec, and AI security roles.",
    icon: "Milestone",
    phase: 4,
  },
  {
    title: "Resources",
    href: "/resources",
    blurb: "Authoritative references, standards, and reading lists.",
    icon: "BookMarked",
    phase: 1,
  },
  {
    title: "Blog",
    href: "/blog",
    blurb: "Updates, deep dives, and analysis of the evolving compliance landscape.",
    icon: "Newspaper",
    phase: 5,
  },
];

/** Primary header links (a curated subset; the full set lives on the home grid). */
const PRIMARY_HREFS = ["/frameworks", "/control-mapping", "/ai-security", "/labs", "/interview-prep"];
export const primaryNav = PRIMARY_HREFS.map(
  (href) => navSections.find((s) => s.href === href)!,
);
