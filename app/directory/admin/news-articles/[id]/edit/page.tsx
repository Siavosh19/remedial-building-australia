import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import NewsEditForm from "./NewsEditForm";

export const dynamic = "force-dynamic";

export default async function EditNewsArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = await supabaseAdmin
    .from("industry_news")
    .select("id, title, category, summary, industry_impact, status, source_url")
    .eq("id", id)
    .single();

  if (!data) notFound();
  const row = data as Record<string, unknown>;

  const article = {
    id: String(row.id ?? id),
    title: String(row.title ?? ""),
    category: String(row.category ?? "Other"),
    summary: String(row.summary ?? ""),
    industry_impact: String(row.industry_impact ?? ""),
    status: String(row.status ?? ""),
    source_url: String(row.source_url ?? ""),
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Edit News Article</h1>
        <p className="mt-1 text-sm text-slate-500">Edit the on-site content for this article.</p>
      </div>
      <NewsEditForm article={article} />
    </div>
  );
}
