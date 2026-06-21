"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { site, bookDemo } from "@/lib/content";

// Calendly scheduling link. The custom date/time grid below is a styled entry
// point - clicking any time slot (or the confirm button) opens the Calendly
// popup, where real availability is shown and the booking is completed.
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? site.bookingUrl;
const CAL_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";
const CAL_CSS = "https://assets.calendly.com/assets/external/widget.css";

const TIME_SLOTS = [
  "7:30 PM",
  "8:30 PM",
  "10:30 AM",
  "11:30 AM",
  "12:30 PM",
  "1:30 PM",
  "2:30 PM",
  "3:30 PM",
  "4:30 PM",
];

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

type DayOption = { key: string; day: number; weekday: string; label: string };

export function DemoEmbed() {
  const [days, setDays] = useState<DayOption[]>([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [tz, setTz] = useState("Local time");
  const [ready, setReady] = useState(false);

  // Load the Calendly popup assets once.
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

  // Build the next ~10 weekdays on the client (avoids SSR/CSR hydration drift).
  useEffect(() => {
    const out: DayOption[] = [];
    const d = new Date();
    while (out.length < 10) {
      const wd = d.getDay();
      if (wd !== 0 && wd !== 6) {
        out.push({
          key: d.toISOString().slice(0, 10),
          day: d.getDate(),
          weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
          label: d.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          }),
        });
      }
      d.setDate(d.getDate() + 1);
    }
    setDays(out);
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone || "Local time");
    setReady(true);
  }, []);

  const openCalendly = () => {
    if (!bookingUrl) return;
    const url = `${bookingUrl}?hide_landing_page_details=1&hide_gdpr_banner=1&primary_color=6d5dd3`;
    if (typeof window !== "undefined" && window.Calendly) {
      window.Calendly.initPopupWidget({ url });
    } else {
      window.open(bookingUrl, "_blank", "noopener");
    }
  };

  const selectedLabel =
    ready && days[selectedDay]
      ? `${days[selectedDay].label}, ${TIME_SLOTS[selectedSlot]}`
      : "Pick a date and time";
  const nextAvailable =
    ready && days[0] ? `${days[0].weekday}, ${TIME_SLOTS[0]}` : "Loading...";

  // Skeleton placeholders before the client-built dates are ready.
  const dayCells: (DayOption | null)[] = ready
    ? days
    : Array.from({ length: 10 }, () => null);

  return (
    <div className="surface-card overflow-hidden rounded-[28px]">
      {/* Profile / host */}
      <div className="border-b border-border p-7 sm:p-10">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="grid size-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#6A45F5] to-[#0FB8AC] text-2xl font-bold text-white shadow-sm"
          >
            {bookDemo.host.name.charAt(0)}
          </span>
          <div>
            <h2 className="text-2xl font-semibold text-foreground sm:text-3xl">
              {bookDemo.host.name}
            </h2>
            <p className="mt-1 text-muted-foreground">{bookDemo.host.blurb}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[340px_1fr]">
        {/* Date picker */}
        <div className="border-b border-border p-7 sm:p-8 lg:border-b-0 lg:border-r">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <CalendarDays className="size-5 text-primary" />
            Select date
          </h3>

          <div className="mt-6 grid grid-cols-5 gap-2.5">
            {dayCells.map((day, i) =>
              day ? (
                <button
                  key={day.key}
                  type="button"
                  onClick={() => setSelectedDay(i)}
                  aria-pressed={selectedDay === i}
                  aria-label={day.label}
                  className={`grid size-12 place-items-center rounded-full border text-sm font-medium transition ${
                    selectedDay === i
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {day.day}
                </button>
              ) : (
                <span
                  key={i}
                  aria-hidden="true"
                  className="size-12 animate-pulse rounded-full bg-elevated"
                />
              )
            )}
          </div>

          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-xs text-muted-foreground">Next available slot</p>
            <p className="mt-1 text-lg font-semibold text-primary">
              {nextAvailable}
            </p>
          </div>
        </div>

        {/* Time picker */}
        <div className="p-7 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Clock className="size-5 text-primary" />
              Select time
            </h3>
            <span className="font-mono text-xs text-muted-foreground">{tz}</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {TIME_SLOTS.map((slot, i) => (
              <button
                key={slot}
                type="button"
                onClick={() => {
                  setSelectedSlot(i);
                  openCalendly();
                }}
                aria-label={`Book a slot at ${slot}`}
                className={`h-12 rounded-xl border text-sm transition ${
                  selectedSlot === i
                    ? "border-primary bg-primary font-semibold text-primary-foreground shadow-sm"
                    : "border-border text-foreground hover:border-primary hover:bg-primary/5"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Confirm */}
      <div className="flex flex-col gap-4 border-t border-border p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="text-sm text-muted-foreground">
          Selected:{" "}
          <span className="font-medium text-foreground">{selectedLabel}</span>
        </p>
        <Button variant="spark" size="lg" onClick={openCalendly}>
          Confirm on Calendly
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
