import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { createAuditLog } from "@/lib/audit";

type Ctx = { params: Promise<{ id: string; memberId: string }> };

/** Remove a member, or withdraw an invitation that has not been accepted. */
export async function DELETE(_req: Request, ctx: Ctx) {
  const { id, memberId } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const member = await prisma.strataMember.findFirst({
    where: { id: Number(memberId), scheme_id: access.scheme.id },
  });
  if (!member) return NextResponse.json({ error: "Not found." }, { status: 404 });

  // A scheme must never be left with nobody who can administer it.
  if (member.status === "active") {
    const managers = await prisma.strataMember.count({
      where: {
        scheme_id: access.scheme.id,
        status: "active",
        role: { in: ["chair", "treasurer", "secretary", "committee"] },
        id: { not: member.id },
      },
    });
    if (managers === 0) {
      return NextResponse.json(
        { error: "This is the last member who can manage the scheme. Add another before removing this one." },
        { status: 409 },
      );
    }
  }

  await prisma.strataMember.delete({ where: { id: member.id } });

  await createAuditLog({
    actorId: access.userId,
    entityType: "strata_member",
    entityId: String(member.id),
    action: member.status === "invited" ? "invite_withdrawn" : "remove",
    previousValue: { scheme_id: access.scheme.id, email: member.email, role: member.role },
  });

  return NextResponse.json({ ok: true });
}
