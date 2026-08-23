"use client";

import Link from "next/link";
import { useCallback } from "react";

import {
  Checkbox,
  ErrorSummary,
  FieldError,
  FieldLabel,
  Honeypot,
  TextInput,
} from "@/components/forms/Fields";
import { readNumber, useFormSubmit } from "@/components/forms/useFormSubmit";
import { Button } from "@/components/ui/button";
import { microcopy, routes } from "@/content/global";
import { trackCtaClick } from "@/lib/analytics";
import {
  checklistFieldOrder,
  validateChecklist,
  type ChecklistFormLocation,
} from "@/lib/validations";
import { cn } from "@/lib/utils";

/**
 * The checklist lead magnet form (spec 8.2 and 8.5). Three fields only.
 *
 * The copy promises "no sales sequence - we send the checklist and that is it",
 * and spec 8.5 requires that promise to be honoured: one email, no nurture. If
 * that ever changes, the copy on the form has to change first.
 *
 * On success it redirects to /thank-you-checklist, carrying the form location
 * through so the GA4 event knows whether the signup came from the footer, the
 * blog index or inside an article. The conversion fires on that page, not here.
 */

type Props = {
  location: ChecklistFormLocation;
  /** `dark` is for the forest footer; `light` for paper and sand grounds. */
  tone?: "dark" | "light";
};

export function ChecklistForm({ location, tone = "light" }: Props) {
  const dark = tone === "dark";
  const idPrefix = `checklist-${location}`;

  const readValues = useCallback(
    (form: HTMLFormElement) => ({
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement)?.value,
      workEmail: (form.elements.namedItem("workEmail") as HTMLInputElement)?.value,
      consent:
        (form.elements.namedItem("consent") as HTMLInputElement)?.checked === true,
      formLocation: location,
      honeypot:
        (form.elements.namedItem("company_website_url") as HTMLInputElement)?.value ??
        "",
      startedAt: readNumber(form, "startedAt"),
    }),
    [location]
  );

  const {
    formRef,
    startedAtRef,
    errors,
    submitting,
    failed,
    onSubmit,
    errorCount,
  } = useFormSubmit({
    endpoint: "/api/checklist",
    validate: validateChecklist,
    fieldOrder: checklistFieldOrder,
    // The location travels in the URL so the conversion event on the thank-you
    // page knows where the signup came from.
    successPath: `${routes.thankYouChecklist}?from=${location}`,
    readValues,
  });

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-4"
    >
      <Honeypot name="company_website_url" />
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="0" />

      <ErrorSummary
        message="Please check the fields below before sending."
        count={errorCount}
      />

      <div className="flex flex-col gap-2">
        <FieldLabel
          htmlFor={`${idPrefix}-firstName`}
          required
          tone={dark ? "dark" : "light"}
        >
          First name
        </FieldLabel>
        <TextInput
          id={`${idPrefix}-firstName`}
          name="firstName"
          autoComplete="given-name"
          invalid={Boolean(errors.firstName)}
          aria-invalid={errors.firstName ? true : undefined}
          aria-describedby={
            errors.firstName ? `${idPrefix}-firstName-error` : undefined
          }
        />
        <FieldError
          id={`${idPrefix}-firstName-error`}
          message={errors.firstName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <FieldLabel
          htmlFor={`${idPrefix}-workEmail`}
          required
          tone={dark ? "dark" : "light"}
        >
          Work email
        </FieldLabel>
        <TextInput
          id={`${idPrefix}-workEmail`}
          name="workEmail"
          type="email"
          inputMode="email"
          autoComplete="email"
          invalid={Boolean(errors.workEmail)}
          aria-invalid={errors.workEmail ? true : undefined}
          aria-describedby={
            errors.workEmail ? `${idPrefix}-workEmail-error` : undefined
          }
        />
        <FieldError
          id={`${idPrefix}-workEmail-error`}
          message={errors.workEmail}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Checkbox
          id={`${idPrefix}-consent`}
          name="consent"
          data-field="consent"
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={
            errors.consent ? `${idPrefix}-consent-error` : undefined
          }
          label={
            <span
              className={cn(
                "text-small",
                dark ? "text-paper/85" : "text-ink-muted"
              )}
            >
              Send me the checklist. I have read the{" "}
              <Link
                href={routes.privacy}
                className={cn(
                  "underline underline-offset-2",
                  dark ? "text-paper" : "text-fern"
                )}
              >
                privacy policy
              </Link>
              .
            </span>
          }
        />
        <FieldError id={`${idPrefix}-consent-error`} message={errors.consent} />
      </div>

      <Button
        type="submit"
        variant={dark ? "onDark" : "primary"}
        size="compact"
        full
        disabled={submitting}
        onClick={() =>
          trackCtaClick("pilot", location === "footer" ? "footer" : "body")
        }
      >
        {submitting ? microcopy.submitting : microcopy.checklistSubmit}
      </Button>

      {failed && (
        <p
          role="alert"
          className={cn("text-small", dark ? "text-ochre-light" : "text-error")}
        >
          {failed}
        </p>
      )}

      <p className={cn("text-small", dark ? "text-paper/70" : "text-ink-muted")}>
        {microcopy.privacyLineForms}
      </p>
    </form>
  );
}
