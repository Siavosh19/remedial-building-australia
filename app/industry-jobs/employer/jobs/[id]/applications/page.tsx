import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentEmployer } from "@/lib/jobs-auth";
import ApplicationsList, { type ApplicationRow } from "./ApplicationsList";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Applications | Industry Jobs", robots: { index: false } };

export default async function ApplicationsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const employer = await getCurrentEmployer();
  if (!employer) redirect(`/industry-jobs/employer/login?next=/industry-jobs/employer/jobs/${id}/applications`);

  const job = await prisma.job.findUnique({
    where: { id: Number(id) },
    select: { id: true, title: true, employer_id: true },
  });
  if (!job || job.employer_id !== employer.id) notFound();

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
    <div className="mx-auto max-w-4xl px-5 py-10">
      <a href="/industry-jobs/employer" className="text-sm font-semibold text-sky-700 hover:text-red-700">← Dashboard</a>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-sky-950">Applications</h1>
      <p className="mt-1 text-sm text-slate-500">{job.title} · {applications.length} application{applications.length === 1 ? "" : "s"}</p>
      <ApplicationsList applications={applications} />
    </div>
  );
}
