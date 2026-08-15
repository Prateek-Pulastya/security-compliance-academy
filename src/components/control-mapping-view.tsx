"use client";

import { useState } from "react";
import { LayoutGrid, Table2 } from "lucide-react";
import { ControlExplorer } from "./control-explorer";
import { ControlCoverageMatrix } from "./control-coverage-matrix";
import { cn } from "@/lib/utils";

type View = "explorer" | "matrix";

export function ControlMappingView({ frameworks }: { frameworks: string[] }) {
  const [view, setView] = useState<View>("explorer");

  const tabs: { key: View; label: string; icon: typeof LayoutGrid }[] = [
    { key: "explorer", label: "Explorer", icon: LayoutGrid },
    { key: "matrix", label: "Coverage matrix", icon: Table2 },
  ];

  return (
    <div>
      <div className="mb-8 inline-flex rounded-lg border border-border p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setView(t.key)}
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
              view === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {view === "explorer" ? <ControlExplorer frameworks={frameworks} /> : <ControlCoverageMatrix />}
    </div>
  );
}
