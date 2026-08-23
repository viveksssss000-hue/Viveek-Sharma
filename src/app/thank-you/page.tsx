import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { ConversionTracker } from "@/components/analytics/ConversionTracker";
import { Section } from "@/components/sections/Section";
import { ArrowRightIcon } from "@/components/ui/icons";
import { routes, thankYouPilot } from "@/content/global";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(routes.thankYou);

/**
 * /thank-you (spec 7.10.2) - after the free pilot form.
 * Fires pilot_requested, the secondary conversion. Noindex.
 */
export default function ThankYouPage() {
  return (
    <Section tone="paper" width="wide">
      <Suspense fallback={null}>
        <ConversionTracker event="pilot_requested" />
      </Suspense>

      <h1>{thankYouPilot.h1}</h1>
      <p className="mt-6 measure text-lead text-ink-muted">
        {thankYouPilot.body1}
      </p>
      <p className="mt-4 measure text-body">{thankYouPilot.body2}</p>

      <h2 className="mt-12 text-h3">{thankYouPilot.listHeading}</h2>
      <ul className="mt-6 grid gap-2">
        {thankYouPilot.list.map((link) => (
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
