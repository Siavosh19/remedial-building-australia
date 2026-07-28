import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { searchAddresses } from "@/lib/measuremap/geocoding";

// Address autocomplete for the New Project form. Gated: only MeasureMap-authorised
// users can call it (also avoids exposing the geocoder as an open proxy).
export async function GET(request: NextRequest) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const q = request.nextUrl.searchParams.get("q") ?? "";
  const suggestions = await searchAddresses(q);
  return NextResponse.json({ suggestions });
}
