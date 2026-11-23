import { cn } from "@/lib/utils";

/**
 * Icons (spec 4.7). Inline SVG only - no icon fonts, no CDN icon library, no
 * emoji used as icons. 1.75px stroke, rounded caps and joins, 24px viewbox, no
 * fill, colour inherited via currentColor so an icon adapts inside a dark band.
 *
 * Every decorative icon carries aria-hidden="true", which is the default here.
 */

type IconProps = {
  size?: number;
  className?: string;
  /** Set only when the icon is the sole content of a button or link. */
  title?: string;
};

function Icon({
  size = 24,
  className,
  title,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      aria-label={title}
    >
      {children}
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path pathLength={1} d="m4 12.5 5 5L20 6.5" />
    </Icon>
  );
}

export function CrossIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path pathLength={1} d="M18 6 6 18" />
      <path pathLength={1} d="m6 6 12 12" />
    </Icon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Icon>
  );
}

export function PlusMinusIcon({
  open,
  size = 24,
  className,
}: IconProps & { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className={cn("shrink-0 transition-transform duration-250", className)}
      aria-hidden="true"
    >
      <path d="M4 12h16" />
      {/* The vertical stroke rotates away rather than disappearing, which is
          why this is an SVG and not a unicode character (spec 4.4.4). */}
      <path
        d="M12 4v16"
        className="origin-center transition-transform duration-250 ease-out"
        style={{ transform: open ? "rotate(90deg)" : "none" }}
      />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19.5c1.2-3.2 3.8-4.8 7-4.8s5.8 1.6 7 4.8" />
    </Icon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </Icon>
  );
}

export function ClipboardIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 4h6v3H9z" />
      <path d="M15 5.5h2.5A1.5 1.5 0 0 1 19 7v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19V7a1.5 1.5 0 0 1 1.5-1.5H9" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </Icon>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.5 5 6v5.5c0 4 2.9 7.6 7 9 4.1-1.4 7-5 7-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </Icon>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 5.5V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h.5" />
    </Icon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Icon>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M5 19h14" />
    </Icon>
  );
}

/** Maps the icon names used in content modules to components. */
export const iconByName = {
  search: SearchIcon,
  clipboard: ClipboardIcon,
  check: CheckIcon,
  shield: ShieldIcon,
  clock: ClockIcon,
} as const;

export type IconName = keyof typeof iconByName;
