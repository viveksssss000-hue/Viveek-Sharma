"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import type { ValidationResult } from "@/lib/validations";

/**
 * The shared behaviour behind both forms, so spec 8.1 is implemented once.
 *
 * What it guarantees for any form that uses it:
 *  - Validation runs on submit, using the same validator the API route uses.
 *  - On failure, focus moves to the first field with an error, in visual order,
 *    and an error summary appears above the form announced with aria-live.
 *  - The submit button shows a loading state and is disabled while submitting,
 *    so nobody double-submits.
 *  - On success it redirects, rather than swapping the form for a message: the
 *    redirect is what makes the conversion tracking reliable (spec 11.4).
 *  - A failed request produces a plain sentence with a way to reach a human,
 *    never a silent nothing.
 *  - The timing half of the spam check is stamped after mount, into a hidden
 *    input, so no impure value is read during render.
 */

type Options<T> = {
  /** Where to POST. */
  endpoint: string;
  /** The shared validator - the same function the API route calls. */
  validate: (input: unknown) => ValidationResult<T>;
  /** Field names in the order they appear on screen. */
  fieldOrder: readonly string[];
  /** Where to send the visitor on success. */
  successPath: string;
  /** Read the current values out of the form element. */
  readValues: (form: HTMLFormElement) => Record<string, unknown>;
};

export function useFormSubmit<T>({
  endpoint,
  validate,
  fieldOrder,
  successPath,
  readValues,
}: Options<T>) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  // Stamped after mount rather than during render: Date.now() in a render body
  // is impure, and a value that changes between renders is what React's rules
  // warn about.
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  /** Moves focus to the first field with an error, in the order given. */
  const focusFirstError = useCallback(
    (found: Record<string, string>) => {
      const form = formRef.current;
      if (!form) return;
      const first = fieldOrder.find((field) => found[field]);
      if (!first) return;
      const target = form.querySelector<HTMLElement>(
        `[name="${first}"], [data-field="${first}"]`
      );
      target?.focus();
    },
    [fieldOrder]
  );

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFailed(null);

      const form = event.currentTarget;
      const values = readValues(form);
      const result = validate(values);

      if (!result.ok) {
        setErrors(result.errors);
        focusFirstError(result.errors);
        return;
      }

      setErrors({});
      setSubmitting(true);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result.data),
        });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        router.push(successPath);
      } catch {
        setSubmitting(false);
        setFailed(
          "Something went wrong sending that. Please try again, or email us at hello@tryacowork.com and we will pick it up from there."
        );
      }
    },
    [endpoint, focusFirstError, readValues, router, successPath, validate]
  );

  return {
    formRef,
    startedAtRef,
    errors,
    submitting,
    failed,
    onSubmit,
    errorCount: Object.keys(errors).length,
  };
}

/** Reads a hidden input's value out of a form, as a number. */
export function readNumber(form: HTMLFormElement, name: string): number {
  const field = form.elements.namedItem(name);
  const value = field instanceof HTMLInputElement ? field.value : "";
  return Number(value) || 0;
}

/** Reads every checked box sharing a name. */
export function readCheckboxGroup(form: HTMLFormElement, name: string): string[] {
  return [...form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`)]
    .filter((input) => input.checked)
    .map((input) => input.value);
}
