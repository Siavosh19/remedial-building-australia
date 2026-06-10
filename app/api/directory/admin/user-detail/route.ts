import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/directory-auth";

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      full_name: true,
      phone: true,
      role: true,
      is_verified: true,
      created_at: true,
      company_users: {
        include: {
          company: {
            include: {
              main_category: { select: { id: true, name: true } },
              locations: { take: 1 },
            },
          },
        },
        orderBy: { is_primary: "desc" },
      },
    },
  });

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const categories = await prisma.category.findMany({
    where: { is_active: true },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ user, categories });
}

export async function PATCH(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const { userId, companyId, user: userPatch, company: companyPatch } = body;

  const updates: Promise<unknown>[] = [];

  if (userId && userPatch) {
    const data: Record<string, unknown> = {};
    if (userPatch.full_name !== undefined) data.full_name = userPatch.full_name || null;
    if (userPatch.role !== undefined) data.role = userPatch.role;
    if (userPatch.is_verified !== undefined) data.is_verified = Boolean(userPatch.is_verified);
    if (Object.keys(data).length > 0) {
      updates.push(prisma.user.update({ where: { id: userId }, data }));
    }
  }

  if (companyId && companyPatch) {
    const data: Record<string, unknown> = {};
    if (companyPatch.name !== undefined) data.name = companyPatch.name;
    if (companyPatch.abn !== undefined) data.abn = companyPatch.abn || null;
    if (companyPatch.email !== undefined) data.email = companyPatch.email;
    if (companyPatch.phone !== undefined) data.phone = companyPatch.phone || null;
    if (companyPatch.website !== undefined) data.website = companyPatch.website || null;
    if (companyPatch.status !== undefined) data.status = companyPatch.status;
    if (companyPatch.main_category_id !== undefined) data.main_category_id = companyPatch.main_category_id ? Number(companyPatch.main_category_id) : null;
    if (Object.keys(data).length > 0) {
      updates.push(prisma.company.update({ where: { id: companyId }, data }));
    }
  }

  await Promise.all(updates);
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  if (id === admin.id) return NextResponse.json({ error: "Cannot delete your own account." }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id }, include: { company_users: true, ai_scope_user: true } });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.$transaction(async (tx) => {
    if (user.ai_scope_user) await tx.aIScopeUser.delete({ where: { user_id: id } });
    if (user.company_users.length) await tx.companyUser.deleteMany({ where: { user_id: id } });
    await tx.user.delete({ where: { id } });
  });

  return NextResponse.json({ success: true });
}
