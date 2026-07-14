"use client";

import { useEffect, useState } from "react";

// Registers the logged-in user's browser for Web Push. Mounted inside
// authenticated layouts (dashboard + client portal) so the subscription is tied
// to a real user server-side. If permission is already granted it subscribes
// silently; if it's the default state it shows a small dismissible prompt; if
// denied/unsupported it renders nothing.

const VAPID = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const DISMISS_KEY = "rba-push-prompt-dismissed";

function urlB64ToUint8Array(base64: string): Uint8Array {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

async function subscribe(): Promise<boolean> {
  if (!VAPID) return false;
  const reg = await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(VAPID) as BufferSource,
    });
  }
  const res = await fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sub.toJSON()),
  });
  return res.ok;
}

export default function PushRegister() {
  const [perm, setPerm] = useState<NotificationPermission | "unsupported">("granted");
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      !("PushManager" in window) ||
      !("Notification" in window) ||
      !VAPID
    ) {
      setPerm("unsupported");
      return;
    }
    setPerm(Notification.permission);
    try { setDismissed(!!localStorage.getItem(DISMISS_KEY)); } catch { setDismissed(false); }
    if (Notification.permission === "granted") {
      subscribe().catch(() => {});
    }
  }, []);

  async function enable() {
    try {
      const p = await Notification.requestPermission();
      setPerm(p);
      if (p === "granted") await subscribe();
    } catch {
      /* ignore */
    }
  }

  function dismiss() {
    try { localStorage.setItem(DISMISS_KEY, "1"); } catch { /* ignore */ }
    setDismissed(true);
  }

  // Only prompt when the user hasn't decided yet and hasn't dismissed us.
  if (perm !== "default" || dismissed) return null;

  return (
    <div
      className="fixed inset-x-0 z-[55] flex justify-center px-4"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 88px)" }}
    >
      <div className="flex items-center gap-2 rounded-full bg-sky-950 py-2 pl-4 pr-2 text-white shadow-[0_8px_24px_rgba(15,37,64,0.35)]">
        <button onClick={enable} className="text-[13px] font-semibold" aria-label="Turn on notifications">
          🔔 Turn on notifications
        </button>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="flex h-6 w-6 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
