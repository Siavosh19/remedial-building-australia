import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import DashboardNav from "@/components/directory/DashboardNav";


const STATUS_COLOR: Record<string, string> = {
  basic:                   "bg-slate-200 text-slate-700",
  contact_verified:        "bg-sky-100 text-sky-800",
  business_verified:       "bg-sky-200 text-sky-900",
  licence_verified:        "bg-blue-100 text-blue-800",
  practitioner_verified:   "bg-blue-200 text-blue-900",
  claimed:                 "bg-blue-100 text-blue-900",
  featured:                "bg-red-100 text-red-700",
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login");

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
  });

  if (user.role === "admin") redirect("/directory/admin");
  if (!company) redirect("/directory/signup/company");

  const statusCls = STATUS_COLOR[company.profile_status] ?? "bg-slate-700 text-slate-200";

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <header className="border-b border-sky-200 bg-sky-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm font-bold tracking-tight text-slate-950 hover:text-red-600 transition">
              Remedial Building Australia
            </a>
            <span className="h-4 w-px bg-sky-200" aria-hidden />
            <span className="text-sm font-semibold text-slate-600">{company.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide ${statusCls}`}>
              {company.profile_status.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase())}
            </span>
            <a
              href={`/directory/company/${company.slug}`}
              target="_blank"
              className="rounded-lg border border-sky-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-sky-400 hover:text-slate-900"
            >
              View listing ↗
            </a>
            <
              href="/api/directory/logout"
              className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-500"
            >
              Sign out
            </a>
          </div>
        </div>

        {/* Nav tabs */}
        <div className="mx-auto max-w-6xl px-6">
          <DashboardNav />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}
