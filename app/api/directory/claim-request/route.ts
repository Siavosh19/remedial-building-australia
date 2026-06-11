import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { sendClaimRequestAdminEmail } from "@/lib/directory-email";

export async function POST(request: NextRequest) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const slug = String(body.slug ?? "").trim();
  if (!slug) return NextResponse.json({ error: "Company not specified." }, { status: 400 });

  const company = await prisma.company.findFirst({
    where: { slug, status: "published" },
  });
  if (!company) return NextResponse.json({ error: "Listing not found." }, { status: 404 });
  if (company.listing_claim_status === "claimed") {
    return NextResponse.json({ error: "This listing has already been claimed." }, { status: 409 });
  }

  // Check for duplicate pending claim by same user
  const existing = await prisma.claimRequest.findFirst({
    where: { company_id: company.id, user_id: user.id, status: "claim_pending" },
  });
  if (existing) {
    return NextResponse.json({ error: "You already have a pending claim for this listing." }, { status: 409 });
  }

  const claimRequest = await prisma.$transaction(async (tx) => {
    const req = await tx.claimRequest.create({
      data: {
        company_id: company.id,
        user_id: user.id,
        status: "claim_pending",
        claimant_name: user.full_name ?? user.email,
        claimant_email: user.email,
        claimant_phone: user.phone ?? null,
        notes: body.notes ? String(body.notes).trim() : null,
      },
    });
    // Mark company as claim pending
    await tx.company.update({
      where: { id: company.id },
      data: { listing_claim_status: "claim_pending" },
    });
    return req;
  });

  sendClaimRequestAdminEmail(
    user.full_name ?? user.email,
    user.email,
    company.name,
    company.slug,
    claimRequest.id,
  ).catch(() => {});

  return NextResponse.json({ success: true, claimRequestId: claimRequest.id });
}
