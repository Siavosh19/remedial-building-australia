import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const FROM = "Remedial Building Australia <info@remedialbuildingaustralia.com.au>";
const TO = "info@remedialbuildingaustralia.com.au";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(request: NextRequest): Promise<NextResponse> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const businessName = String(form.get("businessName") ?? "").trim();
  const contactName = String(form.get("contactName") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const website = String(form.get("website") ?? "").trim();
  const placement = String(form.get("placement") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  const file = form.get("attachment");

  if (!businessName || !contactName || !email) {
    return NextResponse.json({ error: "Please complete the business name, contact name and email." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Business Name", businessName],
    ["Contact Name", contactName],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Website", website || "—"],
    ["Preferred Placement", placement || "—"],
    ["Message", message || "—"],
  ];

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#0a2540;padding:22px 26px;border-radius:12px 12px 0 0;">
        <p style="margin:0;color:#ffd700;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Advertise Enquiry</p>
        <h1 style="margin:6px 0 0;color:#fff;font-size:20px;font-weight:600;">New Banner Ad Enquiry</h1>
      </div>
      <div style="border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;padding:24px 26px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;color:#334155;">
          ${rows.map(([k, v]) => `<tr><td style="padding:8px 0;font-weight:700;color:#0a2540;width:140px;vertical-align:top;">${esc(k)}</td><td style="padding:8px 0;white-space:pre-wrap;">${esc(v)}</td></tr>`).join("")}
        </table>
        <p style="margin:22px 0 0;font-size:12px;color:#94a3b8;">Sent from the Advertise page on remedialbuildingaustralia.com.au</p>
      </div>
    </div>`;

  const text = `New Banner Ad Enquiry\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nSent from the Advertise page.`;

  // Confirmation email sent back to the person who submitted the enquiry.
  const confirmHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#0a2540;padding:22px 26px;border-radius:12px 12px 0 0;">
        <p style="margin:0;color:#ffd700;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Remedial Building Australia</p>
        <h1 style="margin:6px 0 0;color:#fff;font-size:20px;font-weight:600;">Your request has been received</h1>
      </div>
      <div style="border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;padding:24px 26px;color:#334155;font-size:14px;line-height:1.7;">
        <p style="margin:0 0 14px;">Hi ${esc(contactName)},</p>
        <p style="margin:0 0 14px;">Thank you for your advertising enquiry for <strong>${esc(businessName)}</strong>. We&rsquo;ve received your request and one of our marketing consultants will be in touch with you shortly.</p>
        <p style="margin:0 0 14px;">For reference, here&rsquo;s what you sent us:</p>
        <table style="width:100%;border-collapse:collapse;font-size:13px;color:#475569;">
          ${rows.map(([k, v]) => `<tr><td style="padding:6px 0;font-weight:700;color:#0a2540;width:150px;vertical-align:top;">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap;">${esc(v)}</td></tr>`).join("")}
        </table>
        <p style="margin:18px 0 0;">Kind regards,<br/>The Remedial Building Australia team</p>
      </div>
    </div>`;
  const confirmText = `Hi ${contactName},\n\nThank you for your advertising enquiry for ${businessName}. We've received your request and one of our marketing consultants will be in touch with you shortly.\n\nKind regards,\nThe Remedial Building Australia team`;

  // Build an email attachment from the uploaded design, if any.
  const attachments: { filename: string; content: string }[] = [];
  if (file && typeof file !== "string" && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: "Your attachment is larger than 10 MB. Please attach a smaller file." }, { status: 400 });
    }
    const buf = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name || "design", content: buf.toString("base64") });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Notify the site owner.
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New Advertise Enquiry — ${businessName}`,
      html,
      text,
      ...(attachments.length ? { attachments } : {}),
    });
    // Confirmation to the enquirer (best-effort — don't fail the request if this bounces).
    try {
      await resend.emails.send({
        from: FROM,
        to: email,
        subject: "We've received your advertising enquiry — Remedial Building Australia",
        html: confirmHtml,
        text: confirmText,
      });
    } catch { /* confirmation is non-critical */ }
  } catch {
    return NextResponse.json({ error: "Could not send your enquiry right now. Please email us directly at info@remedialbuildingaustralia.com.au." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
