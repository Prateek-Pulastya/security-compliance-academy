import Link from "next/link";
import { ShieldCheck, Info } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { slugify } from "@/lib/content";
import { Mermaid } from "./mermaid";
import { BreachTimeline } from "./breach-timeline";
import { DataFlowDiagram } from "./data-flow-diagram";

function headingId(children: ReactNode): string | undefined {
  return typeof children === "string" ? slugify(children) : undefined;
}

/**
 * Callout that flags **official / normative requirement text**, keeping it
 * visually distinct from our explanation (a core content principle).
 */
function Official({ children }: { children: ReactNode }) {
  return (
    <aside className="my-6 rounded-lg border border-primary/30 bg-primary/5 p-4">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        Official requirement
      </p>
      <div className="mt-2 text-sm text-foreground/90 [&>p]:m-0">{children}</div>
    </aside>
  );
}

function Callout({ children, title = "Note" }: { children: ReactNode; title?: string }) {
  return (
    <aside className="my-6 rounded-lg border border-border bg-muted/40 p-4">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Info className="h-4 w-4" aria-hidden="true" />
        {title}
      </p>
      <div className="mt-2 text-sm text-foreground/90 [&>p]:m-0">{children}</div>
    </aside>
  );
}

function Anchor({ href = "", children, ...props }: ComponentProps<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link href={href} className="font-medium text-primary underline-offset-4 hover:underline">
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-primary underline-offset-4 hover:underline"
      {...props}
    >
      {children}
    </a>
  );
}

export const mdxComponents = {
  Official,
  Callout,
  Mermaid,
  BreachTimeline,
  DataFlowDiagram,
  a: Anchor,
  h2: ({ id, children }: ComponentProps<"h2">) => (
    <h2
      id={id ?? headingId(children)}
      className="mt-10 scroll-mt-24 text-xl font-semibold tracking-tight"
    >
      {children}
    </h2>
  ),
  h3: ({ id, children }: ComponentProps<"h3">) => (
    <h3
      id={id ?? headingId(children)}
      className="mt-8 scroll-mt-24 text-lg font-semibold tracking-tight"
    >
      {children}
    </h3>
  ),
  p: ({ children }: ComponentProps<"p">) => (
    <p className="mt-4 leading-7 text-foreground/90">{children}</p>
  ),
  ul: ({ children }: ComponentProps<"ul">) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-foreground/90 marker:text-muted-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }: ComponentProps<"ol">) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-foreground/90 marker:text-muted-foreground">
      {children}
    </ol>
  ),
  li: ({ children }: ComponentProps<"li">) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }: ComponentProps<"blockquote">) => (
    <blockquote className="mt-6 border-l-2 border-primary/40 pl-4 text-foreground/80 italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-border" />,
  table: ({ children }: ComponentProps<"table">) => (
    <div className="mt-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }: ComponentProps<"thead">) => <thead className="bg-muted/50">{children}</thead>,
  th: ({ children }: ComponentProps<"th">) => (
    <th className="border-b border-border px-4 py-2.5 font-semibold">{children}</th>
  ),
  td: ({ children }: ComponentProps<"td">) => (
    <td className="border-b border-border px-4 py-2.5 text-foreground/90">{children}</td>
  ),
  code: ({ children }: ComponentProps<"code">) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]">{children}</code>
  ),
  pre: ({ children }: ComponentProps<"pre">) => {
    // Intercept ```mermaid fences and render them as diagrams.
    const child = children as { props?: { className?: string; children?: unknown } } | undefined;
    const className = child?.props?.className ?? "";
    if (className.includes("language-mermaid")) {
      const raw = child?.props?.children;
      const code = typeof raw === "string" ? raw.replace(/\n$/, "") : "";
      return <Mermaid code={code} />;
    }
    return (
      <pre className="mt-6 overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 text-sm [&_code]:bg-transparent [&_code]:p-0">
        {children}
      </pre>
    );
  },
  strong: ({ children }: ComponentProps<"strong">) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
};
