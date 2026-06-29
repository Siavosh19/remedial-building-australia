import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { goldSlotsLeft, GOLD_CAP } from "@/lib/gold-cap";
import SubscriptionClient from "./SubscriptionClient";

export const dynamic = "force-dynamic";

export default async function DashboardSubscriptionPage() {
  const user = await getCurrentDirectoryUser();

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user?.id ?? 0 } } },
    include: {
      directory_subscription: true,
      main_category: { select: { name: true } },
      locations: { take: 1, select: { state: true } },
    },
  });

  const sub = company?.directory_subscription ?? null;

  // Gold availability for this company's category + State (max 3 Featured).
  let goldInfo: { slotsLeft: number; cap: number; state: string; category: string } | null = null;
  const goldState = company?.locations[0]?.state ?? null;
  if (company?.main_category_id && goldState) {
    goldInfo = {
      slotsLeft: await goldSlotsLeft(company.main_category_id, goldState, company.id),
      cap: GOLD_CAP,
      state: goldState,
      category: company.main_category?.name ?? "your category",
    };
  }

  // Pricing + trial come from the admin-managed plans table (single source of truth).
  const planRows = await prisma.plan.findMany({ where: { product_line: "directory", is_active: true } });
  const pricing: Record<string, { trial: number; monthly?: { key: string; cents: number }; yearly?: { key: string; cents: number } }> = {};
  for (const p of planRows) {
    const slot = p.billing_interval === "year" ? "yearly" : "monthly";
    pricing[p.tier] ??= { trial: p.trial_days };
    pricing[p.tier].trial = p.trial_days;
    pricing[p.tier][slot] = { key: `${p.tier}-${slot}`, cents: p.amount_cents };
  }

  const data = {
    planType: company?.plan_type ?? "basic",
    subStatus: sub?.subscription_status ?? "none",
    billingCycle: sub?.billing_cycle ?? "free",
    trialEndsAt: sub?.trial_ends_at?.toISOString() ?? null,
    currentPeriodEnd: sub?.current_period_end?.toISOString() ?? null,
    cancelAtPeriodEnd: sub?.cancel_at_period_end ?? false,
    stripeCustomerId: sub?.stripe_customer_id ?? null,
    pricing,
    goldInfo,
  };

  return <SubscriptionClient {...data} />;
}
