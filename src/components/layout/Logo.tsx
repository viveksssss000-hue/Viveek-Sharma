import Link from "next/link";

import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Flowline brand lockup - the node-path workflow mark plus the lowercase
 * wordmark with the lime "a" (the spark of automation). From the brand kit:
 * keep it lowercase, never swap the spark off the "a".
 */
export function Logo({ className }: { className?: string; onDark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} - home`}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      <svg
        aria-hidden="true"
        width="30"
        height="30"
        viewBox="0 0 78 78"
        fill="none"
      >
        <rect
          x="2"
          y="2"
          width="74"
          height="74"
          rx="17"
          stroke="rgba(124,92,255,.5)"
          strokeWidth="2"
        />
        <path
          d="M16 50 L32 50 L40 30 L48 50 L62 50"
          stroke="url(#tac_logo)"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="50" r="5" fill="#7C5CFF" />
        <circle cx="40" cy="30" r="5" fill="#1FE3D6" />
        <circle cx="62" cy="50" r="5.5" fill="#C9FF3D" />
        <defs>
          <linearGradient
            id="tac_logo"
            x1="16"
            y1="40"
            x2="62"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7C5CFF" />
            <stop offset="1" stopColor="#1FE3D6" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-xl font-bold tracking-tight text-foreground">
        try
        <span className="text-accent">a</span>
        cowork
      </span>
    </Link>
  );
}
