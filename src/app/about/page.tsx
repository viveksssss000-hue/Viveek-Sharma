import type { Metadata } from "next";
import { Target, ShieldCheck, Handshake, Check, Users } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { about } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: about.meta.title,
  description: about.meta.description,
  path: "/about",
});

const valueIcons = [Target, ShieldCheck, Handshake];

export default function AboutPage() {
  return (
    <>
      {/* Story */}
      <section className="border-b border-border bg-background">
        <div className="container-content py-12 md:py-16">
          <div className="max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">
              About Acowork
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl">{about.h1}</h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {about.body}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-y">
        <div className="container-content">
          <SectionHeading title="What we stand for" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {about.values.map((value, i) => {
              const Icon = valueIcons[i] ?? Target;
              return (
                <div
                  key={value.title}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-6"
                >
                  <span className="grid size-11 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team — placeholder until client provides real bios/photos */}
      <section className="bg-surface border-y border-border section-y">
        <div className="container-content">
          <SectionHeading
            title="The team"
            description="Real names, roles and photos build trust — we'll add ours here once finalised."
          />
          {about.team.length === 0 ? (
            <div className="mx-auto mt-10 max-w-md rounded-xl border border-dashed border-border bg-background p-8 text-center">
              <Users className="mx-auto size-8 text-subtle" />
              <p className="mt-3 text-sm text-muted-foreground">
                {/* TODO(client): add team members (name, role, photo) in content.ts. */}
                Team profiles coming soon.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {about.team.map((member) => (
                <div
                  key={member.name}
                  className="rounded-xl border border-border bg-background p-6"
                >
                  <p className="font-semibold text-foreground">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Who we serve */}
      <section className="section-y">
        <div className="container-content max-w-3xl">
          <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
            {about.whoWeServe.heading}
          </h2>
          <ul className="mt-6 space-y-4">
            {about.whoWeServe.items.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span className="text-base text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
