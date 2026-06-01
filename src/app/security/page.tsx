import type { Metadata } from "next";
import Link from "next/link";
import {
  Lock,
  FileCheck,
  EyeOff,
  UserCheck,
  BadgeCheck,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { security } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: security.meta.title,
  description: security.meta.description,
  path: "/security",
});

const sectionIcons = [Lock, FileCheck, EyeOff, UserCheck, BadgeCheck];

export default function SecurityPage() {
  return (
    <>
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="container-content py-16 md:py-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              Security &amp; Compliance
            </span>
            <h1 className="mt-4 text-4xl text-primary-foreground sm:text-5xl">
              {security.h1}
            </h1>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              {security.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-content">
          <div className="grid gap-6 lg:grid-cols-2">
            {security.sections.map((section, i) => {
              const Icon = sectionIcons[i] ?? Lock;
              return (
                <div
                  key={section.title}
                  className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 sm:p-8"
                >
                  <span className="grid size-11 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="size-5" />
                  </span>
                  <h2 className="text-xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {section.body}
                  </p>
                  {section.bullets.length > 0 ? (
                    <ul className="space-y-2.5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                            <Check className="size-3" strokeWidth={3} />
                          </span>
                          <span className="text-sm text-foreground">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-start gap-3 rounded-xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Need our DPA or a security overview?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We&apos;re happy to share our Data Processing Agreement and
                security documentation on request.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/book-a-demo">Book a Demo</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact?topic=security">
                  Request our DPA / security overview
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
