"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated personal-data-flow diagram (GDPR). Shows how personal data moves
 * from the data subject through a controller and processor to a third party,
 * using the conventional data-flow-map colour legend. An animated dot traces
 * the path; reduced-motion viewers see a static diagram. Colour is never the
 * only cue — every node is labelled.
 */
const nodes = [
  { key: "subject", label: "Data subject", role: "Provides data", color: "#0ea5e9" },
  { key: "controller", label: "Controller", role: "Your systems", color: "#10b981" },
  { key: "processor", label: "Processor", role: "Acts for you", color: "#f59e0b" },
  { key: "third", label: "Third party", role: "Independent recipient", color: "#8b5cf6" },
];

export function DataFlowDiagram() {
  const reduce = useReducedMotion();

  return (
    <figure className="my-6 rounded-lg border border-border bg-card p-5">
      <div className="relative">
        {/* connecting track */}
        <div className="absolute left-[12%] right-[12%] top-6 h-0.5 bg-border" aria-hidden="true" />
        {/* travelling dot */}
        {!reduce && (
          <motion.div
            className="absolute top-6 h-3 w-3 -translate-y-1/2 rounded-full bg-primary shadow"
            aria-hidden="true"
            initial={{ left: "12%" }}
            animate={{ left: ["12%", "88%"] }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
          />
        )}
        <ol className="relative grid grid-cols-4 gap-2">
          {nodes.map((n) => (
            <li key={n.key} className="flex flex-col items-center text-center">
              <span
                className="z-10 h-6 w-6 rounded-full border-2 bg-background"
                style={{ borderColor: n.color }}
                aria-hidden="true"
              />
              <span className="mt-2 text-xs font-semibold">{n.label}</span>
              <span className="text-[11px] text-muted-foreground">{n.role}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        {nodes.map((n) => (
          <span key={n.key} className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: n.color }} aria-hidden="true" />
            {n.label}
          </span>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Personal-data flow — a data-flow map is the technique used to build a Record of Processing
        Activities (RoPA, GDPR Art. 30).
      </figcaption>
    </figure>
  );
}
