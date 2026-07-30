/**
 * Career roadmaps: structured learning paths for common security roles. Steps
 * link into academy content where available.
 */

export type CareerStep = { title: string; detail: string; href?: string };

export type CareerPath = {
  slug: string;
  role: string;
  summary: string;
  steps: CareerStep[];
};

export const careerPaths: CareerPath[] = [
  {
    slug: "grc-analyst",
    role: "GRC Analyst",
    summary: "Governance, risk, and compliance — translate frameworks into auditable controls.",
    steps: [
      { title: "Learn the core frameworks", detail: "ISO 27001, SOC 2, and NIST CSF.", href: "/frameworks" },
      { title: "Understand control mapping", detail: "How one control satisfies many frameworks.", href: "/control-mapping" },
      { title: "Practice risk & privacy", detail: "GDPR Article 32 and risk treatment.", href: "/frameworks/gdpr" },
      { title: "Prepare for interviews", detail: "Policies vs. standards, SOC 2 types, residual risk.", href: "/interview-prep" },
    ],
  },
  {
    slug: "cloud-security-engineer",
    role: "Cloud Security Engineer",
    summary: "Secure cloud workloads and map provider controls to compliance.",
    steps: [
      { title: "Master IAM & least privilege", detail: "Do the hands-on IAM lab.", href: "/labs/least-privilege-iam" },
      { title: "Learn the control mappings", detail: "Encryption, logging, network security in the cloud.", href: "/control-mapping" },
      { title: "Study cloud security patterns", detail: "AWS, Azure, GCP, Kubernetes.", href: "/cloud" },
      { title: "Interview practice", detail: "Shared responsibility, security groups vs. NACLs.", href: "/interview-prep" },
    ],
  },
  {
    slug: "appsec-engineer",
    role: "Application Security Engineer",
    summary: "Build security into software — from threat modeling to secure SDLC.",
    steps: [
      { title: "Threat modeling", detail: "STRIDE and data-flow diagrams.", href: "/threat-modeling" },
      { title: "Secure SDLC", detail: "Security across the development lifecycle.", href: "/secure-sdlc" },
      { title: "Practice the fundamentals", detail: "Auth vs. authz, injection defenses.", href: "/interview-prep" },
      { title: "Test your knowledge", detail: "Take the quizzes.", href: "/quizzes" },
    ],
  },
  {
    slug: "ai-security-engineer",
    role: "AI Security Engineer",
    summary: "Secure AI systems against emerging, fast-moving threats.",
    steps: [
      { title: "Learn the AI threat landscape", detail: "OWASP LLM Top 10, MITRE ATLAS.", href: "/ai-security" },
      { title: "Defend against prompt injection", detail: "Do the hands-on lab.", href: "/labs/prompt-injection-defense" },
      { title: "Understand AI governance", detail: "NIST AI RMF, ISO 42001, EU AI Act.", href: "/frameworks/iso-42001" },
      { title: "Interview practice", detail: "AI-specific risks and defenses.", href: "/interview-prep" },
    ],
  },
];
