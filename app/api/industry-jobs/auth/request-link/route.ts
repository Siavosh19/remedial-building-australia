import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createMagicToken } from "@/lib/jobs-auth";
import { sendJobMagicLinkEmail } from "@/lib/jobs-email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Passwordless sign-in: upsert the employer by email and email them a magic link.
// Always returns a generic success (no account enumeration).
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const email = String(body.email ?? "").toLowerCase().trim();
  const next = typeof body.next === "string" ? body.next : undefined;
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });

  await prisma.jobEmployer.upsert({
    where: { email },
    create: { email },
    update: {},
  });

  const token = createMagicToken(email);
  try {
    await sendJobMagicLinkEmail(email, token, next);
  } catch (err) {
    console.error("[jobs/auth/request-link] email failed:", err);
    return NextResponse.json({ error: "We couldn't send the email right now. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
