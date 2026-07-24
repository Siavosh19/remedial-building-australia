import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuthToken } from "@/lib/directory-auth";
import { sendVerificationReminderEmail } from "@/lib/directory-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HOUR = 3600 * 1000;

// Per-stage age windows (hours since signup). Using windows (not a bare ">="
// threshold) means the cron never blasts the pre-existing backlog of old
// unverified accounts, and it tolerates the cron only running hourly/daily.
// Windows are contiguous so a daily cron still lands one email per stage.
const WINDOWS: Record<number, { min: number; max: number }> = {
  1: { min: 12, max: 48 }, // stage 0 -> 1  (~12h after signup)
  2: { min: 48, max: 72 }, // stage 1 -> 2  (~48h)
  3: { min: 72, max: 144 }, // stage 2 -> 3 (~72h)
};
const BATCH = 200;

// One-off key for the manual single-user trigger (e.g. "send this person now").
// The manual path only ever emails a real unverified user their own reminder,
// so it is not an open relay. CRON_SECRET (Vercel-injected) is also accepted.
const MANUAL_KEY = "rmd-manual-8b41d0f6";

function cronAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  return !!secret && auth === `Bearer ${secret}`;
}

type Candidate = { id: number; email: string; full_name: string | null };

async function sendStage(u: Candidate, stage: number) {
  const token = createAuthToken(u.id, "email_verification");
  await sendVerificationReminderEmail(u.full_name ?? "there", u.email, token, stage);
  await prisma.user.update({
    where: { id: u.id },
    data: { verify_reminder_stage: stage, verify_reminder_last_at: new Date() },
  });
}

async function run(request: NextRequest) {
  const url = new URL(request.url);
  const manualEmail = url.searchParams.get("email");

  // ── Manual single-user trigger: send the NEXT stage now, with a real token ──
  if (manualEmail) {
    if (url.searchParams.get("k") !== MANUAL_KEY && !cronAuthorized(request)) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }
    const u = await prisma.user.findUnique({
      where: { email: manualEmail.trim().toLowerCase() },
      select: {
        id: true, email: true, full_name: true, role: true,
        is_verified: true, suspended: true, verify_reminder_stage: true,
      },
    });
    if (!u) return NextResponse.json({ error: "no such user" }, { status: 404 });
    if (u.is_verified || u.suspended || u.role === "client_user" || u.verify_reminder_stage >= 3) {
      return NextResponse.json({
        skipped: true,
        reason: "verified / suspended / client / already sent 3",
        stage: u.verify_reminder_stage,
      });
    }
    const next = u.verify_reminder_stage + 1;
    await sendStage(u, next);
    return NextResponse.json({ sent: true, email: u.email, stage: next });
  }

  // ── Scheduled cron path (Vercel injects Authorization: Bearer CRON_SECRET) ──
  if (!cronAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = Date.now();
  const oldestConsidered = new Date(now - WINDOWS[3].max * HOUR); // ignore >6-day-old accounts
  const candidates = await prisma.user.findMany({
    where: {
      is_verified: false,
      suspended: false,
      role: { not: "client_user" },
      verify_reminder_stage: { lt: 3 },
      created_at: { gte: oldestConsidered },
    },
    select: { id: true, email: true, full_name: true, created_at: true, verify_reminder_stage: true },
    orderBy: { created_at: "asc" },
    take: BATCH,
  });

  const sent: Array<{ email: string; stage: number }> = [];
  const failed: Array<{ email: string; stage: number; error: string }> = [];
  for (const u of candidates) {
    const ageH = (now - u.created_at.getTime()) / HOUR;
    const next = u.verify_reminder_stage + 1; // 1, 2, or 3
    const w = WINDOWS[next];
    if (!w || ageH < w.min || ageH >= w.max) continue;
    try {
      await sendStage(u, next);
      sent.push({ email: u.email, stage: next });
    } catch (e) {
      failed.push({ email: u.email, stage: next, error: e instanceof Error ? e.message : String(e) });
    }
  }
  return NextResponse.json({
    scanned: candidates.length,
    sent: sent.length,
    failed: failed.length,
    details: { sent, failed },
  });
}

export async function GET(request: NextRequest) {
  return run(request);
}
export async function POST(request: NextRequest) {
  return run(request);
}
