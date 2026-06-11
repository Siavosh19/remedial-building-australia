import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuthToken, hashPassword, createDirectorySessionCookie, createSessionToken } from "@/lib/directory-auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const token = String(body.token ?? "");
  const password = String(body.password ?? "");
  const confirmPassword = String(body.confirmPassword ?? "");

  if (!token) return NextResponse.json({ error: "Invalid token." }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  if (password !== confirmPassword) return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });

  const payload = verifyAuthToken(token, "password_reset");
  if (!payload) return NextResponse.json({ error: "Invalid or expired token." }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

  const password_hash = await hashPassword(password);
  await prisma.user.update({ where: { id: user.id }, data: { password_hash } });

  const response = NextResponse.json({ success: true });
  if (user.is_verified) {
    const sessionToken = createSessionToken(user.id);
    response.cookies.set(createDirectorySessionCookie(sessionToken));
  }

  return response;
}
