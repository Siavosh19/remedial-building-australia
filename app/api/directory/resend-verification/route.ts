import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuthToken } from "@/lib/directory-auth";
import { sendDirectoryVerificationEmail } from "@/lib/directory-email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Resend the email-verification link for an unverified directory / supplier /
// AI-scope account (the client portal has its own resend endpoint). Always
// responds success so the form can't be used to probe which emails exist.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email ?? "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) return NextResponse.json({ success: true });

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, role: true, full_name: true, is_verified: true },
  });

  if (user && user.role !== "client_user" && !user.is_verified) {
    const token = createAuthToken(user.id, "email_verification");
    try {
      await sendDirectoryVerificationEmail(user.full_name ?? "there", email, token);
    } catch (err) {
      console.error(`[directory resend-verification] send to ${email} failed:`, err);
      return NextResponse.json(
        { error: "We couldn't resend the email just now. Please try again shortly." },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({ success: true });
}
