import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { redirect } from "next/navigation";
import AdminPanel from "@/components/directory/AdminPanel";
import Link from "next/link";

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

  const [supplierCount, productCount, aiScopeCount] = await Promise.all([
    prisma.supplier.count(),
    prisma.supplierProduct.count(),
    prisma.aIScopeUser.count({ where: { status: "pending" } }),
  ]);

  const hubLinks = [
    { href: "/directory/admin/suppliers", label: "Suppliers", count: supplierCount, color: "indigo" },
    { href: "/directory/admin/supplier-marketing", label: "Promotions", count: productCount, color: "purple" },
    { href: "/directory/admin/billing", label: "Billing", color: "green" },
    { href: "/directory/admin/ai-scope-users", label: "AI Scope Users", count: aiScopeCount > 0 ? `${aiScopeCount} pending` : undefined, color: aiScopeCount > 0 ? "amber" : "slate" },
    { href: "/directory/admin/analytics", label: "Analytics", color: "slate" },
    { href: "/directory/admin/audit-log", label: "Audit Log", color: "slate" },
    { href: "/directory/admin/news-subscribers", label: "Subscribers", count: Number(subscriberCount[0]?.count ?? 0), color: "slate" },
    { href: "/directory/admin/directory-signups", label: "Directory Signups", count: totalCompanies, color: "slate" },
    { href: "/directory/admin/settings", label: "Settings", color: "slate" },
  ];

  return (
    <>
      <div className="mb-8 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {hubLinks.map(l => (
          <Link key={l.href} href={l.href} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-indigo-300 transition group">
            <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
              l.color === "indigo" ? "text-indigo-600" :
              l.color === "purple" ? "text-purple-600" :
              l.color === "green" ? "text-green-600" :
              l.color === "amber" ? "text-amber-600" :
              "text-slate-500"
            }`}>{l.label}</div>
            {l.count !== undefined && (
              <div className="text-xl font-black text-slate-900">{l.count}</div>
            )}
          </Link>
        ))}
      </div>
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
