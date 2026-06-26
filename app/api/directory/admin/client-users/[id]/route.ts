import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/directory-auth";

type Params = { params: Promise<{ id: string }> };

// PATCH — suspend / unsuspend a strata-client user account.
export async function PATCH(request: NextRequest, { params }: Params) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const userId = Number(id);
  if (!Number.isInteger(userId)) return NextResponse.json({ error: "Invalid ID." }, { status: 400 });

  const body = await request.json().catch(() => null);
  if (typeof body?.suspended !== "boolean") {
    return NextResponse.json({ error: "Missing suspended flag." }, { status: 400 });
  }

  const target = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, role: true } });
  if (!target || target.role !== "client_user") {
    return NextResponse.json({ error: "Client user not found." }, { status: 404 });
  }

  await prisma.user.update({ where: { id: userId }, data: { suspended: body.suspended } });
  return NextResponse.json({ success: true });
}
