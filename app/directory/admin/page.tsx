import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { redirect } from "next/navigation";
import AdminPanel from "@/components/directory/AdminPanel";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getCurrentDirectoryUser();
  if (!user || user.role !== "admin") redirect("/directory/login");

  const [queue, users, totalCompanies, publishedCount, subscriberCount] = await Promise.all([
    prisma.adminReviewQueue.findMany({
      where: { status: { in: ["discovered", "needs_review", "needs_recheck"] } },
      orderBy: { created_at: "asc" },
      include: {
        company: {
          include: {
            main_category: { select: { name: true } },
            locations: { take: 1 },
            users: {
              where: { is_primary: true },
              include: { user: { select: { full_name: true, email: true } } },
              take: 1,
            },
          },
        },
      },
    }),
    prisma.user.findMany({
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        email: true,
        full_name: true,
        role: true,
        is_verified: true,
        created_at: true,
      },
    }),
    prisma.company.count(),
    prisma.company.count({ where: { status: "published" } }),
    prisma.$queryRaw<[{ count: bigint }]>`SELECT COUNT(*)::bigint as count FROM newsletter_subscribers`,
  ]);

  return (
    <AdminPanel
      queue={JSON.parse(JSON.stringify(queue))}
      users={JSON.parse(JSON.stringify(users))}
      stats={{
        pending: queue.length,
        totalCompanies,
        publishedCompanies: publishedCount,
        totalUsers: users.length,
        subscriberCount: Number(subscriberCount[0]?.count ?? 0),
      }}
    />
  );
}
