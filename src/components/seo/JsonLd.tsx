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
      "AI automation built specifically for accounting & bookkeeping — reconciliation, invoice processing, AP/AR and reporting — for SMBs in the US & EU.",
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
