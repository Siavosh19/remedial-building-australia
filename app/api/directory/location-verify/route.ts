import { NextRequest, NextResponse } from "next/server";
import { postcodeToState } from "@/lib/au-locations";
import { searchAuLocations, searchAuPostcodes, resolveAuLocation } from "@/lib/au-suburbs";

// Suburb / postcode verification + autocomplete for the company signup form.
// Backed by the COMPLETE Australian suburb/postcode dataset so an applicant can
// pick any genuine AU address — not only suburbs that already have a listing.
//
//   ?q=katoomba        → suggestions of real "Suburb, STATE postcode" matches
//   ?suburb=&postcode= → { valid } check of a specific combo
export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const q = (sp.get("q") ?? "").trim();
  const suburb = (sp.get("suburb") ?? "").trim();
  const postcode = (sp.get("postcode") ?? "").trim();

  // ── Specific combo validation ────────────────────────────────────────────────
  if (suburb && postcode) {
    const pcState = /^\d{4}$/.test(postcode) ? postcodeToState(postcode) : null;
    const place = resolveAuLocation(suburb);
    // Valid if the suburb exists and (its representative postcode matches OR the
    // postcode at least resolves to the same state).
    const valid = Boolean(place) && (place?.postcode === postcode || (pcState != null && place?.state === pcState));
    return NextResponse.json({
      valid,
      state: place?.state ?? pcState ?? null,
      postcodeState: pcState,
    });
  }

  // ── Autocomplete suggestions ─────────────────────────────────────────────────
  if (q.length < 2) return NextResponse.json({ suggestions: [] });

  const numeric = /^\d+$/.test(q);
  const places = numeric ? searchAuPostcodes(q, 10) : searchAuLocations(q, 10);

  const suggestions = places
    .filter((p) => p.type === "suburb" && p.postcode) // signup needs a concrete suburb+postcode
    .map((p) => ({
      suburb: p.suburb,
      postcode: p.postcode as string,
      state: p.state,
      label: `${p.suburb}, ${p.state} ${p.postcode}`,
    }));

  return NextResponse.json({ suggestions });
}
