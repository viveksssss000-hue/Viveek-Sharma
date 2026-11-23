/**
 * The Dedicated Staffing page - the SECONDARY offer.
 *
 * Who it speaks to: a firm or business that wants to run its own accounting
 * operation and needs an experienced person to run it with. The person works
 * only for the client and stays on OUR payroll - that sentence is the whole
 * offer, and every claim here must stay true to it.
 *
 * It must never pitch the services path - the home page chooser exists so
 * each visitor reads only their own path (client decision, 23 November).
 */

import { routes } from "@/content/global";
import { terms } from "@/lib/site";

export const header = {
  eyebrow: "Experienced staff",
  h1: "Hire a dedicated accounting professional through us.",
  intro:
    "For firms and businesses that want to run their own operation, with an experienced person to run it. Your software, your process, your direction - while we carry the employment, the equipment and the cover.",
} as const;

/* --- What dedicated means ------------------------------------------ */

export const dedicated = {
  h2: "What dedicated actually means.",
  items: [
    "They work only for you - never shared across other clients",
    "Your hours overlap, your tools, your way of doing things",
    "On our payroll: salary, taxes and benefits are ours to handle",
    "A laptop, a second monitor and a desk in our secure office",
    "A team lead who oversees their work behind the scenes",
    "Paid leave and absence cover arranged by us, not by you",
    "A free replacement if the fit is wrong - no charge, no argument",
  ],
  closing: `${terms.noticeDays} days notice to end, any time, with no exit fee.`,
} as const;

/* --- The path from call to live work -------------------------------- */

export const path = {
  h2: "From first call to live work.",
  steps: [
    {
      title: "Tell us what you need",
      body: "A 20-minute call about the role, the software and the hours you want covered.",
    },
    {
      title: "Meet two or three candidates",
      body: "Profiles with real work samples, within a few business days. You interview them yourself, by video, and you choose - or ask to see more.",
    },
    {
      title: "A practice week, on us",
      body: "Before live work, your person runs sample files against a written process document we build with you. You do not pay for that week.",
    },
    {
      title: "Live, with your review",
      body: "They start on the work you assign, and everything comes back to you - the review always stays yours.",
    },
  ],
  link: {
    label: "See the full onboarding timeline, day by day",
    href: routes.howItWorks,
  },
} as const;

/* --- The line we hold ------------------------------------------------ */

export const boundary = {
  h2: "One line we hold.",
  body: "Your dedicated person prepares; you review and own. They do not sign off on anything, reach conclusions on your behalf, or speak to your clients unless you set that up deliberately.",
} as const;
