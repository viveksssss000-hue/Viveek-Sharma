# Blog plan and approved sources

Reference for whoever writes the articles. Not a published page - nothing in this
file is rendered by the site.

The full 24-article plan lives in section 12.2 of the build specification.
Recorded here are only the parts **change order 01** altered, plus the sources
every article must draw from, so a writer does not have to hold two documents
open to know what changed.

Publishing cadence is unchanged: roughly one a week, 24 articles over six
months, 1,200 to 2,000 words each, no AI-generated filler, and every article
must contain at least one thing a competitor would not publish.

---

## Four articles replaced (CO-12)

The count stays at 24 and the slots stay in the same positions.

### Removed

| # | Was | Why it went |
| --- | --- | --- |
| 13 | Should you hire an offshore bookkeeper part-time or full-time first? | Already answered by the two-card price block and the Fit panel on Services. |
| 15 | QuickBooks Online versus Xero for a firm with an offshore team | A generic comparison a hundred sites already rank for. Says nothing only this firm could say. |
| 17 | What a good end-of-day update looks like | Substantially overlaps article 9, which already covers the end-of-day note habit. |
| 18 | Sales tax reconciliation: what to hand over and what to keep | Narrow, and the boundary is now drawn more clearly by article 22 and the Services exclusions list. |

### Added, in the same four slots

**13. What a US firm can and cannot send to an offshore accounting team**
Target phrase: *what can CPA firms outsource offshore*

Must cover: AICPA ET 1.150.040 on informing the client, preferably in writing.
ET 1.700.040 on either a confidentiality agreement or the client's specific
consent. SQMS No. 1 paragraph 33(h) on the firm's quality management system
addressing external providers. IRC section 7216 and Treasury Regulation
301.7216-3, and the point that they cover tax return information only, so they
do not apply to bookkeeping. And the plain statement that responsibility for the
work never transfers.

Reuse the engagement-letter wording already on `/security`, and carry the same
not-legal-advice line that page uses. **Covered by the US CPA sign-off rule
below.**

**15. Does offshoring audit work hurt quality? What the 2025 research found**
Target phrase: *does offshoring affect audit quality*

Must cover: the finding quoted exactly as recorded below and **no further**. A
plain explanation of what a shared service centre is. An honest note that the
study looked at Big Four audits and does not say which tasks were sent offshore.

**MUST NOT** use the study to claim anything about tryACOwork's own quality. It
says nothing about it.

**17. US GAAP to IFRS: when a US private company actually has to care**
Target phrase: *US GAAP to IFRS conversion*

Must cover: the honest answer, which is that most US private companies never
need to, because there is no federal statutory requirement for a private company
to file or audit annual accounts. Then the three real triggers: a foreign parent
reporting under IFRS, preparation for a listing outside the US, and policy
alignment after an acquisition. The Form 20-F figure below, with its caveat.

**MUST NOT** offer a service or quote a price.

**18. IFRS 19 and US subsidiaries of foreign parents: what changes on 1 January 2027**
Target phrase: *IFRS 19 US subsidiaries*

Must cover: the effective date quoted verbatim below. What the standard does,
which is reduce disclosure requirements for eligible subsidiaries. Who is
eligible. And the three questions a US subsidiary should put to its parent.

**MUST NOT** offer a service or quote a price.

### Two existing articles extended, not replaced

| # | Title | What to add |
| --- | --- | --- |
| 2 | Is offshoring bookkeeping safe for a CPA firm? | Add SQMS No. 1 paragraph 33(h) to the standards it covers, and link to the new article 13. Everything already in its brief stays. |
| 22 | What we will not do, and why | **MUST match the exclusions list on the Services page word for word.** If the two ever differ, the Services page wins and the article is corrected. The list is in `src/content/services.ts`, `boundaries.items`. |

On the roughly-weekly schedule, 13 and 15 fall in month four, 17 and 18 in
month five. All four sit inside the original six-month plan.

---

## Keyword clusters (CO-11)

These are built up through the blog so that a later page has search authority to
stand on. **None may become the primary keyword of a page** - one primary
keyword per page, never the same phrase twice, or they compete.

| Cluster | Assigned to | Status |
| --- | --- | --- |
| what can CPA firms outsource offshore | Article 13 | Target now |
| does offshoring affect audit quality | Article 15 | Target now |
| US GAAP to IFRS conversion | Article 17 | Target now |
| IFRS 19 US subsidiaries | Article 18 | Target now |
| outsourced audit support for CPA firms | The reserved page `/audit-support-for-cpa-firms` | **HOLD** |
| audit workpaper preparation outsourcing | The reserved page `/audit-support-for-cpa-firms` | **HOLD** |

**Do not target the two HOLD phrases anywhere yet**, in an article or on a page.
They belong to a page that does not exist, and targeting them now means that
future page has to compete with our own article.

The seven existing page-level keyword assignments are unchanged, and so are all
the title tags and meta descriptions.

---

## Approved statistics

**A statistic may only come from here.** Use each exactly as written, always with
its attribution. This is the whole habit that separates this blog from its
competitors: every number carries its source and year, named in the sentence, not
in a footnote.

### From the build specification, Appendix B

Unchanged, and usable in page copy as well as the blog. Eight statistics: the
Wall Street Journal figure on accountants leaving their jobs, the AICPA PCPS top
issues survey, the AICPA MAP survey on firms offshoring, INSIDE Public
Accounting on offshoring adoption, the AICPA Trends report on accounting degrees,
the BLS projection of annual openings, the BLS median wage of $49,210, and the
fully-loaded-cost estimate of $58,000 or more.

### Added by CO-15 - blog only, not page copy

| The claim, as it may be written | Attribution that must appear | Where |
| --- | --- | --- |
| Published offshore rates for US accounting firms run from about $8 to $15 an hour for basic bookkeeping, rising to $25 to $35 an hour for virtual CFO work. | Acculink published 2026 pricing guide, acculinkcpa.com. **Say in the article that this is a competitor's own marketing document, not an independent survey.** | Blog only |
| A 2025 study in the Journal of Accounting Research found no evidence that using offshore shared service centres is associated with lower audit quality, and found the practice is nearly universal in Big Four audits. | Sherwood, M., "Offshore Shared Services Center Usage by U.S. Big 4 Audit Engagement Teams", Journal of Accounting Research, 2025, volume 63 issue 4, pages 1679 to 1722. | Article 15 only. **MUST NOT be extended** - the study does not say which tasks are sent offshore. |
| In May 2026 CPAmerica, a US accounting firm association, named an offshore accounting workforce provider as a preferred provider for its member firms. | CPAmerica press release, 6 May 2026. **Describe it as a commercial arrangement, not an endorsement of quality.** | Blog only |
| 967 foreign private issuers filed annual reports on Form 20-F with the SEC for fiscal year 2023. | SEC, Concept Release on Foreign Private Issuer Eligibility, release 33-11376, 2025. | Article 17 only. **MUST carry the caveat that only a subset report under IFRS. Never write "967 IFRS filers".** |
| IFRS 19 is effective for annual reporting periods beginning on or after 1 January 2027, with earlier application permitted. | IFRS Foundation, ifrs.org. Quote verbatim. | Article 18 only |

### Never use

- **The 75 percent AICPA retirement-eligibility claim.** It comes from a 2015
  document and is repeated online as though current. Dated. Do not use it.
- **The AICPA IFRS Certificate price**, unless given as roughly $755 for members
  and roughly $955 otherwise. The member price alone understates it and reads as
  spin.
- **Any quotation attributed to PCAOB staff** about there being no standards
  limiting what work may be performed. The attribution could not be traced to a
  dated PCAOB publication. Do not use it in quotation marks anywhere.

---

## The US CPA sign-off rule (CO-10)

**No statement about what the AICPA Code of Professional Conduct, the PCAOB, the
Statements on Quality Management Standards or the Internal Revenue Code requires
may go live without written sign-off from a named US CPA.**

That currently covers five places:

1. The professional-obligations section on `/security`
2. Home FAQ answer 3
3. The Security page FAQ
4. Blog article 2
5. Blog article 13

Record the CPA's name and the date in the handover. **This blocks launch of the
Home page and the Security page.** `npm run handover` reports it until it is
filled in.

Two related rules:

- Research findings are quoted exactly as recorded above and **never extended**.
- **MUST NOT** state or imply that tryACOwork holds, or is working toward, any
  certification unless confirmed in writing. "Working toward ISO 27001" is a
  claim, not a plan, and needs the same evidence as the certificate.
