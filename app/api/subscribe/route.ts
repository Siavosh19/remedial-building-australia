/*
  Run this in your Supabase SQL editor ONCE before using this route:

  ALTER TABLE newsletter_subscribers
    ADD COLUMN IF NOT EXISTS name              text,
    ADD COLUMN IF NOT EXISTS interest_category text,
    ADD COLUMN IF NOT EXISTS subscribed_at     timestamptz DEFAULT now();

  CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_email_idx
    ON newsletter_subscribers (lower(email));
*/

import { NextRequest, NextResponse } from "next/server";
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

  return NextResponse.json({ success: true });
}
