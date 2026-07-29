import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/directory-auth";
import { Prisma } from "@prisma/client";
import { bustDirectoryCache } from "@/lib/directory-cache";

const PAGE_SIZE = 50;
const VALID_STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sp = request.nextUrl.searchParams;
  const search = sp.get("search")?.trim() ?? "";
  const state = sp.get("state")?.toUpperCase() ?? "";
  const status = sp.get("status") ?? "";
  const page = Math.max(1, parseInt(sp.get("page") ?? "1") || 1);

  const where: Prisma.CompanyWhereInput = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { abn: { contains: search } },
    ];
  }

  if (state && VALID_STATES.includes(state)) {
    where.locations = { some: { state: state as Prisma.EnumLocationStateFilter["equals"] } };
  }

  if (status && ["draft", "published", "rejected", "needs_review"].includes(status)) {
    where.status = status as Prisma.EnumCompanyStatusFilter["equals"];
  }

  const [total, items] = await Promise.all([
    prisma.company.count({ where }),
    prisma.company.findMany({
      where,
      orderBy: { created_at: "desc" },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      select: {
        id: true,
        name: true,
        slug: true,
        email: true,
        status: true,
        profile_status: true,
        is_claimed: true,
        created_at: true,
        main_category: { select: { name: true } },
        locations: { take: 1, select: { suburb: true, state: true } },
      },
    }),
  ]);

  return NextResponse.json({ items, total, page, pageSize: PAGE_SIZE, totalPages: Math.ceil(total / PAGE_SIZE) });
}

// Change a company's primary category. Keeps the CompanyCategory "primary" mirror
// row in sync (replace semantics: the old primary row is dropped, the new one is set
// primary + approved) so directory search — which only matches approved
// company_categories — reflects the change immediately.
export async function PATCH(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const companyId = Number(body.id);
  const newCategoryId = Number(body.main_category_id);
  if (!companyId) return NextResponse.json({ error: "Missing company id" }, { status: 400 });
  if (!newCategoryId || newCategoryId <= 0) {
    return NextResponse.json({ error: "Pick a valid category" }, { status: 400 });
  }

  const [company, category] = await Promise.all([
    prisma.company.findUnique({ where: { id: companyId }, select: { id: true } }),
    prisma.category.findUnique({ where: { id: newCategoryId }, select: { id: true } }),
  ]);
  if (!company) return NextResponse.json({ error: "Company not found" }, { status: 404 });
  if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });

  await prisma.$transaction(async (tx) => {
    // 1. The FK on the company record.
    await tx.company.update({ where: { id: companyId }, data: { main_category_id: newCategoryId } });

    // 2. Drop the old primary mirror row(s).
    await tx.companyCategory.deleteMany({ where: { company_id: companyId, is_primary: true } });

    // 3. Promote an existing junction row for the new category, or create one.
    const existing = await tx.companyCategory.findFirst({
      where: { company_id: companyId, category_id: newCategoryId },
      select: { id: true },
    });
    if (existing) {
      await tx.companyCategory.update({
        where: { id: existing.id },
        data: { is_primary: true, is_approved: true, approved_at: new Date(), approved_by: admin.id },
      });
    } else {
      await tx.companyCategory.create({
        data: {
          company_id: companyId,
          category_id: newCategoryId,
          is_primary: true,
          is_approved: true,
          approved_at: new Date(),
          approved_by: admin.id,
        },
      });
    }
  });

  // Reflect the new category in directory search immediately (matches other edit routes).
  bustDirectoryCache();

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sp = request.nextUrl.searchParams;
  const id = parseInt(sp.get("id") ?? "");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  // Delete all related records first (no cascade in schema)
  await prisma.$transaction([
    prisma.adminReviewQueue.deleteMany({ where: { company_id: id } }),
    prisma.leadDelivery.deleteMany({ where: { company_id: id } }),
    prisma.leadSubscription.deleteMany({ where: { company_id: id } }),
    prisma.companyTag.deleteMany({ where: { company_id: id } }),
    prisma.companyCategory.deleteMany({ where: { company_id: id } }),
    prisma.companyUser.deleteMany({ where: { company_id: id } }),
    prisma.licence.deleteMany({ where: { company_id: id } }),
    prisma.location.deleteMany({ where: { company_id: id } }),
    prisma.company.delete({ where: { id } }),
  ]);

  return NextResponse.json({ ok: true });
}
