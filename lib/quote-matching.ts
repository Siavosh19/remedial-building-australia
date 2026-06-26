import type { LocationState } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { lookupSuburb, postcodeToState, STATE_CODES } from "@/lib/au-locations";
import { resolveAuLocation } from "@/lib/au-suburbs";

// ── Matching engine for the client quote-request platform ────────────────────
// Given a submitted request, find paid (Premium / Premium Plus) listings whose
// category + service area match, ranked Premium Plus first, then by proximity,
// then by how long they've subscribed. Reads from the directory only — it never
// mutates it.

const asState = (s: string | undefined | null): LocationState | undefined =>
  s && (STATE_CODES as readonly string[]).includes(s.toUpperCase())
    ? (s.toUpperCase() as LocationState)
    : undefined;

// Great-circle distance in km (mirrors the directory search ranking).
function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const la1 = (aLat * Math.PI) / 180;
  const la2 = (bLat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

export type ResolvedCoords = { lat?: number; lng?: number; state?: LocationState };

// Resolve a request's suburb/postcode to representative coordinates + state, so
// proximity ranking works even when no business is listed in that exact suburb.
export async function resolveRequestCoords(loc: {
  suburb?: string | null;
  postcode?: string | null;
  state?: LocationState | null;
}): Promise<ResolvedCoords> {
  const postcode = (loc.postcode ?? "").trim();
  const suburb = (loc.suburb ?? "").trim();

  // 1. Postcode → representative coords from our geocoded directory data.
  if (/^\d{4}$/.test(postcode)) {
    const row = await prisma.location.findFirst({
      where: { postcode, latitude: { not: null }, longitude: { not: null } },
      select: { latitude: true, longitude: true, state: true },
    });
    if (row?.latitude != null && row?.longitude != null) {
      return { lat: Number(row.latitude), lng: Number(row.longitude), state: row.state };
    }
    const stateOnly = asState(postcodeToState(postcode));
    if (!suburb) return { state: stateOnly ?? asState(loc.state) };
  }

  // 2. Suburb → curated centre, then full AU place list, then directory data.
  if (suburb) {
    const hc = lookupSuburb(suburb);
    if (hc) return { lat: hc.lat, lng: hc.lng, state: asState(hc.stateCode) };

    const au = resolveAuLocation(suburb, loc.state ?? undefined);
    if (au && au.lat != null && au.lng != null) {
      return { lat: au.lat, lng: au.lng, state: asState(au.state) };
    }

    const geo = await prisma.location.findFirst({
      where: { suburb: { equals: suburb, mode: "insensitive" }, latitude: { not: null }, longitude: { not: null } },
      select: { latitude: true, longitude: true, state: true },
    });
    if (geo?.latitude != null && geo?.longitude != null) {
      return { lat: Number(geo.latitude), lng: Number(geo.longitude), state: geo.state };
    }
  }

  return { state: asState(loc.state) };
}

type CandidateLocation = {
  suburb: string | null;
  postcode: string;
  state: LocationState;
  latitude: number | null;
  longitude: number | null;
  service_radius_km: number | null;
  services_statewide: boolean;
  services_nationwide: boolean;
};

type RequestGeo = {
  suburb: string;
  postcode: string;
  state: LocationState | null;
  latitude: number | null;
  longitude: number | null;
};

// Proximity tier for one business location relative to the request (lower =
// closer / better). Returns null when the location is not a plausible match.
function locationTier(loc: CandidateLocation, req: RequestGeo, reqSuburb: string): number | null {
  const exactSuburb = Boolean(reqSuburb && loc.suburb && loc.suburb.toLowerCase() === reqSuburb);
  const samePostcode = Boolean(req.postcode && loc.postcode && loc.postcode === req.postcode);
  if (exactSuburb || samePostcode) return 0;

  let km: number | null = null;
  if (loc.latitude != null && loc.longitude != null && req.latitude != null && req.longitude != null) {
    km = haversineKm(req.latitude, req.longitude, loc.latitude, loc.longitude);
  }

  // Explicit service radius wins.
  if (km != null && loc.service_radius_km != null && km <= loc.service_radius_km) {
    return km <= 5 ? 0 : km <= 15 ? 1 : km <= 50 ? 2 : 3;
  }

  const sameState = Boolean(req.state && loc.state && loc.state === req.state);
  if (loc.services_nationwide) return 3;
  if (loc.services_statewide && sameState) return 3;

  // General proximity fallback (no explicit radius set).
  if (km != null) {
    if (km <= 5) return 0;
    if (km <= 15) return 1;
    if (km <= 50) return 2;
    if (km <= 150) return 3;
    return null; // too far to be a sensible local match
  }

  // No coordinates available, but same state — weak match, ranked last.
  if (sameState) return 4;
  return null;
}

export type MatchResult = { company_id: number; rank_tier: number };

// Find and rank matching paid businesses for a request. rank_tier encodes the
// full sort priority (lower = appears higher): planRank*100 + proximityTier,
// where Premium Plus (featured) = 0 and Premium (claimed) = 1.
export async function matchBusinessesForRequest(req: {
  work_category_id: number;
  work_subcategory_id: number | null;
  suburb: string;
  postcode: string;
  state: LocationState | null;
  latitude: number | null;
  longitude: number | null;
}): Promise<MatchResult[]> {
  const categoryIds = [req.work_category_id, ...(req.work_subcategory_id ? [req.work_subcategory_id] : [])];

  const candidates = await prisma.company.findMany({
    where: {
      status: "published",
      suspended: false,
      quote_requests_enabled: true,
      plan_type: { in: ["claimed", "featured"] },
      directory_subscription: { is: { subscription_status: { in: ["active", "trialing"] } } },
      OR: [
        { main_category_id: { in: categoryIds } },
        { company_categories: { some: { category_id: { in: categoryIds } } } },
      ],
    },
    select: {
      id: true,
      plan_type: true,
      locations: {
        select: {
          suburb: true,
          postcode: true,
          state: true,
          latitude: true,
          longitude: true,
          service_radius_km: true,
          services_statewide: true,
          services_nationwide: true,
        },
      },
      directory_subscription: { select: { created_at: true } },
    },
  });

  const reqSuburb = req.suburb.trim().toLowerCase();
  const matched: { company_id: number; rank_tier: number; subAge: number }[] = [];

  for (const c of candidates) {
    let bestTier: number | null = null;
    for (const loc of c.locations) {
      const tier = locationTier(loc as CandidateLocation, req, reqSuburb);
      if (tier != null && (bestTier == null || tier < bestTier)) bestTier = tier;
    }
    if (bestTier == null) continue;

    const planRank = c.plan_type === "featured" ? 0 : 1; // Premium Plus first
    matched.push({
      company_id: c.id,
      rank_tier: planRank * 100 + bestTier,
      subAge: c.directory_subscription?.created_at?.getTime() ?? Number.MAX_SAFE_INTEGER,
    });
  }

  matched.sort((a, b) => a.rank_tier - b.rank_tier || a.subAge - b.subAge || a.company_id - b.company_id);
  return matched.map((m) => ({ company_id: m.company_id, rank_tier: m.rank_tier }));
}
