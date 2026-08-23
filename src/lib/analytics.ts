/**
 * Conversion tracking (spec 11.2).
 *
 * These exact event names are used so the GA4 reports stay readable and
 * consistent. Nothing fires until cookie consent has been given, because gtag
 * is not loaded before then - so every call here is a no-op for a visitor who
 * declined, with no error and no queue.
 *
 * Key events (the only three marked as conversions in GA4, spec 11.3):
 *   call_booked ........... primary
 *   pilot_requested ....... secondary
 *   checklist_downloaded .. tertiary
 * Nothing else may be marked as a conversion; marking scroll depth or button
 * clicks as conversions makes the reports meaningless.
 */

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "consent",
      action: string,
      params?: GtagParams
    ) => void;
  }
}

function track(name: string, params?: GtagParams) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}

/* --- The three conversions ---------------------------------------- */

/** Fires on /thank-you-call. page_referrer shows which page produced it. */
export function trackCallBooked(referrer: string) {
  track("call_booked", { page_referrer: referrer });
}

/** Fires on /thank-you after the pilot form. */
export function trackPilotRequested() {
  track("pilot_requested", { form_name: "free_pilot" });
}

/** Fires on /thank-you-checklist - not on form submit (spec 7.10.3). */
export function trackChecklistDownloaded(
  formLocation: "footer" | "blog_index" | "article" | "unknown"
) {
  track("checklist_downloaded", { form_location: formLocation });
}

/* --- Engagement ---------------------------------------------------- */

export type CtaLocation =
  | "header"
  | "hero"
  | "closing_band"
  | "sticky_mobile"
  | "mobile_menu"
  | "article"
  | "pricing"
  | "footer"
  | "page_header"
  | "body";

export function trackCtaClick(kind: "book_call" | "pilot", location: CtaLocation) {
  track(kind === "book_call" ? "cta_click_book_call" : "cta_click_pilot", {
    location,
  });
}

/** The pricing section was 50 percent visible for 2 seconds or more. */
export function trackPricingView(page: string) {
  track("pricing_section_view", { page });
}

/** An FAQ item was opened. Reveals what visitors actually worry about. */
export function trackFaqOpen(question: string) {
  track("faq_open", { question_text: question });
}

/** The visitor reached 75 percent of page depth. */
export function trackScroll75(page: string) {
  track("scroll_75", { page });
}

export function trackOutboundClick(url: string) {
  track("outbound_click", { link_url: url });
}
