"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { microcopy, routes } from "@/content/global";
import { trackCtaClick } from "@/lib/analytics";
import { useScrolledPastViewport } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * The sticky mobile call-to-action bar (spec 6.2).
 *
 * Below 768px only. This is a significant conversion device and is not
 * optional. It appears once the visitor has scrolled past the hero, and is
 * hidden on /book-a-call because she is already there.
 *
 * The matching bottom padding on <main> lives in layout.tsx, so the bar can
 * never cover the footer or the last line of text.
 */

/** Pages where the bar is suppressed (spec 6.2, 7.6.1). */
const HIDDEN_ON: string[] = [routes.bookACall];

export function StickyMobileCTA() {
  const pathname = usePathname();
  // "Past the hero" - a fraction of the viewport height is a good proxy and
  // needs no coupling between this component and each page's hero markup.
  const visible = useScrolledPastViewport(0.6);

  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-paper md:hidden",
        "shadow-[0_-8px_24px_rgb(27_26_23_/_0.10)]",
        "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      )}
      // Hidden from assistive technology until it is actually on screen, so a
      // screen reader is not told about a button the visitor cannot reach.
      aria-hidden={!visible}
    >
      <div className="gutter flex h-[68px] items-center">
        <Button
          asChild
          full
          size="compact"
          tabIndex={visible ? undefined : -1}
          onClick={() => trackCtaClick("book_call", "sticky_mobile")}
        >
          <Link href={routes.bookACall}>{microcopy.bookCall}</Link>
        </Button>
      </div>
    </div>
  );
}
