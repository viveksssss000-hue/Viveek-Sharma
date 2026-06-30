"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

/**
 * Fires a one-off GA4 event when the page mounts (Website P2 follow-up, item 1).
 * Used for page-view conversions: pricing_view on /pricing and
 * package_page_view on /solutions/[slug]. trackEvent no-ops until GA loads.
 */
export function TrackView({
  event,
  params,
}: {
  event: string;
  params?: Record<string, string | number | boolean>;
}) {
  useEffect(() => {
    trackEvent(event, params);
    // Fire once on mount; params are captured at mount time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
