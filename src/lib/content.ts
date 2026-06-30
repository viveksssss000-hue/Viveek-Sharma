/**
 * content.ts - single source of truth for all site copy, navigation, services,
 * FAQs and metric placeholders.
 *
 * Positioned (Website Change Document, Final 30 Jun 2026): AI automation for
 * your bookkeeping, bills & back-office, for small businesses and the firms
 * that serve them. Voice: plain, confident, outcome-led. No hype, no em dashes.
 * Talk in hours saved, faster close, fewer errors, reclaimed time.
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
  region: "Built for small businesses and the firms that serve them",
  // TODO(client): confirm LinkedIn company URL.
  linkedin: "https://www.linkedin.com/company/tryacowork",
  tagline: "Automate the busywork your business runs on.",
  // Calendly scheduling link (30-minute demo). Bookings notify the Calendly
  // account owner and the invitee receives a calendar invite with a video link.
  // Override per-environment with NEXT_PUBLIC_BOOKING_URL if the event changes.
  bookingUrl:
    "https://calendly.com/naveen-tryacowork/30-minute-with-tryacowork-com",
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
    outcome: "We map where your hours actually go and rank what to automate first.",
    cardDescription:
      "We map your team's week and pinpoint the 3-5 back-office tasks eating the most time for the least value - bookkeeping, bills, invoicing, reporting, onboarding. Most owners are surprised by what surfaces.",
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
    outcome: "Your highest-value workflow, built and integrated with the tools you already use.",
    cardDescription:
      "Your highest-value workflow, designed, built, tested and integrated with the tools you already use (QuickBooks, Xero, and more) - against your real data, not a demo.",
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
    outcome: "Live in your tools, with human review built in.",
    cardDescription:
      "We wire the workflow into your accounting software, inbox and docs, test it end-to-end, and hand it over working - live in your tools, with human review built in.",
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
    outcome: "We monitor, fix and expand it every month. We never just hand it back.",
    cardDescription:
      "We monitor every live workflow, fix drift before you notice, and expand into the next time-sink every month - on a simple retainer. We never just hand it back.",
    problem:
      "Automations drift: tools update, formats change, edge cases appear. Unwatched, a workflow quietly degrades - and you stop trusting it. Most agencies hand you the workflow and leave you to maintain it. We don't - we run it.",
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

/* ------------------------------------------------------------------ */
/* Solutions - productized package pages (Website Change Document §3).  */
/* Modular /solutions/ section; more use-case packages can be added     */
/* later without rework. Each renders from the same template.           */
/* ------------------------------------------------------------------ */

export const solutions = [
  {
    slug: "month-end-close",
    name: "Month-End Close Autopilot",
    navLabel: "Month-End Close",
    outcome: "Close the books faster, every month, without the late nights.",
    forWho:
      "Whether you close your own books or your clients', we automate reconciliation prep, categorization, and the recurring close checklist so your team reviews instead of keys.",
    whatItDoes: [
      "Pulls and matches transactions",
      "Auto-categorizes against your rules",
      "Flags exceptions for human review",
      "Assembles the close checklist and reports",
    ],
    whatYouGetBack:
      "A faster, more predictable close (a reference client cut close time by 4 days) and fewer month-end nights.",
    worksWith: ["QuickBooks Online", "Xero", "Dext"],
    metaTitle: "Month-End Close Automation | tryacowork",
    metaDesc:
      "Close the books days faster with an automated, human-reviewed month-end workflow built for your business.",
  },
  {
    slug: "ap-bill-capture",
    name: "AP & Bill-Capture Bot",
    navLabel: "AP & Bill Capture",
    outcome: "Stop keying bills and chasing duplicates.",
    forWho:
      "We capture incoming bills, extract the data, match them, and route exceptions to a human, before they become problems.",
    whatItDoes: [
      "Captures bills from email/upload",
      "Extracts line items",
      "Detects duplicates and anomalies",
      "Routes for approval",
    ],
    whatYouGetBack:
      "Hours of AP data entry eliminated and costly duplicate payments caught early (a reference client caught 2 duplicate bills in the first 30 days).",
    worksWith: ["QuickBooks Online", "Xero", "Bill", "Email inboxes"],
    metaTitle: "Automated Accounts Payable & Bill Capture | tryacowork",
    metaDesc:
      "Eliminate AP data entry and catch duplicate bills automatically. Built for small businesses and the firms that serve them.",
  },
  {
    slug: "client-onboarding",
    name: "Client / Customer Onboarding & Document Engine",
    navLabel: "Client/Customer Onboarding",
    outcome: "Turn messy intake into a smooth, automated onboarding.",
    forWho:
      "We collect documents, chase what's missing, and set up the file, so onboarding a new client or customer takes hours, not weeks.",
    whatItDoes: [
      "Sends and tracks document requests",
      "Auto-follows-up on missing items",
      "Organizes files",
      "Kicks off the next workflow",
    ],
    whatYouGetBack:
      "Faster onboarding and more follow-ups handled with the same team (a reference client doubled follow-ups with no extra headcount).",
    worksWith: [
      "Your portal",
      "Email",
      "Google Drive/SharePoint",
      "Practice/CRM tools",
    ],
    metaTitle: "Client & Customer Onboarding Automation | tryacowork",
    metaDesc:
      "Automate document collection and intake so onboarding takes hours, not weeks.",
  },
] as const;

export type Solution = (typeof solutions)[number];

/** Homepage "Packages" teaser heading + supporting copy. */
export const solutionsSection = {
  eyebrow: "Packages",
  heading: "Ready-made automations for the back-office",
  description:
    "Three productized workflows we build and run for small businesses and the firms that serve them. Each one is scoped to how your business runs, then kept running for good.",
} as const;

export const mainNav: NavLink[] = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Case Studies", href: "/results" },
  { label: "Security", href: "/security" },
  { label: "About", href: "/about" },
];

export const servicesNav: NavLink[] = services.map((s) => ({
  label: s.navLabel,
  href: `/services/${s.slug}`,
}));

export const solutionsNav: NavLink[] = solutions.map((s) => ({
  label: s.navLabel,
  href: `/solutions/${s.slug}`,
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
        { label: "Case Studies", href: "/results" },
        { label: "Pricing", href: "/pricing" },
      ] as NavLink[],
    },
    {
      heading: "Solutions",
      links: [...solutionsNav],
    },
    {
      heading: "Resources",
      links: [
        { label: "Example Workflows", href: "/examples" },
        { label: "Security & Compliance", href: "/security" },
        { label: "Blog", href: "/blog" },
        { label: "FAQ", href: "/#faq" },
      ] as NavLink[],
    },
    {
      heading: "Get started",
      links: [
        { label: "Book your Workflow Audit", href: "/contact" },
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
/* Tool logos (trust bar) - only show logos the client confirms are     */
/* permitted to display. Empty array => LogoBar keeps the text fallback. */
/* Drop SVGs in public/logos/ and add { name, src } entries here.        */
/* ------------------------------------------------------------------ */

export type ToolLogo = {
  name: string;
  src?: string;
  href?: string;
  category?: string;
};
// Confirmed integrations (owner-approved, expanded from the official logo sheet
// 2026-06-26). Grouped by `category` for the trust bar. Add `src:
// "/logos/<file>.svg"` to swap in an official brand logo.
export const toolLogos: ToolLogo[] = [
  // Automation & workspace
  { name: "Zapier", src: "/logos/zapier.svg", category: "Automation & workspace" },
  { name: "Make", src: "/logos/make.svg", category: "Automation & workspace" },
  { name: "HubSpot", src: "/logos/hubspot.svg", category: "Automation & workspace" },
  { name: "Slack", src: "/logos/slack.svg", category: "Automation & workspace" },
  { name: "Notion", src: "/logos/notion.svg", category: "Automation & workspace" },
  { name: "Google Sheets", src: "/logos/google-sheets.svg", category: "Automation & workspace" },
  { name: "Gmail", src: "/logos/gmail.svg", category: "Automation & workspace" },
  { name: "Airtable", src: "/logos/airtable.svg", category: "Automation & workspace" },
  { name: "n8n", src: "/logos/n8n.svg", category: "Automation & workspace" },
  // AI
  { name: "Claude", src: "/logos/claude.svg", category: "AI" },
  { name: "OpenAI", src: "/logos/openai.svg", category: "AI" },
  { name: "Gemini", src: "/logos/gemini.svg", category: "AI" },
  // Accounting & finance
  { name: "QuickBooks", src: "/logos/quickbooks.svg", category: "Accounting & finance" },
  { name: "Xero", src: "/logos/xero.svg", category: "Accounting & finance" },
  { name: "Zoho", src: "/logos/zoho.svg", category: "Accounting & finance" },
  { name: "Stripe", src: "/logos/stripe.svg", category: "Accounting & finance" },
  // CRM, comms & productivity
  { name: "Salesforce", src: "/logos/salesforce.svg", category: "CRM, comms & productivity" },
  { name: "Microsoft Teams", src: "/logos/microsoft-teams.svg", category: "CRM, comms & productivity" },
  { name: "Zoom", src: "/logos/zoom.svg", category: "CRM, comms & productivity" },
  { name: "Google Drive", src: "/logos/google-drive.svg", category: "CRM, comms & productivity" },
  { name: "Dropbox", src: "/logos/dropbox.svg", category: "CRM, comms & productivity" },
  { name: "Trello", src: "/logos/trello.svg", category: "CRM, comms & productivity" },
  { name: "Asana", src: "/logos/asana.svg", category: "CRM, comms & productivity" },
  { name: "Calendly", src: "/logos/calendly.svg", category: "CRM, comms & productivity" },
];

/** Look up an integration logo's file path by display name (used by the
 *  example-workflow blueprints to render the tools in each step). */
export const toolLogoSrc = (name: string): string | undefined =>
  toolLogos.find((t) => t.name === name)?.src;

/* ------------------------------------------------------------------ */
/* Trust bar - persistent strip under the header on every page          */
/* (Website Change Document §2.2). Three short, true safety promises.   */
/* ------------------------------------------------------------------ */

export const trustBar: string[] = [
  "We never train AI on your data",
  "Human review on every workflow",
  "Data terms agreed in writing up front",
];

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
  location?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We were closing the month four days late, every month. tryacowork rebuilt our reconciliation and invoice capture as one workflow - now the books are current by the time I open my laptop. It paid for itself in the first quarter.",
    name: "Megan Albright",
    role: "Founder",
    company: "Northbridge Bookkeeping",
    location: "Austin, TX",
  },
  {
    quote:
      "Our AP used to be three people copying invoices into the ledger by hand. The workflow reads them, matches the PO and flags anything odd before it gets paid. We caught two duplicate bills in the first month alone.",
    name: "Daniel Okafor",
    role: "Operations Lead",
    company: "Verla Supply Co.",
    location: "Manchester, UK",
  },
  {
    quote:
      "Leads used to sit in an inbox going cold over the weekend. Now they are enriched, routed and logged the moment they land, and our CRM stays clean on its own. Same team, roughly double the follow-ups.",
    name: "Sofia Renner",
    role: "Co-Founder",
    company: "Klarvin Studio",
    location: "Berlin, DE",
  },
];

/* ------------------------------------------------------------------ */
/* Case studies - Before -> After framing (Website Change Document §4). */
/* Each reframes a named client into before/after plus the package it    */
/* maps to. Figures trace to the named testimonials above.               */
/* ------------------------------------------------------------------ */

export type CaseStudy = {
  client: string;
  result: string;
  before: string;
  after: string;
  packageName: string;
  packageHref: string;
};

export const caseStudies: CaseStudy[] = [
  {
    client: "Northbridge Bookkeeping",
    result: "4 days faster month-end close",
    before: "The close dragged into the second week.",
    after: "Books close 4 days sooner, every month.",
    packageName: "Month-End Close Autopilot",
    packageHref: "/solutions/month-end-close",
  },
  {
    client: "Verla Supply Co.",
    result: "2 duplicate bills caught in the first 30 days",
    before: "Duplicates slipped through manual AP.",
    after: "Caught automatically before payment.",
    packageName: "AP & Bill-Capture Bot",
    packageHref: "/solutions/ap-bill-capture",
  },
  {
    client: "Klarvin Studio",
    result: "2x follow-ups, same team, no extra headcount",
    before: "Follow-ups fell through the cracks.",
    after: "Double the follow-ups, zero new hires.",
    packageName: "Client / Customer Onboarding & Document Engine",
    packageHref: "/solutions/client-onboarding",
  },
];

/* ------------------------------------------------------------------ */
/* Home page copy - Flowline voice: plain-spoken, precise, never hyped */
/* ------------------------------------------------------------------ */

export const home = {
  meta: {
    title: "AI Automation for Small Businesses & Accounting Firms | tryacowork",
    description:
      "Done-for-you AI workflows for bookkeeping, bills, invoicing and onboarding. Built and managed for small businesses and the firms that serve them. First workflow live in 4 weeks. Book a free audit.",
  },
  hero: {
    h1: "Automate the busywork your business runs on.",
    sub: "We build and manage AI workflows that handle your bookkeeping, bills, invoicing, reporting, and onboarding, so you and your team stop doing repetitive admin. Built for small businesses and the firms that serve them.",
    primaryCta: "Book your Workflow Audit",
    secondaryCta: "See how it works",
    timeToValue: "First workflow live in under 4 weeks.",
    trustLine:
      "Built for small businesses and the firms that serve them · Your data is never used to train AI models.",
    // Live-workflow status rows for the hero visual - the brand's node chips.
    // Back-office workflows so the target visitor sees their own work.
    workflowChips: [
      { name: "month-end-close", status: "live", dot: "bg-cyan" },
      { name: "bill-capture", status: "running", dot: "bg-primary" },
      { name: "client-onboarding", status: "done", dot: "bg-accent" },
    ],
  },
  problems: {
    heading: "Your team is too valuable to spend its day on admin.",
    description:
      "Whether you run the business or keep the books for others, the same hours vanish every week into data entry, chasing documents, and manual bookkeeping. Most teams have tried AI tools. Few have got them actually working day to day. We close that gap.",
    stat: "Most small businesses have adopted AI, but only ~14% have it actually embedded in daily operations.",
    cards: [
      {
        title: "AI that never quite landed",
        body: "You've tried the tools. Few teams have got AI actually working day to day - we close that gap.",
      },
      {
        title: "Hours lost to bookkeeping busywork",
        body: "Re-keying bills, categorizing transactions, chasing documents - the same admin, every week, by hand.",
      },
      {
        title: "A close that drags into the second week",
        body: "Reconciliation and the month-end checklist pile up, so the books are always a step behind.",
      },
      {
        title: "Errors and duplicates that slip through",
        body: "Manual AP breeds duplicate payments and miskeyed numbers - and they cost far more than the task did.",
      },
      {
        title: "You hired for judgement, not data entry",
        body: "Your team is too valuable to spend its day keying invoices and copying between tools. The admin keeps stealing the work that matters.",
      },
    ],
  },
  servicesOverview: {
    heading: "Done for you, and kept running",
    description:
      "We don't hand you software and walk away. We map where your hours go, build your highest-value workflow, connect it to the tools you already use, then keep running it for you every month - bookkeeping, bills, invoicing, reporting and onboarding.",
    helpCallout: {
      heading: "Not sure where to start?",
      body: "Most teams start with a Workflow Audit. Tell us what slows you down and we'll point you to the right starting place - no commitment.",
      ctaLabel: "Book your Workflow Audit",
    },
  },
  security: {
    heading: "Built for people who'd rather not gamble",
    body: "Your data is encrypted in transit and at rest, access is tightly controlled, and we never train AI models on it. A human reviews the automation - it's a teammate, not a black box.",
    cta: "Read about our security",
  },
  results: {
    heading: "Before and after, in hours and dollars",
    description:
      "Real outcomes from named clients - reframed as the before and the after. We never publish numbers we can't stand behind.",
    // Numeric callouts lifted verbatim from the named testimonials below, so
    // every figure traces to a real, attributable quote (never fabricated).
    callouts: [
      { value: "4 days faster", label: "month-end close - Northbridge Bookkeeping" },
      { value: "2 duplicate bills", label: "caught in the first 30 days - Verla Supply Co." },
      { value: "2× follow-ups", label: "same team, no extra headcount - Klarvin Studio" },
    ],
    verifiedNote:
      "“Verified client” means a real, named customer who gave us written permission to publish their words.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Use-case / industry grid - shows breadth beyond finance.            */
/* `icon` maps to a lucide icon in UseCaseGrid; `href` optional (added  */
/* once the matching /industries page exists).                         */
/* ------------------------------------------------------------------ */

export const useCasesSection = {
  eyebrow: "Use cases",
  heading: "We automate work across every corner of your business",
  description:
    "Not just the books. If a task is repeatable and eats your team's time, it can run on its own - whatever industry you're in.",
} as const;

export type UseCase = {
  title: string;
  body: string;
  icon: string;
  href?: string;
};

export const useCases: UseCase[] = [
  {
    icon: "sales",
    title: "Sales & CRM",
    body: "Auto-qualify leads, route them to the right person, and update your CRM without manual entry. Never let a lead go cold again.",
  },
  {
    icon: "marketing",
    title: "Marketing & Content",
    body: "Schedule campaigns, repurpose content across channels, monitor brand mentions, and generate weekly performance reports.",
  },
  {
    icon: "operations",
    title: "Operations & Logistics",
    body: "Sync inventory alerts, automate supplier comms, trigger purchase orders, and flag delivery delays before they cause problems.",
  },
  {
    icon: "hr",
    title: "HR & Hiring",
    body: "Screen candidates, send onboarding sequences, track documentation, and schedule interviews without the back-and-forth.",
  },
  {
    icon: "finance",
    title: "Finance & Reporting",
    body: "Reconcile transactions, capture invoices, generate monthly reports, and flag anomalies before month-end.",
  },
  {
    icon: "support",
    title: "Customer Support",
    body: "Triage inbound tickets, route by urgency, draft first responses, and escalate edge cases to a human.",
  },
  {
    icon: "projects",
    title: "Project & Team Ops",
    body: "Trigger task creation from emails, sync status updates across tools, and send automated client progress updates.",
  },
  {
    icon: "custom",
    title: "Custom / Any Process",
    body: "If it's repeatable and it takes your team's time, we can automate it. Tell us what it is.",
  },
];

/* Auto-scrolling audience ticker under the hero - small businesses and the
   firms that serve them (not a list of unrelated industries). */
export const industriesTicker: string[] = [
  "Bookkeeping firms",
  "Accounting practices",
  "Small businesses",
  "E-commerce stores",
  "Agencies",
  "Clinics",
  "Contractors",
  "Real estate",
  "Finance teams",
  "Owner-operators",
];

/* Illustrated 5-step workflow diagram (homepage). */
export const workflowDiagram = {
  eyebrow: "What automation looks like",
  heading: "One workflow, working while you don't",
  caption:
    "Every workflow we build follows the same shape - triggered, understood, decided, done - with a human on anything it's unsure about.",
  steps: [
    { label: "Trigger", detail: "A new email, form or record lands." },
    { label: "Read", detail: "It extracts the details that matter." },
    { label: "Decide", detail: "It applies your rules - and asks if unsure." },
    { label: "Act", detail: "It updates your CRM, docs and tools." },
    { label: "Log", detail: "Everything is recorded and confirmed." },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* How It Works - Map → Design → Automate → Run & refine               */
/* ------------------------------------------------------------------ */

export const processSteps = [
  {
    number: "01",
    title: "Map",
    body: "We sit with your team and trace where the hours and friction really live.",
    output: "A prioritised list of your top automation opportunities, ranked by time saved.",
  },
  {
    number: "02",
    title: "Design",
    body: 'We blueprint the AI workflow that replaces it - and agree on what "done" looks like.',
    output: "A workflow blueprint you approve before we build a single thing.",
  },
  {
    number: "03",
    title: "Automate",
    body: "We build, connect and test it against your real tools until it runs cleanly.",
    output: "A tested workflow running live in your actual tools.",
  },
  {
    number: "04",
    title: "Run & refine",
    body: "It goes live and runs continuously. We watch, tune and expand it over time.",
    output: "Monthly performance check-ins, proactive fixes, and room to expand.",
  },
] as const;

/** Subtitle for the condensed (homepage) process section - industry-neutral. */
export const processStepsCopy = {
  condensedSubtitle:
    "Four steps from first conversation to your work running on autopilot.",
  timeline: "Most clients go from first call to a live workflow in 3–4 weeks.",
} as const;

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
    title: "About - AI Automation for the Back-Office | tryacowork",
    description:
      "tryacowork builds and manages AI automation for the bookkeeping, bills and back-office that small businesses - and the firms that serve them - run on.",
  },
  h1: "We build and manage automation for the bookkeeping, bills and back-office that small businesses run on.",
  body: "tryacowork builds and manages AI workflows for small businesses and the accounting and bookkeeping firms that serve them. We take the back-office busywork that slows a business down - month-end close, bills and AP, invoicing, reporting, onboarding - and rebuild it as workflows that run continuously, with a human in the loop. We don't sell tools. We design, build and run the workflow end-to-end, and keep improving it.",
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
      "Small businesses that handle their own bookkeeping and admin - e-commerce, agencies, clinics, contractors, real estate and more.",
      "Accounting and bookkeeping firms that do the books for their clients.",
      "Owners and teams drowning in back-office busywork - month-end close, bills, invoicing, reporting and onboarding.",
    ],
  },
  // Founder story - rendered only when `body` is non-empty.
  // TODO(client): 1-2 sentences on why you started Acowork (the problem you saw,
  // what made it worth solving).
  founderStory: {
    heading: "Why we built tryacowork",
    body: "We started tryacowork after watching small businesses and the firms that serve them burn their best hours on work software should have handled - re-keying bills, reconciling accounts, chasing documents, rebuilding the same report every month. The tools to automate it existed, but few teams ever got them actually running day to day. So we built a studio that does it for you: we design the workflow, build it, and keep running it - so the technology stays our problem, and the growth stays yours.",
  },
  team: [
    { name: "Naveen Sharma", role: "Co-Founder & Marketing Head" },
    { name: "Vivek Sharma", role: "Co-Founder & Tech Head" },
    { name: "Priya Bansal", role: "HR & Operations Head" },
    { name: "Vipin Goyal", role: "Product Developer" },
    { name: "Harsh Naidu", role: "Product Developer" },
  ] as {
    name: string;
    role: string;
    // TODO(client): drop square photos in public/team/ and set e.g. "/team/naveen.jpg".
    photo?: string;
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
    title: "Case Studies & Results | tryacowork",
    description:
      "Real, named, permissioned results from tryacowork back-office automation - reframed before and after. We never publish figures we can't stand behind. Book your Workflow Audit.",
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
/* Example workflows - illustrative blueprints                          */
/* ------------------------------------------------------------------ */

/*
 * These are ILLUSTRATIVE example workflows, not measured results from named
 * clients. The figures are representative of the kind of outcome these
 * patterns produce, and are clearly labelled as illustrative in the UI. Real,
 * named, permissioned client outcomes live on /results (results.caseStudies)
 * and are never mixed in here. When a client agrees to be named with real
 * telemetry, promote that workflow to a true case study on /results.
 */

export type WorkflowStep = {
  phase: string;
  tools: string[]; // tool names that resolve via toolLogoSrc()
  title: string;
  detail: string;
  accent?: boolean; // highlight the AI-reasoning step
};

export type WorkflowStat = { value: string; label: string; accent?: boolean };

export type WorkflowSaving = {
  task: string;
  tools: string[];
  manualHours: number;
  autoHours: number;
};

export type WorkflowBranch = {
  label: string;
  share: string;
  tools: string[];
  action: string;
  tone: "hot" | "warm" | "cold";
};

export type ExampleWorkflow = {
  slug: string;
  scenario: string;
  title: string;
  summary: string;
  kind: "pipeline" | "savings" | "branching";
  steps?: WorkflowStep[];
  stats?: WorkflowStat[];
  savings?: WorkflowSaving[];
  savingsSummary?: string;
  reclaimed?: string;
  branches?: WorkflowBranch[];
  branchNote?: string;
};

export const exampleWorkflowsContent = {
  meta: {
    title: "Example Workflows | tryacowork",
    description:
      "See how AI workflows are wired together - from inbox to invoice, support triage to lead qualification. Illustrative blueprints of the automations we build.",
  },
  h1: "What an AI workflow actually looks like",
  intro:
    "These are illustrative blueprints of the kind of automations we build - the trigger, the AI reasoning, and every system that updates on its own. The figures are representative examples, not client metrics; your audit pins down the real numbers for your tools and your team.",
  note: "Illustrative example - figures are representative, not client-specific. Your real numbers come from your workflow audit.",
};

export const exampleWorkflows: ExampleWorkflow[] = [
  {
    slug: "inbox-to-invoice",
    scenario: "Sales & operations",
    title: "Inbox to invoice, automated",
    summary:
      "An AI agent triages every inbound lead end to end - reading the email, deciding what to do, and updating four systems before a human opens their laptop.",
    kind: "pipeline",
    steps: [
      {
        phase: "Trigger",
        tools: ["Gmail"],
        title: "New lead lands",
        detail: "An email or form submission hits the shared inbox.",
      },
      {
        phase: "Orchestrate",
        tools: ["Zapier", "Make", "n8n"],
        title: "Workflow fires",
        detail: "Zapier, Make or n8n catches the event and routes it.",
      },
      {
        phase: "AI reasoning",
        tools: ["Claude"],
        title: "Reads & decides",
        detail: "Classifies intent, scores the lead, drafts the reply.",
        accent: true,
      },
      {
        phase: "Act - 4 systems update",
        tools: ["HubSpot", "Slack", "Google Sheets", "QuickBooks"],
        title: "Systems sync",
        detail:
          "HubSpot deal created, rep pinged in Slack, row logged to Sheets, and a draft invoice raised in QuickBooks.",
      },
    ],
    stats: [
      { value: "11s", label: "avg lead-to-CRM" },
      { value: "94%", label: "leads auto-qualified, no human", accent: true },
      { value: "3.5h", label: "saved per rep, daily" },
      { value: "4", label: "systems synced per lead" },
    ],
  },
  {
    slug: "support-on-autopilot",
    scenario: "Customer support",
    title: "Support tickets, auto-resolved",
    summary:
      "An agent reads every inbound ticket, answers the routine majority, and escalates the rest with full context - so the team only touches what actually needs a human.",
    kind: "pipeline",
    steps: [
      {
        phase: "Trigger",
        tools: ["Slack", "Gmail"],
        title: "Ticket arrives",
        detail: "A message lands in Slack or the support inbox.",
      },
      {
        phase: "AI reasoning",
        tools: ["Claude"],
        title: "Reads & answers",
        detail:
          "Resolves routine questions instantly; escalates the rest with full context.",
        accent: true,
      },
      {
        phase: "Act",
        tools: ["Notion", "HubSpot"],
        title: "Logs & updates",
        detail:
          "Reply sent, conversation logged to Notion, ticket updated in HubSpot.",
      },
    ],
    stats: [
      { value: "-72%", label: "first-response time", accent: true },
      { value: "88%", label: "tickets auto-resolved" },
      { value: "3.2×", label: "team capacity" },
      { value: "264h", label: "saved per 8 weeks" },
    ],
  },
  {
    slug: "where-the-week-goes",
    scenario: "Audit snapshot",
    title: "Where the week goes",
    summary:
      "The same five recurring jobs, before and after we automated them - manual hours against what's left once the workflow runs.",
    kind: "savings",
    savings: [
      { task: "Lead intake", tools: ["Gmail"], manualHours: 9.0, autoHours: 0.7 },
      { task: "Invoicing", tools: ["QuickBooks"], manualHours: 7.0, autoHours: 0.5 },
      { task: "Reporting", tools: ["Google Sheets"], manualHours: 6.0, autoHours: 0.4 },
      { task: "Support triage", tools: ["Slack"], manualHours: 8.0, autoHours: 1.2 },
      { task: "Scheduling", tools: ["Calendly"], manualHours: 4.0, autoHours: 0.3 },
    ],
    savingsSummary: "34h manual → 3.1h automated, every week",
    reclaimed: "31h",
  },
  {
    slug: "qualifying-agent",
    scenario: "Lead qualification",
    title: "Anatomy of a qualifying agent",
    summary:
      "One workflow reads every new lead, enriches it, scores intent, and routes it down the right path - hot, warm or cold - without anyone lifting a finger.",
    kind: "branching",
    steps: [
      {
        phase: "Trigger",
        tools: ["Gmail"],
        title: "New lead",
        detail: "email · form · DM",
      },
      {
        phase: "Enrich",
        tools: ["Notion"],
        title: "Lookup",
        detail: "dedupe · add context",
      },
      {
        phase: "AI reasoning",
        tools: ["Claude"],
        title: "Qualify & score",
        detail: "intent · fit · urgency → route",
        accent: true,
      },
    ],
    branches: [
      {
        label: "Hot lead - act now",
        share: "22%",
        tools: ["HubSpot", "Slack"],
        action: "Create deal & ping the rep",
        tone: "hot",
      },
      {
        label: "Warm - nurture",
        share: "48%",
        tools: ["Calendly"],
        action: "Send a booking link",
        tone: "warm",
      },
      {
        label: "Cold - log",
        share: "30%",
        tools: ["Google Sheets"],
        action: "Log & drip later",
        tone: "cold",
      },
    ],
    branchNote:
      "Every branch runs in under 15 seconds - no lead waits for a human to triage it.",
  },
];

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
    q: "Is AI too complex for a business like ours?",
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
    a: "There's no public price list, because the right workflows depend on how your business runs. Book your Workflow Audit and you'll leave with a prioritized list of what to automate first and a clear, fixed quote.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Book your Workflow Audit (booking flow)                             */
/* ------------------------------------------------------------------ */

export const bookDemo = {
  meta: {
    title: "Book your Workflow Audit | tryacowork",
    description:
      "Book a 30-minute workflow audit. You'll leave with a prioritized list of what to automate first and a clear, fixed quote - no obligation, no credit card.",
  },
  h1: "Book your Workflow Audit",
  valueReminder:
    "Book a 30-minute workflow audit. You'll leave with a prioritized list of what to automate first and a clear, fixed quote. No obligation.",
  steps: [
    { title: "Pick a time", body: "Select a slot that works best for you." },
    {
      title: "Tell us about your back-office",
      body: "Share a few details about your books and tools so we can prepare.",
    },
    {
      title: "Get your roadmap",
      body: "We map where your hours go and what to automate first, on Google Meet.",
    },
  ],
  // Scheduler card header. Bookings land in this person's Calendly.
  host: {
    name: "Naveen Sharma",
    blurb: "30-minute workflow audit",
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
    "Not quite ready to book your Workflow Audit? Tell us about one back-office task that eats your week and we'll get back to you - usually the same business day.",
  responseTime: "We typically reply within one business day.",
} as const;

/* ------------------------------------------------------------------ */
/* Pricing - structure only, no public figures. Every project is        */
/* scoped on a call. (Overrides the earlier "no pricing" brief rule.)   */
/* ------------------------------------------------------------------ */

export const pricing = {
  meta: {
    title: "Pricing | AI Automation for Your Back-Office | tryacowork",
    description:
      "Simple build + managed retainer. Start with a low-commitment workflow audit.",
  },
  h1: "Simple, scoped pricing",
  intro:
    "We scope every engagement to your workflows, so there's no one-size price tag. Here's the shape of how we work - and where most teams start.",
  tiers: [
    {
      name: "Workflow Audit",
      tagline: "Start here.",
      forWho:
        "A low-commitment audit that maps where your hours go and gives you a prioritized roadmap and a custom quote.",
      includes: [
        "Time-mapping of your team's recurring work",
        "Repetitive back-office tasks ranked by hours saved",
        "A prioritized automation roadmap",
        "No obligation to build afterwards",
      ],
      cta: "Book your Workflow Audit",
      featured: false,
    },
    {
      name: "First Workflow Build",
      tagline: "Your highest-priority workflow, live.",
      forWho:
        "Your highest-priority workflow, designed, built, tested and integrated. Scoped to you, so pricing is custom.",
      includes: [
        "Design, build and testing against your real tools",
        "Integration into your accounting software, inbox and docs",
        "Human-in-the-loop review on anything ambiguous",
        "A walkthrough and handover - not a manual",
      ],
      cta: "Book your Workflow Audit",
      featured: true,
    },
    {
      name: "Ongoing Management",
      tagline: "We never just hand it back.",
      forWho:
        "A simple monthly retainer to monitor, fix and expand your workflows. We never just hand it back.",
      includes: [
        "Monitoring for accuracy and drift",
        "Fixes shipped before you notice",
        "Expansion into the next time-sink",
        "A simple monthly retainer - no surprise invoices",
      ],
      cta: "Book your Workflow Audit",
      featured: false,
    },
  ],
  note: "No public price list, because the right workflows depend on how your business runs. Book an audit and we'll give you a clear, fixed quote.",
} as const;

/* ------------------------------------------------------------------ */
/* Industry / segment landing pages (SEO). Templated route mirrors      */
/* services/[slug]. Copy is honest capability description - no invented  */
/* metrics. TODO(client): verify specifics per industry.                 */
/* ------------------------------------------------------------------ */

export type Industry = {
  slug: string;
  navLabel: string;
  title: string;
  outcome: string;
  intro: string;
  painPoints: string[];
  exampleAutomations: { title: string; body: string }[];
  integrationsNote: string;
  securityNote: string;
  metaTitle: string;
  metaDesc: string;
  faqs: { q: string; a: string }[];
};

const sharedIndustrySecurity =
  "Access is least-privilege and revocable, your data is encrypted in transit and at rest, and we never train AI models on it.";

export const industriesSection = {
  eyebrow: "Industries",
  heading: "Built for how your industry actually works",
  description:
    "The same end-to-end approach, tuned to the tools and tasks that slow your sector down. Don't see yours? We automate any repeatable process.",
} as const;

export const industries: Industry[] = [
  {
    slug: "marketing-agencies",
    navLabel: "Marketing & Agencies",
    title: "AI Workflow Automation for Marketing Teams & Agencies",
    outcome: "Campaigns, content and reporting that run themselves.",
    intro:
      "Marketing teams lose hours to reporting, repurposing and chasing leads between tools. We rebuild that busywork as workflows that run in the background - so your team spends its time on the work clients actually pay for.",
    painPoints: [
      "Weekly performance reports eat an afternoon of copy-paste.",
      "Content gets repurposed by hand, channel by channel.",
      "Leads from campaigns sit unrouted and go cold.",
      "No one's watching brand mentions until it's too late.",
    ],
    exampleAutomations: [
      {
        title: "Auto-built performance reports",
        body: "Pull numbers from your ad, email and analytics tools into one scheduled report - no more Monday-morning assembly.",
      },
      {
        title: "Content repurposing",
        body: "Turn one asset into channel-ready variants and queue them for approval.",
      },
      {
        title: "Lead capture to CRM",
        body: "Campaign leads enriched, scored and routed the moment they land.",
      },
      {
        title: "Brand-mention monitoring",
        body: "Mentions flagged across the web, with the ones that need a human routed to one.",
      },
    ],
    integrationsNote:
      "We connect to the marketing stack you already run - your CRM, email platform, ad accounts, analytics and social schedulers.",
    securityNote: sharedIndustrySecurity,
    metaTitle: "AI Workflow Automation for Marketing Teams & Agencies | tryacowork",
    metaDesc:
      "Automate reporting, content repurposing, lead routing and brand monitoring. AI workflows built, run and managed end-to-end for marketing teams and agencies.",
    faqs: [
      {
        q: "Will this work with our existing marketing tools?",
        a: "Yes. Workflows are built around your current CRM, email platform, ad accounts and analytics - not a new system to learn.",
      },
      {
        q: "Can it handle approvals before anything goes out?",
        a: "Yes. Anything client-facing can be queued for a human to approve before it publishes.",
      },
    ],
  },
  {
    slug: "ecommerce",
    navLabel: "E-Commerce",
    title: "AI Automation for E-Commerce Operations",
    outcome: "Orders, inventory and support that keep pace with your store.",
    intro:
      "E-commerce runs on a dozen tools that don't talk to each other. We connect them with workflows that handle the repetitive operations work - so growth doesn't mean more manual hours.",
    painPoints: [
      "Low-stock alerts get noticed too late.",
      "Order and fulfilment data is re-keyed between tools.",
      "Support tickets pile up at peak.",
      "Returns and refunds eat staff time.",
    ],
    exampleAutomations: [
      {
        title: "Inventory & restock alerts",
        body: "Low-stock and reorder triggers synced to Slack and your purchasing flow before you sell out.",
      },
      {
        title: "Order & fulfilment sync",
        body: "Order data flows between your store, 3PL and finance tools without manual entry.",
      },
      {
        title: "Support triage",
        body: "Tickets sorted by urgency with first-draft responses ready for a human.",
      },
      {
        title: "Returns handling",
        body: "Returns logged, refunds queued and customers updated automatically.",
      },
    ],
    integrationsNote:
      "We connect to your store platform, 3PL, helpdesk, spreadsheets and finance tools.",
    securityNote: sharedIndustrySecurity,
    metaTitle: "AI Automation for E-Commerce Operations | tryacowork",
    metaDesc:
      "Automate inventory alerts, order sync, support triage and returns. AI workflows built, run and managed end-to-end for e-commerce operations.",
    faqs: [
      {
        q: "Does it work with our store platform?",
        a: "Yes - we build around the platform, 3PL and tools you already use, connecting them rather than replacing them.",
      },
      {
        q: "Can it scale for peak season?",
        a: "That's the point. Workflows run continuously, so peak volume doesn't mean proportionally more manual hours.",
      },
    ],
  },
  {
    slug: "recruiting-hr",
    navLabel: "Recruiting & HR",
    title: "AI Automation for Recruiting & HR Teams",
    outcome: "Hiring and onboarding without the back-and-forth.",
    intro:
      "Recruiting and HR run on repetitive coordination - screening, scheduling, chasing documents. We automate the admin so your team can focus on people, not process.",
    painPoints: [
      "Screening CVs by hand against the same criteria.",
      "Onboarding checklists chased over email.",
      "Interview scheduling ping-pong.",
      "Documentation tracked in a fragile spreadsheet.",
    ],
    exampleAutomations: [
      {
        title: "Candidate screening",
        body: "Applications sorted against your criteria, with strong matches surfaced and the rest acknowledged.",
      },
      {
        title: "Onboarding sequences",
        body: "New-hire steps triggered automatically, with nudges until each one is done.",
      },
      {
        title: "Interview scheduling",
        body: "Availability matched and invites sent without the email tennis.",
      },
      {
        title: "Document tracking",
        body: "Outstanding paperwork chased and logged until it's complete.",
      },
    ],
    integrationsNote:
      "We connect to your ATS, HRIS, calendar, email and document storage.",
    securityNote: sharedIndustrySecurity,
    metaTitle: "AI Automation for Recruiting & HR Teams | tryacowork",
    metaDesc:
      "Automate candidate screening, onboarding sequences, interview scheduling and document tracking. AI workflows built and run end-to-end for HR teams.",
    faqs: [
      {
        q: "Is candidate data handled securely?",
        a: "Yes. Access is least-privilege and revocable, data is encrypted, and we never train AI models on it.",
      },
      {
        q: "Does a human stay in the loop on hiring decisions?",
        a: "Always. Workflows handle coordination and surfacing - people make the calls.",
      },
    ],
  },
  {
    slug: "operations-logistics",
    navLabel: "Operations & Logistics",
    title: "AI Automation for Operations & Logistics Teams",
    outcome: "The busywork between your tools, handled.",
    intro:
      "Operations is where work falls between systems. We build workflows that move data, raise the right actions and flag exceptions - so nothing stalls waiting on a person.",
    painPoints: [
      "Data re-keyed between systems all day.",
      "Status updates chased across teams.",
      "Purchase orders raised by hand.",
      "Delays found too late to fix.",
    ],
    exampleAutomations: [
      {
        title: "Cross-tool data sync",
        body: "Records kept in step across your systems without manual entry.",
      },
      {
        title: "Status updates",
        body: "Progress synced and the right people notified automatically.",
      },
      {
        title: "Purchase-order triggers",
        body: "POs raised from the right signals and queued for approval.",
      },
      {
        title: "Exception flagging",
        body: "Delays and anomalies surfaced before they become problems.",
      },
    ],
    integrationsNote:
      "We connect to your ERP, spreadsheets, inbox, project tools and supplier systems.",
    securityNote: sharedIndustrySecurity,
    metaTitle: "AI Automation for Operations & Logistics Teams | tryacowork",
    metaDesc:
      "Automate cross-tool data sync, status updates, purchase orders and exception flagging. AI workflows built and run end-to-end for ops and logistics.",
    faqs: [
      {
        q: "We use a lot of different tools - is that a problem?",
        a: "No. Connecting tools that don't talk to each other is exactly what these workflows do.",
      },
      {
        q: "What happens when something looks wrong?",
        a: "Anything unusual is flagged to a person instead of pushed through - a human in the loop on the edge cases.",
      },
    ],
  },
  {
    slug: "customer-support",
    navLabel: "Customer Support",
    title: "AI Automation for Customer Support Teams",
    outcome: "Faster first responses, fewer dropped tickets.",
    intro:
      "Support teams drown in triage and repetitive answers. We build workflows that sort, draft and route - so your team spends its time on the conversations that need a human.",
    painPoints: [
      "Tickets triaged by hand, one by one.",
      "Slow first responses at busy times.",
      "The same answers typed again and again.",
      "Escalations missed in the queue.",
    ],
    exampleAutomations: [
      {
        title: "Ticket triage",
        body: "Inbound tickets categorised and prioritised the moment they arrive.",
      },
      {
        title: "Draft first responses",
        body: "A suggested reply ready for an agent to review and send.",
      },
      {
        title: "Routing by urgency",
        body: "The right ticket to the right person, automatically.",
      },
      {
        title: "Escalation",
        body: "Edge cases escalated to a human before they slip.",
      },
    ],
    integrationsNote:
      "We connect to your helpdesk, inbox, CRM and knowledge base.",
    securityNote: sharedIndustrySecurity,
    metaTitle: "AI Automation for Customer Support Teams | tryacowork",
    metaDesc:
      "Automate ticket triage, draft responses, urgency routing and escalation. AI workflows built and run end-to-end for customer support teams.",
    faqs: [
      {
        q: "Will customers get auto-replies with no human?",
        a: "No. Drafts are prepared for an agent to review - the human stays in control of what's sent.",
      },
      {
        q: "Can it work alongside our current helpdesk?",
        a: "Yes. We build around your existing helpdesk rather than replacing it.",
      },
    ],
  },
];

export const industriesNav: NavLink[] = industries.map((i) => ({
  label: i.navLabel,
  href: `/industries/${i.slug}`,
}));
