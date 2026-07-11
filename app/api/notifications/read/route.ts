import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";

export const dynamic = "force-dynamic";

// Mark notifications read. Body { ids: number[] } marks those; no body marks all.
export async function POST(request: Request) {
  const user = await getCurrentDirectoryUser();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });

  let ids: number[] | undefined;
  try {
    const body = await request.json();
    if (Array.isArray(body?.ids)) {
      ids = body.ids.filter((n: unknown): n is number => typeof n === "number");
    }
  } catch {
    // no body → mark all read
  }

  await prisma.notification.updateMany({
    where: {
      user_id: user.id,
      read_at: null,
      ...(ids && ids.length ? { id: { in: ids } } : {}),
    },
    data: { read_at: new Date() },
  });

  return NextResponse.json({ ok: true });
}
