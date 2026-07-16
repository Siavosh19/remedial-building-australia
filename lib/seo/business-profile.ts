import type { Metadata } from "next";

// ─────────────────────────────────────────────────────────────────────────────
// Reusable SEO helper for directory business profiles.
//
// One source of truth for titles, meta descriptions, canonical URLs, Open Graph
// and — critically — the INDEXABILITY gate. Indexing is decided on real content,
// never on subscription tier: a Free profile with genuine content is indexed; an
// empty scraped shell is not, until it's claimed or given a description. This
// protects the domain from thin-content quality signals while still letting every
// good profile rank (including for exact business-name searches).
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_URL = "https://www.remedialbuildingaustralia.com.au";
export const SITE_NAME = "Remedial Building Australia";

export type SeoLocation = {
  suburb?: string | null;
  state?: string | null;
  postcode?: string | null;
  services_nationwide?: boolean | null;
  services_statewide?: boolean | null;
  states_serviced?: string[] | null;
  service_radius_km?: number | null;
};

// The minimal shape the SEO helpers need. Any company query can project into it.
export type SeoCompany = {
  slug: string;
  name: string;
  description?: string | null;
  full_description?: string | null;
  services_offered?: string | null;
  tagline?: string | null;
  website?: string | null;
  phone?: string | null;
  logo_url?: string | null;
  year_established?: number | null;
  licence_number?: string | null;
  insurance_details?: string | null;
  plan_type?: string | null;
  main_category?: { name?: string | null; slug?: string | null } | null;
  locations?: SeoLocation[] | null;
  /** Count of approved service/repair/defect/capability tags. */
  approvedTagCount?: number;
};

// A description shorter than this is treated as effectively empty for indexing.
const REAL_DESC_MIN = 100;

/**
 * Does this profile have real, unique content worth indexing?
 * Keyed on CONTENT, not payment — honours the rule that plan tier affects
 * ranking inside the directory, not whether Google can index the page.
 */
export function hasRealContent(c: SeoCompany): boolean {
  const desc = (c.full_description || c.description || "").trim();
  if (desc.length >= REAL_DESC_MIN) return true;
  if ((c.services_offered || "").trim().length > 0) return true;
  if ((c.approvedTagCount ?? 0) > 0) return true;
  if ((c.licence_number || "").trim().length > 0) return true;
  if ((c.insurance_details || "").trim().length > 0) return true;
  // A claimed / featured owner is actively managing the listing.
  if (c.plan_type === "claimed" || c.plan_type === "featured") return true;
  return false;
}

/** Whether Google should index this profile page. */
export function isIndexable(c: SeoCompany): boolean {
  return hasRealContent(c);
}

export function canonicalUrl(slug: string): string {
  return `${SITE_URL}/directory/company/${slug}`;
}

function primaryLocation(c: SeoCompany): SeoLocation | undefined {
  return c.locations?.[0] ?? undefined;
}

/** "Suburb, STATE" (falls back to whichever part exists). */
export function locationLabel(c: SeoCompany): string {
  const l = primaryLocation(c);
  return [l?.suburb, l?.state].filter(Boolean).join(", ");
}

export function primaryService(c: SeoCompany): string {
  return c.main_category?.name?.trim() || "Remedial Building Services";
}

/** Human service-area phrase, e.g. "clients across Australia". "" when unknown. */
export function serviceAreaText(c: SeoCompany): string {
  const l = primaryLocation(c);
  if (!l) return "";
  if (l.services_nationwide) return "clients across Australia";
  if (l.services_statewide && l.state) return `clients throughout ${l.state}`;
  if (l.states_serviced && l.states_serviced.length > 0) return `clients in ${l.states_serviced.join(", ")}`;
  if (l.service_radius_km && l.suburb) return `the ${l.suburb} area within roughly ${l.service_radius_km} km`;
  if (l.state) return `clients in ${l.state}`;
  return "";
}

function truncate(s: string, max: number): string {
  const clean = s.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1).trimEnd() + "…";
}

/**
 * `[Business Name] – [Primary Service] in [Suburb, State] | Remedial Building Australia`
 */
export function pageTitle(c: SeoCompany): string {
  const loc = locationLabel(c) || primaryLocation(c)?.state || "Australia";
  return `${c.name} – ${primaryService(c)} in ${loc} | ${SITE_NAME}`;
}

/**
 * Prefers the business's own description; otherwise a clean, unique factual line
 * from real fields (name, category, location). Never keyword-stuffed.
 */
export function metaDescription(c: SeoCompany): string {
  const real = (c.full_description || c.description || "").trim();
  if (real.length >= 50) return truncate(real, 158);
  const loc = locationLabel(c);
  const cat = (c.main_category?.name || "building services").toLowerCase();
  const base = `${c.name} — ${cat}${loc ? ` in ${loc}` : ""} on the ${SITE_NAME} directory. View contact details, services and service area.`;
  return truncate(base, 158);
}

/** Full Next.js Metadata object for a profile page, with the indexing gate applied. */
export function buildProfileMetadata(c: SeoCompany): Metadata {
  const url = canonicalUrl(c.slug);
  const title = pageTitle(c);
  const description = metaDescription(c);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: SITE_NAME,
      ...(c.logo_url ? { images: [{ url: c.logo_url }] } : {}),
    },
    // noindex,follow on thin shells: keeps crawl paths open, drops the page from
    // the index until it earns real content. Auto-flips to index once it does.
    robots: isIndexable(c)
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}
