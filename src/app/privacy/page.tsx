import type { Metadata } from "next";

import { LegalLayout } from "@/components/sections/LegalLayout";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | tryacowork",
  description:
    "How tryacowork (VSH Enterprise Pvt Ltd) collects, uses and protects personal data submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="21 June 2026">
      <p>
        This Privacy Policy explains how {site.legalName} (&quot;{site.name}
        &quot;, &quot;we&quot;, &quot;us&quot;) handles personal data
        collected through {site.domain}. We serve customers in the US and EU and
        align our practices with GDPR / UK GDPR and CCPA/CPRA.
      </p>

      <h2>What we collect</h2>
      <p>
        We only collect the information you choose to give us:
      </p>
      <ul>
        <li>
          <strong>Contact form:</strong> your name, work email, and any
          details you add (company, role, company size, country, area of
          interest and message).
        </li>
        <li>
          <strong>Booking a demo:</strong> when you book through our scheduler,
          your name, email and chosen time are processed by Calendly to
          set up the meeting.
        </li>
        <li>
          <strong>Analytics:</strong> if you accept analytics cookies, limited,
          aggregated usage data (see our{" "}
          <a href="/cookies">Cookie Policy</a>).
        </li>
      </ul>
      <p>
        We do not collect sensitive financial data through this website.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry and schedule and run your demo.</li>
        <li>To manage our relationship with you as a lead or customer.</li>
        <li>
          To improve our website and services (only with your cookie consent).
        </li>
      </ul>

      <h2>Legal bases (EU/UK)</h2>
      <p>
        Where GDPR / UK GDPR applies, we rely on: your <strong>consent</strong>{" "}
        (analytics cookies, and any direct marketing); our{" "}
        <strong>legitimate interests</strong> in responding to enquiries and
        running our business; and <strong>steps taken at your request</strong>{" "}
        before entering into a contract (responding to demo and sales requests).
      </p>

      <h2>Sharing &amp; sub-processors</h2>
      <p>
        We do not sell your personal data. We share it only with the service
        providers that help us run this site and respond to you:
      </p>
      <ul>
        <li>
          <strong>Calendly</strong> - scheduling and managing demo bookings.
        </li>
        <li>
          <strong>Google</strong> - with consent, website analytics.
        </li>
        <li>
          <strong>Resend</strong> - sending and receiving enquiry emails.
        </li>
        <li>
          <strong>Cloudflare</strong> - Turnstile spam protection on our forms.
        </li>
        <li>
          <strong>Our hosting provider (Vercel)</strong> - serving the website.
        </li>
      </ul>

      <h2>Data retention</h2>
      <p>
        We keep enquiry and booking data for as long as needed to deal with your
        request and our ongoing relationship, and then for a reasonable period
        to meet legal and record-keeping obligations. You can ask us to delete it
        sooner at any time.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct,
        delete, or restrict processing of your personal data, to data
        portability, and to withdraw consent. To exercise these rights, contact
        us at <a href={`mailto:${site.email}`}>{site.email}</a>. You also have
        the right to complain to your local data-protection authority.
      </p>

      <h2>International transfers</h2>
      <p>
        Some of our providers process data outside your country. Where personal
        data is transferred internationally, we rely on appropriate safeguards
        such as the European Commission&apos;s Standard Contractual Clauses. EU
        data-residency options are available for engagement data on request.
      </p>

      <h2>Contact</h2>
      <p>
        {site.legalName} is the data controller for this website. Questions about
        this policy? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalLayout>
  );
}
