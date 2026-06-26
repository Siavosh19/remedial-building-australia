// Visual tier for a directory listing, derived from its plan_type. Drives the
// navy "Business" and gold "Premium" treatments across the card and profile.
//
// Mapping (single source of truth — change here if the tier↔plan mapping moves):
//   free     ← basic, claimed   (plain baseline card)
//   business ← business         (navy / "verified" treatment)
//   premium  ← featured, premium (gold / luxury treatment)
export type DirTier = "free" | "business" | "premium";

export function dirTier(planType?: string | null): DirTier {
  if (planType === "premium" || planType === "featured") return "premium";
  if (planType === "business" || planType === "claimed") return "business";
  return "free";
}

// Display label for a tier (used on cards/badges).
export function tierLabel(planType?: string | null): string {
  const t = dirTier(planType);
  return t === "premium" ? "Premium" : t === "business" ? "Business" : "Basic";
}

// Brief colour tokens.
export const TIER = {
  business: "#1E3A5F",
  businessLight: "#5A7A9A",
  gold: "#C9A84C",
  goldLight: "#F0C040",
  goldDark: "#A67C2B",
  goldBg: "#FFF8E7",
  navyDark: "#0F2540",
  goldText: "#7A5C1E",
} as const;
