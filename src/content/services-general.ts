/**
 * The Professional Services page - the PRIMARY offer.
 *
 * Who it speaks to: a US business owner who wants the books handled without
 * building an accounting department, and a firm that wants client work
 * delivered without managing it. It must never pitch dedicated staffing -
 * the home page chooser exists so each visitor reads only their own path
 * (client decision, 23 November).
 *
 * House style: plain hyphens, American spelling, no exclamation marks, no
 * published prices. The word "audit" may appear ONLY inside the approved
 * phrase "including audit opinions" (qa.mjs APPROVED_AUDIT_CONTEXTS).
 */

import { routes } from "@/content/global";

export const header = {
  eyebrow: "Our professional services",
  h1: "Bookkeeping and accounting, run by our team.",
  intro:
    "For US businesses that want the books handled without building an accounting department, and for CPA firms that want client work delivered without managing it. Our own people do the work, the same people every month, and everything comes back to you for review.",
} as const;

/* --- The work, in two columns ------------------------------------- */

export const whatWeRun = {
  h2: "The work we take on.",
  columns: [
    [
      "Transaction coding, in your ledger",
      "Bank and credit card reconciliations",
      "Bills entered and payments prepared for your approval",
      "Invoices raised and receivables followed up",
      "Payroll support alongside your payroll provider",
      "Anything unclear flagged the same day, not at month-end",
    ],
    [
      "A close checklist, run the same way every month",
      "Accruals, prepaids and fixed-asset schedules",
      "Balance sheet reconciliations",
      "Draft financial statements",
      "A plain-English summary of what moved and why",
      "Cleanups and catch-ups, estimated in hours before we start",
    ],
  ],
  closing:
    "Something on your list that is not here? Ask on the call. If it is bookkeeping or accounting work we can stand behind, we will scope it - and if it is not, we will say so.",
} as const;

/* --- How an engagement works --------------------------------------- */

export const engagement = {
  h2: "How an engagement works.",
  steps: [
    {
      title: "A 20-minute call",
      body: "You tell us about the business or the firm, the software and the state of the books. We will tell you honestly whether we are the right fit - including if we are not.",
    },
    {
      title: "A written scope and quote",
      body: "Exactly what we will run each month, what it costs and where our work stops - on paper, before you commit to anything. Nothing changes without your written approval.",
    },
    {
      title: "The same people, every month",
      body: "Named people who learn how you like things done, with a senior review before anything reaches you. The review and the sign-off stay with you.",
    },
  ],
} as const;

/* --- The line we do not cross --------------------------------------- */

export const boundariesNote = {
  h2: "Where our work stops.",
  body: "We do not prepare or sign tax returns, reach accounting conclusions on your behalf, or give opinions of any kind - including audit opinions. The work is prepared by us and reviewed and owned by you, and where a task needs authority we do not hold, we say so and stay out of it.",
} as const;

/* --- The firm cross-link -------------------------------------------- */

export const forFirms = {
  h2: "Running a CPA or accounting firm?",
  body: "There is a page for how we slot into a practice: client confidentiality, your review workflow, and the boundaries that protect your licence.",
  link: {
    label: "Bookkeeping services for CPA firms",
    href: routes.servicesForFirms,
  },
} as const;
