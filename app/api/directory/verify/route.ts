import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuthToken, createSessionToken, createDirectorySessionCookie } from "@/lib/directory-auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const token = String(body?.token ?? "").trim();

  if (!token) return NextResponse.json({ error: "Invalid token." }, { status: 400 });

  const payload = verifyAuthToken(token, "email_verification");
  if (!payload) return NextResponse.json({ error: "This link has expired or is invalid." }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) return NextResponse.json({ error: "Account not found." }, { status: 404 });

  if (!user.is_verified) {
    await prisma.user.update({
      where: { id: user.id },
      data: { is_verified: true, email_verified_at: new Date() },
    });
  }

  // Auto-login — set session cookie so they land straight in dashboard
  const sessionToken = createSessionToken(user.id);
  const response = NextResponse.json({ success: true });
  response.cookies.set(createDirectorySessionCookie(sessionToken));
  return response;
}
