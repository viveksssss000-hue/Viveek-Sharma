import type { MetadataRoute } from "next";

import { POSTS_PER_PAGE } from "@/components/sections/BlogIndex";
import { routes } from "@/content/global";
import { getPublishedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

/**
 * XML sitemap at /sitemap.xml (spec 10.4).
 *
 * Every indexable page, auto-updating when an article is published. Excluded:
 * the three thank-you pages, the 404, and any draft article - getPublishedPosts
 * filters drafts out, so a draft can never leak into the sitemap.
 *
 * Priorities reflect the site's single goal: the booking page and the Services
 * page are the two that matter (spec 1.3).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => (path === "/" ? site.url : `${site.url}${path}`);

  const pages: MetadataRoute.Sitemap = [
    { url: url(routes.home), lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: url(routes.services), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url(routes.staffing), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url(routes.servicesForFirms), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url(routes.bookACall), lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: url(routes.howItWorks), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url(routes.security), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url(routes.freePilot), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url(routes.about), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: url(routes.blog), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: url(routes.privacy), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: url(routes.terms), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const posts = getPublishedPosts();

  const articles: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}${routes.blog}/${post.slug}`,
    lastModified: new Date(`${post.updated ?? post.date}T12:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  // Paginated index pages, from page 2 onward.
  const pageCount = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginated: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, pageCount - 1) },
    (_, index) => ({
      url: `${site.url}${routes.blog}/page/${index + 2}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.3,
    })
  );

  return [...pages, ...articles, ...paginated];
}
