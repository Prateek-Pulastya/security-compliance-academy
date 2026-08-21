import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { getAllAiTopics } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI Security",
  description:
    "AI security coverage: OWASP LLM Top 10, MITRE ATLAS, NIST AI RMF, ISO/IEC 42001, EU AI Act, prompt injection, RAG, MCP, and agent security.",
};

const kindStyles: Record<string, string> = {
  Framework: "bg-primary/15 text-primary",
  Threat: "bg-accent/15 text-accent",
  Practice: "bg-muted text-muted-foreground",
};

export default function AiSecurityPage() {
  const topics = getAllAiTopics();
  return (
    <>
      <PageHeader
        eyebrow="AI Security"
        title="Securing AI systems"
        description="From LLM application vulnerabilities to governance frameworks — the fastest-moving area of security. Click any topic to go deeper."
      />
      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <Link
              key={t.slug}
              href={`/ai-security/${t.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-muted/40"
            >
              <span className="flex w-fit items-center gap-1.5">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${kindStyles[t.kind]}`}
                >
                  {t.kind}
                </span>
                {t.stub && (
                  <span className="rounded-full border border-amber-500/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-600 dark:text-amber-400">
                    stub
                  </span>
                )}
              </span>
              <h2 className="mt-3 font-semibold">{t.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{t.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Learn
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
