/**
 * Security and Compliance page copy (spec 7.4). URL: /security
 *
 * This page will be read slowly and carefully by someone whose professional
 * licence depends on getting it right. Write plainly, claim nothing that is not
 * true, and give her something she can use - the engagement letter wording.
 *
 * THE SINGLE MOST IMPORTANT RULE ON THIS PAGE (spec 7.4):
 * Do not claim any certification the client does not hold. No SOC 2, no
 * ISO 27001, no AICPA badge, no "GDPR certified" - which does not exist as a
 * thing anyway. Describing real controls honestly is more persuasive to an
 * accountant than a logo she cannot verify.
 *
 * EVERY LINE in `people`, `access` and `physical` is a factual claim about how
 * the firm actually operates. Each must be verified with the client before
 * launch, and any line that is not true must be DELETED, not softened. A
 * single inaccurate control statement here is a serious problem if a client
 * ever relies on it.
 */

import { site } from "@/lib/site";
import { securitySettings } from "@/lib/settings";
import { routes } from "@/content/global";

export const header = {
  h1: "How we protect your clients’ data.",
  intro:
    "You are responsible for your clients’ confidential information, and no outsourcing arrangement changes that. This page sets out exactly what we do, what we require of our people, what our agreements cover, and what we do not claim. If you need something here in writing for your own file, ask us and we will send it.",
} as const;

/* --- Section 2: The core principle (7.4.3) ------------------------ */

export const corePrinciple = {
  h2: "Your clients’ data stays in your systems.",
  paragraphs: [
    "This is the design decision everything else follows from. Your bookkeeper does not receive files to work on. They log into your accounting software, your document portal and your email system with their own named account, which you create and you can switch off in one click.",
    "We do not host your clients’ data. We do not keep a copy of it. We do not have an administrator account on your systems. Nothing sits on our servers, because there is nothing for our servers to hold.",
    "The practical consequence: if you ended the arrangement this afternoon, you would remove one user account and the data would never have moved.",
  ],
} as const;

/* --- Section 3: People controls (7.4.4) -------------------------- */

export const people = {
  h2: "The people.",
  items: [
    "Background verification before hire: identity, address, education and previous employment.",
    "Reference checks with at least one previous employer.",
    "A signed confidentiality and non-disclosure agreement, on joining, that covers your firm and your clients by name once you are a client.",
    "Annual security and confidentiality training, with a written test they must pass.",
    "A signed acceptable-use policy covering devices, email, cloud storage and personal accounts.",
    "Access only to the clients you have specifically assigned. Nobody at tryACOwork browses your client list.",
    "On leaving, access is revoked the same day and the confidentiality obligation continues indefinitely.",
  ],
} as const;

/* --- Section 4: Access controls (7.4.5) -------------------------- */

export const access = {
  h2: "The access.",
  items: [
    "Named individual accounts only. No shared logins, ever, for any system.",
    "You set the permission level, and we will tell you the minimum level the work needs so you can grant no more than that.",
    "Multi-factor authentication on every account that supports it, and we will ask you to require it.",
    "A password manager is mandatory for our team. Credentials are never shared over email or chat.",
    "Access is reviewed with you every quarter, and we will send you the list of who has access to what.",
    "Any access no longer needed is removed within one business day of the work ending.",
  ],
} as const;

/* --- Section 5: Physical and device controls (7.4.6) ------------- */

export const physical = {
  h2: "The office and the machines.",
  items: [
    "Work happens only in our office, on company-owned machines. No personal laptops and no working from home on client data.",
    "Access-controlled entry to the work area, and CCTV in common areas.",
    "USB and external storage ports disabled at the operating system level.",
    "Local file downloads and local saving blocked; cloud sync clients for personal accounts blocked.",
    "Personal mobile phones are not permitted at the desk.",
    "Printing is disabled by default and enabled only for a specific approved purpose.",
    "Full disk encryption, managed antivirus, and enforced screen locking after five minutes.",
    "Automatic operating system and browser updates, centrally managed.",
    "A backup internet connection and backup power, so a local outage does not become your problem.",
  ],
} as const;

/* --- Section 6: Contracts (7.4.7) -------------------------------- *
 * The insurance item is omitted until the client confirms cover is in place.
 * Spec 7.4.7: if it is not yet in place, delete the item entirely rather than
 * writing something vague - firms will ask on the call anyway.           */

export const contracts = {
  h2: "What you sign, and what it covers.",
  items: [
    {
      h4: "A service agreement between your firm and ours",
      body: "Covers the scope of work, the fee, the notice period, confidentiality, data protection obligations, and our commitment not to subcontract any part of your work to another provider.",
    },
    {
      h4: "A confidentiality agreement covering your clients",
      body: "Your bookkeeper and their team lead are individually bound in respect of your firm and your clients, not just in respect of us.",
    },
    {
      h4: "A data processing agreement, if you want one",
      body: "Available on request, setting out what we process, on whose instruction, and for how long - which in our case is nothing retained. Useful if any of your clients have European or Californian data-protection obligations.",
    },
  ],
} as const;

/**
 * Set a real cover description in /admin to publish the insurance item, e.g.
 * "Professional indemnity and cyber liability cover of $X, held with Y."
 * Empty means the item does not appear at all - which is the honest default,
 * and what spec 7.4.7 asks for: delete it rather than write something vague.
 */
export const insuranceStatement = securitySettings.insuranceStatement;

/* --- Section 7: Your professional obligations (7.4.8) ------------ *
 * The section that makes the page genuinely useful, and the reason a firm
 * owner will bookmark or share it. Careful and correctly hedged: the "not
 * legal advice" line stays at the TOP, not buried at the bottom.
 *
 * CO-08 adds two blocks: A2 on the firm's quality management system, and C2 on
 * what does not apply to us. Both carry a visible [CONFIRM WITH US CPA] marker
 * which MUST be resolved before launch and MUST NOT ship.
 *
 * CO-10 goes further: no statement on this site about what the AICPA Code, the
 * PCAOB, the Statements on Quality Management Standards or the Internal Revenue
 * Code requires may go live without written sign-off from a named US CPA. That
 * covers every block in this section, plus Home FAQ answer 3 and the FAQ below.
 * The name and date go in the handover.                                   */

export const obligations = {
  h2: "What the professional standards require of you.",
  intro:
    "This is a summary written to be useful, not legal advice. Confirm your own position with your professional adviser or your state board.",
  blocks: [
    {
      h4: "For bookkeeping work",
      body: "The AICPA Code of Professional Conduct addresses the use of third-party service providers, principally at ET Section 1.150.040, which deals with informing the client that a third party may be used, and ET Section 1.700.040, which deals with either having a confidentiality agreement with the provider or obtaining the client’s specific consent. In broad terms, a firm using an outside provider is expected to inform its clients that a third-party provider may be used, and to take reasonable steps to ensure the provider maintains the confidentiality of client information. Most firms satisfy this with one sentence in the engagement letter and a confidentiality agreement with the provider. We can sign whatever confidentiality terms your firm requires, and we will sign both if you would prefer.",
    },
    {
      // CO-08: new block A2, between the bookkeeping and tax blocks.
      h4: "For your firm’s quality management system",
      body: "Statements on Quality Management Standards No. 1 requires a firm’s system of quality management to address resources obtained from external providers. In practice that means the provider you use should be something your firm can describe, document and evidence, not just an arrangement that happens to exist. So we will give you a written supervision and confidentiality protocol you can put straight into your own file. It covers who reviews the work, how access is granted and removed, what we keep and for how long, and who to call if something goes wrong. Ask for it on the call and we will send it before you sign anything.",
      /** Resolve before launch. MUST NOT ship. */
      confirmWithCpa: true,
    },
    {
      h4: "For tax return preparation",
      body: "The rules are stricter. Internal Revenue Code Section 7216 makes unauthorised disclosure of tax return information an offence, and the regulations under it - Treasury Regulation Section 301.7216-3 - require the taxpayer’s signed consent before tax return information is disclosed to a preparer located outside the United States. For individual Form 1040 returns the IRS prescribes the exact consent wording, in Revenue Procedure 2013-14. We do not prepare tax returns, so this does not apply to our work - but if you are considering offshoring tax preparation to anyone, that consent requirement is the first thing to understand.",
    },
    {
      h4: "What never transfers",
      // CO-08 appends the final sentence.
      body: "Responsibility for the work your firm issues stays with your firm. No provider can take it on, and any provider who implies otherwise is telling you something that is not true. Your bookkeeper prepares; you review, you decide, you sign. It is also why we publish a list of the things we will not do, on the Services page. If a piece of work would need us to reach a conclusion rather than prepare the file behind it, we will say so and decline it.",
    },
    {
      // CO-08: new block C2, between "what never transfers" and the wording.
      h4: "What does not apply to us",
      body: "PCAOB registration requirements and the Form AP naming threshold apply to audits of public companies. That is not work we touch. If your firm audits public companies and you are considering offshore support for that work, those rules are the first thing to look at, and they sit outside what we do.",
      /** Resolve before launch. MUST NOT ship. */
      confirmWithCpa: true,
    },
  ],
  wording: {
    h4: "Wording you are welcome to use",
    text: "We may use third-party service providers, including providers located outside the United States, to assist in performing bookkeeping and accounting services for you. We remain responsible for all services provided to you. We require any such provider to maintain the confidentiality of your information and to use it only for the purpose of performing services for our firm.",
    after:
      "Copy that, put it in your engagement letter, and have your own adviser confirm it fits your state and your practice.",
  },
} as const;

/* --- Section 8: What we do not claim (7.4.9) --------------------- *
 * Counter-intuitive and highly effective, because every competitor does the
 * opposite. Delete or amend a line the moment it stops being true.
 *
 * TWO RULES ADDED BY CO-09, both enforced by `npm run qa`:
 *
 * MUST NOT use the word "compliant" anywhere on the site in relation to a
 * security framework. There is no such thing as being ISO 27001 compliant - a
 * firm holds a certificate or it does not, and this buyer knows the difference.
 *
 * MUST, when a certification is achieved: the honest line is NOT replaced with
 * the single word "certified". It is replaced with the framework name, the
 * certificate number, the name of the certifying body and the date. Anything
 * less is weaker than the honest line it replaced.
 *
 * And from CO-10: MUST NOT state or imply that tryACOwork holds, or is working
 * toward, any certification unless the client has confirmed it in writing.
 * "Working toward ISO 27001" is a claim, not a plan.                     */

export const notClaimed = {
  h2: "What we do not claim.",
  intro:
    "We are a young firm and we would rather tell you what we have not got than let you assume.",
  items: [
    "We do not hold a SOC 2 report yet.",
    "We are not ISO 27001 certified.",
    "We have not been audited by a third party against a security framework.",
    "We do not claim a zero-incident history stretching back a decade, because we have not been operating for a decade.",
  ],
  closing:
    "What we can do is show you the office on a video call, walk you through the controls above, sign your confidentiality terms, and let you set the access level yourself. If a provider’s certification is a hard requirement for your firm or your insurer, tell us on the call and we will say plainly whether we meet it.",
} as const;

/* --- Section 9: FAQ for this page (7.4.10) ---------------------- */

export const faqHeading = "Questions about security.";

export const faqs = [
  {
    q: "Can I restrict which clients they can see?",
    a: "Yes, and you should. Grant access per client, at the minimum permission level the work needs. We will tell you what that minimum is for each software package.",
  },
  {
    q: "What happens if there is a security incident?",
    a: "We tell you the same day we learn of it, in writing, with what we know and what we are doing. We would rather report something that turns out to be nothing than have you hear about it later.",
  },
  {
    q: "Do you use AI tools on our clients’ data?",
    /** [CONFIRM WITH CLIENT] This question is asked constantly and the page
     *  needs a real answer. The wording below is the specification's suggested
     *  answer and must be confirmed as accurate before launch. */
    a: "Not on client data. Our team may use AI tools for their own learning and for drafting internal documents, but client financial data is not entered into public AI tools. If you want that stated in the service agreement, we will put it there.",
  },
  {
    q: "Will you sign our own NDA and our own security addendum?",
    a: "Yes. Send them across before the call if you like, and we will have them reviewed by the time we speak.",
  },
] as const;

export const closingLink = {
  label: "Book a 20-minute call",
  href: routes.bookACall,
  contactEmail: site.email,
} as const;
