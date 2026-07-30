import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Resources",
  description: "Authoritative primary sources for security and compliance frameworks.",
};

const groups: { heading: string; items: { name: string; url: string; note: string }[] }[] = [
  {
    heading: "Governance, Risk & Compliance",
    items: [
      { name: "ISO/IEC 27001", url: "https://www.iso.org/standard/27001", note: "ISMS standard (official)." },
      { name: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", note: "CSF 2.0 and resources." },
      { name: "AICPA SOC 2 / Trust Services", url: "https://www.aicpa-cima.com/", note: "Trust Services Criteria." },
      { name: "CIS Controls", url: "https://www.cisecurity.org/controls", note: "Prioritized safeguards v8." },
    ],
  },
  {
    heading: "Privacy & Operational Resilience",
    items: [
      { name: "GDPR (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj", note: "Official regulation text." },
      { name: "DORA (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj", note: "Digital Operational Resilience Act." },
      { name: "NIS2 Directive (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj", note: "Network & information security." },
    ],
  },
  {
    heading: "AI Security",
    items: [
      { name: "OWASP Top 10 for LLM Applications", url: "https://genai.owasp.org/", note: "LLM application risks." },
      { name: "MITRE ATLAS", url: "https://atlas.mitre.org/", note: "Adversarial threats to AI." },
      { name: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework", note: "AI RMF 1.0." },
      { name: "EU AI Act (EUR-Lex)", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj", note: "Official regulation text." },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Primary sources"
        description="We map and explain — but always defer to the authoritative text. Start here."
      />
      <Container className="py-12">
        <div className="space-y-10">
          {groups.map((g) => (
            <section key={g.heading}>
              <h2 className="text-lg font-semibold tracking-tight">{g.heading}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {g.items.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/40"
                  >
                    <span>
                      <span className="font-medium">{item.name}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{item.note}</span>
                    </span>
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
