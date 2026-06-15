import type { Metadata } from "next";

import { LegalLayout } from "@/components/sections/LegalLayout";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy | tryacowork",
  description:
    "How tryacowork uses cookies and similar technologies, and how to manage your preferences.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="8 June 2026">
      <p>
        This Cookie Policy explains how {site.legalName} (&quot;{site.name}
        &quot;) uses cookies and similar technologies on {site.domain}.
      </p>

      <h2>Categories we use</h2>
      <ul>
        <li>
          <strong>Necessary</strong> - required for the site to function,
          including remembering your cookie choice and protecting our forms from
          spam (Cloudflare Turnstile). Always on.
        </li>
        <li>
          <strong>Analytics</strong> - help us understand how the site is used,
          via Google Analytics (cookies such as <code>_ga</code> and{" "}
          <code>_ga_*</code>, typically lasting up to 2 years). Loaded only with
          your consent.
        </li>
      </ul>
      <p>
        We do not use advertising or cross-site tracking cookies. Booking a demo
        opens Google Calendar, which sets its own cookies under{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google&apos;s privacy policy
        </a>
        .
      </p>

      <h2>Consent &amp; Consent Mode</h2>
      <p>
        On your first visit we ask for your cookie preferences. Analytics
        cookies and tags are blocked until you opt in, using Google Consent Mode
        v2 defaults. You can change your choice at any time via the cookie
        settings.
      </p>

      <h2>Managing cookies</h2>
      <p>
        You can manage or withdraw consent at any time through the{" "}
        <strong>Cookie settings</strong> link in our footer, and you can also
        control or delete cookies in your browser settings.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalLayout>
  );
}
