// ── Strata emails ────────────────────────────────────────────────────────────
// Kept separate from lib/directory-email.ts so the strata module owns its own
// wording (same pattern as jobs-email.ts and insights-notify.ts).
//
// Note on who sends what: RBA only ever sends *platform* mail — invitations to
// join a scheme workspace. Anything addressed to a lot owner about their scheme
// (levy notices, reminders) is sent by the committee under its own identity, not
// by RBA. That line is deliberate and must not be crossed.

import { Resend } from "resend";

const FROM = process.env.DIRECTORY_EMAIL_FROM ?? "Remedial Building Australia <info@remedialbuildingaustralia.com.au>";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";

function safeHtml(value: string) {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function sendStrataInviteEmail(opts: {
  to: string;
  inviterName: string;
  schemeName: string;
  roleLabel: string;
  token: string;
}) {
  const link = `${SITE_URL}/client/strata/invite/${encodeURIComponent(opts.token)}`;

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#0f172a;">
    <div style="background:#0f172a;padding:24px 28px;border-bottom:3px solid #f43f5e;">
      <p style="margin:0;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#93c5fd;">Strata workspace invitation</p>
      <p style="margin:8px 0 0;font-size:24px;font-weight:bold;color:#ffffff;">Remedial Building Australia</p>
    </div>
    <div style="padding:28px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;">
      <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#334155;">
        ${safeHtml(opts.inviterName)} has invited you to help manage
        <strong>${safeHtml(opts.schemeName)}</strong> as <strong>${safeHtml(opts.roleLabel)}</strong>.
      </p>
      <p style="margin:0 0 24px;"><a href="${link}" style="display:inline-block;padding:14px 22px;background:#0f172a;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:600;">Accept invitation</a></p>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#475569;">If the button does not work, paste this URL into your browser:</p>
      <p style="margin:8px 0 0;font-size:13px;line-height:1.7;color:#475569;word-break:break-all;">${safeHtml(link)}</p>
      <p style="margin:26px 0 0;font-size:12px;color:#64748b;line-height:1.7;">
        You will be asked to sign in or create a free account before the invitation can be accepted.
        If you were not expecting this, you can ignore it — nothing is shared until you accept.
      </p>
    </div>
  </div>`;

  const text =
    `${opts.inviterName} has invited you to help manage ${opts.schemeName} as ${opts.roleLabel}.\n\n` +
    `Accept the invitation: ${link}\n\n` +
    `You will be asked to sign in or create a free account first. ` +
    `If you were not expecting this, ignore this message — nothing is shared until you accept.`;

  if (!process.env.RESEND_API_KEY) {
    // Not fatal: the inviter can copy the link straight out of the members page.
    console.error(`[strata-email] RESEND_API_KEY is not set — invite for ${opts.to} was not emailed`);
    return { sent: false as const, link };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: FROM,
    to: opts.to,
    subject: `Invitation to manage ${opts.schemeName}`,
    html,
    text,
  });

  if (error) {
    console.error(`[strata-email] Resend rejected invite to ${opts.to}:`, error);
    return { sent: false as const, link };
  }
  return { sent: true as const, link };
}
