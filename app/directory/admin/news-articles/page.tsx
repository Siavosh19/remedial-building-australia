import { supabaseAdmin } from "@/lib/supabase-admin";
import { ExternalLink } from "lucide-react";
import RemoveNewsButton from "./RemoveNewsButton";
import RecycleNewsButton from "./RecycleNewsButton";
import UnpublishNewsButton from "./UnpublishNewsButton";
import CategorySelect from "./CategorySelect";

export const dynamic = "force-dynamic";

const SITE = "https://www.remedialbuildingaustralia.com.au";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "published", label: "Published" },
  { key: "rejected", label: "Rejected" },
] as const;

type NewsRow = {
  id: string | number;
  title: string;
  slug: string | null;
  category: string | null;
  source_name: string | null;
  source_url: string | null;
  published_date: string | null;
  status: string | null;
};

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("en-AU");
}

export default async function AdminNewsArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const active = FILTERS.some((f) => f.key === status) ? (status as string) : "all";

  let query = supabaseAdmin
    .from("industry_news")
    .select("id, title, slug, category, source_name, source_url, published_date, status")
    .order("published_date", { ascending: false, nullsFirst: false })
    .limit(1000);
  if (active !== "all") query = query.eq("status", active);

  const { data, error } = await query;
  if (error) console.error("[admin/news-articles] query failed:", error);
  const rows = (data ?? []) as NewsRow[];

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900">News Articles</h1>
        <p className="mt-1 text-sm text-slate-500">
          Remove anything you don&apos;t want shown, or recycle a wrongly‑rejected article back onto the site.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="mb-5 flex gap-2">
        {FILTERS.map((f) => (
          <a
            key={f.key}
            href={f.key === "all" ? "/directory/admin/news-articles" : `/directory/admin/news-articles?status=${f.key}`}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
              active === f.key
                ? "bg-sky-950 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-800"
            }`}
          >
            {f.label}
          </a>
        ))}
        <span className="ml-auto self-center text-xs text-slate-400">{rows.length} shown</span>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Title</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Source</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Published</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const isPublished = r.status === "published";
              const internal = isPublished && r.slug ? `${SITE}/industry-news/${r.slug}` : null;
              return (
                <tr key={String(r.id)} className="border-b border-slate-100 align-top hover:bg-slate-50 transition">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-slate-900">{r.title || "—"}</p>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                      {internal && (
                        <a href={internal} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sky-700 hover:text-sky-900 hover:underline">
                          On site <ExternalLink size={11} />
                        </a>
                      )}
                      {r.source_url && (
                        <a href={r.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 hover:underline">
                          Original source <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <CategorySelect id={String(r.id)} current={r.category || "Other"} />
                  </td>
                  <td className="px-4 py-3 text-slate-600">{r.source_name || "—"}</td>
                  <td className="px-4 py-3 text-xs text-slate-400">{fmtDate(r.published_date)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${isPublished ? "bg-emerald-100 text-emerald-700" : r.status === "rejected" ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-500"}`}>
                      {r.status || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      <a
                        href={`/directory/admin/news-articles/${r.id}/edit`}
                        className="rounded-lg border border-sky-200 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-50 transition"
                      >
                        Edit
                      </a>
                      {isPublished ? <UnpublishNewsButton id={String(r.id)} /> : <RecycleNewsButton id={String(r.id)} />}
                      <RemoveNewsButton id={String(r.id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {!rows.length && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">No articles in this view.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
