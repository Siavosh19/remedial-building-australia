import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { activeJobWhere, findDirectoryCompany } from "@/lib/jobs";
import { employmentTypeLabel, experienceLevelLabel } from "@/lib/jobs-data";
import JobCard, { type JobCardData } from "@/components/jobs/JobCard";
import { MapPin, Briefcase, Clock, CalendarClock, Building2, ExternalLink, Star } from "lucide-react";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.remedialbuildingaustralia.com.au";

async function getJob(slug: string) {
  try {
    return await prisma.job.findFirst({
      where: activeJobWhere({ slug }),
      include: { category: { select: { name: true, slug: true } } },
    });
  } catch (err) {
    console.error("[industry-jobs/detail] query failed:", err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return { title: "Job not found | Industry Jobs" };
  const title = job.meta_title || `${job.title} — ${job.company_name} | Industry Jobs`;
  const description =
    job.meta_description ||
    (job.description || "").replace(/<[^>]+>/g, " ").replace(/\s{2,}/g, " ").trim().slice(0, 155);
  return {
    title,
    description,
    alternates: { canonical: `/industry-jobs/${job.slug}` },
    openGraph: {
      title,
      description,
      url: `/industry-jobs/${job.slug}`,
      images: job.company_logo_url ? [{ url: job.company_logo_url }] : undefined,
    },
  };
}

function fmtDate(d: Date | null): string {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

function TextBlock({ title, body }: { title: string; body: string | null }) {
  if (!body?.trim()) return null;
  return (
    <section className="mt-8">
      <h2 className="text-lg font-extrabold tracking-tight text-sky-950">{title}</h2>
      <div className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">{body.trim()}</div>
    </section>
  );
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  // Fire-and-forget view increment.
  prisma.job.update({ where: { id: job.id }, data: { views: { increment: 1 } } }).catch(() => {});

  // Optional directory link: explicit company_id or a name match.
  let directory: { slug: string; name: string } | null = null;
  try {
    if (job.company_id) {
      const c = await prisma.company.findUnique({ where: { id: job.company_id }, select: { slug: true, name: true, status: true } });
      if (c && c.status === "published") directory = { slug: c.slug, name: c.name };
    }
    if (!directory) {
      const match = await findDirectoryCompany(job.company_name);
      if (match) directory = { slug: match.slug, name: match.name };
    }
  } catch { /* ignore */ }

  // Similar jobs: same category (fallback same state), active, excluding self.
  let similar: JobCardData[] = [];
  try {
    similar = await prisma.job.findMany({
      where: activeJobWhere({
        id: { not: job.id },
        ...(job.category_id ? { category_id: job.category_id } : job.state ? { state: job.state } : {}),
      }),
      orderBy: [{ is_featured: "desc" }, { published_at: "desc" }],
      take: 3,
      select: {
        slug: true, title: true, company_name: true, company_logo_url: true, location: true,
        employment_type: true, salary: true, description: true, is_featured: true, published_at: true, created_at: true,
      },
    });
  } catch { /* ignore */ }

  const validThrough = job.closing_date ?? job.expires_at;
  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: (job.description || "").slice(0, 4000),
    datePosted: (job.published_at ?? job.created_at).toISOString(),
    ...(validThrough ? { validThrough: new Date(validThrough).toISOString() } : {}),
    employmentType: job.employment_type ? job.employment_type.toUpperCase() : undefined,
    hiringOrganization: {
      "@type": "Organization",
      name: job.company_name,
      ...(job.company_website ? { sameAs: job.company_website } : {}),
      ...(job.company_logo_url ? { logo: job.company_logo_url } : {}),
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressLocality: job.location, addressRegion: job.state ?? undefined, addressCountry: "AU" },
    },
    directApply: true,
    url: `${SITE_URL}/industry-jobs/${job.slug}`,
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }} />

      <Link href="/industry-jobs" className="text-sm font-semibold text-sky-700 hover:text-red-700">← All jobs</Link>

      {/* Header card */}
      <div className={`mt-4 rounded-2xl border bg-white p-6 shadow-sm ${job.is_featured ? "border-amber-300 ring-1 ring-amber-200" : "border-slate-200"}`}>
        <div className="flex items-start gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
            {job.company_logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={job.company_logo_url} alt={job.company_name} className="h-full w-full object-contain" />
            ) : (
              <Building2 className="text-slate-300" size={32} />
            )}
          </div>
          <div className="min-w-0 flex-1">
            {job.is_featured && (
              <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800">
                <Star size={10} className="fill-amber-500 text-amber-500" /> Featured
              </span>
            )}
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-3xl">{job.title}</h1>
            <p className="mt-1 text-base font-semibold text-slate-700">{job.company_name}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm font-medium text-slate-500">
              <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> {job.location}{job.state ? `, ${job.state}` : ""}</span>
              {job.employment_type && <span className="inline-flex items-center gap-1.5"><Briefcase size={14} /> {employmentTypeLabel(job.employment_type)}</span>}
              {job.experience_level && <span>{experienceLevelLabel(job.experience_level)}</span>}
              {job.salary && <span className="font-semibold text-emerald-700">{job.salary}</span>}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1"><Clock size={12} /> Posted {fmtDate(job.published_at ?? job.created_at)}</span>
              {job.closing_date && <span className="inline-flex items-center gap-1"><CalendarClock size={12} /> Closes {fmtDate(job.closing_date)}</span>}
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href={`/industry-jobs/${job.slug}/apply`} className="inline-flex items-center rounded-xl bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800">
            Apply now
          </Link>
          {directory && (
            <Link href={`/directory/company/${encodeURIComponent(directory.slug)}`} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-sky-800 transition hover:border-sky-300 hover:text-red-700">
              <ExternalLink size={15} /> View Company Profile
            </Link>
          )}
          {job.company_website && (
            <a href={job.company_website} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-sky-800 transition hover:border-sky-300 hover:text-red-700">
              <ExternalLink size={15} /> Company website
            </a>
          )}
        </div>
      </div>

      <TextBlock title="About the Role" body={job.description} />
      <TextBlock title="Responsibilities" body={job.responsibilities} />
      <TextBlock title="Requirements" body={job.requirements} />
      <TextBlock title={`About ${job.company_name}`} body={job.company_about} />

      {/* Apply CTA */}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-sky-50/60 p-6 text-center">
        <h2 className="text-lg font-extrabold text-sky-950">Interested in this role?</h2>
        <p className="mt-1 text-sm text-slate-500">Apply directly — no account needed.</p>
        <Link href={`/industry-jobs/${job.slug}/apply`} className="mt-4 inline-flex items-center rounded-xl bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800">
          Apply now
        </Link>
      </div>

      {/* Similar jobs */}
      {similar.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-extrabold tracking-tight text-sky-950">Similar Jobs</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {similar.map((j) => <JobCard key={j.slug} job={j} />)}
          </div>
        </section>
      )}
    </div>
  );
}
