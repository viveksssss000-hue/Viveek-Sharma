import { site } from "@/lib/site";
import { routes } from "@/content/global";

/**
 * Structured data (spec 10.5), emitted as JSON-LD.
 *
 * Deliberate omissions, because a fabricated one is a manual-action risk:
 *  - No aggregateRating anywhere. There are no reviews to aggregate.
 *  - No foundingDate until the client confirms it.
 *  - No award, certification or membership properties.
 *
 * FAQPage is marked SHOULD, not MUST, and every question and answer here comes
 * from the same content module the page renders, so the markup and the visible
 * text cannot drift apart - marking up an answer the visitor cannot see is a
 * guidelines violation.
 */

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is authored, not user-supplied. Angle brackets are escaped so
      // a stray "</script>" in copy can never break out of the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: `${site.url}/brand/mark-ink-512.png`,
        description:
          "Trained, dedicated bookkeepers in India for US CPA and accounting firms. They work inside your software, on your clients, for a published monthly price.",
        email: site.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          postalCode: site.address.postalCode,
          addressCountry: site.address.countryCode,
        },
        ...(site.linkedin ? { sameAs: [site.linkedin] } : {}),
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en-US",
      }}
    />
  );
}

/**
 * Service schema for the Services page. One of the few places where publishing
 * a price gives a direct structured-data advantage, so the offers block carries
 * the real monthly figure.
 */
export function ServiceSchema({
  name = "Dedicated offshore bookkeeping for US accounting firms",
  serviceType = "Bookkeeping",
  description = "One dedicated bookkeeper, working only for your firm, inside your own software: reconciliations, payables, receivables, month-end close and cleanup work, handed back to you for review.",
  path = routes.servicesForFirms,
}: {
  name?: string;
  serviceType?: string;
  description?: string;
  path?: string;
} = {}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        serviceType,
        provider: { "@id": `${site.url}/#organization` },
        areaServed: { "@type": "Country", name: "United States" },
        description,
        url: `${site.url}${path}`,
      }}
    />
  );
}

export function FaqSchema({
  faqs,
}: {
  faqs: readonly { q: string; a: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }}
    />
  );
}

/** Home > Page, or Home > Resources > Article. Never on the Home page. */
export function BreadcrumbSchema({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: "Home", path: routes.home },
          ...trail,
        ].map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${site.url}${item.path === "/" ? "" : item.path}`,
        })),
      }}
    />
  );
}

export function ArticleSchema({
  headline,
  description,
  slug,
  datePublished,
  dateModified,
  image,
  authorName,
}: {
  headline: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified: string;
  image?: string | null;
  authorName: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        description,
        url: `${site.url}${routes.blog}/${slug}`,
        datePublished,
        dateModified,
        ...(image ? { image: `${site.url}${image}` } : {}),
        author: { "@type": "Person", name: authorName },
        publisher: { "@id": `${site.url}/#organization` },
        inLanguage: "en-US",
      }}
    />
  );
}

/**
 * The founder, on the About page. `image` is optional and omitted when there is
 * no photograph on the page - structured data describes what a visitor can see.
 */
export function PersonSchema({
  name,
  jobTitle,
  image,
}: {
  name: string;
  jobTitle: string;
  image?: string | null;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        jobTitle,
        ...(image ? { image: `${site.url}${image}` } : {}),
        worksFor: { "@id": `${site.url}/#organization` },
      }}
    />
  );
}
