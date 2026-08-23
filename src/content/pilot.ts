/**
 * Free Pilot page copy (spec 7.7). URL: /free-pilot
 *
 * The page's job: capture the visitor who will not book a call yet. Free trials
 * are common in this market but almost never structured or explained, so a
 * published week-by-week pilot plan is a real differentiator.
 *
 * The brand voice bans the word "trial" (spec 3.6) - it is always a "free
 * 20-hour pilot", which is specific and sounds professional.
 */

import { microcopy, routes } from "@/content/global";
import { pilotSettings } from "@/lib/settings";

export const header = {
  h1: "Try us on real work. 20 hours, free.",
  intro:
    "Reading a website tells you very little about whether someone can reconcile a messy bank account. So do the obvious thing: give us a real job and see what comes back.",
} as const;

export const whatItIs = {
  h2: "What the pilot is",
  items: [
    "20 hours of work from one of our bookkeepers, at no charge.",
    "On your real clients, in your real software, using your real process.",
    "Spread over two weeks, or faster if you need it faster.",
    "Reviewed by a senior team lead before it reaches you, exactly as it would be if you were a client.",
    "You keep everything: the completed work, the reconciliations, the schedules, the notes.",
  ],
} as const;

export const twoWeeks = {
  h2: "How the two weeks run",
  weeks: [
    {
      label: "Week 1",
      body: "Days 1 to 2: a 20-minute call to agree the scope, then you create a named user account for your bookkeeper at whatever access level you choose. Days 3 to 7: the work starts. You get a short end-of-day note each day.",
    },
    {
      label: "Week 2",
      body: "Days 8 to 12: the work completes and comes to you for review. Day 13 or 14: a 15-minute call where we walk through what was done, what we found in the books, and what we would suggest doing next - whether or not you continue with us.",
    },
  ],
} as const;

export const whatWeAsk = {
  h2: "What we ask in return",
  items: [
    "Real work, not a test. A tidy set of books tells neither of us anything useful.",
    "About an hour of your time across the two weeks.",
    "Honest feedback at the end, including if the answer is no.",
  ],
} as const;

export const atTheEnd = {
  h2: "What happens at the end",
  body: "Nothing automatic. There is no card on file, no trial that converts, no invoice. If you want to continue, we agree a monthly arrangement and start. If you do not, we remove access, you keep the work, and that is genuinely the end of it.",
} as const;

/**
 * The third line only appears if the client has set a real monthly limit in
 * settings. Publishing "a limited number" without knowing the number is the
 * kind of vagueness spec 3.6 rules out, so the line is dropped instead.
 */
export const limits = {
  h2: "The honest limits",
  items: [
    "One pilot per firm.",
    "Bookkeeping work only - it is the only thing we do.",
    ...(pilotSettings.monthlyLimitLine ? [pilotSettings.monthlyLimitLine] : []),
  ],
} as const;

export const cta = {
  buttonLabel: microcopy.pilotSubmit,
  altLinkLabel: "Or book a 20-minute call first",
  altLinkHref: routes.bookACall,
} as const;

/* ------------------------------------------------------------------ */
/* The pilot request form (spec 7.7.2 and 8.3)                         */
/* ------------------------------------------------------------------ */

export const formCopy = {
  heading: "Request a free 20-hour pilot",
  intro:
    "Ten questions, no phone number, and a real person reads every one of these.",
  labels: {
    name: "Your name",
    email: "Work email",
    firmName: "Firm name",
    firmWebsite: "Firm website",
    state: "Which state are you in?",
    software: "What accounting software do your clients use?",
    scope: "What would you like us to do in the 20 hours?",
    hours: "Roughly how many hours a week of bookkeeping would you hand over long term?",
    anythingElse: "Anything else we should know?",
    consent: "I am happy for tryACOwork to contact me about this request.",
  },
  help: {
    scope:
      "A cleanup, a month-end close, a backlog of reconciliations - whatever is actually bothering you.",
  },
} as const;

/** Field-by-field validation messages, used verbatim (spec 8.3). Vague errors
 *  like "invalid input" cause abandonment. */
export const formMessages = {
  name: { empty: "Please tell us your name." },
  email: {
    empty: "We need an email address to reply to.",
    format: "That does not look like a valid email address. Please check it.",
  },
  firmName: { empty: "Please tell us your firm’s name." },
  state: { empty: "Please choose your state." },
  software: { empty: "Please choose at least one, or select Other." },
  scope: {
    empty:
      "Tell us roughly what you would like us to work on - a sentence is enough.",
  },
  hours: {
    empty:
      "Please choose the closest option. “Not sure yet” is a perfectly good answer.",
  },
  consent: { empty: "We need your permission to reply to you." },
  summary: "Please check the fields below before sending.",
} as const;

export const softwareOptions = [
  "QuickBooks Online",
  "QuickBooks Desktop",
  "Xero",
  "Sage Intacct",
  "NetSuite",
  "Other",
] as const;

export const hoursOptions = [
  "Fewer than 10",
  "10 to 20",
  "20 to 40",
  "More than 40",
  "Not sure yet",
] as const;

export const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
  "Outside the US",
] as const;

/* ------------------------------------------------------------------ */
/* Book a Call page copy (spec 7.6)                                    */
/* ------------------------------------------------------------------ */

export const bookACall = {
  h1: "Book a 20-minute call.",
  intro:
    "A short video call with a real person. We will ask about your firm, your software and the work you would hand over, then tell you honestly whether we are a fit, what it would cost, and how many of your clients one bookkeeper could carry.",
  points: [
    "20 minutes, on video. No slide deck.",
    "You will speak to someone who can answer technical questions, not a salesperson reading a script.",
    "You will get a written summary afterwards with the price and the honest assessment, whether or not you go ahead.",
    "If we are not right for your firm, we will say so on the call and tell you what to look for instead.",
  ],
  belowWidget: {
    before: "Would rather not talk yet? Try us on real work instead, with a ",
    linkLabel: "free 20-hour pilot",
    linkHref: routes.freePilot,
    after: ".",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Blog index (spec 7.8.1)                                             */
/* ------------------------------------------------------------------ */

export const blogIndex = {
  h1: "Resources for firm owners.",
  intro:
    "Practical writing about offshoring bookkeeping - what it costs, how to manage it, what goes wrong and how to avoid it. Written by us, from doing the work.",
  empty:
    "The first articles are being written. In the meantime, the checklist below covers the questions firm owners ask us most.",
  articleCta: {
    heading: "Wondering what this would cost your firm?",
    body: "We publish our prices, and we will tell you on a 20-minute call how many of your clients one bookkeeper could carry.",
    buttonLabel: "Book a 20-minute call",
  },
} as const;
