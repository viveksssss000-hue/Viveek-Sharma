/**
 * posts.ts - typed blog content (no MDX dependency). Each post is structured
 * data so the blog index + /blog/[slug] render without extra tooling.
 *
 * Focused on finance/back-office (Website P2 follow-up, item 3). Older
 * generalist drafts are kept but flagged `noindex` so they stay out of search
 * and the sitemap while the indexed blog matches the new positioning.
 * `date` is ISO (YYYY-MM-DD); newest first drives ordering.
 */

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readingMins: number;
  metaTitle: string;
  metaDesc: string;
  body: PostBlock[];
  /** When true, the post is kept but noindexed and excluded from the sitemap. */
  noindex?: boolean;
};

export const posts: Post[] = [
  {
    slug: "cut-month-end-close-with-ai",
    title: "How to cut your month-end close by 4 days with AI",
    excerpt:
      "Month-end shouldn't drag into the second week. Here's how an automated, human-reviewed close gives a few days back, every month.",
    date: "2026-06-28",
    author: "tryacowork",
    readingMins: 5,
    metaTitle: "How to Cut Your Month-End Close by 4 Days with AI | tryacowork",
    metaDesc:
      "Automate reconciliation prep, categorization and the close checklist so your team reviews instead of keys - and closes the books days sooner.",
    body: [
      {
        type: "p",
        text: "For a lot of small businesses and the firms that keep their books, month-end has a familiar shape: it drags into the second week. Not because the work is hard, but because it's manual - matching transactions, categorizing them, chasing the last few documents, and rebuilding the same checklist every period.",
      },
      { type: "h2", text: "Where the days actually go" },
      {
        type: "p",
        text: "Most of a slow close isn't analysis. It's preparation: pulling transactions, matching them against statements, categorizing against your rules, and flagging the handful that don't fit. That prep is repetitive and rules-based, which is exactly what an AI workflow handles well.",
      },
      { type: "h2", text: "What an automated close looks like" },
      {
        type: "ul",
        items: [
          "Transactions are pulled and matched automatically, so reconciliation starts from a clean base.",
          "Entries are categorized against your rules, with anything unusual flagged for a person.",
          "The recurring close checklist assembles itself, so nothing is missed or re-typed.",
          "Your team reviews and signs off, instead of keying for days.",
        ],
      },
      {
        type: "p",
        text: "The point isn't to remove the human - it's to move the human to the top of the process. A reviewer checking flagged exceptions is faster and more accurate than a person doing every step by hand. One reference client cut their close time by four days this way.",
      },
      {
        type: "p",
        text: "That's the idea behind our Month-End Close Autopilot: automate the prep, keep human review on the judgement, and give the days back. If your close runs long, a Workflow Audit maps exactly where the hours go before anything is built.",
      },
    ],
  },
  {
    slug: "bookkeeping-tasks-to-automate",
    title: "5 bookkeeping tasks small businesses should automate this quarter",
    excerpt:
      "If your team still does these five bookkeeping jobs by hand, they're strong candidates to automate first - here's why.",
    date: "2026-06-24",
    author: "tryacowork",
    readingMins: 5,
    metaTitle:
      "5 Bookkeeping Tasks Small Businesses Should Automate This Quarter | tryacowork",
    metaDesc:
      "Five repetitive bookkeeping tasks - data entry, categorization, reconciliation prep, bill capture and reporting - that are cheaper and more accurate as AI workflows.",
    body: [
      {
        type: "p",
        text: "Bookkeeping is full of work that's repetitive, rules-based and easy to get slightly wrong when it's done by hand. Those three traits are the signal that a task is worth automating. Here are five that almost always qualify.",
      },
      { type: "h2", text: "1. Transaction data entry" },
      {
        type: "p",
        text: "Re-keying transactions from statements and receipts is slow and error-prone. Capturing and importing them automatically removes the typing, and the typos.",
      },
      { type: "h2", text: "2. Categorization" },
      {
        type: "p",
        text: "Coding transactions against the same rules every month is a job for a workflow. It applies your rules consistently and flags only the ones that need a human eye.",
      },
      { type: "h2", text: "3. Reconciliation prep" },
      {
        type: "p",
        text: "Matching transactions to statements before the close is pure preparation. Automating the match means reconciliation starts from a clean base instead of a blank page.",
      },
      { type: "h2", text: "4. Bill capture and entry" },
      {
        type: "p",
        text: "Reading incoming bills, extracting the line items and entering them is repetitive and a common source of duplicate payments. A workflow captures and checks them before they're paid.",
      },
      { type: "h2", text: "5. Recurring reports" },
      {
        type: "p",
        text: "Any report built from the same sources on the same cadence should build itself, leaving the judgement to a person.",
      },
      {
        type: "p",
        text: "You don't have to automate all five at once. A Workflow Audit maps where your hours actually go and ranks what to automate first, so you start with the biggest time-sink.",
      },
    ],
  },
  {
    slug: "stop-paying-duplicate-bills",
    title: "AP automation: how to stop paying duplicate bills",
    excerpt:
      "Duplicate payments slip through manual AP and cost real money. Here's how automated bill capture catches them before they're paid.",
    date: "2026-06-20",
    author: "tryacowork",
    readingMins: 4,
    metaTitle: "AP Automation: How to Stop Paying Duplicate Bills | tryacowork",
    metaDesc:
      "Duplicate and anomalous bills slip through manual accounts payable. Automated bill capture extracts, matches and flags them for review before payment.",
    body: [
      {
        type: "p",
        text: "Paying the same bill twice is one of the quieter costs of manual accounts payable. A bill arrives by email, gets keyed in, and a near-identical one arrives a week later under a slightly different reference. By the time anyone notices, it's been paid.",
      },
      { type: "h2", text: "Why duplicates get through" },
      {
        type: "p",
        text: "Manual AP relies on someone remembering they've seen an invoice before. With dozens of bills a month across email and uploads, that's an unfair thing to ask of a person. Vendors resend, references change, and PDFs look alike.",
      },
      { type: "h2", text: "What automated bill capture does" },
      {
        type: "ul",
        items: [
          "Captures incoming bills from email and uploads automatically.",
          "Extracts the line items, so nothing is re-keyed.",
          "Detects duplicates and anomalies against what's already come through.",
          "Routes anything unusual to a human for approval, before payment.",
        ],
      },
      {
        type: "p",
        text: "The result is fewer hours on AP data entry and duplicate payments caught early instead of written off. One reference client caught two duplicate bills in the first thirty days.",
      },
      {
        type: "p",
        text: "That's what our AP & Bill-Capture Bot is built to do: take the keying and the watching off your team, and keep a human on the approvals. Start with a Workflow Audit to see how many bills you handle and where they leak.",
      },
    ],
  },
  {
    slug: "client-onboarding-weeks-to-hours",
    title: "Client onboarding: from weeks to hours",
    excerpt:
      "New-client onboarding shouldn't take weeks of chasing documents. Here's how automating the intake gets it down to hours.",
    date: "2026-06-16",
    author: "tryacowork",
    readingMins: 4,
    metaTitle: "Client Onboarding: From Weeks to Hours | tryacowork",
    metaDesc:
      "Automate document collection, follow-ups and file setup so onboarding a new client or customer takes hours, not weeks - with more handled by the same team.",
    body: [
      {
        type: "p",
        text: "Onboarding a new client or customer is mostly coordination: requesting documents, chasing the ones that don't come back, organizing what arrives, and setting up the file before any real work starts. Done by hand, it stretches a job that should take hours into weeks.",
      },
      { type: "h2", text: "The bottleneck is the chase" },
      {
        type: "p",
        text: "The slow part of onboarding usually isn't the work - it's waiting on documents and remembering to follow up. That waiting and chasing is repetitive, which means it can run on its own.",
      },
      { type: "h2", text: "What an onboarding engine handles" },
      {
        type: "ul",
        items: [
          "Sends and tracks document requests, so you know what's outstanding.",
          "Follows up automatically on missing items, without anyone remembering to.",
          "Organizes files as they arrive, ready for the next step.",
          "Kicks off the next workflow once the file is complete.",
        ],
      },
      {
        type: "p",
        text: "The team's time moves from chasing to reviewing, and more onboardings get handled without adding people. One reference client doubled their follow-ups with no extra headcount.",
      },
      {
        type: "p",
        text: "That's our Client / Customer Onboarding & Document Engine. If intake is your bottleneck, a Workflow Audit shows where the time goes before anything is built.",
      },
    ],
  },
  {
    slug: "automate-lead-follow-up-without-a-developer",
    title: "How to automate your lead follow-up without a developer",
    excerpt:
      "Leads go cold in the gap between landing and a reply. Here's how to close that gap automatically - no engineering team required.",
    date: "2026-06-10",
    author: "tryacowork",
    readingMins: 5,
    metaTitle:
      "How to Automate Lead Follow-Up Without a Developer | tryacowork",
    metaDesc:
      "A practical guide to automating lead follow-up - enrichment, routing and first-touch - without hiring a developer. Built and run for you end-to-end.",
    // Off-topic (sales) for the back-office positioning: kept but noindexed.
    noindex: true,
    body: [
      {
        type: "p",
        text: "Most small teams lose leads not because their product is wrong, but because of timing. A lead lands on a Friday evening, sits in an inbox over the weekend, and by Monday a competitor has already replied. The work isn't hard - it's just slow, and it waits on a person.",
      },
      {
        type: "h2",
        text: "What 'automated follow-up' actually means",
      },
      {
        type: "p",
        text: "It doesn't mean spamming everyone with the same template. It means the repetitive parts - capturing the lead, enriching it, routing it to the right person, and logging it - happen the moment the lead arrives, so a human can do the part that matters: have a good conversation.",
      },
      {
        type: "ul",
        items: [
          "Capture: the lead is pulled from your form, inbox or ad platform automatically.",
          "Enrich: basic context (company, role, source) is added so the reply isn't generic.",
          "Route: it goes to the right person based on your rules, not a shared inbox.",
          "Log: your CRM is updated without anyone re-typing anything.",
        ],
      },
      {
        type: "h2",
        text: "Why you don't need a developer",
      },
      {
        type: "p",
        text: "The tools to do this already exist and connect to what you use. The hard part isn't code - it's designing the workflow correctly and keeping it working as your tools change. That's the part we handle end-to-end, so you get the outcome without managing the plumbing.",
      },
      {
        type: "p",
        text: "Start with one source of leads, automate the follow-up for it, and measure the difference in response time. Then expand. That's how every reliable automation starts - small, measured, and built on your real tools.",
      },
    ],
  },
  {
    slug: "tasks-your-ops-team-should-not-do-manually",
    title: "5 tasks your operations team should never be doing manually in 2026",
    excerpt:
      "If your ops team still does these five things by hand, you're paying skilled people to do work software should be doing.",
    date: "2026-05-28",
    author: "tryacowork",
    readingMins: 6,
    metaTitle:
      "5 Tasks Your Ops Team Should Never Do Manually in 2026 | tryacowork",
    metaDesc:
      "Five repetitive operations tasks that are cheaper, faster and more accurate as AI workflows - and how to know which to automate first.",
    // Off-topic (generic ops) for the back-office positioning: kept but noindexed.
    noindex: true,
    body: [
      {
        type: "p",
        text: "Operations is where the work between tools lives - and where skilled people quietly spend hours on tasks that don't need them. Here are five that are almost always worth automating first.",
      },
      {
        type: "h2",
        text: "1. Re-keying data between systems",
      },
      {
        type: "p",
        text: "Copying the same record from one tool into another is the clearest possible candidate: it's repetitive, rules-based, and error-prone. A workflow keeps the systems in step without anyone touching a keyboard.",
      },
      {
        type: "h2",
        text: "2. Chasing status updates",
      },
      {
        type: "p",
        text: "If someone spends part of their week asking 'where is this?', that's a signal. Status can be synced and surfaced automatically, so the update finds the person instead of the person hunting the update.",
      },
      {
        type: "h2",
        text: "3. Raising routine purchase orders",
      },
      {
        type: "p",
        text: "POs that follow predictable triggers (stock thresholds, recurring needs) can be drafted automatically and queued for a human to approve - keeping the control without the busywork.",
      },
      {
        type: "h2",
        text: "4. Building the same report every week",
      },
      {
        type: "p",
        text: "Any report assembled from the same sources on the same cadence should build itself. The human adds the judgement on top - not the copy-paste underneath.",
      },
      {
        type: "h2",
        text: "5. Spotting exceptions too late",
      },
      {
        type: "p",
        text: "Delays and anomalies are cheapest to fix early. A workflow that watches for them and flags a person turns a fire-fight into a heads-up.",
      },
      {
        type: "p",
        text: "You don't have to automate all five at once. Map where your team's hours actually go, pick the biggest time-sink, and start there.",
      },
    ],
  },
  {
    slug: "ai-workflow-automation-vs-zapier",
    title: "AI workflow automation vs. Zapier: what's the difference?",
    excerpt:
      "Zapier connects apps. AI workflows make decisions. Here's when you need each - and where the line is.",
    date: "2026-05-14",
    author: "tryacowork",
    readingMins: 5,
    metaTitle: "AI Workflow Automation vs. Zapier: What's the Difference? | tryacowork",
    metaDesc:
      "Zapier moves data between apps on fixed rules. AI workflows read, decide and act on judgement. A plain-English comparison of when to use each.",
    body: [
      {
        type: "p",
        text: "If you've used Zapier or Make, you already understand half of automation: when X happens, do Y. That's powerful, and for a lot of tasks it's all you need. But it has a ceiling - and that ceiling is where AI workflows begin.",
      },
      {
        type: "h2",
        text: "Rules-based automation: great until it has to think",
      },
      {
        type: "p",
        text: "Tools like Zapier are excellent at moving data on fixed rules. The catch is that they can't handle ambiguity. The moment a task needs a judgement - 'is this invoice a duplicate?', 'which team should this go to?', 'is this reply urgent?' - a rigid rule either guesses or breaks.",
      },
      {
        type: "h2",
        text: "AI workflows: read, decide, act",
      },
      {
        type: "p",
        text: "An AI workflow can read unstructured input (an email, a document, a message), apply your rules with judgement, and act - while flagging anything it's unsure about to a person. It's the difference between a wire that carries data and a teammate that handles a task.",
      },
      {
        type: "ul",
        items: [
          "Use rules-based automation for simple, predictable app-to-app moves.",
          "Use AI workflows when the task needs reading, judgement or exceptions handled.",
          "Often the best system uses both - rules for the plumbing, AI for the decisions.",
        ],
      },
      {
        type: "p",
        text: "The right question isn't 'which tool?' - it's 'what does this task actually require?' We design around that, then build and run it, so you're not left maintaining a brittle chain of steps.",
      },
    ],
  },
  {
    slug: "how-much-time-does-ai-automation-save",
    title: "How much time does AI automation actually save small businesses?",
    excerpt:
      "The honest answer: it depends on the task. Here's how to estimate it for your own team before you commit to anything.",
    date: "2026-04-30",
    author: "tryacowork",
    readingMins: 4,
    metaTitle:
      "How Much Time Does AI Automation Actually Save? | tryacowork",
    metaDesc:
      "A grounded way to estimate the hours AI workflow automation can give back to a small team - and why the audit comes before the number.",
    body: [
      {
        type: "p",
        text: "Every automation pitch comes with a big number. We'd rather give you a method to find your own, because the honest answer depends entirely on the task.",
      },
      {
        type: "h2",
        text: "Estimate it in three steps",
      },
      {
        type: "ul",
        items: [
          "Pick one repetitive task and count how often it happens (per day or week).",
          "Time how long it takes a person to do it once, honestly.",
          "Multiply - that's the manual baseline the automation is measured against.",
        ],
      },
      {
        type: "p",
        text: "A task that takes 10 minutes and happens 20 times a week is over 170 hours a year. Most teams have several of these hiding in plain sight, which is why the first surprise of an audit is usually how much time the small stuff adds up to.",
      },
      {
        type: "h2",
        text: "Why we map before we promise",
      },
      {
        type: "p",
        text: "We don't lead with a headline figure because a number you can't check is just marketing. We start with a Workflow Audit that measures your real baseline, so the result we report later is a number you can verify - not a feeling.",
      },
    ],
  },
];
