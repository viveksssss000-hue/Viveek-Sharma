import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CTASectionProps = {
  title?: string;
  description?: string;
  reassurance?: string;
  className?: string;
};

/** Reusable final CTA band (navy). Used at the foot of most pages. */
export function CTASection({
  title = "Ready to automate your books?",
  description = "Book a 30-minute demo and we'll map two or three automations for your workflow, live. No obligation.",
  reassurance = "30-minute call · No obligation · No credit card",
  className,
}: CTASectionProps) {
  return (
    <section className={cn("section-y", className)}>
      <div className="container-content">
        <div className="relative overflow-hidden rounded-xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-accent/20 blur-3xl"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="text-3xl text-primary-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              {description}
            </p>
            <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/book-a-demo">
                  Book a Demo
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-primary-foreground hover:bg-white/10"
              >
                <Link href="/contact">Contact us</Link>
              </Button>
            </div>
            {reassurance ? (
              <p className="text-sm text-white/60">{reassurance}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
