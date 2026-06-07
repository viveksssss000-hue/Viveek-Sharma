import { site } from "@/lib/content";

/**
 * Site-wide Organization + WebSite structured data, rendered in the root layout.
 * Per-page Service / FAQPage / BreadcrumbList schema lives on those pages.
 */
export function SiteJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    description:
      "AI-workflow studio for small teams. We turn complex, manual work — bookkeeping, invoices, lead routing, reporting — into AI workflows that run on their own.",
    areaServed: ["US", "EU"],
    sameAs: [site.linkedin],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
