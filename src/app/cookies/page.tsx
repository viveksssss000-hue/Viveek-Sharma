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
    <LegalLayout title="Cookie Policy" lastUpdated="TODO(client/legal)">
      <p>
        This Cookie Policy explains how {site.legalName} (&ldquo;{site.name}
        &rdquo;) uses cookies and similar technologies on {site.domain}.
      </p>

      <h2>Categories we use</h2>
      <ul>
        <li>
          <strong>Necessary</strong> — required for the site to function. Always
          on.
        </li>
        <li>
          <strong>Analytics</strong> — help us understand how the site is used
          (e.g., Google Analytics). Loaded only with your consent.
        </li>
      </ul>

      <h2>Consent &amp; Consent Mode</h2>
      <p>
        On your first visit we ask for your cookie preferences. Analytics
        cookies and tags are blocked until you opt in, using Google Consent Mode
        v2 defaults. You can change your choice at any time via the cookie
        settings.
      </p>

      <h2>Managing cookies</h2>
      <p>
        You can manage or withdraw consent through our cookie banner, and you can
        also control cookies in your browser settings. TODO(client/legal):
        confirm the full cookie inventory and durations.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalLayout>
  );
}
