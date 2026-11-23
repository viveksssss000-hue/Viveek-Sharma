import type { Metadata } from "next";
import Link from "next/link";

import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { ScopeBlock } from "@/components/sections/ScopeBlock";
import { Section } from "@/components/sections/Section";
import { PageHeader } from "@/components/sections/PageHeader";
import { BreadcrumbSchema, ServiceSchema } from "@/components/seo/JsonLd";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { routes } from "@/content/global";
import { boundary, dedicated, header, path } from "@/content/staffing";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(routes.staffing);

/**
 * The Dedicated Staffing page - the SECONDARY offer, and the page the home
 * chooser's second card routes to.
 *
 * One visitor: someone who wants to run their own operation with a person of
 * their own. The services offer is deliberately absent (client decision,
 * 23 November - each path gets its own page). The person works only for the
 * client and stays on OUR payroll; every section is that sentence unpacked.
 */
export default function StaffingPage() {
  return (
    <>
      <PageHeader
        eyebrow={header.eyebrow}
        h1={header.h1}
        intro={header.intro}
        cta="book"
      />

      {/* 1 - What dedicated means, item by item. */}
      <Section tone="sand" width="text">
        <h2>{dedicated.h2}</h2>
        <ul className="mt-8 grid gap-3">
          {dedicated.items.map((item) => (
            <li key={item} className="rv-item flex items-start gap-3">
              <CheckIcon size={20} className="icon-draw mt-1 text-fern" />
              <span className="text-body">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 measure text-body font-semibold text-ink">
          {dedicated.closing}
        </p>
      </Section>

      {/* 2 - The path from call to live work: four numbered steps. */}
      <Section tone="paper">
        <h2 className="max-w-text">{path.h2}</h2>

        <ol className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {path.steps.map((step, index) => (
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

        <Link
          href={path.link.href}
          className="group mt-12 inline-flex min-h-11 items-center gap-2 text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]"
        >
          {path.link.label}
          <ArrowRightIcon
            size={18}
            className="transition-transform duration-150 group-hover:translate-x-1"
          />
        </Link>
      </Section>

      {/* 3 - Scope: what is included, and how the figure is agreed. */}
      <ScopeBlock page={routes.staffing} />

      {/* 4 - The boundary that protects the client's ownership of the work. */}
      <Section tone="paper" width="text">
        <h2>{boundary.h2}</h2>
        <p className="mt-6 measure text-body">{boundary.body}</p>
      </Section>

      <ClosingCTA />

      <ServiceSchema
        name="Dedicated offshore accounting staff"
        serviceType="Staffing"
        description="An experienced accounting professional who works only for one client, on tryACOwork's payroll: the client directs the work and reviews the output, while salary, equipment, office and absence cover are handled by us."
        path={routes.staffing}
      />
      <BreadcrumbSchema
        trail={[{ name: "Dedicated Staff", path: routes.staffing }]}
      />
    </>
  );
}
