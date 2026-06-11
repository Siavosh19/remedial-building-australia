import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(request: NextRequest, { params }: Params) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const mediaId = Number(id);
  if (!mediaId) return NextResponse.json({ error: "Invalid ID." }, { status: 400 });

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: { id: true, logo_url: true },
  });
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

  const media = await prisma.companyMedia.findFirst({
    where: { id: mediaId, company_id: company.id },
  });
  if (!media) return NextResponse.json({ error: "Media not found." }, { status: 404 });

  await prisma.companyMedia.delete({ where: { id: mediaId } });

  // Clear logo_url if this was the logo
  if (media.media_type === "logo" && company.logo_url === media.url) {
    await prisma.company.update({ where: { id: company.id }, data: { logo_url: null } });
  }

  return NextResponse.json({ success: true });
}
