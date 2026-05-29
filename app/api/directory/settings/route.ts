import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest, comparePassword, hashPassword } from "@/lib/directory-auth";

export async function PATCH(request: NextRequest) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const currentPassword = String(body.currentPassword ?? "");
  const newPassword = String(body.newPassword ?? "");
  const confirmPassword = String(body.confirmPassword ?? "");

  if (!currentPassword) return NextResponse.json({ error: "Current password is required." }, { status: 400 });
  if (newPassword.length < 8) return NextResponse.json({ error: "New password must be at least 8 characters." }, { status: 400 });
  if (newPassword !== confirmPassword) return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });

  const matches = await comparePassword(currentPassword, user.password_hash);
  if (!matches) return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });

  const password_hash = await hashPassword(newPassword);
  await prisma.user.update({ where: { id: user.id }, data: { password_hash } });

  return NextResponse.json({ success: true });
}
