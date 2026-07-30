import type { Metadata } from "next";
import { BarChart3, Building2, KeyRound, Lock, Users } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "For Teams & Enterprise",
  description: "How the academy can support security teams and organizations.",
};

const features = [
  { icon: Users, title: "Team learning paths", body: "Assign role-based roadmaps and track team progress against them." },
  { icon: BarChart3, title: "Progress reporting", body: "Aggregate completion and quiz results for evidence of training." },
  { icon: KeyRound, title: "SSO / SAML", body: "Single sign-on with your identity provider." },
  { icon: Lock, title: "Private content", body: "Add organization-specific policies and mappings alongside the open library." },
];

export default function EnterprisePage() {
  return (
    <>
      <PageHeader
        eyebrow="For Teams & Enterprise"
        title="Security training that maps to your controls"
        description="The open academy is free forever. These team-oriented capabilities are on the roadmap for organizations that want to standardize security learning."
      />
      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold">{f.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8 text-center">
          <Building2 className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-3 text-xl font-semibold">Interested in team features?</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            These capabilities are planned, not yet available. The best way to shape them is to open a
            discussion on GitHub describing what your team needs.
          </p>
          <a
            href={siteConfig.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Start a discussion
          </a>
        </div>
      </Container>
    </>
  );
}
