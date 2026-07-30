"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import type { SearchDoc } from "@/lib/search";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

function score(doc: SearchDoc, q: string): number {
  const title = doc.title.toLowerCase();
  const text = doc.text.toLowerCase();
  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  if (text.includes(q)) return 30;
  return 0;
}

export function SiteSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<SearchDoc[] | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const openDialog = useCallback(() => {
    setOpen(true);
    setActive(0);
  }, []);

  // Global Cmd/Ctrl+K to open, Escape to close.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setActive(0);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lazy-load the index and focus the input the first time the dialog opens.
  useEffect(() => {
    if (!open) return;
    if (!index) {
      fetch(withBasePath("/search-index.json"))
        .then((r) => r.json())
        .then((data: SearchDoc[]) => setIndex(data))
        .catch(() => setIndex([]));
    }
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [open, index]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || !index) return [];
    return index
      .map((doc) => ({ doc, s: score(doc, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((x) => x.doc);
  }, [query, index]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router],
  );

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active].href);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        aria-label="Search"
        className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted sm:px-3"
      >
        <Search className="h-4 w-4" />
        <span className="hidden lg:inline">Search</span>
        <kbd className="hidden rounded border border-border bg-muted px-1.5 text-[10px] font-medium lg:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 p-4 pt-[10vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Site search"
            className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Search frameworks, controls, sections…"
                className="w-full bg-transparent py-3.5 text-sm outline-none"
              />
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {query && results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                  {index ? "No results." : "Loading…"}
                </li>
              )}
              {results.map((doc, i) => (
                <li key={doc.href}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(doc.href)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left",
                      i === active ? "bg-muted" : "hover:bg-muted/60",
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{doc.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">{doc.text}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                      {doc.section}
                    </span>
                  </button>
                </li>
              ))}
              {!query && (
                <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                  Type to search the academy.
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
