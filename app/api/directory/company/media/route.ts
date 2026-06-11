import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";

export async function GET(request: NextRequest) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: { id: true },
  });
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

  const media = await prisma.companyMedia.findMany({
    where: { company_id: company.id },
    orderBy: [{ media_type: "asc" }, { sort_order: "asc" }],
  });

  return NextResponse.json(media);
}
