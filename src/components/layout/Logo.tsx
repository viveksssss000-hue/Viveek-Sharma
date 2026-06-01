import Link from "next/link";

import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Text wordmark stand-in for the brand logo.
 * TODO(client): replace with the final Acowork logo (public/logo.svg) once provided.
 */
export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-md bg-accent text-accent-foreground text-sm font-bold"
      >
        A
      </span>
      <span
        className={cn(
          "text-xl font-bold tracking-tight",
          onDark ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {site.name}
      </span>
    </Link>
  );
}
