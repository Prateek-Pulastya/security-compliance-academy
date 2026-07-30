import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center py-28 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        That page does not exist yet. It may be scheduled for a later roadmap phase.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/"
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Back home
        </Link>
        <Link
          href="/frameworks"
          className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
        >
          Browse frameworks
        </Link>
      </div>
    </Container>
  );
}
