import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const STATE_NAMES: Record<string, string> = {
  NSW: "New South Wales",
  VIC: "Victoria",
  QLD: "Queensland",
  WA: "Western Australia",
  SA: "South Australia",
  TAS: "Tasmania",
  ACT: "Australian Capital Territory",
  NT: "Northern Territory",
};

export type LocationSuggestion = {
  type: "state" | "suburb" | "postcode";
  label: string;
  stateCode: string;
  suburb?: string;
  postcode?: string;
  lat?: number;
  lng?: number;
};

// Hardcoded coordinates for major cities and well-known suburbs.
// These take priority over DB business-location coordinates to guarantee accuracy.
const SUBURB_COORDS: { name: string; stateCode: string; lat: number; lng: number }[] = [
  // Capital cities
  { name: "Sydney",           stateCode: "NSW", lat: -33.8688, lng: 151.2093 },
  { name: "Melbourne",        stateCode: "VIC", lat: -37.8136, lng: 144.9631 },
  { name: "Brisbane",         stateCode: "QLD", lat: -27.4698, lng: 153.0251 },
  { name: "Perth",            stateCode: "WA",  lat: -31.9505, lng: 115.8605 },
  { name: "Adelaide",         stateCode: "SA",  lat: -34.9285, lng: 138.6007 },
  { name: "Canberra",         stateCode: "ACT", lat: -35.2809, lng: 149.1300 },
  { name: "Darwin",           stateCode: "NT",  lat: -12.4634, lng: 130.8456 },
  { name: "Hobart",           stateCode: "TAS", lat: -42.8821, lng: 147.3272 },
  // Major regional centres
  { name: "Gold Coast",       stateCode: "QLD", lat: -28.0167, lng: 153.4000 },
  { name: "Newcastle",        stateCode: "NSW", lat: -32.9283, lng: 151.7817 },
  { name: "Wollongong",       stateCode: "NSW", lat: -34.4278, lng: 150.8931 },
  { name: "Sunshine Coast",   stateCode: "QLD", lat: -26.6500, lng: 153.0667 },
  { name: "Geelong",          stateCode: "VIC", lat: -38.1499, lng: 144.3617 },
  { name: "Townsville",       stateCode: "QLD", lat: -19.2590, lng: 146.8169 },
  { name: "Cairns",           stateCode: "QLD", lat: -16.9186, lng: 145.7781 },
  { name: "Toowoomba",        stateCode: "QLD", lat: -27.5598, lng: 151.9507 },
  { name: "Ballarat",         stateCode: "VIC", lat: -37.5622, lng: 143.8503 },
  { name: "Bendigo",          stateCode: "VIC", lat: -36.7570, lng: 144.2794 },
  // Sydney suburbs
  { name: "Bondi",            stateCode: "NSW", lat: -33.8919, lng: 151.2760 },
  { name: "Bondi Beach",      stateCode: "NSW", lat: -33.8915, lng: 151.2767 },
  { name: "Bondi Junction",   stateCode: "NSW", lat: -33.8916, lng: 151.2507 },
  { name: "Bronte",           stateCode: "NSW", lat: -33.9029, lng: 151.2676 },
  { name: "Coogee",           stateCode: "NSW", lat: -33.9218, lng: 151.2571 },
  { name: "Maroubra",         stateCode: "NSW", lat: -33.9497, lng: 151.2506 },
  { name: "Randwick",         stateCode: "NSW", lat: -33.9150, lng: 151.2403 },
  { name: "Darlinghurst",     stateCode: "NSW", lat: -33.8777, lng: 151.2194 },
  { name: "Paddington",       stateCode: "NSW", lat: -33.8841, lng: 151.2270 },
  { name: "Surry Hills",      stateCode: "NSW", lat: -33.8872, lng: 151.2106 },
  { name: "Newtown",          stateCode: "NSW", lat: -33.8973, lng: 151.1780 },
  { name: "Glebe",            stateCode: "NSW", lat: -33.8793, lng: 151.1870 },
  { name: "Pyrmont",          stateCode: "NSW", lat: -33.8699, lng: 151.1926 },
  { name: "North Sydney",     stateCode: "NSW", lat: -33.8399, lng: 151.2073 },
  { name: "Chatswood",        stateCode: "NSW", lat: -33.7969, lng: 151.1807 },
  { name: "Manly",            stateCode: "NSW", lat: -33.7969, lng: 151.2877 },
  { name: "Parramatta",       stateCode: "NSW", lat: -33.8148, lng: 151.0019 },
  { name: "Blacktown",        stateCode: "NSW", lat: -33.7700, lng: 150.9060 },
  { name: "Penrith",          stateCode: "NSW", lat: -33.7509, lng: 150.6942 },
  { name: "Liverpool",        stateCode: "NSW", lat: -33.9213, lng: 150.9235 },
  { name: "Bankstown",        stateCode: "NSW", lat: -33.9173, lng: 151.0344 },
  { name: "Hornsby",          stateCode: "NSW", lat: -33.7027, lng: 151.0989 },
  { name: "Ryde",             stateCode: "NSW", lat: -33.8200, lng: 151.1039 },
  { name: "Castle Hill",      stateCode: "NSW", lat: -33.7295, lng: 151.0024 },
  { name: "Cronulla",         stateCode: "NSW", lat: -34.0573, lng: 151.1516 },
  { name: "Hurstville",       stateCode: "NSW", lat: -33.9677, lng: 151.1022 },
  { name: "Kogarah",          stateCode: "NSW", lat: -33.9634, lng: 151.1330 },
  { name: "Sutherland",       stateCode: "NSW", lat: -34.0318, lng: 151.0575 },
  { name: "Leichhardt",       stateCode: "NSW", lat: -33.8852, lng: 151.1557 },
  // Melbourne suburbs
  { name: "St Kilda",         stateCode: "VIC", lat: -37.8618, lng: 144.9777 },
  { name: "Fitzroy",          stateCode: "VIC", lat: -37.8000, lng: 144.9783 },
  { name: "Richmond",         stateCode: "VIC", lat: -37.8228, lng: 145.0030 },
  { name: "South Yarra",      stateCode: "VIC", lat: -37.8411, lng: 145.0019 },
  { name: "Toorak",           stateCode: "VIC", lat: -37.8458, lng: 145.0164 },
  { name: "Brighton",         stateCode: "VIC", lat: -37.9044, lng: 145.0008 },
  { name: "Frankston",        stateCode: "VIC", lat: -38.1440, lng: 145.1249 },
  { name: "Dandenong",        stateCode: "VIC", lat: -37.9883, lng: 145.2141 },
  { name: "Box Hill",         stateCode: "VIC", lat: -37.8201, lng: 145.1227 },
  { name: "Ringwood",         stateCode: "VIC", lat: -37.8167, lng: 145.2273 },
  { name: "Footscray",        stateCode: "VIC", lat: -37.8018, lng: 144.8996 },
  { name: "Williamstown",     stateCode: "VIC", lat: -37.8614, lng: 144.8973 },
  // Brisbane suburbs
  { name: "South Brisbane",   stateCode: "QLD", lat: -27.4810, lng: 153.0211 },
  { name: "West End",         stateCode: "QLD", lat: -27.4799, lng: 153.0055 },
  { name: "Toowong",          stateCode: "QLD", lat: -27.4842, lng: 152.9888 },
  { name: "Chermside",        stateCode: "QLD", lat: -27.3881, lng: 153.0340 },
  { name: "Indooroopilly",    stateCode: "QLD", lat: -27.4997, lng: 152.9701 },
  { name: "Springwood",       stateCode: "QLD", lat: -27.6137, lng: 153.1007 },
  // Perth suburbs
  { name: "Fremantle",        stateCode: "WA",  lat: -32.0569, lng: 115.7439 },
  { name: "Joondalup",        stateCode: "WA",  lat: -31.7457, lng: 115.7669 },
  { name: "Mandurah",         stateCode: "WA",  lat: -32.5282, lng: 115.7228 },
  { name: "Rockingham",       stateCode: "WA",  lat: -32.2788, lng: 115.7283 },
  { name: "Armadale",         stateCode: "WA",  lat: -32.1520, lng: 116.0085 },
  // Adelaide suburbs
  { name: "Glenelg",          stateCode: "SA",  lat: -34.9820, lng: 138.5153 },
  { name: "Norwood",          stateCode: "SA",  lat: -34.9228, lng: 138.6218 },
  { name: "Marion",           stateCode: "SA",  lat: -35.0212, lng: 138.5611 },
];

// Build a fast lookup: "sydney:nsw" → {lat, lng}
const COORDS_BY_KEY = new Map(
  SUBURB_COORDS.map((s) => [`${s.name.toLowerCase()}:${s.stateCode.toLowerCase()}`, { lat: s.lat, lng: s.lng }])
);

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 1) return NextResponse.json({ suggestions: [] });

  const lower = q.toLowerCase();

  // ── State matches ──────────────────────────────────────────────────────────
  const stateMatches: LocationSuggestion[] = Object.entries(STATE_NAMES)
    .filter(
      ([code, name]) =>
        code.toLowerCase().startsWith(lower) ||
        name.toLowerCase().startsWith(lower) ||
        name.toLowerCase().includes(lower)
    )
    .slice(0, 3)
    .map(([code, name]) => ({
      type: "state",
      label: `${name} — ${code}`,
      stateCode: code,
    }));

  // ── Suburb matches (startsWith to avoid "North X" when typing "X") ─────────
  const suburbRows = await prisma.location.findMany({
    where: { suburb: { startsWith: q, mode: "insensitive" } },
    select: { suburb: true, state: true, latitude: true, longitude: true },
    distinct: ["suburb", "state"],
    orderBy: { suburb: "asc" },
    take: 8,
  });

  const suburbSuggestions: LocationSuggestion[] = suburbRows
    .filter((r) => r.suburb)
    .map((r) => {
      const key = `${(r.suburb as string).toLowerCase()}:${r.state.toLowerCase()}`;
      const hardcoded = COORDS_BY_KEY.get(key);
      return {
        type: "suburb",
        label: `${r.suburb}, ${STATE_NAMES[r.state] ?? r.state} (${r.state})`,
        stateCode: r.state,
        suburb: r.suburb as string,
        // Prefer hardcoded coords (city-centre) over random business coords
        lat:  hardcoded?.lat  ?? (r.latitude  != null ? Number(r.latitude)  : undefined),
        lng:  hardcoded?.lng  ?? (r.longitude != null ? Number(r.longitude) : undefined),
      };
    });

  // If the DB didn't return a result for a name that IS in our hardcoded table,
  // inject it so well-known suburbs always appear even if no business lists them.
  const dbSuburbKeys = new Set(suburbSuggestions.map((s) => `${s.suburb?.toLowerCase()}:${s.stateCode.toLowerCase()}`));
  const injected: LocationSuggestion[] = SUBURB_COORDS
    .filter((s) => s.name.toLowerCase().startsWith(lower) && !dbSuburbKeys.has(`${s.name.toLowerCase()}:${s.stateCode.toLowerCase()}`))
    .slice(0, 4)
    .map((s) => ({
      type: "suburb",
      label: `${s.name}, ${STATE_NAMES[s.stateCode] ?? s.stateCode} (${s.stateCode})`,
      stateCode: s.stateCode,
      suburb: s.name,
      lat: s.lat,
      lng: s.lng,
    }));

  // Merge: hardcoded-injected first (most recognisable), then DB results
  const mergedSuburbs = [...injected, ...suburbSuggestions].slice(0, 6);

  // ── Postcode matches — include lat/lng ─────────────────────────────────────
  const isNumeric = /^\d+$/.test(q);
  let postcodeSuggestions: LocationSuggestion[] = [];

  if (isNumeric) {
    const postcodeRows = await prisma.location.findMany({
      where: { postcode: { startsWith: q } },
      select: { postcode: true, suburb: true, state: true, latitude: true, longitude: true },
      distinct: ["postcode"],
      orderBy: { postcode: "asc" },
      take: 5,
    });

    postcodeSuggestions = postcodeRows.map((r) => {
      const key = r.suburb ? `${r.suburb.toLowerCase()}:${r.state.toLowerCase()}` : "";
      const hardcoded = key ? COORDS_BY_KEY.get(key) : undefined;
      return {
        type: "postcode",
        label: `${r.postcode}${r.suburb ? ` — ${r.suburb}` : ""}, ${STATE_NAMES[r.state] ?? r.state}`,
        stateCode: r.state,
        postcode: r.postcode,
        suburb: r.suburb ?? undefined,
        lat:  hardcoded?.lat  ?? (r.latitude  != null ? Number(r.latitude)  : undefined),
        lng:  hardcoded?.lng  ?? (r.longitude != null ? Number(r.longitude) : undefined),
      };
    });
  }

  const suggestions = [
    ...stateMatches,
    ...mergedSuburbs,
    ...postcodeSuggestions,
  ].slice(0, 12);

  return NextResponse.json({ suggestions });
}
