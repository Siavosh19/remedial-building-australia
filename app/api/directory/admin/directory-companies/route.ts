import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/admin-auth";
import type { DirectoryPlanType, CompanyStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const companies = await prisma.company.findMany({
    orderBy: [{ plan_type: "desc" }, { created_at: "desc" }],
    take: 500,
    select: {
      id: true,
      slug: true,
      name: true,
      email: true,
      phone: true,
      status: true,
      plan_type: true,
      listing_claim_status: true,
      is_featured: true,
      is_claimed: true,
      suspended: true,
      profile_views: true,
      phone_clicks: true,
      website_clicks: true,
      created_at: true,
      main_category: { select: { name: true } },
      locations: { take: 1, select: { suburb: true, state: true } },
      directory_subscription: {
        select: { subscription_status: true, plan_type: true, billing_cycle: true, trial_ends_at: true, current_period_end: true, stripe_customer_id: true, stripe_subscription_id: true },
      },
      _count: { select: { quote_requests: true } },
    },
  });

  return NextResponse.json(companies);
}

export async function PATCH(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const companyId = Number(body.companyId);
  if (!companyId) return NextResponse.json({ error: "Invalid company ID." }, { status: 400 });

  const company = await prisma.company.findUnique({ where: { id: companyId } });
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

  const updates: Record<string, unknown> = {};
  const subUpdates: Record<string, unknown> = {};

  if (body.plan_type) updates.plan_type = body.plan_type as DirectoryPlanType;
  if (body.status) updates.status = body.status as CompanyStatus;
  if (typeof body.suspended === "boolean") updates.suspended = body.suspended;
  if (typeof body.is_featured === "boolean") {
    updates.is_featured = body.is_featured;
    if (body.is_featured) updates.plan_type = "featured";
  }
  if (typeof body.quote_requests_enabled === "boolean") updates.quote_requests_enabled = body.quote_requests_enabled;
  if (body.featured_until) updates.featured_until = new Date(body.featured_until);

  if (body.override_plan) {
    subUpdates.admin_override_plan = body.override_plan as DirectoryPlanType;
    subUpdates.admin_override_by = admin.id;
    subUpdates.admin_override_at = new Date();
    subUpdates.admin_notes = body.override_notes ?? null;
    updates.plan_type = body.override_plan as DirectoryPlanType;
    if (body.override_plan === "featured") updates.is_featured = true;
  }

  if (body.trial_ends_at) subUpdates.trial_ends_at = new Date(body.trial_ends_at);
  if (body.subscription_status) subUpdates.subscription_status = body.subscription_status;

  await prisma.$transaction(async (tx) => {
    if (Object.keys(updates).length) {
      await tx.company.update({ where: { id: companyId }, data: updates });
    }
    if (Object.keys(subUpdates).length) {
      await tx.directorySubscription.upsert({
        where: { company_id: companyId },
        create: { company_id: companyId, ...subUpdates },
        update: subUpdates,
      });
    }
  });

  return NextResponse.json({ success: true });
}
