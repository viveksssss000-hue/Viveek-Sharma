import type { Metadata } from "next";
import Link from "next/link";

import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { CopyWordingBlock } from "@/components/sections/CopyWordingBlock";
import { FAQ } from "@/components/sections/FAQ";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section, SectionHeading } from "@/components/sections/Section";
import { BreadcrumbSchema, FaqSchema } from "@/components/seo/JsonLd";
import { CheckIcon, CrossIcon } from "@/components/ui/icons";
import { routes } from "@/content/global";
import {
  access,
  contracts,
  corePrinciple,
  faqHeading,
  faqs,
  header,
  insuranceStatement,
  notClaimed,
  obligations,
  people,
  physical,
} from "@/content/security";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(routes.security);

/**
 * Security and Compliance page (spec 7.4).
 *
 * Read slowly and carefully by someone whose professional licence depends on
 * getting it right. Three things this page must never do:
 *
 *  - Claim a certification the firm does not hold. There are no SOC 2, ISO
 *    27001, AICPA or "GDPR certified" badges anywhere on this site, and the
 *    "What we do not claim" section says so out loud.
 *  - State or imply that tryACOwork guarantees the firm's compliance with any
 *    professional standard.
 *  - Bury the "this is not legal advice" line. It sits at the top of the
 *    obligations section, not at the bottom.
 */
export default function SecurityPage() {
  return (
    <>
      <PageHeader h1={header.h1} intro={header.intro} />

      {/* 2 - The core principle. Kept on paper so it reads as a continuation
          of the page header - one framing statement - and so the alternation
          from here down lands the obligations section on sand and the "what we
          do not claim" section on paper, which is what spec 7.4.8 and 7.4.9
          each ask for. */}
      <Section tone="paper" width="text">
        <SectionHeading title={corePrinciple.h2} />
        <div className="mt-6 grid gap-4">
          {corePrinciple.paragraphs.map((paragraph) => (
            <p key={paragraph} className="measure text-body">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      {/* 3, 4, 5 - People, access, and physical controls. Every line is a
          factual claim; anything not true must be deleted, not softened. */}
      {[people, access, physical].map((group, index) => (
        <Section
          key={group.h2}
          tone={index % 2 === 0 ? "sand" : "paper"}
          width="text"
        >
          <h2>{group.h2}</h2>
          <ul className="mt-8 grid gap-3">
            {group.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon size={20} className="mt-1 text-fern" />
                <span className="text-body">{item}</span>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      {/* 6 - Contracts. The insurance item appears only if cover is confirmed. */}
      <Section tone="paper" width="text">
        <h2>{contracts.h2}</h2>
        <div className="mt-8 grid gap-8">
          {contracts.items.map((item) => (
            <div key={item.h4}>
              <h3 className="font-sans text-h4 font-semibold">{item.h4}</h3>
              <p className="mt-2 measure text-body text-ink-muted">
                {item.body}
              </p>
            </div>
          ))}

          {insuranceStatement && (
            <div>
              <h3 className="font-sans text-h4 font-semibold">Insurance</h3>
              <p className="mt-2 measure text-body text-ink-muted">
                {insuranceStatement}
              </p>
            </div>
          )}
        </div>
      </Section>

      {/* 7 - Your professional obligations. The section that makes the page
          genuinely useful, and the reason it gets shared. */}
      <Section tone="sand" width="text">
        <h2>{obligations.h2}</h2>
        <p className="mt-4 measure text-body font-medium">{obligations.intro}</p>

        <div className="mt-10 grid gap-10">
          {obligations.blocks.map((block) => (
            <div key={block.h4}>
              <h3 className="font-sans text-h4 font-semibold">{block.h4}</h3>
              <p className="mt-3 measure text-body">{block.body}</p>

              {/* CO-08: the two blocks citing SQMS No. 1 and the PCAOB rules
                  carry a visible marker until a named US CPA has signed the
                  wording off (CO-10). It MUST NOT ship - launch QA fails on
                  any [CONFIRM marker still rendered. */}
              {"confirmWithCpa" in block && block.confirmWithCpa && (
                <p className="mt-3 text-small font-semibold uppercase tracking-[0.08em] text-ochre-text">
                  [CONFIRM WITH US CPA]
                </p>
              )}
            </div>
          ))}

          <div>
            <h3 className="font-sans text-h4 font-semibold">
              {obligations.wording.h4}
            </h3>
            <CopyWordingBlock text={obligations.wording.text} />
            <p className="mt-4 measure text-body text-ink-muted">
              {obligations.wording.after}
            </p>
          </div>
        </div>
      </Section>

      {/* 8 - What we do not claim. Counter-intuitive and highly effective,
          because every competitor does the opposite. */}
      <Section tone="paper" width="text">
        <SectionHeading title={notClaimed.h2} intro={notClaimed.intro} />
        <ul className="mt-8 grid gap-3">
          {notClaimed.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CrossIcon size={20} className="mt-1 text-ink-muted" />
              <span className="text-body">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 measure text-body">{notClaimed.closing}</p>

        <p className="mt-8">
          <Link
            href={routes.bookACall}
            className="text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]"
          >
            Book a 20-minute call
          </Link>
        </p>
      </Section>

      {/* 9 - FAQ for this page. */}
      <FAQ heading={faqHeading} faqs={faqs} tone="sand" />

      <ClosingCTA />

      <FaqSchema faqs={faqs} />
      <BreadcrumbSchema trail={[{ name: "Security", path: routes.security }]} />
    </>
  );
}
