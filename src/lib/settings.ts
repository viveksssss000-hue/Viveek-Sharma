import raw from "../../content/settings.json";

/**
 * Everything the client can change without a developer.
 *
 * WHY THIS IS A JSON IMPORT AND NOT A FILE READ
 * The values here are needed by client components (the booking embed reads the
 * Cal link) as well as by server components, so a filesystem read would break
 * the browser bundle. A JSON import is resolved at build time and works in
 * both. The trade-off is that editing settings triggers a rebuild - which is
 * exactly what happens anyway when the CMS commits to the repository.
 *
 * The CMS at /admin edits this same file, so the editor and the repository can
 * never disagree about what the site says.
 *
 * Empty string means "not supplied yet". Every getter below turns that into a
 * visible placeholder or hides the element entirely, never into a guess -
 * `scripts/handover.mjs` lists what is still outstanding.
 */

type RawSettings = typeof raw;

export type StaffProfile = {
  name: string;
  role: string;
  credentials: string[];
  software: string[];
  overlap: string;
  photo: string;
};

export type TestimonialEntry = {
  quote: string;
  name: string;
  role: string;
  firm: string;
  state: string;
  photo: string;
};

const settings = raw as RawSettings;

/** Trimmed value, or null when the field has not been filled in. */
function value(input: string | undefined | null): string | null {
  const trimmed = (input ?? "").trim();
  return trimmed.length > 0 ? trimmed : null;
}

/** A visible placeholder for a required fact that has not been supplied. */
function orPlaceholder(input: string | undefined | null, label: string): string {
  return value(input) ?? `[CONFIRM: ${label}]`;
}

export const business = {
  legalName: orPlaceholder(settings.business.legalName, "legal entity name"),
  officeCity: orPlaceholder(settings.business.officeCity, "city"),
  addressStreet: orPlaceholder(settings.business.addressStreet, "street address"),
  addressRegion: orPlaceholder(settings.business.addressRegion, "state"),
  addressPostalCode: orPlaceholder(
    settings.business.addressPostalCode,
    "postcode"
  ),
  email: value(settings.business.email) ?? "hello@tryacowork.com",
  /** Null hides the phone number entirely, which is the default (spec 6.3). */
  phone: value(settings.business.phone),
  /** Null hides the link. An empty social link is worse than none. */
  linkedin: value(settings.business.linkedin),
  /** e.g. "There are nine of us today." Honest number or nothing. */
  teamSizeStatement: value(settings.business.teamSizeStatement),
  founderName: value(settings.business.founderName) ?? "Naveen Gupta",
  founderRole: value(settings.business.founderRole) ?? "Co-founder",
} as const;

export const bookingSettings = {
  /** Env wins, so staging can point at a test event without a commit. */
  calLink: process.env.NEXT_PUBLIC_CAL_LINK ?? value(settings.booking.calLink),
} as const;

/** What the client has signed off. Drives the [CONFIRM] markers (CO-01). */
const confirmedItems = new Set<string>(
  (settings as { confirmed?: string[] }).confirmed ?? []
);

export function isConfirmed(key: string): boolean {
  return confirmedItems.has(key);
}

export const pricingSettings = {
  fullTime: settings.pricing.fullTimeMonthly,
  partTime: settings.pricing.partTimeMonthly,
  extraHourly: settings.pricing.extraHourlyRate,
  usHoursPremium: settings.pricing.usHoursPremiumMonthly,
  /**
   * The two monthly figures are confirmed; the extra-hours rate and the
   * US-hours premium are not, so they still render their [CONFIRM RATE]
   * markers (CO-01, and Section 3 items 1 and 2 of the change order).
   *
   * The change order is explicit that the site cannot go live with a marker
   * showing, and equally explicit not to quietly ship a guessed number - so
   * the marker is visible rather than silently absent.
   */
  extraHourlyConfirmed: confirmedItems.has("extraHourlyRate"),
  usHoursPremiumConfirmed: confirmedItems.has("usHoursPremium"),
} as const;

export const pilotSettings = {
  /** Null removes the line entirely rather than publishing a vague limit. */
  monthlyLimitLine: value(settings.pilot.monthlyLimitLine),
} as const;

/**
 * Staff profiles only appear when the client has confirmed they describe real
 * team members with permission, AND at least one profile exists. Both
 * conditions, because a stray `true` must not be able to publish an empty grid
 * or, worse, example people (spec 7.1.6).
 */
export const staffSettings = {
  profiles: (settings.staff.profiles as StaffProfile[]) ?? [],
  get confirmed() {
    return settings.staff.profilesConfirmed && this.profiles.length > 0;
  },
} as const;

/** Real, attributed quotes only. An empty list hides the whole section. */
export const testimonialSettings =
  (settings.testimonials as TestimonialEntry[]) ?? [];

export const aboutSettings = {
  founderStory: value(settings.about.founderStory),
} as const;

export const securitySettings = {
  /** Null omits the insurance item rather than describing it vaguely. */
  insuranceStatement: value(settings.security.insuranceStatement),
} as const;

export const imageSettings = {
  hero: value(settings.images.hero),
} as const;

/**
 * Facts that must be supplied before launch, with the pages each one appears
 * on. Computed from the settings themselves, so the handover sheet cannot drift
 * out of date the way a hand-written list would.
 */
export function outstandingItems(): { item: string; usedOn: string }[] {
  const missing: { item: string; usedOn: string }[] = [];
  const need = (
    condition: boolean,
    item: string,
    usedOn: string
  ) => {
    if (condition) missing.push({ item, usedOn });
  };

  need(
    !value(settings.business.officeCity),
    "Office city",
    "About, Security, Home FAQ q9, Organization schema"
  );
  need(
    !value(settings.business.addressStreet) ||
      !value(settings.business.addressRegion) ||
      !value(settings.business.addressPostalCode),
    "Registered address",
    "Footer, Privacy Policy, Terms, Organization schema"
  );
  need(
    !value(settings.business.teamSizeStatement),
    "Team size at launch, stated honestly",
    "About"
  );
  need(!bookingSettings.calLink, "Cal.com event link", "/book-a-call");
  need(
    !staffSettings.confirmed,
    "Three real staff profiles with photographs and permission",
    "Home section 5 (the hiring-standard card shows until then)"
  );
  need(
    testimonialSettings.length === 0,
    "Two or three real testimonials with written permission",
    "Home section 9 (the section is hidden until then)"
  );
  need(
    !aboutSettings.founderStory,
    "Founder story, 150-250 words in their own words",
    "About"
  );
  need(!imageSettings.hero, "Hero photograph", "Home");
  need(
    !securitySettings.insuranceStatement,
    "Insurance cover, or a decision to leave the item off",
    "Security page (the item is omitted until then)"
  );

  return missing;
}
