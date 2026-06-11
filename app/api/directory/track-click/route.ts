import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: true });

  const slug = String(body.slug ?? "").trim();
  const type = String(body.type ?? "");

  if (!slug || !["phone", "website"].includes(type)) {
    return NextResponse.json({ ok: true });
  }

  const field = type === "phone" ? "phone_clicks" : "website_clicks";

  prisma.company.updateMany({
    where: { slug },
    data: { [field]: { increment: 1 } },
  }).catch(() => {});

  return NextResponse.json({ ok: true });
}
