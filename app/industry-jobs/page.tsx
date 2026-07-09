import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { activeJobWhere } from "@/lib/jobs";
import { AU_STATES, EMPLOYMENT_TYPES, EXPERIENCE_LEVELS, SALARY_BANDS } from "@/lib/jobs-data";
import JobCard, { type JobCardData } from "@/components/jobs/JobCard";
import { Search, Briefcase, Plus } from "lucide-react";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Industry Jobs | Remedial Building Australia",
  description:
    "Find career opportunities across Australia's remedial building, strata, engineering, consulting and property sectors.",
  alternates: { canonical: "/industry-jobs" },
  openGraph: {
    title: "Industry Jobs | Remedial Building Australia",
    description:
      "Career opportunities across Australia's remedial building, strata, engineering, consulting and property sectors.",
    url: "/industry-jobs",
  },
};

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

// Sniff the first dollar figure from a free-text salary for band filtering.
function salaryMatchesBand(salary: string | null, band: (typeof SALARY_BANDS)[number] | undefined): boolean {
  if (!band) return true;
  if (!salary) return false;
  const nums = salary.replace(/,/g, "").match(/\$?\s?(\d{2,3})(?:\s?k|000)?/gi);
  if (!nums) return false;
  const values = nums.map((m) => {
    const n = parseFloat(m.replace(/[^0-9.]/g, ""));
    return /k/i.test(m) || n < 1000 ? n * 1000 : n;
  });
  const top = Math.max(...values);
  return top >= band.min && top <= band.max;
}

export default async function IndustryJobsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const q = one(sp.q).trim();
  const state = one(sp.state);
  const location = one(sp.location).trim();
  const type = one(sp.type);
  const level = one(sp.level);
  const salary = one(sp.salary);
  const featuredOnly = one(sp.featured) === "1";

  const band = SALARY_BANDS.find((b) => b.value === salary);

  // Build the DB filter. Everything except salary band is filtered in SQL.
  const where: Prisma.JobWhereInput = {};
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { company_name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }
  if (state && (AU_STATES as readonly string[]).includes(state)) where.state = state as Prisma.JobWhereInput["state"];
  if (location) where.location = { contains: location, mode: "insensitive" };
  if (type) where.employment_type = type as Prisma.JobWhereInput["employment_type"];
  if (level) where.experience_level = level as Prisma.JobWhereInput["experience_level"];
  if (featuredOnly) where.is_featured = true;

  let featured: JobCardData[] = [];
  let latest: JobCardData[] = [];

  try {
    const rows = await prisma.job.findMany({
      where: activeJobWhere(where),
      orderBy: [{ is_featured: "desc" }, { published_at: "desc" }, { created_at: "desc" }],
      take: 200,
      select: {
        slug: true, title: true, company_name: true, company_logo_url: true, location: true,
        employment_type: true, salary: true, description: true, is_featured: true,
        published_at: true, created_at: true,
      },
    });
    const filtered = band ? rows.filter((r) => salaryMatchesBand(r.salary, band)) : rows;
    featured = filtered.filter((r) => r.is_featured);
    latest = filtered.filter((r) => !r.is_featured);
  } catch (err) {
    // Table may not exist yet (migration pending) — render an empty board.
    console.error("[industry-jobs] listing query failed:", err);
  }

  const hasFilters = Boolean(q || state || location || type || level || salary || featuredOnly);
  const inputCls =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-sky-950 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100";

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-700">
            <Briefcase size={18} />
            <span className="text-sm font-extrabold uppercase tracking-[0.2em]">Industry Jobs</span>
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-sky-950">Industry Jobs</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Find career opportunities across Australia&apos;s remedial building, strata, engineering, consulting and
            property sectors.
          </p>
        </div>
        <a
          href="/industry-jobs/post"
          className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
        >
          <Plus size={16} /> Post a Job
        </a>
      </div>

      {/* Filters (server-rendered GET form) */}
      <form method="get" className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
        <div className="relative mb-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input name="q" defaultValue={q} placeholder="Search jobs..." className={`${inputCls} pl-10`} />
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          <select name="state" defaultValue={state} className={inputCls}>
            <option value="">All States</option>
            {AU_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input name="location" defaultValue={location} placeholder="Location / suburb" className={inputCls} />
          <select name="type" defaultValue={type} className={inputCls}>
            <option value="">Any Type</option>
            {EMPLOYMENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <select name="salary" defaultValue={salary} className={inputCls}>
            <option value="">Any Salary</option>
            {SALARY_BANDS.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
          </select>
          <select name="level" defaultValue={level} className={inputCls}>
            <option value="">Any Experience</option>
            {EXPERIENCE_LEVELS.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-2 text-sm font-medium text-sky-950">
            <input type="checkbox" name="featured" value="1" defaultChecked={featuredOnly} className="h-4 w-4 rounded border-slate-300" />
            Featured only
          </label>
          <button type="submit" className="rounded-lg bg-sky-800 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-900">
            Apply filters
          </button>
          {hasFilters && (
            <a href="/industry-jobs" className="text-sm font-semibold text-slate-500 hover:text-red-700">Clear</a>
          )}
        </div>
      </form>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-extrabold tracking-tight text-sky-950">Featured Jobs</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((j) => <JobCard key={j.slug} job={j} />)}
          </div>
        </section>
      )}

      {/* Latest */}
      <section className="mt-10">
        <h2 className="mb-4 text-lg font-extrabold tracking-tight text-sky-950">
          {hasFilters ? "Results" : "Latest Jobs"}
        </h2>
        {latest.length === 0 && featured.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
            <p className="text-sm font-semibold text-slate-500">
              {hasFilters ? "No jobs match your filters." : "No jobs listed yet — check back soon."}
            </p>
            {hasFilters && <a href="/industry-jobs" className="mt-2 inline-block text-sm font-bold text-sky-700 hover:text-red-700">Clear filters</a>}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((j) => <JobCard key={j.slug} job={j} />)}
          </div>
        )}
      </section>
    </div>
  );
}
