"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Bell, Search, Users } from "lucide-react";

/**
 * Animated GDPR breach-response timeline. The 72-hour clock starts when the
 * controller becomes AWARE of the breach (not when it occurred). An animated
 * sweep loops across the milestones; when the viewer prefers reduced motion,
 * the bar is shown filled and static.
 */
const steps = [
  { t: "0h", label: "Become aware", icon: Search, note: "Clock starts on awareness" },
  { t: "→", label: "Assess risk", icon: AlertTriangle, note: "Risk to individuals?" },
  { t: "≤72h", label: "Notify authority", icon: Bell, note: "Art. 33 — if risk" },
  { t: "then", label: "Notify individuals", icon: Users, note: "Art. 34 — if high risk" },
];

export function BreachTimeline() {
  const reduce = useReducedMotion();

  return (
    <figure className="my-6 rounded-lg border border-border bg-card p-5">
      <div className="relative">
        {/* track */}
        <div className="absolute left-0 right-0 top-5 h-1 rounded-full bg-muted" aria-hidden="true" />
        {/* animated sweep */}
        <motion.div
          className="absolute left-0 top-5 h-1 rounded-full bg-primary"
          aria-hidden="true"
          initial={{ width: reduce ? "100%" : "0%" }}
          animate={reduce ? { width: "100%" } : { width: ["0%", "100%"] }}
          transition={reduce ? undefined : { duration: 4, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
        />
        <ol className="relative grid grid-cols-4 gap-2">
          {steps.map((s) => (
            <li key={s.label} className="flex flex-col items-center text-center">
              <span className="z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-background text-primary">
                <s.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="mt-2 text-xs font-semibold">{s.t}</span>
              <span className="text-xs font-medium">{s.label}</span>
              <span className="mt-0.5 text-[11px] text-muted-foreground">{s.note}</span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-4 text-center text-xs text-muted-foreground">
        GDPR breach-notification timeline — the 72-hour clock runs from awareness (Art. 33/34).
      </figcaption>
    </figure>
  );
}
