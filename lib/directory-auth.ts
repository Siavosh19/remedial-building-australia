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

export async function getCurrentDirectoryUser() {
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
}

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

// Strata / client users (quote-request platform). Same session + cookie as the
// directory, gated on the client_user role.
export async function getCurrentClientUser() {
  const user = await getCurrentDirectoryUser();
  if (!user || user.role !== "client_user") return null;
  return user;
}

export async function getClientUserFromRequest(request: Request) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user || user.role !== "client_user") return null;
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
