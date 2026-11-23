import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * Decorative brand artwork, drawn in the brand's own palette - sand grounds,
 * ochre-light accents, a fern line. No photography: spec 4.5 forbids stock
 * and AI-generated people, and the client confirmed "no photography at all",
 * so the visual interest comes from the brand system itself.
 *
 * Both pieces are aria-hidden and pointer-events-none: they are texture, not
 * content, and a screen reader should never know they exist. The bars rise
 * on load (.lm-bar, CSS-only, reduced-motion safe) and the whole piece
 * floats and drifts gently where the browser supports it.
 */

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** The hero's backdrop: a soft sand field with rising ochre bars. */
export function GrowthGlow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
    >
      <div className="drift-view">
        <div className="float-slow">
          <svg viewBox="0 0 420 420" className="h-auto w-full" fill="none">
            {/* Soft ground shapes, sand on paper. */}
            <circle cx="290" cy="130" r="150" fill="var(--color-sand)" />
            <circle
              cx="150"
              cy="300"
              r="120"
              fill="var(--color-sand-deep)"
              opacity="0.6"
            />
            {/* A fern baseline for the bars to stand on. */}
            <path
              d="M70 330 H 360"
              stroke="var(--color-fern)"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.35"
            />
            {/* Rising bars, ochre growing out of sand. */}
            <rect
              className="lm-bar"
              x="100"
              y="260"
              width="34"
              height="70"
              rx="6"
              fill="var(--color-sand-deep)"
              style={delay(0)}
            />
            <rect
              className="lm-bar"
              x="152"
              y="222"
              width="34"
              height="108"
              rx="6"
              fill="var(--color-ochre-light)"
              opacity="0.55"
              style={delay(90)}
            />
            <rect
              className="lm-bar"
              x="204"
              y="178"
              width="34"
              height="152"
              rx="6"
              fill="var(--color-ochre-light)"
              opacity="0.8"
              style={delay(180)}
            />
            <rect
              className="lm-bar"
              x="256"
              y="128"
              width="34"
              height="202"
              rx="6"
              fill="var(--color-ochre)"
              opacity="0.9"
              style={delay(270)}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/** A faint echo of the same bars for the forest closing band's corner.
 *
 * Deliberately STATIC (no .lm-bar): the rise animation is time-based and the
 * closing band sits several viewports below the fold, so the bars would
 * finish rising long before anyone scrolled to them - a dead effect that
 * still costs a paint. GrowthGlow keeps its rise because the hero is on
 * screen at load, which is the moment the animation describes. */
export function BandBars({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
    >
      <svg viewBox="0 0 200 140" className="h-auto w-full" fill="none">
        <rect
          x="10"
          y="90"
          width="28"
          height="50"
          rx="5"
          fill="var(--color-ochre-light)"
          opacity="0.5"
        />
        <rect
          x="54"
          y="62"
          width="28"
          height="78"
          rx="5"
          fill="var(--color-ochre-light)"
          opacity="0.7"
        />
        <rect
          x="98"
          y="34"
          width="28"
          height="106"
          rx="5"
          fill="var(--color-ochre-light)"
          opacity="0.9"
        />
        <rect
          x="142"
          y="6"
          width="28"
          height="134"
          rx="5"
          fill="var(--color-ochre-light)"
        />
      </svg>
    </div>
  );
}
