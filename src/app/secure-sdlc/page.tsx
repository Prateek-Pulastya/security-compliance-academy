import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Mermaid } from "@/components/mermaid";

export const metadata: Metadata = {
  title: "Secure SDLC",
  description: "Build security into every phase of the software development lifecycle.",
};

const phases: { phase: string; practices: string }[] = [
  { phase: "Requirements", practices: "Security requirements, abuse cases, data classification" },
  { phase: "Design", practices: "Threat modeling, secure design review, trust boundaries" },
  { phase: "Develop", practices: "Secure coding standards, SAST, secrets scanning, code review" },
  { phase: "Test", practices: "DAST, dependency (SCA) scanning, security test cases" },
  { phase: "Deploy", practices: "IaC scanning, signed artifacts, least-privilege pipelines" },
  { phase: "Operate", practices: "Monitoring, patching, incident response, feedback loop" },
];

export default function SecureSdlcPage() {
  return (
    <>
      <PageHeader
        eyebrow="Secure SDLC"
        title="Security across the lifecycle"
        description="Security is not a gate at the end — it is a set of practices woven through every phase, shifting problems left where they are cheapest to fix."
      />
      <Container className="py-12">
        <div className="mx-auto max-w-3xl">
          <Mermaid
            caption="Security practices span the whole lifecycle"
            code={`flowchart LR
  R[Requirements] --> D[Design]
  D --> Dev[Develop]
  Dev --> T[Test]
  T --> Dep[Deploy]
  Dep --> O[Operate]
  O -.feedback.-> R`}
          />

          <section className="mt-8">
            <h2 className="text-xl font-semibold tracking-tight">Practices by phase</h2>
            <div className="mt-4 overflow-x-auto rounded-lg border border-border">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold">Phase</th>
                    <th className="px-4 py-2.5 font-semibold">Key security practices</th>
                  </tr>
                </thead>
                <tbody>
                  {phases.map((p, i) => (
                    <tr key={p.phase} className={i % 2 ? "bg-muted/20" : ""}>
                      <td className="px-4 py-2.5 font-medium">{p.phase}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{p.practices}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">Shift left</h2>
            <p className="mt-3 text-foreground/90">
              A flaw caught in design is a conversation; the same flaw in production is an incident.
              Start with{" "}
              <Link href="/threat-modeling" className="font-medium text-primary hover:underline">
                threat modeling
              </Link>{" "}
              in the design phase, then automate checks (SAST, SCA, IaC scanning) in your pipeline so
              every commit is evaluated.
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
