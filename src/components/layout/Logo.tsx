import { cn } from "@/lib/utils";

/**
 * The tryACOwork lockup, built as live text rather than an image file.
 *
 * AUTHORISED DEVIATION FROM CHANGE ORDER 01, CO-07
 * CO-07 forbids exactly what this component does - splitting the wordmark into
 * spans to build the ACO treatment in markup - on the grounds that a wordmark
 * rebuilt in HTML will not match the master file and will break at some size.
 * The client overrode that on 23 August, choosing "tryACOwork" everywhere and
 * confirming it when the conflict was put to them.
 *
 * The worry was fair, so it is guarded rather than ignored:
 * `npm run interactions` asserts the lockup renders on one line at both sizes
 * used, in both variants, with the ACO in the accent colour and no overflow.
 *
 * If a real SVG master arrives, replace this whole component with an <Image>.
 * That is the better answer and nothing else needs to change.
 *
 * WHY LIVE TEXT AND NOT AN SVG FILE (spec 4.6 asks for SVG)
 * The brand kit ships PNGs only. Rendering the lockup from the real webfonts
 * gives everything the SVG requirement was asking for - resolution
 * independent, sharp at every size, correct in both the ink and reversed
 * treatments - while costing zero extra network requests and staying
 * selectable and searchable. If the client later supplies a true SVG master,
 * swapping this component for an <Image> is a one-file change.
 *
 * Construction follows the brand kit: Spectral for the soft syllables, Archivo
 * caps for the acronym, ochre on the acronym only.
 *
 * The brand kit's descriptor line has been REMOVED, not just hidden. CO-07 bans
 * the phrase it contained from the entire built site - copy, taglines, the
 * footer, title tags, meta descriptions, alt text and structured data - because
 * it promises compliance services the launch copy cannot answer for. It is an
 * internal expansion of the letters only. `npm run qa` fails if it reappears.
 *
 * Proportions are all derived from `height` so the lockup scales as one piece
 * and never needs a second set of numbers.
 */

type LogoProps = {
  /** Height of the square mark in pixels. Header uses 36 (30 on mobile). */
  height?: number;
  /** `reversed` is for the forest footer and any dark band. */
  variant?: "ink" | "reversed";
  /** Hide the square mark and show the wordmark alone. */
  wordmarkOnly?: boolean;
  className?: string;
};

export function Logo({
  height = 36,
  variant = "ink",
  wordmarkOnly = false,
  className,
}: LogoProps) {
  const reversed = variant === "reversed";

  // Ratios measured from the brand kit master artwork.
  const wordSize = height * 0.7;
  const acoSize = wordSize * 0.75;
  const gap = height * 0.34;


  const wordColor = reversed ? "var(--color-paper)" : "var(--color-ink)";
  const acoColor = reversed
    ? "var(--color-ochre-light)"
    : "var(--color-ochre)";
  const markBg = reversed ? "var(--color-ochre-light)" : "var(--color-ink)";
  const markText = reversed ? "var(--color-ink)" : "var(--color-ochre-light)";

  return (
    <span
      className={cn("inline-flex items-center", className)}
      style={{ gap: `${gap}px` }}
      // The visible text already reads "tryACOwork"; this keeps assistive
      // technology from announcing the mark and the wordmark twice.
      role="img"
      aria-label="tryACOwork"
    >
      {!wordmarkOnly && (
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center justify-center font-sans font-bold"
          style={{
            width: `${height}px`,
            height: `${height}px`,
            backgroundColor: markBg,
            color: markText,
            fontSize: `${height * 0.34}px`,
            letterSpacing: "0.02em",
            lineHeight: 1,
          }}
        >
          ACO
        </span>
      )}

      <span aria-hidden="true" className="inline-flex flex-col justify-center">
        <span
          className="font-serif"
          style={{
            fontSize: `${wordSize}px`,
            lineHeight: 1.05,
            color: wordColor,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
          }}
        >
          try
          <span
            className="font-sans"
            style={{
              fontSize: `${acoSize}px`,
              fontWeight: 700,
              color: acoColor,
              letterSpacing: "0.01em",
            }}
          >
            ACO
          </span>
          work
        </span>

      </span>
    </span>
  );
}
