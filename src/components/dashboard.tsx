"use client";

import Link from "next/link";
import { Bookmark, CheckCircle2, Circle, Trash2 } from "lucide-react";
import { useBookmarks, useCompleted } from "@/lib/progress";

export type CatalogItem = { href: string; title: string; kind: string };

export function Dashboard({ catalog }: { catalog: CatalogItem[] }) {
  const { isComplete, toggle: toggleComplete, count } = useCompleted();
  const { bookmarks, toggle: toggleBookmark } = useBookmarks();

  const total = catalog.length;
  const doneInCatalog = catalog.filter((c) => isComplete(c.href)).length;
  const pct = total ? Math.round((doneInCatalog / total) * 100) : 0;

  return (
    <div className="space-y-12">
      {/* Progress */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Your progress</h2>
          <span className="text-sm text-muted-foreground">
            {doneInCatalog} / {total} complete
          </span>
        </div>
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {pct}% · {count} item{count === 1 ? "" : "s"} marked complete overall.
        </p>

        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {catalog.map((c) => {
            const done = isComplete(c.href);
            return (
              <li
                key={c.href}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-2.5"
              >
                <Link href={c.href} className="min-w-0 truncate text-sm font-medium hover:text-primary">
                  {c.title}
                  <span className="ml-2 text-[10px] uppercase tracking-wide text-muted-foreground">
                    {c.kind}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => toggleComplete(c.href)}
                  aria-label={done ? "Mark incomplete" : "Mark complete"}
                  className={done ? "text-primary" : "text-muted-foreground hover:text-foreground"}
                >
                  {done ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Bookmarks */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight">Bookmarks</h2>
        {bookmarks.length === 0 ? (
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
            <Bookmark className="h-5 w-5" />
            No bookmarks yet. Use the bookmark button on any framework or lab.
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {bookmarks.map((b) => (
              <li
                key={b.href}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-2.5"
              >
                <Link href={b.href} className="min-w-0 truncate text-sm font-medium hover:text-primary">
                  {b.title}
                  <span className="ml-2 text-[10px] uppercase tracking-wide text-muted-foreground">
                    {b.kind}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => toggleBookmark(b)}
                  aria-label="Remove bookmark"
                  className="text-muted-foreground hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="text-xs text-muted-foreground">
        Progress and bookmarks are stored locally in your browser — nothing is sent to a server.
      </p>
    </div>
  );
}
