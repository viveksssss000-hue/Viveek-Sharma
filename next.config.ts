import type { NextConfig } from "next";

/**
 * Content-Security-Policy allowing the third parties this site uses:
 * Cal.com (scheduler), Google Tag Manager / Analytics, Cloudflare Turnstile,
 * HubSpot Forms, and Calendly (fallback scheduler).
 *
 * Note: 'unsafe-inline' is permitted for scripts/styles because GA, the consent
 * banner, the Cal embed and JSON-LD inject inline. A nonce-based policy is the
 * stricter alternative if/when the site moves fully server-rendered.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://*.cal.com https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com https://assets.calendly.com",
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.cal.com https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://challenges.cloudflare.com https://api.hsforms.com https://forms.hscollectedforms.net",
  "frame-src https://*.cal.com https://challenges.cloudflare.com https://calendly.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
