import { NextResponse } from "next/server";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { createPortalSession } from "@/lib/strata/billing";

export async function POST(req: Request) {
  const user = await getCurrentDirectoryUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  try {
    const url = await createPortalSession(user.id, new URL(req.url).origin);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("[strata-billing] portal failed:", err);
    return NextResponse.json({ error: "Could not open billing just then." }, { status: 502 });
  }
}
