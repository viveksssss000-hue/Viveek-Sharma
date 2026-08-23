import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { formatDate, toIsoDate } from "@/lib/dates";
import { extractToc, renderMarkdown } from "@/lib/markdown";

/**
 * The blog engine (spec 7.8.3).
 *
 * Articles are markdown files in /content/posts, with front matter. That choice
 * satisfies the requirement that the client can publish and edit without the
 * developer: the CMS at /admin writes these same files, so the editor and the
 * repository are always the same content, and an article can equally be edited
 * by hand.
 *
 * What the spec requires and where it happens:
 *  - Custom title tag, meta description, slug and Open Graph image per article
 *    -> front matter fields below.
 *  - Article structured data -> ArticleSchema, from these same fields.
 *  - RSS at /feed.xml, sitemap inclusion -> both read getPublishedPosts().
 *  - Draft articles are not publicly accessible and not in the sitemap
 *    -> `draft: true` in front matter, filtered in getPublishedPosts().
 *  - A category field exists in the data now even though nothing displays it,
 *    so PHASE 2 filters do not need a migration.
 */

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFrontMatter = {
  title: string;
  /** Overrides the <title> tag. Falls back to `title` when absent. */
  metaTitle?: string;
  description: string;
  /** ISO date, e.g. 2026-09-03. */
  date: string;
  /** ISO date of the last substantive edit. Defaults to `date`. */
  updated?: string;
  author?: string;
  authorRole?: string;
  /** Path under /public, e.g. /images/blog/thing.jpg */
  image?: string;
  imageAlt?: string;
  /** PHASE 2: nothing displays this yet (spec 7.8.1). */
  category?: string;
  /** Manually chosen at launch - no related-articles algorithm yet. */
  related?: string[];
  draft?: boolean;
};

export type Post = PostFrontMatter & {
  slug: string;
  html: string;
  readingMinutes: number;
  /** H2 headings, for the table of contents on long articles. */
  toc: { id: string; text: string }[];
  wordCount: number;
};

function readPost(fileName: string): Post | null {
  const filePath = path.join(POSTS_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const front = data as PostFrontMatter;

  // YAML parses an unquoted date into a Date object, so both fields are
  // normalised to "YYYY-MM-DD" before anything downstream touches them.
  const date = toIsoDate(data.date);
  const updated = toIsoDate(data.updated);

  if (!front.title || !front.description || !date) {
    console.warn(
      `[posts] ${fileName} is missing title, description or a usable date - skipped.`
    );
    return null;
  }

  const words = content.trim().split(/\s+/).filter(Boolean).length;

  // Table of contents from the H2 headings only (spec 7.8.2).
  const toc = extractToc(content);

  return {
    ...front,
    date,
    updated: updated ?? undefined,
    slug: fileName.replace(/\.mdx?$/, ""),
    html: renderMarkdown(content),
    // 225 words a minute, rounded up. Never shown as "0 min read".
    readingMinutes: Math.max(1, Math.round(words / 225)),
    wordCount: words,
    toc,
  };
}

function allPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => /\.mdx?$/.test(file))
    .map(readPost)
    .filter((post): post is Post => post !== null);
}

/** Newest first. Drafts excluded, so they are neither listed nor in the sitemap. */
export function getPublishedPosts(): Post[] {
  return allPosts()
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Returns null for a draft or a missing slug, so the route can 404. */
export function getPost(slug: string): Post | null {
  const post = allPosts().find((item) => item.slug === slug);
  if (!post || post.draft) return null;
  return post;
}

/** Manually chosen related articles, falling back to the two newest others. */
export function getRelatedPosts(post: Post, limit = 2): Post[] {
  const published = getPublishedPosts().filter((p) => p.slug !== post.slug);
  if (post.related?.length) {
    const chosen = post.related
      .map((slug) => published.find((p) => p.slug === slug))
      .filter((p): p is Post => Boolean(p));
    if (chosen.length) return chosen.slice(0, limit);
  }
  return published.slice(0, limit);
}

/** "September 3, 2026" - the blog date format from Appendix C. */
export const formatPostDate = formatDate;
