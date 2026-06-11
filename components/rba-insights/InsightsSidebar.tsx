import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";

export type InsightCard = {
  id: number;
  title: string;
  slug: string;
  category: string;
  summary: string | null;
  featured_image_url: string | null;
  featured_image_alt_text: string | null;
  published_date: string | null;
  reading_time_minutes: number | null;
  author: string;
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

export function InsightsSidebar({ insights }: { insights: InsightCard[] }) {
  return (
    <aside className="w-full">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-700">RBA Insights</p>
          <p className="mt-0.5 text-xs leading-5 text-slate-500">
            Original remedial building articles by Remedial Building Australia.
          </p>
        </div>
        <a
          href="/rba-insights"
          className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-sky-800 hover:border-sky-300 hover:bg-sky-50 transition whitespace-nowrap"
        >
          View all
        </a>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {insights.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-200 py-8 text-center text-xs text-slate-400">
            No insights published yet.
          </div>
        )}
        {insights.map((insight) => (
          <a
            key={insight.id}
            href={`/rba-insights/${insight.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* Image */}
            {insight.featured_image_url ? (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <Image
                  src={insight.featured_image_url}
                  alt={insight.featured_image_alt_text ?? insight.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 300px"
                />
              </div>
            ) : (
              <div className="aspect-[16/9] w-full bg-gradient-to-br from-sky-900 to-sky-950" />
            )}

            {/* Body */}
            <div className="flex flex-col p-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-700">
                  Remedial Insights
                </span>
                <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                  {insight.category}
                </span>
              </div>

              <h3 className="mt-1.5 text-xs font-bold leading-snug text-sky-950 line-clamp-2 transition group-hover:text-sky-700">
                {insight.title}
              </h3>

              {insight.summary && (
                <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-500">
                  {insight.summary}
                </p>
              )}

              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-slate-400">
                {insight.published_date && (
                  <span className="flex items-center gap-0.5">
                    <Calendar size={9} />
                    {formatDate(insight.published_date)}
                  </span>
                )}
                {insight.reading_time_minutes && (
                  <span className="flex items-center gap-0.5">
                    <Clock size={9} />
                    {insight.reading_time_minutes} min read
                  </span>
                )}
              </div>

              <span className="mt-2 flex items-center gap-1 text-[11px] font-bold text-sky-700 transition group-hover:text-red-700">
                Read article <ArrowRight size={10} />
              </span>
            </div>
          </a>
        ))}
      </div>

      {insights.length > 0 && (
        <div className="mt-4">
          <a
            href="/rba-insights"
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-sky-800 hover:border-sky-300 hover:bg-sky-50 transition"
          >
            View all Insights <ArrowRight size={11} />
          </a>
        </div>
      )}
    </aside>
  );
}
