"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { mainNav, microcopy, routes } from "@/content/global";
import { trackCtaClick } from "@/lib/analytics";
import { useScrolledPast } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * The sticky header (spec 6.1).
 *
 * 76px tall on desktop, 64px on mobile. Transparent over the Home hero at
 * scroll position 0 and solid on every other page; once the visitor has
 * scrolled 40px it takes a paper background, a hairline bottom border and the
 * rest shadow, over 150ms.
 *
 * The current page's link is semibold with a 2px ochre underline and carries
 * aria-current="page", so the state is conveyed to a screen reader and not by
 * colour alone.
 */
export function Header() {
  const pathname = usePathname();
  const isHome = pathname === routes.home;
  const scrolled = useScrolledPast(40);
  const solid = scrolled || !isHome;

  /** Six or more links need the tighter treatment to stay on one line at
   *  1024px. See the note on the nav below. */
  const dense = mainNav.length >= 6;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-150 ease-out",
        solid
          ? "border-b border-border bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
        scrolled && "shadow-rest"
      )}
    >
      <div className="gutter mx-auto flex h-16 max-w-content items-center justify-between lg:h-[76px]">
        {/* The logo always links home. On the Home page it is still a link,
            which is permitted by spec 4.6 provided it is consistent. */}
        <Link
          href={routes.home}
          className="-m-2 flex shrink-0 items-center rounded-[10px] p-2"
          aria-label={`${microcopy.logoAlt} - home`}
        >
          <Logo height={30} className="lg:hidden" />
          <Logo height={36} className="hidden lg:inline-flex" />
        </Link>

        {/* Desktop navigation: five text links plus one button. No dropdowns
            (spec 5.3) - a dropdown on a twelve-page site adds a hover
            interaction for no benefit and breaks on touch devices. */}
        {/* CO-06: the header must survive a sixth nav item without a redesign.
            It does not, unchanged - measured at 1024px, six links plus the
            button need 944px against 928px of available width, so the nav wraps
            onto a second line, which CO-06 forbids.

            The remedy is applied CONDITIONALLY on the item count, so today's
            five-link header keeps its specified 17px links and 18px gaps
            exactly, and the tightening only appears if and when a sixth item is
            added. Both changes are on CO-06's list of permitted fixes - a
            smaller gap, and the link size reduced one step within the type
            scale in spec 4.2.2, which is 17px to 15px. Neither a dropdown nor a
            wrapped nav was considered; CO-06 rules both out.

            Measured with six links: 888px at 1024px, 974px at 1280px. Proven by
            scripts/expansion-tests.mjs, which adds the item, screenshots all
            three widths and removes it again. */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul
            className={cn(
              "flex items-center",
              dense ? "gap-3 xl:gap-[18px]" : "gap-[18px]"
            )}
          >
            {mainNav.map((item) => {
              const current =
                pathname === item.href ||
                (item.href === routes.blog && pathname.startsWith("/blog"));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center px-1 text-ink transition-colors duration-150",
                      dense ? "text-small xl:text-[17px]" : "text-[17px]",
                      current
                        ? "font-semibold underline decoration-ochre decoration-2 underline-offset-8"
                        : "nav-anim font-medium hover:text-fern"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="compact"
            className="hidden lg:inline-flex"
            onClick={() => trackCtaClick("book_call", "header")}
          >
            <Link href={routes.bookACall}>{microcopy.bookCall}</Link>
          </Button>

          <MobileNav currentPath={pathname} />
        </div>
      </div>
    </header>
  );
}
