"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Control } from "@/lib/controls";
import { cn } from "@/lib/utils";

export function ControlExplorer({
  controls,
  frameworks,
}: {
  controls: Control[];
  frameworks: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeFramework, setActiveFramework] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return controls.filter((c) => {
      const matchesFramework = !activeFramework || c.mappings.some((m) => m.framework === activeFramework);
      if (!matchesFramework) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.mappings.some((m) => `${m.framework} ${m.reference} ${m.note}`.toLowerCase().includes(q))
      );
    });
  }, [controls, query, activeFramework]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search controls (e.g. encryption, logging, access)…"
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Filter by framework:</span>
          {frameworks.map((f) => {
            const active = activeFramework === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFramework(active ? null : f)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:bg-muted",
                )}
              >
                {f}
              </button>
            );
          })}
          {activeFramework && (
            <button
              type="button"
              onClick={() => setActiveFramework(null)}
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" /> clear
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {results.length} control{results.length === 1 ? "" : "s"}
        {activeFramework ? ` mapped to ${activeFramework}` : ""}
      </p>

      <div className="mt-4 space-y-4">
        {results.map((c) => (
          <article key={c.id} id={c.id} className="scroll-mt-24 rounded-xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">{c.name}</h3>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {c.category}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{c.summary}</p>
            <div className="mt-4 overflow-x-auto rounded-lg border border-border">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Framework / Service</th>
                    <th className="px-4 py-2 font-semibold">Reference</th>
                    <th className="px-4 py-2 font-semibold">What it requires</th>
                  </tr>
                </thead>
                <tbody>
                  {c.mappings.map((m) => {
                    const highlight = activeFramework === m.framework;
                    return (
                      <tr key={m.framework} className={highlight ? "bg-primary/5" : ""}>
                        <td className={cn("px-4 py-2 font-medium", highlight && "text-primary")}>
                          {m.framework}
                        </td>
                        <td className="px-4 py-2 text-muted-foreground">{m.reference}</td>
                        <td className="px-4 py-2 text-muted-foreground">{m.note}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </article>
        ))}

        {results.length === 0 && (
          <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No controls match your search.
          </div>
        )}
      </div>
    </div>
  );
}
