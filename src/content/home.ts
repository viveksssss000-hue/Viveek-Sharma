/**
 * Home page copy (spec 7.1). Eleven sections in build order.
 *
 * The page's job: in under 90 seconds of scanning, convince a sceptical US firm
 * owner that this is a specialist she can trust, show her the price, and get
 * her to book a call.
 *
 * Two sections are gated behind a "confirmed" flag because the specification
 * forbids shipping invented people (7.1.6) or written testimonials (3.7):
 * `staffProfilesConfirmed` and `testimonials`. Both default to the honest
 * fallback until the client supplies real material.
 */

import { pricing, site, usd, usHoursPremiumRate } from "@/lib/site";
import { staffSettings, testimonialSettings } from "@/lib/settings";
import { routes } from "@/content/global";

/* --- Section 1: Hero (7.1.2) --------------------------------------- */

export const hero = {
  eyebrow: "For US CPA and accounting firms",
  h1: "Hire a bookkeeper who works only for your firm.",
  intro:
    "tryACOwork gives US accounting firms trained, dedicated bookkeepers in India. They work inside your software, on your clients, to your process - for a fixed monthly fee, with no recruiting, no payroll and no office to pay for.",
  priceLine: {
    before: "From ",
    figure: usd(pricing.fullTime),
    after: " a month for a full-time bookkeeper. Everything included.",
  },
  reassurance: {
    before: "No commitment. Start with a ",
    linkLabel: "free 20-hour pilot",
    linkHref: routes.freePilot,
    after: " on real work.",
  },
  image: {
    /** Null until a real photograph is uploaded through /admin. Spec 4.5
     *  prohibits stock photography, so there is no stand-in to fall back to. */
    src: site.heroImage,
    alt: "Two tryACOwork bookkeepers reviewing a bank reconciliation together at their desk in India.",
    width: 1600,
    height: 1100,
    placeholderNote:
      "Hero, 1600x1100: two tryACOwork bookkeepers at a desk, daylight, one pointing at a screen showing a reconciliation. Warm, unposed.",
  },
} as const;

/* --- Section 2: The problem, in her words (7.1.3) ------------------ *
 * The three statistics are verified (Appendix B) and their attributions
 * MUST stay on the page. An unattributed statistic is worse than none.  */

export const problem = {
  h2: "You do not have a work problem. You have a people problem.",
  intro: "Every firm owner we speak to says a version of the same three things.",
  columns: [
    {
      quote: "“I am turning away good clients.”",
      body: "Not because the work is not profitable, but because there is nobody to do it. Growth stopped being a marketing problem and became a staffing one.",
      sources: [],
    },
    {
      quote: "“I cannot hire, and when I do, they leave.”",
      body: "More than 300,000 US accountants and auditors left their jobs in two years, a 17 percent decline. Finding qualified staff is the number one issue reported by CPA firms of almost every size.",
      sources: [
        "Wall Street Journal, December 2022",
        "AICPA PCPS CPA Firm Top Issues Survey, 2024",
      ],
    },
    {
      quote: "“January to April is breaking my team.”",
      body: "The bookkeeping backlog does not pause for tax season. It just piles up behind it, and the review work lands on you at 10pm.",
      sources: [],
    },
  ],
  closing: {
    body: "You already know offshoring is the answer that most firms are landing on - about a quarter of firms already do it, and another 12 percent plan to start. The question is who you would trust with it.",
    source:
      "AICPA 2023 National MAP Survey, cited in Journal of Accountancy, November 2024",
  },
} as const;

/* --- Section 3: How it works, in three steps (7.1.4) --------------- */

export const threeSteps = {
  h2: "Three steps, about two weeks.",
  steps: [
    {
      title: "We find the person",
      body: "Tell us what you need on a 20-minute call. We shortlist from our team and from candidates we recruit for you, then send you two or three profiles with real work samples. You interview them yourself, by video. You choose.",
      icon: "search",
    },
    {
      title: "We train them on your firm",
      body: "Before your bookkeeper touches live client work, we build a written process document with you, set up access inside your systems, and run them through a paid practice week on sample files. You do not pay for that week.",
      icon: "clipboard",
    },
    {
      title: "They start, and you review",
      body: "Your bookkeeper works your hours, in your software, on the clients you assign. Work comes back to you for review and sign-off, because the professional responsibility stays with your firm - always. We handle their salary, benefits, equipment, office, HR and replacement.",
      icon: "check",
    },
  ],
  link: {
    label: "See the full onboarding timeline, day by day",
    href: routes.howItWorks,
  },
} as const;

/* --- Section 5: Meet the kind of bookkeeper you would hire (7.1.6) - *
 * MUST NOT ship fictional people. While `staffProfilesConfirmed` is false
 * the page renders `hiringStandard` instead - a single honest card about
 * the standard, exactly as the specification instructs.                */

export const staffProfilesConfirmed = staffSettings.confirmed;

export const staff = {
  h2: "These are the people. Not a pool, not a queue.",
  /**
   * Used while `staffProfilesConfirmed` is false. "These are the people"
   * followed by no people reads as a broken promise, so the fallback state uses
   * the second half of the same line, which stands on its own.
   */
  h2Fallback: "Not a pool, not a queue.",
  intro:
    "Every bookkeeper on our team is a commerce graduate who has worked on US books before joining us. They are our employees, on our payroll, in our office. Here are three of them. When you book a call, we will send you real profiles of the people who could work for your firm, with work samples, before you commit to anything.",
  buttonLabel: "Start with a free 20-hour pilot",

  /**
   * Real team members only, supplied through /admin. The specification's three
   * example profiles are deliberately NOT seeded here: an example person in a
   * data file is one careless flag away from being published, and publishing
   * invented people would destroy the exact trust this section exists to
   * create (spec 7.1.6). The field shape is documented in the CMS instead.
   */
  profiles: staffSettings.profiles,

  /** Shown until real profiles exist. Describes the standard, invents nobody. */
  hiringStandard: {
    h4: "The standard every bookkeeper on our team meets",
    points: [
      "A commerce graduate - B.Com or M.Com - who has worked on US books before joining us.",
      "Our own employee, on our payroll, in our office. Not a freelancer and not a subcontractor.",
      "Working under a senior team lead who reviews the work before it reaches you.",
      "Certified in the software your clients use, or trained on it during onboarding at no charge.",
      "Bound by a signed confidentiality agreement covering your firm and your clients.",
    ],
    closing:
      "When you book a call, we will send you real profiles of the people who could work for your firm - name, experience, certifications, a work sample and a short video introduction - before you commit to anything.",
  },
} as const;

/* --- Section 6: What the bookkeeper actually does (7.1.7) ---------- */

export const dayOneWork = {
  h2: "The work you can hand over on day one.",
  columns: [
    [
      "Bank and credit card reconciliations",
      "Transaction categorisation and coding",
      "Accounts payable: bill entry, coding, payment runs",
      "Accounts receivable: invoicing, statements, collections follow-up",
      "Payroll journal entries from ADP, Gusto or Paychex reports",
    ],
    [
      "Month-end close checklists and supporting schedules",
      "Prepaid, accrual, depreciation and amortisation schedules",
      "Sales tax reconciliations and filing preparation",
      "Cleanup and catch-up work on neglected books",
      "Financial statement preparation for your review",
      "1099 preparation and vendor record maintenance",
    ],
  ],
  /** [CONFIRM] Delete any package the team has not actually worked in. */
  closing:
    "Software our team works in: QuickBooks Online, QuickBooks Desktop, Xero, Sage Intacct, NetSuite, Bill.com, Dext, Hubdoc, Gusto, ADP, Paychex. If you use something else, we will learn it during onboarding at no charge.",
} as const;

/* --- Section 7: Security, in plain English (7.1.8) ----------------- *
 * The one dark band on the page. No certification badges anywhere - see
 * spec 3.7. Every clause in column 2 is a factual claim that must be
 * verified before launch or deleted.                                   */

export const securityBand = {
  h2: "Your clients’ data never leaves your systems.",
  columns: [
    {
      h4: "We work inside your software",
      body: "Your bookkeeper logs into your QuickBooks, your Xero, your document portal, with their own named account and their own credentials. Nothing is copied to our servers.",
    },
    {
      h4: "Nothing is downloaded, nothing is carried out",
      body: "Work happens on company machines in a locked office. USB ports are disabled, local downloads are blocked, personal phones stay out of the work area, and access is logged.",
    },
    {
      h4: "Every person is checked and bound",
      body: "Background and reference checks before hire, a signed confidentiality agreement covering your firm and your clients, annual security training, and access only to the clients you assign.",
    },
  ],
  link: {
    label:
      "Read how access, agreements and your professional obligations work",
    href: routes.security,
  },
} as const;

/* --- Section 8: The comparison table (7.1.9) ---------------------- *
 * The source line MUST appear in full. No "save 70 percent" headline over
 * the top of it - the table is more persuasive than the percentage.     */

export const comparison = {
  h2: "What the same work costs two ways.",
  intro:
    "An honest comparison, using published US wage data rather than our own numbers.",
  columnHeads: ["", "US in-house bookkeeper", "tryACOwork bookkeeper"],
  rows: [
    { label: "Salary or fee", inHouse: "$49,210 a year median", tryacowork: "ANNUAL_PRICE" },
    { label: "Payroll taxes and benefits", inHouse: "Roughly 20 to 30 percent on top", tryacowork: "Included" },
    { label: "Recruiting and onboarding cost", inHouse: "Your time, plus agency fees", tryacowork: "Included" },
    { label: "Equipment and desk", inHouse: "Yours to buy", tryacowork: "Included" },
    { label: "Paid time off and sick cover", inHouse: "Yours to absorb", tryacowork: "Covered by us" },
    { label: "If they leave", inHouse: "Start hiring again", tryacowork: "Free replacement" },
    { label: "Notice to end", inHouse: "Employment law applies", tryacowork: `${pricing.noticeDays} days` },
  ],
  source:
    "US median annual wage for bookkeeping, accounting and auditing clerks: $49,210, US Bureau of Labor Statistics, May 2024. Fully loaded cost of a US in-house bookkeeper is commonly estimated at $58,000 or more once payroll taxes, healthcare, retirement contributions, paid time off and equipment are counted. Your own costs will differ.",
} as const;

/* --- Section 9: Testimonials (7.1.10) ---------------------------- *
 * CLIENT TO SUPPLY. Only real, attributed quotes with written permission
 * may appear (spec 3.7). While this array is empty the whole section is
 * omitted from the page rather than filled with a placeholder.          */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  firm: string;
  state: string;
  /** Either the real photograph or no photograph at all. Never a stock one. */
  photo: string | null;
};

export const testimonialsHeading = "What firm owners say.";
export const testimonials: Testimonial[] = testimonialSettings.map((entry) => ({
  ...entry,
  photo: entry.photo?.trim() ? entry.photo : null,
}));

/* --- Section 10: FAQ (7.1.11) ------------------------------------ *
 * These ten questions are the objections that stop a booking. Phrased the
 * way people search, because this block carries FAQPage structured data. */

export const faqHeading = "The questions everyone asks.";

export const faqs = [
  {
    q: "How is this different from just hiring a freelancer?",
    a: "A freelancer works for several firms and disappears when a better offer arrives. Your tryACOwork bookkeeper is our full-time employee, works only for your firm, sits in our office under a team lead who checks their work, and is covered by our confidentiality agreements and our replacement guarantee. If they are unwell or on leave, we cover the work.",
  },
  {
    q: "What if the person is not right for us?",
    a: "Tell us and we replace them, at no cost, and we do not charge you for the ramp-up time on the replacement. That is why the process starts with you interviewing candidates yourself, and with a free 20-hour pilot on real work.",
  },
  {
    q: "Do I have to tell my clients?",
    a: "For bookkeeping work, the AICPA Code of Professional Conduct expects you to inform clients that a third-party service provider may be used, and to take reasonable steps to protect their confidential information. Most firms handle this with a single sentence in their engagement letter. We give you suggested wording on our security page, and your bookkeeper is bound by a confidentiality agreement that covers your clients directly. Note that tax return preparation has stricter rules: the regulations under IRC Section 7216 require signed client consent, in IRS-prescribed wording for individual Form 1040 returns, before tax return information goes to a preparer outside the United States - we do not prepare tax returns, so that rule does not apply to our bookkeeping work. Please confirm your own position with your professional adviser.",
  },
  {
    q: "What hours will they work?",
    // CO-17 change 2: this figure and the one in the price block's
    // not-included list are the same string, so they cannot disagree and their
    // markers cannot resolve independently.
    a: `You choose. The standard arrangement is an early Indian shift that overlaps your morning, roughly 7:00am to 11:00am Eastern, so you can talk to them at the start of your day and find the work finished when you arrive the next morning. Full US-hours coverage is available for ${usHoursPremiumRate} a month more per person.`,
  },
  {
    q: "How good is their English?",
    a: "Every person on our team is interviewed in English and works in English all day. You will judge for yourself - you interview the candidate by video before you hire them, and the pilot gives you two weeks of real written communication to assess.",
  },
  {
    q: "Who reviews the work?",
    a: "Two people. A senior team lead on our side checks the work before it reaches you, and then you review and sign off. The professional responsibility for the work your firm issues stays with your firm - we will never suggest otherwise, and any provider who does is telling you something that is not true.",
  },
  {
    q: "What is the minimum commitment?",
    a: `One month, and ${pricing.noticeDays} days notice to stop. There is no annual contract, no setup fee and no recruitment fee.`,
  },
  {
    q: "How long until someone is actually working?",
    a: "Usually 10 to 14 calendar days from the first call: two to three days to shortlist, your interviews, then a week of setup and practice on sample files that you do not pay for.",
  },
  {
    q: "Where exactly are you based?",
    a: `${site.officeCity}, India, in our own access-controlled office. We are happy to walk you through it on video, and you are welcome to visit.`,
  },
  {
    // Replaced by CO-17. The question stays phrased the way people search -
    // "do you do tax returns" is a real query - which is the whole reason this
    // block carries structured data. Do not lengthen it. The phrase "audit
    // support" MUST NOT appear here, in the structured data generated from it,
    // or in any anchor derived from it.
    q: "Do you do tax returns?",
    a: "No. We do not prepare or review tax returns of any kind. We will not sign off on anything either, or reach an accounting conclusion on your behalf - that is your firm’s work and it stays there. The full list of what we do not do is on our services page, and being clear about the edges is part of being good at the middle.",
  },
] as const;
