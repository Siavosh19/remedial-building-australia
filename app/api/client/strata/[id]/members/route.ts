import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { Prisma, type StrataMemberRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireSchemeAccess } from "@/lib/strata/access";
import { sendStrataInviteEmail } from "@/lib/strata/email";
import { createAuditLog } from "@/lib/audit";

const ROLES: StrataMemberRole[] = ["chair", "treasurer", "secretary", "committee", "owner"];

const ROLE_LABEL: Record<StrataMemberRole, string> = {
  chair: "Chairperson",
  treasurer: "Treasurer",
  secretary: "Secretary",
  committee: "Committee member",
  owner: "Owner (read only)",
};

/**
 * Invite someone into the scheme workspace. Nothing is shared until they accept:
 * the row is created with status "invited" and no user_id, so the isolation
 * guard (which requires an ACTIVE membership) keeps them out until they do.
 */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const access = await requireSchemeAccess(Number(id));
  if (!access) return NextResponse.json({ error: "Not found." }, { status: 404 });
  if (!access.canManage) return NextResponse.json({ error: "Read-only access." }, { status: 403 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const role: StrataMemberRole = ROLES.includes(body.role) ? body.role : "committee";
  const lotId = Number(body.lot_id);

  // A lot can only be attached if it belongs to THIS scheme.
  let linkedLotId: number | null = null;
  if (Number.isFinite(lotId) && lotId > 0) {
    const lot = await prisma.strataLot.findFirst({
      where: { id: lotId, scheme_id: access.scheme.id },
      select: { id: true },
    });
    linkedLotId = lot?.id ?? null;
  }

  const token = randomBytes(24).toString("hex");

  try {
    const member = await prisma.strataMember.create({
      data: {
        scheme_id: access.scheme.id,
        email,
        full_name: String(body.full_name ?? "").trim() || null,
        role,
        status: "invited",
        lot_id: linkedLotId,
        invite_token: token,
      },
    });

    const inviter = await prisma.user.findUnique({
      where: { id: access.userId },
      select: { full_name: true, email: true },
    });

    const result = await sendStrataInviteEmail({
      to: email,
      inviterName: inviter?.full_name || inviter?.email || "A committee member",
      schemeName: access.scheme.name,
      roleLabel: ROLE_LABEL[role],
      token,
    });

    await createAuditLog({
      actorId: access.userId,
      entityType: "strata_member",
      entityId: String(member.id),
      action: "invite",
      newValue: { scheme_id: access.scheme.id, email, role, emailed: result.sent },
    });

    // The link is returned either way so the committee can pass it on by hand if
    // the email bounces or mail is not configured.
    return NextResponse.json({ ok: true, id: member.id, emailed: result.sent, link: result.link });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return NextResponse.json({ error: "That email is already on this scheme." }, { status: 409 });
    }
    throw err;
  }
}
