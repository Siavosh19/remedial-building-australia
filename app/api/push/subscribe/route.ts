import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Save (or refresh) the current user's Web Push subscription. Idempotent by
// endpoint — re-subscribing just re-points the endpoint at the current user.
export async function POST(request: NextRequest) {
  const user = await getCurrentDirectoryUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const endpoint = typeof body?.endpoint === "string" ? body.endpoint : "";
  const p256dh = typeof body?.keys?.p256dh === "string" ? body.keys.p256dh : "";
  const auth = typeof body?.keys?.auth === "string" ? body.keys.auth : "";
  if (!endpoint || !p256dh || !auth) {
    return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
  }

  try {
    await prisma.pushSubscription.upsert({
      where: { endpoint },
      create: { user_id: user.id, endpoint, p256dh, auth },
      update: { user_id: user.id, p256dh, auth },
    });
  } catch (err) {
    console.error("[push] subscribe failed", err);
    return NextResponse.json({ error: "Could not save subscription" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
