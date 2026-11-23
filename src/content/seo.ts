/**
 * Title tags and meta descriptions (spec 10.2), used exactly as written.
 * Titles sit within the 60-character display limit where possible;
 * descriptions are 150 to 158 characters. Both are written to be clicked.
 *
 * Every page has a unique title and a unique description. Duplicates are a
 * common and damaging error, so `assertUniqueMeta` below fails the build if
 * two pages ever collide.
 */

import { routes } from "@/content/global";

type Meta = { title: string; description: string; noindex?: boolean };

export const meta: Record<string, Meta> = {
  [routes.home]: {
    title: "Bookkeeping, Accounting and Dedicated Staff | tryACOwork",
    description:
      "Outsourced bookkeeping and accounting for US businesses and CPA firms - or hire a dedicated professional through us. Quoted in writing. Free 20-hour pilot.",
  },
  [routes.services]: {
    title: "Bookkeeping and Accounting Services | tryACOwork",
    description:
      "Bookkeeping and accounting run by our own team: reconciliations, payables, receivables, payroll support, month-end close and reporting, returned for your review.",
  },
  [routes.servicesForFirms]: {
    title: "Outsourced Bookkeeping for CPA Firms | tryACOwork",
    description:
      "Reconciliations, payables, month-end close and cleanups, done by one dedicated bookkeeper inside your own systems. Scoped and quoted for your firm.",
  },
  [routes.staffing]: {
    title: "Hire Dedicated Accounting Staff | tryACOwork",
    description:
      "An experienced accounting professional who works only for you, on our payroll - your software, your hours, with equipment, cover and a free replacement included.",
  },
  [routes.howItWorks]: {
    title: "How It Works: Hiring an Offshore Bookkeeper",
    description:
      "From first call to live work in about two weeks. See the day-by-day onboarding, the service commitments and the replacement guarantee.",
  },
  [routes.security]: {
    title: "Is Offshore Bookkeeping Safe? Our Security Controls",
    description:
      "How we protect your clients’ data: your systems only, named accounts, no downloads, signed confidentiality terms. Plus engagement letter wording.",
  },
  [routes.about]: {
    title: "About tryACOwork | Bookkeeping for US Firms",
    description:
      "A small firm built for small firms. Why we do bookkeeping only, why we publish our prices, and where we are based.",
  },
  [routes.freePilot]: {
    title: "Free 20-Hour Bookkeeping Pilot for CPA Firms",
    description:
      "Try us on real client work for 20 hours, free. No card, no commitment. See the two-week plan and request a slot.",
  },
  [routes.bookACall]: {
    title: "Book a 20-Minute Call | tryACOwork",
    description:
      "A short video call about your firm, your software and what one dedicated bookkeeper would cost. Honest answer either way.",
  },
  [routes.blog]: {
    title: "Resources for Accounting Firm Owners | tryACOwork",
    description:
      "Practical writing on offshoring bookkeeping: what it costs, how to manage it, what goes wrong and how to avoid it.",
  },
  [routes.privacy]: {
    title: "Privacy Policy | tryACOwork",
    description:
      "How tryACOwork collects, uses and protects the information you give us through this website.",
  },
  [routes.terms]: {
    title: "Terms of Service | tryACOwork",
    description: "The terms that apply to your use of the tryACOwork website.",
  },
  [routes.thankYou]: {
    title: "Thank you | tryACOwork",
    description: "Your request is with us. We will reply within one business day.",
    noindex: true,
  },
  [routes.thankYouCall]: {
    title: "Your call is booked | tryACOwork",
    description: "Your 20-minute call is booked. Here is what happens next.",
    noindex: true,
  },
  "/404": {
    title: "Page not found | tryACOwork",
    description: "That page has moved, or never existed.",
    noindex: true,
  },
};

/** Fails the build if two pages ever share a title or a description. */
function assertUniqueMeta() {
  for (const field of ["title", "description"] as const) {
    const seen = new Map<string, string>();
    for (const [path, m] of Object.entries(meta)) {
      const value = m[field];
      const first = seen.get(value);
      if (first) {
        throw new Error(
          `Duplicate ${field} on "${first}" and "${path}": ${value}`
        );
      }
      seen.set(value, path);
    }
  }
}
assertUniqueMeta();

/** Primary keyword per page (spec 10.1). One page per phrase - never target
 *  the same phrase twice or the two pages compete with each other. */
export const keywords: Record<string, string> = {
  [routes.home]: "outsourced bookkeeping and accounting services",
  [routes.services]: "bookkeeping and accounting services for businesses",
  [routes.servicesForFirms]: "outsourced bookkeeping for CPA firms",
  [routes.staffing]: "hire dedicated offshore accounting staff",
  [routes.howItWorks]: "how offshore bookkeeping works for accounting firms",
  [routes.security]: "is offshore bookkeeping safe for CPA firms",
  [routes.about]: "about tryACOwork",
  [routes.freePilot]: "free bookkeeping pilot for CPA firms",
};
