import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { mdxComponents } from "@/components/mdx";
import { ContentActions } from "@/components/content-actions";
import { ReferenceNote } from "@/components/reference-note";
import { getAiTopicDoc, getAiTopicSlugs, extractToc } from "@/lib/content";

export function generateStaticParams() {
  return getAiTopicSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getAiTopicDoc(slug);
  if (!doc) return { title: "Topic not found" };
  return { title: doc.meta.title, description: doc.meta.summary };
}

export default async function AiTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getAiTopicDoc(slug);
  if (!doc) notFound();

  const { meta, body } = doc;
  const toc = extractToc(body);
  const { content } = await compileMDX({
    source: body,
    components: mdxComponents,
    options: { mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } },
  });

  return (
    <>
      <PageHeader eyebrow={`AI Security · ${meta.kind}`} title={meta.title} description={meta.summary} />
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_240px]">
          <article className="min-w-0">
            <ContentActions href={`/ai-security/${slug}`} title={meta.title} kind="AI Security" />
            <div className="mt-8">
              {meta.stub && <ReferenceNote />}
              {content}
            </div>

            {meta.sources.length > 0 && (
              <section className="mt-12 border-t border-border pt-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Primary sources
                </h2>
                <ul className="mt-3 space-y-2">
                  {meta.sources.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                      >
                        {s.name}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          {toc.length > 0 && (
            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  On this page
                </p>
                <nav className="mt-3 flex flex-col gap-1.5 text-sm">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </Container>
    </>
  );
}
