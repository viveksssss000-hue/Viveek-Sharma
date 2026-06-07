import type { Metadata } from "next";

import { site } from "@/lib/content";

type BuildMetadataArgs = {
  title: string;
  description: string;
  /** Path beginning with "/" (e.g. "/security"). Home is "/". */
  path?: string;
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
}: BuildMetadataArgs): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
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
