/**
 * posts.ts - typed blog content (no MDX dependency). Each post is structured
 * data so the blog index + /blog/[slug] render without extra tooling.
 *
 * TODO(client): these four articles are DRAFTS for review - edit freely or
 * replace. `date` is ISO (YYYY-MM-DD); newest first drives ordering.
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
};

export const posts: Post[] = [
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
