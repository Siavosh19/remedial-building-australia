import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import CompanySetupForm from "@/components/directory/CompanySetupForm";
import AuthHeader from "@/components/AuthHeader";

export default async function DirectoryCompanySetupPage() {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login");
  if (user.role === "supplier_user") redirect("/supplier-dashboard/setup");

  const existingCompany = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
  });

  if (existingCompany) redirect("/directory/dashboard");

  // Categories a business can pick: the top-level trades PLUS the product/material
  // supplier sub-categories (labelled "(Supplier)" so they're distinct), sorted A–Z.
  // Flat searchable list — matches the directory taxonomy.
  const rawCats = await prisma.category.findMany({
    where: { is_active: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true, parent_id: true },
  });
  const categories = [
    ...rawCats.filter((c) => c.parent_id == null).map((c) => ({ id: c.id, name: c.name })),
    ...rawCats.filter((c) => c.parent_id != null).map((c) => ({ id: c.id, name: `${c.name} (Supplier)` })),
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
    <AuthHeader />
    <div className="mx-auto max-w-5xl px-6 py-10">
    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
      <h1 className="text-3xl font-extrabold text-slate-950">Grow your business with Remedial Building Australia</h1>
      <p className="mt-3 text-slate-600">Complete your company profile and submit it for review.</p>
      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
        {[
          "Build a professional online profile",
          "Be found by owners, strata managers and consultants",
          "Receive direct quote requests (Silver & Gold)",
          "Upgrade, downgrade or cancel anytime — no lock-in contracts",
        ].map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-slate-600">
            <span className="mt-0.5 font-bold text-emerald-600">✓</span> {b}
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <CompanySetupForm categories={categories} />
      </div>
    </div>
    </div>
    </div>
  );
}
