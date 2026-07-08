import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentEmployer } from "@/lib/jobs-auth";
import { formatAud } from "@/lib/jobs-pricing";
import EmployerDashboard, { type DashboardJob, type DashboardPayment } from "./EmployerDashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Employer Dashboard | Industry Jobs",
  robots: { index: false },
};

export default async function EmployerDashboardPage() {
  const employer = await getCurrentEmployer();
  if (!employer) redirect("/industry-jobs/employer/login?next=/industry-jobs/employer");

  let jobs: DashboardJob[] = [];
  let payments: DashboardPayment[] = [];

  try {
    const rows = await prisma.job.findMany({
      where: { employer_id: employer.id },
      orderBy: [{ created_at: "desc" }],
      include: { _count: { select: { applications: true } } },
    });
    const now = Date.now();
    jobs = rows.map((j) => ({
      id: j.id,
      slug: j.slug,
      title: j.title,
      status: j.status,
      is_featured: j.is_featured,
      views: j.views,
      applications: j._count.applications,
      published_at: j.published_at ? j.published_at.toISOString() : null,
      expires_at: j.expires_at ? j.expires_at.toISOString() : null,
      // Expired-by-date but still marked active (cron hasn't run) → treat as expired in UI.
      effectiveStatus:
        j.status === "active" && j.expires_at && j.expires_at.getTime() < now ? "expired" : j.status,
    }));

    const pays = await prisma.jobPayment.findMany({
      where: { employer_id: employer.id },
      orderBy: { created_at: "desc" },
      take: 50,
      include: { job: { select: { title: true } } },
    });
    payments = pays.map((p) => ({
      id: p.id,
      jobTitle: p.job?.title ?? "—",
      amount: formatAud(p.amount_cents),
      planKey: p.plan_key,
      isFeatured: p.is_featured,
      status: p.status,
      date: p.created_at.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }),
    }));
  } catch (err) {
    console.error("[employer dashboard] load failed:", err);
  }

  return (
    <EmployerDashboard
      email={employer.email}
      companyName={employer.company_name}
      jobs={jobs}
      payments={payments}
    />
  );
}
