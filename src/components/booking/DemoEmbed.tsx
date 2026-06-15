"use client";

import { useEffect } from "react";
import Link from "next/link";
import Cal, { getCalApi } from "@calcom/embed-react";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/content";

const calLink = process.env.NEXT_PUBLIC_CAL_LINK;
const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
// Google Calendar appointment schedule - the live, default scheduler.
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? site.bookingUrl;

/**
 * Inline scheduler. Order of preference:
 *   1. Google Calendar appointment schedule (site.bookingUrl) - bookings go
 *      straight into the founder's calendar and notify hello@tryacowork.com.
 *   2. Cal.com (NEXT_PUBLIC_CAL_LINK)
 *   3. Calendly (NEXT_PUBLIC_CALENDLY_URL)
 * If none is set we never render a broken embed - we link to the contact page.
 */
export function DemoEmbed() {
  useEffect(() => {
    if (bookingUrl || !calLink) return;
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#6D5DD3" } },
      });
    })();
  }, []);

  if (bookingUrl) {
    return (
      <iframe
        title="Book a demo with tryacowork"
        src={bookingUrl}
        loading="lazy"
        className="h-[700px] min-h-[640px] w-full rounded-xl border border-border bg-surface"
      />
    );
  }

  if (calLink) {
    return (
      <div className="min-h-[640px] w-full overflow-hidden rounded-xl border border-border bg-surface">
        <Cal calLink={calLink} style={{ width: "100%", height: "100%", minHeight: 640 }} />
      </div>
    );
  }

  if (calendlyUrl) {
    return (
      <iframe
        title="Book a demo with tryacowork"
        src={calendlyUrl}
        className="min-h-[640px] w-full rounded-xl border border-border bg-surface"
      />
    );
  }

  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-surface p-8 text-center">
      <p className="max-w-md text-muted-foreground">
        Our scheduler isn&apos;t connected yet. In the meantime, send us a note
        and we&apos;ll find a time that works.
      </p>
      <Button asChild>
        <Link href="/contact">Contact us</Link>
      </Button>
    </div>
  );
}
