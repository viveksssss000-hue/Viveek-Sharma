"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { microcopy, routes } from "@/content/global";
import { trackCtaClick } from "@/lib/analytics";

/**
 * The hero's two buttons (spec 7.1.2).
 *
 * MUST NOT put a form in the hero: the buttons go to /book-a-call and
 * /how-it-works. On mobile the primary action is full width, as the design
 * system requires for the leading action in a section.
 */
export function HeroCtas() {
  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
      <Button
        asChild
        full
        className="sm:w-auto"
        onClick={() => trackCtaClick("book_call", "hero")}
      >
        <Link href={routes.bookACall}>
          {microcopy.bookCall}
          <ArrowRightIcon size={18} />
        </Link>
      </Button>

      <Button asChild variant="secondary" full className="sm:w-auto">
        <Link href={routes.howItWorks}>{microcopy.seeHowItWorks}</Link>
      </Button>
    </div>
  );
}
