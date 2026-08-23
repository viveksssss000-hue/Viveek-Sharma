import type { Metadata } from "next";
import Link from "next/link";

import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { FAQ } from "@/components/sections/FAQ";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section, SectionHeading } from "@/components/sections/Section";
import { BreadcrumbSchema, FaqSchema } from "@/components/seo/JsonLd";
import { ArrowRightIcon, CheckIcon, ClockIcon } from "@/components/ui/icons";
import { routes } from "@/content/global";
import {
  commitments,
  faqHeading,
  faqs,
  guarantee,
  header,
  rhythm,
  stages,
  whatWeNeed,
} from "@/content/how-it-works";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(routes.howItWorks);

/**
 * How It Works page (spec 7.3).
 *
 * The competitive point of this page: research across 216 firms found that
 * competitors mention onboarding speed as a one-line claim and never publish an
 * actual timeline, service level table or replacement terms. Publishing all
 * three makes a brand-new firm look more accountable than a firm of a thousand
 * people - which is why the numbers here are specific and must be achievable.
 */
export default function HowItWorksPage() {
  return (
    <>
      <PageHeader h1={header.h1} intro={header.intro} />

      {/* 2 - The four stages, as a vertical timeline with day counts. */}
      <Section tone="sand">
        <ol className="relative grid gap-8 lg:gap-12">
          {/* The connecting line, decorative only, so it is hidden from
              assistive technology and only drawn where it can be seen. */}
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-3 bottom-3 hidden w-[2px] bg-border lg:block"
          />

          {stages.map((stage) => (
            <li key={stage.number} className="relative lg:pl-12">
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 hidden size-4 rounded-full bg-fern lg:block"
              />

              <div className="rounded-[12px] border border-border bg-surface p-6 lg:border-0 lg:bg-transparent lg:p-0">
                <p className="font-sans text-small font-semibold uppercase tracking-[0.08em] text-ochre-text">
                  Stage {stage.number} · {stage.days}
                </p>
                <h2 className="mt-2 text-h3">{stage.title}</h2>

                {stage.yourTime && (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-[999px] bg-sand-deep px-3 py-1 text-small font-medium">
                    <ClockIcon size={16} className="text-fern" />
                    {stage.yourTime}
                  </p>
                )}

                <p className="mt-4 measure text-body text-ink-muted">
                  {stage.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* 3 - What we need from you. */}
      <Section tone="paper" width="text">
        <h2>{whatWeNeed.h2}</h2>
        <ul className="mt-8 grid gap-3">
          {whatWeNeed.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckIcon size={20} className="mt-1 text-fern" />
              <span className="text-body">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 measure text-body text-ink-muted">
          {whatWeNeed.closing}
        </p>
      </Section>

      {/* 4 - The weekly rhythm. */}
      <Section tone="sand" width="text">
        <h2>{rhythm.h2}</h2>
        <ul className="mt-8 grid gap-6">
          {rhythm.items.map((item) => (
            <li
              key={item}
              className="border-l-4 border-fern pl-6 text-body text-ink"
            >
              {item}
            </li>
          ))}
        </ul>

        <Link
          href={rhythm.link.href}
          className="group mt-8 inline-flex min-h-11 items-center gap-2 text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]"
        >
          {rhythm.link.label}
          <ArrowRightIcon
            size={18}
            className="transition-transform duration-150 group-hover:translate-x-1"
          />
        </Link>
      </Section>

      {/* 5 - Service commitments. These are published promises, so every figure
          has to be one the firm can actually meet (spec 14.2). */}
      <Section tone="paper" width="narrow">
        <h2>{commitments.h2}</h2>

        <table className="mt-10 block md:table">
          <caption className="sr-only-focusable">
            {commitments.h2} Our published service commitments.
          </caption>
          <tbody role="rowgroup" className="block md:table-row-group">
            {commitments.rows.map((row) => (
              <tr
                key={row.what}
                role="row"
                className="mb-4 block rounded-[12px] border border-border bg-surface p-6 last:mb-0 md:mb-0 md:table-row md:rounded-none md:border-0 md:border-b md:bg-transparent md:p-0"
              >
                <th
                  role="rowheader"
                  scope="row"
                  className="block w-full text-left font-sans text-h4 font-semibold md:table-cell md:w-[52%] md:border-b md:border-border md:p-4 md:align-top md:text-body"
                >
                  {row.what}
                </th>
                <td
                  role="cell"
                  className="mt-2 block text-body text-fern md:mt-0 md:table-cell md:border-b md:border-border md:p-4 md:align-top"
                >
                  {row.when}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-8 measure text-body text-ink-muted">
          {commitments.note}
        </p>
      </Section>

      {/* 6 - The replacement guarantee. */}
      <Section tone="sand" width="text">
        <SectionHeading title={guarantee.h2} />
        <div className="mt-6 grid gap-4">
          {guarantee.paragraphs.map((paragraph) => (
            <p key={paragraph} className="measure text-body">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {/* 7 - FAQ for this page. */}
      <FAQ heading={faqHeading} faqs={faqs} />

      <ClosingCTA />

      <FaqSchema faqs={faqs} />
      <BreadcrumbSchema
        trail={[{ name: "How It Works", path: routes.howItWorks }]}
      />
    </>
  );
}
