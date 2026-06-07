import { Resend } from "resend";

import type { ContactInput } from "@/lib/validations";

const apiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "hello@tryacowork.com";
const toEmail = process.env.CONTACT_TO_EMAIL ?? "sales@tryacowork.com";
const slackWebhook = process.env.SLACK_WEBHOOK_URL;

const resend = apiKey ? new Resend(apiKey) : null;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Notify the internal team of a new enquiry (email + optional Slack). */
export async function notifyTeam(data: ContactInput): Promise<void> {
  const summary = `New website enquiry from ${data.name} (${data.workEmail})${
    data.company ? ` at ${data.company}` : ""
  }`;

  try {
    if (resend) {
      await resend.emails.send({
        from: `tryacowork Website <${fromEmail}>`,
        to: toEmail,
        replyTo: data.workEmail,
        subject: `New enquiry: ${data.name}${data.company ? ` — ${data.company}` : ""}`,
        html: `
          <h2>New website enquiry</h2>
          <ul>
            <li><strong>Name:</strong> ${escapeHtml(data.name)}</li>
            <li><strong>Email:</strong> ${escapeHtml(data.workEmail)}</li>
            <li><strong>Company:</strong> ${escapeHtml(data.company ?? "—")}</li>
            <li><strong>Role:</strong> ${escapeHtml(data.role ?? "—")}</li>
            <li><strong>Company size:</strong> ${escapeHtml(data.companySize ?? "—")}</li>
            <li><strong>Country:</strong> ${escapeHtml(data.country ?? "—")}</li>
            <li><strong>Interest:</strong> ${escapeHtml(data.interest ?? "—")}</li>
          </ul>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(data.message)}</p>
        `,
      });
    } else {
      console.info("[email] notifyTeam (Resend not configured):", summary);
    }

    if (slackWebhook) {
      await fetch(slackWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `:inbox_tray: ${summary}` }),
      });
    }
  } catch (err) {
    console.error("[email] notifyTeam failed:", err);
  }
}

/** Send the enquirer a friendly receipt with a response-time expectation. */
export async function sendContactConfirmation(
  data: ContactInput
): Promise<void> {
  try {
    if (!resend) {
      console.info(
        "[email] sendContactConfirmation (Resend not configured) →",
        data.workEmail
      );
      return;
    }
    await resend.emails.send({
      from: `tryacowork <${fromEmail}>`,
      to: data.workEmail,
      subject: "Thanks for contacting tryacowork",
      html: `
        <p>Hi ${escapeHtml(data.name)},</p>
        <p>Thanks for reaching out to tryacowork. We've received your message and
        will get back to you — usually within one business day.</p>
        <p>In the meantime, if you'd like to skip the queue, you can
        <a href="https://tryacowork.com/book-a-demo">book a 30-minute demo</a>.</p>
        <p>— The tryacowork team</p>
      `,
    });
  } catch (err) {
    console.error("[email] sendContactConfirmation failed:", err);
  }
}
