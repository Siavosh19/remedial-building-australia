import { NextRequest, NextResponse } from "next/server";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { verifyAbn } from "@/lib/abn";

// Live ABN check for the signup form's green/red indicator.
// Auth-gated: only logged-in directory users can call it, so the ABR lookup
// quota can't be hammered by anonymous traffic/bots.
export async function GET(request: NextRequest) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const abn = request.nextUrl.searchParams.get("abn") ?? "";
  if (!abn.replace(/\D/g, "")) {
    return NextResponse.json({ error: "ABN is required." }, { status: 400 });
  }

  const result = await verifyAbn(abn);
  return NextResponse.json(result);
}
