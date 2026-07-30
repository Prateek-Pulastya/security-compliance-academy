import type { Metadata } from "next";
import { BookOpen, Bug, GitPullRequest, ShieldCheck } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contribute",
  description: "Help build a free, open, and accurate security education resource.",
};

const ways = [
  {
    icon: BookOpen,
    title: "Write content",
    body: "Author or improve a framework, lab, or interview question. Follow the content pipeline and cite primary sources.",
  },
  {
    icon: Bug,
    title: "Report issues",
    body: "Found an inaccuracy or a broken link? Open an issue — accuracy is our top priority.",
  },
  {
    icon: GitPullRequest,
    title: "Improve the platform",
    body: "Fix bugs, improve accessibility, or add features. Run npm run check before opening a PR.",
  },
];

export default function ContributePage() {
  return (
    <>
      <PageHeader
        eyebrow="Contribute"
        title="Build it with us"
        description="This academy is open-source and community-maintained. Every contribution — a fixed typo, a new lab, a whole framework — makes it better."
      />
      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {ways.map((w) => (
            <div key={w.title} className="rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-primary">
                <w.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-semibold">{w.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
            </div>
          ))}
        </div>

        <section className="mt-12 rounded-xl border border-primary/30 bg-primary/5 p-6">
          <h2 className="flex items-center gap-2 font-semibold text-primary">
            <ShieldCheck className="h-5 w-5" /> Our content principles
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-foreground/90">
            <li>Distinguish official requirement text from explanation — always cite the source.</li>
            <li>Accuracy over volume. When unsure, link the standard rather than paraphrase it.</li>
            <li>Accessible by default: semantic, keyboard-navigable, high-contrast.</li>
            <li>Educational only — never legal or compliance advice.</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold">Get started</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Read the contribution guide and open a pull request on GitHub. New contributors are
            welcome — look for issues labeled <span className="font-medium">good first issue</span>.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={siteConfig.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              View on GitHub
            </a>
            <a
              href={`${siteConfig.repo}/blob/main/docs/CONTRIBUTING.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Contribution guide
            </a>
          </div>
        </section>
      </Container>
    </>
  );
}
