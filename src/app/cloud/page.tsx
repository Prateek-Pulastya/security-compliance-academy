import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Cloud Security",
  description: "AWS, Azure, GCP, and Kubernetes security patterns mapped to compliance controls.",
};

const providers: { name: string; iam: string; logging: string; network: string }[] = [
  { name: "AWS", iam: "IAM roles & policies", logging: "CloudTrail / GuardDuty", network: "VPC / Security Groups" },
  { name: "Azure", iam: "RBAC + Entra ID", logging: "Monitor / Defender", network: "NSGs / Azure Firewall" },
  { name: "GCP", iam: "Cloud IAM", logging: "Cloud Logging / SCC", network: "VPC / Firewall Rules" },
  { name: "Kubernetes", iam: "RBAC", logging: "Audit logs", network: "NetworkPolicy" },
];

export default function CloudPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cloud Security"
        title="Cloud security, mapped to controls"
        description="Provider-specific patterns for AWS, Azure, GCP, and Kubernetes — each tied back to the frameworks that require them."
      />
      <Container className="py-12">
        <div className="mx-auto max-w-3xl">
          <section>
            <h2 className="text-xl font-semibold tracking-tight">The shared responsibility model</h2>
            <p className="mt-3 text-foreground/90">
              The provider secures the infrastructure (&ldquo;security <em>of</em> the cloud&rdquo;);
              you secure your data, configuration, and access (&ldquo;security <em>in</em> the
              cloud&rdquo;). The dividing line shifts with the service model — IaaS puts more on you,
              SaaS less — but access, encryption, and logging are almost always yours to own.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">Core controls by provider</h2>
            <p className="mt-3 text-foreground/90">
              The same handful of controls appears everywhere — only the service names change.
            </p>
            <div className="mt-4 overflow-x-auto rounded-lg border border-border">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold">Provider</th>
                    <th className="px-4 py-2.5 font-semibold">Access control</th>
                    <th className="px-4 py-2.5 font-semibold">Logging</th>
                    <th className="px-4 py-2.5 font-semibold">Network</th>
                  </tr>
                </thead>
                <tbody>
                  {providers.map((p, i) => (
                    <tr key={p.name} className={i % 2 ? "bg-muted/20" : ""}>
                      <td className="px-4 py-2.5 font-medium">{p.name}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{p.iam}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{p.logging}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{p.network}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight">Put it into practice</h2>
            <ul className="mt-4 space-y-2 text-foreground/90">
              <li>
                See how each control maps across frameworks in the{" "}
                <Link href="/control-mapping" className="font-medium text-primary hover:underline">
                  Control Explorer
                </Link>
                .
              </li>
              <li>
                Do the{" "}
                <Link href="/labs/least-privilege-iam" className="font-medium text-primary hover:underline">
                  least-privilege IAM lab
                </Link>{" "}
                to practice access control hands-on.
              </li>
            </ul>
          </section>
        </div>
      </Container>
    </>
  );
}
