import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { getAllFrameworks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Framework Explorer",
  description:
    "Explore cybersecurity and compliance frameworks — ISO 27001, NIST CSF, SOC 2, GDPR, DORA, NIS2 and more.",
};

export default function FrameworksPage() {
  const frameworks = getAllFrameworks();
  return (
    <>
      <PageHeader
        eyebrow="Framework Explorer"
        title="Frameworks"
        description="Every framework follows the same template so you can compare like for like: overview, core concepts, controls, cloud mapping, implementation guidance, labs, and interview questions."
      />
      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {frameworks.map((f) => (
            <Link
              key={f.slug}
              href={`/frameworks/${f.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-muted/40"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {f.category}
                </span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {f.status}
                </span>
              </div>
              <h2 className="mt-2 text-lg font-semibold">{f.title}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{f.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {f.focus.map((x) => (
                  <span
                    key={x}
                    className="rounded border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {x}
                  </span>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open framework
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
