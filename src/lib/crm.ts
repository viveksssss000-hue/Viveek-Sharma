import type { PilotInput } from "@/lib/validations";

/**
 * Storing submissions (spec 8.4).
 *
 * "Every submission is also stored, either in the CMS, a spreadsheet, or a CRM.
 * Email alone loses data when someone deletes a message."
 *
 * The destination sits behind one function so it can be swapped without
 * touching the API routes. In order of preference:
 *   1. LEAD_WEBHOOK_URL - point this at a Google Sheet via Apps Script or Zapier.
 *      Spec 8.4 says a sheet via a webhook is perfectly adequate at this stage.
 *   2. HubSpot Forms API, if the client adopts a CRM later.
 *   3. Neither configured - log it, so nothing is silently lost in development.
 *
 * Never throws. The API routes fan out with Promise.allSettled, so a storage
 * outage cannot cost the visitor their submission.
 */

type Lead = { form: "free_pilot" } & PilotInput;

export async function storeLead(lead: Lead): Promise<void> {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_FORM_GUID;

  if (webhook) {
    // The honeypot and the timestamp are anti-spam plumbing, not data worth
    // keeping, so they are dropped rather than stored.
    const payload = Object.fromEntries(
      Object.entries(lead).filter(
        ([key]) => key !== "honeypot" && key !== "startedAt"
      )
    );

    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
      }),
    });
    return;
  }

  if (portalId && formGuid) {
    const fields = [
      { name: "firstname", value: lead.name },
      { name: "email", value: lead.workEmail },
      { name: "company", value: lead.firmName },
      { name: "website", value: lead.firmWebsite ?? "" },
      { name: "state", value: lead.state },
      { name: "software", value: lead.software.join(", ") },
      { name: "message", value: lead.scope },
      { name: "hours_per_week", value: lead.hours },
      { name: "lead_source", value: "website-free-pilot" },
    ];

    await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields }),
      }
    );
    return;
  }

  console.info("[crm] lead stored nowhere - configure LEAD_WEBHOOK_URL:", {
    form: lead.form,
    email: lead.workEmail,
  });
}
