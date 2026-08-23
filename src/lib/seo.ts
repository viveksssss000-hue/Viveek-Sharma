import type { Metadata } from "next";

import { meta } from "@/content/seo";
import { site } from "@/lib/site";

/**
 * Per-page metadata (spec 10.2 and 10.4).
 *
 * Every page gets a unique title, a unique description, a self-referencing
 * canonical, and Open Graph plus Twitter card tags. Titles and descriptions
 * come from content/seo.ts, which fails the build if two ever collide.
 *
 * The three thank-you pages and the 404 are noindex - and nowhere else is.
 * They are deliberately NOT blocked in robots.txt: a crawler that is blocked
 * cannot read the noindex tag, which is what actually keeps them out of the
 * index (spec 10.4).
 */
export function buildMetadata(path: string, overrides?: Partial<Metadata>): Metadata {
  const entry = meta[path];
  if (!entry) {
    throw new Error(
      `No title/description defined for "${path}". Add it to content/seo.ts.`
    );
  }

  const url = path === "/" ? site.url : `${site.url}${path}`;

  return {
    title: { absolute: entry.title },
    description: entry.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      title: entry.title,
      description: entry.description,
      url,
      // Named explicitly. Setting an `openGraph` object in a page's metadata
      // replaces the one Next.js assembles, which drops the image that
      // app/opengraph-image.tsx would otherwise contribute - so every page
      // except the Home page would ship without an og:image.
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "tryACOwork - bookkeeping capacity for US accounting firms.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
    },
    ...(entry.noindex
      ? { robots: { index: false, follow: true } }
      : { robots: { index: true, follow: true } }),
    ...overrides,
  };
}
