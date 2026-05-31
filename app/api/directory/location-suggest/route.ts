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
};

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 1) return NextResponse.json({ suggestions: [] });

  const lower = q.toLowerCase();

  // ── State matches ──────────────────────────────────────────────────────
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

  // ── Suburb matches from our DB ─────────────────────────────────────────
  const suburbRows = await prisma.location.findMany({
    where: {
      suburb: { contains: q, mode: "insensitive" },
    },
    select: { suburb: true, state: true },
    distinct: ["suburb", "state"],
    orderBy: { suburb: "asc" },
    take: 8,
  });

  const suburbSuggestions: LocationSuggestion[] = suburbRows
    .filter((r) => r.suburb)
    .map((r) => ({
      type: "suburb",
      label: `${r.suburb}, ${STATE_NAMES[r.state] ?? r.state} (${r.state})`,
      stateCode: r.state,
      suburb: r.suburb as string,
    }));

  // ── Postcode matches from our DB ───────────────────────────────────────
  const isNumeric = /^\d+$/.test(q);
  let postcodeSuggestions: LocationSuggestion[] = [];

  if (isNumeric) {
    const postcodeRows = await prisma.location.findMany({
      where: {
        postcode: { startsWith: q },
      },
      select: { postcode: true, suburb: true, state: true },
      distinct: ["postcode"],
      orderBy: { postcode: "asc" },
      take: 5,
    });

    postcodeSuggestions = postcodeRows.map((r) => ({
      type: "postcode",
      label: `${r.postcode}${r.suburb ? ` — ${r.suburb}` : ""}, ${STATE_NAMES[r.state] ?? r.state}`,
      stateCode: r.state,
      postcode: r.postcode,
      suburb: r.suburb ?? undefined,
    }));
  }

  const suggestions = [
    ...stateMatches,
    ...suburbSuggestions,
    ...postcodeSuggestions,
  ].slice(0, 12);

  return NextResponse.json({ suggestions });
}
