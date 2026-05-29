import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import CompanySetupForm from "@/components/directory/CompanySetupForm";

export default async function DirectoryCompanySetupPage() {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login");

  const existingCompany = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
  });

  if (existingCompany) redirect("/directory/dashboard");

  const categories = await prisma.category.findMany({ where: { is_active: true }, orderBy: { display_order: "asc" } });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
    <div className="mx-auto max-w-5xl px-6 py-10">
    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
      <h1 className="text-3xl font-extrabold text-slate-950">Set up your company listing</h1>
      <p className="mt-3 text-slate-600">Complete your company profile and submit it for review.</p>
      <div className="mt-10">
        <CompanySetupForm categories={categories} />
      </div>
    </div>
    </div>
    </div>
  );
}
