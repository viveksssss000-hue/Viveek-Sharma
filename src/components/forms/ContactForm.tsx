"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  contactSchema,
  type ContactInput,
  companySizes,
  countries,
  interests,
} from "@/lib/validations";
import { trackEvent } from "@/lib/analytics";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-sm text-error">
      {message}
    </p>
  );
}

export function ContactForm({
  defaultInterest,
  defaultMessage,
}: {
  defaultInterest?: ContactInput["interest"];
  defaultMessage?: string;
}) {
  const router = useRouter();
  const [token, setToken] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      workEmail: "",
      company: "",
      role: "",
      message: defaultMessage ?? "",
      interest: defaultInterest,
      consent: false,
      company_website: "",
    },
  });

  const onSubmit = async (values: ContactInput) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken: token }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast.error(
          data?.error === "captcha"
            ? "Spam check failed - please try again."
            : "Something went wrong. Please try again or email us directly."
        );
        return;
      }
      trackEvent("contact_submit");
      router.push("/thank-you/contact");
    } catch {
      toast.error("Network error. Please try again or email us directly.");
    }
  };

  // Require Turnstile only when a site key is configured.
  const captchaSatisfied = !siteKey || token.length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">
            Name <span className="text-error">*</span>
          </Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name")}
          />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="workEmail">
            Work email <span className="text-error">*</span>
          </Label>
          <Input
            id="workEmail"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.workEmail}
            aria-describedby={errors.workEmail ? "workEmail-error" : undefined}
            {...register("workEmail")}
          />
          <FieldError id="workEmail-error" message={errors.workEmail?.message} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company">Company</Label>
          <Input id="company" autoComplete="organization" {...register("company")} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="role">Role</Label>
          <Input id="role" autoComplete="organization-title" {...register("role")} />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="companySize">Company size</Label>
          <Controller
            control={control}
            name="companySize"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="companySize">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {companySizes.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="country">Country</Label>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="interest">What are you interested in?</Label>
        <Controller
          control={control}
          name="interest"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="interest">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {interests.map((i) => (
                  <SelectItem key={i} value={i}>
                    {i}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">
          Message <span className="text-error">*</span>
        </Label>
        <Textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      {/* Honeypot - visually hidden, off-screen, not announced */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          id="company_website"
          tabIndex={-1}
          autoComplete="off"
          {...register("company_website")}
        />
      </div>

      <div className="flex items-start gap-3">
        <Controller
          control={control}
          name="consent"
          render={({ field }) => (
            <Checkbox
              id="consent"
              checked={field.value}
              onCheckedChange={(v) => field.onChange(v === true)}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
          )}
        />
        <div className="flex flex-col gap-1">
          <Label htmlFor="consent" className="font-normal leading-snug">
            I agree to tryacowork processing my details to respond to my enquiry,
            per the{" "}
            <Link href="/privacy" className="text-cyan underline">
              Privacy Policy
            </Link>
            . <span className="text-error">*</span>
          </Label>
          <FieldError id="consent-error" message={errors.consent?.message} />
        </div>
      </div>

      {siteKey ? (
        <Turnstile
          siteKey={siteKey}
          onSuccess={(t) => {
            setToken(t);
            setValue("turnstileToken", t);
          }}
          onExpire={() => setToken("")}
          options={{ theme: "light" }}
        />
      ) : null}

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting || !isValid || !captchaSatisfied}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              Sending...
            </>
          ) : (
            "Send message"
          )}
        </Button>
        <p className="text-xs text-subtle">
          We&apos;ll only use your details to respond. No spam.
        </p>
      </div>
    </form>
  );
}
