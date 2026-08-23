"use client";

import * as React from "react";

import { microcopy } from "@/content/global";
import { cn } from "@/lib/utils";

/**
 * Form field primitives (spec 8.1).
 *
 * Every field here obeys the same seven rules, so a new form cannot get them
 * wrong: a visible label above the input, the word "Required" rather than a
 * bare asterisk, the error message directly below the field in error red with
 * a warning icon, the field border turning red as a second signal so colour is
 * never the only one, the error linked to the input with aria-describedby, a
 * 44px minimum height, and a correct autocomplete attribute.
 */

const controlBase = [
  "w-full rounded-[10px] border bg-surface px-4 py-3 text-body text-ink",
  "min-h-[52px] transition-[border-color,box-shadow] duration-150",
  "placeholder:text-ink-muted/60",
].join(" ");

function controlClass(invalid: boolean) {
  return cn(
    controlBase,
    invalid ? "border-error border-[1.5px]" : "border-border hover:border-fern/50"
  );
}

/* --- Label, help text and error ------------------------------------ */

/**
 * `tone="dark"` is for the forest footer. Without it the "Required" marker
 * inherits ink-muted and becomes dark grey on dark green - technically present,
 * practically invisible. paper at 80 percent gives 7.9:1 on forest.
 */
export function FieldLabel({
  htmlFor,
  children,
  required,
  tone = "light",
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "flex flex-wrap items-baseline gap-2 font-medium",
        dark ? "text-paper" : "text-ink"
      )}
    >
      <span>{children}</span>
      {required && (
        <span
          className={cn(
            "text-small font-normal",
            dark ? "text-paper/80" : "text-ink-muted"
          )}
        >
          {microcopy.required}
        </span>
      )}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-start gap-2 text-small text-error">
      <WarningIcon />
      <span>{message}</span>
    </p>
  );
}

function FieldHelp({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="text-small text-ink-muted">
      {children}
    </p>
  );
}

/** Wraps label, control, help and error into the standard vertical stack. */
export function Field({
  id,
  label,
  required,
  help,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  children: (aria: {
    id: string;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
  }) => React.ReactNode;
}) {
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  const describedBy =
    [error ? errorId : null, help ? helpId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className="flex flex-col gap-2">
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      {help && <FieldHelp id={helpId}>{help}</FieldHelp>}
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

/* --- Controls ------------------------------------------------------ */

export const TextInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { invalid?: boolean }
>(function TextInput({ className, invalid = false, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(controlClass(invalid), className)}
      {...props}
    />
  );
});

export const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & { invalid?: boolean }
>(function TextArea({ className, invalid = false, rows = 4, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(controlClass(invalid), "min-h-[120px] resize-y", className)}
      {...props}
    />
  );
});

/**
 * A native select, deliberately. A custom listbox is more code, more
 * JavaScript and worse on a phone than the control the operating system
 * already provides - and this form has a 51-option state list.
 */
export const Select = React.forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select"> & { invalid?: boolean; placeholder?: string }
>(function Select(
  { className, invalid = false, placeholder, children, ...props },
  ref
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          controlClass(invalid),
          "appearance-none pr-11",
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      <ChevronIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted" />
    </div>
  );
});

/** A checkbox with its label to the right, sized to the 44px touch target. */
export const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { label: React.ReactNode }
>(function Checkbox({ className, label, id, ...props }, ref) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex min-h-11 cursor-pointer items-start gap-3 py-1",
        className
      )}
    >
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className="mt-1 size-5 shrink-0 accent-[var(--color-fern)]"
        {...props}
      />
      <span className="text-body">{label}</span>
    </label>
  );
});

/**
 * The honeypot: a field a human never sees and a bot usually fills.
 * Hidden from sight, from assistive technology and from the tab order - but
 * still a real input, so an automated submission carries it.
 */
export function Honeypot(props: React.ComponentProps<"input">) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="company_website_url">Company website URL</label>
      <input
        id="company_website_url"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        {...props}
      />
    </div>
  );
}

/**
 * The error summary above the form (spec 8.1). Announced politely, so a screen
 * reader hears it after a failed submit without interrupting the user mid-word.
 */
export function ErrorSummary({
  message,
  count,
}: {
  message: string;
  count: number;
}) {
  return (
    <div role="alert" aria-live="polite" className="min-h-0">
      {count > 0 && (
        <p className="flex items-start gap-2 rounded-[10px] border border-error bg-error/5 p-4 text-body text-error">
          <WarningIcon className="mt-1" />
          <span>{message}</span>
        </p>
      )}
    </div>
  );
}

/* --- Icons (inline SVG only, spec 4.7) ---------------------------- */

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
