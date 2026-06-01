import type { ContactInput } from "@/lib/validations";

/**
 * Send a lead to the CRM. Swappable behind this one function (BUILD.md §6.1):
 * HubSpot Forms API if configured, else a generic LEAD_WEBHOOK_URL, else log.
 * Never throws — the API route fans out with Promise.allSettled.
 */
export async function submitLead(data: ContactInput): Promise<void> {
  const source = "website-contact";
  // US vs EU segmentation for routing.
  const segment = data.country === "United States" ? "US" : "EU";

  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_FORM_GUID;
  const webhook = process.env.LEAD_WEBHOOK_URL;

  try {
    if (portalId && formGuid) {
      const fields = [
        { name: "firstname", value: data.name },
        { name: "email", value: data.workEmail },
        { name: "company", value: data.company ?? "" },
        { name: "jobtitle", value: data.role ?? "" },
        { name: "company_size", value: data.companySize ?? "" },
        { name: "country", value: data.country ?? "" },
        { name: "interest", value: data.interest ?? "" },
        { name: "message", value: data.message },
        { name: "lead_source", value: source },
        { name: "market_segment", value: segment },
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

    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source, segment }),
      });
      return;
    }

    // No CRM configured — log so the lead isn't silently lost in dev.
    console.info("[crm] lead (no CRM configured):", {
      email: data.workEmail,
      company: data.company,
      segment,
    });
  } catch (err) {
    console.error("[crm] submitLead failed:", err);
  }
}
