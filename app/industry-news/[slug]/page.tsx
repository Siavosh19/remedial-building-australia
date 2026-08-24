import type { Metadata } from "next";
import ArticleScreen, { getArticle } from "@/components/industry-news/ArticleScreen";

export const revalidate = 3600;

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article Not Found | Industry News" };

  const description = article.summary.slice(0, 155).replace(/\s+\S*$/, "") + "…";
  return {
    title: `${article.title} | Remedial Building Australia`,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
      siteName: "Remedial Building Australia",
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

// Public route: published articles only. The reader itself lives in
// ArticleScreen so the admin reader (/news-preview/[id]) can show the exact
// same page for an article that has not been published yet.
export default async function IndustryNewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticleScreen slug={slug} />;
}
