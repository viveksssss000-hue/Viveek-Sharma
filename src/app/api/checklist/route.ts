import { NextResponse } from "next/server";

import { storeLead } from "@/lib/crm";
import { notifyChecklistSignup, sendChecklist } from "@/lib/email";
import { looksAutomated, validateChecklist } from "@/lib/validations";

/**
 * POST /api/checklist - the lead magnet signup (spec 8.2 and 8.5).
 *
 * Sends exactly one email to the visitor and nothing else, ever. The form copy
 * promises "no sales sequence - we send the checklist and that is it", and spec
 * 8.5 requires that promise to be honoured. If a nurture sequence is added
 * later, the copy on the form has to change first.
 *
 * The download is also available directly on /thank-you-checklist, because
 * email delivery sometimes fails and a lead magnet that never arrives is worse
 * than no lead magnet.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = validateChecklist(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.errors },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (looksAutomated(data)) {
    return NextResponse.json({ ok: true });
  }

  const results = await Promise.allSettled([
    sendChecklist(data),
    notifyChecklistSignup(data),
    storeLead({ form: "checklist", ...data }),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("[api/checklist] delivery step failed:", result.reason);
    }
  }

  return NextResponse.json({ ok: true });
}
