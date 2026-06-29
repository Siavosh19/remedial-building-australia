// Visual tier for a directory listing, derived from its plan_type. Drives the
// silver and gold treatments across the card and profile.
//
// Mapping (single source of truth — change here if the tier↔plan mapping moves):
//   free   ← basic            (plain baseline card)
//   silver ← claimed, business (silver treatment, receives quotes)
//   gold   ← featured, premium (gold / featured treatment, max 3 per cat/state)
export type DirTier = "free" | "silver" | "gold";

export function dirTier(planType?: string | null): DirTier {
  if (planType === "premium" || planType === "featured") return "gold";
  if (planType === "business" || planType === "claimed") return "silver";
  return "free";
}

// Display label for a tier (used on cards/badges).
export function tierLabel(planType?: string | null): string {
  const t = dirTier(planType);
  return t === "gold" ? "Gold" : t === "silver" ? "Silver" : "Free Listing";
}

// Brief colour tokens. `business*` aliases retained for back-compat so existing
// references keep resolving; they now point at the silver palette.
export const TIER = {
  silver: "#64748B",
  silverLight: "#94A3B8",
  silverBg: "#F1F5F9",
  silverText: "#334155",
  business: "#64748B",
  businessLight: "#94A3B8",
  gold: "#C9A84C",
  goldLight: "#F0C040",
  goldDark: "#A67C2B",
  goldBg: "#FFF8E7",
  navyDark: "#0F2540",
  goldText: "#7A5C1E",
} as const;
