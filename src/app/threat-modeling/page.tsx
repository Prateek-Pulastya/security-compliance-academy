import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Mermaid } from "@/components/mermaid";

export const metadata: Metadata = {
  title: "Threat Modeling",
  description: "STRIDE, data-flow diagrams, and attack trees with worked examples.",
};

const stride: { letter: string; threat: string; property: string; example: string }[] = [
  { letter: "S", threat: "Spoofing", property: "Authentication", example: "Forged tokens or identities" },
  { letter: "T", threat: "Tampering", property: "Integrity", example: "Modifying data in transit or at rest" },
  { letter: "R", threat: "Repudiation", property: "Non-repudiation", example: "Denying an action with no audit trail" },
  { letter: "I", threat: "Information Disclosure", property: "Confidentiality", example: "Leaking data to unauthorized parties" },
  { letter: "D", threat: "Denial of Service", property: "Availability", example: "Exhausting resources to cause downtime" },
  { letter: "E", threat: "Elevation of Privilege", property: "Authorization", example: "Gaining rights beyond those granted" },
];

export default function ThreatModelingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Threat Modeling"
        title="Think like an attacker"
        description="A structured way to find design weaknesses early. Model the system, enumerate threats, and decide on mitigations — before you ship."
      />
      <Container className="py-12">
        <div className="mx-auto max-w-3xl">
          <section>
            <h2 className="text-xl font-semibold tracking-tight">The four questions</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-foreground/90">
              <li>What are we building? (Model it — a data-flow diagram.)</li>
              <li>What can go wrong? (Enumerate threats — e.g. STRIDE.)</li>
              <li>What are we going to do about it? (Mitigations mapped to controls.)</li>
              <li>Did we do a good job? (Validate and iterate.)</li>
            </ol>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">Model: a data-flow diagram</h2>
            <p className="mt-3 text-foreground/90">
              Trust boundaries (dashed) are where threats concentrate — every crossing deserves
              scrutiny.
            </p>
            <Mermaid
              caption="A simple web app data-flow diagram with a trust boundary"
              code={`flowchart LR
  User([User]) -->|HTTPS| API[Web API]
  subgraph Trust["Trust boundary: your cloud"]
    API --> Auth[Auth service]
    API --> DB[(Database)]
  end
  API -->|logs| SIEM[(Audit log)]`}
            />
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">Enumerate: STRIDE</h2>
            <p className="mt-3 text-foreground/90">
              STRIDE pairs each threat category with the security property it violates.
            </p>
            <div className="mt-4 overflow-x-auto rounded-lg border border-border">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold">Threat</th>
                    <th className="px-4 py-2.5 font-semibold">Violates</th>
                    <th className="px-4 py-2.5 font-semibold">Example</th>
                  </tr>
                </thead>
                <tbody>
                  {stride.map((s, i) => (
                    <tr key={s.letter} className={i % 2 ? "bg-muted/20" : ""}>
                      <td className="px-4 py-2.5 font-medium">
                        <span className="text-primary">{s.letter}</span> — {s.threat}
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">{s.property}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{s.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">Mitigate: map to controls</h2>
            <p className="mt-3 text-foreground/90">
              Each mitigation should map to a concrete control and a framework requirement. Spoofing
              → strong authentication (MFA) → ISO 27001 A.5.15, NIST CSF PR.AA. See{" "}
              <a href="/control-mapping" className="font-medium text-primary hover:underline">
                Control Mapping
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
