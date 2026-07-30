"use client";

import { Bookmark, BookmarkCheck, CheckCircle2, Circle } from "lucide-react";
import { useBookmarks, useCompleted } from "@/lib/progress";
import { cn } from "@/lib/utils";

export function ContentActions({
  href,
  title,
  kind,
}: {
  href: string;
  title: string;
  kind: string;
}) {
  const { isComplete, toggle: toggleComplete } = useCompleted();
  const { isBookmarked, toggle: toggleBookmark } = useBookmarks();
  const done = isComplete(href);
  const saved = isBookmarked(href);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => toggleComplete(href)}
        aria-pressed={done}
        className={cn(
          "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
          done
            ? "border-primary bg-primary/10 text-primary"
            : "border-border text-foreground/80 hover:bg-muted",
        )}
      >
        {done ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
        {done ? "Completed" : "Mark complete"}
      </button>
      <button
        type="button"
        onClick={() => toggleBookmark({ href, title, kind })}
        aria-pressed={saved}
        className={cn(
          "inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
          saved
            ? "border-accent bg-accent/10 text-accent"
            : "border-border text-foreground/80 hover:bg-muted",
        )}
      >
        {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
        {saved ? "Bookmarked" : "Bookmark"}
      </button>
    </div>
  );
}
