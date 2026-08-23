import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { ConversionTracker } from "@/components/analytics/ConversionTracker";
import { Section } from "@/components/sections/Section";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { routes, thankYouCall } from "@/content/global";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(routes.thankYouCall);

/**
 * /thank-you-call (spec 7.10.1) - after a booking is completed.
 *
 * This page load is what fires call_booked, the primary conversion (spec 11.4),
 * which is why Cal.com must be configured to redirect here after a confirmed
 * booking.
 *
 * Noindex, and excluded from the sitemap - but deliberately NOT blocked in
 * robots.txt: a crawler that is blocked cannot read the noindex tag, which is
 * what actually keeps the page out of the index (spec 10.4).
 *
 * No closing call-to-action band and no sticky bar: she has already converted.
 */
export default function ThankYouCallPage() {
  return (
    <Section tone="paper" width="wide">
      <Suspense fallback={null}>
        <ConversionTracker event="call_booked" />
      </Suspense>

      <h1>{thankYouCall.h1}</h1>
      <p className="mt-6 measure text-lead text-ink-muted">
        {thankYouCall.body1}
      </p>

      <h2 className="mt-12 text-h3">{thankYouCall.listHeading}</h2>
      <ul className="mt-6 grid gap-3">
        {thankYouCall.list.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckIcon size={20} className="mt-1 text-fern" />
            <span className="text-body">{item}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 measure text-body">{thankYouCall.body2}</p>

      <h2 className="mt-12 text-h3">{thankYouCall.waitHeading}</h2>
      <ul className="mt-6 grid gap-2">
        {thankYouCall.waitLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group inline-flex min-h-11 items-center gap-2 text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]"
            >
              {link.label}
              <ArrowRightIcon
                size={18}
                className="transition-transform duration-150 group-hover:translate-x-1"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
