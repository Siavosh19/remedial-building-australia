import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/directory-auth";
import { Prisma } from "@prisma/client";

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
