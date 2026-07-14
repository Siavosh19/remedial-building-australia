import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Remove a push subscription (called when the browser reports it was revoked).
// Deleting by endpoint alone is safe — the endpoint is a unique secret token.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const endpoint = typeof body?.endpoint === "string" ? body.endpoint : "";
  if (!endpoint) return NextResponse.json({ error: "Missing endpoint" }, { status: 400 });

  try {
    await prisma.pushSubscription.deleteMany({ where: { endpoint } });
  } catch (err) {
    console.error("[push] unsubscribe failed", err);
  }
  return NextResponse.json({ ok: true });
}
