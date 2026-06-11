import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const quotes = await prisma.quoteRequest.findMany({
    orderBy: { created_at: "desc" },
    take: 500,
    include: {
      company: { select: { id: true, name: true, slug: true } },
    },
  });

  return NextResponse.json(quotes);
}
