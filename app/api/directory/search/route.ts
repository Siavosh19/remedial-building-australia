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

type CompanyRow = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  phone: string | null;
  profile_status: string;
  confidence_score: number;
  is_featured: boolean;
  is_claimed: boolean;
  main_category: { id: number; name: string; slug: string } | null;
  locations: Array<{
    suburb: string | null;
    state: string;
    postcode: string;
    services_nationwide: boolean;
    services_statewide: boolean;
  }>;
  licences: Array<{ status: string }>;
  distance_km?: number | null;
};

function buildWhere(params: {
  q: string;
  category: string;
  stateFilter: string;
  featured: boolean;
  licenceVerified: boolean;
  claimed: boolean;
  radiusMode: "statewide" | "nationwide" | "km";
  locationState: string;
}): Prisma.CompanyWhereInput {
  const { q, category, stateFilter, featured, licenceVerified, claimed, radiusMode, locationState } = params;

  const where: Prisma.CompanyWhereInput = { status: "published" };
  const AND: Prisma.CompanyWhereInput[] = [];

  // ── Keyword search ──────────────────────────────────────────────────
  if (q) {
    AND.push({
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { main_category: { name: { contains: q, mode: "insensitive" } } },
        {
          company_categories: {
            some: {
              is_approved: true,
              category: { name: { contains: q, mode: "insensitive" } },
            },
          },
        },
        {
          company_tags: {
            some: {
              is_approved: true,
              tag: {
                name: { contains: q, mode: "insensitive" },
                tag_type: { in: ["service", "defect", "repair_system"] },
              },
            },
          },
        },
      ],
    });
  }

  // ── Category filter ─────────────────────────────────────────────────
  if (category) {
    AND.push({
      OR: [
        { main_category: { slug: category } },
        { company_categories: { some: { category: { slug: category } } } },
        { main_category: { parent: { slug: category } } },
      ],
    });
  }

  // ── State dropdown filter ───────────────────────────────────────────
  const validDropdownState = VALID_STATES.find((s) => s === stateFilter.toUpperCase());
  if (validDropdownState) {
    AND.push({ locations: { some: { state: validDropdownState } } });
  }

  // ── Statewide radius: filter by geocoded state ──────────────────────
  if (radiusMode === "statewide" && locationState && !validDropdownState) {
    const locState = VALID_STATES.find((s) => s === locationState.toUpperCase());
    if (locState) {
      AND.push({
        OR: [
          { locations: { some: { state: locState } } },
          { locations: { some: { services_nationwide: true } } },
        ],
      });
    }
  }

  // ── Verification badge filters ──────────────────────────────────────
  if (featured) AND.push({ is_featured: true });
  if (claimed) AND.push({ is_claimed: true });
  if (licenceVerified) AND.push({ licences: { some: { status: "verified" } } });

  if (AND.length > 0) where.AND = AND;
  return where;
}

const COMPANY_SELECT = {
  id: true,
  slug: true,
  name: true,
  description: true,
  phone: true,
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
} satisfies Prisma.CompanySelect;

function sortRank(c: {
  is_featured: boolean;
  confidence_score: number;
  is_claimed: boolean;
  profile_status: string;
  distance_km?: number | null;
}) {
  return {
    featured: c.is_featured ? 1 : 0,
    confidence: c.confidence_score,
    distance: c.distance_km ?? Infinity,
    claimed: c.is_claimed ? 1 : 0,
    statusRank: PROFILE_STATUS_RANK[c.profile_status] ?? 0,
  };
}

function compareCompanies(
  a: ReturnType<typeof sortRank>,
  b: ReturnType<typeof sortRank>
): number {
  if (a.featured !== b.featured) return b.featured - a.featured;
  if (a.confidence !== b.confidence) return b.confidence - a.confidence;
  if (a.distance !== b.distance) return a.distance - b.distance;
  if (a.claimed !== b.claimed) return b.claimed - a.claimed;
  return b.statusRank - a.statusRank;
}

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const q = sp.get("q")?.trim() ?? "";
  const lat = parseFloat(sp.get("lat") ?? "");
  const lng = parseFloat(sp.get("lng") ?? "");
  const radiusParam = sp.get("radius") ?? "25";
  const locationState = sp.get("locationState") ?? "";
  const category = sp.get("category")?.trim() ?? "";
  const stateFilter = sp.get("state")?.trim() ?? "";
  const featured = sp.get("featured") === "true";
  const licenceVerified = sp.get("licenceVerified") === "true";
  const claimed = sp.get("claimed") === "true";
  const page = Math.max(1, parseInt(sp.get("page") ?? "1") || 1);
  const offset = (page - 1) * PAGE_SIZE;

  const hasCoords = !isNaN(lat) && !isNaN(lng);
  const radiusKm = ["statewide", "nationwide"].includes(radiusParam)
    ? null
    : parseInt(radiusParam) || 25;
  const radiusMode: "statewide" | "nationwide" | "km" =
    radiusParam === "statewide"
      ? "statewide"
      : radiusParam === "nationwide"
      ? "nationwide"
      : "km";

  const where = buildWhere({ q, category, stateFilter, featured, licenceVerified, claimed, radiusMode, locationState });

  try {
    // ── No location or nationwide: pure Prisma ────────────────────────
    if (!hasCoords || radiusMode === "nationwide") {
      const [total, rows] = await Promise.all([
        prisma.company.count({ where }),
        prisma.company.findMany({
          where,
          select: COMPANY_SELECT,
          orderBy: [
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
      });
    }

    // ── Location + km radius: fetch IDs, Haversine, sort, paginate ────

    // Step 1: Get all matching company IDs + sort fields
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
          select: { services_nationwide: true, services_statewide: true, state: true },
        },
      },
    });

    if (matchingRows.length === 0) {
      return NextResponse.json({ companies: [], total: 0, page, pageSize: PAGE_SIZE, totalPages: 0 });
    }

    const ids = matchingRows.map((r) => r.id);

    // Step 2: Haversine for all matching IDs
    type DistRow = { company_id: number; distance_km: number };

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

    // Normalize numeric cast (Postgres may return string for computed columns)
    const distMap = new Map<number, number>(
      distRows.map((r) => [Number(r.company_id), Number(r.distance_km)])
    );

    // Step 3: Merge distance into matching rows, apply radius filter
    type SortableRow = {
      id: number;
      is_featured: boolean;
      confidence_score: number;
      is_claimed: boolean;
      profile_status: string;
      distance_km: number | null;
    };

    const sortable: SortableRow[] = [];

    for (const row of matchingRows) {
      const loc = row.locations[0];
      const dist = distMap.get(row.id) ?? null;

      if (dist !== null) {
        // Has coordinates — apply radius filter
        if (radiusKm !== null && dist > radiusKm) continue;
        sortable.push({ ...row, distance_km: dist });
      } else {
        // No coordinates — include if services nationwide or statewide + state matches
        if (loc?.services_nationwide) {
          sortable.push({ ...row, distance_km: null });
        } else if (loc?.services_statewide) {
          const locStateCode = VALID_STATES.find((s) => s === loc.state);
          const geocodedState = VALID_STATES.find((s) => s === locationState.toUpperCase());
          if (locStateCode && geocodedState && locStateCode === geocodedState) {
            sortable.push({ ...row, distance_km: null });
          }
        }
        // else: exclude (can't determine proximity)
      }
    }

    // Step 4: Sort by spec ranking
    sortable.sort((a, b) => compareCompanies(sortRank(a), sortRank(b)));

    const total = sortable.length;
    const pageSlice = sortable.slice(offset, offset + PAGE_SIZE);
    const pageIds = pageSlice.map((r) => r.id);

    if (pageIds.length === 0) {
      return NextResponse.json({ companies: [], total, page, pageSize: PAGE_SIZE, totalPages: Math.ceil(total / PAGE_SIZE) });
    }

    // Step 5: Fetch full data for page IDs
    const fullRows = await prisma.company.findMany({
      where: { id: { in: pageIds } },
      select: COMPANY_SELECT,
    });

    // Step 6: Re-order to match sorted order and attach distance
    const distanceByPage = new Map(pageSlice.map((r) => [r.id, r.distance_km]));
    const companies: (CompanyRow & { distance_km: number | null })[] = pageIds.map((id) => {
      const row = fullRows.find((r) => r.id === id)!;
      return { ...row, distance_km: distanceByPage.get(id) ?? null };
    });

    return NextResponse.json({
      companies,
      total,
      page,
      pageSize: PAGE_SIZE,
      totalPages: Math.ceil(total / PAGE_SIZE),
    });
  } catch (err) {
    console.error("Directory search error:", err);
    return NextResponse.json({ companies: [], total: 0, page, pageSize: PAGE_SIZE, totalPages: 0 });
  }
}
