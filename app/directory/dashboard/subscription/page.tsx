import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import SubscriptionClient from "./SubscriptionClient";

export const dynamic = "force-dynamic";

export default async function DashboardSubscriptionPage() {
  const user = await getCurrentDirectoryUser();

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user?.id ?? 0 } } },
    include: { directory_subscription: true },
  });

  const sub = company?.directory_subscription ?? null;

  const data = {
    planType: company?.plan_type ?? "basic",
    subStatus: sub?.subscription_status ?? "none",
    billingCycle: sub?.billing_cycle ?? "free",
    trialEndsAt: sub?.trial_ends_at?.toISOString() ?? null,
    currentPeriodEnd: sub?.current_period_end?.toISOString() ?? null,
    cancelAtPeriodEnd: sub?.cancel_at_period_end ?? false,
    stripeCustomerId: sub?.stripe_customer_id ?? null,
  };

  return <SubscriptionClient {...data} />;
}
