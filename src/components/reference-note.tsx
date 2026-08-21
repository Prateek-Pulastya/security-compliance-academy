import { Info } from "lucide-react";

/**
 * Banner shown on `stub: true` pages. States plainly that the page is a short
 * orientation, not a full guide — so the length never reads as an overclaim.
 */
export function ReferenceNote() {
  return (
    <aside className="mb-8 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-sm">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
      <p className="text-foreground/90">
        <span className="font-semibold">Reference note.</span> A short orientation, not a full guide.
        Read the primary source linked below.
      </p>
    </aside>
  );
}
