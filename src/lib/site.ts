/**
 * site.ts - the shape of the business, assembled from editable settings.
 *
 * The values themselves live in content/settings.json, which the client edits
 * at /admin without a developer. This file gives them names, types and the few
 * derived figures the site needs (the annual equivalent of the monthly price,
 * for instance), so that a price change is one edit in one place and every
 * appearance of it - Home, Services, the comparison table, the FAQ, the Service
 * structured data and the Open Graph image - follows.
 *
 * Spec 7.1.5 requires exactly that: "every price figure is wrapped in a span
 * with a class so all prices can be updated in one place".
 */

import {
  bookingSettings,
  business,
  imageSettings,
} from "@/lib/settings";

export const site = {
  name: "tryACOwork",
  /**
   * HOW THE NAME IS WRITTEN, EVERYWHERE: tryACOwork.
   *
   * Lower-case "try", capital "ACO", lower-case "work" - matching the logo. It
   * stays lower-case even at the start of a sentence, the way eBay and iPhone
   * do.
   *
   * What the letters stand for is INTERNAL ONLY and must not appear on the site
   * in any form (CO-07): not in copy, a tagline, the footer, a title tag, a meta
   * description, alt text or structured data. It promises a service the launch
   * copy cannot answer for. `npm run qa` fails if it appears.
   *
   * This overrides spec 3.1, which asked for "Tryacowork, one word, capital T
   * only". The client chose the logo's spelling instead, so the specification is
   * out of date on this point and the code is right. `npm run qa` fails on the
   * old spelling appearing in rendered text, to stop it drifting back.
   *
   * The domain, the email address and every URL stay all-lower-case
   * (tryacowork.com), because that is what they actually are.
   */
  tagline:
    "Reliable bookkeeping, accounting services, and dedicated offshore talent for growing businesses and US accounting firms.",
  domain: "www.tryacowork.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tryacowork.com",

  legalName: business.legalName,
  address: {
    street: business.addressStreet,
    city: business.officeCity,
    region: business.addressRegion,
    postalCode: business.addressPostalCode,
    country: "India",
    countryCode: "IN",
  },
  /** The city named on the About page, the Security page and the FAQ. */
  officeCity: business.officeCity,

  email: business.email,
  /** Null unless a number is confirmed as answerable in US hours (spec 6.3). */
  phone: business.phone,
  /** Null hides the link rather than pointing at a page that does not exist. */
  linkedin: business.linkedin,

  founder: {
    name: business.founderName,
    firstName: business.founderName.split(" ")[0],
    role: business.founderRole,
  },

  teamSizeStatement: business.teamSizeStatement,
  heroImage: imageSettings.hero,
} as const;

/**
 * Booking (spec 7.6.1 and 11.4).
 *
 * The Cal.com event MUST be configured with a success redirect to
 * {site.url}/thank-you-call, because that page load is what fires the primary
 * conversion. `calLink` is null until the event exists, and the booking page
 * shows a written fallback rather than an embed reporting Cal.com's own 404.
 */
export const booking = {
  calLink: bookingSettings.calLink,
  fallbackUrl: process.env.NEXT_PUBLIC_BOOKING_FALLBACK_URL ?? null,
  successPath: "/thank-you-call",
  durationMinutes: 20,
} as const;

/** Engagement terms. Prices are not published - they are quoted after a call. */
export const terms = {
  /** The free pilot, in hours. Spec 14.3: keep it at 20. */
  pilotHours: 20,
  /** Cancellation notice, in days. */
  noticeDays: 30,
} as const;


