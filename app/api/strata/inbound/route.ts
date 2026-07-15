import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadStrataFile, hasStorageKey } from "@/lib/strata-storage";
import { extractStrataIntake, hasAnthropicKey } from "@/lib/strata-extract";
import { sendStrataIntakeAdminEmail } from "@/lib/directory-email";

// ─── Strata Connect: inbound work-order webhook (Stage 1) ─────────────────────
// SendGrid Inbound Parse POSTs the forwarded email here as multipart/form-data.
// We store it as a StrataIntake (+ attachments), then run AI extraction so it
// lands in the admin review queue as `needs_review`. See docs/strata-connect.md
// for the DNS / SendGrid / env setup.
//
// Auth: SendGrid can't sign inbound posts, so the endpoint is gated by a shared
// secret in the URL query (?key=…) compared to STRATA_INBOUND_SECRET. Until that
// env var is set the endpoint refuses everything (fail closed).

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_ATTACHMENT_BYTES = 25 * 1024 * 1024; // 25 MB — matches SendGrid's inbound limit

// "Jane Smith <jane@strata.com.au>" → { name, email }
function parseFrom(raw: string): { name: string | null; email: string | null } {
  const s = (raw ?? "").trim();
  const angle = s.match(/^\s*"?([^"<]*)"?\s*<([^>]+)>\s*$/);
  if (angle) {
    const name = angle[1].trim();
    return { name: name || null, email: angle[2].trim().toLowerCase() || null };
  }
  if (/^[^\s@]+@[^\s@]+$/.test(s)) return { name: null, email: s.toLowerCase() };
  return { name: s || null, email: null };
}

function extractMessageId(headers: string): string | null {
  const m = (headers ?? "").match(/^message-id:\s*(.+)$/im);
  return m ? m[1].trim().slice(0, 500) : null;
}

function looksLikeFile(v: FormDataEntryValue): v is File {
  return typeof v === "object" && v !== null && typeof (v as File).arrayBuffer === "function" && typeof (v as File).name === "string";
}

function slugifyName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120) || "file";
}

export async function POST(request: NextRequest) {
  // ── Auth ─────────────────────────────────────────────────────────────────
  const secret = process.env.STRATA_INBOUND_SECRET;
  if (!secret) {
    console.error("[strata inbound] STRATA_INBOUND_SECRET is not set — refusing inbound mail.");
    return NextResponse.json({ error: "Inbound intake is not configured." }, { status: 503 });
  }
  if (request.nextUrl.searchParams.get("key") !== secret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch (err) {
    console.error("[strata inbound] could not parse form data:", err);
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const str = (k: string) => {
    const v = form.get(k);
    return typeof v === "string" ? v : "";
  };

  const headers = str("headers");
  const messageId = extractMessageId(headers);
  const { name: fromName, email: fromEmail } = parseFrom(str("from"));
  const subject = str("subject").slice(0, 500) || null;
  const bodyText = str("text").slice(0, 100000) || null;
  const bodyHtml = str("html").slice(0, 200000) || null;
  let envelopeFrom: string | null = null;
  try {
    const env = JSON.parse(str("envelope") || "{}");
    envelopeFrom = typeof env.from === "string" ? env.from.toLowerCase() : null;
  } catch { /* envelope may be absent */ }

  if (!fromEmail && !envelopeFrom) {
    return NextResponse.json({ error: "Missing sender." }, { status: 400 });
  }

  // ── Dedupe on Message-ID (SendGrid can retry) ──────────────────────────────
  if (messageId) {
    const dup = await prisma.strataIntake.findUnique({ where: { message_id: messageId }, select: { id: true } });
    if (dup) return NextResponse.json({ ok: true, duplicate: true, id: dup.id });
  }

  // ── Store the raw intake ────────────────────────────────────────────────────
  const intake = await prisma.strataIntake.create({
    data: {
      message_id: messageId,
      from_email: fromEmail ?? envelopeFrom!,
      from_name: fromName,
      envelope_from: envelopeFrom,
      to_email: str("to").slice(0, 320) || null,
      subject,
      body_text: bodyText,
      body_html: bodyHtml,
      status: "received",
    },
    select: { id: true },
  });

  // ── Attachments → Supabase storage ──────────────────────────────────────────
  const attachmentNames: string[] = [];
  if (hasStorageKey()) {
    let idx = 0;
    for (const [, value] of form.entries()) {
      if (!looksLikeFile(value)) continue;
      idx++;
      const filename = value.name || `attachment-${idx}`;
      const contentType = value.type || "application/octet-stream";
      try {
        if (value.size > MAX_ATTACHMENT_BYTES) throw new Error(`attachment too large (${value.size} bytes)`);
        const buffer = Buffer.from(await value.arrayBuffer());
        const path = `${intake.id}/${idx}-${slugifyName(filename)}`;
        const url = await uploadStrataFile(path, buffer, contentType);
        await prisma.strataIntakeFile.create({
          data: {
            intake_id: intake.id,
            filename,
            content_type: contentType,
            size_bytes: value.size,
            url,
            is_pdf: contentType.includes("pdf") || /\.pdf$/i.test(filename),
          },
        });
        attachmentNames.push(filename);
      } catch (err) {
        console.error(`[strata inbound] attachment "${filename}" failed for intake ${intake.id}:`, err);
        // Record the filename anyway (no URL) so the admin knows something arrived.
        await prisma.strataIntakeFile.create({
          data: { intake_id: intake.id, filename, content_type: contentType, is_pdf: /\.pdf$/i.test(filename) },
        }).catch(() => {});
        attachmentNames.push(filename);
      }
    }
  } else {
    console.error("[strata inbound] SUPABASE_SERVICE_ROLE_KEY not set — attachments not stored for intake", intake.id);
  }

  // ── AI extraction (Stage 2) ─────────────────────────────────────────────────
  if (hasAnthropicKey()) {
    await prisma.strataIntake.update({ where: { id: intake.id }, data: { status: "extracting" } });
    try {
      const ex = await extractStrataIntake({ subject, bodyText, bodyHtml, fromName, fromEmail, attachmentNames });
      await prisma.strataIntake.update({
        where: { id: intake.id },
        data: {
          building_address: ex.building_address,
          suburb: ex.suburb,
          postcode: ex.postcode,
          state: ex.state,
          strata_plan_number: ex.strata_plan_number,
          order_number: ex.order_number,
          job_description: ex.job_description,
          extracted_units: ex.extracted_units ?? undefined,
          matched_category_id: ex.matched_category_id,
          matched_category_slug: ex.matched_category_slug,
          matched_category_name: ex.matched_category_name,
          match_confidence: ex.match_confidence,
          status: "needs_review",
          extraction_error: null,
        },
      });
    } catch (err) {
      console.error(`[strata inbound] extraction failed for intake ${intake.id}:`, err);
      await prisma.strataIntake.update({
        where: { id: intake.id },
        data: { status: "failed", extraction_error: String((err as Error)?.message ?? err).slice(0, 480) },
      });
    }
  } else {
    // No AI key — still queue it for manual review.
    await prisma.strataIntake.update({ where: { id: intake.id }, data: { status: "needs_review" } });
  }

  // ── Notify the admin (best-effort) ──────────────────────────────────────────
  sendStrataIntakeAdminEmail({
    intakeId: intake.id,
    fromName,
    fromEmail: fromEmail ?? envelopeFrom!,
    subject,
    attachments: attachmentNames.length,
  }).catch((e) => console.error("[strata inbound] admin email failed:", e));

  return NextResponse.json({ ok: true, id: intake.id });
}
