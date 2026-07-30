import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { mdxComponents } from "@/components/mdx";
import { getPostDoc, getPostSlugs } from "@/lib/content";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getPostDoc(slug);
  if (!doc) return { title: "Post not found" };
  return { title: doc.meta.title, description: doc.meta.summary };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getPostDoc(slug);
  if (!doc) notFound();

  const { meta, body } = doc;
  const { content } = await compileMDX({
    source: body,
    components: mdxComponents,
    options: { mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } },
  });

  return (
    <>
      <PageHeader eyebrow={`${meta.date} · ${meta.author}`} title={meta.title} description={meta.summary} />
      <Container className="py-12">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All posts
          </Link>
          <article className="mt-6">{content}</article>
        </div>
      </Container>
    </>
  );
}
