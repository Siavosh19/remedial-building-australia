import { NextRequest, NextResponse } from "next/server";
import { clearJobsSessionCookie } from "@/lib/jobs-auth";

export async function GET(request: NextRequest) {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
  const res = NextResponse.redirect(`${base}/industry-jobs`);
  res.cookies.set(clearJobsSessionCookie());
  return res;
}
