import Link from "next/link";
import type { ReactNode } from "react";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { PricingViewTracker } from "@/components/sections/PricingViewTracker";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon, CrossIcon } from "@/components/ui/icons";
import { routes, scopeBlock } from "@/content/global";
import { cn } from "@/lib/utils";

/**
 * The scope block, shared by the Home page and the Services page.
 *
 * WHAT CHANGED, AND WHY
 * This was the price block: two cards carrying a published monthly figure,
 * and the strongest differentiator on the old site. Prices are no longer
 * published - they are scoped and quoted on a call - so the cards are gone.
 *
 * What survives is the part that actually did the persuading: the "included"
 * list and, below it, the "not included" list. Saying plainly what you do not
 * get is what made the rest believable, and that is still true without a
 * number above it.
 *
 * Two rules that must not be relaxed:
 *  - The "not included" panel is plain text, never collapsed behind an
 *    accordion. Its honesty is the persuasive device.
 *  - No figure goes back on this page without the client agreeing to publish
 *    it. "From $X" counts as publishing it.
 */

export function ScopeBlock({
  /** Set on the Services page, where the footer and 404 links point. */
  id,
  page,
  extra,
}: {
  id?: string;
  page: string;
  /** The Services page adds a cost-comparison note below the block. */
  extra?: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("bg-sand text-ink section-y", id && "scroll-mt-24")}
    >
      <PricingViewTracker page={page} />

      <ScrollReveal className="gutter mx-auto max-w-[900px]">
        <div className="text-center">
          <h2>{scopeBlock.h2}</h2>
          <p className="mx-auto mt-4 measure text-lead text-ink-muted">
            {scopeBlock.intro}
          </p>
        </div>

        {/* Included */}
        <div className="mt-12 rounded-[16px] border border-border bg-surface p-6 lg:p-8">
          <h3 className="font-sans text-h4 font-semibold">
            {scopeBlock.includedHeading}
          </h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {scopeBlock.included.map((item) => (
              <li key={item} className="rv-item flex items-start gap-3">
                <CheckIcon size={20} className="icon-draw mt-1 text-fern" />
                <span className="text-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not included - plain text, not a card, and never hidden. */}
        <div className="mt-12">
          <h3 className="font-sans text-h4 font-semibold">
            {scopeBlock.notIncludedHeading}
          </h3>
          <ul className="mt-6 grid gap-4">
            {scopeBlock.notIncluded.map((item) => (
              <li key={item} className="rv-item flex items-start gap-3">
                <CrossIcon size={20} className="icon-draw mt-1 text-ink-muted" />
                <span className="measure text-body text-ink-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {extra}

        <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Button asChild full className="sm:w-auto">
            <Link href={routes.freePilot}>{scopeBlock.buttonLabel}</Link>
          </Button>
          {!id && (
            <Link
              href={routes.services}
              className="group inline-flex min-h-11 items-center gap-2 text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]"
            >
              {scopeBlock.linkLabel}
              <ArrowRightIcon
                size={18}
                className="transition-transform duration-150 group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
