import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { getListingTiers } from "@/lib/jobs-pricing";
import JobForm, { type JobFormInitial } from "@/components/jobs/JobForm";

export const dynamic = "force-dynamic";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentDirectoryUser();
  if (!user) redirect(`/directory/login?next=/directory/dashboard/jobs/${id}/edit`);

  const job = await prisma.job.findUnique({
    where: { id: Number(id) },
    include: { category: { select: { slug: true } } },
  });
  if (!job || job.user_id !== user.id) notFound();

  const pricing = await getListingTiers();

  const initial: JobFormInitial = {
    id: job.id,
    title: job.title,
    company_name: job.company_name,
    company_logo_url: job.company_logo_url,
    company_website: job.company_website,
    company_about: job.company_about,
    category_slug: job.category?.slug ?? null,
    location: job.location,
    state: job.state,
    employment_type: job.employment_type,
    experience_level: job.experience_level,
    salary: job.salary,
    description: job.description,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    contact_email: job.contact_email,
    closing_date: job.closing_date ? job.closing_date.toISOString().slice(0, 10) : null,
    is_featured: job.is_featured,
  };

  const isDraft = job.status === "draft" || job.status === "pending_payment";

  return (
    <div>
      <a href="/directory/dashboard/jobs" className="text-sm font-bold text-slate-900 hover:text-black">← Manage Jobs</a>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-sky-950">Edit job</h1>
      <p className="mt-1 text-sm text-slate-500">
        {isDraft ? "This draft isn't live yet — preview then pay to publish." : "Changes save immediately to your live listing."}
      </p>
      <JobForm mode="edit" initial={initial} employerEmail={user.email} pricing={pricing} />
    </div>
  );
}
