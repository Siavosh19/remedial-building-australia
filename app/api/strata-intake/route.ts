import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { STRATA_INTAKE_BUCKET, extractIntake } from "@/lib/strata-connect";

// Inbound work-order webhook for Strata Connect.
//
// A strata manager forwards a work order to workorders@… ; that mailbox
// auto-forwards to a Resend Inbound address. Resend POSTs an `email.received`
// event that contains only METADATA (email_id, from, to, subject, attachment
// filenames) — NOT the body or attachment bytes. So we call the Resend Received
// Emails API to fetch the body, and the Attachments API for each file's
// download URL. We store it as a PENDING StrataIntake, AI-extract it (Stage 2),
// and an admin reviews + approves it (Stage 3) before any business is contacted.
//
// A direct full-email JSON POST (no `type: email.received`) is still accepted as
// a fallback so the flow can be tested without Resend.

const RESEND_API = "https://api.resend.com";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type InboundAttachment = {
  filename?: string;
  name?: string;
  content_type?: string;
  contentType?: string;
  content?: string; // base64
  content_url?: string; // or a URL to fetch
  url?: string;
  size?: number;
};

type InboundEmail = {
  message_id?: string;
  messageId?: string;
  from?: string | { email?: string; name?: string };
  to?: string | Array<string | { email?: string }>;
  subject?: string;
  text?: string;
  html?: string;
  attachments?: InboundAttachment[];
};

// Svix-style signature verification (Resend signs inbound webhooks via Svix).
// Skipped when RESEND_INBOUND_SECRET is unset (e.g. local/dev simulated posts).
function verifySignature(secret: string, headers: Headers, rawBody: string): boolean {
  const id = headers.get("svix-id") ?? headers.get("webhook-id");
  const ts = headers.get("svix-timestamp") ?? headers.get("webhook-timestamp");
  const sig = headers.get("svix-signature") ?? headers.get("webhook-signature");
  if (!id || !ts || !sig) return false;
  const key = secret.startsWith("whsec_") ? secret.slice(6) : secret;
  let keyBytes: Buffer;
  try {
    keyBytes = Buffer.from(key, "base64");
  } catch {
    return false;
  }
  const expected = crypto.createHmac("sha256", keyBytes).update(`${id}.${ts}.${rawBody}`).digest("base64");
  return sig.split(" ").some((part) => {
    const s = part.includes(",") ? part.split(",")[1] : part;
    try {
      return crypto.timingSafeEqual(Buffer.from(s), Buffer.from(expected));
    } catch {
      return false;
    }
  });
}

function parseFrom(v: InboundEmail["from"]): { email: string; name?: string } {
  if (!v) return { email: "" };
  if (typeof v === "string") {
    const m = v.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
    if (m) return { email: m[2].trim(), name: m[1].replace(/"/g, "").trim() || undefined };
    return { email: v.trim() };
  }
  return { email: (v.email ?? "").trim(), name: v.name };
}

function joinTo(to: InboundEmail["to"]): string | null {
  if (!to) return null;
  if (typeof to === "string") return to;
  const parts = to.map((t) => (typeof t === "string" ? t : t.email ?? "")).filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}

// Resend's email.received webhook is metadata-only. Pull the full email (body)
// from the Received Emails API and each attachment's presigned download URL from
// the Attachments API, mapping into our InboundEmail shape. Returns null if the
// API key is missing or the fetch fails (caller then errors so Resend retries).
async function hydrateFromResend(emailId: string): Promise<InboundEmail | null> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  const headers = { Authorization: `Bearer ${key}` };

  const r = await fetch(`${RESEND_API}/emails/receiving/${emailId}`, { headers });
  if (!r.ok) return null;
  const e = (await r.json()) as Record<string, unknown>;

  let attachments: InboundAttachment[] = [];
  try {
    const ar = await fetch(`${RESEND_API}/emails/receiving/${emailId}/attachments?limit=100`, { headers });
    if (ar.ok) {
      const aj = (await ar.json()) as { data?: Array<Record<string, unknown>> };
      attachments = (aj.data ?? []).map((a) => ({
        filename: a.filename as string | undefined,
        content_type: a.content_type as string | undefined,
        size: a.size as number | undefined,
        content_url: a.download_url as string | undefined, // presigned CDN URL → raw bytes
      }));
    }
  } catch {
    // Attachments are best-effort; the body alone is enough to extract from.
  }

  return {
    message_id: (e.message_id as string) ?? emailId,
    from: e.from as InboundEmail["from"],
    to: e.to as InboundEmail["to"],
    subject: e.subject as string | undefined,
    text: e.text as string | undefined,
    html: e.html as string | undefined,
    attachments,
  };
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  const secret = process.env.RESEND_INBOUND_SECRET;
  if (secret && !verifySignature(secret, request.headers, rawBody)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }
  const record = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
  const eventType = typeof record.type === "string" ? record.type : "";
  const data = (record.data ?? record) as Record<string, unknown>;

  // Real Resend inbound: metadata-only event → fetch the full email from the API.
  // Otherwise treat the POST body as a full email (direct/test path).
  let email: InboundEmail;
  if (eventType === "email.received" && data.email_id) {
    const hydrated = await hydrateFromResend(String(data.email_id));
    if (!hydrated) {
      // Non-200 so Resend retries once the API key / transient issue is resolved.
      return NextResponse.json({ error: "Could not retrieve received email from Resend." }, { status: 502 });
    }
    email = hydrated;
  } else {
    email = data as InboundEmail;
  }

  const from = parseFrom(email.from);
  if (!from.email) return NextResponse.json({ error: "Missing sender." }, { status: 400 });

  // Sender allowlist — Strata Connect only accepts work orders from an address
  // that has a login account (the email someone signed up with). Any other
  // sender is ignored: no intake is created, no attachments are stored, no AI
  // runs, so no quote can ever result. We return 200 so Resend treats the
  // message as delivered and does not retry.
  const account = await prisma.user.findUnique({
    where: { email: from.email.toLowerCase() },
    select: { id: true, suspended: true },
  });
  if (!account || account.suspended) {
    return NextResponse.json({ ok: true, rejected: true, reason: "sender-not-registered" });
  }

  const messageId = email.message_id ?? email.messageId ?? null;

  // Idempotency: the same forwarded message must not create a second intake.
  if (messageId) {
    const existing = await prisma.strataIntake.findUnique({
      where: { message_id: messageId },
      select: { id: true },
    });
    if (existing) return NextResponse.json({ ok: true, id: existing.id, deduped: true });
  }

  const intake = await prisma.strataIntake.create({
    data: {
      message_id: messageId,
      from_email: from.email,
      from_name: from.name ?? null,
      envelope_from: from.email,
      to_email: joinTo(email.to),
      subject: email.subject ?? null,
      body_text: email.text ?? null,
      body_html: email.html ?? null,
      status: "received",
    },
  });

  // Persist EVERY attachment (any type) so the admin review shows all of them.
  const attachments = Array.isArray(email.attachments) ? email.attachments : [];
  const haveStorage = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  if (attachments.length && haveStorage) {
    await supabaseAdmin.storage.createBucket(STRATA_INTAKE_BUCKET, { public: false }).catch(() => {});
  }

  for (let i = 0; i < attachments.length; i++) {
    const att = attachments[i];
    const filename = att.filename ?? att.name ?? `attachment-${i + 1}`;
    const contentType = att.content_type ?? att.contentType ?? "application/octet-stream";

    let buffer: Buffer | null = null;
    try {
      if (att.content) {
        buffer = Buffer.from(att.content, "base64");
      } else {
        const url = att.content_url ?? att.url;
        if (url) {
          const r = await fetch(url);
          if (r.ok) buffer = Buffer.from(await r.arrayBuffer());
        }
      }
    } catch {
      buffer = null;
    }

    let storedPath: string | null = null;
    if (buffer && haveStorage) {
      const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${intake.id}/${i + 1}-${safe}`;
      const { error } = await supabaseAdmin.storage
        .from(STRATA_INTAKE_BUCKET)
        .upload(path, buffer, { contentType, upsert: true });
      if (!error) storedPath = path;
    }

    await prisma.strataIntakeFile.create({
      data: {
        intake_id: intake.id,
        filename,
        content_type: contentType,
        size_bytes: att.size ?? buffer?.length ?? null,
        url: storedPath, // storage object path; admin views it via a signed URL
        is_pdf: /pdf/i.test(contentType) || /\.pdf$/i.test(filename),
      },
    });
  }

  // Stage 2 — AI extraction (address, category, job summary). Best-effort: it
  // never throws (records an error + leaves needs_review), and we still return
  // 200 so the inbound provider doesn't retry the delivery.
  await extractIntake(intake.id).catch(() => {});

  return NextResponse.json({ ok: true, id: intake.id, attachments: attachments.length });
}
