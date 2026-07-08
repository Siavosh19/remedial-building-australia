import { prisma } from "@/lib/prisma";
import { formatAud } from "@/lib/jobs-pricing";
import AdminJobsClient, { type AdminJob, type AdminPayment, type AdminEmployer } from "./AdminJobsClient";

export const dynamic = "force-dynamic";

export default async function AdminJobsPage() {
  const now = new Date();

  let revenue = 0;
  let counts = { active: 0, featured: 0, expired: 0, applications: 0, draft: 0 };
  let jobs: AdminJob[] = [];
  let payments: AdminPayment[] = [];
  let employers: AdminEmployer[] = [];

  try {
    const [rev, active, featured, expired, apps, draft, jobRows, payRows, empRows] = await Promise.all([
      prisma.jobPayment.aggregate({ _sum: { amount_cents: true }, where: { status: "paid" } }),
      prisma.job.count({ where: { status: "active", OR: [{ expires_at: null }, { expires_at: { gt: now } }] } }),
      prisma.job.count({ where: { status: "active", is_featured: true, OR: [{ expires_at: null }, { expires_at: { gt: now } }] } }),
      prisma.job.count({ where: { OR: [{ status: "expired" }, { status: "active", expires_at: { lt: now } }] } }),
      prisma.jobApplication.count(),
      prisma.job.count({ where: { status: { in: ["draft", "pending_payment"] } } }),
      prisma.job.findMany({
        orderBy: { created_at: "desc" },
        take: 100,
        include: { employer: { select: { email: true } }, _count: { select: { applications: true } } },
      }),
      prisma.jobPayment.findMany({ orderBy: { created_at: "desc" }, take: 50, include: { job: { select: { title: true } } } }),
      prisma.jobEmployer.findMany({ orderBy: { created_at: "desc" }, take: 100, include: { _count: { select: { jobs: true } } } }),
    ]);

    revenue = rev._sum.amount_cents ?? 0;
    counts = { active, featured, expired, applications: apps, draft };
    jobs = jobRows.map((j) => ({
      id: j.id, slug: j.slug, title: j.title, company: j.company_name, employerEmail: j.employer?.email ?? "—",
      status: j.status, isFeatured: j.is_featured, applications: j._count.applications,
      expiresAt: j.expires_at ? j.expires_at.toISOString() : null,
      createdAt: j.created_at.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }),
      effectiveStatus: j.status === "active" && j.expires_at && j.expires_at < now ? "expired" : j.status,
    }));
    payments = payRows.map((p) => ({
      id: p.id, jobTitle: p.job?.title ?? "—", amount: formatAud(p.amount_cents),
      isFeatured: p.is_featured, status: p.status,
      date: p.created_at.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }),
    }));
    employers = empRows.map((e) => ({
      id: e.id, email: e.email, company: e.company_name, jobs: e._count.jobs,
      joined: e.created_at.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }),
    }));
  } catch (err) {
    console.error("[admin/jobs] load failed:", err);
  }

  return (
    <AdminJobsClient
      revenue={formatAud(revenue)}
      counts={counts}
      jobs={jobs}
      payments={payments}
      employers={employers}
    />
  );
}
