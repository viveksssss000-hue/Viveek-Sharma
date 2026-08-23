/**
 * About page copy (spec 7.5). URL: /about
 *
 * The page's job: make the buyer feel she knows who she is dealing with. In a
 * market of anonymous offshore providers with stock photography, a real founder
 * with a real face and a real reason for starting the firm is a competitive
 * advantage. This page should read like a person wrote it, because a person did.
 *
 * WHY PART OF THIS PAGE IS DELIBERATELY EMPTY (spec 7.5.1):
 * The founder story cannot be written by anyone other than the founder, and a
 * generic version would defeat the purpose of the page. It stays empty until
 * the founder writes it in /admin. The page renders the brief in its place and
 * the handover script lists it - but this page should not go live like that.
 */

import { aboutSettings } from "@/lib/settings";
import { site } from "@/lib/site";
import { routes } from "@/content/global";

export const header = {
  h1: "A small firm, built for small firms.",
  intro:
    "tryACOwork exists because US accounting firms have more work than people, and because there are excellent accountants in India who want to do that work properly, for one firm, for years.",
} as const;

/* --- Why we started ---------------------------------------------- *
 * 150 to 250 words in the founder's own voice, answering three things: what they
 * did before this, the specific moment or observation that led to starting
 * tryACOwork, and what they think most offshore providers get wrong. Specific
 * beats polished.                                                       */

export const whyWeStarted = {
  h2: "Why we started",
  founderStory: aboutSettings.founderStory,
  brief: [
    "What they did before this.",
    "The specific moment or observation that led to starting tryACOwork.",
    "What they think most offshore providers get wrong.",
  ],
} as const;

/* --- What we believe --------------------------------------------- */

export const beliefs = {
  h2: "What we believe",
  items: [
    {
      title: "One firm per person.",
      body: "A bookkeeper who works for five firms belongs to none of them. Ours work for one, learn how it likes things done, and stay.",
    },
    {
      title: "Publish the price.",
      body: "If we cannot say what we charge on our own website, something is wrong with the answer.",
    },
    {
      title: "Show the person.",
      body: "You are hiring a human being. You should meet them before you commit, not after.",
    },
    {
      title: "Never take the review.",
      body: "Your firm signs the work, so your firm reviews the work. We will never suggest a shortcut around that.",
    },
    {
      title: "Say the hard thing early.",
      body: "If we are not right for your firm, the honest place to say so is the first call, not month three.",
    },
  ],
} as const;

/* --- Where we are ------------------------------------------------ *
 * The team-size sentence is one the client writes, e.g. "There are nine of us
 * today." A small honest number is more credible than silence, and far more
 * credible than an inflated one - so when it is missing, the sentence is simply
 * absent rather than hedged.                                              */

export const whereWeAre = {
  h2: "Where we are",
  paragraphs: [
    [
      `We are in ${site.officeCity}, India, in our own office.`,
      site.teamSizeStatement,
      "We work early Indian hours so that our mornings overlap your mornings.",
    ]
      .filter(Boolean)
      .join(" "),
    "You are welcome to see it. Ask on the call and we will walk you around the office on video, or you can visit if you are ever in India.",
  ],
} as const;

/* --- The founder ------------------------------------------------- *
 * A signature under the story, not a profile card.
 *
 * The portrait and the two-line biography were removed at the client's request:
 * both were placeholders waiting on a photograph that does not exist yet. The
 * name stays, because the story is written in the first person and an unsigned
 * "I" is weaker than no story at all.
 *
 * The name and role come from settings, so changing who the site presents as
 * founder is one edit in /admin - it flows to the signature, the Person
 * structured data, the blog author block and the autoresponder signatures at
 * once.                                                                  */
export const founder = {
  name: site.founder.name,
  role: site.founder.role,
} as const;

/* --- How we hire ------------------------------------------------- *
 * This replaced a team section of photographs and job titles, at the client's
 * request.
 *
 * It is the better use of the space anyway. Spec 2.2 puts "Will the work be any
 * good?" first among the five objections, and names what she needs to see:
 * named qualifications, US-specific training, and a named reviewer in the
 * process. A grid of faces does not answer that; the hiring bar does. And About
 * is the page where a person answers it in their own voice.
 *
 * Every line here is a claim already made elsewhere on the site - the hiring
 * standard from spec 7.1.6, the checks from 7.4.4, the process from 7.3.3 - so
 * this section introduces nothing new to verify. It deliberately makes no
 * retention claim: spec 3.7 bans those until they are true and measurable, so
 * the copy describes the arrangement and lets the reader draw the conclusion.  */

export const howWeHire = {
  h2: "How we hire",
  intro:
    "The honest answer to “will the work be any good?” is not a promise, it is a hiring bar and a review step. Here is both.",
  before: {
    h4: "Before anyone joins us",
    items: [
      "A commerce graduate - B.Com or M.Com - who has already worked on US books. We do not train people on your clients.",
      "Interviewed in English, because they will work in English all day, every day.",
      "Background verification: identity, address, education and previous employment.",
      "Reference checks with at least one previous employer.",
      "A signed confidentiality agreement before they see anything at all.",
    ],
  },
  after: {
    h4: "Once they do",
    items: [
      "They are our employee, on our payroll, at a desk in our office. Not a freelancer, and never subcontracted.",
      "They work for one firm. Not five, which is the reason offshore bookkeeping usually fails.",
      "A senior team lead reviews their work before it reaches you, and then you review it.",
      "Ongoing US GAAP and software training, on our time and at our cost.",
      "We carry their salary, benefits, equipment, leave cover and replacement, so none of it lands on you.",
    ],
  },
  closing:
    "And then you choose. We send two or three profiles, you interview them yourself by video, and if none of them are right we go again at no cost and no obligation. You are hiring a person, so you should be the one who says yes.",
} as const;

/* --- Being a new firm -------------------------------------------- *
 * The elephant on an About page for a firm with no client list, answered
 * instead of avoided.
 *
 * This is the same move the Security page makes in spec 7.4.9 with "What we do
 * not claim", which the specification calls counter-intuitive and highly
 * effective because every competitor does the opposite. The research behind the
 * spec found the whole category claiming trust with badges and large counters, so
 * saying the quiet part out loud is the one thing a new firm can do that a firm
 * of a thousand people cannot copy.
 *
 * No numbers are claimed here - no team size, no client count, no capacity
 * limit - because none of those are confirmed and spec 3.7 bans them until they
 * are. The honesty does the work instead.                                   */

export const newFirm = {
  h2: "We are new. Here is what that costs you, and what it buys you.",
  intro:
    "You are going to notice we have no client logos and no counter on the home page. We would rather explain that than decorate around it.",
  buys: {
    h4: "What being new buys you",
    items: [
      "You will not be client four hundred. When something goes wrong you will be talking to the people who can fix it.",
      "We have no template to protect, so the process gets built around how your firm already works rather than the other way round.",
      "We publish our prices, our onboarding timeline and our service commitments, because we have no scale to point at instead. That transparency is not generosity, it is what we have.",
      "One firm per bookkeeper is a promise we can still keep. It gets harder to keep the bigger a provider gets, which is why most stop keeping it.",
    ],
  },
  costs: {
    h4: "What it costs you",
    items: [
      "No decade of case studies to read. What we offer instead is twenty hours of real work on your real books, free, which tells you more than a case study would.",
      "No SOC 2 report. We say exactly what we do and do not hold on our security page rather than implying otherwise.",
      "If you need a large team at short notice, we are not the right firm yet. We will tell you that on the call, not in month three.",
    ],
  },
  closing:
    "If a long client list is what you need to see before you commit, we are not there yet and we will not pretend to be. If what you need is one person doing your books properly from the first month, that we can do now.",
  links: {
    security: { label: "what we do and do not claim", href: routes.security },
    pilot: { label: "the free 20-hour pilot", href: routes.freePilot },
  },
} as const;

export const closing = {
  linkLabel: "Book a 20-minute call",
  linkHref: routes.bookACall,
} as const;
