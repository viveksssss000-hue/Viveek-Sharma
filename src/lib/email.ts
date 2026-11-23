import { Resend } from "resend";

import { site } from "@/lib/site";
import type { PilotInput } from "@/lib/validations";

/**
 * Transactional email (spec 8.4).
 *
 * Rules this file exists to keep:
 *  - Every submission is emailed to the team immediately, with the form name in
 *    the subject line, e.g. "Free pilot request - Hendricks CPA".
 *  - The visitor receives an acknowledgement within one minute, from a real
 *    monitored address - never from noreply@.
 *  - The autoresponders are plain, personal and short, and use the copy from
 *    spec 8.4 as written.
 *
 * Delivery goes through Resend rather than the web server's mail function,
 * which lands in spam. SPF, DKIM and DMARC records for the sending domain MUST
 * be in place before launch or the autoresponders will be filtered - this is a
 * common launch failure and it is invisible until someone complains.
 *
 * Nothing here throws: the API routes fan out with Promise.allSettled so a
 * failed email never costs the visitor their submission.
 */

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.CONTACT_FROM_EMAIL ?? site.email;
/**
 * Where every form notification lands. The client confirmed on 23 November
 * that this must be hello@tryacowork.com - which is exactly what site.email
 * resolves to from content/settings.json, so the default delivers that even
 * with no environment variable set. Only set CONTACT_TO_EMAIL in a deploy if
 * the client has asked for a different inbox in writing.
 */
const toEmail = process.env.CONTACT_TO_EMAIL ?? site.email;
const resend = apiKey ? new Resend(apiKey) : null;

function esc(value: string | undefined | null) {
  return (value ?? "-")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string | undefined | null) {
  return `<tr><td style="padding:4px 12px 4px 0;vertical-align:top"><strong>${label}</strong></td><td style="padding:4px 0;vertical-align:top">${esc(
    value
  )}</td></tr>`;
}

const bookingLink = `${site.url}/book-a-call`;

/* ------------------------------------------------------------------ */
/* Free pilot request                                                  */
/* ------------------------------------------------------------------ */

export async function notifyPilotRequest(data: PilotInput) {
  const subject = `Free pilot request - ${data.firmName}`;

  if (!resend) {
    console.info("[email] pilot request (Resend not configured):", subject);
    return;
  }

  await resend.emails.send({
    from: `tryACOwork website <${fromEmail}>`,
    to: toEmail,
    replyTo: data.workEmail,
    subject,
    html: `
      <h2 style="font-family:Georgia,serif">Free pilot request</h2>
      <table style="font-family:system-ui,sans-serif;font-size:15px;border-collapse:collapse">
        ${row("Name", data.name)}
        ${row("Work email", data.workEmail)}
        ${row("Firm", data.firmName)}
        ${row("Firm website", data.firmWebsite || "-")}
        ${row("State", data.state)}
        ${row("Software", data.software.join(", "))}
        ${row("Hours a week, long term", data.hours)}
      </table>
      <p style="font-family:system-ui,sans-serif;font-size:15px"><strong>What they want done in the 20 hours:</strong></p>
      <p style="font-family:system-ui,sans-serif;font-size:15px;white-space:pre-wrap">${esc(
        data.scope
      )}</p>
      ${
        data.anythingElse
          ? `<p style="font-family:system-ui,sans-serif;font-size:15px"><strong>Anything else:</strong></p>
             <p style="font-family:system-ui,sans-serif;font-size:15px;white-space:pre-wrap">${esc(
               data.anythingElse
             )}</p>`
          : ""
      }
    `,
  });
}

/** The pilot autoresponder. Copy from spec 8.4, used as written. */
export async function sendPilotAcknowledgement(data: PilotInput) {
  const firstName = data.name.split(" ")[0] ?? data.name;

  if (!resend) {
    console.info("[email] pilot acknowledgement (Resend not configured):", data.workEmail);
    return;
  }

  await resend.emails.send({
    from: `${site.founder.firstName} at tryACOwork <${fromEmail}>`,
    to: data.workEmail,
    replyTo: toEmail,
    subject: "We have your pilot request - tryACOwork",
    text: [
      `Hi ${firstName},`,
      "",
      "Thanks for asking about a free 20-hour pilot. I have your request and I will reply personally within one business day, usually sooner - we are in India, so it may well be waiting for you in the morning.",
      "",
      `If it is easier to just talk, here is my calendar: ${bookingLink}`,
      "",
      site.founder.firstName,
      "tryACOwork",
      site.email,
    ].join("\n"),
  });
}

/* ------------------------------------------------------------------ */
/* Checklist lead magnet                                               */
/* ------------------------------------------------------------------ */

/*
 * The checklist lead magnet was REMOVED entirely on 23 November at the
 * client's instruction ("I do not want to send any checklist"). The form,
 * the API route, the thank-you page, the PDF and both emails are gone. If a
 * lead magnet ever returns, it is a new feature - do not resurrect this one
 * from git without asking.
 */

/** Optional Slack ping, if a webhook is configured. Never blocks a submission. */
export async function pingSlack(text: string) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) return;
  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
}
