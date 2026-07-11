import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";

export const dynamic = "force-dynamic";

// Recent notifications + unread count for the signed-in account (the bell polls this).
export async function GET() {
  const user = await getCurrentDirectoryUser();
  if (!user) return NextResponse.json({ notifications: [], unreadCount: 0 });

  const [notifications, unreadCount] = await Promise.all([
    prisma.notification.findMany({
      where: { user_id: user.id },
      orderBy: { created_at: "desc" },
      take: 20,
    }),
    prisma.notification.count({ where: { user_id: user.id, read_at: null } }),
  ]);

  return NextResponse.json({ notifications, unreadCount });
}
