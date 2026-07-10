import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { formatAud } from "@/lib/jobs-pricing";
import EmployerDashboard, { type DashboardJob, type DashboardPayment } from "@/components/jobs/EmployerDashboard";

export const dynamic = "force-dynamic";

// Jobs area of the merged directory portal. Jobs are owned by the directory User.
export default async function DashboardJobsPage() {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login?next=/directory/dashboard/jobs");

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: { name: true },
  });

  let jobs: DashboardJob[] = [];
  let payments: DashboardPayment[] = [];

  try {
    const rows = await prisma.job.findMany({
      where: { user_id: user.id },
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
      effectiveStatus:
        j.status === "active" && j.expires_at && j.expires_at.getTime() < now ? "expired" : j.status,
    }));

    const pays = await prisma.jobPayment.findMany({
      where: { user_id: user.id },
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
    console.error("[dashboard jobs] load failed:", err);
  }

  return (
    <EmployerDashboard
      email={user.email}
      companyName={company?.name ?? user.full_name ?? null}
      jobs={jobs}
      payments={payments}
    />
  );
}
