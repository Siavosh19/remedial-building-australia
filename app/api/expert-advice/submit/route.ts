import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { renderEmail, esc, type SubmittedFile } from "@/lib/expert-advice/email-templates";

const FROM    = "Remedial Building Australia <info@remedialbuildingaustralia.com.au>";
const TO      = "info@remedialbuildingaustralia.com.au";
const SITE    = "https://www.remedialbuildingaustralia.com.au";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUPABASE_URL     = "https://krttmsatnftkdnbtwouy.supabase.co";
const SUPABASE_ANON    = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydHRtc2F0bmZ0a2RuYnR3b3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk0MDQyODYsImV4cCI6MjA5NDk4MDI4Nn0.av5L6-CHe_9VkTUuOdUenZ-B8beMqPhJA59KIVAfIlY";
const BUCKET           = "expert-advice-uploads";

const COMMON_KEYS = new Set([
  "service", "serviceName", "name", "email", "phone",
  "buildingAddress", "description", "propertyType", "urgency",
  "disclaimerAccepted", "disclaimerVersion", "disclaimerText",
]);

function toLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .replace(/\bAgm\b/g, "AGM")
    .replace(/\bEwp\b/g, "EWP")
    .replace(/\bNcc\b/g, "NCC")
    .trim();
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const service            = String(formData.get("service")            ?? "").trim();
  const serviceName        = String(formData.get("serviceName")        ?? "").trim();
  const name               = String(formData.get("name")               ?? "").trim();
  const email              = String(formData.get("email")              ?? "").trim().toLowerCase();
  const phone              = String(formData.get("phone")              ?? "").trim();
  const address            = String(formData.get("buildingAddress")    ?? "").trim();
  const description        = String(formData.get("description")        ?? "").trim();
  const propType           = String(formData.get("propertyType")       ?? "").trim();
  const urgency            = String(formData.get("urgency")            ?? "").trim();
  const disclaimerAccepted = String(formData.get("disclaimerAccepted") ?? "").trim();
  const disclaimerVersion  = String(formData.get("disclaimerVersion")  ?? "").trim();
  const disclaimerText     = String(formData.get("disclaimerText")     ?? "").trim();

  if (!name)                           return NextResponse.json({ error: "Name is required."                    }, { status: 400 });
  if (!email || !EMAIL_RE.test(email)) return NextResponse.json({ error: "A valid email is required."          }, { status: 400 });
  if (!address)                        return NextResponse.json({ error: "Building address / suburb is required." }, { status: 400 });
  if (!description)                    return NextResponse.json({ error: "Please describe the issue."           }, { status: 400 });
  if (disclaimerAccepted !== "true")   return NextResponse.json({ error: "You must accept the disclaimer before submitting." }, { status: 400 });

  // Collect all unique keys from FormData
  const allKeys = new Set<string>();
  for (const [k] of formData.entries()) allKeys.add(k);

  // Service-specific text/select fields
  const extraFields: { key: string; label: string; value: string }[] = [];
  const fieldMap: Record<string, string> = {};
  for (const key of allKeys) {
    if (COMMON_KEYS.has(key)) continue;
    const values = formData.getAll(key);
    const textVals = values.filter((v) => !(v instanceof File)).map((v) => String(v)).filter(Boolean);
    if (textVals.length > 0) {
      const value = textVals.join(", ");
      extraFields.push({ key, label: toLabel(key), value });
      fieldMap[key] = value;
    }
  }

  // Collect all files (structured, so the email template can group them)
  const uploadedFiles: SubmittedFile[] = [];

  // Files attached directly to the notification email. IMPORTANT: Resend
  // serialises the request body as JSON, so attachment `content` MUST be a
  // base64 string — a raw Buffer gets mangled into {"type":"Buffer",...} and
  // the attachment won't open. Inline Supabase links are the primary channel;
  // attachments are a convenience copy.
  type Attachment = { filename: string; content: string; contentType?: string };
  const attachments: Attachment[] = [];
  const MAX_ATTACH_TOTAL = 18 * 1024 * 1024; // keep total email well under Resend's 40 MB cap
  let attachTotal = 0;

  const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_ANON;
  const sb = createClient(SUPABASE_URL, sbKey);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

  async function uploadFile(file: File, fieldKey: string, fieldLabel: string) {
    const ext  = file.name.split(".").pop() ?? "bin";
    const slug = Math.random().toString(36).slice(2, 8);
    const path = `${service}/${timestamp}/${slug}.${ext}`;
    const buf  = await file.arrayBuffer();
    const contentType = file.type || "application/octet-stream";
    const isImage = contentType.startsWith("image/");

    // Attach to the email as base64 (within the size ceiling).
    if (attachTotal + buf.byteLength <= MAX_ATTACH_TOTAL) {
      attachments.push({
        filename: file.name,
        content: Buffer.from(buf).toString("base64"),
        contentType,
      });
      attachTotal += buf.byteLength;
    }

    const { error } = await sb.storage.from(BUCKET).upload(path, buf, {
      contentType,
      upsert: false,
    });
    if (error) {
      console.error(`[expert-advice/submit] Storage upload failed for "${file.name}":`, error.message);
    }
    const url = error
      ? ""
      : sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
    uploadedFiles.push({ key: fieldKey, label: fieldLabel, filename: file.name, contentType, url, isImage });
  }

  const uploadTasks: Promise<void>[] = [];
  for (const key of allKeys) {
    if (COMMON_KEYS.has(key)) continue;
    const files = formData.getAll(key).filter(
      (v): v is File => v instanceof File && v.size > 0
    );
    for (const file of files) {
      uploadTasks.push(uploadFile(file, key, toLabel(key)));
    }
  }
  await Promise.allSettled(uploadTasks);

  // Get IP address
  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    null;

  // Save record to database
  const now = new Date().toISOString();
  const { data: dbRecord, error: dbError } = await sb
    .from("expert_advice_requests")
    .insert({
      service,
      service_name:           serviceName,
      name,
      email,
      phone:                  phone || null,
      property_type:          propType || null,
      building_address:       address,
      description,
      urgency:                urgency || null,
      extra_fields:           extraFields.length > 0 ? extraFields : null,
      uploaded_file_refs:     uploadedFiles.length > 0 ? uploadedFiles : null,
      disclaimer_accepted:    true,
      disclaimer_version:     disclaimerVersion || "1.0",
      disclaimer_accepted_at: now,
      disclaimer_text:        disclaimerText || null,
      ip_address:             ipAddress,
      payment_status:         "pending",
    })
    .select("id")
    .single();

  if (dbError) {
    console.error("[expert-advice/submit] DB insert error:", dbError);
  }

  const requestId = dbRecord?.id ?? null;

  // Build the internal notification email from the per-service template.
  const submittedAt = new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" });

  const { html: notifyHtml, text: notifyText } = renderEmail({
    service,
    serviceName,
    name,
    email,
    phone,
    propertyType: propType,
    address,
    description,
    urgency,
    extraFields,
    fieldMap,
    files: uploadedFiles,
    requestId: requestId != null ? String(requestId) : null,
    submittedAt,
    ipAddress,
    disclaimerVersion,
  });

  const confirmHtml = `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1e293b;">
  <div style="background:#0f1f3d;padding:20px 28px;border-bottom:3px solid #b91c1c;">
    <p style="margin:0;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#93c5fd;">Confirmation</p>
    <p style="margin:4px 0 0;font-size:17px;font-weight:bold;color:#ffffff;">Remedial Building Australia</p>
  </div>
  <div style="padding:28px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;">
    <p style="margin:0 0 14px;font-size:15px;color:#0f172a;">Hi ${esc(name)},</p>
    <p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#374151;">
      Thank you for submitting your request to Remedial Building Australia.
    </p>
    <p style="margin:0 0 14px;font-size:14px;line-height:1.7;color:#374151;">
      We have received your information and any uploaded photos/documents. We will review your submission and come back to you with the applicable fee or quote before starting any advice.
    </p>
    ${requestId ? `<p style="margin:0 0 14px;font-size:13px;color:#64748b;">Your request reference number is <strong>#${requestId}</strong>.</p>` : ""}
    <p style="margin:0 0 20px;font-size:14px;line-height:1.7;color:#374151;">Regards,<br />Remedial Building Australia</p>
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 16px;" />
    <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
      <a href="mailto:${TO}" style="color:#94a3b8;">${TO}</a> &middot;
      <a href="${SITE}" style="color:#94a3b8;">remedialbuildingaustralia.com.au</a>
    </p>
  </div>
</div>`;

  const confirmText = `Hi ${name},\n\nThank you for submitting your request to Remedial Building Australia.\n\nWe have received your information and any uploaded photos/documents. We will review your submission and come back to you with the applicable fee or quote before starting any advice.${requestId ? `\n\nYour request reference number is #${requestId}.` : ""}\n\nRegards,\nRemedial Building Australia\n\n${TO}`;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const notifyBase = {
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Expert Advice Request: ${serviceName} — ${name}`,
    html: notifyHtml,
    text: notifyText,
  };

  // NOTE: resend.emails.send() does NOT throw on an API error — it resolves
  // with { data, error }. We must inspect `error`, not just catch throws.
  // If attachments push the message over Resend's size limit the send fails;
  // in that case retry WITHOUT attachments so the email (with Supabase links
  // to the uploaded files) still reaches us.
  let notify = await resend.emails
    .send(attachments.length ? { ...notifyBase, attachments } : notifyBase)
    .catch((err) => ({ data: null, error: err }));

  if (notify?.error && attachments.length) {
    console.error(
      "[expert-advice/submit] Notify email with attachments failed, retrying without attachments:",
      notify.error,
    );
    notify = await resend.emails
      .send(notifyBase)
      .catch((err) => ({ data: null, error: err }));
  }

  // Confirmation to the customer (best-effort — never blocks the response).
  const confirm = await resend.emails
    .send({
      from: FROM,
      to: email,
      subject: "We received your remedial advice request",
      html: confirmHtml,
      text: confirmText,
    })
    .catch((err) => ({ data: null, error: err }));
  if (confirm?.error) {
    console.error("[expert-advice/submit] Confirmation email failed:", confirm.error);
  }

  console.log(
    `[expert-advice/submit] request #${requestId ?? "?"} files=${uploadedFiles.length} ` +
      `uploadedOk=${uploadedFiles.filter((f) => f.url).length} attachments=${attachments.length} ` +
      `attachBytes=${attachTotal} notifyId=${(notify as { data?: { id?: string } })?.data?.id ?? "none"}`,
  );

  if (notify?.error) {
    console.error("[expert-advice/submit] Notify email failed:", notify.error);
    return NextResponse.json({ error: "Failed to submit request. Please email us directly." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
