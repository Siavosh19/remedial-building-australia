import { redirect } from "next/navigation";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { getListingTiers } from "@/lib/jobs-pricing";
import JobForm from "@/components/jobs/JobForm";
import { Briefcase } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PostJobPage() {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login?next=/directory/dashboard/jobs/new");

  const pricing = await getListingTiers();

  return (
    <div>
      <a href="/directory/dashboard/jobs" className="text-sm font-bold text-slate-900 hover:text-black">← Manage Jobs</a>
      <div className="mt-3 flex items-center gap-2 text-red-700">
        <Briefcase size={18} />
        <span className="text-sm font-extrabold uppercase tracking-[0.2em]">Post a Job</span>
      </div>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-sky-950">Advertise a role</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Fill in the details, preview your listing, then pay to publish. Your job stays live for 30 days and
        applications come straight to your inbox and dashboard.
      </p>

      <JobForm mode="create" employerEmail={user.email} pricing={pricing} />
    </div>
  );
}
