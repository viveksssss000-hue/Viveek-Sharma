# Change order 01 - sign-off

Return this with the handover, per Section 5 of the change order.

Applies to: change order 01 v1.0, 23 August 2026, against build specification
v1.0, 22 August 2026.

| Ref | Change | Done | Note |
| --- | --- | --- | --- |
| CO-01 | Prices confirmed and markers deleted | **Done, partly open by design** | $1,600 and $880 carry no marker. The extra-hours rate and the US-hours premium still render `[CONFIRM RATE]`, per Section 3 items 1 and 2. Both flow from `usdRate()` in `src/lib/site.ts`, so figure and marker can only appear together, and the US-hours premium is one string used in both places. The annual comparison figure is derived (`annualFullTime = fullTime * 12`), never typed twice. Price grid takes a third card - tested, screenshot attached, reverted. |
| CO-02 | Exclusions list replaced | **Done** | `src/content/services.ts`, `boundaries.items`. "Audit or assurance support, including workpapers and testing" removed; "Reaching accounting conclusions" and "Making audit judgements" added as gerunds. The other five items and the closing paragraph are unchanged from v1.0. |
| CO-03 | Price block not-included line edited | **Done** | `src/content/global.ts`, `priceBlock.notIncluded`. Now reads "such as tax return preparation, which we do not offer". |
| CO-04 | Build-consequence note edited | **Not applicable to the build** | A specification-document edit with no site copy. The intent is recorded where it matters: `reservedRoutes` in `src/content/global.ts` names audit support as the future second service page, and no navigation, template or card grid assumes more than one service line. |
| CO-05 | Two URLs reserved and returning 404 | **Done** | Recorded in `reservedRoutes`. Both return HTTP 404, appear in no sitemap, navigation, mobile menu or footer, and are mentioned in no copy, alt text, meta tag or structured data. `npm run qa` checks all of it. |
| CO-06 | Navigation data-driven and tested at six items | **Done, with a fix** | Both the desktop header and the mobile menu already read one array (`mainNav` + `mobileNavExtra`). The six-item test **failed** at 1024px: six links plus the button needed 944px against 928px available, and the nav wrapped. Fixed with two of CO-06's three permitted remedies, applied conditionally on item count so today's five-link header is visually unchanged: 12px gaps and 15px links below 1280px, only when six or more items exist. Re-measured at 888px. No dropdown. Mobile menu confirmed at eight items. |
| CO-07 | Logo note added, phrase banned site-wide | **Done, with one deviation the client authorised** | Phrase ban: "Accounting and Compliance Outsourcing" removed from the codebase entirely, not merely hidden, and `npm run qa` fails if it returns anywhere including meta tags and JSON-LD. "Compliant" near a security framework is likewise checked. **Wordmark: the client chose tryACOwork on 23 August, overriding CO-07's instruction to set the wordmark as "Tryacowork" and not to build the ACO treatment in markup.** See the deviation note below. |
| CO-08 | Two Security page blocks added | **Done** | Block A2 on SQMS No. 1 and the quality management system, inserted after the bookkeeping block. Block C2 on PCAOB registration and Form AP, inserted after "what never transfers", which itself gained the closing sentence about the exclusions list. Both new blocks render a visible `[CONFIRM WITH US CPA]` marker. No download, form or gated asset was built for the protocol - the copy says "ask us on the call", as instructed. |
| CO-09 | Certification wording rules added | **Done** | Recorded against the copy in `src/content/security.ts` and enforced: `npm run qa` fails on "compliant" used near a framework. The three existing `[CONFIRM]` certification lines are untouched pending Section 3 item 3. |
| CO-10 | Claims policy rules added | **Done, and blocking** | The US CPA sign-off requirement is recorded in `content/settings.json` under `professionalStandardsSignOff` and reported by `npm run handover` until a name and date are entered. It blocks launch of the Home page and the Security page. The no-extension rule for research findings and the no-implied-certification rule are recorded in `content/blog-plan.md` and in the security copy. |
| CO-11 | Keyword clusters recorded | **Done** | `content/blog-plan.md`. Four assigned to articles 13, 15, 17 and 18; two marked HOLD for the reserved page and targeted nowhere. No page-level keyword changed. |
| CO-12 | Blog plan updated | **Done** | `content/blog-plan.md`. Four slots replaced, the two extensions to articles 2 and 22 recorded, cadence and count unchanged at 24. Article 22 is flagged as having to match the Services exclusions list word for word, with the Services page winning any conflict. |
| CO-13 | Client-provides lists updated | **Done** | `npm run handover` now reports the two open rates individually with the arithmetic behind each, the CPA sign-off, the supervision protocol and the certification-lines decision. The "do not chase" items from 14.3 are deliberately absent - they are not part of this build. |
| CO-14 | Phase-two table row replaced | **Not applicable to the build** | A specification-document edit. Both future pages and what has been allowed for them are recorded in `reservedRoutes`. |
| CO-15 | Appendix B statistics added | **Done** | `content/blog-plan.md`, with the attribution each must carry, where each may be used, and the extension limits. The two new "never use" items are recorded alongside the existing dated AICPA claim. |
| CO-16 | QA checklist extended and run | **Done** | Fifteen checks added to `scripts/qa.mjs` and `scripts/expansion-tests.mjs`. Current result: **0 failures.** Three pages carry intentional `[CONFIRM]` markers, which is required at this stage and blocks launch. |
| CO-17 | Three Home page FAQ answers handled | **Done** | Answer 10's question and answer replaced verbatim. Its FAQPage structured data is generated from the same array the page renders, so the two cannot diverge, and "audit support" appears in neither - checked. Answer 4's figure shares one variable with the price block. Answer 3 is unchanged and added to the CPA sign-off list. Ten questions, none added or removed. |

## Evidence attached

- `co06-header-1024px.png`, `co06-header-1152px.png`, `co06-header-1280px.png` -
  the desktop header with six nav items including "Audit Support".
- `co06-mobile-menu-8-items.png` - the mobile menu at eight items.
- `co01-price-block-3-cards.png` - the price block with a third card.

Reproduce any of it with `node scripts/expansion-tests.mjs`. It applies the data
edits, rebuilds, captures the evidence and puts the originals back - the sixth
nav item and the third card never exist in a shipped build.

## Restricted-word audit (CO-16)

"audit", "audits", "auditing", "auditor" and "auditors" appear on the launch
pages only in the five approved places, all verified by `npm run qa`:

1. "Making audit judgements" - the Services exclusions list
2. "apply to audits of public companies" - the new C2 block on /security
3. "We have not been audited by a third party" - /security
4. "bookkeeping, accounting and auditing clerks" - the BLS source line
5. "US accountants and auditors left their jobs" - the Wall Street Journal figure

"workpaper" appears nowhere on the launch pages. The blog is exempt, as the
change order allows, because article 15's title legitimately contains the word.

## Authorised deviation - CO-07, the wordmark

CO-07 says the wordmark is "Tryacowork", and MUST NOT be split into spans or have
the ACO letter treatment built in CSS. Its stated reason: a wordmark rebuilt in
HTML will not match the client's master file, and will break at some size.

The client instructed otherwise on 23 August - *"Tryacowork please write it like
this everywhere: tryACOwork"* - and confirmed that choice when the conflict was
put to them. **So the client's instruction governs and CO-07's wordmark paragraph
is superseded.** Specification v1.0 section 4.6 and CO-07 should both be
corrected to record it.

What that means in the build:

- The name is written **tryACOwork** in all copy, and stays lower-case at the
  start of a sentence. `npm run qa` fails on "Tryacowork", "TRYACOWORK",
  "TryACOwork" or "Try a cowork" appearing in rendered text, so it cannot drift
  back - including if someone later works from v1.0.
- The header and footer lockup is built from live text: Spectral for "try" and
  "work", Archivo caps in ochre for "ACO", with the square mark alongside. This
  is the treatment CO-07 prohibited.
- The domain, the email address and every URL stay all-lower-case
  (tryacowork.com), because that is what they are.

**CO-07's technical worry was legitimate and has been addressed rather than
dismissed.** Two mitigations:

1. `npm run interactions` now checks the lockup at both sizes it is used at, in
   both colour variants, asserting the ACO carries the accent colour, the lockup
   stays on one line, and it never overflows its container. If it breaks at a
   size, a test says so rather than a customer.
2. Live text degrades safely: if Spectral fails to load, "try" and "work" fall
   back to Georgia and "ACO" to a system sans, both keeping their colours and
   weights. The lockup stays legible and correctly coloured.

**The cleaner fix remains available and is still recommended:** supply an SVG
master with the ACO treatment baked in, and `src/components/layout/Logo.tsx` can
be swapped for an `<Image>` in one edit. That would satisfy CO-07's intent and
the client's spelling at the same time.
