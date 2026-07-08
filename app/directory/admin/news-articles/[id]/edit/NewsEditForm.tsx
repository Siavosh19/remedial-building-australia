"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VALID_CATEGORIES } from "@/lib/news-categories";

type Article = {
  id: string;
  title: string;
  category: string;
  summary: string;
  industry_impact: string;
  status: string;
  source_url: string;
};

export default function NewsEditForm({ article }: { article: Article }) {
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [category, setCategory] = useState(article.category);
  const [summary, setSummary] = useState(article.summary);
  const [impact, setImpact] = useState(article.industry_impact);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function generate() {
    setGenerating(true);
    setMsg(null);
    const res = await fetch(
      `/api/directory/admin/news-articles/enrich?id=${encodeURIComponent(article.id)}&force=true`,
      { method: "POST" },
    );
    const d = await res.json().catch(() => ({}));
    setGenerating(false);
    if (res.ok && d.generated) {
      setSummary(d.summary ?? summary);
      setImpact(d.industry_impact ?? impact);
      if (d.category) setCategory(d.category);
      setMsg({ type: "ok", text: "AI summary generated from the source and saved. Review and tweak if needed." });
    } else {
      setMsg({ type: "err", text: d.error ?? "Could not generate a summary (the source page may be unavailable). You can write one manually." });
    }
  }

  const categoryOptions = (VALID_CATEGORIES as readonly string[]).includes(category)
    ? [...VALID_CATEGORIES]
    : [category, ...VALID_CATEGORIES];

  async function save() {
    setSaving(true);
    setMsg(null);
    const res = await fetch(`/api/directory/admin/news-articles?id=${encodeURIComponent(article.id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category, summary, industry_impact: impact }),
    });
    setSaving(false);
    if (res.ok) {
      setMsg({ type: "ok", text: "Saved." });
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setMsg({ type: "err", text: d.error ?? "Save failed." });
    }
  }

  const field = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-100";
  const label = "block text-sm font-semibold text-slate-800 mb-1.5";

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <a href="/directory/admin/news-articles" className="text-lg font-bold text-slate-900 hover:text-black">← Back to News Articles</a>
        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${article.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>{article.status}</span>
      </div>

      <div>
        <label className={label}>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className={field} />
      </div>

      <div>
        <label className={label}>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={field}>
          {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <label className="block text-sm font-semibold text-slate-800">
            Editorial Summary <span className="font-normal text-slate-400">— shown as the article body.</span>
          </label>
          <button
            type="button"
            onClick={generate}
            disabled={generating}
            className="shrink-0 rounded-lg border border-sky-300 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-800 hover:bg-sky-100 disabled:opacity-60 transition"
          >
            {generating ? "Generating…" : "✨ Generate AI summary from source"}
          </button>
        </div>
        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={9} className={`${field} resize-y`} placeholder="Write a short editorial summary in your own words…" />
        {!summary.trim() && (
          <p className="mt-1 text-xs text-amber-600">This article currently has no summary, so its page shows no content. Add one here.</p>
        )}
      </div>

      <div>
        <label className={label}>Why It Matters <span className="font-normal text-slate-400">(optional)</span></label>
        <textarea value={impact} onChange={(e) => setImpact(e.target.value)} rows={4} className={`${field} resize-y`} placeholder="One short paragraph on why this is relevant to Australian remedial building professionals…" />
      </div>

      {article.source_url && (
        <p className="text-xs text-slate-400">
          Original source: <a href={article.source_url} target="_blank" rel="noopener noreferrer" className="text-sky-700 hover:underline">{article.source_url}</a>
        </p>
      )}

      {msg && (
        <div className={`rounded-xl px-4 py-3 text-sm font-semibold ${msg.type === "ok" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{msg.text}</div>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={save} disabled={saving} className="rounded-xl bg-red-700 px-6 py-3 text-sm font-bold text-white hover:bg-red-800 disabled:opacity-60">
          {saving ? "Saving…" : "Save changes"}
        </button>
        <a href="/directory/admin/news-articles" className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">Done</a>
      </div>
    </div>
  );
}
