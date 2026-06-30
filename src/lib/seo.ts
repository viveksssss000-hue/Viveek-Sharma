import type { Metadata } from "next";

import { site } from "@/lib/content";

type BuildMetadataArgs = {
  title: string;
  description: string;
  /** Path beginning with "/" (e.g. "/security"). Home is "/". */
  path?: string;
  /**
   * When true, emit a noindex, nofollow robots directive. The page stays
   * reachable by URL and crawlable (so the directive is seen), but is kept out
   * of search indexes. Used for pages parked for a later phase.
   */
  noindex?: boolean;
};

/**
 * Build per-page Metadata with canonical URL + Open Graph + Twitter card.
 * `title` is used verbatim (pages pass their full "<keyword> | tryacowork" title).
 * The OG/Twitter image is supplied automatically by app/opengraph-image.tsx.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  noindex = false,
}: BuildMetadataArgs): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
