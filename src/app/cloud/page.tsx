import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { getAllTopics } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cloud Security",
  description: "AWS, Azure, GCP, and Kubernetes security patterns mapped to compliance controls.",
};

const kindStyles: Record<string, string> = {
  Provider: "bg-primary/15 text-primary",
  Practice: "bg-accent/15 text-accent",
  Concept: "bg-muted text-muted-foreground",
};

export default function CloudPage() {
  const topics = getAllTopics("cloud");
  return (
    <>
      <PageHeader
        eyebrow="Cloud Security"
        title="Cloud security, mapped to controls"
        description="The same handful of controls appears in every cloud — only the service names change. Click a topic to go deeper."
      />
      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => (
            <Link
              key={t.slug}
              href={`/cloud/${t.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-muted/40"
            >
              <span
                className={`w-fit rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${kindStyles[t.kind] ?? "bg-muted text-muted-foreground"}`}
              >
                {t.kind}
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
