"use client";

import { useSyncExternalStore } from "react";

import { CONSENT_EVENT, getConsent, type ConsentValue } from "@/lib/consent";

/**
 * Two hooks over browser state that React does not own: the stored cookie
 * choice, and how far down the page the visitor has scrolled.
 *
 * Both use useSyncExternalStore rather than useEffect + setState. That is not
 * ceremony - reading localStorage or window.scrollY in an effect and calling
 * setState triggers a second render pass on every mount, which React 19's lint
 * rules flag for good reason. useSyncExternalStore is the API built for exactly
 * this: subscribe to something outside React, read its current value, and give
 * the server a value to render.
 */

/** "unknown" until the browser has been read; null means no choice stored. */
export type ConsentState = ConsentValue | null | "unknown";

function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  // Another tab may have accepted or declined. Honour that here too.
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/**
 * The server, and the first hydration render, both see "unknown". That is what
 * stops the cookie banner appearing for a split second to someone who already
 * dismissed it months ago: the markup ships with the banner absent, and only
 * once React is running does the real stored value arrive.
 */
export function useConsent(): ConsentState {
  return useSyncExternalStore(
    subscribeConsent,
    getConsent,
    () => "unknown" as const
  );
}

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange, { passive: true });
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/** True once the page has been scrolled more than `pixels` from the top. */
export function useScrolledPast(pixels: number): boolean {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > pixels,
    () => false
  );
}

/** True once the visitor has scrolled past `fraction` of the viewport height. */
export function useScrolledPastViewport(fraction: number): boolean {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > window.innerHeight * fraction,
    () => false
  );
}
