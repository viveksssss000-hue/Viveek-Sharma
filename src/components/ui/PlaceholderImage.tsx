import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Image slot that renders the real photograph when one exists, and an honest
 * placeholder when it does not.
 *
 * Spec 0.1 on [PLACEHOLDER IMAGE]: "use a neutral warm-grey block of the exact
 * specified dimensions with the description as its alt text. Do not substitute
 * a stock photo of models in suits." So there is deliberately no stock imagery
 * anywhere in this codebase, and no way to add one by accident.
 *
 * The brief stays visible on the block rather than hidden in a comment. That is
 * intentional: an obviously unfinished block is what stops the site launching
 * with a grey rectangle nobody noticed. Spec 13.1 makes replacing every one of
 * these a launch blocker.
 */

type Props = {
  src?: string | null;
  alt: string;
  width: number;
  height: number;
  /** What photograph belongs here, shown on the placeholder block. */
  note?: string;
  /** The hero image only. Sets fetchpriority high and skips lazy loading. */
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Rounded corners: 12px for cards and images (spec 4.3). */
  rounded?: boolean;
};

export function PlaceholderImage({
  src,
  alt,
  width,
  height,
  note,
  priority = false,
  sizes,
  className,
  rounded = true,
}: Props) {
  const shape = cn(rounded && "rounded-[12px]", className);

  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={sizes}
        className={cn("h-auto w-full object-cover", shape)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      // Explicit dimensions via aspect-ratio, so the block reserves exactly the
      // space the real photograph will take and nothing shifts when it lands.
      style={{ aspectRatio: `${width} / ${height}` }}
      className={cn(
        "flex w-full items-center justify-center border border-border bg-sand-deep p-6",
        shape
      )}
    >
      {note && (
        <span className="max-w-[42ch] text-center text-small text-ink-muted">
          <span className="font-semibold uppercase tracking-[0.08em]">
            Photograph needed
          </span>
          <span className="mt-2 block">{note}</span>
          <span className="mt-2 block opacity-70">
            {width} x {height}
          </span>
        </span>
      )}
    </div>
  );
}
