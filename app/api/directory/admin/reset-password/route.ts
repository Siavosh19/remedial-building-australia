import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/directory-auth";

// One-time admin password reset — DELETE THIS ROUTE after use
const RESET_SECRET = "rba-reset-2026-xK9mP";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || body.secret !== RESET_SECRET) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { email, newPassword } = body;
  if (!email || !newPassword || newPassword.length < 8) {
    return NextResponse.json({ error: "email and newPassword (min 8 chars) required" }, { status: 400 });
  }

  const hash = await hashPassword(newPassword);
  const updated = await prisma.user.updateMany({
    where: { email: email.toLowerCase() },
    data: { password_hash: hash, is_verified: true },
  });

  if (updated.count === 0) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ ok: true, updated: updated.count });
}
