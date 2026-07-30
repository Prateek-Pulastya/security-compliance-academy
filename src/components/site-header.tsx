"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Menu, ShieldCheck, X } from "lucide-react";
import { primaryNav, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";
import { SiteSearch } from "./site-search";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="hidden sm:inline">{siteConfig.name}</span>
          <span className="sm:hidden">{siteConfig.shortName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                isActive(item.href) ? "text-primary" : "text-foreground/70 hover:text-foreground",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SiteSearch />
          <Link
            href="/dashboard"
            aria-label="My dashboard"
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border transition-colors hover:bg-muted",
              isActive("/dashboard") ? "text-primary" : "text-foreground/70",
            )}
          >
            <LayoutDashboard className="h-[1.1rem] w-[1.1rem]" />
          </Link>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <nav aria-label="Mobile" className="border-t border-border md:hidden">
          <Container className="flex flex-col py-2">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium",
                  isActive(item.href)
                    ? "bg-muted text-primary"
                    : "text-foreground/80 hover:bg-muted",
                )}
              >
                {item.title}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
