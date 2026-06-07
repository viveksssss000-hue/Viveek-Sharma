import { z } from "zod";

/** Select options reused by the contact form UI and the schema. */
export const companySizes = [
  "1–10",
  "11–50",
  "51–200",
  "201–500",
  "500+",
] as const;

export const interests = [
  "Bookkeeping & invoices",
  "Lead routing & CRM",
  "Reporting & dashboards",
  "Inbox & document triage",
  "Data entry between systems",
  "Other",
] as const;

/** US + EU/UK + Other (US/EU markets per BUILD.md). */
export const countries = [
  "United States",
  "United Kingdom",
  "Austria",
  "Belgium",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Ireland",
  "Italy",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Netherlands",
  "Poland",
  "Portugal",
  "Romania",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Other",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  workEmail: z
    .string()
    .min(1, "Work email is required.")
    .email("Enter a valid email address."),
  company: z.string().optional().or(z.literal("")),
  role: z.string().optional().or(z.literal("")),
  companySize: z.enum(companySizes).optional(),
  country: z.enum(countries).optional(),
  interest: z.enum(interests).optional(),
  message: z.string().min(10, "Please add a little more detail (10+ chars)."),
  consent: z.boolean().refine((v) => v === true, {
    message: "Please accept the privacy policy to continue.",
  }),
  // Hidden anti-spam honeypot — must stay empty.
  company_website: z.string().optional().or(z.literal("")),
  // Cloudflare Turnstile token (verified server-side).
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
