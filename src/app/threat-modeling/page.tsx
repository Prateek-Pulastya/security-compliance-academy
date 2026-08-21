import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Threat Modeling",
  description: "A curated set of authoritative, primary threat-modeling resources.",
};

const links: { name: string; url: string; note: string }[] = [
  {
    name: "OWASP Threat Modeling (community page)",
    url: "https://owasp.org/www-community/Threat_Modeling",
    note: "The canonical overview: what threat modeling is and the process.",
  },
  {
    name: "OWASP Threat Modeling Cheat Sheet",
    url: "https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html",
    note: "A practical, structured how-to you can follow step by step.",
  },
  {
    name: "The Threat Modeling Manifesto",
    url: "https://www.threatmodelingmanifesto.org/",
    note: "Values and principles agreed by the field's practitioners.",
  },
  {
    name: "Microsoft — STRIDE threats",
    url: "https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats",
    note: "STRIDE categories and the security properties they violate.",
  },
  {
    name: "Bruce Schneier — Attack Trees",
    url: "https://www.schneier.com/academic/archives/1999/12/attack_trees.html",
    note: "The original write-up on decomposing an attacker's goal.",
  },
];

export default function ThreatModelingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Threat Modeling"
        title="Threat modeling — start here"
        description="Rather than restate it worse, this section points you to the authoritative primary resources. Model the system, enumerate threats, decide mitigations, and iterate."
      />
      <Container className="py-12">
        <div className="mx-auto max-w-2xl">
          <div className="grid gap-3">
            {links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/40"
              >
                <span>
                  <span className="font-medium">{l.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{l.note}</span>
                </span>
                <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Curated external references. Threat modeling is covered thoroughly by the sources above;
            this page is a deliberate pointer, not a rewrite.
          </p>
        </div>
      </Container>
    </>
  );
}
