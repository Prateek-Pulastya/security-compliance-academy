import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { navSections, siteConfig } from "@/lib/site";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-col gap-8 py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 font-semibold">
              <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
              {siteConfig.name}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{siteConfig.description}</p>
          </div>
          <nav aria-label="Sections" className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {navSections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.title}
              </Link>
            ))}
          </nav>
          <nav aria-label="More" className="flex flex-col gap-2 text-sm">
            {[
              { href: "/assistant", title: "Study Assistant" },
              { href: "/dashboard", title: "My Dashboard" },
              { href: "/contribute", title: "Contribute" },
              { href: "/enterprise", title: "For Teams" },
              { href: "/roadmap", title: "Build Roadmap" },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Open-source and free. Educational content — not legal or compliance advice.</p>
          <p>Built with Next.js, TypeScript &amp; Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}
