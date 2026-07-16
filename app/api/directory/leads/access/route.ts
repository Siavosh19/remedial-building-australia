import { NextRequest, NextResponse } from "next/server";
import { verifyAuthToken, createSessionToken, createDirectorySessionCookie } from "@/lib/directory-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";

// Magic-link login for business lead emails. The "Interested" / "Not interested"
// buttons in a lead email carry a short-lived `lead_access` token. We verify it,
// set the SAME directory session cookie a password login would (so they're
// logged into their normal profile), and land them on the exact lead page with
// their chosen response pre-selected (LeadFlowActions auto-applies `respond`).
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  const deliveryId = url.searchParams.get("delivery") ?? "";
  const respond = url.searchParams.get("respond") ?? "";

  const payload = verifyAuthToken(token, "lead_access");

  const dest =
    payload && /^\d+$/.test(deliveryId)
      ? `/directory/dashboard/lead-requests/${deliveryId}${respond ? `?respond=${encodeURIComponent(respond)}` : ""}`
      : "/directory/login?error=expired_link";

  const response = NextResponse.redirect(new URL(dest, SITE_URL));
  if (payload) {
    response.cookies.set(createDirectorySessionCookie(createSessionToken(payload.userId)));
  }
  return response;
}
