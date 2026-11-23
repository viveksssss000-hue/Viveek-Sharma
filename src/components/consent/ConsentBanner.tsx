"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { microcopy, routes } from "@/content/global";
import { setConsent } from "@/lib/consent";
import { useConsent } from "@/lib/hooks";

/**
 * The cookie notice (spec 6.5). A small card, bottom-left, that does not block
 * the page. Accept and Decline are the same size and weight - the choice is
 * genuine, declining is respected, and nothing is nagged at.
 *
 * On mobile it sits above the sticky call-to-action bar rather than over it.
 */
export function ConsentBanner() {
  const consent = useConsent();

  // "unknown" is "the browser has not been read yet" - render nothing, so the
  // banner never flashes for a visitor who already chose.
  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed bottom-4 left-4 z-50 w-[calc(100vw-32px)] max-w-[380px] rounded-[16px] border border-border bg-surface p-6 shadow-lift max-md:bottom-[84px]"
    >
      <p className="text-small text-ink">
        {microcopy.cookieText}{" "}
        <Link
          href={routes.privacy}
          className="text-fern underline underline-offset-2"
        >
          Privacy Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <Button
          size="compact"
          className="flex-1"
          onClick={() => setConsent("granted")}
        >
          {microcopy.cookieAccept}
        </Button>
        <Button
          variant="secondary"
          size="compact"
          className="flex-1"
          onClick={() => setConsent("denied")}
        >
          {microcopy.cookieDecline}
        </Button>
      </div>
    </div>
  );
}
