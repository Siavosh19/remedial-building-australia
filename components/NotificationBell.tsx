"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Bell, Inbox, FileEdit, UserPlus } from "lucide-react";

type Notification = {
  id: number;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  read_at: string | null;
  created_at: string;
};

const ICONS: Record<string, typeof Inbox> = {
  lead: Inbox,
  lead_updated: FileEdit,
  job_applicant: UserPlus,
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "short" });
}

// Bell + unread badge with a dropdown. Complements the email alerts; polls the
// notifications API. Works on both the light business bar and the dark client bar.
export default function NotificationBell({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [items, setItems] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json();
      setItems(data.notifications ?? []);
      setUnread(data.unreadCount ?? 0);
    } catch {
      /* keep current */
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, 60000);
    return () => clearInterval(t);
  }, [load]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function markAllRead() {
    if (unread === 0) return;
    setUnread(0);
    setItems((prev) => prev.map((n) => ({ ...n, read_at: n.read_at ?? new Date().toISOString() })));
    try {
      await fetch("/api/notifications/read", { method: "POST" });
    } catch {
      /* refetch on next poll */
    }
  }

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next) markAllRead();
  }

  const btnCls =
    tone === "dark"
      ? "text-white/80 hover:bg-white/10 hover:text-white"
      : "text-slate-500 hover:bg-slate-100 hover:text-slate-800";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={toggle}
        aria-label={`Notifications${unread ? ` (${unread} unread)` : ""}`}
        className={`relative flex h-9 w-9 items-center justify-center rounded-full transition ${btnCls}`}
      >
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-bold text-sky-950">Notifications</p>
            <span className="text-xs text-slate-400">{items.length ? `${items.length} recent` : ""}</span>
          </div>

          {items.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <Bell size={22} className="mx-auto text-slate-300" />
              <p className="mt-2 text-sm text-slate-400">You&apos;re all caught up.</p>
            </div>
          ) : (
            <ul className="max-h-[60vh] divide-y divide-slate-50 overflow-y-auto">
              {items.map((n) => {
                const Icon = ICONS[n.type] ?? Bell;
                const row = (
                  <div className={`flex gap-3 px-4 py-3 transition hover:bg-slate-50 ${!n.read_at ? "bg-sky-50/50" : ""}`}>
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                      <Icon size={15} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-800">{n.title}</p>
                      {n.body && <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">{n.body}</p>}
                      <p className="mt-1 text-[11px] text-slate-400">{timeAgo(n.created_at)}</p>
                    </div>
                  </div>
                );
                return (
                  <li key={n.id}>
                    {n.link ? (
                      <a href={n.link} className="block">
                        {row}
                      </a>
                    ) : (
                      row
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
