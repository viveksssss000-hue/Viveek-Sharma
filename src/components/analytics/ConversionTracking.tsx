"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { trackEvent } from "@/lib/analytics";

/**
 * Site-wide conversion tracking (Website P2 follow-up, item 1). Fires GA4
 * events via the trackEvent helper:
 *  - audit_cta_click  : any "Book your Workflow Audit" CTA (links to /contact)
 *  - booking_completed: Calendly posts an event_scheduled message on booking
 *
 * Mounted once in the root layout. trackEvent no-ops until GA loads (it loads
 * only after cookie consent and a real NEXT_PUBLIC_GA_ID), so this is safe to
 * run unconditionally. package_page_view / pricing_view fire from <TrackView/>.
 */
export function ConversionTracking() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.("a") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      // All audit CTAs route to the booking flow (/contact) and read
      // "Book your Workflow Audit"; secondary "Contact us" links don't match.
      if (href.startsWith("/contact") && /workflow audit/i.test(link.textContent ?? "")) {
        trackEvent("audit_cta_click", { location: pathname });
      }
    }

    function onMessage(e: MessageEvent) {
      const data = e.data;
      if (
        data &&
        typeof data === "object" &&
        (data as { event?: string }).event === "calendly.event_scheduled"
      ) {
        trackEvent("booking_completed", { location: pathname });
      }
    }

    document.addEventListener("click", onClick, true);
    window.addEventListener("message", onMessage);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("message", onMessage);
    };
  }, [pathname]);

  return null;
}
