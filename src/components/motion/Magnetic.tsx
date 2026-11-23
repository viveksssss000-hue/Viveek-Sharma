"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Magnetic - the wrapped element leans a few pixels toward the pointer and
 * eases back when it leaves. Used on the two or three buttons that matter
 * most; a page full of magnets is a page full of noise.
 *
 * Gated twice: pointer-fine (a finger cannot hover, so touch devices skip the
 * listener entirely) and prefers-reduced-motion. The transform is written
 * inside requestAnimationFrame so a fast pointer never queues more work than
 * one frame can clear, and the transition on the wrapper is what makes the
 * movement ease rather than snap.
 */
export function Magnetic({
  children,
  className,
  /** How strongly the element follows the pointer. */
  strength = 0.22,
  /** The leash, in pixels - it never moves further than this. */
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const clamp = (v: number) => Math.max(-max, Math.min(max, v));

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = clamp((e.clientX - (r.left + r.width / 2)) * strength);
      const y = clamp((e.clientY - (r.top + r.height / 2)) * strength);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [strength, max]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: "transform 300ms cubic-bezier(0.2, 0.7, 0.3, 1)" }}
    >
      {children}
    </div>
  );
}
