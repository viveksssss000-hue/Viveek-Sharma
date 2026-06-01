import type { Metadata } from "next";

import { LegalLayout } from "@/components/sections/LegalLayout";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | Acowork",
  description:
    "How Acowork (VSH Enterprise Pvt Ltd) collects, uses and protects personal data submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="TODO(client/legal)">
      <p>
        This Privacy Policy explains how {site.legalName} (&ldquo;{site.name}
        &rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal data
        collected through {site.domain}. We serve customers in the US and EU and
        aim to align with GDPR / UK GDPR and CCPA/CPRA.
      </p>

      <h2>What we collect</h2>
      <p>
        When you submit our contact form or book a demo, we collect the details
        you provide — such as name, work email, company, role, company size,
        country and message. We do not collect sensitive financial data through
        this marketing website.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry and schedule and run your demo.</li>
        <li>To manage our relationship with you as a lead or customer.</li>
        <li>
          To improve our website and services (subject to your cookie choices).
        </li>
      </ul>

      <h2>Legal bases (EU/UK)</h2>
      <p>
        We rely on your consent and on our legitimate interest in responding to
        enquiries and operating our business. TODO(client/legal): confirm legal
        bases for each processing purpose.
      </p>

      <h2>Sharing &amp; sub-processors</h2>
      <p>
        We use trusted service providers (for example, scheduling, email,
        analytics and CRM) to operate this site. TODO(client/legal): publish the
        current sub-processor list. We do not sell your personal data.
      </p>

      <h2>Data retention</h2>
      <p>
        We keep personal data only as long as necessary for the purposes above.
        TODO(client/legal): define retention periods.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct,
        delete, or restrict processing of your personal data, and to withdraw
        consent. To exercise these rights, contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>International transfers &amp; data residency</h2>
      <p>
        We offer EU data-residency options for EU customers. TODO(client/legal):
        describe transfer mechanisms (e.g., SCCs) where applicable.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. {site.legalName}.
      </p>
    </LegalLayout>
  );
}
