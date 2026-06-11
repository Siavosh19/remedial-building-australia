import { NextRequest, NextResponse } from "next/server";

const AU_STATE_MAP: Record<string, string> = {
  "New South Wales": "NSW",
  "Victoria": "VIC",
  "Queensland": "QLD",
  "Western Australia": "WA",
  "South Australia": "SA",
  "Tasmania": "TAS",
  "Australian Capital Territory": "ACT",
  "Northern Territory": "NT",
};

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json(null);

  try {
    const url =
      `https://nominatim.openstreetmap.org/search` +
      `?q=${encodeURIComponent(q)}` +
      `&format=json&addressdetails=1&limit=1&countrycodes=au`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "RemedialBuildingAustralia/1.0 (info@remedialbuildingaustralia.com.au)",
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return NextResponse.json(null);

    const data = await res.json();
    const hit = data[0];
    if (!hit) return NextResponse.json(null);

    const addr = hit.address as Record<string, string>;
    const stateRaw = addr.state ?? "";
    const state = AU_STATE_MAP[stateRaw] ?? addr.state_code ?? "";

    return NextResponse.json({
      lat: parseFloat(hit.lat),
      lng: parseFloat(hit.lon),
      displayName: addr.suburb ?? addr.city ?? addr.town ?? addr.county ?? stateRaw,
      state,
    });
  } catch {
    return NextResponse.json(null);
  }
}
