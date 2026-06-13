import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) return NextResponse.json({ suggestions: [] });

  try {
    const categories = await prisma.category.findMany({
      where: {
        is_active: true,
        name: { contains: q, mode: "insensitive" },
      },
      include: {
        _count: { select: { companies: true } },
      },
      orderBy: { display_order: "asc" },
      take: 20,
    });

    const suggestions = categories
      .filter((c) => c._count.companies > 0)
      .sort((a, b) => b._count.companies - a._count.companies)
      .slice(0, 8)
      .map((c) => ({
        type: "category" as const,
        text: c.name,
        slug: c.slug,
        count: c._count.companies,
      }));

    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ suggestions: [] });
  }
}
