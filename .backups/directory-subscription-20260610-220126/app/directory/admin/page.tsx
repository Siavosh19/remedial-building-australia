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

  const [aiScopeCount, pendingSupplierCount] = await Promise.all([
    prisma.aIScopeUser.count({ where: { status: "pending" } }),
    prisma.supplier.count({ where: { status: "draft" } }),
  ]);

  return (
    <>
      {pendingSupplierCount > 0 && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-800">
          <span className="font-semibold">{pendingSupplierCount} new supplier {pendingSupplierCount === 1 ? "registration" : "registrations"} pending review.</span>
          <a href="/directory/admin/suppliers" className="underline hover:text-sky-900">Review →</a>
        </div>
      )}
      {aiScopeCount > 0 && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <span className="font-semibold">{aiScopeCount} AI Scope {aiScopeCount === 1 ? "request" : "requests"} pending approval.</span>
          <a href="/directory/admin/ai-scope-users" className="underline hover:text-amber-900">Review →</a>
        </div>
      )}
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
    </>
  );
}
