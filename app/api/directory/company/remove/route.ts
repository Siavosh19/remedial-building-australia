import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";

export const dynamic = "force-dynamic";

// Self-service "remove listing" — unpublishes the business's company (status →
// draft), so it disappears from the public directory. Reversible: re-publishing
// goes back through the normal review flow, so we don't hard-delete anything.
export async function POST() {
  const user = await getCurrentDirectoryUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: { id: true },
  });
  if (!company) return NextResponse.json({ error: "No listing found." }, { status: 404 });

  await prisma.company.update({ where: { id: company.id }, data: { status: "draft" } });
  return NextResponse.json({ ok: true });
}
