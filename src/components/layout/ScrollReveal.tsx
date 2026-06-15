"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the .reveal / .reveal-stagger scroll animations defined in globals.css.
 *
 * It flags <html> with `js-reveal` so the hidden start-state only applies when
 * JS is available (content stays visible for no-JS users and crawlers), then
 * reveals each element as it enters the viewport. Respects reduced-motion and
 * re-scans after client-side route changes. Renders nothing.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-reveal");

    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .reveal-stagger")
    );

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("reveal-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    els.forEach((el) => {
      if (!el.classList.contains("reveal-in")) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
