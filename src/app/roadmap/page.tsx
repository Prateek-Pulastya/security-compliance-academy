import type { Metadata } from "next";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Build Roadmap",
  description: "The build roadmap for the Security Compliance Academy, phase by phase.",
};

type Status = "done" | "active" | "planned";

const phases: { n: number; title: string; status: Status; points: string[] }[] = [
  {
    n: 1,
    title: "Foundations & site",
    status: "done",
    points: [
      "Next.js + TypeScript + Tailwind foundation",
      "Design system, navigation, and all major section routes",
      "Framework template scaffold and control-mapping demo",
      "CI: lint, type-check, and build",
    ],
  },
  {
    n: 2,
    title: "Framework content",
    status: "done",
    points: [
      "YAML + MDX content pipeline with Mermaid diagrams",
      "Eight frameworks authored from content/",
      "Interactive control explorer, comparison matrix, and site search",
    ],
  },
  {
    n: 3,
    title: "Labs & quizzes",
    status: "done",
    points: ["Hands-on guided labs", "Interactive quizzes", "Interview bank and simulator"],
  },
  {
    n: 4,
    title: "Progress tracking & roadmaps",
    status: "done",
    points: [
      "Local progress tracking and bookmarks",
      "Personal dashboard",
      "Career roadmaps and a retrieval study assistant",
    ],
  },
  {
    n: 5,
    title: "Community & content",
    status: "done",
    points: ["Blog", "Contribution guide and community docs", "Enterprise information"],
  },
];

const statusMeta: Record<Status, { label: string; icon: React.ReactNode; className: string }> = {
  done: { label: "Complete", icon: <CheckCircle2 className="h-5 w-5" />, className: "text-primary" },
  active: { label: "In progress", icon: <Loader2 className="h-5 w-5" />, className: "text-accent" },
  planned: { label: "Planned", icon: <Circle className="h-5 w-5" />, className: "text-muted-foreground" },
};

export default function BuildRoadmapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Build Roadmap"
        title="How the academy is built"
        description="A living project. Here is what is done across the five build phases."
      />
      <Container className="py-12">
        <ol className="space-y-4">
          {phases.map((p) => {
            const meta = statusMeta[p.status];
            return (
              <li key={p.n} className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold">
                    <span className="text-muted-foreground">Phase {p.n} · </span>
                    {p.title}
                  </h2>
                  <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${meta.className}`}>
                    {meta.icon}
                    {meta.label}
                  </span>
                </div>
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </Container>
    </>
  );
}
