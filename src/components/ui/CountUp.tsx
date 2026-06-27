"use client";

import { useEffect, useRef, useState } from "react";

// Splits a stat string into an optional sign, a number, and a trailing suffix.
// e.g. "-72%" -> ["-","72","%"], "3.5h" -> ["","3.5","h"],
//      "2× follow-ups" -> ["","2","× follow-ups"], "Never" -> no match.
const NUM_RE = /^(-?)(\d+(?:\.\d+)?)(.*)$/;

/**
 * Animated number that counts up from 0 to its value when scrolled into view.
 * SSR/no-JS render the final value (good for crawlers); non-numeric values are
 * passed straight through. Honours prefers-reduced-motion.
 */
export function CountUp({
  value,
  className,
  durationMs = 1400,
}: {
  value: string;
  className?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(NUM_RE);
    if (!el || !match) {
      setDisplay(value);
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      setDisplay(value);
      return;
    }

    const sign = match[1];
    const target = parseFloat(match[2]);
    const decimals = (match[2].split(".")[1] ?? "").length;
    const suffix = match[3];
    const format = (n: number) => `${sign}${n.toFixed(decimals)}${suffix}`;

    setDisplay(format(0));
    let raf = 0;
    let started = false;

    const animate = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / durationMs, 1);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        if (t < 1) {
          setDisplay(format(target * eased));
          raf = requestAnimationFrame(tick);
        } else {
          setDisplay(value); // exact final string
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
