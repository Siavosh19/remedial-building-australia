import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO      = "info@remedialbuildingaustralia.com.au";
const FROM    = "Remedial Building Australia <no-reply@remedialbuildingaustralia.com.au>";
const SITE    = "https://www.remedialbuildingaustralia.com.au";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name    = String(body.name    ?? "").trim();
  const email   = String(body.email   ?? "").trim().toLowerCase();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name)
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  if (!email || !EMAIL_RE.test(email))
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (!message)
    return NextResponse.json({ error: "Please enter a message." }, { status: 400 });

  const resend = new Resend(process.env.RESEND_API_KEY);

  // Send enquiry to info@ inbox
  const { error } = await resend.emails.send({
    from:     FROM,
    to:       TO,
    replyTo:  email,
    subject:  subject ? `Enquiry: ${subject}` : `Website Enquiry from ${name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
        <div style="background:#0f1f3d;padding:20px 28px;border-bottom:3px solid #b91c1c;">
          <p style="margin:0;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#93c5fd;">Contact Enquiry</p>
          <p style="margin:4px 0 0;font-size:17px;font-weight:bold;color:#ffffff;">Remedial Building Australia</p>
        </div>
        <div style="padding:28px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;">
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr>
              <td style="padding:8px 12px;background:#f8fafc;font-size:12px;font-weight:bold;color:#64748b;width:100px;border:1px solid #e2e8f0;">Name</td>
              <td style="padding:8px 12px;font-size:14px;color:#0f172a;border:1px solid #e2e8f0;">${name.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;background:#f8fafc;font-size:12px;font-weight:bold;color:#64748b;border:1px solid #e2e8f0;">Email</td>
              <td style="padding:8px 12px;font-size:14px;border:1px solid #e2e8f0;">
                <a href="mailto:${email}" style="color:#1d4ed8;">${email}</a>
              </td>
            </tr>
            ${subject ? `
            <tr>
              <td style="padding:8px 12px;background:#f8fafc;font-size:12px;font-weight:bold;color:#64748b;border:1px solid #e2e8f0;">Subject</td>
              <td style="padding:8px 12px;font-size:14px;color:#0f172a;border:1px solid #e2e8f0;">${subject.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
            </tr>` : ""}
          </table>
          <p style="margin:0 0 8px;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Message</p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:16px;font-size:14px;line-height:1.7;color:#1e293b;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
          <p style="margin:20px 0 0;font-size:12px;color:#94a3b8;">Submitted via ${SITE}/contact</p>
        </div>
      </div>`,
    text: `Contact Enquiry — Remedial Building Australia\n\nName: ${name}\nEmail: ${email}${subject ? `\nSubject: ${subject}` : ""}\n\nMessage:\n${message}\n\nSubmitted via ${SITE}/contact`,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ error: "Failed to send your message. Please email us directly." }, { status: 500 });
  }

  // Send confirmation to the enquirer
  await resend.emails.send({
    from:    FROM,
    to:      email,
    subject: "We received your enquiry — Remedial Building Australia",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
        <div style="background:#0f1f3d;padding:20px 28px;border-bottom:3px solid #b91c1c;">
          <p style="margin:0;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#93c5fd;">Confirmation</p>
          <p style="margin:4px 0 0;font-size:17px;font-weight:bold;color:#ffffff;">Remedial Building Australia</p>
        </div>
        <div style="padding:28px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;">
          <p style="margin:0 0 14px;font-size:15px;color:#0f172a;">Hi ${name.replace(/</g, "&lt;").replace(/>/g, "&gt;")},</p>
          <p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#374151;">
            Thanks for reaching out. We have received your message and will get back to you shortly.
          </p>
          <p style="margin:0 0 20px;font-size:14px;line-height:1.7;color:#374151;">
            In the meantime, you can explore the platform at
            <a href="${SITE}" style="color:#1d4ed8;">${SITE.replace("https://", "")}</a>.
          </p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 16px;" />
          <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
            <a href="mailto:${TO}" style="color:#94a3b8;">${TO}</a> &middot;
            <a href="${SITE}" style="color:#94a3b8;">${SITE.replace("https://www.", "")}</a>
          </p>
        </div>
      </div>`,
    text: `Hi ${name},\n\nThanks for reaching out. We have received your message and will get back to you shortly.\n\n${SITE}\n\n${TO}`,
  });

  return NextResponse.json({ success: true });
}
