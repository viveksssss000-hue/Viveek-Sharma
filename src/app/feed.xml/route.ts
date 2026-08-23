import { routes } from "@/content/global";
import { meta } from "@/content/seo";
import { getPublishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

/**
 * RSS feed at /feed.xml (spec 7.8.3).
 *
 * Drafts are excluded, because getPublishedPosts filters them out - the same
 * function the index, the sitemap and the article routes use, so a draft cannot
 * appear in one place and not another.
 */

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getPublishedPosts();
  const entry = meta[routes.blog];
  const feedUrl = `${site.url}/feed.xml`;

  const items = posts
    .map((post) => {
      const url = `${site.url}${routes.blog}/${post.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${escapeXml(post.description)}</description>`,
        `      <pubDate>${new Date(
          `${post.date}T12:00:00Z`
        ).toUTCString()}</pubDate>`,
        `      <author>${escapeXml(
          `${site.email} (${post.author ?? site.founder.name})`
        )}</author>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(entry.title)}</title>`,
    `    <link>${site.url}${routes.blog}</link>`,
    `    <description>${escapeXml(entry.description)}</description>`,
    "    <language>en-US</language>",
    `    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
