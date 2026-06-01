/**
 * content.ts — single source of truth for all site copy, navigation, services,
 * FAQs and metric placeholders (BUILD.md §10 / §11). Copy is verbatim from the
 * brief; the client can edit here without touching components.
 *
 * Placeholders use TODO(client) markers and {{token}} metrics — never fabricate
 * testimonials, logos, certifications or numbers.
 */

export const site = {
  name: "Acowork",
  legalName: "VSH Enterprise Pvt Ltd",
  domain: "tryacowork.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tryacowork.com",
  email: "hello@tryacowork.com",
  salesEmail: "sales@tryacowork.com",
  region: "Serving the US & EU",
  // TODO(client): confirm LinkedIn company URL.
  linkedin: "https://www.linkedin.com/company/acowork",
  tagline: "Automate your books, not your judgement.",
} as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavLink = { label: string; href: string };

export const services = [
  {
    slug: "bookkeeping-automation",
    title: "Bookkeeping Automation",
    navLabel: "Bookkeeping Automation",
    outcome: "Keep the books current without the manual grind.",
    problem:
      "Re-keying transactions and reconciling by hand keeps your books perpetually behind — and every manual touch is a chance for error.",
    capabilities: [
      "Automated transaction capture & categorisation",
      "Bank-feed reconciliation",
      "Exception flagging for review",
      "Audit-ready records",
    ],
    integrationsNote:
      "Connects to the accounting tools you already use — QuickBooks, Xero, Sage and more. TODO(client): confirm live integrations.",
    securityNote:
      "Transaction data is encrypted in transit and at rest, and we never use it to train AI models.",
    metaTitle: "Bookkeeping Automation | Acowork",
    metaDesc:
      "Automate transaction capture, categorisation and bank-feed reconciliation. Keep the books current, accurate and audit-ready. Book a demo.",
    faqs: [
      {
        q: "How does automated categorisation stay accurate?",
        a: "We tune categorisation rules to your chart of accounts and keep a human in the loop to review exceptions, so accuracy improves over time rather than drifting.",
      },
      {
        q: "Will it reconcile against my existing bank feeds?",
        a: "Yes — we connect to your existing bank feeds and ledger, match transactions automatically, and flag only the exceptions that need a human decision.",
      },
      {
        q: "What happens to transactions it isn't sure about?",
        a: "Low-confidence items are flagged for review rather than guessed, so nothing posts to your ledger without the right oversight.",
      },
    ],
  },
  {
    slug: "invoice-ap-automation",
    title: "Invoice & Accounts Payable Automation",
    navLabel: "Invoice & AP Automation",
    outcome: "From inbox to ledger, automatically.",
    problem:
      "Invoices arrive by email, PDF and post. Capturing line items, matching POs and routing approvals by hand is slow — and duplicates and errors slip through.",
    capabilities: [
      "Capture invoices from email or upload",
      "Line-item extraction",
      "PO matching",
      "Approval routing",
      "Sync to your ledger",
      "Duplicate & fraud flags",
    ],
    integrationsNote:
      "Pushes clean, coded bills into your ledger and approval tools. TODO(client): confirm live integrations.",
    securityNote:
      "Invoice and supplier data is encrypted and access-controlled; we never train AI models on it.",
    metaTitle: "Invoice & Accounts Payable Automation | Acowork",
    metaDesc:
      "Capture invoices, extract line items, match POs, route approvals and sync to your ledger — with duplicate and fraud flags. Book a demo.",
    faqs: [
      {
        q: "Can it match invoices to purchase orders?",
        a: "Yes — invoices are matched to POs and receipts, and only mismatches are routed for a human decision.",
      },
      {
        q: "How do you catch duplicate or fraudulent invoices?",
        a: "Each invoice is checked against historical bills and supplier patterns, and anything suspicious is flagged before it reaches approval.",
      },
      {
        q: "Does it work with our approval workflow?",
        a: "We map your existing approval thresholds and routing so bills go to the right approver automatically.",
      },
    ],
  },
  {
    slug: "accounts-receivable-automation",
    title: "Accounts Receivable Automation",
    navLabel: "Accounts Receivable Automation",
    outcome: "Get paid faster, chase less.",
    problem:
      "Manual invoicing and inconsistent follow-up stretch out your cash cycle, and matching incoming payments by hand eats hours every week.",
    capabilities: [
      "Invoice generation",
      "Automated payment reminders",
      "Payment matching",
      "AR aging insights",
    ],
    integrationsNote:
      "Works with your billing and ledger tools to keep receivables moving. TODO(client): confirm live integrations.",
    securityNote:
      "Customer and payment data is encrypted in transit and at rest, with least-privilege access.",
    metaTitle: "Accounts Receivable Automation | Acowork",
    metaDesc:
      "Generate invoices, automate reminders, match payments and surface AR aging insights so you get paid faster and chase less. Book a demo.",
    faqs: [
      {
        q: "Will reminders sound automated or pushy?",
        a: "Reminder cadence and tone are configured to match your relationships, so follow-up stays professional and on-brand.",
      },
      {
        q: "How are incoming payments matched?",
        a: "Payments are matched to open invoices automatically, with only the ambiguous ones flagged for a quick human check.",
      },
    ],
  },
  {
    slug: "reporting-dashboards",
    title: "Financial Reporting & Dashboards",
    navLabel: "Reporting & Dashboards",
    outcome: "Always-current numbers, on demand.",
    problem:
      "Reports are stale by the time they're built, and pulling period comparisons or cash-flow views by hand means decisions wait on spreadsheets.",
    capabilities: [
      "Automated report generation",
      "Real-time dashboards",
      "Cash-flow views",
      "Period comparisons",
    ],
    integrationsNote:
      "Pulls from your ledger and source systems to keep every view current. TODO(client): confirm live integrations.",
    securityNote:
      "Reporting data stays within your controlled environment; access is least-privilege and audited.",
    metaTitle: "Financial Reporting & Dashboards | Acowork",
    metaDesc:
      "Automated reports, real-time dashboards, cash-flow views and period comparisons — always-current numbers on demand. Book a demo.",
    faqs: [
      {
        q: "How current are the dashboards?",
        a: "Dashboards refresh from your source systems, so the numbers you see reflect your latest data rather than last month's export.",
      },
      {
        q: "Can we get the reports our board already expects?",
        a: "Yes — we build to the report formats and period comparisons your stakeholders already rely on.",
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
        // Blog is Phase 2 — link added once content exists.
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
/* Metrics — placeholders only (BUILD.md §11). Never invent figures.   */
/* ------------------------------------------------------------------ */

export const metrics = [
  { value: "{{hours_saved}}", label: "Hours saved per month" },
  { value: "{{accuracy}}", label: "Categorisation accuracy" },
  { value: "{{time_to_close}}", label: "Faster month-end close" },
] as const;

/* ------------------------------------------------------------------ */
/* Testimonials — placeholder state until client provides real, named  */
/* quotes (BUILD.md §11). Empty array renders a tasteful empty state.  */
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
/* Home page copy (BUILD.md §10.1)                                     */
/* ------------------------------------------------------------------ */

export const home = {
  meta: {
    title: "AI Bookkeeping & Accounting Automation | Acowork",
    description:
      "Acowork builds secure AI automations for accounting & bookkeeping — reconciliation, invoices, AP/AR and reporting. Serving SMBs in the US & EU. Book a demo.",
  },
  hero: {
    h1: "Automate your books, not your judgement.",
    sub: "Acowork designs and builds secure AI workflows that handle the repetitive accounting work — reconciliation, invoice processing, AP/AR and reporting — so your team can focus on the decisions that matter.",
    primaryCta: "Book a Demo",
    secondaryCta: "See how it works",
    trustLine:
      "Serving SMBs across the US & EU · Your data encrypted & never used to train AI models.",
  },
  problems: {
    heading: "Manual accounting is quietly costing you",
    cards: [
      {
        title: "Hours lost to data entry",
        body: "Re-keying invoices and receipts eats the time your team should spend on analysis.",
      },
      {
        title: "Reconciliation backlogs",
        body: "Matching transactions by hand is slow and error-prone.",
      },
      {
        title: "A close that drags on",
        body: "Month-end takes days when it should take hours.",
      },
      {
        title: "AI that feels risky",
        body: "You want automation, but not at the cost of control over your financial data.",
      },
    ],
  },
  servicesOverview: {
    heading: "What we automate",
    description:
      "Four focused automations for the accounting work that slows your team down.",
  },
  security: {
    heading: "Built for the people who guard the numbers",
    body: "Your data is encrypted in transit and at rest, access is tightly controlled, and we never train AI models on your financial data. A human reviews the automation — it's a teammate, not a black box.",
    cta: "Read about our security",
  },
  results: {
    heading: "Results that show up in your books",
    description:
      "Real, named results land here as our design partners go live. We never publish numbers we can't stand behind.",
  },
} as const;

/* ------------------------------------------------------------------ */
/* How It Works (BUILD.md §10.3)                                       */
/* ------------------------------------------------------------------ */

export const processSteps = [
  {
    number: "01",
    title: "Discovery & assessment",
    body: "We map your current accounting workflows and pinpoint where automation saves the most time — before we build anything.",
  },
  {
    number: "02",
    title: "Plan & proposal",
    body: "A prioritised plan with expected time savings, clear scope, and data-handling defined up front.",
  },
  {
    number: "03",
    title: "Build & integrate",
    body: "We build the automation, connect it to the tools you already use, and test it against real data with a human in the loop.",
  },
  {
    number: "04",
    title: "Optimise & support",
    body: "We monitor accuracy, refine over time, and support you as you grow.",
  },
] as const;

export const howItWorks = {
  meta: {
    title: "How Acowork Works — Our Automation Process | Acowork",
    description:
      "Our four-step process: discovery, plan, build & integrate, optimise & support. A credible, low-risk way to automate your accounting. Book a demo.",
  },
  h1: "How Acowork works",
  intro:
    "A credible, low-risk way to automate your accounting — process-first, security-defined up front, and human-reviewed at every step.",
  expectations: {
    heading: "What you can expect",
    points: [
      "Clear scope and expected time savings before any build begins.",
      "Data handling and access defined up front, in writing.",
      "Regular communication and a human reviewing the automation as it goes live.",
    ],
  },
} as const;

/* ------------------------------------------------------------------ */
/* About (BUILD.md §10.2)                                              */
/* ------------------------------------------------------------------ */

export const about = {
  meta: {
    title: "About Acowork — Accounting Automation Specialists | Acowork",
    description:
      "Acowork is built around one thing: automating accounting and bookkeeping safely and accurately for growing businesses in the US & EU. Book a demo.",
  },
  h1: "We're the accounting-automation specialists.",
  body: "Most automation agencies are generalists who happen to mention finance. Acowork is built around one thing: automating accounting and bookkeeping safely and accurately for growing businesses. We combine finance know-how with modern AI, and we treat your data with the care it deserves.",
  values: [
    {
      title: "Accuracy",
      body: "We build for trustworthy numbers, with checks and a human in the loop — never blind automation.",
    },
    {
      title: "Security",
      body: "Financial data is sensitive. Encryption, least-privilege access, and a no-training promise are the default, not an add-on.",
    },
    {
      title: "Partnership",
      body: "We map your real workflow first and support you as you grow — a teammate, not a vendor.",
    },
  ],
  whoWeServe: {
    heading: "Who we serve",
    items: [
      "Small and medium businesses that want their books current without the manual grind.",
      "Accounting and bookkeeping firms automating internal workflows.",
      "Finance teams who need accuracy and control as they scale.",
    ],
  },
  // TODO(client): real names, roles and photos.
  team: [] as { name: string; role: string }[],
} as const;

/* ------------------------------------------------------------------ */
/* Security & Compliance (BUILD.md §10.5)                              */
/* ------------------------------------------------------------------ */

export const security = {
  meta: {
    title: "Security & Compliance | Acowork",
    description:
      "How Acowork protects your financial data: encryption, least-privilege access, GDPR/CCPA alignment, DPA on request, and a no-training promise. Book a demo.",
  },
  h1: "Your financial data, protected.",
  intro:
    "Security isn't a footnote for us — it's the reason finance teams trust Acowork. Here's how we protect your data and keep you in control.",
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
      body: "Your financial data is never used to train AI models — full stop.",
      bullets: [],
    },
    {
      title: "Human in the loop",
      body: "Automations are reviewed and controlled, with accuracy checks. It's a teammate, not a black box.",
      bullets: [],
    },
    {
      title: "Certifications & roadmap",
      // TODO(client): state SOC 2 / ISO 27001 status honestly. Do not claim
      // certifications you do not hold.
      body: "TODO(client): state your SOC 2 / ISO 27001 status honestly here — achieved, in progress, or planned. We will only publish certifications you actually hold.",
      bullets: [],
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Results (BUILD.md §10 / §11)                                        */
/* ------------------------------------------------------------------ */

export const results = {
  meta: {
    title: "Results & Case Studies | Acowork",
    description:
      "Real, named, permissioned results from Acowork accounting automation engagements. We never publish figures we can't stand behind. Book a demo.",
  },
  h1: "Results that show up in your books",
  intro:
    "We publish real, named, permissioned results only. As our design partners go live, their outcomes will appear here — never fabricated logos or quotes.",
  // TODO(client): add real case studies (client/sector, problem, what we
  // automated, quantified result, optional quote).
  caseStudies: [] as {
    sector: string;
    problem: string;
    automated: string;
    result: string;
    quote?: string;
  }[],
} as const;

/* ------------------------------------------------------------------ */
/* Global FAQ (BUILD.md §10.6) — Home + reused                         */
/* ------------------------------------------------------------------ */

export const globalFaqs = [
  {
    q: "Will this work with QuickBooks, Xero or Sage?",
    a: "We connect to the accounting tools you already use. TODO(client): confirm your live integrations so we can list them specifically.",
  },
  {
    q: "How do you keep our financial data secure?",
    a: "Your data is encrypted in transit and at rest, access is least-privilege, and we never train AI models on it. See our Security & Compliance page for the full picture.",
  },
  {
    q: "Do you train AI on our data?",
    a: "No. Your financial data is never used to train AI models.",
  },
  {
    q: "How long does it take to go live?",
    a: "It depends on scope, but we always follow the same four-step process — discovery, plan, build & integrate, then optimise & support — so timelines and savings are clear up front.",
  },
  {
    q: "Is there a human checking the automations?",
    a: "Yes. Automations are reviewed and controlled with accuracy checks — a human in the loop, not a black box.",
  },
  {
    q: "What does it cost?",
    a: "We scope each engagement on a quick call, because the right automations depend on your workflow. Book a demo and we'll map two or three for you, live.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Book a Demo (BUILD.md §6.2)                                         */
/* ------------------------------------------------------------------ */

export const bookDemo = {
  meta: {
    title: "Book a Demo | Acowork",
    description:
      "Book a 30-minute demo. We'll map two or three automations for your accounting workflow, live — no obligation, no credit card. Serving the US & EU.",
  },
  h1: "Book a 30-minute demo",
  valueReminder:
    "In 30 minutes we'll map 2–3 automations for your books — no obligation.",
  whatNext: {
    heading: "What happens next",
    points: [
      "Pick a time that works — you'll get a calendar invite with a video link.",
      "We'll ask a few quick questions about your accounting workflow beforehand.",
      "On the call, we map 2–3 automations live and outline what going live looks like.",
    ],
  },
  reassurance: "No credit card. No pressure.",
} as const;

/* ------------------------------------------------------------------ */
/* Contact (BUILD.md §6.1)                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  meta: {
    title: "Contact Acowork | Acowork",
    description:
      "Questions about automating your accounting or bookkeeping? Contact Acowork — we typically reply the same business day. Serving the US & EU.",
  },
  h1: "Talk to us",
  intro:
    "Not quite ready to book a demo? Send us a note and we'll get back to you — usually the same business day.",
  responseTime: "We typically reply within one business day.",
} as const;
