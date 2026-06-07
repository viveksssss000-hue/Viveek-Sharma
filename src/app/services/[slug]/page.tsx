import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Plug, ShieldCheck, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { StatBar } from "@/components/sections/StatBar";
import { buildMetadata } from "@/lib/seo";
import { services, site } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDesc,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.outcome,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: ["US", "EU"],
    serviceType: "AI workflow automation",
    url: `${site.url}/services/${service.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${site.url}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${site.url}/services/${service.slug}`,
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
                <Link href="/" className="hover:text-accent">
                  Home
                </Link>
              </li>
              <ChevronRight className="size-4" aria-hidden="true" />
              <li>
                <Link href="/services" className="hover:text-accent">
                  Services
                </Link>
              </li>
              <ChevronRight className="size-4" aria-hidden="true" />
              <li aria-current="page" className="font-medium text-foreground">
                {service.title}
              </li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl">{service.title}</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              {service.outcome}
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/book-a-demo">
                  Book a Demo
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section-y">
        <div className="container-content grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              The problem this solves
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {service.problem}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              What the automation does
            </h2>
            <ul className="mt-4 space-y-3">
              {service.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-base text-foreground">{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Integrations + security notes */}
      <section className="bg-surface border-y border-border section-y">
        <div className="container-content grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-background p-6">
            <span className="grid size-10 place-items-center rounded-lg bg-accent/10 text-accent">
              <Plug className="size-5" />
            </span>
            <h3 className="text-lg font-semibold text-foreground">
              How it integrates
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {service.integrationsNote}
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-background p-6">
            <span className="grid size-10 place-items-center rounded-lg bg-accent/10 text-accent">
              <ShieldCheck className="size-5" />
            </span>
            <h3 className="text-lg font-semibold text-foreground">
              Security note
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {service.securityNote}
            </p>
            <Link
              href="/security"
              className="mt-1 inline-flex w-fit items-center gap-1 text-sm font-semibold text-accent hover:underline"
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
            What good looks like once you&apos;re live
          </p>
          <StatBar />
        </div>
      </section>

      <FAQ title="Questions about this service" faqs={service.faqs} id="faq" />
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
