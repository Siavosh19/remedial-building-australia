import { NextResponse } from "next/server";
import { clearDirectorySessionCookie } from "@/lib/directory-auth";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";

function logoutResponse() {
  const response = NextResponse.redirect(new URL("/directory/login", SITE_URL));
  response.cookies.set(clearDirectorySessionCookie());
  return response;
}

export async function GET() {
  return logoutResponse();
}

export async function POST() {
  return logoutResponse();
}
