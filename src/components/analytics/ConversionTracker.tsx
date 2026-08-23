"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import {
  trackCallBooked,
  trackChecklistDownloaded,
  trackPilotRequested,
} from "@/lib/analytics";

/**
 * Fires the three key conversions on the thank-you page load (spec 11.2).
 *
 * WHY ON THE PAGE, NOT ON THE FORM SUBMIT
 * Spec 11.4: the reliable way to track a booking made inside a third-party
 * widget is the redirect, and the event fires on the page that the visitor
 * lands on. The same pattern is used for the two forms so all three
 * conversions are measured identically - and so a submission that fails after
 * the network call is never counted.
 *
 * Guarded against firing twice, which React's development double-render and a
 * client-side re-navigation would otherwise cause.
 */
export function ConversionTracker({
  event,
}: {
  event: "call_booked" | "pilot_requested" | "checklist_downloaded";
}) {
  const searchParams = useSearchParams();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    if (event === "call_booked") {
      trackCallBooked(document.referrer || "direct");
      return;
    }

    if (event === "pilot_requested") {
      trackPilotRequested();
      return;
    }

    // Where the checklist form was submitted from, passed through the redirect.
    const from = searchParams.get("from");
    const location =
      from === "footer" || from === "blog_index" || from === "article"
        ? from
        : "unknown";
    trackChecklistDownloaded(location);
  }, [event, searchParams]);

  return null;
}
