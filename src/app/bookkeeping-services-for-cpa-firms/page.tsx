import type { Metadata } from "next";

import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { FAQ } from "@/components/sections/FAQ";
import { ScopeBlock } from "@/components/sections/ScopeBlock";
import { Eyebrow, Section, SectionHeading } from "@/components/sections/Section";
import { PageHeader } from "@/components/sections/PageHeader";
import { BreadcrumbSchema, FaqSchema, ServiceSchema } from "@/components/seo/JsonLd";
import { CheckIcon, CrossIcon } from "@/components/ui/icons";
import { routes } from "@/content/global";
import {
  boundaries,
  faqHeading,
  faqs,
  fit,
  header,
  software,
  taskGroups,
  threeWays,
} from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(routes.servicesForFirms);

/**
 * Services page (spec 7.2). URL: /bookkeeping-services-for-cpa-firms
 *
 * The main SEO landing page and the longest on the site. The URL is
 * deliberately long because it matches the primary keyword phrase - spec 5.2
 * explicitly forbids shortening it to /services.
 *
 * The pricing section carries id="pricing": the footer link, the mobile menu
 * and the 404 page all point at it, and there is no separate pricing page.
 */
export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow={header.eyebrow}
        h1={header.h1}
        intro={header.intro}
        cta="book"
      />

      {/* 2 - The three ways firms use us. */}
      <Section tone="sand">
        <h2 className="max-w-text">{threeWays.h2}</h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {threeWays.cards.map((card) => (
            <li
              key={card.h4}
              className="rounded-[16px] border border-border bg-surface p-6 shadow-rest lg:p-8"
            >
              <h3 className="font-sans text-h4 font-semibold">{card.h4}</h3>
              <p className="mt-3 text-body text-ink-muted">{card.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3 - The work, task by task. Real unordered lists, so the content is
          machine-readable and works with a screen reader. */}
      <Section tone="paper">
        <h2 className="max-w-text">{taskGroups.h2}</h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-x-16">
          {taskGroups.groups.map((group) => (
            <div key={group.h3}>
              <h3>{group.h3}</h3>
              <ul className="mt-6 grid gap-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon size={20} className="mt-1 text-fern" />
                    <span className="text-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* 4 - Software. Plain text names, never third-party logos: they are
          trademarks with usage rules, and a wall of borrowed logos implies
          partnerships that do not exist.

          This is the one place on the site where two sections share a
          background. Spec 4.4.3 requires sections to alternate so the eye can
          find the boundaries, but the price block below is fixed to sand (it is
          the same component as on the Home page), so software cannot be sand
          without two sand bands meeting. A hairline rule does the job the
          background change would have done. */}
      <Section tone="paper" className="border-t border-border">
        <h2 className="max-w-text">{software.h2}</h2>

        <dl className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {software.groups.map((group) => (
            <div key={group.label}>
              <dt>
                <Eyebrow>{group.label}</Eyebrow>
              </dt>
              <dd className="mt-3 text-body">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 measure text-body text-ink-muted">
          {software.closing}
        </p>
      </Section>

      {/* 5 - Scope and how pricing is agreed. The anchor the site links to. */}
      <ScopeBlock id="pricing" page={routes.servicesForFirms} />

      {/* 6 - What we do not do. Boundary setting: it builds trust and prevents
          bad-fit enquiries. */}
      <Section tone="paper" width="text">
        <SectionHeading title={boundaries.h2} intro={boundaries.intro} />
        <ul className="mt-8 grid gap-4">
          {boundaries.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CrossIcon size={20} className="mt-1 text-ink-muted" />
              <span className="text-body">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 measure text-body text-ink-muted">
          {boundaries.closing}
        </p>
      </Section>

      {/* 7 - Fit. Qualifies leads before they book, which saves sales time. */}
      <Section tone="sand">
        <h2 className="max-w-text">{fit.h2}</h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:gap-12">
          <div className="rounded-[16px] border border-border bg-surface p-6 lg:p-8">
            <h3 className="font-sans text-h4 font-semibold">{fit.good.h4}</h3>
            <ul className="mt-6 grid gap-3">
              {fit.good.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon size={20} className="mt-1 text-fern" />
                  <span className="text-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[16px] border border-border bg-surface p-6 lg:p-8">
            <h3 className="font-sans text-h4 font-semibold">{fit.bad.h4}</h3>
            <ul className="mt-6 grid gap-3">
              {fit.bad.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CrossIcon size={20} className="mt-1 text-ink-muted" />
                  <span className="text-body text-ink-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 measure text-body">{fit.closing}</p>
      </Section>

      {/* 8 - FAQ specific to the work. */}
      <FAQ heading={faqHeading} faqs={faqs} />

      <ClosingCTA />

      <ServiceSchema />
      <FaqSchema faqs={faqs} />
      <BreadcrumbSchema
        trail={[
          { name: "Services", path: routes.services },
          { name: "For CPA firms", path: routes.servicesForFirms },
        ]}
      />
    </>
  );
}
