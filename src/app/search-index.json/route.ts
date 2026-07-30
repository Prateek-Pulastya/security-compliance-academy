import { buildSearchIndex } from "@/lib/search";

// Statically generated at build time; served as a plain JSON file.
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex());
}
