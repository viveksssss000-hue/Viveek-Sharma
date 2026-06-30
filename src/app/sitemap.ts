import type { MetadataRoute } from "next";

import { site, services, solutions } from "@/lib/content";
import { posts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // /industries and /examples are parked for a later phase - kept in the repo
  // but noindexed and intentionally excluded from the sitemap.
  const staticPaths = [
    "/",
    "/about",
    "/solutions",
    "/services",
    "/how-it-works",
    "/pricing",
    "/results",
    "/security",
    "/blog",
    "/book-a-demo",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const solutionEntries: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: `${site.url}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...solutionEntries,
    ...serviceEntries,
    ...postEntries,
  ];
}
