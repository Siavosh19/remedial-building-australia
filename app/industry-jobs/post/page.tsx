import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentEmployer } from "@/lib/jobs-auth";
import { getJobPricingByKey, formatAud } from "@/lib/jobs-pricing";
import JobForm from "@/components/jobs/JobForm";
import { Briefcase } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Post a Job | Industry Jobs",
  description: "Advertise a role to Australia's remedial building, strata, engineering and property community.",
};

async function pricingLabels() {
  try {
    const [std, feat] = await Promise.all([getJobPricingByKey("standard"), getJobPricingByKey("featured")]);
    return {
      standard: std ? formatAud(std.amount_cents) : null,
      featured: feat ? formatAud(feat.amount_cents) : null,
    };
  } catch {
    return { standard: null, featured: null };
  }
}

export default async function PostJobPage() {
  const employer = await getCurrentEmployer();
  if (!employer) redirect("/industry-jobs/employer/login?next=/industry-jobs/post");

  const pricing = await pricingLabels();

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div className="flex items-center gap-2 text-red-700">
        <Briefcase size={18} />
        <span className="text-sm font-extrabold uppercase tracking-[0.2em]">Post a Job</span>
      </div>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-950">Advertise a role</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Fill in the details, preview your listing, then pay to publish. Your job stays live for 30 days and
        applications come straight to your inbox and dashboard.
      </p>

      <JobForm mode="create" employerEmail={employer.email} pricing={pricing} />
    </div>
  );
}
