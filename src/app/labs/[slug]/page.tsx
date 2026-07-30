import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { CheckCircle2, Clock, Signal } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { mdxComponents } from "@/components/mdx";
import { ContentActions } from "@/components/content-actions";
import { getLabDoc, getLabSlugs } from "@/lib/content";

export function generateStaticParams() {
  return getLabSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLabDoc(slug);
  if (!doc) return { title: "Lab not found" };
  return { title: doc.meta.title, description: doc.meta.summary };
}

export default async function LabPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getLabDoc(slug);
  if (!doc) notFound();

  const { meta, body } = doc;
  const { content } = await compileMDX({
    source: body,
    components: mdxComponents,
    options: { mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } },
  });

  return (
    <>
      <PageHeader eyebrow="Lab" title={meta.title} description={meta.summary} />
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
          <article className="min-w-0">
            <ContentActions href={`/labs/${slug}`} title={meta.title} kind="Lab" />
            <div className="mt-8">{content}</div>
          </article>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Signal className="h-3.5 w-3.5" /> {meta.difficulty}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {meta.duration}
                </span>
              </div>
              {meta.objectives.length > 0 && (
                <>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    You will learn to
                  </p>
                  <ul className="mt-2 space-y-2 text-sm">
                    {meta.objectives.map((o) => (
                      <li key={o} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-foreground/90">{o}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
