import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuthToken } from "@/lib/directory-auth";
import { sendDirectoryPasswordResetEmail } from "@/lib/directory-email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) return NextResponse.json({ success: true });

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    const token = createAuthToken(user.id, "password_reset", "1d");
    await sendDirectoryPasswordResetEmail(user.full_name ?? "User", email, token);
  }

  return NextResponse.json({ success: true });
}
