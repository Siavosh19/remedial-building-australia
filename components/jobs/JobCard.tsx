import { MapPin, Briefcase, Clock, Building2, Star } from "lucide-react";
import { employmentTypeLabel } from "@/lib/jobs-data";

export type JobCardData = {
  slug: string;
  title: string;
  company_name: string;
  company_logo_url: string | null;
  location: string;
  employment_type: string | null;
  salary: string | null;
  description: string;
  is_featured: boolean;
  published_at: Date | string | null;
  created_at: Date | string;
};

function timeAgo(date: Date | string | null, fallback: Date | string): string {
  const d = new Date(date ?? fallback);
  if (isNaN(d.getTime())) return "";
  const days = Math.floor((Date.now() - d.getTime()) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

export default function JobCard({ job }: { job: JobCardData }) {
  const summary = (job.description || "").replace(/<[^>]+>/g, " ").replace(/\s{2,}/g, " ").trim();
  return (
    <a
      href={`/industry-jobs/${job.slug}`}
      className={`group flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${
        job.is_featured ? "border-amber-300 ring-1 ring-amber-200" : "border-slate-200 hover:border-sky-300"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
          {job.company_logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={job.company_logo_url} alt={job.company_name} className="h-full w-full object-contain" />
          ) : (
            <Building2 className="text-slate-300" size={24} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold leading-snug text-sky-950 group-hover:text-red-700">{job.title}</h3>
            {job.is_featured && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800">
                <Star size={10} className="fill-amber-500 text-amber-500" /> Featured
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm font-semibold text-slate-600">{job.company_name}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-slate-500">
        <span className="inline-flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
        {job.employment_type && (
          <span className="inline-flex items-center gap-1"><Briefcase size={13} /> {employmentTypeLabel(job.employment_type)}</span>
        )}
        {job.salary && <span className="font-semibold text-emerald-700">{job.salary}</span>}
        <span className="inline-flex items-center gap-1"><Clock size={13} /> {timeAgo(job.published_at, job.created_at)}</span>
      </div>

      {summary && <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{summary}</p>}

      <div className="mt-4">
        <span className="inline-flex items-center rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-800 transition group-hover:bg-red-700 group-hover:text-white">
          View Job →
        </span>
      </div>
    </a>
  );
}
