import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import CompanyEditForm from "@/components/directory/CompanyEditForm";

export const dynamic = "force-dynamic";

export default async function DashboardProfilePage() {
  const user = await getCurrentDirectoryUser();
  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user?.id ?? 0 } } },
    include: {
      locations: true,
      company_categories: true,
      media: { orderBy: [{ media_type: "asc" }, { sort_order: "asc" }] },
    },
  });

  const categories = await prisma.category.findMany({
    where: { is_active: true },
    orderBy: { display_order: "asc" },
  });

  const planLabel =
    company?.plan_type === "featured" ? "Featured Profile" :
    company?.plan_type === "claimed"  ? "Claimed Profile"  : "Basic Listing";

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">Company profile</h1>
            <p className="mt-2 text-slate-600">
              {company?.plan_type === "basic"
                ? "Upgrade to a Claimed Profile to unlock full profile editing, photos, licence details, and quote requests."
                : "Keep your listing up to date. Changes take effect immediately."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
              {company?.status ?? "draft"}
            </span>
            <span className={`rounded-full px-4 py-2 text-sm font-semibold ${
              company?.plan_type === "featured" ? "bg-amber-100 text-amber-800" :
              company?.plan_type === "claimed"  ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"
            }`}>
              {planLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">ABN</p>
            <p className="mt-2 font-semibold text-slate-900">{company?.abn ?? "—"}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Profile completeness</p>
            <p className="mt-2 font-semibold text-slate-900 capitalize">{planLabel}</p>
          </div>
        </div>

        {company ? (
          <CompanyEditForm company={company} categories={categories} />
        ) : (
          <p className="text-slate-600">No company found. Please complete your company setup first.</p>
        )}
      </div>
    </div>
  );
}
