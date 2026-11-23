/**
 * Global copy: navigation, footer, the shared scope block, the closing
 * call-to-action band, and the microcopy reference from Appendix C.
 *
 * Every string here is FINAL COPY from the build specification and is used
 * verbatim. Appendix C is the authority on the small strings - if a button
 * label appears twice on the site it comes from `microcopy` so the two can
 * never drift apart.
 *
 * House style (spec 2.3 and the client's note): plain hyphens, never em
 * dashes. American spelling. No exclamation marks. No published prices - they are quoted after a call.
 */

import { site, terms } from "@/lib/site";

/* ------------------------------------------------------------------ */
/* Routes - one place, so no link is ever typed by hand                */
/* ------------------------------------------------------------------ */

export const routes = {
  home: "/",
  /** The PRIMARY offer: bookkeeping and accounting run by our team. */
  services: "/bookkeeping-and-accounting-services",
  /** The firm-specific services page. The long URL is the SEO asset the old
   *  site built - it must never be renamed or redirected away. */
  servicesForFirms: "/bookkeeping-services-for-cpa-firms",
  /** The SECONDARY offer: a dedicated person on our payroll. */
  staffing: "/hire-dedicated-staff",
  pricing: "/bookkeeping-and-accounting-services#pricing",
  howItWorks: "/how-it-works",
  security: "/security",
  about: "/about",
  bookACall: "/book-a-call",
  freePilot: "/free-pilot",
  blog: "/blog",
  privacy: "/privacy-policy",
  terms: "/terms",
  thankYou: "/thank-you",
  thankYouCall: "/thank-you-call",
} as const;

/* ------------------------------------------------------------------ */
/* Reserved routes (CO-05)                                             */
/* ------------------------------------------------------------------ */

/**
 * Paths held for a later phase. They are recorded here so a future developer
 * does not invent a different slug, and so a blog post cannot take the clean
 * top-level URL.
 *
 * MUST NOT, for both:
 *  - create the route. Both paths return the 404 page.
 *  - appear in sitemap.xml, the navigation, the mobile menu, the footer or the
 *    internal link map.
 *  - be used, or near-varied, as a top-level slug for anything else. A blog
 *    article at /blog/audit-support-for-cpa-firms is fine and expected; the
 *    top-level path itself stays free.
 *  - be mentioned in any copy, alt text, meta description or structured data.
 *
 * `npm run qa` checks the first two.
 */
export const reservedRoutes = [
  {
    path: "/audit-support-for-cpa-firms",
    intendedFor:
      "A second top-level service page. Needs qualified audit staff, a named reviewer and a security certification first - none of which exist yet.",
    keywordsOnHold: [
      "outsourced audit support for CPA firms",
      "audit workpaper preparation outsourcing",
    ],
  },
  {
    path: "/us-gaap-ifrs",
    intendedFor:
      "A technical resource hub, not a service page. Blog articles 17 and 18 have to exist first so the hub has something to gather. Never carries a price.",
    keywordsOnHold: [],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Microcopy (Appendix C)                                              */
/* ------------------------------------------------------------------ */

export const microcopy = {
  bookCall: "Book a 20-minute call",
  seeHowItWorks: "See how it works",
  startPilot: "Start with a free 20-hour pilot",
  pilotSubmit: "Request a free 20-hour pilot",
  submitting: "Sending...",
  menuOpen: "Open menu",
  menuClose: "Close menu",
  skipLink: "Skip to main content",
  cookieText:
    "We use a small number of cookies to understand how the site is used. You can decline and everything still works.",
  cookieAccept: "Accept",
  cookieDecline: "Decline",
  cookieSettings: "Cookie settings",
  privacyLineForms:
    "We will only use your details to reply to you. We do not sell data.",
  privacyLineBooking:
    "We will use your details only to arrange and follow up this call. We do not sell data and we do not add you to a mailing list without asking.",
  accordionExpand: "Show answer",
  accordionCollapse: "Hide answer",
  copyWording: "Copy this wording",
  copied: "Copied",
  required: "Required",
  logoAlt: "tryACOwork",
} as const;

/* ------------------------------------------------------------------ */
/* Navigation (spec 5.3) - five links plus one button. No dropdowns.   */
/* ------------------------------------------------------------------ */

/**
 * ONE ordered data structure for both the desktop header and the mobile menu
 * (CO-06). Adding a sixth item is a data edit here and nothing else - there is
 * no second hardcoded list to keep in step.
 *
 * A sixth item, "Audit Support", is planned for a later phase. The header has
 * been tested with six links plus the button at 1024px, 1152px and 1280px; the
 * screenshots are in the handover. Do NOT add a dropdown to make room - the
 * no-dropdown rule in spec 5.3 stands in this phase and the next.
 *
 * Pricing is deliberately not a top-level item: it lives on the Services page,
 * and every Pricing link points at routes.pricing.
 */
export const mainNav = [
  { label: "Services", href: routes.services },
  { label: "Dedicated Staff", href: routes.staffing },
  { label: "How It Works", href: routes.howItWorks },
  { label: "Security", href: routes.security },
  { label: "About", href: routes.about },
  { label: "Resources", href: routes.blog },
] as const;

/** The mobile menu carries two extra links that the desktop bar does not. */
export const mobileNavExtra = [
  { label: "What it costs", href: routes.pricing },
  { label: "Free pilot", href: routes.freePilot },
] as const;

/* ------------------------------------------------------------------ */
/* Footer (spec 6.3)                                                   */
/* ------------------------------------------------------------------ */

export const footer = {
  blurb: [
    "Bookkeeping and accounting services for US businesses and firms.",
    "And dedicated staff through us, when you would rather build your own team.",
  ],
  columns: [
    {
      heading: "Company",
      links: [
        { label: "Services", href: routes.services },
        { label: "Dedicated staff", href: routes.staffing },
        { label: "For CPA firms", href: routes.servicesForFirms },
        { label: "About", href: routes.about },
        { label: "Security", href: routes.security },
        { label: "Resources", href: routes.blog },
      ],
    },
    {
      heading: "Get started",
      links: [
        { label: microcopy.bookCall, href: routes.bookACall },
        { label: "Free 20-hour pilot", href: routes.freePilot },
        { label: "What it costs", href: routes.pricing },
      ],
    },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: routes.privacy },
    { label: "Terms of Service", href: routes.terms },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* The price block (spec 7.1.5) - one component, used on Home and      */
/* Services. The single strongest differentiator on the site.          */
/* ------------------------------------------------------------------ */

export const scopeBlock = {
  h2: "What it costs, and how we agree it.",
  intro:
    "We do not publish a rate card. A business with one set of books and a firm with forty clients need different things, so we scope your actual work on a short call and put the price in writing before you commit to anything.",
  includedHeading: "Included in every engagement, at no extra cost:",
  included: [
    "Salary, taxes and benefits",
    "A laptop and a second monitor",
    "A desk in a secure, access-controlled office",
    "Power and internet backup",
    "A team lead who oversees their work",
    "Ongoing US GAAP and software training",
    "A free replacement if the fit is wrong",
    `${terms.noticeDays} days notice to cancel, any time`,
  ],
  notIncludedHeading: "Not included, and we will not pretend otherwise:",
  notIncluded: [
    "Software licences stay in your name, because the books should live in your systems, not ours",
    "Work we are not qualified or authorised to sign off on, including audit opinions",
    "Hours above the ones agreed, which are quoted in advance and billed only with your written approval",
    "Full US-hours coverage from 9am to 5pm Eastern, which is a night shift in India and is quoted separately",
  ],
  buttonLabel: microcopy.startPilot,
  linkLabel: "See exactly what is included",
} as const;

/* ------------------------------------------------------------------ */
/* Closing call-to-action band (spec 7.11)                             */
/* ------------------------------------------------------------------ */

export const closingCta = {
  h2: "Find out what one bookkeeper would do for your firm.",
  body: "A 20-minute video call. We will tell you what it costs, how many of your clients one person could carry, and whether we are the right fit - including if we are not.",
  buttonLabel: microcopy.bookCall,
  linkLabel: "Or try us on real work with a free 20-hour pilot",
  linkHref: routes.freePilot,
} as const;

/**
 * The closing band appears at the foot of every page except these.
 * Spec 7.11 is the single source of truth for the exclusion list.
 */
export const closingCtaExcludedPaths = [
  routes.bookACall,
  routes.freePilot,
  routes.thankYou,
  routes.thankYouCall,
  routes.privacy,
  routes.terms,
] as const;

/* ------------------------------------------------------------------ */
/* 404 (spec 6.4)                                                      */
/* ------------------------------------------------------------------ */

export const notFound = {
  h1: "That page has moved, or never existed.",
  body: "Sorry about that. Here are the pages most people are looking for.",
  links: [
    { label: "Bookkeeping and accounting services", href: routes.services },
    { label: "Hire dedicated staff", href: routes.staffing },
    { label: "How it works", href: routes.howItWorks },
    { label: microcopy.bookCall, href: routes.bookACall },
  ],
  buttonLabel: "Back to the home page",
} as const;

/* ------------------------------------------------------------------ */
/* Thank-you pages (spec 7.10)                                         */
/* ------------------------------------------------------------------ */

export const thankYouCall = {
  h1: "You are booked. Here is what happens next.",
  body1: `A calendar invitation with the video link is on its way to your inbox. If it has not arrived in five minutes, check your spam folder and then email us at ${site.email}.`,
  listHeading: "To make the 20 minutes useful, it helps if you can think about:",
  list: [
    "How many clients you would want covered, roughly.",
    "What software those clients are on.",
    "Which parts of the work you would hand over first, and which you would keep.",
    "Anything that has gone wrong for you with outsourcing before - that is the most useful thing you can tell us.",
  ],
  body2:
    "Nothing to prepare, nothing to send, no forms. If you need to move the time, use the reschedule link in your invitation.",
  waitHeading: "While you wait",
  waitLinks: [
    { label: "How the process works, day by day", href: routes.howItWorks },
    { label: "How we protect your clients’ data", href: routes.security },
    { label: "What it costs", href: routes.pricing },
  ],
} as const;

export const thankYouPilot = {
  h1: "Got it. We will come back to you within one business day.",
  body1:
    "Your request is with us. Someone will reply personally - not an automated sequence - within one business day, and usually much faster. Because we are in India, that reply will often be waiting for you in the morning.",
  body2: `If it is urgent, email ${site.email} and say so in the subject line.`,
  listHeading: "In the meantime",
  list: [
    { label: "How the process works", href: routes.howItWorks },
    { label: "How we protect your clients’ data", href: routes.security },
    {
      label: "Book a call instead, if you would rather just talk",
      href: routes.bookACall,
    },
  ],
} as const;

