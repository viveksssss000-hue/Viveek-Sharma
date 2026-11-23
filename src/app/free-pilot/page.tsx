import type { Metadata } from "next";
import Link from "next/link";

import { PilotForm } from "@/components/forms/PilotForm";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/sections/Section";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { CheckIcon } from "@/components/ui/icons";
import { routes } from "@/content/global";
import {
  atTheEnd,
  cta,
  formCopy,
  header,
  limits,
  twoWeeks,
  whatItIs,
  whatWeAsk,
} from "@/content/pilot";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(routes.freePilot);

/**
 * Free Pilot page (spec 7.7).
 *
 * The page's job is to capture the visitor who will not book a call yet. Free
 * trials are common in this market but almost never structured or explained, so
 * the published day-by-day two-week plan below is the differentiator - no
 * competitor reviewed does it.
 *
 * The word "trial" never appears in the copy: the brand voice bans it as vague
 * and overused (spec 3.6). It is always a "free 20-hour pilot".
 *
 * No closing call-to-action band on this page (spec 7.11) - the form is the
 * call to action, and a second competing ask below it would only distract.
 */
export default function FreePilotPage() {
  return (
    <>
      <PageHeader h1={header.h1} intro={header.intro} />

      {/* What the pilot is */}
      <Section tone="sand" width="text">
        <h2>{whatItIs.h2}</h2>
        <ul className="mt-8 grid gap-3">
          {whatItIs.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckIcon size={20} className="mt-1 text-fern" />
              <span className="text-body">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* How the two weeks run */}
      <Section tone="paper" width="text">
        <h2>{twoWeeks.h2}</h2>
        <div className="mt-8 grid gap-6">
          {twoWeeks.weeks.map((week) => (
            <div
              key={week.label}
              className="rounded-[16px] border border-border bg-surface p-6"
            >
              <h3 className="font-sans text-h4 font-semibold">{week.label}</h3>
              <p className="mt-3 measure text-body text-ink-muted">
                {week.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* What we ask in return, and what happens at the end */}
      <Section tone="sand" width="text">
        <h2>{whatWeAsk.h2}</h2>
        <ul className="mt-8 grid gap-3">
          {whatWeAsk.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckIcon size={20} className="mt-1 text-fern" />
              <span className="text-body">{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mt-16">{atTheEnd.h2}</h2>
        <p className="mt-4 measure text-body">{atTheEnd.body}</p>

        <h2 className="mt-16">{limits.h2}</h2>
        <ul className="mt-6 grid list-disc gap-2 pl-6">
          {limits.items.map((item) => (
            <li key={item} className="text-body">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* The request form */}
      <Section tone="paper" width="text" id="request">
        <h2>{formCopy.heading}</h2>
        <p className="mt-4 measure text-lead text-ink-muted">
          {formCopy.intro}
        </p>

        <div className="mt-10">
          <PilotForm />
        </div>

        <p className="mt-10 text-body">
          <Link
            href={cta.altLinkHref}
            className="text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]"
          >
            {cta.altLinkLabel}
          </Link>
        </p>
      </Section>

      <BreadcrumbSchema
        trail={[{ name: "Free pilot", path: routes.freePilot }]}
      />
    </>
  );
}
