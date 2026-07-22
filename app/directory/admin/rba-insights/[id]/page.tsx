import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { InsightEditor } from "../InsightEditor";
import DeleteInsightButton from "./DeleteInsightButton";
import ShareToSocialButton from "./ShareToSocialButton";

export const dynamic = "force-dynamic";

export default async function EditInsightPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  const { id } = await params;
  const article = await prisma.rbaInsightsArticle.findUnique({ where: { id: Number(id) } });
  if (!article) notFound();

  const initial = {
    id: article.id,
    title: article.title,
    slug: article.slug,
    category: article.category,
    summary: article.summary ?? "",
    featured_image_url: article.featured_image_url ?? "",
    featured_image_alt_text: article.featured_image_alt_text ?? "",
    body_content: article.body_content ?? "",
    author: article.author,
    published_date: article.published_date ? article.published_date.toISOString() : "",
    status: article.status as "draft" | "published" | "archived",
    seo_title: article.seo_title ?? "",
    seo_description: article.seo_description ?? "",
    related_defect_pages: article.related_defect_pages.length ? article.related_defect_pages : [""],
    related_repair_systems: article.related_repair_systems.length ? article.related_repair_systems : [""],
    is_featured: article.is_featured,
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/directory/admin/rba-insights" className="text-lg font-bold text-slate-900 hover:text-black">
            ← RBA Insights
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 line-clamp-1">{article.title}</h1>
        </div>
        <div className="flex items-start gap-3">
          <ShareToSocialButton id={article.id} status={article.status} />
          <DeleteInsightButton id={article.id} />
        </div>
      </div>
      <InsightEditor initial={initial} />
    </div>
  );
}
