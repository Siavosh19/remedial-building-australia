import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import type { LocationState } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 20;

const VALID_STATES: LocationState[] = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

const PROFILE_STATUS_RANK: Record<string, number> = {
  featured: 6,
  claimed: 5,
  practitioner_verified: 4,
  licence_verified: 3,
  business_verified: 2,
  contact_verified: 1,
  basic: 0,
};

// ─── Location scoring ─────────────────────────────────────────────────────────
// Returns 0–500. Higher = closer/better location match.
// Does NOT override keyword/category relevance — those are handled by WHERE clause.

function locationScore(
  distKm: number | null,
  loc: {
    services_nationwide: boolean;
    services_statewide: boolean;
    state: string;
    suburb: string | null;
    postcode: string | null;
    service_radius_km: number | null;
  } | null,
  searchSuburb: string,
  searchPostcode: string,
  searchState: string,
): number {
  if (!loc) return 10;

  // Exact suburb match (works even when business has no coordinates)
  if (searchSuburb && loc.suburb && loc.suburb.toLowerCase() === searchSuburb.toLowerCase()) {
    return 500;
  }

  // Exact postcode match (works even when business has no coordinates)
  if (searchPostcode && loc.postcode && loc.postcode === searchPostcode) {
    return 450;
  }

  const radius = loc.service_radius_km ?? 50;

  if (distKm !== null) {
    if (distKm <= 5)  return 450;
    if (distKm <= 10) return 400;
    if (distKm <= 25) return 350;
    if (distKm <= 50) return 300;
    if (distKm <= radius) return 250;
    if (distKm <= 150) {
      return loc.state === searchState ? 200 : 130;
    }
    if (loc.services_statewide && loc.state === searchState) return 150;
    if (loc.state === searchState) return 100;
    if (loc.services_nationwide) return 60;
    return 20;
  }

  // No lat/lng — fall back to service coverage flags.
  // Scores are large enough that same-state always beats trustBoost from featured interstate business.
  if (loc.state === searchState) return 300;
  if (loc.services_statewide && loc.state === searchState) return 300;
  if (loc.services_nationwide) return 250;
  return 5;
}

function trustBoost(row: {
  is_featured: boolean;
  confidence_score: number;
  is_claimed: boolean;
  profile_status: string;
}): number {
  return (
    (row.is_featured ? 30 : 0) +
    row.confidence_score * 0.2 +
    (row.is_claimed ? 10 : 0) +
    (PROFILE_STATUS_RANK[row.profile_status] ?? 0) * 3
  );
}

// ─── Synonym expansion ────────────────────────────────────────────────────────

const STOPWORDS = new Set([
  "service", "services", "management", "australia",
  "australian", "company", "companies", "group", "pty", "ltd", "the", "and",
  "for", "with", "our", "all", "new", "south", "wales", "victoria", "queensland",
]);

const SYNONYM_GROUPS: string[][] = [
  ["consultant", "consultants", "consulting", "advisory", "adviser", "advisor", "surveyor", "surveying"],
  ["inspector", "inspection", "inspections", "assessment", "assessor"],
  ["cleaner", "cleaners", "cleaning", "washing", "hygiene"],
  ["waterproof", "waterproofing", "membrane", "membranes", "tanking"],
  ["seal", "sealing", "sealant", "sealants", "caulk", "caulking"],
  ["concrete", "concreting", "spalling", "carbonation"],
  ["remedial", "remediation", "restoration"],
  ["repair", "repairs"],
  ["engineer", "engineers", "engineering"],
  ["painter", "painters", "painting", "coating", "coatings", "recoating"],
  ["balcony", "balconies"],
  ["roof", "roofing", "roofer", "roofers"],
  ["plumber", "plumbers", "plumbing", "drainage", "drain"],
  ["facade", "cladding"],
  ["strata"],
  ["defect", "defects", "defective"],
  ["fire safety", "fire protection"],
  ["electrical", "electrician", "electricians"],
  ["scaffold", "scaffolding"],
  ["render", "rendering", "renderer", "renderers"],
  ["tiling", "tiles", "tile", "tiler", "tilers"],
  ["timber", "carpentry", "carpenter"],
  ["structural", "structure"],
  ["builder", "builders", "building", "buildings", "build"],
  ["contractor", "contractors"],
  ["specialist", "specialists"],
  ["certifier", "certifiers", "certification"],
];

function expandQuery(q: string): string[] {
  const qLower = q.toLowerCase().trim();
  const terms = new Set<string>([qLower]);

  const words = qLower.split(/\s+/).filter((w) => w.length >= 3 && !STOPWORDS.has(w));
  for (const word of words) {
    terms.add(word);
    for (const group of SYNONYM_GROUPS) {
      // Only expand when there is an exact match or the synonym starts with the search word
      // (prefix match). Avoid substring matches like "builder" → "render" via word.includes(syn).
      if (group.some((syn) => syn === word || syn.startsWith(word) || word.startsWith(syn))) {
        group.forEach((syn) => terms.add(syn));
      }
    }
  }

  return Array.from(terms);
}

// ─── WHERE builder ─────────────────────────────────────────────────────────────

function buildWhere(params: {
  q: string;
  category: string;
  stateFilter: string;
  suburb: string;
  postcode: string;
  featured: boolean;
  licenceVerified: boolean;
  claimed: boolean;
  hasCoords: boolean;
  searchState: string;
}): Prisma.CompanyWhereInput {
  const { q, category, stateFilter, suburb, postcode, featured, licenceVerified, claimed, hasCoords, searchState } = params;

  const where: Prisma.CompanyWhereInput = { status: "published" };
  const AND: Prisma.CompanyWhereInput[] = [];

  // ── Keyword search — with synonym expansion ─────────────────────────────────
  if (q) {
    const terms = expandQuery(q);
    AND.push({
      OR: terms.flatMap((term) => [
        { name: { contains: term, mode: "insensitive" } },
        { description: { contains: term, mode: "insensitive" } },
        { main_category: { name: { contains: term, mode: "insensitive" } } },
        {
          company_categories: {
            some: {
              is_approved: true,
              category: { name: { contains: term, mode: "insensitive" } },
            },
          },
        },
        {
          company_tags: {
            some: {
              is_approved: true,
              tag: {
                name: { contains: term, mode: "insensitive" },
                tag_type: { in: ["service", "defect", "repair_system"] },
              },
            },
          },
        },
      ]),
    });
  }

  // ── Category filter ─────────────────────────────────────────────────────────
  if (category) {
    AND.push({
      OR: [
        { main_category: { slug: category } },
        { company_categories: { some: { category: { slug: category } } } },
        { main_category: { parent: { slug: category } } },
      ],
    });
  }

  // ── Location filters — only when NOT using coordinate-based ranking ─────────
  // When hasCoords=true, location sorting is done by scoring, not hard WHERE filters.
  // State-only searches still use a hard filter.
  if (!hasCoords) {
    const validDropdownState = VALID_STATES.find((s) => s === stateFilter.toUpperCase());
    if (suburb && validDropdownState) {
      AND.push({
        locations: {
          some: {
            suburb: { contains: suburb, mode: "insensitive" },
            state: validDropdownState,
          },
        },
      });
    } else if (suburb) {
      AND.push({ locations: { some: { suburb: { contains: suburb, mode: "insensitive" } } } });
    } else if (validDropdownState) {
      AND.push({ locations: { some: { state: validDropdownState } } });
    }
    if (postcode) {
      AND.push({ locations: { some: { postcode } } });
    }
  } else {
    // When coords are present, hard-filter by state so interstate businesses never appear
    // in a location search result — scoring alone can't overcome the trustBoost gap when
    // almost no businesses have lat/lng. Allow nationwide and statewide service exceptions.
    if (searchState) {
      const upperState = searchState.toUpperCase();
      const validSearchState = VALID_STATES.find((s) => s === upperState);
      if (validSearchState) {
        AND.push({
          OR: [
            { locations: { some: { state: validSearchState } } },
            { locations: { some: { services_nationwide: true } } },
            { locations: { some: { services_statewide: true, state: validSearchState } } },
          ],
        });
      }
    }
  }

  // ── Verification filters ────────────────────────────────────────────────────
  if (featured) AND.push({ is_featured: true });
  if (claimed) AND.push({ is_claimed: true });
  if (licenceVerified) AND.push({ licences: { some: { status: "verified" } } });

  if (AND.length > 0) where.AND = AND;
  return where;
}

// ─── SELECT shape ──────────────────────────────────────────────────────────────

const COMPANY_SELECT = {
  id: true,
  slug: true,
  name: true,
  description: true,
  phone: true,
  plan_type: true,
  profile_status: true,
  confidence_score: true,
  is_featured: true,
  is_claimed: true,
  main_category: { select: { id: true, name: true, slug: true } },
  locations: {
    take: 1,
    select: {
      suburb: true,
      state: true,
      postcode: true,
      services_nationwide: true,
      services_statewide: true,
    },
  },
  licences: {
    where: { status: "verified" },
    take: 1,
    select: { status: true },
  },
  company_tags: {
    where: { is_approved: true },
    take: 5,
    select: { tag: { select: { name: true, tag_type: true } } },
  },
} satisfies Prisma.CompanySelect;

// ─── Handler ───────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const q           = sp.get("q")?.trim() ?? "";
  const lat         = parseFloat(sp.get("lat") ?? "");
  const lng         = parseFloat(sp.get("lng") ?? "");
  const locationState = sp.get("locationState")?.trim() ?? "";
  const category    = sp.get("category")?.trim() ?? "";
  const stateFilter = sp.get("state")?.trim() ?? "";
  const suburb      = sp.get("suburb")?.trim() ?? "";
  const postcode    = sp.get("postcode")?.trim() ?? "";
  const featured    = sp.get("featured") === "true";
  const licenceVerified = sp.get("licenceVerified") === "true";
  const claimed     = sp.get("claimed") === "true";
  const page        = Math.max(1, parseInt(sp.get("page") ?? "1") || 1);
  const offset      = (page - 1) * PAGE_SIZE;

  const hasCoords = !isNaN(lat) && !isNaN(lng);

  // Determine search state for scoring (prefer explicit locationState over stateFilter)
  const searchState = locationState || stateFilter;

  const where = buildWhere({
    q, category, stateFilter, suburb, postcode,
    featured, licenceVerified, claimed,
    hasCoords, searchState,
  });

  try {
    // ── No location coords ────────────────────────────────────────────────────
    if (!hasCoords) {
      // With a keyword: fetch all matches, re-rank by relevance, then paginate.
      // This ensures name/category matches always outrank description-only matches.
      if (q) {
        const terms = expandQuery(q);

        const candidates = await prisma.company.findMany({
          where,
          select: {
            id: true,
            name: true,
            description: true,
            is_featured: true,
            confidence_score: true,
            is_claimed: true,
            profile_status: true,
            main_category: { select: { name: true } },
          },
        });

        if (candidates.length === 0) {
          return NextResponse.json({ companies: [], total: 0, page, pageSize: PAGE_SIZE, totalPages: 0, isLocalFallback: false });
        }

        const scored = candidates.map((row) => {
          let relevance = 0;
          for (const term of terms) {
            const t = term.toLowerCase();
            if (row.name.toLowerCase().includes(t)) relevance += 100;
            if ((row.main_category?.name ?? "").toLowerCase().includes(t)) relevance += 50;
            if ((row.description ?? "").toLowerCase().includes(t)) relevance += 10;
          }
          return { id: row.id, score: relevance * 10 + trustBoost(row) };
        });

        scored.sort((a, b) => b.score - a.score);

        const total = scored.length;
        const pageIds = scored.slice(offset, offset + PAGE_SIZE).map((r) => r.id);

        if (pageIds.length === 0) {
          return NextResponse.json({ companies: [], total, page, pageSize: PAGE_SIZE, totalPages: Math.ceil(total / PAGE_SIZE), isLocalFallback: false });
        }

        const fullRows = await prisma.company.findMany({
          where: { id: { in: pageIds } },
          select: COMPANY_SELECT,
        });

        const companies = pageIds.map((id) => fullRows.find((r) => r.id === id)!).filter(Boolean);

        return NextResponse.json({
          companies,
          total,
          page,
          pageSize: PAGE_SIZE,
          totalPages: Math.ceil(total / PAGE_SIZE),
          isLocalFallback: false,
        });
      }

      // No keyword: simple sort (category/featured filter only)
      const [total, rows] = await Promise.all([
        prisma.company.count({ where }),
        prisma.company.findMany({
          where,
          select: COMPANY_SELECT,
          orderBy: [
            { plan_type: "desc" },
            { is_featured: "desc" },
            { confidence_score: "desc" },
            { is_claimed: "desc" },
          ],
          take: PAGE_SIZE,
          skip: offset,
        }),
      ]);

      return NextResponse.json({
        companies: rows,
        total,
        page,
        pageSize: PAGE_SIZE,
        totalPages: Math.ceil(total / PAGE_SIZE),
        isLocalFallback: false,
      });
    }

    // ── Coordinate-based distance + scoring path ──────────────────────────────

    // Step 1: All keyword/category-matching companies (no location hard filter)
    const matchingRows = await prisma.company.findMany({
      where,
      select: {
        id: true,
        is_featured: true,
        confidence_score: true,
        is_claimed: true,
        profile_status: true,
        locations: {
          take: 1,
          select: {
            suburb: true,
            postcode: true,
            state: true,
            services_nationwide: true,
            services_statewide: true,
            service_radius_km: true,
          },
        },
      },
    });

    if (matchingRows.length === 0) {
      return NextResponse.json({
        companies: [],
        total: 0,
        page,
        pageSize: PAGE_SIZE,
        totalPages: 0,
        isLocalFallback: false,
      });
    }

    // Step 2: Haversine distances for companies that have coordinates
    type DistRow = { company_id: number; distance_km: number };
    const ids = matchingRows.map((r) => r.id);

    const distRows = await prisma.$queryRaw<DistRow[]>(
      Prisma.sql`
        SELECT l.company_id,
          MIN(6371.0 * acos(LEAST(1.0,
            cos(radians(${lat})) * cos(radians(l.latitude)) *
            cos(radians(l.longitude) - radians(${lng})) +
            sin(radians(${lat})) * sin(radians(l.latitude))
          ))) AS distance_km
        FROM locations l
        WHERE l.company_id IN (${Prisma.join(ids)})
          AND l.latitude IS NOT NULL
          AND l.longitude IS NOT NULL
        GROUP BY l.company_id
      `
    );

    const distMap = new Map<number, number>(
      distRows.map((r) => [Number(r.company_id), Number(r.distance_km)])
    );

    // Step 3: Score every company — no hard radius cutoff
    type ScoredRow = {
      id: number;
      is_featured: boolean;
      confidence_score: number;
      is_claimed: boolean;
      profile_status: string;
      distance_km: number | null;
      locScore: number;
      totalScore: number;
    };

    const scored: ScoredRow[] = matchingRows.map((row) => {
      const loc = row.locations[0] ?? null;
      const distKm = distMap.get(row.id) ?? null;
      const locScoreVal = locationScore(distKm, loc ? { ...loc, suburb: loc.suburb ?? null, postcode: loc.postcode ?? null } : null, suburb, postcode, searchState);
      const total = locScoreVal + trustBoost(row);
      return { ...row, distance_km: distKm, locScore: locScoreVal, totalScore: total };
    });

    // Step 4: Sort by totalScore descending
    scored.sort((a, b) => b.totalScore - a.totalScore);

    // Determine if top results are all "fallback" (no local businesses found)
    const topLocScore = scored[0]?.locScore ?? 0;
    const isLocalFallback = suburb !== "" && topLocScore < 200;

    const totalCount = scored.length;
    const pageSlice = scored.slice(offset, offset + PAGE_SIZE);
    const pageIds = pageSlice.map((r) => r.id);

    if (pageIds.length === 0) {
      return NextResponse.json({
        companies: [],
        total: totalCount,
        page,
        pageSize: PAGE_SIZE,
        totalPages: Math.ceil(totalCount / PAGE_SIZE),
        isLocalFallback,
      });
    }

    // Step 5: Fetch full data for page IDs
    const fullRows = await prisma.company.findMany({
      where: { id: { in: pageIds } },
      select: COMPANY_SELECT,
    });

    // Step 6: Re-order + attach distance
    const distByPage = new Map(pageSlice.map((r) => [r.id, r.distance_km]));
    const companies = pageIds.map((id) => {
      const row = fullRows.find((r) => r.id === id)!;
      return { ...row, distance_km: distByPage.get(id) ?? null };
    });

    return NextResponse.json({
      companies,
      total: totalCount,
      page,
      pageSize: PAGE_SIZE,
      totalPages: Math.ceil(totalCount / PAGE_SIZE),
      isLocalFallback,
    });
  } catch (err) {
    console.error("Directory search error:", err);
    return NextResponse.json({
      companies: [],
      total: 0,
      page,
      pageSize: PAGE_SIZE,
      totalPages: 0,
      isLocalFallback: false,
    });
  }
}
