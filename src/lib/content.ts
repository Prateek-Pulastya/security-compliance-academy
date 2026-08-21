import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const CONTENT_ROOT = join(process.cwd(), "content");

export type FrameworkCategory = "GRC" | "Cloud" | "AI" | "Privacy" | "Operational Resilience";
export type FrameworkStatus = "draft" | "in-progress" | "published";

export type Source = { name: string; url: string };

export type FrameworkMeta = {
  slug: string;
  title: string;
  category: FrameworkCategory;
  status: FrameworkStatus;
  summary: string;
  updated: string;
  sources: Source[];
  focus: string[];
  stub: boolean;
};

export type FrameworkDoc = {
  meta: FrameworkMeta;
  body: string;
};

export type TocItem = { depth: 2 | 3; text: string; id: string };

/** Slugify a heading the same way rehype-slug/github-slugger does for simple text. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

function frameworksDir() {
  return join(CONTENT_ROOT, "frameworks");
}

function isContentFile(name: string) {
  return name.endsWith(".mdx") && !name.startsWith("_");
}

export function getFrameworkSlugs(): string[] {
  return readdirSync(frameworksDir())
    .filter(isContentFile)
    .map((n) => n.replace(/\.mdx$/, ""));
}

function toMeta(slug: string, data: Record<string, unknown>): FrameworkMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    category: (data.category as FrameworkCategory) ?? "GRC",
    status: (data.status as FrameworkStatus) ?? "draft",
    summary: String(data.summary ?? ""),
    updated: String(data.updated ?? ""),
    sources: Array.isArray(data.sources) ? (data.sources as Source[]) : [],
    focus: Array.isArray(data.focus) ? (data.focus as string[]) : [],
    stub: data.stub === true,
  };
}

export function getFrameworkDoc(slug: string): FrameworkDoc | null {
  try {
    const raw = readFileSync(join(frameworksDir(), `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    return { meta: toMeta(slug, data), body: content };
  } catch {
    return null;
  }
}

const STATUS_ORDER: Record<FrameworkStatus, number> = {
  published: 0,
  "in-progress": 1,
  draft: 2,
};

/** All framework metadata, ordered by status then title. Build-time (sync fs). */
export function getAllFrameworks(): FrameworkMeta[] {
  return getFrameworkSlugs()
    .map((slug) => getFrameworkDoc(slug)?.meta)
    .filter((m): m is FrameworkMeta => Boolean(m))
    .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status] || a.title.localeCompare(b.title));
}

// ---------------------------------------------------------------------------
// Labs
// ---------------------------------------------------------------------------

export type LabDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type LabMeta = {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  difficulty: LabDifficulty;
  duration: string;
  framework?: string;
  objectives: string[];
};

export type LabDoc = { meta: LabMeta; body: string };

function labsDir() {
  return join(CONTENT_ROOT, "labs");
}

export function getLabSlugs(): string[] {
  return readdirSync(labsDir())
    .filter(isContentFile)
    .map((n) => n.replace(/\.mdx$/, ""));
}

export function getLabDoc(slug: string): LabDoc | null {
  try {
    const raw = readFileSync(join(labsDir(), `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    return {
      meta: {
        slug,
        title: String(data.title ?? slug),
        summary: String(data.summary ?? ""),
        updated: String(data.updated ?? ""),
        difficulty: (data.difficulty as LabDifficulty) ?? "Beginner",
        duration: String(data.duration ?? ""),
        framework: data.framework ? String(data.framework) : undefined,
        objectives: Array.isArray(data.objectives) ? (data.objectives as string[]) : [],
      },
      body: content,
    };
  } catch {
    return null;
  }
}

const DIFFICULTY_ORDER: Record<LabDifficulty, number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
};

export function getAllLabs(): LabMeta[] {
  return getLabSlugs()
    .map((slug) => getLabDoc(slug)?.meta)
    .filter((m): m is LabMeta => Boolean(m))
    .sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty] || a.title.localeCompare(b.title));
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

export type PostMeta = {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  author: string;
  date: string;
  tags: string[];
};

export type PostDoc = { meta: PostMeta; body: string };

function blogDir() {
  return join(CONTENT_ROOT, "blog");
}

export function getPostSlugs(): string[] {
  try {
    return readdirSync(blogDir())
      .filter(isContentFile)
      .map((n) => n.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export function getPostDoc(slug: string): PostDoc | null {
  try {
    const raw = readFileSync(join(blogDir(), `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    return {
      meta: {
        slug,
        title: String(data.title ?? slug),
        summary: String(data.summary ?? ""),
        updated: String(data.updated ?? ""),
        author: String(data.author ?? ""),
        date: String(data.date ?? ""),
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      },
      body: content,
    };
  } catch {
    return null;
  }
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostDoc(slug)?.meta)
    .filter((m): m is PostMeta => Boolean(m))
    .sort((a, b) => b.date.localeCompare(a.date));
}

// ---------------------------------------------------------------------------
// AI Security topics
// ---------------------------------------------------------------------------

export type AiTopicKind = "Framework" | "Threat" | "Practice";

export type AiTopicMeta = {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  kind: AiTopicKind;
  order: number;
  sources: Source[];
  stub: boolean;
};

export type AiTopicDoc = { meta: AiTopicMeta; body: string };

function aiDir() {
  return join(CONTENT_ROOT, "ai-security");
}

export function getAiTopicSlugs(): string[] {
  try {
    return readdirSync(aiDir())
      .filter(isContentFile)
      .map((n) => n.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export function getAiTopicDoc(slug: string): AiTopicDoc | null {
  try {
    const raw = readFileSync(join(aiDir(), `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    return {
      meta: {
        slug,
        title: String(data.title ?? slug),
        summary: String(data.summary ?? ""),
        updated: String(data.updated ?? ""),
        kind: (data.kind as AiTopicKind) ?? "Practice",
        order: Number(data.order ?? 99),
        sources: Array.isArray(data.sources) ? (data.sources as Source[]) : [],
        stub: data.stub === true,
      },
      body: content,
    };
  } catch {
    return null;
  }
}

export function getAllAiTopics(): AiTopicMeta[] {
  return getAiTopicSlugs()
    .map((slug) => getAiTopicDoc(slug)?.meta)
    .filter((m): m is AiTopicMeta => Boolean(m))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

// ---------------------------------------------------------------------------
// Generic topic collections (Cloud, Threat Modeling, …)
// ---------------------------------------------------------------------------

export type TopicMeta = {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  kind: string;
  order: number;
  sources: Source[];
  stub: boolean;
};

export type TopicDoc = { meta: TopicMeta; body: string };

export function getTopicSlugs(collection: string): string[] {
  try {
    return readdirSync(join(CONTENT_ROOT, collection))
      .filter(isContentFile)
      .map((n) => n.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export function getTopicDoc(collection: string, slug: string): TopicDoc | null {
  try {
    const raw = readFileSync(join(CONTENT_ROOT, collection, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    return {
      meta: {
        slug,
        title: String(data.title ?? slug),
        summary: String(data.summary ?? ""),
        updated: String(data.updated ?? ""),
        kind: String(data.kind ?? "Topic"),
        order: Number(data.order ?? 99),
        sources: Array.isArray(data.sources) ? (data.sources as Source[]) : [],
        stub: data.stub === true,
      },
      body: content,
    };
  } catch {
    return null;
  }
}

export function getAllTopics(collection: string): TopicMeta[] {
  return getTopicSlugs(collection)
    .map((slug) => getTopicDoc(collection, slug)?.meta)
    .filter((m): m is TopicMeta => Boolean(m))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

/** Extract an H2/H3 table of contents from raw MDX (skips fenced code blocks). */
export function extractToc(body: string): TocItem[] {
  const items: TocItem[] = [];
  let inFence = false;
  for (const line of body.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.*)$/.exec(line);
    if (m) {
      const text = m[2].replace(/#+\s*$/, "").trim();
      items.push({ depth: m[1].length as 2 | 3, text, id: slugify(text) });
    }
  }
  return items;
}
