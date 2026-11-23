"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * ScrollReveal - the entrance choreography of the site (spec 4.8, extended at
 * the client's request on 22 November).
 *
 * globals.css carried `.reveal` and `.reveal-in` from the first build, with a
 * comment saying "Applied by ScrollReveal" - but the component was never
 * written, so nothing on the site ever moved. This is that component, plus
 * the extension: direction variants, and a cascade for children marked with
 * the `rv-item` class.
 *
 * One grammar: things rise into place, ONCE, and never again on scrolling
 * back up - the observer disconnects on first intersection.
 *
 * THREE RULES THIS IMPLEMENTATION WILL NOT BREAK
 *
 * 1. Content is never hidden by code that might not run.
 *    `.reveal` and `.reveal-stagger` set `opacity: 0`. If either were in the
 *    server-rendered HTML and the JavaScript failed, the page would be blank
 *    text on a blank ground - and invisible to anyone testing with scripts
 *    on. So the classes are added by this effect, which only runs when
 *    JavaScript is running. No JS means no animation and a readable page.
 *
 * 2. Nothing already on screen is hidden and re-shown.
 *    Hydration happens after first paint. Hiding something the visitor can
 *    already see would blink it. Anything within the viewport at mount is
 *    left exactly as it is.
 *
 * 3. A visitor who asked for less motion gets none.
 *    Checked here as well as in CSS, so the elements never even acquire the
 *    hidden state.
 */
export function ScrollReveal({
  children,
  className,
  /** Direction variant: rise (default), left, right or scale. */
  variant,
}: {
  children: ReactNode;
  className?: string;
  variant?: "left" | "right" | "scale";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Rule 3: honour the system setting before anything is hidden.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Rule 2: already visible - by even a pixel - means left alone. The
    // guard must cover the WHOLE viewport: an earlier 0.92 factor let a
    // section whose top sat in the bottom 8% paint visible and then be
    // hidden by this effect, exactly what Rule 2 forbids.
    const box = el.getBoundingClientRect();
    if (box.top < window.innerHeight) return;

    // The cascade: children marked rv-item get an index for their
    // transition-delay, capped so long lists never dawdle at the tail.
    const items = el.querySelectorAll<HTMLElement>(".rv-item");
    items.forEach((item, i) =>
      item.style.setProperty("--i", String(Math.min(i, 14)))
    );
    if (items.length > 0) el.classList.add("reveal-stagger");

    // Rule 1: only now, with JavaScript proven to run, hide anything.
    el.classList.add("reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("reveal-in");
          observer.disconnect(); // once, never on the way back up
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);

    // Keyboard rescue (WCAG 2.4.7): tabbing can move focus into a section
    // before it has scrolled past the reveal line, which would put the focus
    // ring on an invisible control. Focus arriving anywhere inside reveals
    // immediately, with .reveal-now zeroing the cascade delays.
    const revealNow = () => {
      el.classList.add("reveal-now", "reveal-in");
      observer.disconnect();
      el.removeEventListener("focusin", revealNow);
    };
    el.addEventListener("focusin", revealNow);

    return () => {
      observer.disconnect();
      el.removeEventListener("focusin", revealNow);
    };
  }, []);

  return (
    <div ref={ref} data-rv={variant} className={className}>
      {children}
    </div>
  );
}
