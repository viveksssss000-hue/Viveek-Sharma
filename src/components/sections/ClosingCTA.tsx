"use client";

import Link from "next/link";

import { BandBars } from "@/components/brand/Decor";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { closingCta, routes } from "@/content/global";
import { trackCtaClick } from "@/lib/analytics";

/**
 * The closing call-to-action band (spec 7.11). One component, at the foot of
 * Home, Services, How It Works, Security, About, the blog index and every
 * article - and nowhere else.
 *
 * It MUST NOT appear on /book-a-call, /free-pilot, the three thank-you pages,
 * the two legal pages or the 404 page. Those pages simply do not render it;
 * `closingCtaExcludedPaths` in content/global.ts is the written record of why.
 */
export function ClosingCTA() {
  return (
    <section className="band-glow band-grad on-dark text-paper">
      {/* A faint echo of the brand bars in the corner, behind the words. */}
      <BandBars className="absolute -bottom-4 -right-6 -z-10 w-44 md:w-56" />
      <div className="gutter relative mx-auto max-w-text py-16 text-center lg:py-24">
        <h2>{closingCta.h2}</h2>
        <p className="mx-auto mt-6 measure text-lead text-paper/85">
          {closingCta.body}
        </p>

        <div className="mt-10 flex flex-col items-center gap-6">
          <Magnetic className="w-full sm:w-auto">
            <Button
              asChild
              variant="onDark"
              full
              onClick={() => trackCtaClick("book_call", "closing_band")}
            >
              <Link href={routes.bookACall}>{closingCta.buttonLabel}</Link>
            </Button>
          </Magnetic>

          <Link
            href={closingCta.linkHref}
            onClick={() => trackCtaClick("pilot", "closing_band")}
            className="group inline-flex min-h-11 items-center gap-2 text-paper underline decoration-2 underline-offset-4 hover:decoration-[3px]"
          >
            {closingCta.linkLabel}
            <ArrowRightIcon
              size={18}
              className="transition-transform duration-150 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
