// Visual tier for a directory listing, derived from its plan_type. Drives the
// silver and gold treatments across the card and profile.
//
// Mapping (single source of truth — change here if the tier↔plan mapping moves):
//   free   ← basic              (unclaimed baseline listing)
//   silver ← claimed, business, silver
//            "claimed" IS the Silver tier: claiming a listing starts a Silver
//            trial (plan_type "claimed" + a trialing subscription), and the rest
//            of the app already treats claimed as Silver (labels, quote requests,
//            the PAID list). So the card must render Silver too.
//   gold   ← featured, premium  (gold / featured treatment, max 3 per cat/state)
export type DirTier = "free" | "silver" | "gold";

export function dirTier(planType?: string | null): DirTier {
  if (planType === "premium" || planType === "featured") return "gold";
  if (planType === "business" || planType === "silver" || planType === "claimed") return "silver";
  return "free";
}

// ── Card content caps (single source of truth) ──────────────────────────────
// Shared by the signup form (enforced at input) AND the listing cards (enforced
// at render), so a listing that was captured within the caps never gets clipped
// on its card. Character counts INCLUDE spaces.
export const NAME_MAX_FREE = 38;    // Free listings: short business name only
export const NAME_MAX_PAID = 58;    // Silver / Gold: full name (may include a tagline)
export const DESC_MAX_WORDS = 21;   // Silver / Gold on-card description word cap

// Cards, badges and headings show only the core business name. Many listings
// store an appended tagline / credential after a pipe — e.g.
//   "Remedial Building Practitioners | Registered Class 2 Builder"
// — which we strip to the part before the first pipe so the name fits one line.
// This is a display-layer rule only; the stored value is left untouched and the
// full text can still be used on the business's own profile page.
export function displayName(name: string): string {
  const core = name.split("|")[0].trim();
  return core || name.trim();
}

// Free-tier card name: the SHORT business name only. Scraped listings often carry
// an SEO tail after a separator — "Singh Roofing - Experts in Roof Restoration &
// Painting in Melbourne" — so we drop everything after the first " | ", " - ",
// " – ", " — " or " : " (only when the head is a real name ≥ 4 chars, so names
// like "A - Z Plumbing" survive), then hard-clamp to NAME_MAX_FREE characters.
export function freeCardName(name: string, maxChars = NAME_MAX_FREE): string {
  let core = name.split("|")[0].trim();
  const m = core.match(/^(.{4,}?)\s+[-–—:]\s+/);
  if (m) core = m[1].trim();
  if (!core) core = name.trim();
  if (core.length <= maxChars) return core;
  const cut = core.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > Math.floor(maxChars / 2) ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

// Paid tiers (Silver/Gold) display the full business name INCLUDING any tagline,
// but clamped to a sensible length so a long tagline can't make the card messy.
// Cuts on a word boundary where possible and appends an ellipsis. Free tier does
// not use this — it uses freeCardName().
export function clampName(name: string, maxChars = NAME_MAX_PAID): string {
  const n = name.trim();
  if (n.length <= maxChars) return n;
  const cut = n.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 30 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}

// On-card description summary for the paid tiers (Gold & Silver). Capped to
// DESC_MAX_WORDS words to match the card; the full, uncapped description still
// renders on the profile page. Free tier shows none.
export function cardSummary(text: string | null | undefined, maxWords = DESC_MAX_WORDS): string | null {
  const trimmed = text?.trim();
  if (!trimmed) return null;
  const words = trimmed.split(/\s+/);
  return words.length <= maxWords ? trimmed : words.slice(0, maxWords).join(" ") + "…";
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
