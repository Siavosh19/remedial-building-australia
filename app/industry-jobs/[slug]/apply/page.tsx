import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { activeJobWhere } from "@/lib/jobs";
import ApplyForm from "./ApplyForm";
import { Building2 } from "lucide-react";

export const dynamic = "force-dynamic";

async function getJob(slug: string) {
  try {
    return await prisma.job.findFirst({
      where: activeJobWhere({ slug }),
      select: { slug: true, title: true, company_name: true, company_logo_url: true, location: true },
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  return {
    title: job ? `Apply — ${job.title} | Industry Jobs` : "Apply | Industry Jobs",
    robots: { index: false },
  };
}

export default async function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  return (
    <div className="mx-auto max-w-2xl px-5 py-10">
      <a href={`/industry-jobs/${job.slug}`} className="text-sm font-semibold text-sky-700 hover:text-red-700">
        ← Back to job
      </a>

      <div className="mt-4 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
          {job.company_logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={job.company_logo_url} alt={job.company_name} className="h-full w-full object-contain" />
          ) : (
            <Building2 className="text-slate-300" size={24} />
          )}
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-sky-950">Apply for {job.title}</h1>
          <p className="text-sm font-semibold text-slate-500">{job.company_name} · {job.location}</p>
        </div>
      </div>

      <ApplyForm jobSlug={job.slug} />
    </div>
  );
}
