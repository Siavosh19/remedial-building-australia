/*
  Run this in your Supabase SQL editor ONCE before using this route:

  CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name              text NOT NULL,
    email             text NOT NULL,
    interest_category text,
    subscribed_at     timestamptz DEFAULT now()
  );

  CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_email_idx
    ON public.newsletter_subscribers (lower(email));
*/

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SUBSCRIBER_INTERESTS = [
  "All Topics",
  "Concrete Repair & Spalling",
  "Waterproofing & Membranes",
  "Façade & External Envelope",
  "Building Compliance & NCC",
  "Strata & Class 2 Buildings",
  "Fire Compliance",
  "Repair Systems & Products",
] as const;

export type SubscriberInterest = (typeof SUBSCRIBER_INTERESTS)[number];

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name     = String(body.name     ?? "").trim();
  const email    = String(body.email    ?? "").trim().toLowerCase();
  const interest = String(body.interest ?? "").trim();

  // ── Validation ──────────────────────────────────────────────────────────────
  if (!name)
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });

  if (!email || !EMAIL_RE.test(email))
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  if (!(SUBSCRIBER_INTERESTS as readonly string[]).includes(interest))
    return NextResponse.json({ error: "Please select an interest area." }, { status: 400 });

  // ── Duplicate check ─────────────────────────────────────────────────────────
  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("id")
    .ilike("email", email)
    .limit(1);

  if (existing && existing.length > 0)
    return NextResponse.json(
      { error: "That email is already subscribed — check your inbox for past updates." },
      { status: 409 }
    );

  // ── Insert ──────────────────────────────────────────────────────────────────
  const { error } = await supabase.from("newsletter_subscribers").insert({
    name,
    email,
    interest_category: interest,
    subscribed_at: new Date().toISOString(),
  });

  if (error) {
    console.error("[subscribe] Supabase insert error:", error);
    return NextResponse.json(
      { error: "Unable to subscribe right now. Please try again shortly." },
      { status: 500 }
    );
  }

  // ── Send confirmation email ─────────────────────────────────────────────────
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data: emailData, error: emailError } = await resend.emails.send({
    from: "Remedial Building Australia <newsletter@remedialbuildingaustralia.com.au>",
    to: email,
    subject: "You're subscribed — Remedial Building Australia",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0c2340">
        <div style="background:#0c2340;padding:24px 32px;border-radius:12px 12px 0 0">
          <p style="margin:0;font-size:13px;font-weight:700;color:#f87171;letter-spacing:0.2em;text-transform:uppercase">Newsletter</p>
          <h1 style="margin:8px 0 0;font-size:22px;color:#ffffff">Remedial Building Australia</h1>
        </div>
        <div style="background:#f8fafc;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;border-top:none">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6">Hi ${name},</p>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.6">
            Thanks for subscribing to the <strong>Fortnightly Remedial Building Update</strong>.
            You'll receive curated industry news, compliance updates and technical references
            directly to your inbox every fortnight.
          </p>
          <p style="margin:0 0 8px;font-size:13px;color:#64748b"><strong>Your interest area:</strong> ${interest}</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0"/>
          <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6">
            You're receiving this because you subscribed at remedialbuildingaustralia.com.au.<br/>
            To unsubscribe, reply to this email or contact
            <a href="mailto:info@remedialbuildingaustralia.com.au" style="color:#0ea5e9">info@remedialbuildingaustralia.com.au</a>.
          </p>
        </div>
      </div>
    `,
  });

  if (emailError) console.error("[subscribe] Resend error:", emailError);
  else console.log("[subscribe] Confirmation email sent:", emailData?.id);

  return NextResponse.json({ success: true });
}
