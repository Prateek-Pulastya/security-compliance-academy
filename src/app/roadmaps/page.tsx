import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { careerPaths } from "@/lib/career";

export const metadata: Metadata = {
  title: "Career Roadmaps",
  description:
    "Structured learning paths for GRC, cloud security, application security, and AI security roles.",
};

export default function CareerRoadmapsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Career Roadmaps"
        title="Structured paths into security"
        description="Pick a role and follow an ordered path through the academy — each step links to the content that builds the skill."
      />
      <Container className="py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {careerPaths.map((path) => (
            <section key={path.slug} className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold">{path.role}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{path.summary}</p>
              <ol className="mt-5 space-y-4">
                {path.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      {step.href ? (
                        <Link
                          href={step.href}
                          className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary"
                        >
                          {step.title}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      ) : (
                        <span className="font-medium">{step.title}</span>
                      )}
                      <p className="text-sm text-muted-foreground">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Looking for the project&apos;s build roadmap?{" "}
          <Link href="/roadmap" className="font-medium text-primary hover:underline">
            See how the academy is built
          </Link>
          .
        </p>
      </Container>
    </>
  );
}
