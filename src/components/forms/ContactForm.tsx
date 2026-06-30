"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { Loader2, CircleCheck, CalendarClock } from "lucide-react";
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
  softwareOptions,
} from "@/lib/validations";
import { trackEvent } from "@/lib/analytics";
import { site } from "@/lib/content";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Web3Forms access key. This key is PUBLIC by design (it only allows sending to
// the address registered with it), so it is safe to keep in client code.
// Web3Forms always emails the address the key is registered to, so the routing
// destination is the key, not a request field. To send enquiries to
// Naveen@tryacowork.com (P2 follow-up, item 2), register the key to that inbox
// in the Web3Forms dashboard, or set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to a key
// created under Naveen@tryacowork.com. The fallback below is the original
// hello@tryacowork.com key so the form keeps working until that is done.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
  "36d49236-a30c-4596-9dc7-ffeec040294c";

// After a successful submit the Calendly booking popup opens on the page.
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? site.bookingUrl;
const CAL_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";
const CAL_CSS = "https://assets.calendly.com/assets/external/widget.css";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}

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
  const [submitted, setSubmitted] = useState(false);

  // Preload the Calendly popup assets so booking opens instantly on submit.
  useEffect(() => {
    if (!bookingUrl) return;
    if (!document.querySelector(`link[href="${CAL_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CAL_CSS;
      document.head.appendChild(link);
    }
    if (!document.querySelector(`script[src="${CAL_SCRIPT}"]`)) {
      const script = document.createElement("script");
      script.src = CAL_SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openBooking = () => {
    if (!bookingUrl) {
      router.push("/thank-you/contact");
      return;
    }
    const url = `${bookingUrl}?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=6d5dd3`;
    if (typeof window !== "undefined" && window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    } else {
      window.open(bookingUrl, "_blank", "noopener");
    }
  };

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
      timeSink: "",
      message: defaultMessage ?? "",
      interest: defaultInterest,
      consent: false,
      company_website: "",
    },
  });

  const onSubmit = async (values: ContactInput) => {
    // Honeypot - silently drop bots (show success so they don't retry).
    if (values.company_website) {
      setSubmitted(true);
      openBooking();
      return;
    }
    try {
      // Send the enquiry to hello@tryacowork.com via Web3Forms (no server/secret
      // needed). `email` is used by Web3Forms as the reply-to so we can reply
      // straight to the enquirer.
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New enquiry: ${values.name}${
            values.company ? ` - ${values.company}` : ""
          }`,
          from_name: "tryacowork website",
          name: values.name,
          email: values.workEmail,
          company: values.company || "-",
          role: values.role || "-",
          company_size: values.companySize || "-",
          country: values.country || "-",
          interested_in: values.interest || "-",
          software_used: values.software || "-",
          biggest_time_sink: values.timeSink || "-",
          message: values.message,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) {
        toast.error(
          "Something went wrong. Please try again or email us directly."
        );
        return;
      }
      trackEvent("contact_submit");
      // On success the booking (Calendly) window opens right here on the page.
      setSubmitted(true);
      openBooking();
    } catch {
      toast.error("Network error. Please try again or email us directly.");
    }
  };

  // Require Turnstile only when a site key is configured.
  const captchaSatisfied = !siteKey || token.length > 0;

  if (submitted) {
    return (
      <div className="surface-card flex flex-col items-center gap-4 rounded-xl p-8 text-center sm:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-success/10 text-success">
          <CircleCheck className="size-6" />
        </span>
        <h3 className="text-2xl font-semibold text-foreground">
          Thanks - your details are on the way.
        </h3>
        <p className="max-w-md text-muted-foreground leading-relaxed">
          We&apos;ve sent your enquiry to our team and will reply within one
          business day. The booking window should have opened - pick a time and
          we&apos;ll see you on the call.
        </p>
        <Button variant="spark" size="lg" onClick={openBooking}>
          <CalendarClock className="size-4" />
          Pick a time
        </Button>
      </div>
    );
  }

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

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="software">What software do you use?</Label>
          <Controller
            control={control}
            name="software"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="software">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {softwareOptions.map((s) => (
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
          <Label htmlFor="timeSink">Biggest time-sink?</Label>
          <Input
            id="timeSink"
            placeholder="e.g. month-end close, chasing bills"
            {...register("timeSink")}
          />
        </div>
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
            <Link href="/privacy" className="text-primary underline">
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
