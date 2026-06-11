import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/admin-auth";
import { sendClaimDecisionEmail } from "@/lib/directory-email";

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const claims = await prisma.claimRequest.findMany({
    orderBy: { created_at: "desc" },
    take: 200,
    include: {
      company: { select: { id: true, name: true, slug: true, status: true, plan_type: true, listing_claim_status: true } },
    },
  });

  return NextResponse.json(claims);
}

export async function PATCH(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const claimId = Number(body.claimId);
  const action = String(body.action ?? ""); // "approve" | "reject"
  const adminNote = body.adminNote ? String(body.adminNote).trim() : undefined;

  if (!claimId || !["approve", "reject"].includes(action)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const claim = await prisma.claimRequest.findUnique({
    where: { id: claimId },
    include: { company: { select: { id: true, name: true, listing_claim_status: true } } },
  });
  if (!claim) return NextResponse.json({ error: "Claim not found." }, { status: 404 });

  if (action === "approve") {
    await prisma.$transaction(async (tx) => {
      await tx.claimRequest.update({
        where: { id: claimId },
        data: {
          status: "claimed",
          admin_notes: adminNote ?? null,
          reviewed_by: admin.id,
          reviewed_at: new Date(),
        },
      });

      await tx.company.update({
        where: { id: claim.company.id },
        data: {
          listing_claim_status: "claimed",
          is_claimed: true,
          claimed_at: new Date(),
          // Elevate to claimed plan if still basic
          plan_type: claim.company.listing_claim_status === "unclaimed" ? "claimed" : undefined,
        },
      });

      // Link user to company if not already linked
      const existingLink = await tx.companyUser.findFirst({
        where: { company_id: claim.company.id, user_id: claim.user_id },
      });
      if (!existingLink) {
        await tx.companyUser.create({
          data: {
            company_id: claim.company.id,
            user_id: claim.user_id,
            role: "owner",
            is_primary: true,
            invited_at: new Date(),
            accepted_at: new Date(),
          },
        });
      }

      // Start free trial subscription for claimed plan
      await tx.directorySubscription.upsert({
        where: { company_id: claim.company.id },
        create: {
          company_id: claim.company.id,
          plan_type: "claimed",
          billing_cycle: "free",
          subscription_status: "trialing",
          trial_started_at: new Date(),
          trial_ends_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          admin_notes: "60-day trial started on claim approval",
        },
        update: {
          subscription_status: "trialing",
          trial_started_at: new Date(),
          trial_ends_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          admin_notes: "60-day trial started on claim approval",
        },
      });
    });

    // Get user details for email
    const user = await prisma.user.findUnique({ where: { id: claim.user_id }, select: { full_name: true, email: true } });
    if (user) {
      sendClaimDecisionEmail(user.full_name ?? user.email, user.email, claim.company.name, true, adminNote).catch(() => {});
    }

    return NextResponse.json({ success: true, action: "approved" });
  }

  // Reject
  await prisma.$transaction(async (tx) => {
    await tx.claimRequest.update({
      where: { id: claimId },
      data: {
        status: "rejected",
        admin_notes: adminNote ?? null,
        reviewed_by: admin.id,
        reviewed_at: new Date(),
      },
    });
    // Reset claim status only if no other pending claims
    const otherPending = await tx.claimRequest.findFirst({
      where: { company_id: claim.company.id, status: "claim_pending", id: { not: claimId } },
    });
    if (!otherPending) {
      await tx.company.update({
        where: { id: claim.company.id },
        data: { listing_claim_status: "unclaimed" },
      });
    }
  });

  const user = await prisma.user.findUnique({ where: { id: claim.user_id }, select: { full_name: true, email: true } });
  if (user) {
    sendClaimDecisionEmail(user.full_name ?? user.email, user.email, claim.company.name, false, adminNote).catch(() => {});
  }

  return NextResponse.json({ success: true, action: "rejected" });
}
