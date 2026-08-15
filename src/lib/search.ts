import { getAllFrameworks, getFrameworkDoc, getAllAiTopics, getAiTopicDoc } from "./content";
import { navSections } from "./site";
import { controls } from "./controls";

export type SearchDoc = {
  title: string;
  href: string;
  section: string;
  text: string;
};

/** Strip MDX/markdown to a plain-text excerpt for indexing. */
function toPlainText(mdx: string): string {
  return mdx
    .replace(/```[\s\S]*?```/g, " ") // fenced code
    .replace(/<[^>]+>/g, " ") // JSX/HTML tags
    .replace(/\{[^}]*\}/g, " ") // JSX expressions
    .replace(/[#>*_`|-]/g, " ") // markdown punctuation
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → text
    .replace(/\s+/g, " ")
    .trim();
}

/** Build the full search index. Runs at build time (static route). */
export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  // Section landing pages
  for (const s of navSections) {
    docs.push({ title: s.title, href: s.href, section: "Section", text: s.blurb });
  }

  // Frameworks (title + summary + body)
  for (const meta of getAllFrameworks()) {
    const doc = getFrameworkDoc(meta.slug);
    const body = doc ? toPlainText(doc.body) : "";
    docs.push({
      title: meta.title,
      href: `/frameworks/${meta.slug}`,
      section: "Framework",
      text: `${meta.summary} ${body}`.slice(0, 1200),
    });
  }

  // AI Security topics
  for (const meta of getAllAiTopics()) {
    const doc = getAiTopicDoc(meta.slug);
    const body = doc ? toPlainText(doc.body) : "";
    docs.push({
      title: meta.title,
      href: `/ai-security/${meta.slug}`,
      section: "AI Security",
      text: `${meta.summary} ${body}`.slice(0, 1200),
    });
  }

  // Controls
  for (const c of controls) {
    docs.push({
      title: c.name,
      href: `/control-mapping#${c.id}`,
      section: "Control",
      text: `${c.summary} ${c.mappings.map((m) => `${m.framework} ${m.reference}`).join(" ")}`,
    });
  }

  return docs;
}
