import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, createDirectorySessionCookie, createSessionToken } from "@/lib/directory-auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!email || !EMAIL_RE.test(email)) return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  if (!password) return NextResponse.json({ error: "Password is required." }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });

  const passwordMatches = await comparePassword(password, user.password_hash);
  if (!passwordMatches) return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  if (!user.is_verified) return NextResponse.json({ error: "Please verify your email before logging in." }, { status: 403 });

  const sessionToken = createSessionToken(user.id);
  const response = NextResponse.json({ success: true });
  response.cookies.set(createDirectorySessionCookie(sessionToken));
  return response;
}
