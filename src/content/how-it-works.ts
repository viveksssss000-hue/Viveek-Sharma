/**
 * How It Works page copy (spec 7.3). URL: /how-it-works
 *
 * The page's job is to remove every process-related fear by being unusually
 * specific. Competitors mention onboarding speed as a one-line claim and never
 * publish an actual timeline; publishing one makes a new firm look more
 * accountable than a large one.
 *
 * The seven service commitments are published promises. [CONFIRM ALL FIGURES]
 * before launch - a missed published promise is worse than no promise.
 */

import { pricing } from "@/lib/site";
import { routes } from "@/content/global";

export const header = {
  h1: "From first call to finished work in about two weeks.",
  intro:
    "Here is the whole process, with the day counts and the amount of your time each stage needs. If anything here does not match what actually happens, tell us and we will fix the page.",
} as const;

/* --- Section 2: The four stages (7.3.3) --------------------------- */

export const stages = [
  {
    number: 1,
    title: "The call",
    days: "Day 0",
    yourTime: "20 minutes of your time",
    body: "A 20-minute video call. You describe the work, the software, the client mix and the hours you want covered. We tell you honestly whether we are a fit, what it will cost, and how many of your clients one person can realistically carry. If we are not a fit, we say so on this call and you have lost 20 minutes.",
  },
  {
    number: 2,
    title: "Choosing your bookkeeper",
    days: "Days 1 to 5",
    yourTime: "About 1 hour of your time",
    body: "Within two to three business days we send you two or three profiles: name, experience, certifications, software, a work sample and a short video introduction. You interview the ones you like, by video, for as long as you want. You choose. If none of them are right, we go again at no cost and no obligation.",
  },
  {
    number: 3,
    title: "Setup and the practice week",
    days: "Days 6 to 12",
    yourTime: "About 2 hours of your time",
    body: "We write your process document with you, in one or two short sessions. You create named user accounts for your bookkeeper in your systems, at the access level you choose. Your bookkeeper then spends a week on sample or historical files, and their team lead reviews everything. You are not billed for this week. At the end of it you get a written note on what they found easy, what they found unclear, and what they want to confirm with you.",
  },
  {
    number: 4,
    title: "Live work",
    days: "Day 13 onward",
    yourTime: null,
    body: "Your bookkeeper starts on the clients you have assigned, usually beginning with two or three and adding more each week until the portfolio is full. Their team lead reviews the work before it reaches you. You review and sign off. Billing starts on the first day of live work, not before.",
  },
] as const;

/* --- Section 3: What we need from you (7.3.4) --------------------- */

export const whatWeNeed = {
  h2: "What we need from you - honestly, about three hours in the first two weeks.",
  items: [
    "A 20-minute call to start.",
    "About an hour to interview candidates.",
    "One or two short sessions to build the process document, roughly 90 minutes in total.",
    "Named user accounts in your systems, created by you, at the access level you choose.",
    "A named person at your firm your bookkeeper can ask questions - usually you at first, then whoever is reviewing.",
    "A decision on hours and on which clients go first.",
  ],
  closing:
    "After the first two weeks, most firms spend 20 to 30 minutes a week on this, plus their normal review time.",
} as const;

/* --- Section 4: The weekly rhythm (7.3.5) ------------------------- */

export const rhythm = {
  h2: "How the week actually runs.",
  items: [
    "Every working day: your bookkeeper works your chosen hours and posts a short end-of-day note in your chosen channel - Slack, Teams, email or your practice management tool - listing what was completed, what is in progress, and any question that needs you.",
    "Questions never sit silently. Anything blocking work is asked the same day, in writing, in one place, so nothing is lost and you can answer in a batch.",
    "Once a week: a 15-minute video call with you, or a written update if you would rather not have a call. Your choice, and you can change it any time.",
    "Once a month: their team lead sends you a one-page summary - clients closed on time, exceptions found, hours used, and anything we think you should know.",
    "Anything urgent: you have the team lead’s direct WhatsApp and email. You are not routed through a ticket system.",
  ],
  link: { label: "How access and security work", href: routes.security },
} as const;

/* --- Section 5: Service commitments (7.3.6) ---------------------- *
 * [CONFIRM ALL FIGURES WITH CLIENT] These become promises the firm must be
 * able to honour. Any figure that cannot be met must be corrected, not
 * quietly dropped.                                                      */

export const commitments = {
  h2: "What we commit to.",
  rows: [
    { what: "Candidate profiles sent", when: "Within 3 business days of the first call" },
    { what: "Live work starts", when: "Within 8 business days of you choosing a person" },
    { what: "Reply to any question from you", when: "Within 4 working hours, in your business day" },
    { what: "Month-end close delivered for review", when: "By the date agreed in your process document" },
    { what: "Replacement bookkeeper in place", when: "Within 10 business days of your request" },
    { what: "Notice to cancel", when: `${pricing.noticeDays} days, any time, no exit fee` },
    { what: "Practice week and any replacement ramp-up", when: "Not billed" },
  ],
  note: "If we miss one of these, tell us and we will credit the affected days. We would rather publish these numbers and be held to them than write “fast turnaround” and hope you do not ask.",
} as const;

/* --- Section 6: The replacement guarantee (7.3.7) ---------------- */

export const guarantee = {
  h2: "If the fit is wrong, we fix it - not you.",
  paragraphs: [
    "You can ask for a different bookkeeper at any time, for any reason, including one you would rather not explain. There is no charge and no argument.",
    "Because your process document already exists, a replacement starts from your written process rather than from nothing. We do not bill you for their ramp-up time, and their team lead reviews their work more closely for the first month.",
    "This is the whole reason we build a process document in week one. It is not paperwork - it is what makes your firm independent of any one person, including ours.",
  ],
} as const;

/* --- Section 7: FAQ for this page (7.3.8) ------------------------ */

export const faqHeading = "Questions about the process.";

export const faqs = [
  {
    q: "Do I have to give them access to all my clients?",
    a: "No. You assign clients one at a time, and access is granted per client. Most firms start with two or three and add more over the first month.",
  },
  {
    q: "What if I want to start slowly?",
    a: "Start with the free 20-hour pilot, then part-time, then move to full-time when the work justifies it. Going slowly is never penalised - the price is the same whether you start with one client or ten.",
  },
  {
    q: "Can I speak to the bookkeeper directly, or does everything go through an account manager?",
    a: "Directly, every day. The team lead exists to check quality and to be your escalation point, not to sit between you and your own bookkeeper.",
  },
  {
    q: "What happens in the first week if it is obviously not working?",
    a: "Tell us during the practice week and we stop. You have not been billed anything at that point.",
  },
] as const;
