import type { Metadata } from "next";

import { site } from "@/lib/content";

type BuildMetadataArgs = {
  title: string;
  description: string;
  /** Path beginning with "/" (e.g. "/security"). Home is "/". */
  path?: string;
  ogImage?: string;
};

/**
 * Build per-page Metadata with canonical URL + Open Graph + Twitter card.
 * `title` is used verbatim (pages pass their full "<keyword> | Acowork" title).
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  ogImage = "/og-default.png",
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
