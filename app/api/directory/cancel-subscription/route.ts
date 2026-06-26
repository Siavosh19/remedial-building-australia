import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { stripe } from "@/lib/stripe";
import { sendSubscriptionStatusEmail } from "@/lib/directory-email";
import { tierLabel } from "@/lib/directory-tier";

// Cancel (at period end) or resume a directory subscription. Access continues
// until the end of the paid period; the webhook flips the plan when it actually
// ends. Sends the business a confirmation email either way.
export async function POST(request: NextRequest) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const resume = body?.resume === true;

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    include: {
      directory_subscription: true,
      users: { where: { role: "owner" }, include: { user: { select: { email: true, full_name: true } } } },
    },
  });
  const sub = company?.directory_subscription;
  if (!company || !sub) return NextResponse.json({ error: "No subscription found." }, { status: 400 });

  // Update Stripe (when a real subscription exists). For manual trials there is
  // no Stripe sub — we just flip the local flag.
  if (stripe && sub.stripe_subscription_id) {
    try {
      await stripe.subscriptions.update(sub.stripe_subscription_id, { cancel_at_period_end: !resume });
    } catch (e) {
      return NextResponse.json({ error: "Could not update the subscription with Stripe." }, { status: 502 });
    }
  }

  await prisma.directorySubscription.update({
    where: { company_id: company.id },
    data: { cancel_at_period_end: !resume, cancelled_at: resume ? null : new Date() },
  });

  // Confirmation email to the owner (best-effort — never block the action).
  const owner = company.users[0]?.user;
  if (owner?.email) {
    try {
      await sendSubscriptionStatusEmail({
        ownerName: owner.full_name ?? company.name,
        ownerEmail: owner.email,
        companyName: company.name,
        status: resume ? "resumed" : "cancelled",
        planLabel: tierLabel(company.plan_type),
        accessUntil: sub.current_period_end,
      });
    } catch { /* email optional */ }
  }

  return NextResponse.json({ success: true, cancelAtPeriodEnd: !resume });
}
