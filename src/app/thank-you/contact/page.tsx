import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { contact } from "@/lib/content";

export const metadata: Metadata = {
  title: "Thanks - we'll be in touch | tryacowork",
  description: "Your message has been received.",
  robots: { index: false, follow: false },
};

export default function ThankYouContactPage() {
  return (
    <section className="section-y">
      <div className="container-content max-w-2xl text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent/20 text-accent-foreground">
          <CheckCircle2 className="size-7" />
        </span>
        <h1 className="mt-6 text-4xl sm:text-5xl">Thanks - message received.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We&apos;ve got your note and will get back to you shortly.{" "}
          {contact.responseTime}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/book-a-demo">
              Book a Demo instead
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
