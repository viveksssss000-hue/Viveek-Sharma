/**
 * Automated part of the launch QA checklist (spec 13).
 *
 *   node scripts/qa.mjs [baseUrl]
 *
 * Checks the things a machine can check reliably, so the human review can spend
 * its time on the things it cannot: copy, photographs, and whether the numbers
 * on the page are true.
 *
 * What it verifies, and the spec section each comes from:
 *   13.1  no placeholder text left in the rendered HTML; no banned words
 *   13.2  every internal link resolves; the 404 returns a real 404
 *    5.2  every URL the previous site published still resolves, permanently
 *         and in a single hop
 *    9.2  the live domain is indexable - no noindex header, meta tag or
 *         blanket robots.txt disallow
 *   13.3  no horizontal scrolling at 360, 390, 768, 1024, 1280, 1440
 *   13.5  one H1 per page, no skipped heading levels, alt text on every image,
 *         a label for every form field, a skip link, correct landmarks,
 *         44px minimum touch targets
 *   13.6  unique title and meta description, canonical, Open Graph, JSON-LD
 *    9.3  JavaScript budget under 100KB compressed
 *          the favicon exists, is the brand mark, and is a square multiple of
 *          48px so Google will actually use it
 *    4.2  H1 never more than two lines on desktop
 *
 * Change order 01, CO-16 adds fifteen more:
 *  - the restricted words "audit"/"workpaper" appear only where approved
 *  - the banned ACO expansion appears nowhere, including meta and JSON-LD
 *  - "compliant" is never used about a security framework
 *  - the two reserved URLs 404 and appear in no sitemap, nav or footer
 *  - the Services exclusions list matches CO-02 word for word
 *  - Home FAQ answer 10 matches CO-17, and its FAQPage data mentions no audit
 *  - the US-hours premium figure is identical in both the places it appears
 *  - the comparison table's annual figure equals the monthly price times twelve
 *
 * Exit code is non-zero if any FAIL is reported, so this can gate a deploy.
 */
import fs from "node:fs/promises";
import nodePath from "node:path";
import { gzipSync } from "node:zlib";

import puppeteer from "puppeteer-core";

const BASE = process.argv[2] ?? "http://localhost:3210";

const CHROME_PATHS = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
];

const ROUTES = [
  "/",
  "/bookkeeping-and-accounting-services",
  "/hire-dedicated-staff",
  "/bookkeeping-services-for-cpa-firms",
  "/how-it-works",
  "/security",
  "/about",
  "/book-a-call",
  "/free-pilot",
  "/blog",
  "/privacy-policy",
  "/terms",
  "/thank-you",
  "/thank-you-call",
];

const WIDTHS = [360, 390, 768, 1024, 1280, 1440];

/** Words that must never appear on the site (Appendix C.1). */
const BANNED = [
  "leverage", "synergy", "seamless", "cutting-edge", "best-in-class",
  "world-class", "one-stop shop", "end-to-end solution", "unlock", "empower",
  "passionate about", "revolutionary", "game-changing", "next-generation",
  "robust", "utilise", "going forward", "at the end of the day",
  "human capital", "reach out", "circle back", "low-hanging fruit",
  "needless to say", "lorem ipsum",
];

/** Placeholder markers that must be gone before launch (spec 13.1). */
const PLACEHOLDERS = ["[CONFIRM", "TODO(", "PLACEHOLDER", "Photograph needed", "coming soon"];

/**
 * CO-16: the words "audit", "audits", "auditing", "auditor" and "auditors" may
 * appear on the fourteen launch pages ONLY inside these five approved strings.
 * Anything else is a leak from an earlier draft. Blog articles are exempt -
 * article 15's title legitimately contains the word.
 */
const APPROVED_AUDIT_CONTEXTS = [
  // (a) the Services page exclusions list
  "Making audit judgements",
  // (b) the "what does not apply to us" block on /security
  "apply to audits of public companies",
  "if your firm audits public companies",
  // (c) the honest line on /security
  "We have not been audited by a third party",
  // (d) the BLS source line, wherever the comparison table appears
  "bookkeeping, accounting and auditing clerks",
  // (e) the Wall Street Journal statistic
  "US accountants and auditors left their jobs",
  // (f) the scope block's not-included list, on Home and Services
  "including audit opinions",
];

/**
 * Every URL the previous site published in its sitemap, plus the two sub-page
 * families it linked internally.
 *
 * Taken from that build's own sitemap.xml rather than from memory, so the list
 * is what Google was actually told about. Each must answer 200 or redirect in
 * one hop - a 404 here is a URL Google has indexed, still shows the old
 * business for, and will eventually drop along with whatever links pointed at
 * it. Not listed in the old sitemap but included anyway: /blog/where-the-week-goes,
 * which existed as a page, and the root.
 */
const LEGACY_URLS = [
  "/",
  "/about",
  "/blog",
  "/blog/ai-workflow-automation-vs-zapier",
  "/blog/automate-lead-follow-up-without-a-developer",
  "/blog/how-much-time-does-ai-automation-save",
  "/blog/tasks-your-ops-team-should-not-do-manually",
  "/blog/where-the-week-goes",
  "/book-a-demo",
  "/contact",
  "/cookies",
  "/examples",
  "/how-it-works",
  "/industries",
  "/industries/customer-support",
  "/industries/ecommerce",
  "/industries/marketing-agencies",
  "/industries/operations-logistics",
  "/industries/recruiting-hr",
  "/pricing",
  "/privacy",
  "/results",
  "/security",
  "/services",
  "/services/continuous-optimization",
  "/services/custom-ai-workflows",
  "/services/integration-handoff",
  "/services/workflow-audit",
  "/terms",
  "/thank-you/contact",
  "/thank-you/demo",
];

/** CO-05: reserved for a later phase. Must 404 and appear nowhere. */
const RESERVED_PATHS = ["/audit-support-for-cpa-firms", "/us-gaap-ifrs"];

/** CO-07: the ACO expansion is internal only and must appear nowhere. */
const BANNED_PHRASE = "Accounting and Compliance Outsourcing";
const BANNED_PHRASE_AMP = "Accounting & Compliance Outsourcing";

/** CO-02: the exclusions list, which blog article 22 must also match. */
const EXCLUSION_ITEMS = [
  "Tax return preparation or review",
  "Signing off on anything",
  "Reaching accounting conclusions",
  "Making audit judgements",
  "Talking to your clients",
  "Holding your clients",
  "Going around your firm to your clients",
];

/** Spec 9.1: total JavaScript shipped to the browser, compressed. */
const JS_BUDGET_KB = 100;

const results = [];
const record = (level, route, message) =>
  results.push({ level, route, message });

/**
 * The gzipped weight of the scripts a page's HTML references. Read from the
 * build output on disk, so it is the real compressed transfer size rather than
 * whatever the local server happens to do about compression.
 */
async function measureInitialJsKb(route) {
  try {
    const html = await (await fetch(BASE + route)).text();
    const srcs = [
      ...new Set(
        [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1])
      ),
    ];
    const buffers = [];
    for (const src of srcs) {
      if (!src.startsWith("/_next/")) continue;
      const file = nodePath.join(".next", src.replace(/^\/_next\//, ""));
      try {
        buffers.push(await fs.readFile(file));
      } catch {
        /* a chunk we cannot resolve on disk */
      }
    }
    if (buffers.length === 0) return 0;
    return Math.round(gzipSync(Buffer.concat(buffers)).length / 1024);
  } catch {
    return 0;
  }
}

async function findChrome() {
  for (const candidate of CHROME_PATHS) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      /* next */
    }
  }
  throw new Error("No Chrome or Edge found.");
}

const browser = await puppeteer.launch({
  executablePath: await findChrome(),
  headless: true,
  args: ["--hide-scrollbars", "--disable-gpu"],
});

/* ------------------------------------------------------------------ */
/* Per-route structural and accessibility checks                       */
/* ------------------------------------------------------------------ */

const seenTitles = new Map();
const seenDescriptions = new Map();
const internalLinks = new Set();

for (const route of ROUTES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const response = await page.goto(`${BASE}${route}`, {
    waitUntil: "networkidle0",
    timeout: 45000,
  });

  if (response?.status() !== 200) {
    record("FAIL", route, `HTTP ${response?.status()}`);
    await page.close();
    continue;
  }

  const audit = await page.evaluate(() => {
    const text = document.body.innerText;

    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(
      (element) => ({
        level: Number(element.tagName[1]),
        text: element.textContent?.trim().slice(0, 60) ?? "",
      })
    );

    const h1s = document.querySelectorAll("h1");
    // An h1 is a block, so getClientRects() returns one rect however many lines
    // it wraps to. Height divided by line-height is what actually counts lines.
    const h1LineCount = (() => {
      const h1 = h1s[0];
      if (!h1) return 0;
      const style = getComputedStyle(h1);
      const lineHeight = parseFloat(style.lineHeight);
      if (!lineHeight) return 0;
      return Math.round(h1.getBoundingClientRect().height / lineHeight);
    })();

    const imagesMissingAlt = [...document.querySelectorAll("img")].filter(
      (img) => !img.hasAttribute("alt")
    ).length;

    const fieldsMissingLabel = [
      ...document.querySelectorAll("input,select,textarea"),
    ].filter((field) => {
      if (field.type === "hidden") return false;
      if (field.closest('[aria-hidden="true"]')) return false; // honeypot
      const id = field.getAttribute("id");
      const labelled =
        (id && document.querySelector(`label[for="${id}"]`)) ||
        field.closest("label") ||
        field.getAttribute("aria-label") ||
        field.getAttribute("aria-labelledby");
      return !labelled;
    }).length;

    // Interactive elements smaller than the 44px minimum touch target.
    const smallTargets = [
      ...document.querySelectorAll("a,button,input,select,textarea,[role=button]"),
    ]
      .filter((element) => {
        if (element.closest('[aria-hidden="true"]')) return false;

        const style = getComputedStyle(element);
        if (style.display === "none" || style.visibility === "hidden") return false;

        const rect = element.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) return false;

        // Visually-hidden-until-focused controls (the skip link) collapse to
        // 1px by design and take their real size only when focused.
        if (rect.width <= 2 || rect.height <= 2) return false;

        // WCAG 2.2 target-size (minimum) explicitly exempts links inside a
        // sentence of text.
        if (element.tagName === "A" && style.display.includes("inline")) return false;

        // A small checkbox or radio inside a large label is fine: the label is
        // the target, and it is what a finger actually hits.
        const label = element.closest("label");
        if (label) {
          const labelRect = label.getBoundingClientRect();
          if (labelRect.height >= 44) return false;
        }

        return rect.height < 44 || rect.width < 44;
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return `${element.tagName.toLowerCase()} "${(
          element.textContent || element.getAttribute("aria-label") || ""
        )
          .trim()
          .slice(0, 30)}" ${Math.round(rect.width)}x${Math.round(rect.height)}`;
      });

    return {
      text,
      head: document.head.innerHTML,
      jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map((node) => node.textContent ?? "")
        .join(" "),
      headings,
      h1Count: h1s.length,
      h1Text: h1s[0]?.textContent?.trim() ?? "",
      h1LineCount,
      imagesMissingAlt,
      fieldsMissingLabel,
      smallTargets,
      title: document.title,
      description:
        document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
      canonical:
        document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
      ogTitle:
        document.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? "",
      ogImage:
        document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "",
      robots:
        document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "",
      jsonLdCount: document.querySelectorAll('script[type="application/ld+json"]').length,
      lang: document.documentElement.lang,
      landmarks: {
        header: document.querySelectorAll("body > header").length,
        main: document.querySelectorAll("main").length,
        footer: document.querySelectorAll("body > footer").length,
        nav: document.querySelectorAll("nav").length,
      },
      skipLink: (() => {
        const first = document.querySelector("body a");
        return first?.getAttribute("href") === "#main";
      })(),
      links: [...document.querySelectorAll("a[href^='/']")].map((a) =>
        a.getAttribute("href")
      ),
    };
  });

  // --- Headings ---
  if (audit.h1Count !== 1)
    record("FAIL", route, `${audit.h1Count} H1 elements (must be exactly 1)`);

  if (audit.h1LineCount > 2)
    record(
      "WARN",
      route,
      `H1 wraps to ${audit.h1LineCount} lines at 1440px (spec 4.2.2: never more than two on desktop) - "${audit.h1Text}"`
    );

  let previous = 0;
  for (const heading of audit.headings) {
    if (previous && heading.level > previous + 1)
      record(
        "FAIL",
        route,
        `heading level jumps h${previous} -> h${heading.level} at "${heading.text}"`
      );
    previous = heading.level;
  }

  // --- Accessibility ---
  if (audit.imagesMissingAlt)
    record("FAIL", route, `${audit.imagesMissingAlt} image(s) without an alt attribute`);
  if (audit.fieldsMissingLabel)
    record("FAIL", route, `${audit.fieldsMissingLabel} form field(s) without a label`);
  if (audit.smallTargets.length)
    record(
      "WARN",
      route,
      `${audit.smallTargets.length} interactive element(s) under 44px: ${audit.smallTargets.join("; ")}`
    );
  if (!audit.skipLink)
    record("FAIL", route, "the first focusable element is not the skip link");
  if (audit.lang !== "en-US")
    record("FAIL", route, `html lang is "${audit.lang}", expected en-US`);
  if (audit.landmarks.main !== 1)
    record("FAIL", route, `${audit.landmarks.main} <main> landmarks (must be 1)`);
  if (audit.landmarks.header !== 1)
    record("FAIL", route, `${audit.landmarks.header} top-level <header> (must be 1)`);
  if (audit.landmarks.footer !== 1)
    record("FAIL", route, `${audit.landmarks.footer} top-level <footer> (must be 1)`);

  // --- SEO ---
  if (!audit.title) record("FAIL", route, "no title tag");
  const titleOwner = seenTitles.get(audit.title);
  if (titleOwner) record("FAIL", route, `title duplicates ${titleOwner}`);
  seenTitles.set(audit.title, route);

  if (!audit.description) record("FAIL", route, "no meta description");
  else {
    const descOwner = seenDescriptions.get(audit.description);
    if (descOwner) record("FAIL", route, `meta description duplicates ${descOwner}`);
    seenDescriptions.set(audit.description, route);
    if (audit.description.length > 165)
      record("WARN", route, `meta description is ${audit.description.length} chars`);
  }

  if (!audit.canonical) record("FAIL", route, "no canonical link");
  else if (!audit.canonical.startsWith("http"))
    record("FAIL", route, `canonical is not absolute: ${audit.canonical}`);

  if (!audit.ogTitle) record("FAIL", route, "no og:title");
  if (!audit.ogImage) record("WARN", route, "no og:image");

  const shouldBeNoindex = route.startsWith("/thank-you");
  const isNoindex = audit.robots.includes("noindex");
  if (shouldBeNoindex && !isNoindex)
    record("FAIL", route, "should be noindex but is not");
  if (!shouldBeNoindex && isNoindex)
    record("FAIL", route, "is noindex but should be indexable");

  if (audit.jsonLdCount === 0) record("WARN", route, "no JSON-LD on the page");

  // --- Copy hygiene ---
  // The client asked for plain hyphens throughout, not em or en dashes. Easy to
  // reintroduce by accident when copy is pasted from a document, so it is
  // checked rather than remembered.
  const dashes = [...audit.text.matchAll(/[—–]/g)];
  if (dashes.length) {
    const sample = audit.text
      .slice(
        Math.max(0, (dashes[0].index ?? 0) - 40),
        (dashes[0].index ?? 0) + 40
      )
      .replace(/\s+/g, " ");
    record(
      "FAIL",
      route,
      `${dashes.length} em/en dash(es) - use a plain hyphen. Near: "...${sample}..."`
    );
  }

  // The brand name is written tryACOwork everywhere, matching the logo - and it
  // stays lower-case at the start of a sentence. This catches the spellings that
  // creep back in: the specification's own "Tryacowork", a shouted version, and
  // a stray capital T. Case-sensitive on purpose, so the all-lower-case domain
  // and email address do not trip it.
  for (const wrong of [
    /Tryacowork/,
    /TRYACOWORK/,
    /TryACOwork/,
    /Try a cowork/i,
  ]) {
    const found = audit.text.match(wrong);
    if (found) {
      const at = audit.text.indexOf(found[0]);
      const near = audit.text
        .slice(Math.max(0, at - 40), at + 40)
        .replace(/\s+/g, " ");
      record(
        "FAIL",
        route,
        `brand name written "${found[0]}" - it is always tryACOwork. Near: "...${near}..."`
      );
      break;
    }
  }

  /* ---- CO-16: restricted words -------------------------------------- */

  // The blog is exempt: article 15's title legitimately contains "audit".
  const isBlog = route === "/blog" || route.startsWith("/blog/");

  if (!isBlog) {
    const auditHits = [...audit.text.matchAll(/audit(s|ing|or|ors)?/gi)];
    const unapproved = auditHits.filter((hit) => {
      const at = hit.index ?? 0;
      const window = audit.text.slice(Math.max(0, at - 60), at + 60);
      return !APPROVED_AUDIT_CONTEXTS.some((ok) => window.includes(ok));
    });
    if (unapproved.length) {
      const at = unapproved[0].index ?? 0;
      const near = audit.text
        .slice(Math.max(0, at - 50), at + 50)
        .replace(/\s+/g, " ");
      record(
        "FAIL",
        route,
        `${unapproved.length} unapproved use(s) of "audit" (CO-16). Near: "...${near}..."`
      );
    }

    if (/workpapers?/i.test(audit.text))
      record("FAIL", route, 'the word "workpaper" appears on a launch page (CO-16)');
  }

  // CO-07: the banned phrase, in visible text AND in the head.
  if (
    audit.text.includes(BANNED_PHRASE) ||
    audit.text.includes(BANNED_PHRASE_AMP) ||
    audit.head.includes(BANNED_PHRASE) ||
    audit.head.includes(BANNED_PHRASE_AMP)
  ) {
    record(
      "FAIL",
      route,
      `"${BANNED_PHRASE}" appears on the page or in its metadata (CO-07)`
    );
  }

  // CO-09: no framework is ever described as "compliant".
  const compliantHit = audit.text.match(
    /(compliant)[^.]{0,60}|(?:ISO\s*27001|SOC\s*2|GDPR|framework)[^.]{0,40}compliant/i
  );
  if (compliantHit) {
    record(
      "FAIL",
      route,
      `"compliant" used near a framework (CO-09): "${compliantHit[0].trim().slice(0, 60)}"`
    );
  }

  const lower = audit.text.toLowerCase();
  for (const word of BANNED) {
    if (lower.includes(word)) record("FAIL", route, `banned word on the page: "${word}"`);
  }
  for (const marker of PLACEHOLDERS) {
    if (audit.text.includes(marker))
      record("TODO", route, `placeholder still on the page: "${marker}"`);
  }

  // --- Performance budget (spec 9.1) ---
  // Measured as the gzipped size of the scripts the page's own HTML references,
  // NOT every script the browser fetched: Next.js speculatively prefetches the
  // route chunks for links on the page, and that is bandwidth for the next
  // navigation rather than JavaScript this page needs in order to render.
  //
  // An earlier version of this check summed Content-Length headers, which the
  // server does not always send - so it reported 0KB and silently passed. If
  // this check ever reports 0, assume it is broken rather than that the page
  // ships no JavaScript.
  const jsKb = await measureInitialJsKb(route);
  if (jsKb === 0) {
    record("FAIL", route, "could not measure the JavaScript payload - check qa.mjs");
  } else if (jsKb > JS_BUDGET_KB) {
    record(
      "BUDGET",
      route,
      `${jsKb}KB of JavaScript, gzipped (spec 9.1 budget: ${JS_BUDGET_KB}KB)`
    );
  }

  for (const link of audit.links) internalLinks.add(link.split("#")[0]);

  await page.close();
}

/* ------------------------------------------------------------------ */
/* Horizontal overflow at every required width                         */
/* ------------------------------------------------------------------ */

for (const width of WIDTHS) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900 });
  for (const route of ROUTES) {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle0", timeout: 45000 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    if (overflow > 1)
      record("FAIL", route, `${overflow}px of horizontal overflow at ${width}px`);
  }
  await page.close();
}

/* ------------------------------------------------------------------ */
/* Every internal link resolves                                        */
/* ------------------------------------------------------------------ */

{
  const page = await browser.newPage();
  for (const href of [...internalLinks].sort()) {
    if (!href || href.startsWith("//")) continue;
    const response = await page.goto(`${BASE}${href}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    const status = response?.status() ?? 0;
    if (status >= 400) record("FAIL", href, `internal link returns HTTP ${status}`);
  }
  await page.close();
}

/* ------------------------------------------------------------------ */
/* Indexability: the real domain must never be noindex                   */
/* ------------------------------------------------------------------ */

/**
 * The counterweight to the noindex rule in middleware.ts, which keeps Vercel's
 * *.vercel.app deployment URLs out of the index.
 *
 * That rule matches on a hostname suffix, so it cannot fire on a real domain -
 * but a noindex reaching production is the single most expensive mistake
 * available on a website, it is invisible in the page, and it would be found by
 * a client watching traffic disappear rather than by anyone reading code. So it
 * gets a check of its own, from both directions: the header and the meta tag.
 *
 * Skipped when NEXT_PUBLIC_STAGING is set, which is a deployment that is
 * SUPPOSED to be unindexable.
 */
if (process.env.NEXT_PUBLIC_STAGING !== "true") {
  const response = await fetch(BASE);
  const header = response.headers.get("x-robots-tag") ?? "";
  if (/noindex/i.test(header)) {
    record("FAIL", "/", `the live site sends X-Robots-Tag: ${header}`);
  }

  const html = await response.text();
  const robotsMeta = /<meta[^>]+name="robots"[^>]+content="([^"]*)"/i.exec(html);
  if (robotsMeta && /noindex/i.test(robotsMeta[1])) {
    record("FAIL", "/", `the live site has <meta name="robots" content="${robotsMeta[1]}">`);
  }

  const robotsTxt = await (await fetch(`${BASE}/robots.txt`)).text();
  if (/^\s*Disallow:\s*\/\s*$/im.test(robotsTxt)) {
    record("FAIL", "/robots.txt", "the live site disallows crawling of everything");
  }
}

/* ------------------------------------------------------------------ */
/* Legacy URLs: every URL the previous site published still resolves     */
/* ------------------------------------------------------------------ */

/**
 * Spec 5.2: a published URL must never simply disappear, and a redirect must be
 * permanent and a single hop. Chains are checked too - two hops loses PageRank
 * and is slow, and it is the usual result of adding a redirect later without
 * looking at the ones already there.
 */
{
  for (const url of LEGACY_URLS) {
    const first = await fetch(`${BASE}${url}`, { redirect: "manual" });

    if (first.status === 200) continue;

    if (first.status === 404) {
      record(
        "FAIL",
        url,
        "a URL the previous site published now 404s - it needs a redirect (spec 5.2)"
      );
      continue;
    }

    if (![301, 308].includes(first.status)) {
      record("FAIL", url, `legacy URL answers HTTP ${first.status}`);
      continue;
    }

    const target = first.headers.get("location") ?? "";
    const second = await fetch(new URL(target, BASE), { redirect: "manual" });
    if ([301, 302, 307, 308].includes(second.status)) {
      record(
        "FAIL",
        url,
        `redirect chain: ${url} -> ${target} -> ${second.headers.get("location")} (spec 5.2 allows one hop)`
      );
    } else if (second.status !== 200) {
      record("FAIL", url, `redirects to ${target}, which returns HTTP ${second.status}`);
    }
  }
}

/* ------------------------------------------------------------------ */
/* Favicon: present, the brand mark, and large enough for Google        */
/* ------------------------------------------------------------------ */

/**
 * Added after the launch showed the previous site's icon in search results and
 * in the browser.
 *
 * Two failures were possible and both were silent. /favicon.ico returned the
 * 404 page as HTML, which several crawlers read as "no icon"; and the only PNG
 * offered was 32x32, below the multiple-of-48 square Google requires before it
 * will use a favicon for a result at all - so the result showed a generic globe
 * and nothing anywhere said why.
 *
 * Neither would ever surface in a page test, which is exactly why it belongs
 * here.
 */
{
  const page = await browser.newPage();
  await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 30000 });

  const icons = await page.evaluate(() =>
    [...document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]')].map(
      (link) => ({
        rel: link.getAttribute("rel") ?? "",
        href: link.href,
        sizes: link.getAttribute("sizes") ?? "",
      })
    )
  );
  await page.close();

  if (icons.length === 0) {
    record("FAIL", "/", "the page declares no favicon at all");
  }

  // Every declared icon must actually be an image, not the 404 page.
  for (const icon of icons) {
    const response = await fetch(icon.href);
    const type = response.headers.get("content-type") ?? "";
    if (!response.ok) {
      record("FAIL", "/", `${icon.rel} ${icon.href} returns HTTP ${response.status}`);
    } else if (!type.startsWith("image/")) {
      record("FAIL", "/", `${icon.rel} ${icon.href} serves ${type}, not an image`);
    }
  }

  // /favicon.ico is the path crawlers and older clients try regardless of what
  // the markup says, so it has to resolve even though the markup is correct.
  const ico = await fetch(`${BASE}/favicon.ico`);
  const icoType = ico.headers.get("content-type") ?? "";
  if (!ico.ok || icoType.startsWith("text/")) {
    record(
      "FAIL",
      "/favicon.ico",
      `must serve an icon; got HTTP ${ico.status} ${icoType}`
    );
  }

  /**
   * Google: "your favicon must be a square that is a multiple of 48px". A
   * declared size that fails this is not an error anywhere else in the stack -
   * the icon simply goes unused in search results.
   */
  const googleUsable = icons.some((icon) => {
    if (icon.rel.includes("apple")) return false;
    const match = /^(\d+)x(\d+)$/.exec(icon.sizes.trim());
    if (!match) return false;
    const [width, height] = [Number(match[1]), Number(match[2])];
    return width === height && width % 48 === 0;
  });
  if (!googleUsable) {
    record(
      "FAIL",
      "/",
      "no favicon is a square multiple of 48px, so Google will not use one " +
        `(declared: ${icons.map((i) => i.sizes || "no size").join(", ") || "none"})`
    );
  }

  /**
   * The icon must be the brand mark, framed to be readable at 16px.
   *
   * Measured by the share of pixels carrying brand ochre. The thresholds are
   * the measured values, not guesses - `node scripts/build-icons.mjs` prints
   * the same numbers:
   *
   *   0.0%  the previous site's purple-and-teal chevron  -> wrong artwork
   *   1.6%  the brand kit's own favicon-256 framing      -> letters too small
   *   3.9%  a correctly framed 512 tile
   *   5.9%  a correctly framed 96 tile
   *
   * So below 1% means somebody shipped a different image; below 3% means the
   * mark is the right one but framed too loosely to read in a tab.
   */
  // Sharp cannot decode ICO, so measure the PNG. Both come from the same
  // source tile, so checking one is checking both.
  const iconLink = icons.find(
    (icon) => !icon.rel.includes("apple") && /\.png(\?|$)/.test(icon.href)
  );
  if (!iconLink) {
    record("WARN", "/", "no PNG favicon to inspect, so its artwork went unchecked");
  } else {
    const bytes = Buffer.from(await (await fetch(iconLink.href)).arrayBuffer());
    const { default: sharp } = await import("sharp");
    const { data, info } = await sharp(bytes)
      .resize(48, 48, { fit: "fill" })
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Brand ochre-light #e0a95c on ink #1b1a17.
    let ochre = 0;
    for (let i = 0; i < data.length; i += info.channels) {
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
      if (Math.abs(r - 0xe0) < 40 && Math.abs(g - 0xa9) < 40 && Math.abs(b - 0x5c) < 40)
        ochre += 1;
    }
    const share = ochre / (48 * 48);
    if (share < 0.01) {
      record(
        "FAIL",
        iconLink.href,
        `only ${(share * 100).toFixed(1)}% of the icon is brand ochre - this is ` +
          "probably not the tryACOwork mark"
      );
    } else if (share < 0.03) {
      record(
        "WARN",
        iconLink.href,
        `the mark fills only ${(share * 100).toFixed(1)}% of the icon - it will ` +
          "be hard to read in a tab; run npm run icons"
      );
    }
  }
}

/* ------------------------------------------------------------------ */
/* CO-05: the two reserved paths must 404 and appear nowhere            */
/* ------------------------------------------------------------------ */

{
  const page = await browser.newPage();

  for (const reserved of RESERVED_PATHS) {
    const response = await page.goto(`${BASE}${reserved}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    const status = response?.status() ?? 0;
    if (status !== 404)
      record(
        "FAIL",
        reserved,
        `reserved path returns HTTP ${status}, must be 404 (CO-05)`
      );
  }

  // Not in the sitemap.
  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  for (const reserved of RESERVED_PATHS) {
    if (sitemap.includes(reserved))
      record("FAIL", "/sitemap.xml", `contains the reserved path ${reserved} (CO-05)`);
  }

  // Not in the navigation, the mobile menu or the footer, on any page.
  await page.goto(BASE, { waitUntil: "networkidle0" });
  const navHrefs = await page.evaluate(() =>
    [...document.querySelectorAll("header a, footer a, nav a, dialog a")].map(
      (a) => a.getAttribute("href") ?? ""
    )
  );
  for (const reserved of RESERVED_PATHS) {
    if (navHrefs.some((href) => href.startsWith(reserved)))
      record("FAIL", "/", `a reserved path is linked from the nav or footer (CO-05)`);
  }

  await page.close();
}

/* ------------------------------------------------------------------ */
/* CO-02, CO-17 and CO-01: the copy the change order pins down         */
/* ------------------------------------------------------------------ */

{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // CO-02: the exclusions list, word for word.
  await page.goto(`${BASE}/bookkeeping-services-for-cpa-firms`, {
    waitUntil: "networkidle0",
  });
  const servicesText = await page.evaluate(() => document.body.innerText);
  for (const item of EXCLUSION_ITEMS) {
    if (!servicesText.includes(item))
      record(
        "FAIL",
        "/bookkeeping-services-for-cpa-firms",
        `exclusions list is missing "${item}" (CO-02)`
      );
  }
  if (servicesText.includes("Audit or assurance support"))
    record(
      "FAIL",
      "/bookkeeping-services-for-cpa-firms",
      "the removed audit/assurance exclusion is still on the page (CO-02)"
    );

  // The US-hours premium figure, and the annual figure derived from it.
  const servicesPrices = await page.evaluate(() =>
    [...document.querySelectorAll("[data-price]")].map((n) => n.textContent?.trim())
  );

  await page.goto(BASE, { waitUntil: "networkidle0" });
  const home = await page.evaluate(() => ({
    text: document.body.innerText,
    faqJson:
      [...document.querySelectorAll('script[type="application/ld+json"]')]
        .map((n) => n.textContent ?? "")
        .find((t) => t.includes("FAQPage")) ?? "",
    prices: [...document.querySelectorAll("[data-price]")].map((n) =>
      n.textContent?.trim()
    ),
  }));

  // CO-17: answer 10 is the new wording, and its structured data is clean.
  if (home.text.includes("Do you do tax returns or audit support?"))
    record("FAIL", "/", "Home FAQ answer 10 is still the old question (CO-17)");
  if (!home.text.includes("Do you do tax returns?"))
    record("FAIL", "/", "Home FAQ answer 10 is missing the CO-17 question");
  if (/audit support/i.test(home.faqJson))
    record(
      "FAIL",
      "/",
      'the FAQPage structured data still contains "audit support" (CO-16)'
    );

  // CO-16: the US-hours premium is identical in the price block and FAQ 4.
  const premiumHits = [...home.text.matchAll(/\$(\d[\d,]*) a month more per person/g)]
    .map((m) => m[1]);
  const availableFor = home.text.match(
    /available for \$(\d[\d,]*)(?: \[CONFIRM RATE\])? a month more per person/
  );
  const allPremiums = new Set([...premiumHits, availableFor?.[1]].filter(Boolean));
  if (allPremiums.size > 1)
    record(
      "FAIL",
      "/",
      `the US-hours premium differs between the price block and FAQ 4: ${[...allPremiums].join(" vs ")} (CO-16)`
    );

  // PRICING IS NOT PUBLISHED.
  //
  // This check used to run the other way: it warned when the Services page
  // carried NO price figures, because a published price was the site's single
  // strongest differentiator. The client reversed that decision in the
  // November 2026 rebrand - scope and pricing are now agreed in writing after
  // a call - so the check now fails if a figure comes BACK, which is the
  // mistake that is actually possible from here.
  //
  // "From $X" counts as publishing a price.
  const priceLike = /\$\s?\d[\d,]*/;
  for (const [route, text] of [
    ["/", home.text],
    ["/bookkeeping-services-for-cpa-firms", servicesText],
  ]) {
    const hit = text.match(priceLike);
    if (hit)
      record(
        "FAIL",
        route,
        `a price figure is published ("${hit[0]}"), but pricing is quoted after a call`
      );
  }

  if (home.prices.length || servicesPrices.length)
    record(
      "FAIL",
      "/",
      `${home.prices.length + servicesPrices.length} [data-price] element(s) still render`
    );

  await page.close();
}

/* The 404 page must return a real 404, not a 200 that looks like one. */
{
  const page = await browser.newPage();
  const response = await page.goto(`${BASE}/definitely-not-a-page`, {
    waitUntil: "domcontentloaded",
  });
  if (response?.status() !== 404)
    record("FAIL", "/404", `unmatched URL returns HTTP ${response?.status()}, expected 404`);
  await page.close();
}

await browser.close();

/* ------------------------------------------------------------------ */
/* Report                                                              */
/* ------------------------------------------------------------------ */

const order = { FAIL: 0, BUDGET: 1, WARN: 2, TODO: 3 };
results.sort(
  (a, b) => order[a.level] - order[b.level] || a.route.localeCompare(b.route)
);

const counts = { FAIL: 0, BUDGET: 0, WARN: 0, TODO: 0 };
for (const result of results) counts[result.level] += 1;

console.log("");
for (const result of results) {
  console.log(`${result.level.padEnd(5)} ${result.route.padEnd(38)} ${result.message}`);
}
console.log("");
console.log(
  `${counts.FAIL} fail   ${counts.BUDGET} over budget   ${counts.WARN} warn   ${counts.TODO} outstanding placeholder`
);
if (counts.BUDGET > 0) {
  console.log("");
  console.log(
    "The JavaScript budget is a known, accepted shortfall of the Next.js stack,"
  );
  console.log(
    "not a regression: the site's own code is about 8KB gzipped and the rest is"
  );
  console.log(
    "React and the Next.js runtime. See README, 'The JavaScript budget'."
  );
}
console.log(
  counts.FAIL === 0
    ? "No blocking failures."
    : "Blocking failures present - not ready to launch."
);

process.exit(counts.FAIL > 0 ? 1 : 0);
