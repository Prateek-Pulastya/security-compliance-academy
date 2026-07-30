import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Dashboard, type CatalogItem } from "@/components/dashboard";
import { getAllFrameworks, getAllLabs } from "@/lib/content";

export const metadata: Metadata = {
  title: "My Dashboard",
  description: "Track your learning progress and bookmarks — stored locally in your browser.",
};

export default function DashboardPage() {
  const catalog: CatalogItem[] = [
    ...getAllFrameworks().map((f) => ({
      href: `/frameworks/${f.slug}`,
      title: f.title,
      kind: "Framework",
    })),
    ...getAllLabs().map((l) => ({ href: `/labs/${l.slug}`, title: l.title, kind: "Lab" })),
  ];

  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title="Your learning"
        description="Track progress and revisit bookmarks. Everything here is stored locally in your browser."
      />
      <Container className="py-12">
        <Dashboard catalog={catalog} />
      </Container>
    </>
  );
}
