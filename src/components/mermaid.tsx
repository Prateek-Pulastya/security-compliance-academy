"use client";

import { useEffect, useId, useState } from "react";

/**
 * Client-side Mermaid diagram. Renders `code` to SVG and re-renders when the
 * site theme flips (listening for the "themechange" event dispatched by the
 * theme toggle). Mermaid is imported dynamically so it stays out of the
 * server bundle and only loads where a diagram is used.
 */
export function Mermaid({ code, caption }: { code: string; caption?: string }) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [svg, setSvg] = useState<string>("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        const isDark = document.documentElement.classList.contains("dark");
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "neutral",
          securityLevel: "strict",
          fontFamily: "var(--font-sans), system-ui, sans-serif",
        });
        const { svg } = await mermaid.render(`mmd-${rawId}`, code);
        if (active) {
          setSvg(svg);
          setFailed(false);
        }
      } catch {
        if (active) setFailed(true);
      }
    }

    render();
    window.addEventListener("themechange", render);
    return () => {
      active = false;
      window.removeEventListener("themechange", render);
    };
  }, [code, rawId]);

  return (
    <figure className="my-6">
      <div className="flex justify-center overflow-x-auto rounded-lg border border-border bg-card p-4">
        {failed ? (
          <pre className="text-xs text-muted-foreground">{code}</pre>
        ) : svg ? (
          <div className="[&_svg]:h-auto [&_svg]:max-w-full" dangerouslySetInnerHTML={{ __html: svg }} />
        ) : (
          <div className="h-24 w-full animate-pulse rounded bg-muted" aria-hidden="true" />
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
