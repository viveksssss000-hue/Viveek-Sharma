import type { Metadata } from "next";
import Link from "next/link";

import { CalEmbed } from "@/components/booking/CalEmbed";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { CheckIcon } from "@/components/ui/icons";
import { microcopy, routes } from "@/content/global";
import { bookACall } from "@/content/pilot";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(routes.bookACall);

/**
 * Book a Call page (spec 7.6). The single most important page on the site, and
 * the one where most sites lose the visitor by adding friction.
 *
 * Everything that competes with the calendar has been left off deliberately:
 *  - No closing call-to-action band (spec 7.11 excludes this page).
 *  - No sticky mobile bar - the visitor is already here (spec 6.2).
 *  - No chat widget and no extra scripts. Nothing may compete with the
 *    calendar, and nothing may slow it down.
 *  - No long form in front of it, and no phone number required: asking for one
 *    is the single biggest cause of drop-off on booking pages, and the call is
 *    a video call anyway.
 */
export default function BookACallPage() {
  return (
    <section className="bg-paper">
      <div className="gutter mx-auto max-w-content pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-[40fr_60fr] lg:gap-16">
          <div>
            <h1>{bookACall.h1}</h1>
            <p className="mt-6 measure text-lead text-ink-muted">
              {bookACall.intro}
            </p>

            <ul className="mt-8 grid gap-4">
              {bookACall.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckIcon size={20} className="mt-1 text-fern" />
                  <span className="text-body">{point}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 measure text-body text-ink-muted">
              {bookACall.belowWidget.before}
              <Link
                href={bookACall.belowWidget.linkHref}
                className="text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]"
              >
                {bookACall.belowWidget.linkLabel}
              </Link>
              {bookACall.belowWidget.after}
            </p>

            {/* The one deliberate exception to the standard form privacy line,
                because the promise on this page is different (Appendix C). */}
            <p className="mt-8 measure text-small text-ink-muted">
              {microcopy.privacyLineBooking}{" "}
              <Link
                href={routes.privacy}
                className="text-fern underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <CalEmbed />
        </div>
      </div>

      <BreadcrumbSchema
        trail={[{ name: "Book a call", path: routes.bookACall }]}
      />
    </section>
  );
}
