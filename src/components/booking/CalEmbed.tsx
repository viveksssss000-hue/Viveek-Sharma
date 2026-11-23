"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { booking } from "@/lib/site";
import { site } from "@/lib/site";

/**
 * The booking widget (spec 7.6.1 and 11.4).
 *
 * The scheduler is embedded, not linked: sending the visitor to a third-party
 * domain loses the branding and the tracking.
 *
 * HOW THE CONVERSION IS TRACKED, AND WHY IT IS BELT AND BRACES
 * Spec 11.4 says the reliable method is the redirect - configure the tool to
 * send the visitor to /thank-you-call after a confirmed booking and fire the
 * event on that page load - and explicitly warns against relying on the
 * widget's internal JavaScript event, which changes when the vendor updates
 * the embed. So both are wired:
 *
 *   1. PRIMARY: set the success redirect inside the Cal.com event type to
 *      https://www.tryacowork.com/thank-you-call. This is the one that must be
 *      configured; without it the conversion is not tracked.
 *   2. SECOND NET: the bookingSuccessful listener below navigates the
 *      top-level page. If the vendor renames the event this quietly stops
 *      working and (1) still carries the tracking - which is the right way
 *      round for a dependency that can change without notice.
 *
 * Time zones are detected by Cal.com from the browser and named on screen, so
 * the visitor can check them - a US firm owner booking a call with a team in
 * India will look.
 */
export function CalEmbed() {
  const router = useRouter();
  const [failed, setFailed] = useState(false);
  const calLink = booking.calLink;

  useEffect(() => {
    if (!calLink) return;
    let cancelled = false;
    let onBooked: (() => void) | undefined;

    (async () => {
      try {
        const cal = await getCalApi();
        if (cancelled) return;

        cal("ui", {
          hideEventTypeDetails: false,
          layout: "month_view",
          // Fern, so the scheduler's own accent matches the site rather than
          // arriving in Cal.com's default brand colour.
          cssVarsPerTheme: {
            light: { "cal-brand": "#0f5f4c" },
            dark: { "cal-brand": "#0f5f4c" },
          },
        });

        // Kept so the cleanup can deregister it: the Cal embed is a
        // page-global singleton that outlives client-side navigations, and
        // app/template.tsx remounts this component on every visit. Without
        // the matching off(), N visits stack N callbacks and a single booking
        // pushes N duplicate history entries.
        onBooked = () => router.push(booking.successPath);
        cal("on", { action: "bookingSuccessful", callback: onBooked });
      } catch {
        // The embed script could not load - show the fallback rather than an
        // empty box. Never a broken embed.
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      if (onBooked) {
        const cb = onBooked;
        getCalApi()
          .then((cal) =>
            cal("off", { action: "bookingSuccessful", callback: cb })
          )
          .catch(() => {
            /* embed never loaded - nothing was registered */
          });
      }
    };
  }, [router, calLink]);

  if (failed || !calLink) {
    return <BookingFallback configured={Boolean(calLink)} />;
  }

  return (
    <div className="overflow-hidden rounded-[16px] border border-border bg-surface">
      <Cal
        calLink={calLink}
        // A fixed minimum height keeps the calendar visible without scrolling
        // on a 1366x768 desktop screen and within one short scroll on a phone.
        style={{ width: "100%", height: "100%", minHeight: "640px" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}

/**
 * Shown when the scheduler is not configured yet, or cannot load. Never a dead
 * end and never an error code: a visitor who reached this page is the most
 * valuable visitor on the site, so she gets a way to reach a person either way.
 */
function BookingFallback({ configured }: { configured: boolean }) {
  return (
    <div className="rounded-[16px] border border-border bg-surface p-6 lg:p-8">
      <h2 className="text-h3">
        {configured ? "The calendar could not load" : "Email us to book a time"}
      </h2>
      <p className="mt-4 measure text-body text-ink-muted">
        {configured
          ? "That is our fault, not yours. Email us and we will send you two or three times that work, usually within a few hours."
          : "Send us a note with a couple of times that suit you and we will confirm one, usually within a few hours. Because we are in India, a reply will often be waiting for you in the morning."}
      </p>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* whitespace-normal overrides the Button default of nowrap. The
            label carries a full email address, and at 360px in Archivo its
            min-content width forced the grid track 10px past the viewport.
            Wrapping is better than a horizontally scrolling page. */}
        <Button asChild className="whitespace-normal text-center">
          <a href={`mailto:${site.email}?subject=Booking a 20-minute call`}>
            Email {site.email}
          </a>
        </Button>
        {booking.fallbackUrl && (
          <Link
            href={booking.fallbackUrl}
            target="_blank"
            rel="noopener"
            className="text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]"
          >
            Or open the calendar in a new tab
          </Link>
        )}
      </div>
    </div>
  );
}
