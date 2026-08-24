"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, Eye, EyeOff, X } from "lucide-react";

// Admin-only bar pinned to the top of the article reader at /news-preview/[id].
// It tells you at a glance whether this article is live, and lets you approve
// or bin it without going back to the list.
export default function DraftReviewBar({ id, status }: { id: string; status: string | null }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [current, setCurrent] = useState(status || "draft");

  async function setStatus(next: string, label: string) {
    setBusy(label);
    const res = await fetch(`/api/directory/admin/news-articles?id=${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setBusy(null);
    if (!res.ok) {
      alert("That didn't save. Please try again.");
      return;
    }
    setCurrent(next);
    router.refresh();
  }

  const isPublished = current === "published";
  const isRejected = current === "rejected";

  return (
    <div className="sticky top-0 z-50 border-b border-amber-300 bg-amber-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-2.5 text-sm">
        <a
          href="/directory/admin/news-articles"
          className="inline-flex items-center gap-1.5 font-semibold text-amber-900 hover:underline"
        >
          <ArrowLeft size={14} /> News admin
        </a>

        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
            isPublished
              ? "bg-emerald-100 text-emerald-700"
              : isRejected
                ? "bg-rose-100 text-rose-700"
                : "bg-slate-200 text-slate-600"
          }`}
        >
          {isPublished ? "Live on the site" : isRejected ? "Rejected" : "Draft — not public"}
        </span>

        <span className="hidden text-xs text-amber-800 sm:inline">
          You are reading this as an admin. {isPublished ? "Everyone can see this page." : "Nobody else can see this page."}
        </span>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {!isPublished && (
            <button
              type="button"
              disabled={!!busy}
              onClick={() => setStatus("published", "publish")}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:opacity-60"
            >
              <Check size={13} /> {busy === "publish" ? "Publishing…" : "Publish to the site"}
            </button>
          )}
          {isPublished && (
            <button
              type="button"
              disabled={!!busy}
              onClick={() => setStatus("draft", "unpublish")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3 py-1.5 text-xs font-bold text-amber-800 transition hover:bg-amber-100 disabled:opacity-60"
            >
              <EyeOff size={13} /> {busy === "unpublish" ? "Unpublishing…" : "Take off the site"}
            </button>
          )}
          {!isRejected && (
            <button
              type="button"
              disabled={!!busy}
              onClick={() => setStatus("rejected", "reject")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-50 disabled:opacity-60"
            >
              <X size={13} /> {busy === "reject" ? "Rejecting…" : "Reject"}
            </button>
          )}
          {isRejected && (
            <button
              type="button"
              disabled={!!busy}
              onClick={() => setStatus("draft", "restore")}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
            >
              <Eye size={13} /> {busy === "restore" ? "Restoring…" : "Back to drafts"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
