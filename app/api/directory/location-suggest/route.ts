import { NextRequest, NextResponse } from "next/server";
import { STATE_NAMES } from "@/lib/au-locations";
import { searchAuLocations, searchAuPostcodes } from "@/lib/au-suburbs";

export type LocationSuggestion = {
  type: "state" | "suburb" | "region" | "postcode";
  label: string;
  stateCode: string;
  suburb?: string;
  postcode?: string;
  lat?: number;
  lng?: number;
};

// Location autocomplete for the directory search box. Backed by the COMPLETE
// Australian place list (every real suburb/locality + ABS regions), not just the
// suburbs that already have a listing — so any genuine AU town (Katoomba, Marsden
// Park, …) and region (Blue Mountains, Central Coast) is searchable.
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 1) return NextResponse.json({ suggestions: [] });

  const lower = q.toLowerCase();
  const isNumeric = /^\d+$/.test(q);

  // ── State matches ────────────────────────────────────────────────────────────
  const stateMatches: LocationSuggestion[] = isNumeric
    ? []
    : Object.entries(STATE_NAMES)
        .filter(([code, name]) => code.toLowerCase().startsWith(lower) || name.toLowerCase().startsWith(lower))
        .slice(0, 2)
        .map(([code, name]) => ({ type: "state", label: `${name} — ${code}`, stateCode: code }));

  // ── Suburb / region matches (full AU coverage, with coordinates) ──────────────
  const places: LocationSuggestion[] = isNumeric
    ? []
    : searchAuLocations(q, 8).map((p) => ({
        type: p.type,
        label: p.label,
        stateCode: p.state,
        suburb: p.suburb,
        postcode: p.postcode,
        lat: p.lat,
        lng: p.lng,
      }));

  // ── Postcode matches (by suburb postcode) ─────────────────────────────────────
  let postcodeSuggestions: LocationSuggestion[] = [];
  if (isNumeric && q.length >= 3) {
    postcodeSuggestions = searchAuPostcodes(q, 5).map((p) => ({
      type: "postcode",
      label: `${p.postcode}${p.suburb ? ` — ${p.suburb}` : ""}, ${p.state}`,
      stateCode: p.state,
      postcode: p.postcode,
      suburb: p.suburb,
      lat: p.lat,
      lng: p.lng,
    }));
  }

  const suggestions = [...stateMatches, ...places, ...postcodeSuggestions].slice(0, 12);
  return NextResponse.json({ suggestions });
}
