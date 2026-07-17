"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Star, Plus, ArrowRight } from "lucide-react";
import { employmentTypeLabel } from "@/lib/jobs-data";

type LatestJob = {
  slug: string;
  title: string;
  company_name: string;
  location: string;
  state: string | null;
  salary: string | null;
  is_featured: boolean;
  employment_type: string | null;
};

// Self-fetching homepage panel: sits to the right of the news column.
export default function HomeJobsPanel() {
  const [jobs, setJobs] = useState<LatestJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch("/api/industry-jobs/latest")
      .then((r) => r.json())
      .then((d) => { if (alive) setJobs(Array.isArray(d.jobs) ? d.jobs.slice(0, 5) : []); })
      .catch(() => {})
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start justify-between px-6 pb-4 pt-5">
        <div>
          <h3 className="text-lg font-extrabold tracking-tight text-sky-950">Industry Jobs</h3>
          <div className="mt-2 h-[3px] w-40" style={{ background: "linear-gradient(to right, #b91c1c, rgba(185,28,28,0))" }} />
        </div>
        <Link href="/industry-jobs" className="shrink-0 text-xs font-bold text-sky-600 hover:text-red-700">View all →</Link>
      </div>

      <div className="flex flex-1 flex-col px-6 py-5">
        <p className="mb-4 text-sm leading-6 text-slate-900">
          Career opportunities across remedial building, strata, engineering, consulting and property.
        </p>

        <div className="flex-1 divide-y divide-slate-100">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-slate-200 border-t-sky-700" />
            </div>
          ) : jobs.length === 0 ? null : (
            jobs.map((j) => (
              <Link key={j.slug} href={`/industry-jobs/${j.slug}`} className="group block py-3">
                <div className="flex items-start gap-2">
                  {j.is_featured && <Star size={13} className="mt-0.5 shrink-0 fill-amber-500 text-amber-500" />}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-sky-950 group-hover:text-red-700">{j.title}</p>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-700">
                      <span className="font-medium">{j.company_name}</span>
                      <span className="inline-flex items-center gap-0.5"><MapPin size={11} /> {j.location}{j.state ? `, ${j.state}` : ""}</span>
                      {j.employment_type && <span>· {employmentTypeLabel(j.employment_type)}</span>}
                      {j.salary && <span className="font-semibold text-emerald-700">· {j.salary}</span>}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link href="/industry-jobs" className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-sky-800 transition hover:border-sky-300 hover:text-red-700">
            Browse jobs <ArrowRight size={14} />
          </Link>
          <Link href="/directory/dashboard/jobs/new" className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800">
            <Plus size={14} /> Post a Job
          </Link>
        </div>
      </div>
    </div>
  );
}
