import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/validations";
import { verifyTurnstile } from "@/lib/turnstile";
import { notifyTeam, sendContactConfirmation } from "@/lib/email";
import { submitLead } from "@/lib/crm";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // 1. Honeypot — silently drop bots.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  // 2. Validate.
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // 3. Spam check.
  const ok = await verifyTurnstile(
    typeof body.turnstileToken === "string" ? body.turnstileToken : undefined,
    req
  );
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "captcha" },
      { status: 400 }
    );
  }

  // 4. Fan out — don't block the user on a downstream failure.
  const data = parsed.data;
  await Promise.allSettled([
    submitLead(data),
    notifyTeam(data),
    sendContactConfirmation(data),
  ]);

  return NextResponse.json({ ok: true });
}
