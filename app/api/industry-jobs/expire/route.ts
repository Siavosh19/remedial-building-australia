import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendJobExpiringSoonEmail, sendJobExpiredEmail } from "@/lib/jobs-email";

export const runtime = "nodejs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";
const RENEW_URL = `${SITE_URL}/directory/dashboard/jobs`;

// Daily cron (Vercel): expire past-due jobs + send expiry reminders. Authenticated
// with CRON_SECRET (Vercel injects `Authorization: Bearer <CRON_SECRET>`).
async function handle(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const soon = new Date(now.getTime() + 3 * 86400000); // 3 days out

  let expired = 0;
  let reminded = 0;

  // 1) Expire past-due active jobs and notify.
  const due = await prisma.job.findMany({
    where: { status: "active", expires_at: { lt: now } },
    select: { id: true, slug: true, title: true, company_name: true, location: true, contact_email: true, is_featured: true },
  });
  for (const job of due) {
    await prisma.job.update({ where: { id: job.id }, data: { status: "expired", featured_until: null } });
    sendJobExpiredEmail(job.contact_email, job, RENEW_URL).catch((e) => console.error("[jobs/expire] expired email:", e));
    expired += 1;
  }

  // 2) Remind jobs expiring within 3 days (once).
  const expiring = await prisma.job.findMany({
    where: { status: "active", reminder_sent: false, expires_at: { gte: now, lte: soon } },
    select: { id: true, slug: true, title: true, company_name: true, location: true, contact_email: true, is_featured: true, expires_at: true },
  });
  for (const job of expiring) {
    await prisma.job.update({ where: { id: job.id }, data: { reminder_sent: true } });
    if (job.expires_at) {
      sendJobExpiringSoonEmail(job.contact_email, job, job.expires_at, RENEW_URL).catch((e) => console.error("[jobs/expire] reminder email:", e));
      reminded += 1;
    }
  }

  return NextResponse.json({ ok: true, expired, reminded });
}

export async function GET(request: NextRequest) {
  return handle(request);
}
export async function POST(request: NextRequest) {
  return handle(request);
}
