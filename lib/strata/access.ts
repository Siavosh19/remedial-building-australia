// ── Strata scheme access control ─────────────────────────────────────────────
// One rule, no exceptions: nothing scheme-scoped is read or written without
// going through requireSchemeAccess(). A scheme holds owners' names, addresses,
// mortgagees and (later) arrears, so isolation is the whole security model —
// there is no second line of defence behind it.

import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import type { StrataMemberRole } from "@prisma/client";
import { labelsFor, type StrataLabels } from "@/lib/strata/jurisdictions";

/** Roles that may change scheme data. Plain owners get read-only access. */
const MANAGING_ROLES: StrataMemberRole[] = ["chair", "treasurer", "secretary", "committee"];

export function roleCanManage(role: StrataMemberRole) {
  return MANAGING_ROLES.includes(role);
}

export type SchemeAccess = {
  scheme: NonNullable<Awaited<ReturnType<typeof loadScheme>>>;
  membership: { id: number; role: StrataMemberRole };
  userId: number;
  canManage: boolean;
  labels: StrataLabels;
};

function loadScheme(id: number) {
  return prisma.strataScheme.findUnique({ where: { id } });
}

/**
 * Returns the scheme plus the caller's membership, or null when the caller is
 * not signed in, is not an active member, or the scheme does not exist. Callers
 * must treat null as "not found" — never leak that a scheme exists.
 */
export const requireSchemeAccess = cache(async (schemeId: number): Promise<SchemeAccess | null> => {
  if (!Number.isFinite(schemeId)) return null;

  const user = await getCurrentDirectoryUser();
  if (!user) return null;

  const membership = await prisma.strataMember.findFirst({
    where: { scheme_id: schemeId, user_id: user.id, status: "active" },
    select: { id: true, role: true },
  });
  if (!membership) return null;

  const scheme = await loadScheme(schemeId);
  if (!scheme) return null;

  return {
    scheme,
    membership,
    userId: user.id,
    canManage: roleCanManage(membership.role),
    labels: labelsFor(scheme.state),
  };
});

/** Every scheme the signed-in account is an active member of. */
export async function listSchemesForUser(userId: number) {
  const memberships = await prisma.strataMember.findMany({
    where: { user_id: userId, status: "active" },
    select: {
      role: true,
      scheme: {
        include: { _count: { select: { lots: true, members: true } } },
      },
    },
    orderBy: { created_at: "asc" },
  });

  return memberships
    .filter((m) => m.scheme !== null)
    .map((m) => ({ ...m.scheme, viewer_role: m.role }));
}

/** Pending invitations addressed to this email that are not yet accepted. */
export async function listPendingInvites(email: string) {
  return prisma.strataMember.findMany({
    where: { email: email.toLowerCase(), status: "invited" },
    select: {
      id: true,
      role: true,
      invite_token: true,
      scheme: { select: { id: true, name: true, plan_number: true, state: true } },
    },
  });
}
