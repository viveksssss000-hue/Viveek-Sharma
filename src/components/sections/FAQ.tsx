"use client";

import { useId, useState } from "react";

import { Section, SectionHeading } from "@/components/sections/Section";
import { PlusMinusIcon } from "@/components/ui/icons";
import { microcopy } from "@/content/global";
import { trackFaqOpen } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * The FAQ accordion (spec 4.4.4).
 *
 * Four hard requirements, and how each is met:
 *
 *  1. "A real button element inside a heading element, with aria-expanded and
 *     aria-controls wired correctly" - the markup below is exactly that, so a
 *     screen reader announces both the heading level and the open state.
 *  2. "Keyboard operable with Enter and Space" - it is a real <button>, so
 *     that comes for free and cannot regress.
 *  3. "MUST work with JavaScript disabled by defaulting to open" - the panels
 *     are collapsed by CSS (grid-template-rows: 0fr + visibility, which keeps
 *     a closed answer out of the accessibility tree exactly as the old hidden
 *     attribute did, but lets it ANIMATE open), and the <noscript> stylesheet
 *     below forces every panel open. With JavaScript the initial server and
 *     client render agree, so nothing flashes and nothing shifts.
 *  4. "The plus and minus indicator is an inline SVG that rotates" - see
 *     PlusMinusIcon. Never a font icon and never a unicode character.
 *
 * Opening an item fires faq_open with the question text (spec 11.2), which
 * reveals what visitors actually worry about.
 */

type FaqItem = { q: string; a: string };

export function FAQ({
  heading,
  faqs,
  /** Spec 7.1.11: the first item on the Home page FAQ is open by default. */
  firstOpen = false,
  tone = "paper",
}: {
  heading: string;
  faqs: readonly FaqItem[];
  firstOpen?: boolean;
  tone?: "paper" | "sand";
}) {
  return (
    <Section tone={tone} width="prose">
      <SectionHeading title={heading} />
      <FaqList faqs={faqs} firstOpen={firstOpen} className="mt-10" />
    </Section>
  );
}

export function FaqList({
  faqs,
  firstOpen = false,
  className,
}: {
  faqs: readonly FaqItem[];
  firstOpen?: boolean;
  className?: string;
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(
    firstOpen ? 0 : null
  );

  return (
    <>
      {/* Without JavaScript every answer is visible: the override beats the
          collapsed grid row and the visibility, both marked !important. */}
      <noscript>
        <style>{`.faq-panel{grid-template-rows:1fr !important;visibility:visible !important}`}</style>
      </noscript>

      <div className={cn("divide-y divide-border border-y border-border", className)}>
        {faqs.map((item, index) => {
          const open = openIndex === index;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;

          return (
            <div key={item.q}>
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => {
                    const next = open ? null : index;
                    setOpenIndex(next);
                    if (next !== null) trackFaqOpen(item.q);
                  }}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                  <span className="font-serif text-h3 font-semibold text-ink">
                    {item.q}
                  </span>
                  <span className="mt-1 shrink-0 text-fern">
                    <PlusMinusIcon open={open} size={24} />
                    <span className="sr-only-focusable">
                      {open ? microcopy.accordionCollapse : microcopy.accordionExpand}
                    </span>
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                data-open={open}
                className="faq-panel"
              >
                {/* The inner div is the grid item that clips; padding lives
                    on the paragraph so the closed height is truly zero. */}
                <div>
                  <p className="measure pb-6 text-body text-ink-muted">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
