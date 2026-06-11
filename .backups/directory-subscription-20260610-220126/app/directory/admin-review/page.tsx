import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { redirect } from "next/navigation";
import AdminReviewPanel from "@/components/directory/AdminReviewPanel";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

export default async function AdminReviewPage() {
  const user = await getCurrentDirectoryUser();
  if (!user || user.role !== "admin") redirect("/directory/login");
  const [rawItems, total, categories, statusCounts] = await Promise.all([
    prisma.adminReviewQueue.findMany({
      include: {
        company: {
          include: {
            main_category: { select: { id: true, name: true, slug: true } },
            locations: { take: 1 },
            licences: true,
            company_categories: {
              include: { category: { select: { id: true, name: true, slug: true } } },
            },
            company_tags: { include: { tag: true } },
          },
        },
        reviewer: { select: { id: true, full_name: true, email: true } },
      },
      orderBy: { created_at: "desc" },
      take: PAGE_SIZE,
    }),
    prisma.adminReviewQueue.count(),
    prisma.category.findMany({
      where: { is_active: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true },
    }),
    prisma.adminReviewQueue.groupBy({
      by: ["status"],
      _count: { status: true },
    }),
  ]);

  const counts: Record<string, number> = {};
  for (const row of statusCounts) counts[row.status] = row._count.status;

  return (
    <AdminReviewPanel
      initialItems={JSON.parse(JSON.stringify(rawItems))}
      initialTotal={total}
      initialTotalPages={Math.ceil(total / PAGE_SIZE)}
      categories={categories}
      statusCounts={counts}
    />
  );
}
