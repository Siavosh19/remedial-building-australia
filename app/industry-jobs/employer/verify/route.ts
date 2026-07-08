import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyMagicToken, createJobsSessionToken, jobsSessionCookie } from "@/lib/jobs-auth";

// GET handler for the emailed magic link. Verifies the token, sets the session
// cookie, and redirects to the dashboard (or the `next` path if it's a safe
// relative URL). Handling this at the page path keeps the URL clean.
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  const nextParam = url.searchParams.get("next") ?? "";
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? url.origin;

  const email = verifyMagicToken(token);
  if (!email) {
    return NextResponse.redirect(`${base}/industry-jobs/employer/login?error=expired`);
  }

  const employer = await prisma.jobEmployer.upsert({
    where: { email },
    create: { email, last_login_at: new Date() },
    update: { last_login_at: new Date() },
  });

  // Only allow same-site relative redirects.
  const safeNext = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/industry-jobs/employer";
  const res = NextResponse.redirect(`${base}${safeNext}`);
  const cookie = jobsSessionCookie(createJobsSessionToken(employer.id));
  res.cookies.set(cookie);
  return res;
}
