import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendPushToUsers } from "@/lib/push";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

// Daily cron (Vercel): if new industry-news articles were published in the last
// 24h, send ONE digest notification (+ push) to every active user — never one per
// article, so it can't spam. Authenticated with CRON_SECRET (Vercel injects
// `Authorization: Bearer <CRON_SECRET>`).

const LINK = "/industry-news";

async function handle(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // How many articles went live in the window, and the latest headline for the body.
  const [count, latest] = await Promise.all([
    prisma.industryNews.count({ where: { status: "published", created_at: { gte: since } } }),
    prisma.industryNews.findFirst({
      where: { status: "published", created_at: { gte: since } },
      orderBy: { created_at: "desc" },
      select: { title: true },
    }),
  ]);

  if (count === 0) return NextResponse.json({ sent: 0, articles: 0 });

  const title = `${count} new industry news article${count === 1 ? "" : "s"}`;
  const body = latest?.title ? `Latest: ${latest.title}` : "Tap to read the latest industry updates.";

  // Every active account. Batched so a large audience doesn't blow the row limit
  // or hammer the push service in one shot.
  const users = await prisma.user.findMany({ where: { suspended: false }, select: { id: true } });
  const ids = users.map((u) => u.id);

  const CHUNK = 500;
  let notified = 0;
  for (let i = 0; i < ids.length; i += CHUNK) {
    const slice = ids.slice(i, i + CHUNK);
    try {
      await prisma.notification.createMany({
        data: slice.map((user_id) => ({ user_id, type: "news_digest", title, body, link: LINK })),
      });
      notified += slice.length;
    } catch (err) {
      console.error("[news-digest] createMany failed", err);
    }
    await sendPushToUsers(slice, { title, body, url: LINK });
  }

  return NextResponse.json({ sent: notified, articles: count });
}

export const GET = handle;
export const POST = handle;
