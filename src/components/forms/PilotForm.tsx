"use client";

import Link from "next/link";
import { useCallback } from "react";

import {
  Checkbox,
  ErrorSummary,
  Field,
  FieldError,
  Honeypot,
  Select,
  TextArea,
  TextInput,
} from "@/components/forms/Fields";
import {
  readCheckboxGroup,
  readNumber,
  useFormSubmit,
} from "@/components/forms/useFormSubmit";
import { Button } from "@/components/ui/button";
import { microcopy, routes } from "@/content/global";
import {
  formCopy,
  formMessages,
  hoursOptions,
  softwareOptions,
  usStates,
} from "@/content/pilot";
import { pilotFieldOrder, validatePilot } from "@/lib/validations";

/**
 * The free pilot request form (spec 7.7.2, 8.1 and 8.3).
 *
 * Ten fields, and not one more: every extra field measurably reduces
 * submissions. No phone number is asked for on any form on this site - if
 * someone wants a call, the booking page handles it.
 *
 * Behaviour comes from useFormSubmit, which implements spec 8.1 once for both
 * forms. Validation uses the same function the API route calls, so a field
 * cannot be checked one way here and another on the server.
 */
export function PilotForm() {
  const readValues = useCallback(
    (form: HTMLFormElement) => ({
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
      workEmail: (form.elements.namedItem("workEmail") as HTMLInputElement)?.value,
      firmName: (form.elements.namedItem("firmName") as HTMLInputElement)?.value,
      firmWebsite: (form.elements.namedItem("firmWebsite") as HTMLInputElement)?.value,
      state: (form.elements.namedItem("state") as HTMLSelectElement)?.value,
      software: readCheckboxGroup(form, "software"),
      scope: (form.elements.namedItem("scope") as HTMLTextAreaElement)?.value,
      hours: (form.elements.namedItem("hours") as HTMLSelectElement)?.value,
      anythingElse: (form.elements.namedItem("anythingElse") as HTMLTextAreaElement)?.value,
      consent: (form.elements.namedItem("consent") as HTMLInputElement)?.checked === true,
      honeypot: (form.elements.namedItem("company_website_url") as HTMLInputElement)?.value ?? "",
      startedAt: readNumber(form, "startedAt"),
    }),
    []
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
    endpoint: "/api/pilot",
    validate: validatePilot,
    fieldOrder: pilotFieldOrder,
    successPath: routes.thankYou,
    readValues,
  });

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="grid gap-8"
    >
      <Honeypot name="company_website_url" />
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="0" />

      <ErrorSummary message={formMessages.summary} count={errorCount} />

      <Field
        id="pilot-name"
        label={formCopy.labels.name}
        required
        error={errors.name}
      >
        {(aria) => (
          <TextInput
            {...aria}
            name="name"
            autoComplete="name"
            invalid={Boolean(errors.name)}
          />
        )}
      </Field>

      <Field
        id="pilot-workEmail"
        label={formCopy.labels.email}
        required
        error={errors.workEmail}
      >
        {(aria) => (
          <TextInput
            {...aria}
            name="workEmail"
            type="email"
            inputMode="email"
            autoComplete="email"
            invalid={Boolean(errors.workEmail)}
          />
        )}
      </Field>

      <Field
        id="pilot-firmName"
        label={formCopy.labels.firmName}
        required
        error={errors.firmName}
      >
        {(aria) => (
          <TextInput
            {...aria}
            name="firmName"
            autoComplete="organization"
            invalid={Boolean(errors.firmName)}
          />
        )}
      </Field>

      <Field id="pilot-firmWebsite" label={formCopy.labels.firmWebsite}>
        {(aria) => (
          <TextInput
            {...aria}
            name="firmWebsite"
            autoComplete="url"
            placeholder="yourfirm.com"
          />
        )}
      </Field>

      <Field
        id="pilot-state"
        label={formCopy.labels.state}
        required
        error={errors.state}
      >
        {(aria) => (
          <Select
            {...aria}
            name="state"
            defaultValue=""
            placeholder="Choose one"
            invalid={Boolean(errors.state)}
          >
            {usStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </Select>
        )}
      </Field>

      {/* A checkbox group needs a fieldset and legend rather than a label, so a
          screen reader hears the question before the options. `data-field` lets
          the shared focus handler find the first box when nothing is ticked. */}
      <fieldset className="flex flex-col gap-2">
        <legend className="flex flex-wrap items-baseline gap-2 font-medium text-ink">
          <span>{formCopy.labels.software}</span>
          <span className="text-small font-normal text-ink-muted">
            {microcopy.required}
          </span>
        </legend>
        <div
          className="mt-2 grid gap-1 sm:grid-cols-2"
          aria-describedby={errors.software ? "pilot-software-error" : undefined}
        >
          {softwareOptions.map((option, index) => (
            <Checkbox
              key={option}
              id={`pilot-software-${option.replace(/\W+/g, "-").toLowerCase()}`}
              name="software"
              value={option}
              label={option}
              data-field={index === 0 ? "software" : undefined}
              aria-invalid={errors.software ? true : undefined}
            />
          ))}
        </div>
        <FieldError id="pilot-software-error" message={errors.software} />
      </fieldset>

      <Field
        id="pilot-scope"
        label={formCopy.labels.scope}
        required
        help={formCopy.help.scope}
        error={errors.scope}
      >
        {(aria) => (
          <TextArea {...aria} name="scope" invalid={Boolean(errors.scope)} />
        )}
      </Field>

      <Field
        id="pilot-hours"
        label={formCopy.labels.hours}
        required
        error={errors.hours}
      >
        {(aria) => (
          <Select
            {...aria}
            name="hours"
            defaultValue=""
            placeholder="Choose one"
            invalid={Boolean(errors.hours)}
          >
            {hoursOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        )}
      </Field>

      <Field id="pilot-anythingElse" label={formCopy.labels.anythingElse}>
        {(aria) => <TextArea {...aria} name="anythingElse" rows={3} />}
      </Field>

      <div className="flex flex-col gap-1">
        <Checkbox
          id="pilot-consent"
          name="consent"
          data-field="consent"
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? "pilot-consent-error" : undefined}
          label={
            <span>
              {formCopy.labels.consent}{" "}
              <Link
                href={routes.privacy}
                className="text-fern underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </span>
          }
        />
        <FieldError id="pilot-consent-error" message={errors.consent} />
      </div>

      <div>
        <Button type="submit" full className="sm:w-auto" disabled={submitting}>
          {submitting ? microcopy.submitting : microcopy.pilotSubmit}
        </Button>

        {failed && (
          <p role="alert" className="mt-4 text-small text-error">
            {failed}
          </p>
        )}

        <p className="mt-4 text-small text-ink-muted">
          {microcopy.privacyLineForms}
        </p>
      </div>
    </form>
  );
}
