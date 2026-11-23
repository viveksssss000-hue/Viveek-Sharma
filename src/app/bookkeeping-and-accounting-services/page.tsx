import type { Metadata } from "next";
import Link from "next/link";

import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ScopeBlock } from "@/components/sections/ScopeBlock";
import { Section } from "@/components/sections/Section";
import { PageHeader } from "@/components/sections/PageHeader";
import { BreadcrumbSchema, ServiceSchema } from "@/components/seo/JsonLd";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { routes } from "@/content/global";
import {
  boundariesNote,
  engagement,
  forFirms,
  header,
  whatWeRun,
} from "@/content/services-general";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(routes.services);

/**
 * The Professional Services page - the PRIMARY offer, and the page the home
 * chooser's first card routes to.
 *
 * It speaks to one visitor: someone who wants the books run FOR them. The
 * staffing offer is deliberately absent (client decision, 23 November - each
 * path gets its own page). CPA firms get one cross-link to their dedicated
 * page, because a practice has concerns a business does not.
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

      {/* 1 - The work, two columns, icons drawing in as they land. */}
      <Section tone="sand">
        <h2 className="max-w-text">{whatWeRun.h2}</h2>

        <div className="mt-10 grid gap-x-12 gap-y-4 md:grid-cols-2">
          {whatWeRun.columns.map((column, index) => (
            <ul key={index} className="grid content-start gap-4">
              {column.map((item) => (
                <li key={item} className="rv-item flex items-start gap-3">
                  <CheckIcon size={20} className="icon-draw mt-1 text-fern" />
                  <span className="text-body">{item}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>

        <p className="mt-10 measure text-body text-ink-muted">
          {whatWeRun.closing}
        </p>
      </Section>

      {/* 2 - How an engagement works: three numbered steps. */}
      <Section tone="paper">
        <h2 className="max-w-text">{engagement.h2}</h2>

        <ol className="mt-12 grid gap-10 md:grid-cols-3 lg:gap-12">
          {engagement.steps.map((step, index) => (
            <li key={step.title} className="rv-item relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-4 left-0 select-none font-serif text-[48px] font-semibold leading-none text-sand-deep"
              >
                {index + 1}
              </span>
              <div className="relative">
                <h3 className="mt-4 font-sans text-h4 font-semibold">
                  {index + 1}. {step.title}
                </h3>
                <p className="mt-3 text-body text-ink-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* 3 - Scope: what every engagement includes, and how pricing is
          agreed. The anchor the "What it costs" links point at. */}
      <ScopeBlock id="pricing" page={routes.services} />

      {/* 4 - Where the work stops. Boundary-setting builds trust and stops
          bad-fit enquiries before they cost anyone a call. */}
      <Section tone="paper" width="text">
        <h2>{boundariesNote.h2}</h2>
        <p className="mt-6 measure text-body">{boundariesNote.body}</p>
      </Section>

      {/* 5 - The one audience fork this page allows: CPA firms have concerns
          a business does not, and they get their own page for it. */}
      <Section tone="sand" width="text">
        <h2>{forFirms.h2}</h2>
        <p className="mt-4 measure text-body text-ink-muted">{forFirms.body}</p>
        <Link
          href={forFirms.link.href}
          className="group mt-6 inline-flex min-h-11 items-center gap-2 text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]"
        >
          {forFirms.link.label}
          <ArrowRightIcon
            size={18}
            className="transition-transform duration-150 group-hover:translate-x-1"
          />
        </Link>
      </Section>

      <ClosingCTA />

      <ServiceSchema
        name="Outsourced bookkeeping and accounting services"
        serviceType="Accounting"
        description="Bookkeeping and accounting run by our own team for US businesses and CPA firms: reconciliations, payables, receivables, payroll support, month-end close and reporting, returned for the client's review."
        path={routes.services}
      />
      <BreadcrumbSchema
        trail={[{ name: "Services", path: routes.services }]}
      />
    </>
  );
}
