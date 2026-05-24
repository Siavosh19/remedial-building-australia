import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";

  if (q.length < 3) {
    return NextResponse.json([]);
  }

  try {
    const url =
      `https://nominatim.openstreetmap.org/search` +
      `?q=${encodeURIComponent(q)}` +
      `&format=json&addressdetails=1&limit=6&countrycodes=au`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "RemedialBuildingAustralia/1.0 (info@remedialbuildingaustralia.com.au)",
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return NextResponse.json([]);

    const data: Array<{ display_name: string }> = await res.json();
    const suggestions = data.map((item) => item.display_name);
    return NextResponse.json(suggestions);
  } catch {
    return NextResponse.json([]);
  }
}
