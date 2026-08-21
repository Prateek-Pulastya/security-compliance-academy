import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/container";
import { Icon } from "@/components/icon";
import { navSections, siteConfig } from "@/lib/site";
import { getAllFrameworks } from "@/lib/content";

const principles = [
  "Controls mapped to frameworks, not just standards restated",
  "Accurate, cited, and production-quality content",
  "Hands-on labs that turn theory into practice",
  "Free and open-source, forever",
];

export default function Home() {
  const frameworks = getAllFrameworks();
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background:radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent)]"
        />
        <Container className="py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              Open-source · Free · Community-driven
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/frameworks"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Explore frameworks
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/control-mapping"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
              >
                See control mapping
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="border-b border-border bg-muted/20">
        <Container className="grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <div key={p} className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span>{p}</span>
            </div>
          ))}
        </Container>
      </section>

      {/* Sections grid */}
      <section>
        <Container className="py-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Explore the academy</h2>
            <p className="mt-3 text-muted-foreground">
              Everything you need to learn, map, and implement security and compliance.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {navSections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50 hover:bg-muted/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-primary">
                  <Icon name={s.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured frameworks */}
      <section className="border-t border-border bg-muted/20">
        <Container className="py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Frameworks</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Each framework page follows one template: overview, controls, cloud mapping,
                implementation guidance, labs, and interview questions.
              </p>
            </div>
            <Link
              href="/frameworks"
              className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary sm:inline-flex"
            >
              All frameworks
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {frameworks.map((f) => (
              <div
                key={f.slug}
                className="flex flex-col rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {f.category}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    {f.status}
                  </span>
                </div>
                <h3 className="mt-2 font-semibold">{f.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{f.summary}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container className="py-16">
          <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Built in the open. Contributions welcome.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              This academy is a living, community-maintained resource. Follow a learning path or help
              shape what comes next.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/roadmaps"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                View the roadmaps
              </Link>
              <a
                href={siteConfig.repo}
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Contribute on GitHub
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
