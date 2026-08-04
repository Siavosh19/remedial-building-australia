import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuthToken, createSessionToken, createDirectorySessionCookie } from "@/lib/directory-auth";
import { sendClaimDecisionEmail } from "@/lib/directory-email";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const token = String(body?.token ?? "").trim();

  if (!token) return NextResponse.json({ error: "Invalid token." }, { status: 400 });

  const payload = verifyAuthToken(token, "email_verification");
  if (!payload) return NextResponse.json({ error: "This link has expired or is invalid." }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) return NextResponse.json({ error: "Account not found." }, { status: 404 });

  if (!user.is_verified) {
    await prisma.user.update({
      where: { id: user.id },
      data: { is_verified: true, email_verified_at: new Date() },
    });
  }

  // Email verification is the approval gate for listing claims: once this
  // user's email is confirmed, auto-approve any pending claim they made — no
  // admin review needed. (Admin review still exists as a fallback for claims
  // whose owner never verifies.) At most one pending claim can exist per
  // listing, so there is no conflict to resolve here.
  const pendingClaims = await prisma.claimRequest.findMany({
    where: { user_id: user.id, status: "claim_pending" },
    include: { company: { select: { id: true, name: true, is_claimed: true } } },
  });
  for (const claim of pendingClaims) {
    // Skip if the listing was already claimed by someone else in the meantime.
    if (claim.company.is_claimed) continue;
    await prisma.$transaction(async (tx) => {
      await tx.claimRequest.update({
        where: { id: claim.id },
        data: {
          status: "claimed",
          reviewed_at: new Date(),
          admin_notes: "Auto-approved on email verification.",
        },
      });
      await tx.company.update({
        where: { id: claim.company.id },
        data: { listing_claim_status: "claimed", is_claimed: true, claimed_at: new Date() },
      });
      // The owner link is created when the claim is submitted; ensure it exists.
      const link = await tx.companyUser.findFirst({
        where: { company_id: claim.company.id, user_id: user.id },
      });
      if (!link) {
        await tx.companyUser.create({
          data: {
            company_id: claim.company.id,
            user_id: user.id,
            role: "owner",
            is_primary: true,
            invited_at: new Date(),
            accepted_at: new Date(),
          },
        });
      }
    });
    sendClaimDecisionEmail(user.full_name ?? user.email, user.email, claim.company.name, true).catch(() => {});
  }

  // Auto-login — set session cookie so they land straight in dashboard
  const sessionToken = createSessionToken(user.id);
  const response = NextResponse.json({ success: true, role: user.role });
  response.cookies.set(createDirectorySessionCookie(sessionToken));
  return response;
}
