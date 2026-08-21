import type { MetadataRoute } from "next";
import { siteConfig, navSections } from "@/lib/site";
import { getAllFrameworks, getAllLabs, getAllPosts, getAllAiTopics, getAllTopics } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const staticRoutes = [
    "/",
    "/dashboard",
    "/assistant",
    "/contribute",
    ...navSections.map((s) => s.href),
  ];
  const frameworkRoutes = getAllFrameworks().map((f) => `/frameworks/${f.slug}`);
  const labRoutes = getAllLabs().map((l) => `/labs/${l.slug}`);
  const postRoutes = getAllPosts().map((p) => `/blog/${p.slug}`);
  const aiRoutes = getAllAiTopics().map((t) => `/ai-security/${t.slug}`);
  const cloudRoutes = getAllTopics("cloud").map((t) => `/cloud/${t.slug}`);

  return [
    ...staticRoutes,
    ...frameworkRoutes,
    ...labRoutes,
    ...postRoutes,
    ...aiRoutes,
    ...cloudRoutes,
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
