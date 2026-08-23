"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { mainNav, microcopy, mobileNavExtra, routes } from "@/content/global";
import { trackCtaClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * The mobile menu (spec 6.1).
 *
 * A full-screen paper overlay with links stacked at 22px and the primary button
 * full width at the bottom.
 *
 * WHY THE NATIVE <dialog> AND NOT A DIALOG LIBRARY
 * Spec 6.1 has four hard requirements: trap keyboard focus while open, close on
 * Escape, return focus to the hamburger on close, and prevent body scroll.
 * `showModal()` gives the first three from the browser itself - the same
 * behaviour a library reimplements in JavaScript, but tested by every browser
 * vendor rather than by one package. The fourth is one line of CSS.
 *
 * That matters here because spec 9.1 sets a hard JavaScript budget, and the
 * dialog library this replaced was 30KB gzipped - the largest single piece of
 * JavaScript on the site that was not React itself.
 *
 * `<dialog>` needs Safari 15.4 and up. Spec 9.4 requires iOS 16 and up, so
 * every supported browser has it.
 */
export function MobileNav({ currentPath }: { currentPath: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // The dialog element is the source of truth for openness; React state only
  // mirrors it so the hamburger's label and icon can follow. Listening to the
  // native `close` event means Escape, the close button and a link tap all end
  // up in the same place.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onClose = () => {
      setOpen(false);
      document.documentElement.style.overflow = "";
      // Browsers restore focus to the invoker themselves, but only if it is
      // still in the document. Doing it explicitly is cheap and certain.
      triggerRef.current?.focus();
    };

    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("close", onClose);
      document.documentElement.style.overflow = "";
    };
  }, []);

  const openMenu = () => {
    setOpen(true);
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.showModal();
  };

  const links = [...mainNav, ...mobileNavExtra];

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openMenu}
        aria-label={microcopy.menuOpen}
        aria-expanded={open}
        className="flex size-11 items-center justify-center rounded-[10px] text-ink lg:hidden"
      >
        <MenuIcon open={false} />
      </button>

      {/* The UA centres a dialog and gives it a border and padding; this makes
          it the full viewport instead. `open:flex` applies only while it is
          actually open, so the closed dialog stays display:none. */}
      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className={cn(
          "m-0 h-full max-h-full w-full max-w-full border-0 bg-paper p-0 text-ink",
          "backdrop:bg-ink/40 open:flex open:flex-col lg:hidden"
        )}
      >
        <div className="gutter flex h-16 shrink-0 items-center justify-between">
          <Logo height={30} />
          <button
            type="button"
            onClick={close}
            aria-label={microcopy.menuClose}
            className="flex size-11 items-center justify-center rounded-[10px] text-ink"
          >
            <MenuIcon open />
          </button>
        </div>

        <nav
          aria-label="Menu"
          className="gutter flex-1 overflow-y-auto pt-6 pb-8"
        >
          <ul className="flex flex-col gap-5">
            {links.map((item) => {
              const current =
                currentPath === item.href ||
                (item.href === routes.blog && currentPath.startsWith("/blog"));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center text-[22px]",
                      current
                        ? "font-semibold underline decoration-ochre decoration-2 underline-offset-8"
                        : "font-medium text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="gutter shrink-0 border-t border-border py-4">
          <Button
            asChild
            full
            onClick={() => {
              trackCtaClick("book_call", "mobile_menu");
              close();
            }}
          >
            <Link href={routes.bookACall}>{microcopy.bookCall}</Link>
          </Button>
        </div>
      </dialog>
    </>
  );
}

/**
 * Hamburger and close, as one inline SVG that swaps paths (spec 4.7).
 * 1.75px stroke, rounded caps, 24px viewbox, no fill, inherits currentColor.
 */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}
