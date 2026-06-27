"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Slot-machine word rotator: cycles a list of words with a vertical slide.
 * The visible word is aria-hidden; pass a plain-text sr-only fallback in the
 * surrounding markup. Honours prefers-reduced-motion (shows the first word).
 */
export function WordRotator({
  words,
  intervalMs = 2200,
  className,
}: {
  words: string[];
  intervalMs?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setIndex((p) => (p + 1) % words.length),
      intervalMs
    );
    return () => clearInterval(id);
  }, [words.length, intervalMs]);

  return (
    <span
      aria-hidden="true"
      className="relative inline-flex h-[1.15em] overflow-hidden align-bottom"
    >
      <span
        className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.21,1)]"
        style={{ transform: `translateY(-${index * 1.15}em)` }}
      >
        {words.map((w) => (
          <span
            key={w}
            className={cn(
              "block h-[1.15em] whitespace-nowrap leading-[1.15em]",
              className
            )}
          >
            {w}
          </span>
        ))}
      </span>
    </span>
  );
}
