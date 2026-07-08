import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

// Passwordless "magic link" auth for job employers. Completely separate from the
// directory session (own cookie, own JWT purpose). No passwords are ever stored.
const JWT_SECRET = process.env.DIRECTORY_JWT_SECRET ?? process.env.NEXTAUTH_SECRET ?? "dev-directory-secret";
const COOKIE_NAME = "jobs_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

type JobsSessionPayload = { employerId: number; purpose: "jobs_session" };
type JobsMagicPayload = { email: string; purpose: "jobs_magic" };

// A short-lived token emailed to the employer; clicking the link exchanges it for
// a session cookie.
export function createMagicToken(email: string) {
  return jwt.sign({ email: email.toLowerCase().trim(), purpose: "jobs_magic" }, JWT_SECRET, {
    expiresIn: "45m",
  });
}

export function verifyMagicToken(token: string): string | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JobsMagicPayload;
    if (payload.purpose !== "jobs_magic") return null;
    return payload.email;
  } catch {
    return null;
  }
}

export function createJobsSessionToken(employerId: number) {
  return jwt.sign({ employerId, purpose: "jobs_session" }, JWT_SECRET, { expiresIn: "30d" });
}

function verifyJobsSessionToken(token: string): number | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JobsSessionPayload;
    if (payload.purpose !== "jobs_session") return null;
    return payload.employerId;
  } catch {
    return null;
  }
}

export function jobsSessionCookie(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export function clearJobsSessionCookie() {
  return { ...jobsSessionCookie(""), maxAge: 0 };
}

// Server-component helper (reads the cookie jar).
export async function getCurrentEmployer() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  const employerId = verifyJobsSessionToken(token);
  if (!employerId) return null;
  return prisma.jobEmployer.findUnique({ where: { id: employerId } });
}

// Route-handler helper (reads the raw Cookie header).
export async function getEmployerFromRequest(request: Request) {
  const raw = request.headers
    .get("cookie")
    ?.split(";")
    .find((c) => c.trim().startsWith(`${COOKIE_NAME}=`));
  if (!raw) return null;
  const token = raw.split("=").slice(1).join("=");
  if (!token) return null;
  const employerId = verifyJobsSessionToken(token);
  if (!employerId) return null;
  return prisma.jobEmployer.findUnique({ where: { id: employerId } });
}
