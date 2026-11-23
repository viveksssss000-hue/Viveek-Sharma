import {
  formMessages,
  hoursOptions,
  softwareOptions,
  usStates,
} from "@/content/pilot";

/**
 * Form validation for both forms, in plain TypeScript.
 *
 * WHY THERE IS NO SCHEMA LIBRARY HERE
 * This started as zod + react-hook-form. Those two cost about 300KB
 * uncompressed - roughly 74KB gzipped - on the pilot page, against a
 * specification budget of 100KB compressed for all JavaScript on a page
 * (spec 9.1). For rules this simple - required, email format, one of a fixed
 * list, at least one box ticked, a box that must be checked - that is a poor
 * trade, so the rules are written out instead.
 *
 * The important property is preserved: ONE validator, used by the browser and
 * by the API route, so a field can never be checked one way on the client and
 * another on the server. Messages come from content/pilot.ts, so the wording is
 * also single-sourced (spec 8.3 requires those exact strings).
 *
 * Spam handling (spec 8.1): a honeypot field plus a timing check, and no visible
 * CAPTCHA, which costs conversions.
 */

/* ------------------------------------------------------------------ */
/* Result type                                                         */
/* ------------------------------------------------------------------ */

export type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: Record<string, string> };

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Deliberately permissive. The job of an email check in a form is to catch
 * typos and obvious nonsense, not to adjudicate RFC 5322 - a pattern strict
 * enough to be "correct" rejects real addresses, and the only real proof an
 * address works is a message arriving at it.
 */
function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isOneOf<T extends readonly string[]>(
  value: unknown,
  options: T
): value is T[number] {
  return typeof value === "string" && (options as readonly string[]).includes(value);
}

function stringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string");
  // A single checkbox posted on its own arrives as a bare string.
  if (typeof value === "string" && value) return [value];
  return [];
}

/* ------------------------------------------------------------------ */
/* Anti-spam                                                           */
/* ------------------------------------------------------------------ */

/** Minimum plausible time for a human to complete a form, in milliseconds. */
export const MIN_FILL_MS = 2500;

/**
 * A submission that trips either check is answered 200 and discarded by the
 * caller. Telling a bot it was detected only teaches it to try again
 * differently.
 *
 * Both checks fail OPEN: a missing timestamp (JavaScript blocked the stamp, a
 * clock is skewed) is treated as human. Losing a real enquiry costs more than
 * letting a spam one through.
 */
export function looksAutomated(input: {
  honeypot?: unknown;
  startedAt?: unknown;
}): boolean {
  if (text(input.honeypot).length > 0) return true;

  const startedAt = Number(input.startedAt);
  if (Number.isFinite(startedAt) && startedAt > 0) {
    const elapsed = Date.now() - startedAt;
    // A negative elapsed time means a forged or clock-skewed timestamp.
    if (elapsed < MIN_FILL_MS) return true;
  }
  return false;
}

/* ------------------------------------------------------------------ */
/* The free pilot request (spec 7.7.2 and 8.3)                         */
/* ------------------------------------------------------------------ */

export type PilotInput = {
  name: string;
  workEmail: string;
  firmName: string;
  firmWebsite: string;
  state: (typeof usStates)[number];
  software: (typeof softwareOptions)[number][];
  scope: string;
  hours: (typeof hoursOptions)[number];
  anythingElse: string;
  consent: true;
  honeypot: string;
  startedAt: number;
};

/** The fields in the order they appear, so focus lands on the first one wrong. */
export const pilotFieldOrder = [
  "name",
  "workEmail",
  "firmName",
  "state",
  "software",
  "scope",
  "hours",
  "consent",
] as const;

export function validatePilot(input: unknown): ValidationResult<PilotInput> {
  const raw = (input ?? {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const name = text(raw.name);
  if (!name) errors.name = formMessages.name.empty;

  const workEmail = text(raw.workEmail);
  if (!workEmail) errors.workEmail = formMessages.email.empty;
  else if (!isEmail(workEmail)) errors.workEmail = formMessages.email.format;

  const firmName = text(raw.firmName);
  if (!firmName) errors.firmName = formMessages.firmName.empty;

  if (!isOneOf(raw.state, usStates)) errors.state = formMessages.state.empty;

  const software = stringArray(raw.software).filter((item) =>
    (softwareOptions as readonly string[]).includes(item)
  );
  if (software.length === 0) errors.software = formMessages.software.empty;

  const scope = text(raw.scope);
  if (!scope) errors.scope = formMessages.scope.empty;

  if (!isOneOf(raw.hours, hoursOptions)) errors.hours = formMessages.hours.empty;

  if (raw.consent !== true) errors.consent = formMessages.consent.empty;

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      workEmail,
      firmName,
      firmWebsite: text(raw.firmWebsite),
      state: raw.state as PilotInput["state"],
      software: software as PilotInput["software"],
      scope,
      hours: raw.hours as PilotInput["hours"],
      anythingElse: text(raw.anythingElse),
      consent: true,
      honeypot: text(raw.honeypot),
      startedAt: Number(raw.startedAt) || 0,
    },
  };
}

/* ------------------------------------------------------------------ */
/* The checklist download (spec 8.2) - three fields only               */
/* ------------------------------------------------------------------ */


