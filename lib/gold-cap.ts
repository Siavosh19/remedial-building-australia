import type { LocationState } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// Gold (featured) is capped at 3 businesses per category per State/Territory.
export const GOLD_CAP = 3;

// Count businesses currently holding an active Gold spot for a category + state.
export async function countActiveGold(
  categoryId: number,
  state: LocationState,
  excludeCompanyId?: number,
): Promise<number> {
  return prisma.company.count({
    where: {
      plan_type: "featured",
      main_category_id: categoryId,
      status: "published",
      ...(excludeCompanyId ? { id: { not: excludeCompanyId } } : {}),
      directory_subscription: { is: { subscription_status: { in: ["active", "trialing"] } } },
      locations: { some: { state } },
    },
  });
}

// Remaining Gold spots (0–3) for a category + state, excluding the given company.
export async function goldSlotsLeft(
  categoryId: number,
  state: LocationState,
  excludeCompanyId?: number,
): Promise<number> {
  return Math.max(0, GOLD_CAP - (await countActiveGold(categoryId, state, excludeCompanyId)));
}
