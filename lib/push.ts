import webpush from "web-push";
import { prisma } from "@/lib/prisma";

// Web Push sender. Best-effort by design (mirrors lib/notifications.ts): a failed
// push must never break the primary action or the bell notification. Silently
// no-ops when VAPID keys aren't configured, so deploying before the env vars /
// push_subscriptions table exist is harmless.

const PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const SUBJECT = process.env.VAPID_SUBJECT ?? "mailto:info@remedialbuildingaustralia.com.au";

let configured = false;
function ensureConfigured(): boolean {
  if (configured) return true;
  if (!PUBLIC_KEY || !PRIVATE_KEY) return false;
  webpush.setVapidDetails(SUBJECT, PUBLIC_KEY, PRIVATE_KEY);
  configured = true;
  return true;
}

export function isPushConfigured(): boolean {
  return Boolean(PUBLIC_KEY && PRIVATE_KEY);
}

export type PushPayload = { title: string; body?: string | null; url?: string | null };

// Send a push to every subscription belonging to the given users. Prunes any
// endpoints the push service reports as gone (404/410).
export async function sendPushToUsers(userIds: number[], payload: PushPayload): Promise<void> {
  if (!ensureConfigured() || userIds.length === 0) return;
  try {
    const subs = await prisma.pushSubscription.findMany({
      where: { user_id: { in: userIds } },
      select: { id: true, endpoint: true, p256dh: true, auth: true },
    });
    if (subs.length === 0) return;

    const data = JSON.stringify({
      title: payload.title,
      body: payload.body ?? "",
      url: payload.url ?? "/",
    });
    const dead: number[] = [];

    await Promise.all(
      subs.map(async (s) => {
        try {
          await webpush.sendNotification(
            { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
            data,
          );
        } catch (err: unknown) {
          const code = (err as { statusCode?: number })?.statusCode;
          if (code === 404 || code === 410) dead.push(s.id); // subscription expired
        }
      }),
    );

    if (dead.length) {
      await prisma.pushSubscription.deleteMany({ where: { id: { in: dead } } });
    }
  } catch (err) {
    console.error("[push] sendPushToUsers failed", err);
  }
}

export function sendPushToUser(userId: number, payload: PushPayload): Promise<void> {
  return sendPushToUsers([userId], payload);
}
