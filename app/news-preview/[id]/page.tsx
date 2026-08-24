import { notFound, redirect } from "next/navigation";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { prisma } from "@/lib/prisma";
import ArticleScreen from "@/components/industry-news/ArticleScreen";

// Admin reader for a single news article, at any status. It shows the exact
// page the public would get, so an article can be read in full — summary,
// analysis and source link — before it is approved.
//
// It lives OUTSIDE /industry-news on purpose: that section is currently
// disconnected behind the "Under development" notice, and this reader has to
// keep working while it is.
export const dynamic = "force-dynamic";

export const metadata = { robots: { index: false, follow: false } };

export default async function NewsPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  const { id } = await params;
  const article = await prisma.industryNews.findUnique({
    where: { id },
    select: { id: true, slug: true, status: true },
  });
  if (!article?.slug) notFound();

  return (
    <ArticleScreen
      slug={article.slug}
      preview
      id={article.id}
      status={article.status}
    />
  );
}
