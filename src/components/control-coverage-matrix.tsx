"use client";

import { Check } from "lucide-react";
import { controls, coverageFrameworks, coverageRef } from "@/lib/controls";

/**
 * Control-coverage heatmap (control × framework), in the spirit of the MITRE
 * ATT&CK Navigator. A filled cell means the control maps to that framework;
 * hover a cell for the specific reference. Coverage is never encoded by colour
 * alone — filled cells carry a check icon and each row shows a count.
 */
export function ControlCoverageMatrix() {
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="sticky left-0 z-10 bg-muted/50 px-4 py-3 font-semibold">Control</th>
              {coverageFrameworks.map((f) => (
                <th key={f} className="px-3 py-3 text-center text-xs font-semibold">
                  {f}
                </th>
              ))}
              <th className="px-3 py-3 text-center text-xs font-semibold">Coverage</th>
            </tr>
          </thead>
          <tbody>
            {controls.map((c, i) => {
              const covered = coverageFrameworks.filter((f) => coverageRef(c, f)).length;
              return (
                <tr key={c.id} className={i % 2 ? "bg-muted/20" : ""}>
                  <th className="sticky left-0 z-10 bg-background px-4 py-2.5 text-left font-medium">
                    {c.name}
                  </th>
                  {coverageFrameworks.map((f) => {
                    const ref = coverageRef(c, f);
                    return (
                      <td key={f} className="px-2 py-2 text-center">
                        {ref ? (
                          <span
                            title={`${f}: ${ref}`}
                            className="mx-auto flex h-7 w-full min-w-7 items-center justify-center rounded bg-primary/15 text-primary"
                          >
                            <Check className="h-4 w-4" aria-hidden="true" />
                            <span className="sr-only">Mapped — {ref}</span>
                          </span>
                        ) : (
                          <span className="mx-auto block h-7 rounded bg-muted/40" aria-label="Not mapped" />
                        )}
                      </td>
                    );
                  })}
                  <td className="px-3 py-2.5 text-center">
                    <span className="inline-flex rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {covered}/{coverageFrameworks.length}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/15 text-primary">
            <Check className="h-3.5 w-3.5" />
          </span>
          Maps to framework (hover for the reference)
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-5 w-5 rounded bg-muted/40" />
          Not directly mapped
        </span>
      </div>
    </div>
  );
}
