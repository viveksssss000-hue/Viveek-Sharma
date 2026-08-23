import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/**
 * robots.txt (spec 10.4).
 *
 * Allows everything and points at the sitemap.
 *
 * IT DELIBERATELY DOES NOT DISALLOW THE THANK-YOU PAGES. A crawler that is
 * blocked cannot read their noindex tag, which is what actually keeps them out
 * of the index - blocking them here would achieve the opposite of what it looks
 * like it achieves. It also does not block CSS or JavaScript, which Google
 * needs in order to render the page.
 *
 * A staging deployment must send X-Robots-Tag: noindex instead (spec 9.2); set
 * NEXT_PUBLIC_STAGING=true there and this file blocks everything as a backstop.
 */
export default function robots(): MetadataRoute.Robots {
  const isStaging = process.env.NEXT_PUBLIC_STAGING === "true";

  if (isStaging) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
