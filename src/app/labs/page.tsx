import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Signal } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { getAllLabs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Labs",
  description: "Hands-on, guided labs that turn controls and standards into practice.",
};

const difficultyColor: Record<string, string> = {
  Beginner: "bg-primary/15 text-primary",
  Intermediate: "bg-accent/15 text-accent",
  Advanced: "bg-muted text-foreground",
};

export default function LabsPage() {
  const labs = getAllLabs();
  return (
    <>
      <PageHeader
        eyebrow="Labs"
        title="Learn by doing"
        description="Guided, hands-on labs that turn abstract controls into concrete, repeatable practice — each mapped back to the frameworks that require it."
      />
      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {labs.map((lab) => (
            <Link
              key={lab.slug}
              href={`/labs/${lab.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-muted/40"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${difficultyColor[lab.difficulty]}`}
                >
                  {lab.difficulty}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {lab.duration}
                </span>
              </div>
              <h2 className="mt-3 text-lg font-semibold">{lab.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{lab.summary}</p>
              {lab.framework && (
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Signal className="h-3.5 w-3.5" /> {lab.framework}
                </p>
              )}
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Start lab
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
