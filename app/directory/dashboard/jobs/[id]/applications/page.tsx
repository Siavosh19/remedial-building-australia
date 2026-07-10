import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import ApplicationsList, { type ApplicationRow } from "@/components/jobs/ApplicationsList";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentDirectoryUser();
  if (!user) redirect(`/directory/login?next=/directory/dashboard/jobs/${id}/applications`);

  const job = await prisma.job.findUnique({
    where: { id: Number(id) },
    select: { id: true, title: true, user_id: true },
  });
  if (!job || job.user_id !== user.id) notFound();

  const rows = await prisma.jobApplication.findMany({
    where: { job_id: job.id },
    orderBy: { created_at: "desc" },
  });
  const applications: ApplicationRow[] = rows.map((a) => ({
    id: a.id,
    fullName: a.full_name,
    email: a.email,
    phone: a.phone,
    resumeUrl: a.resume_url,
    resumeName: a.resume_name,
    coverMessage: a.cover_message,
    status: a.status,
    date: a.created_at.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }),
  }));

  return (
    <div>
      <a href="/directory/dashboard/jobs" className="text-sm font-bold text-slate-900 hover:text-black">← Manage Jobs</a>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-sky-950">Applications</h1>
      <p className="mt-1 text-sm text-slate-500">{job.title} · {applications.length} application{applications.length === 1 ? "" : "s"}</p>
      <ApplicationsList applications={applications} />
    </div>
  );
}
