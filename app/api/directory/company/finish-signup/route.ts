import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { sendCompanyStatusEmail } from "@/lib/directory-email";
import { bustDirectoryCache } from "@/lib/directory-cache";

// Settles a signup that picked Silver/Gold but never finished Stripe checkout.
// Those listings are created as `draft` with `pending_plan` set, so they exist
// (nothing the owner typed is lost) but stay out of directory search until the
// plan is resolved. This route is the "publish it as a Free listing instead"
// escape hatch behind the dashboard's Finish-your-listing panel; the "continue
// to checkout" button goes to /api/directory/subscribe as usual.
export async function POST(request: NextRequest) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    include: {
      directory_subscription: true,
      admin_review_queue: { take: 1, orderBy: { id: "desc" } },
      users: { where: { is_primary: true }, take: 1, include: { user: { select: { full_name: true, email: true } } } },
    },
  });
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

  // Already settled (e.g. the webhook landed while this page was open) — nothing
  // to do, and never touch a listing that is actually paying.
  const subStatus = company.directory_subscription?.subscription_status;
  if (subStatus === "active" || subStatus === "trialing") {
    await prisma.company.update({ where: { id: company.id }, data: { pending_plan: null } });
    return NextResponse.json({ ok: true, alreadySubscribed: true });
  }
  if (!company.pending_plan) return NextResponse.json({ ok: true });

  // Only a draft raised by the unfinished signup gets published here. A listing
  // an admin has suspended or pulled back for review must stay where it is.
  const canPublish = company.status === "draft";
  const wasPublished = company.status === "published";

  await prisma.$transaction(async (tx) => {
    await tx.company.update({
      where: { id: company.id },
      data: {
        // Free tier: plan_type stays `basic`, no quote requests, not featured.
        pending_plan: null,
        ...(canPublish
          ? {
              status: "published" as const,
              is_claimed: true,
              listing_claim_status: "claimed" as const,
              claimed_at: company.claimed_at ?? new Date(),
            }
          : {}),
      },
    });
    const queueRow = company.admin_review_queue[0];
    if (canPublish && queueRow) {
      await tx.adminReviewQueue.update({
        where: { id: queueRow.id },
        data: {
          status: "published",
          reviewed_at: new Date(),
          notes: `${queueRow.notes ?? ""} Owner ended an unfinished ${company.pending_plan} signup and published as a Free listing.`.trim(),
        },
      });
    }
  });

  if (canPublish) {
    const owner = company.users[0]?.user;
    sendCompanyStatusEmail(
      owner?.full_name || company.name,
      owner?.email || company.email,
      company.name,
      true,
    ).catch(() => {});
    bustDirectoryCache(); // the listing should surface in search now
  }

  return NextResponse.json({ ok: true, published: canPublish || wasPublished });
}
