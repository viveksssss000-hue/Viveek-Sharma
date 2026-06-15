/**
 * content.ts - single source of truth for all site copy, navigation, services,
 * FAQs and metric placeholders.
 *
 * Repositioned to the "Flowline" brand identity (claude.ai/design handoff):
 * tryacowork is an AI-workflow studio for small teams. Voice: plain-spoken,
 * precise, never hyped. Outcomes, not tech. Lime is the action.
 *
 * Placeholders use TODO(client) markers and {{token}} metrics - never fabricate
 * testimonials, logos, certifications or numbers.
 */

export const site = {
  name: "tryacowork",
  legalName: "VSH Enterprise Pvt Ltd",
  domain: "tryacowork.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tryacowork.com",
  email: "hello@tryacowork.com",
  salesEmail: "sales@tryacowork.com",
  region: "Serving the US & EU",
  // TODO(client): confirm LinkedIn company URL.
  linkedin: "https://www.linkedin.com/company/tryacowork",
  tagline: "Workflows, automated.",
  // Google Calendar appointment schedule (embed form: /calendar/.../schedules/<id>?gv=true).
  // Bookings land directly in the founder's Google Calendar, which emails hello@tryacowork.com.
  bookingUrl:
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1zdGGsrpO1pWp_ujQx8OWLD35ksmAJ9ZkpdToOw8vtvF99MuZ8dRh9qkVy2e2NeRMq4UpIkV3W?gv=true",
} as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavLink = { label: string; href: string };

export const services = [
  {
    slug: "workflow-audit",
    title: "Workflow Audit",
    navLabel: "Workflow Audit",
    outcome: "Find out where your hours actually go.",
    problem:
      "Most teams can't say which tasks eat the most time - they just feel busy. Until you map the work, you can't automate the right things first.",
    capabilities: [
      "Time-mapping of your team's recurring work",
      "Repetitive, rules-based tasks identified and ranked by time saved",
      "A prioritised automation roadmap",
      "Clear scope before anything gets built",
    ],
    integrationsNote:
      "We audit the tools you already use - inbox, CRM, spreadsheets, accounting software and more. Nothing changes until you say so.",
    securityNote:
      "Audit access is read-only and least-privilege. Your data is never used to train AI models.",
    metaTitle: "Workflow Audit | tryacowork",
    metaDesc:
      "We map where your team's hours actually go and rank the repetitive work AI can take over - by time saved. Start with a workflow audit.",
    faqs: [
      {
        q: "What does the audit actually produce?",
        a: "A short, prioritised roadmap: which tasks to automate first, the hours each one gives back, and what the automated version looks like. No jargon, no 40-page deck.",
      },
      {
        q: "How much of our time does it take?",
        a: "A few conversations with the people who do the work, plus read-only access to the tools involved. Most of the mapping happens on our side.",
      },
      {
        q: "Do we have to commit to a build afterwards?",
        a: "No. The roadmap is yours either way. Most teams continue because the first workflow pays for itself, but there's no obligation.",
      },
    ],
  },
  {
    slug: "custom-ai-workflows",
    title: "Custom AI Workflows",
    navLabel: "Custom AI Workflows",
    outcome: "Your work, rebuilt to run on its own.",
    problem:
      "Off-the-shelf tools automate someone else's process, not yours. The tasks that really drain your week are specific to how your business runs.",
    capabilities: [
      "Agentic workflows tailored to your tools and your steps",
      "Workflows that read, decide and act on their own - continuously",
      "Human review on anything ambiguous or high-stakes",
      "Built against your real data, not a demo",
    ],
    integrationsNote:
      "Built around the tools you already use - your inbox, CRM, docs, spreadsheets and ledgers - not a new system to learn.",
    securityNote:
      "Your data is encrypted in transit and at rest, access is least-privilege, and we never train AI models on it.",
    metaTitle: "Custom AI Workflows | tryacowork",
    metaDesc:
      "We design and build agentic AI workflows tailored to your tools and your steps - the kind that read, decide and act on their own. Book a demo.",
    faqs: [
      {
        q: "What kinds of tasks can a workflow take over?",
        a: "Anything repetitive and rules-based: invoice processing, bookkeeping and reconciliation, lead routing, report generation, inbox triage, data entry between systems. If it follows steps, it can usually run on its own.",
      },
      {
        q: "What happens when the workflow isn't sure?",
        a: "It asks. Low-confidence or unusual cases are flagged to a human instead of guessed - so nothing important happens without the right oversight.",
      },
      {
        q: "Will we understand how it works?",
        a: "Yes. You get a plain-language walkthrough of what the workflow does, when it acts, and when it asks. It's a teammate, not a black box.",
      },
    ],
  },
  {
    slug: "integration-handoff",
    title: "Integration & Handoff",
    navLabel: "Integration & Handoff",
    outcome: "Connected to your tools. Handed over working.",
    problem:
      "An automation that lives outside your tools just creates another tab to check. It has to plug into where the work already happens.",
    capabilities: [
      "Connections to your CRM, inbox, docs and spreadsheets",
      "Tested end-to-end against your real tools",
      "A walkthrough, not a manual",
      "Your team trained on the new normal",
    ],
    integrationsNote:
      "We connect to the systems you already run on - your CRM, inbox, docs, spreadsheets and accounting tools like QuickBooks and Xero.",
    securityNote:
      "Integrations use scoped, revocable credentials - least-privilege by default.",
    metaTitle: "Integration & Handoff | tryacowork",
    metaDesc:
      "We connect your AI workflow to your CRM, inbox, docs and spreadsheets, then hand over something that just works - with a walkthrough, not a manual.",
    faqs: [
      {
        q: "Do we need our own developers for this?",
        a: "No. We build, connect and test everything, then walk your team through it. If you have developers, we're happy to hand off deeper documentation too.",
      },
      {
        q: "What if we change tools later?",
        a: "Workflows are built in clean, swappable pieces. If you move CRM or accounting software, we re-point the connection rather than rebuilding from scratch.",
      },
    ],
  },
  {
    slug: "continuous-optimization",
    title: "Continuous Optimization",
    navLabel: "Continuous Optimization",
    outcome: "It keeps getting sharper while you grow.",
    problem:
      "Automations drift: tools update, formats change, edge cases appear. Unwatched, a workflow quietly degrades - and you stop trusting it.",
    capabilities: [
      "Every workflow monitored for accuracy and drift",
      "Fixes shipped before you notice the problem",
      "Expansion into the next time-sink as you grow",
      "A simple retainer - no surprise invoices",
    ],
    integrationsNote:
      "Monitoring runs quietly alongside your tools - no extra dashboards for your team to babysit.",
    securityNote:
      "Monitoring sees workflow health, not your private content, wherever possible. Access stays least-privilege and auditable.",
    metaTitle: "Continuous Optimization | tryacowork",
    metaDesc:
      "On a simple retainer, we monitor every workflow, fix what drifts, and expand into the next time-sink as your business grows. Book a demo.",
    faqs: [
      {
        q: "What does the retainer cover?",
        a: "Monitoring, fixes, tuning, and a regular conversation about the next thing worth automating. We scope it to the number of live workflows you run.",
      },
      {
        q: "Can we run the workflows ourselves instead?",
        a: "Yes - handoff is always an option. Most teams keep the retainer because the workflows keep improving without anyone on their side having to think about it.",
      },
    ],
  },
] as const;

export type Service = (typeof services)[number];

export const mainNav: NavLink[] = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Results", href: "/results" },
  { label: "Security", href: "/security" },
  { label: "About", href: "/about" },
];

export const servicesNav: NavLink[] = services.map((s) => ({
  label: s.navLabel,
  href: `/services/${s.slug}`,
}));

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footer = {
  columns: [
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "Results", href: "/results" },
      ] as NavLink[],
    },
    {
      heading: "Services",
      links: servicesNav,
    },
    {
      heading: "Resources",
      links: [
        { label: "Security & Compliance", href: "/security" },
        { label: "FAQ", href: "/#faq" },
        // Blog is Phase 2 - link added once content exists.
      ] as NavLink[],
    },
    {
      heading: "Get started",
      links: [
        { label: "Book a Demo", href: "/book-a-demo" },
        { label: "Contact", href: "/contact" },
      ] as NavLink[],
    },
  ],
  utility: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ] as NavLink[],
} as const;

/* ------------------------------------------------------------------ */
/* Metrics - placeholders only. Never invent figures.                  */
/* Format follows the brand kit's proof section.                       */
/* ------------------------------------------------------------------ */

/*
 * Trust facts shown in the StatBar. These are true today (not client metrics),
 * so the bar is credible before named case-study numbers exist. Swap in real,
 * permissioned figures here once clients agree to be named.
 */
export const metrics = [
  { value: "End-to-end", label: "We design, build and run every workflow - not software you manage" },
  { value: "Human-in-the-loop", label: "Every workflow reviewed for accuracy - never a black box" },
  { value: "Never", label: "Your data is used to train AI models" },
] as const;

/* ------------------------------------------------------------------ */
/* Testimonials - placeholder state until client provides real, named  */
/* quotes. Empty array renders a tasteful empty state.                 */
/* ------------------------------------------------------------------ */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

// TODO(client): add real, named, permissioned testimonials. Do not fabricate.
export const testimonials: Testimonial[] = [];

/* ------------------------------------------------------------------ */
/* Home page copy - Flowline voice: plain-spoken, precise, never hyped */
/* ------------------------------------------------------------------ */

export const home = {
  meta: {
    title: "AI Workflow Automation for Small Teams | tryacowork",
    description:
      "tryacowork turns complex, manual work into AI workflows that run on their own - designed, built and run end-to-end for small teams. Book a demo.",
  },
  hero: {
    h1: "Workflows, automated.",
    sub: "We take the time-consuming, high-manpower tasks that slow your business down - and rebuild them as AI workflows that run continuously in the background. No jargon, no months-long projects. Just your work, automated.",
    primaryCta: "Book a Demo",
    secondaryCta: "See how it works",
    trustLine:
      "Built for small teams · Your data encrypted & never used to train AI models.",
  },
  problems: {
    heading: "Manual work is quietly costing you",
    cards: [
      {
        title: "Hours lost to busywork",
        body: "Re-keying data, copying between tools, chasing follow-ups - the same task, every day, by hand.",
      },
      {
        title: "Work that waits on people",
        body: "Handoffs stall when someone's busy, off, or buried. The task isn't hard - it's just stuck.",
      },
      {
        title: "Errors that slip through",
        body: "Manual repetition breeds mistakes, and mistakes cost more time than the task did.",
      },
      {
        title: "AI that feels too complex",
        body: "You know AI could help - but it feels too technical, too risky, or not built for a team your size.",
      },
    ],
  },
  servicesOverview: {
    heading: "Designed, built and run - end to end",
    description:
      "We don't hand you software and walk away. Every engagement moves through the same arc: find the time-sink, automate it, and keep it sharp. From bookkeeping and invoices to lead routing and reporting.",
  },
  security: {
    heading: "Built for people who'd rather not gamble",
    body: "Your data is encrypted in transit and at rest, access is tightly controlled, and we never train AI models on it. A human reviews the automation - it's a teammate, not a black box.",
    cta: "Read about our security",
  },
  results: {
    heading: "The numbers that matter to a busy owner",
    description:
      "Real, named results land here as our clients go live. We never publish numbers we can't stand behind.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* How It Works - Map → Design → Automate → Run & refine               */
/* ------------------------------------------------------------------ */

export const processSteps = [
  {
    number: "01",
    title: "Map",
    body: "We sit with your team and trace where the hours and friction really live.",
  },
  {
    number: "02",
    title: "Design",
    body: 'We blueprint the AI workflow that replaces it - and agree on what "done" looks like.',
  },
  {
    number: "03",
    title: "Automate",
    body: "We build, connect and test it against your real tools until it runs cleanly.",
  },
  {
    number: "04",
    title: "Run & refine",
    body: "It goes live and runs continuously. We watch, tune and expand it over time.",
  },
] as const;

export const howItWorks = {
  meta: {
    title: "How It Works - Four Steps to Autopilot | tryacowork",
    description:
      "Map, Design, Automate, Run & refine. Every project follows the same calm, legible path - you always know what's happening and what's next.",
  },
  h1: "Four steps from chaos to autopilot",
  intro:
    "Every project follows the same calm, legible path. You always know what's happening and what's next.",
  expectations: {
    heading: "What you can expect",
    points: [
      "Clear scope and expected time savings before any build begins.",
      "Data handling and access defined up front, in writing.",
      "A human reviewing the automation as it goes live - and after.",
    ],
  },
} as const;

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  meta: {
    title: "About - The AI Workflow Studio | tryacowork",
    description:
      "tryacowork is an AI-workflow studio for small teams. We design, build and run automations end-to-end - so a five-person team can operate like fifty.",
  },
  h1: "We turn complex, manual work into AI workflows that run on their own.",
  body: "tryacowork is an AI-workflow studio for small teams. We take the time-consuming, high-manpower tasks that slow a business down - and rebuild them as agentic AI workflows that run continuously in the background. We don't sell tools. We design, build and run the workflow end-to-end - and keep improving it.",
  values: [
    {
      title: "Clarity over cleverness",
      body: "If a sentence - or a workflow - needs decoding, we rewrite it. Short words, one idea at a time, systems you can actually follow.",
    },
    {
      title: "Outcome, not tech",
      body: 'We lead with the result: time saved, mistakes avoided. The "how" comes later, only if you ask.',
    },
    {
      title: "On your side",
      body: "We're the coworker, not the vendor. Helpful, patient, and honest about what's worth automating - and what isn't.",
    },
  ],
  whoWeServe: {
    heading: "Who it's for",
    items: [
      "Small-business leaders who know AI could help, but think it's too complex, too technical, or not for them.",
      "Teams drowning in repetitive work - bookkeeping, invoices, lead routing, reporting, inbox triage.",
      "Founders who want a five-person team to operate like a fifty-person one.",
    ],
  },
  team: [
    { name: "Sidharth Sharma", role: "Co-Founder & Marketing Head" },
    { name: "Vivek Sharma", role: "Co-Founder & Tech Head" },
    { name: "Priya Bansal", role: "HR & Operations Head" },
    { name: "Vipin Goyal", role: "Product Developer" },
    { name: "Harsh Naidu", role: "Product Developer" },
  ] as {
    name: string;
    role: string;
  }[],
} as const;

/* ------------------------------------------------------------------ */
/* Security & Compliance                                               */
/* ------------------------------------------------------------------ */

export const security = {
  meta: {
    title: "Security & Compliance | tryacowork",
    description:
      "How tryacowork protects your business data: encryption, least-privilege access, GDPR/CCPA alignment, DPA on request, and a no-training promise.",
  },
  h1: "Your data, protected.",
  intro:
    "Security isn't a footnote for us - it's the reason careful teams trust tryacowork with the work that touches their money, customers and inbox. Here's how we protect your data and keep you in control.",
  sections: [
    {
      title: "Data protection",
      body: "Your data is encrypted in transit and at rest, access follows least-privilege principles, and integrations are built to be secure by default.",
      bullets: [
        "Encryption in transit and at rest",
        "Least-privilege access controls",
        "Secure integrations with your existing tools",
      ],
    },
    {
      title: "Privacy & compliance",
      body: "We align with GDPR / UK GDPR and CCPA/CPRA. A Data Processing Agreement is available on request, we're transparent about sub-processors, and we offer EU data-residency options.",
      bullets: [
        "GDPR / UK GDPR and CCPA/CPRA aligned",
        "Data Processing Agreement available on request",
        "Sub-processor transparency",
        "EU data-residency options",
      ],
    },
    {
      title: "We don't train on your data",
      body: "Your business data is never used to train AI models - full stop.",
      bullets: [],
    },
    {
      title: "Human in the loop",
      body: "Automations are reviewed and controlled, with accuracy checks. Anything ambiguous is flagged to a person instead of guessed. It's a teammate, not a black box.",
      bullets: [],
    },
    {
      title: "Certifications & roadmap",
      body: "We're an early-stage studio and are not yet SOC 2 or ISO 27001 certified. We build to the practices those frameworks describe - encryption, least-privilege access, audit logging and human review - and we'll publish certifications here as we achieve them. Need specific assurances for your procurement process? Just ask.",
      bullets: [],
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Results                                                             */
/* ------------------------------------------------------------------ */

export const results = {
  meta: {
    title: "Results & Case Studies | tryacowork",
    description:
      "Real, named, permissioned results from tryacowork AI-workflow engagements. We never publish figures we can't stand behind. Book a demo.",
  },
  h1: "The numbers that matter to a busy owner",
  intro:
    "We publish real, named, permissioned results only. As our clients go live, their outcomes will appear here - never fabricated logos or quotes. Here's what we measure on every engagement, so the result is a number you can check, not a feeling.",
  measuresHeading: "What we measure",
  measures: [
    {
      metric: "Hours returned",
      body: "Time the workflow gives back each month, measured against the manual baseline we map in your audit.",
    },
    {
      metric: "Tasks run autonomously",
      body: "The share of the work the workflow completes on its own, without a person stepping in.",
    },
    {
      metric: "Time to first live workflow",
      body: "How quickly we go from first conversation to something running against your real tools.",
    },
    {
      metric: "Accuracy & exceptions",
      body: "We track corrections and flagged cases, so quality stays a number we can both see.",
    },
  ],
  examplesHeading: "Where the time comes back",
  examplesIntro:
    "These are the workflows we automate most often. Your audit pins down which ones give your team the biggest week back - and we report the result against the manual baseline we measure first.",
  examples: [
    {
      area: "Bookkeeping & reconciliation",
      outcome:
        "Transactions captured, categorised and matched automatically - books that stay current instead of piling up for month-end.",
    },
    {
      area: "Invoice & accounts payable",
      outcome:
        "Invoices read, matched to POs and queued for approval - no manual data entry, and duplicate or unusual bills flagged before they're paid.",
    },
    {
      area: "Lead routing & CRM hygiene",
      outcome:
        "New leads enriched, routed and logged the moment they land - nothing sits in an inbox going cold, and the CRM stays clean on its own.",
    },
    {
      area: "Reporting & dashboards",
      outcome:
        "The numbers pulled together on a schedule - the weekly report builds itself instead of eating someone's afternoon.",
    },
  ] as { area: string; outcome: string }[],
  // Real case studies (client/sector, problem, what we automated, quantified
  // result, optional quote) are added here as clients agree to be named.
  caseStudies: [] as {
    sector: string;
    problem: string;
    automated: string;
    result: string;
    quote?: string;
  }[],
} as const;

/* ------------------------------------------------------------------ */
/* Global FAQ - Home + reused                                          */
/* ------------------------------------------------------------------ */

export const globalFaqs = [
  {
    q: "What kinds of work can you automate?",
    a: "Anything repetitive and rules-based: bookkeeping and reconciliation, invoice processing, lead routing, report generation, inbox triage, data entry between systems. If it follows steps, it can usually run on its own.",
  },
  {
    q: "Will this work with the tools we already use?",
    a: "Yes - workflows are built around your existing inbox, CRM, docs, spreadsheets and accounting software (QuickBooks, Xero and similar), not a new system to learn.",
  },
  {
    q: "Do you train AI on our data?",
    a: "No. Your business data is never used to train AI models.",
  },
  {
    q: "Is AI too complex for a small team like ours?",
    a: "That's exactly who we build for. You don't manage models or prompts - you tell us which task eats your week, and we hand back the automated version. Start with one task, see it run, then add more.",
  },
  {
    q: "How long does it take to go live?",
    a: "It depends on scope, but every project follows the same four steps - Map, Design, Automate, Run & refine - so timelines and savings are clear up front.",
  },
  {
    q: "Is there a human checking the automations?",
    a: "Yes. Automations are reviewed and controlled with accuracy checks, and anything ambiguous is flagged to a person - a human in the loop, not a black box.",
  },
  {
    q: "What does it cost?",
    a: "We scope each engagement on a quick call, because the right workflows depend on how your business runs. Book a demo and we'll map two or three for you, live.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Book a Demo                                                         */
/* ------------------------------------------------------------------ */

export const bookDemo = {
  meta: {
    title: "Book a Demo | tryacowork",
    description:
      "Book a 30-minute demo. We'll map two or three workflows we can automate for you, live - no obligation, no credit card.",
  },
  h1: "Book a 30-minute demo",
  valueReminder:
    "Start with one task. We'll show you the automated version of it - and the hours it gives back. No obligation.",
  whatNext: {
    heading: "What happens next",
    points: [
      "Pick a time that works - you'll get a calendar invite with a video link.",
      "We'll ask a few quick questions about the work that eats your week.",
      "On the call, we map 2-3 workflows live and outline what going live looks like.",
    ],
  },
  reassurance: "No credit card. No pressure.",
} as const;

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  meta: {
    title: "Contact | tryacowork",
    description:
      "Questions about automating the work that slows your team down? Contact tryacowork - we typically reply the same business day.",
  },
  h1: "Let's automate something real.",
  intro:
    "Not quite ready to book a demo? Tell us about one task that eats your week and we'll get back to you - usually the same business day.",
  responseTime: "We typically reply within one business day.",
} as const;
