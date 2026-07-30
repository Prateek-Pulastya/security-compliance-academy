import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { comparisonRows, obligationStyles } from "@/lib/comparison";

export const metadata: Metadata = {
  title: "Compliance Comparison",
  description:
    "Compare security and compliance frameworks side by side: region, nature, obligation, and assurance model.",
};

export default function ComparePage() {
  return (
    <>
      <PageHeader
        eyebrow="Compliance Comparison"
        title="Compare frameworks side by side"
        description="Region, nature, obligation, and how each framework is assured — at a glance."
      />
      <Container className="py-12">
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 font-semibold">Framework</th>
                <th className="px-4 py-3 font-semibold">Region</th>
                <th className="px-4 py-3 font-semibold">Nature</th>
                <th className="px-4 py-3 font-semibold">Obligation</th>
                <th className="px-4 py-3 font-semibold">Assurance</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.slug} className={i % 2 ? "bg-muted/20" : ""}>
                  <td className="px-4 py-3 font-medium">
                    <Link
                      href={`/frameworks/${row.slug}`}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.region}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.nature}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${obligationStyles[row.obligation]}`}
                    >
                      {row.obligation}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.assurance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          High-level comparison for orientation. Obligation depends on your sector and jurisdiction;
          always confirm applicability against the authoritative text. A richer, filterable
          comparator is planned as this section matures.
        </p>
      </Container>
    </>
  );
}
