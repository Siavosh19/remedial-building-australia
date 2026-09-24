import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { createAuditLog } from "@/lib/audit";

/**
 * Accept an invitation. Explicit: holding the link is not enough — the person
 * must be signed in, and the signed-in email must be the one that was invited.
 * Scheme data carries other people's personal information, so a mis-delivered
 * link must not become access.
 */
export async function POST(_req: Request, ctx: { params: Promise<{ token: string }> }) {
  const { token } = await ctx.params;

  const user = await getCurrentDirectoryUser();
  if (!user) return NextResponse.json({ error: "Sign in first." }, { status: 401 });

  const invite = await prisma.strataMember.findUnique({
    where: { invite_token: token },
    include: { scheme: { select: { id: true, name: true } } },
  });
  if (!invite || invite.status !== "invited") {
    return NextResponse.json({ error: "This invitation is no longer valid." }, { status: 404 });
  }

  if (invite.email.toLowerCase() !== user.email.toLowerCase()) {
    return NextResponse.json(
      { error: `This invitation was sent to ${invite.email}. Sign in with that address to accept it.` },
      { status: 403 },
    );
  }

  await prisma.strataMember.update({
    where: { id: invite.id },
    data: {
      user_id: user.id,
      status: "active",
      accepted_at: new Date(),
      invite_token: null,
      full_name: invite.full_name ?? user.full_name,
    },
  });

  await createAuditLog({
    actorId: user.id,
    actorEmail: user.email,
    entityType: "strata_member",
    entityId: String(invite.id),
    action: "invite_accepted",
    newValue: { scheme_id: invite.scheme_id },
  });

  return NextResponse.json({ ok: true, scheme_id: invite.scheme_id });
}
