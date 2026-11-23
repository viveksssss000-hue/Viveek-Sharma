/**
 * Services page copy (spec 7.2). URL: /bookkeeping-services-for-cpa-firms
 *
 * The deep, keyword-targeted page and the longest on the site - 1,400 to 1,800
 * words of real content. The URL is deliberately long because it matches the
 * main target keyword phrase; it must never be shortened to /services.
 *
 * The pricing section carries id="pricing", because the footer link, the mobile
 * menu and the 404 page all point at it. There is no separate pricing page.
 */



export const header = {
  eyebrow: "Bookkeeping services for CPA and accounting firms",
  h1: "Outsourced bookkeeping for CPA firms, by one dedicated person.",
  intro:
    "You assign the clients. Your bookkeeper does the reconciliations, the payables, the receivables and the month-end close inside your own software, on your own process, and hands the work back to you for review. No shared teams, no rotating staff, no work leaving your systems.",
} as const;

/* --- Section 2: The three ways firms use us (7.2.3) ---------------- */

export const threeWays = {
  h2: "Three ways firms use a dedicated bookkeeper.",
  cards: [
    {
      h4: "Ongoing client bookkeeping",
      body: "The arrangement most firms choose. Your bookkeeper takes a portfolio of your clients - typically 8 to 15 small business clients for a full-time person, depending on transaction volume - and runs their books every month, all year.",
    },
    {
      h4: "Overflow and season capacity",
      body: "For firms that need hands from January to April, or during a client’s year-end. Start part-time, scale to full-time for the season, and scale back. We need three weeks notice to add a person.",
    },
    {
      h4: "Cleanup and catch-up projects",
      body: "A client who has not reconciled since March, or a set of books you inherited. We quote these as a project with a fixed hour estimate, and you approve the estimate before anyone starts.",
    },
  ],
} as const;

/* --- Section 3: The work, task by task (7.2.4) --------------------- *
 * Real unordered lists, so the content is machine-readable and works with a
 * screen reader. This is the section that earns the search rankings.     */

export const taskGroups = {
  h2: "Exactly what your bookkeeper does.",
  groups: [
    {
      h3: "Daily and weekly work",
      items: [
        "Categorising and coding transactions to your chart of accounts",
        "Bank and credit card reconciliations",
        "Entering and coding bills in Bill.com, QuickBooks or Xero",
        "Preparing payment runs for your approval",
        "Raising client invoices and sending statements",
        "Chasing overdue receivables using your scripts and your tone",
        "Filing source documents in Dext, Hubdoc or your document portal",
        "Flagging anything unusual to you the same day, in writing",
      ],
    },
    {
      h3: "Month-end close",
      items: [
        "Working your close checklist, in your order",
        "Prepaid expense schedules and amortisation",
        "Accrual entries for known unbilled costs",
        "Fixed asset register updates and depreciation entries",
        "Payroll journals reconciled to the ADP, Gusto or Paychex report",
        "Intercompany and loan account reconciliations",
        "Balance sheet account reconciliations with supporting schedules",
        "Draft financial statements prepared for your review",
        "A written close summary listing what was done, what was assumed and what needs your decision",
      ],
    },
    {
      h3: "Payables and receivables",
      items: [
        "Vendor record setup and maintenance, including W-9 collection tracking",
        "Three-way matching where the client uses purchase orders",
        "Aged payables and aged receivables reporting",
        "Credit memo and refund processing",
        "1099-NEC and 1099-MISC preparation and vendor data cleanup",
      ],
    },
    {
      h3: "Sales tax and compliance support",
      items: [
        "Sales tax reconciliation between the ledger and the filing platform",
        "Preparing multi-state sales tax filings for your review and submission",
        "Reconciling sales tax collected to sales tax payable",
        "Maintaining exemption certificate records",
      ],
    },
    {
      h3: "Cleanup and catch-up",
      items: [
        "Rebuilding unreconciled bank and credit card accounts, month by month",
        "Correcting misclassified transactions and undoing duplicate entries",
        "Resolving negative balances and suspense accounts",
        "Reconstructing missing periods from statements and source documents",
        "Migrating from spreadsheets, or between QuickBooks Desktop and QuickBooks Online, or into Xero",
        "Producing a written summary of every correction made, so your review is fast",
      ],
    },
  ],
} as const;

/* --- Section 4: Software (7.2.5) ---------------------------------- *
 * [CONFIRM] Delete any package the team has not actually worked in. A list of
 * packages nobody has used is the easiest claim on the site for a buyer to
 * catch. Plain text names, never third-party logos (trademark rules, and a
 * wall of borrowed logos implies partnerships that do not exist).        */

export const software = {
  h2: "The software our team works in.",
  groups: [
    {
      label: "Ledgers",
      items: [
        "QuickBooks Online",
        "QuickBooks Desktop",
        "Xero",
        "Sage Intacct",
        "NetSuite",
        "Wave",
        "Zoho Books",
      ],
    },
    {
      label: "Payables and expenses",
      items: ["Bill.com", "Ramp", "Expensify", "Melio", "Dext", "Hubdoc"],
    },
    {
      label: "Payroll",
      items: ["Gusto", "ADP", "Paychex", "QuickBooks Payroll", "Rippling"],
    },
    {
      label: "Practice and workflow",
      items: [
        "Karbon",
        "Canopy",
        "Jetpack Workflow",
        "Asana",
        "ClickUp",
        "Slack",
        "Microsoft Teams",
      ],
    },
    { label: "Sales tax", items: ["Avalara", "TaxJar"] },
  ],
  closing:
    "Using something not on this list? We will train your bookkeeper on it during onboarding at no charge.",
} as const;

/* --- Section 6: What we do not do (7.2.7, replaced by CO-02) ------ *
 * The line is drawn at JUDGEMENT rather than at service type, so every item
 * stays true permanently. The previous list excluded "audit or assurance
 * support, including workpapers and testing" - a service the firm intends to
 * offer in a later phase, and a published exclusion that is later retracted
 * does more damage to a professional buyer's trust than never having published
 * it at all.
 *
 * Note what the new items deliberately do NOT say: they do not offer standards
 * research, benchmarking or documentation support as a service. This list states
 * a boundary. It does not sell anything.
 *
 * Blog article 22, "What we will not do, and why", MUST match this list word for
 * word. If the two ever differ, this page wins.                          */

export const boundaries = {
  h2: "What we do not do.",
  intro:
    "We would rather lose an enquiry than take work we are not the right firm for.",
  items: [
    "Tax return preparation or review. We do not prepare 1040s, 1120s, 1065s or any other return.",
    "Signing off on anything. Review and sign-off is your firm’s work and cannot be outsourced.",
    "Reaching accounting conclusions. We do not write technical memos or position papers that decide a treatment. That judgement is your firm’s and it stays there.",
    "Making audit judgements. We do not determine materiality, conclude on going concern, or decide whether audit evidence is sufficient.",
    "Talking to your clients, unless you specifically ask us to and set it up with them first.",
    "Holding your clients’ data on our own systems. It stays in yours.",
    "Going around your firm to your clients. A client you bring through your firm stays yours - we will never approach them to work with us directly.",
  ],
  closing:
    "That last point matters more than it might look. Some providers sell to firms and to small businesses at the same time. We do not, and we never will.",
} as const;

/* --- Section 7: Fit (7.2.8) -------------------------------------- *
 * Qualifies leads before they book, which saves the client sales time.  */

export const fit = {
  h2: "Is this a good fit for your firm?",
  good: {
    h4: "It works well when",
    items: [
      "You have at least 20 hours a week of bookkeeping you would happily hand over",
      "Your clients are mostly on cloud accounting software",
      "You have a way you like things done, even if it is not written down yet - we will write it down with you",
      "You are willing to spend two or three hours in the first two weeks getting someone up to speed",
      "You want the same person for years, not a different person each month",
    ],
  },
  bad: {
    h4: "It does not work well when",
    items: [
      "You need fewer than 10 hours a week - a dedicated person is the wrong shape for that",
      "All the work is on desktop software with no remote access and no plan to change",
      "You need someone to make judgement calls without review, which no outsourced provider should ever do",
      "You need tax return preparation, which we do not offer",
      "You want the cheapest hourly rate available - there are offshore providers racing to the bottom on price, and we are not competing with them",
    ],
  },
  closing:
    "If you are reading the right-hand column and recognising your firm, tell us on the call and we will say so. We will also tell you if we think you should wait.",
} as const;

/* --- Section 8: FAQ for this page (7.2.9) ------------------------- */

export const faqHeading = "Questions about the work itself.";

export const faqs = [
  {
    q: "How many clients can one bookkeeper handle?",
    a: "For a full-time person, usually 8 to 15 small business clients, depending on transaction volume and how clean the books are. A client with 40 transactions a month and one bank account is very different from a restaurant with three locations and daily deposits. We will estimate it properly on the call, based on your actual client list.",
  },
  {
    q: "Who sets up the process document?",
    a: "We do, with you, in the first week. It is usually four to six pages: your chart of accounts conventions, your close checklist, your naming conventions, how you want questions asked, and what must never be done without asking you. You review and approve it. It becomes the training document for any future person on your account, which is what makes replacement painless.",
  },
  {
    q: "What happens when my bookkeeper is on leave?",
    a: "You will know their leave calendar in advance. For planned leave, a trained backup from our team covers the work using your process document. For unplanned absence, the team lead covers it. You are not billed extra for cover.",
  },
  {
    q: "Can we start with a cleanup project before committing to a monthly person?",
    a: "Yes, and many firms do. We quote the cleanup as a fixed hour estimate, you approve it, and if it goes well you convert to a monthly arrangement with the same person. The free 20-hour pilot can be spent on a cleanup.",
  },
] as const;
