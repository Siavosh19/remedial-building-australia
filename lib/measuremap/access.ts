import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  getCurrentDirectoryUser,
  getDirectoryUserFromRequest,
} from "@/lib/directory-auth";

// ============================================================================
// MeasureMap access control — the SINGLE source of truth.
//
// RBA uses custom JWT auth (not Supabase Auth), and all data access goes through
// Prisma on a privileged role, so RLS is not the effective gate (it is only
// defence-in-depth against the public PostgREST API — see the SQL migration).
// The REAL gate is this module: every MeasureMap route, server action, API
// handler and page loader MUST establish the user through requireMeasureMapUser()
// (pages/actions) or requireMeasureMapApiUser() (route handlers) before touching
// any measuremap_* record, and must additionally verify per-record ownership.
// ============================================================================

export type SessionUser = { id: number; email: string; role: string };

/**
 * True when the given user id has an ACTIVE measuremap_access record.
 * Fails closed: if the table does not exist yet (pre-migration) or the query
 * errors, access is denied rather than throwing — so /measuremap degrades to
 * "restricted" instead of 500-ing the request.
 */
export const hasMeasureMapAccess = cache(async (userId: number): Promise<boolean> => {
  try {
    const row = await prisma.measureMapAccess.findFirst({
      where: { user_id: userId, status: "active" },
      select: { user_id: true },
    });
    return !!row;
  } catch (err) {
    console.error("[measuremap] access check failed (denying):", err);
    return false;
  }
});

/**
 * The current logged-in user IF they also hold MeasureMap access, else null.
 * Does not redirect — callers decide.
 */
export const getMeasureMapUser = cache(async (): Promise<SessionUser | null> => {
  const user = await getCurrentDirectoryUser();
  if (!user) return null;
  if (!(await hasMeasureMapAccess(user.id))) return null;
  return { id: user.id, email: user.email, role: user.role };
});

/**
 * For pages / server actions. Redirects unauthenticated users to login and
 * authenticated-but-unauthorised users to the Access Restricted page. Returns a
 * guaranteed authorised user otherwise.
 */
export async function requireMeasureMapUser(nextPath = "/measuremap"): Promise<SessionUser> {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect(`/directory/login?next=${encodeURIComponent(nextPath)}`);
  if (!(await hasMeasureMapAccess(user.id))) redirect("/measuremap/access-restricted");
  return { id: user.id, email: user.email, role: user.role };
}

/**
 * For route handlers (/app/api/measuremap/**). Returns the authorised user or
 * null; the caller returns 401/403 JSON. Never redirects.
 */
export async function getMeasureMapApiUser(request: Request): Promise<SessionUser | null> {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return null;
  if (!(await hasMeasureMapAccess(user.id))) return null;
  return { id: user.id, email: user.email, role: user.role };
}
