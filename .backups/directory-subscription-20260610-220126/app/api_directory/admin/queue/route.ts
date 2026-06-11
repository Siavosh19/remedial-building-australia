import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import type { LocationState, AdminReviewStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/directory-auth";

const PAGE_SIZE = 25;

const VALID_STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];
const VALID_STATUSES = [
  "discovered",
  "possible_match",
  "verified",
  "needs_review",
  "rejected",
  "published",
  "needs_recheck",
];

const QUEUE_INCLUDE = {
  company: {
    include: {
      main_category: { select: { id: true, name: true, slug: true } },
      locations: { take: 1 },
      licences: true,
      company_categories: {
        include: { category: { select: { id: true, name: true, slug: true } } },
      },
      company_tags: {
        include: { tag: true },
      },
    },
  },
  reviewer: { select: { id: true, full_name: true, email: true } },
} satisfies Prisma.AdminReviewQueueInclude;

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sp = request.nextUrl.searchParams;
  const status = sp.get("status") ?? "";
  const state = sp.get("state") ?? "";
  const category = sp.get("category") ?? "";
  const page = Math.max(1, parseInt(sp.get("page") ?? "1") || 1);
  const offset = (page - 1) * PAGE_SIZE;

  const where: Prisma.AdminReviewQueueWhereInput = {};

  if (status && VALID_STATUSES.includes(status)) {
    where.status = status as AdminReviewStatus;
  }

  const companyWhere: Prisma.CompanyWhereInput = {};
  if (state && VALID_STATES.includes(state.toUpperCase())) {
    companyWhere.locations = { some: { state: state.toUpperCase() as LocationState } };
  }
  if (category) {
    companyWhere.main_category = { slug: category };
  }
  if (Object.keys(companyWhere).length > 0) {
    where.company = companyWhere;
  }

  const [total, items] = await Promise.all([
    prisma.adminReviewQueue.count({ where }),
    prisma.adminReviewQueue.findMany({
      where,
      include: QUEUE_INCLUDE,
      orderBy: { created_at: "desc" },
      take: PAGE_SIZE,
      skip: offset,
    }),
  ]);

  return NextResponse.json({
    items,
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.ceil(total / PAGE_SIZE),
  });
}
