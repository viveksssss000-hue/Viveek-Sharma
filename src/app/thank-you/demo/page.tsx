import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "You're booked | Acowork",
  description: "Your Acowork demo is confirmed.",
  robots: { index: false, follow: false },
};

export default function ThankYouDemoPage() {
  return (
    <section className="section-y">
      <div className="container-content max-w-2xl text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent/10 text-accent">
          <CalendarCheck className="size-7" />
        </span>
        <h1 className="mt-6 text-4xl sm:text-5xl">You&apos;re booked.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Thanks for scheduling a demo with Acowork. You&apos;ll get a calendar
          invite with a video link, plus reminders before the call.
        </p>

        <div className="mx-auto mt-10 max-w-md rounded-xl border border-border bg-surface p-6 text-left">
          <h2 className="text-lg font-semibold text-foreground">
            To get the most from it
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>• Have a rough sense of your monthly invoice and transaction volume.</li>
            <li>• Note which accounting tools you use today.</li>
            <li>• Think about the one task you&apos;d most like off your plate.</li>
          </ul>
        </div>

        <div className="mt-10">
          <Button asChild variant="outline">
            <Link href="/">
              Back to home
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
