import type { NextConfig } from "next";

/**
 * Security headers (spec 9.6). Target an A grade on securityheaders.com.
 *
 * The Content-Security-Policy is deliberately tight. The only third parties the
 * site talks to are the scheduler (Cal.com) and Google Analytics - and GA does
 * not load at all until the visitor accepts cookies. There is no chat widget,
 * no heatmap tool, no tag manager and no consent platform, per spec 9.3 and
 * 11.1, which is also why the JavaScript budget is easy to hold.
 *
 * Fonts are self-hosted by next/font, so no font CDN appears here at all.
 */
const csp = [
  "default-src 'self'",
  // 'unsafe-inline' is required for the JSON-LD blocks and the GA snippet.
  // A nonce-based policy is the stricter alternative and is a worthwhile
  // follow-up once the page set stops changing.
  "script-src 'self' 'unsafe-inline' https://app.cal.com https://cal.com https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://app.cal.com https://cal.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com",
  "frame-src https://app.cal.com https://cal.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

/**
 * The editor at /admin needs several things the public site does not: to talk
 * to the GitHub API, to run its own bundled worker, and to load its interface
 * font and icon set from Google Fonts.
 *
 * It is kept on its own policy so none of that widens the policy protecting
 * the pages the public actually visits - the public site still permits no
 * third-party stylesheet and no font host at all. /admin is also noindex, via
 * the meta tag in its HTML and the X-Robots-Tag below, and it is reachable only
 * by someone who can sign in to the repository.
 */
const adminCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
  "worker-src 'self' blob:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://avatars.githubusercontent.com https://raw.githubusercontent.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://api.github.com https://github.com https://raw.githubusercontent.com https://fonts.googleapis.com https://fonts.gstatic.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  /**
   * Redirects from the previous site (the AI-automation business) to the
   * closest page on this one. Spec 5.2: a published URL must never simply
   * disappear - a 301 is mandatory and permanent, in a single hop, never
   * chained. Anything not listed here falls through to the 404 page, which is
   * correct for URLs with no equivalent.
   */
  async redirects() {
    const permanent = true;
    return [
      // Old service pages -> the one service this firm now sells.
      { source: "/services", destination: "/bookkeeping-services-for-cpa-firms", permanent },
      { source: "/services/:slug", destination: "/bookkeeping-services-for-cpa-firms", permanent },
      // Pricing lives on the Services page; there is no separate pricing page.
      { source: "/pricing", destination: "/bookkeeping-services-for-cpa-firms#pricing", permanent },
      // Old booking and contact routes -> the booking page.
      { source: "/book-a-demo", destination: "/book-a-call", permanent },
      { source: "/contact", destination: "/book-a-call", permanent },
      { source: "/thank-you/demo", destination: "/thank-you-call", permanent },
      { source: "/thank-you/contact", destination: "/thank-you", permanent },
      // Old marketing pages with no equivalent -> the nearest useful page.
      { source: "/examples", destination: "/bookkeeping-services-for-cpa-firms", permanent },
      { source: "/results", destination: "/about", permanent },
      { source: "/industries", destination: "/bookkeeping-services-for-cpa-firms", permanent },
      { source: "/industries/:slug", destination: "/bookkeeping-services-for-cpa-firms", permanent },
      // Legal pages moved to their spec URLs.
      { source: "/privacy", destination: "/privacy-policy", permanent },
      { source: "/cookies", destination: "/privacy-policy", permanent },
    ];
  },

  /**
   * public/admin/index.html is served at /admin/index.html by default, but the
   * editor is documented, linked and bookmarked as /admin - so serve it there.
   */
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // The editor and its sign-in routes, on their own policy.
        source: "/admin/:path*",
        headers: [
          { key: "Content-Security-Policy", value: adminCsp },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/api/admin/:path*",
        headers: [
          { key: "Content-Security-Policy", value: adminCsp },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
      {
        // The checklist PDF is served from this domain so the link never
        // expires and analytics can see the download (spec 8.5).
        source: "/12-questions-offshore-bookkeeper-checklist.pdf",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
