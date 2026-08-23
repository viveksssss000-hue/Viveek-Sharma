import Link from "next/link";
import type { ReactNode } from "react";

import { PricingViewTracker } from "@/components/sections/PricingViewTracker";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckIcon, CrossIcon } from "@/components/ui/icons";
import { priceBlock, routes } from "@/content/global";
import { usdDigits } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The price block (spec 7.1.5), shared by the Home page and the Services page.
 *
 * WHY THIS SECTION MATTERS MOST
 * Across 216 competitors reviewed, only a handful publish a real price and
 * almost none of the market leaders do. This is the strongest single
 * differentiator on the site, so it has to be confident, complete and honest -
 * including what is not included, which is what makes the rest believable.
 *
 * Three rules that must not be relaxed:
 *  - The two cards are identical in visual weight. Neither is marked "most
 *    popular": there is no data to support it and it looks like a trick.
 *  - The "not included" panel is plain text below the cards, never collapsed
 *    behind an accordion. Its honesty is the persuasive device.
 *  - Every figure comes from lib/site.ts, so a price change is one edit.
 *
 * CO-01 adds a structural requirement: the card grid MUST take a third card
 * later without a layout rewrite. So the columns are derived from how many
 * cards exist rather than hardcoded - two cards give two columns, three give
 * three at desktop and two at tablet. Adding a card is a data edit in
 * content/global.ts and nothing else. Do not add one now.
 */

export function PriceBlock({
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

      <div className="gutter mx-auto max-w-[900px]">
        <div className="text-center">
          <h2>{priceBlock.h2}</h2>
          <p className="mx-auto mt-4 measure text-lead text-ink-muted">
            {priceBlock.intro}
          </p>
        </div>

        {/* Equal weight, side by side on desktop. Column count follows the
            number of cards, so a third can be added by data alone (CO-01). */}
        <div
          className={cn(
            "mt-12 grid gap-6",
            priceBlock.cards.length >= 3
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "md:grid-cols-2"
          )}
        >
          {priceBlock.cards.map((card) => (
            <div
              key={card.label}
              className="rounded-[12px] border border-border bg-surface p-6 shadow-rest lg:p-8"
            >
              <h3 className="font-sans text-h4 font-semibold">{card.label}</h3>
              {/* The dollar sign and the "a month" suffix sit at 21px on the
                  baseline of a 48px numeral (spec 4.2.2 and 7.1.5). */}
              <p className="mt-4 flex items-baseline">
                <span className="price-currency text-[21px] font-medium text-ink-muted">
                  $
                </span>
                <span
                  data-price
                  className="price-figure font-serif text-price font-semibold text-ink"
                >
                  {usdDigits(card.amount)}
                </span>
                <span className="ml-2 text-[21px] font-medium text-ink-muted">
                  a month
                </span>
              </p>
              <p className="mt-4 text-body text-ink-muted">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Included */}
        <div className="mt-12 rounded-[12px] border border-border bg-surface p-6 lg:p-8">
          <h3 className="font-sans text-h4 font-semibold">
            {priceBlock.includedHeading}
          </h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {priceBlock.included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckIcon size={20} className="mt-1 text-fern" />
                <span className="text-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not included - plain text, not a card, and never hidden. */}
        <div className="mt-12">
          <h3 className="font-sans text-h4 font-semibold">
            {priceBlock.notIncludedHeading}
          </h3>
          <ul className="mt-6 grid gap-4">
            {priceBlock.notIncluded.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CrossIcon size={20} className="mt-1 text-ink-muted" />
                <span className="measure text-body text-ink-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {extra}

        <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <Button asChild full className="sm:w-auto">
            <Link href={routes.freePilot}>{priceBlock.buttonLabel}</Link>
          </Button>
          {!id && (
            <Link
              href={routes.services}
              className="group inline-flex min-h-11 items-center gap-2 text-fern underline decoration-2 underline-offset-4 hover:decoration-[3px]"
            >
              {priceBlock.linkLabel}
              <ArrowRightIcon
                size={18}
                className="transition-transform duration-150 group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
