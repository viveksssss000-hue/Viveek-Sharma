import { NextResponse } from "next/server";

import { storeLead } from "@/lib/crm";
import {
  notifyPilotRequest,
  pingSlack,
  sendPilotAcknowledgement,
} from "@/lib/email";
import { looksAutomated, validatePilot } from "@/lib/validations";

/**
 * POST /api/pilot - the free pilot request (spec 8.2).
 *
 * The same validator runs here as in the browser, so a field can never be
 * checked one way on the client and another on the server.
 *
 * Spam is handled with a honeypot plus a timing check rather than a visible
 * CAPTCHA, which costs conversions (spec 8.1). A submission that trips either
 * check gets a 200 and goes nowhere: telling a bot it was detected only teaches
 * it to try again differently.
 *
 * Notifications, the autoresponder and storage all run in parallel and none of
 * them can fail the request - a Resend outage must not cost the visitor their
 * submission. Failures are logged for the handover.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = validatePilot(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.errors },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (looksAutomated(data)) {
    // Silently accepted and discarded.
    return NextResponse.json({ ok: true });
  }

  const results = await Promise.allSettled([
    notifyPilotRequest(data),
    sendPilotAcknowledgement(data),
    storeLead({ form: "free_pilot", ...data }),
    pingSlack(`New free pilot request from ${data.firmName} (${data.state})`),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("[api/pilot] delivery step failed:", result.reason);
    }
  }

  return NextResponse.json({ ok: true });
}
