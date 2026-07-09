"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, MailCheck } from "lucide-react";

// Mark / unmark an article for inclusion in the next newsletter send.
// When any articles are marked, the weekly send uses exactly those; when none
// are marked, it falls back to the latest 8 published. Selections are cleared
// automatically after each send.
export default function NewsletterToggle({ id, selected }: { id: string; selected: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    const res = await fetch(`/api/directory/admin/news-articles?id=${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ include_in_newsletter: !selected }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      setBusy(false);
      alert("Could not update newsletter selection. Please try again.");
    }
  }

  return (
    <button
      type="button"
      disabled={busy}
      onClick={toggle}
      title={selected ? "Selected for the next newsletter — click to remove" : "Add this article to the next newsletter"}
      className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold transition disabled:opacity-60 ${
        selected
          ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          : "border-slate-200 bg-white text-slate-500 hover:border-emerald-300 hover:text-emerald-700"
      }`}
    >
      {selected ? <MailCheck size={13} /> : <Mail size={13} />}
      {busy ? "…" : selected ? "In newsletter" : "Add"}
    </button>
  );
}
