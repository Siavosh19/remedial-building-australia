import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug." }, { status: 400 });

  const company = await prisma.company.findUnique({
    where: { slug, status: "published" },
    select: {
      name: true,
      slug: true,
      is_claimed: true,
      locations: { select: { suburb: true, state: true }, take: 1 },
    },
  });

  if (!company) return NextResponse.json({ error: "Not found." }, { status: 404 });

  return NextResponse.json({
    name: company.name,
    slug: company.slug,
    is_claimed: company.is_claimed,
    suburb: company.locations[0]?.suburb ?? null,
    state: company.locations[0]?.state ?? null,
  });
}
