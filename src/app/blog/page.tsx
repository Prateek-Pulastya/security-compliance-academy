import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Updates, deep dives, and analysis of the evolving security and compliance landscape.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Updates & deep dives"
        description="Analysis of the evolving security and compliance landscape."
      />
      <Container className="py-12">
        <div className="mx-auto max-w-2xl space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <time dateTime={post.date}>{post.date}</time>
                <span>·</span>
                <span>{post.author}</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.summary}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Read
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
          {posts.length === 0 && (
            <p className="text-sm text-muted-foreground">No posts yet.</p>
          )}
        </div>
      </Container>
    </>
  );
}
