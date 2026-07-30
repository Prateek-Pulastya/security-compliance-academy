"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { SearchDoc } from "@/lib/search";

type Answer = { doc: SearchDoc; excerpt: string; score: number };

const SUGGESTIONS = [
  "What is least privilege?",
  "How does GDPR Article 32 work?",
  "What is prompt injection?",
  "Compare SOC 2 Type I and Type II",
];

function excerptFor(text: string, terms: string[]): string {
  const lower = text.toLowerCase();
  const hit = terms.map((t) => lower.indexOf(t)).filter((i) => i >= 0).sort((a, b) => a - b)[0] ?? 0;
  const start = Math.max(0, hit - 60);
  return (start > 0 ? "…" : "") + text.slice(start, start + 220).trim() + "…";
}

export function StudyAssistant() {
  const [index, setIndex] = useState<SearchDoc[] | null>(null);
  const [query, setQuery] = useState("");
  const [answers, setAnswers] = useState<Answer[] | null>(null);

  useEffect(() => {
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((d: SearchDoc[]) => setIndex(d))
      .catch(() => setIndex([]));
  }, []);

  function ask(q: string) {
    setQuery(q);
    const terms = q.toLowerCase().match(/[a-z0-9]+/g)?.filter((t) => t.length > 2) ?? [];
    if (!index || terms.length === 0) {
      setAnswers([]);
      return;
    }
    const scored = index
      .map((doc) => {
        const hay = `${doc.title} ${doc.text}`.toLowerCase();
        const titleHay = doc.title.toLowerCase();
        let score = 0;
        for (const t of terms) {
          if (titleHay.includes(t)) score += 5;
          const matches = hay.split(t).length - 1;
          score += matches;
        }
        return { doc, score, excerpt: excerptFor(doc.text, terms) };
      })
      .filter((a) => a.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    setAnswers(scored);
  }

  return (
    <div>
      <div className="rounded-xl border border-border bg-card p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(query);
          }}
        >
          <label htmlFor="ask" className="text-sm font-medium">
            Ask a question
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id="ask"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. How do I enforce least privilege?"
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Ask
            </button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => ask(s)}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {answers && (
        <div className="mt-8">
          {answers.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No matching content found. Try rephrasing, or browse the{" "}
              <Link href="/frameworks" className="text-primary hover:underline">
                frameworks
              </Link>
              .
            </p>
          ) : (
            <>
              <p className="text-sm font-medium text-muted-foreground">
                From the academy&apos;s content:
              </p>
              <div className="mt-4 space-y-4">
                {answers.map((a) => (
                  <article key={a.doc.href} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold">{a.doc.title}</h3>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        {a.doc.section}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
                    <Link
                      href={a.doc.href}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <p className="mt-8 flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-4 text-xs text-muted-foreground">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <span>
          This assistant retrieves and links the most relevant academy content — it does not generate
          answers. A generative AI tutor (backed by a Claude model over this same content) is the
          planned next step; the retrieval index it would ground on is already in place.
        </span>
      </p>
    </div>
  );
}
