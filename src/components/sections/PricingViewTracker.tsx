"use client";

import { useEffect, useRef } from "react";

import { trackPricingView } from "@/lib/analytics";

/**
 * Fires pricing_section_view when the pricing section has been at least 50
 * percent visible for two continuous seconds (spec 11.2). Once per page view.
 *
 * A plain `threshold: 0.5` would be wrong here: the pricing section is taller
 * than a phone viewport, so 50 percent of the *element* can never be on screen
 * and the event would never fire on mobile. So visibility is measured against
 * whichever is smaller - the section or the viewport - which is what "half of
 * it is on screen" actually means to a reader.
 *
 * The marker is a zero-size span, so it contributes no layout of its own; the
 * observer watches the section it sits inside.
 */
export function PricingViewTracker({ page }: { page: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = ref.current?.parentElement;
    if (!target || typeof IntersectionObserver === "undefined") return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    let fired = false;

    const clear = () => {
      if (timer) {
        clearTimeout(timer);
        timer = undefined;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (fired) return;

        const reference = Math.min(
          entry.boundingClientRect.height,
          window.innerHeight
        );
        const ratio =
          reference > 0 ? entry.intersectionRect.height / reference : 0;

        if (ratio >= 0.5) {
          if (!timer) {
            timer = setTimeout(() => {
              fired = true;
              trackPricingView(page);
              observer.disconnect();
            }, 2000);
          }
        } else {
          clear();
        }
      },
      // Enough steps that a slow scroll still reports crossing the halfway mark.
      { threshold: [0, 0.1, 0.25, 0.4, 0.5, 0.6, 0.75, 0.9, 1] }
    );

    observer.observe(target);
    return () => {
      clear();
      observer.disconnect();
    };
  }, [page]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="block h-0 w-0 overflow-hidden"
    />
  );
}
