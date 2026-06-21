import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Clock, CalendarCheck } from "lucide-react";

import { ContactForm } from "@/components/forms/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { contact, site } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: contact.meta.title,
  description: contact.meta.description,
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  const isSecurity = topic === "security";
  const defaultMessage = isSecurity
    ? "I'd like to request your Data Processing Agreement / security overview."
    : undefined;

  return (
    <section className="section-y">
      <div className="container-content grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-primary">
            Contact
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl">{contact.h1}</h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {contact.intro}
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                <Mail className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">Email us</p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm text-primary hover:underline"
                >
                  {site.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                <Clock className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Response time
                </p>
                <p className="text-sm text-muted-foreground">
                  {contact.responseTime}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
                <CalendarCheck className="size-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Prefer to talk?
                </p>
                <Link
                  href="/book-a-demo"
                  className="text-sm text-primary hover:underline"
                >
                  Book a 30-minute demo
                </Link>
              </div>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <div className="surface-card reveal rounded-xl p-6 sm:p-8">
            <ContactForm defaultMessage={defaultMessage} />
          </div>
        </div>
      </div>
    </section>
  );
}
