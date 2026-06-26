import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Plug, ShieldCheck, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { StatBar } from "@/components/sections/StatBar";
import { buildMetadata } from "@/lib/seo";
import { industries, site } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return buildMetadata({
    title: industry.metaTitle,
    description: industry.metaDesc,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: industry.title,
    description: industry.outcome,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: ["US", "EU"],
    serviceType: "AI workflow automation",
    url: `${site.url}/industries/${industry.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Industries",
        item: `${site.url}/industries`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: industry.navLabel,
        item: `${site.url}/industries/${industry.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-background">
        <div className="container-content py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <ChevronRight className="size-4" aria-hidden="true" />
              <li>
                <Link href="/industries" className="hover:text-primary">
                  Industries
                </Link>
              </li>
              <ChevronRight className="size-4" aria-hidden="true" />
              <li aria-current="page" className="font-medium text-foreground">
                {industry.navLabel}
              </li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl">{industry.title}</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              {industry.outcome}
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {industry.intro}
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contact">
                  Book a Demo
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pain points + example automations */}
      <section className="section-y">
        <div className="container-content grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              Where the time goes
            </h2>
            <ul className="mt-4 space-y-3">
              {industry.painPoints.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-base text-muted-foreground">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              What we automate
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {industry.exampleAutomations.map((a) => (
                <div
                  key={a.title}
                  className="surface-card flex flex-col gap-1.5 rounded-xl p-5"
                >
                  <h3 className="text-sm font-semibold text-foreground">
                    {a.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {a.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrations + security */}
      <section className="bg-surface border-y border-border section-y">
        <div className="reveal-stagger container-content grid gap-6 md:grid-cols-2">
          <div className="surface-card surface-interactive flex flex-col gap-3 rounded-xl p-7 hover:border-border-strong">
            <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
              <Plug className="size-5" />
            </span>
            <h3 className="text-lg font-semibold text-foreground">
              How it integrates
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {industry.integrationsNote}
            </p>
          </div>
          <div className="surface-card surface-interactive flex flex-col gap-3 rounded-xl p-7 hover:border-border-strong">
            <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-inset ring-primary/20">
              <ShieldCheck className="size-5" />
            </span>
            <h3 className="text-lg font-semibold text-foreground">
              Security note
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {industry.securityNote}
            </p>
            <Link
              href="/security"
              className="mt-1 inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Read about our security
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mini-proof */}
      <section className="section-y">
        <div className="container-content max-w-4xl">
          <p className="mb-6 text-center text-sm font-medium text-muted-foreground">
            How we work, whatever your industry
          </p>
          <StatBar />
          <div className="mt-8 flex items-center justify-center gap-1.5 text-sm">
            <Check className="size-4 text-accent-foreground" aria-hidden="true" />
            <Link href="/services" className="font-semibold text-primary hover:underline">
              See the four ways we work
            </Link>
          </div>
        </div>
      </section>

      <FAQ title="Questions" faqs={industry.faqs} id="faq" />
      <CTASection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
