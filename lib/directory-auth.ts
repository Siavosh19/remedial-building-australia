import { cache } from "react";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.DIRECTORY_JWT_SECRET ?? process.env.NEXTAUTH_SECRET ?? "dev-directory-secret";
const COOKIE_NAME = "directory_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type DirectorySessionPayload = {
  userId: number;
  purpose: "session";
};

export type DirectoryTokenPayload = {
  userId: number;
  purpose: "email_verification" | "password_reset";
};

export function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export function comparePassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed);
}

export function createSessionToken(userId: number) {
  return jwt.sign({ userId, purpose: "session" }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifySessionToken(token: string) {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as DirectorySessionPayload;
    if (payload.purpose !== "session") return null;
    return payload;
  } catch {
    return null;
  }
}

export function createAuthToken(userId: number, purpose: DirectoryTokenPayload["purpose"], expiresIn: string = "1d") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return jwt.sign({ userId, purpose }, JWT_SECRET, { expiresIn } as any);
}

export function verifyAuthToken(token: string, expectedPurpose: DirectoryTokenPayload["purpose"]) {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as DirectoryTokenPayload;
    if (payload.purpose !== expectedPurpose) return null;
    return payload;
  } catch {
    return null;
  }
}

const ADMIN_ROLES = new Set(["admin", "super_admin", "content_admin", "supplier_manager", "read_only_admin"]);

// Request-scoped cache: the dashboard layout and each page both call this on
// every navigation. React cache() dedupes those calls within a single request so
// the user lookup runs once, not once per component — making dashboard nav snappier.
export const getCurrentDirectoryUser = cache(async () => {
  const cookie = (await cookies()).get(COOKIE_NAME)?.value;
  if (!cookie) return null;

  const payload = verifySessionToken(cookie);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) return null;
  if (user.suspended) return null;
  // Admin roles bypass email verification — they are created directly
  if (!user.is_verified && !ADMIN_ROLES.has(user.role)) return null;
  return user;
});

export function createDirectorySessionCookie(token: string, rememberMe = true) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    ...(rememberMe ? { maxAge: 60 * 60 * 24 * 30 } : {}),
  };
}

export function clearDirectorySessionCookie() {
  return {
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

export async function getCurrentAdminUser() {
  const user = await getCurrentDirectoryUser();
  if (!user || !ADMIN_ROLES.has(user.role)) return null;
  return user;
}

// ── Dual-role access ────────────────────────────────────────────────────────
// One login can act as BOTH a service business AND a client. Rather than a
// single-valued role gate, access is derived from what the account actually has:
//   • client access  = the original client_user role OR a provisioned ClientProfile
//   • business access = at least one company membership (company_users link)
// The client profile is provisioned lazily the first time an account switches to
// the client side (see /api/account/switch).
export async function userHasClientAccess(user: { id: number; role: string } | null) {
  if (!user) return false;
  if (user.role === "client_user") return true;
  const profile = await prisma.clientProfile.findUnique({
    where: { user_id: user.id },
    select: { id: true },
  });
  return !!profile;
}

export async function userHasBusinessAccess(user: { id: number } | null) {
  if (!user) return false;
  const link = await prisma.companyUser.findFirst({
    where: { user_id: user.id },
    select: { id: true },
  });
  return !!link;
}

// Strata / client users (quote-request platform). Same session + cookie as the
// directory; allows the original client_user role OR any account that has
// switched into client mode (has a ClientProfile).
export async function getCurrentClientUser() {
  const user = await getCurrentDirectoryUser();
  if (!(await userHasClientAccess(user))) return null;
  return user;
}

export async function getClientUserFromRequest(request: Request) {
  const user = await getDirectoryUserFromRequest(request);
  if (!(await userHasClientAccess(user))) return null;
  return user;
}

export async function getAdminFromRequest(request: Request) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user || !ADMIN_ROLES.has(user.role)) return null;
  return user;
}

export async function getDirectoryUserFromRequest(request: Request) {
  const cookie = request.headers.get("cookie")?.split(";").find((item) => item.trim().startsWith(`${COOKIE_NAME}=`));
  if (!cookie) return null;
  const token = cookie.split("=")[1];
  if (!token) return null;

  const payload = verifySessionToken(token);
  if (!payload) return null;
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) return null;
  if (user.suspended) return null;
  if (!user.is_verified && !ADMIN_ROLES.has(user.role)) return null;
  return user;
}
