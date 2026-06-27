"use client";

import { useEffect } from "react";

/**
 * Pointer-tilt for any element with the `.tilt` class: the card rotates
 * slightly toward the cursor (with a small lift) for a tactile, 3D feel.
 * One delegated listener handles every card. Only runs on fine-pointer,
 * hover-capable devices, and never under prefers-reduced-motion. Renders
 * nothing.
 */
export function TiltCards() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reduced) return;

    const MAX = 7; // max tilt in degrees

    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        ".tilt"
      );
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transition = "transform 0.08s ease-out";
      el.style.transform = `perspective(900px) rotateX(${(-py * MAX).toFixed(
        2
      )}deg) rotateY(${(px * MAX).toFixed(2)}deg) translateY(-6px)`;
    };

    const onOut = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        ".tilt"
      );
      if (!el) return;
      const related = e.relatedTarget as Node | null;
      if (related && el.contains(related)) return; // still inside the card
      el.style.transition = "transform 0.5s cubic-bezier(0.22,0.61,0.21,1)";
      el.style.transform = "";
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
    };
  }, []);

  return null;
}
