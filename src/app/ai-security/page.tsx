import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "AI Security",
  description:
    "AI security coverage: OWASP LLM Top 10, MITRE ATLAS, NIST AI RMF, ISO/IEC 42001, EU AI Act, prompt injection, RAG, MCP, and agent security.",
};

const topics: { title: string; kind: "Framework" | "Threat" | "Practice"; blurb: string }[] = [
  { title: "OWASP LLM Top 10", kind: "Framework", blurb: "The most critical vulnerabilities in LLM applications." },
  { title: "MITRE ATLAS", kind: "Framework", blurb: "Adversary tactics and techniques against AI systems." },
  { title: "NIST AI RMF", kind: "Framework", blurb: "Govern, Map, Measure, and Manage AI risk." },
  { title: "ISO/IEC 42001", kind: "Framework", blurb: "Management system for responsible AI (AIMS)." },
  { title: "EU AI Act", kind: "Framework", blurb: "Risk-tiered regulation of AI systems in the EU." },
  { title: "Prompt Injection", kind: "Threat", blurb: "Direct and indirect manipulation of model instructions." },
  { title: "RAG Security", kind: "Practice", blurb: "Securing retrieval pipelines and knowledge sources." },
  { title: "MCP Security", kind: "Practice", blurb: "Trust boundaries for Model Context Protocol servers and tools." },
  { title: "Agent Security", kind: "Practice", blurb: "Guardrails, tool permissions, and autonomy limits." },
  { title: "Model Supply Chain", kind: "Practice", blurb: "Provenance, integrity, and dependency risk for models." },
];

export default function AiSecurityPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI Security"
        title="Securing AI systems"
        description="From LLM application vulnerabilities to governance frameworks — the fastest-moving area of security, mapped to compliance obligations."
      />
      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <div key={t.title} className="flex flex-col rounded-xl border border-border bg-card p-6">
              <span className="w-fit rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                {t.kind}
              </span>
              <h2 className="mt-3 font-semibold">{t.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Each topic gets a full page with worked examples, controls, and labs in Phase 2.
        </p>
      </Container>
    </>
  );
}
