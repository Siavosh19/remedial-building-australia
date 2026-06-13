import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

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

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:7px 12px;background:#f8fafc;font-size:12px;font-weight:bold;color:#64748b;vertical-align:top;width:180px;border:1px solid #e2e8f0;">${esc(label)}</td>
    <td style="padding:7px 12px;font-size:14px;color:#0f172a;border:1px solid #e2e8f0;white-space:pre-wrap;">${esc(value)}</td>
  </tr>`;
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
  const extraFields: { label: string; value: string }[] = [];
  for (const key of allKeys) {
    if (COMMON_KEYS.has(key)) continue;
    const values = formData.getAll(key);
    const textVals = values.filter((v) => !(v instanceof File)).map((v) => String(v)).filter(Boolean);
    if (textVals.length > 0) {
      extraFields.push({ label: toLabel(key), value: textVals.join(", ") });
    }
  }

  // Collect all files
  type UploadedFile = { label: string; filename: string; url: string };
  const uploadedFiles: UploadedFile[] = [];

  const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? SUPABASE_ANON;
  const sb = createClient(SUPABASE_URL, sbKey);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

  async function uploadFile(file: File, fieldLabel: string) {
    const ext  = file.name.split(".").pop() ?? "bin";
    const slug = Math.random().toString(36).slice(2, 8);
    const path = `${service}/${timestamp}/${slug}.${ext}`;
    const buf  = await file.arrayBuffer();
    const { error } = await sb.storage.from(BUCKET).upload(path, buf, {
      contentType: file.type || "application/octet-stream",
      upsert: false,
    });
    const url = error
      ? ""
      : sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
    uploadedFiles.push({ label: fieldLabel, filename: file.name, url });
  }

  const uploadTasks: Promise<void>[] = [];
  for (const key of allKeys) {
    if (COMMON_KEYS.has(key)) continue;
    const files = formData.getAll(key).filter(
      (v): v is File => v instanceof File && v.size > 0
    );
    for (const file of files) {
      uploadTasks.push(uploadFile(file, toLabel(key)));
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

  // Build internal notification email
  const submittedAt = new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney" });

  const extraRows = extraFields.map((f) => row(f.label, f.value)).join("");

  const fileRows = uploadedFiles.length
    ? uploadedFiles
        .map(
          (f) =>
            `<tr>
              <td style="padding:7px 12px;background:#f8fafc;font-size:12px;font-weight:bold;color:#64748b;vertical-align:top;width:180px;border:1px solid #e2e8f0;">${esc(f.label)}</td>
              <td style="padding:7px 12px;font-size:14px;color:#0f172a;border:1px solid #e2e8f0;">
                ${f.url ? `<a href="${f.url}" style="color:#1d4ed8;">${esc(f.filename)}</a>` : esc(f.filename)}
              </td>
            </tr>`
        )
        .join("")
    : "";

  const notifyHtml = `
<div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;color:#1e293b;">
  <div style="background:#0f1f3d;padding:20px 28px;border-bottom:3px solid #b91c1c;">
    <p style="margin:0;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;color:#93c5fd;">Expert Advice Request</p>
    <p style="margin:4px 0 0;font-size:18px;font-weight:bold;color:#ffffff;">${esc(serviceName)}</p>
    <p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">${esc(submittedAt)}${requestId ? ` · Request #${requestId}` : ""}</p>
  </div>
  <div style="padding:28px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;">

    <p style="margin:0 0 16px;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Customer Details</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      ${row("Request ID", requestId ? String(requestId) : "")}
      ${row("Service", serviceName)}
      ${row("Name", name)}
      ${row("Email", email)}
      ${phone ? row("Phone", phone) : ""}
      ${propType ? row("Property type", propType) : ""}
      ${row("Building address / suburb", address)}
      ${urgency ? row("Urgency", urgency) : ""}
    </table>

    <p style="margin:0 0 10px;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Issue Description</p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:14px;font-size:14px;line-height:1.7;color:#1e293b;white-space:pre-wrap;margin-bottom:24px;">${esc(description)}</div>

    ${extraRows ? `<p style="margin:0 0 16px;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Additional Information</p><table style="width:100%;border-collapse:collapse;margin-bottom:24px;">${extraRows}</table>` : ""}

    ${fileRows ? `<p style="margin:0 0 16px;font-size:13px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#64748b;">Uploaded Files</p><table style="width:100%;border-collapse:collapse;margin-bottom:24px;">${fileRows}</table>` : ""}

    <div style="background:#fefce8;border:1px solid #fde047;border-radius:8px;padding:16px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#92400e;">Disclaimer Acceptance</p>
      <table style="width:100%;border-collapse:collapse;">
        ${row("Disclaimer accepted", "Yes")}
        ${row("Accepted at", submittedAt)}
        ${row("Disclaimer version", disclaimerVersion || "1.0")}
        ${ipAddress ? row("IP address", ipAddress) : ""}
      </table>
    </div>

    <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 14px;" />
    <p style="margin:0;font-size:12px;color:#94a3b8;">Submitted via ${SITE} · Reply to: <a href="mailto:${email}" style="color:#94a3b8;">${email}</a></p>
  </div>
</div>`;

  const notifyText = [
    `Expert Advice Request — ${serviceName}`,
    `Submitted: ${submittedAt}`,
    requestId ? `Request ID: ${requestId}` : "",
    ``,
    `Service: ${serviceName}`,
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "",
    propType ? `Property type: ${propType}` : "",
    `Building address: ${address}`,
    urgency ? `Urgency: ${urgency}` : "",
    ``,
    `Description:`,
    description,
    ``,
    ...extraFields.map((f) => `${f.label}: ${f.value}`),
    ``,
    ...uploadedFiles.map((f) => `File (${f.label}): ${f.filename}${f.url ? ` — ${f.url}` : ""}`),
    ``,
    `Disclaimer accepted: Yes`,
    `Disclaimer version: ${disclaimerVersion || "1.0"}`,
    ipAddress ? `IP address: ${ipAddress}` : "",
  ]
    .filter((l) => l !== "")
    .join("\n");

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

  const [notifyResult] = await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Expert Advice Request: ${serviceName} — ${name}`,
      html: notifyHtml,
      text: notifyText,
    }),
    resend.emails.send({
      from: FROM,
      to: email,
      subject: "We received your remedial advice request",
      html: confirmHtml,
      text: confirmText,
    }),
  ]);

  if (notifyResult.status === "rejected") {
    console.error("[expert-advice/submit] Resend error:", notifyResult.reason);
    return NextResponse.json({ error: "Failed to submit request. Please email us directly." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
