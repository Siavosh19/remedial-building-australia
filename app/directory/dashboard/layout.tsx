import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import DashboardNav from "@/components/directory/DashboardNav";


const STATUS_COLOR: Record<string, string> = {
  basic:    "bg-white/10 text-white/70",
  claimed:  "bg-sky-400/20 text-sky-200",
  featured: "bg-amber-400/20 text-amber-200",
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login");

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: { id: true, name: true, slug: true, status: true, plan_type: true, profile_status: true },
  });

  if (user.role === "admin") redirect("/directory/admin");
  if (!company) redirect("/directory/signup/company");

  const planLabel = company.plan_type === "featured" ? "Featured Profile" : company.plan_type === "claimed" ? "Claimed Profile" : "Basic Listing";
  const statusCls = STATUS_COLOR[company.plan_type] ?? "bg-slate-100 text-slate-600";

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Top bar */}
      <header className="border-b border-sky-900/40 bg-sky-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-4">
            <a href="/" className="text-base font-bold tracking-tight text-white transition hover:text-sky-300">
              Remedial Building Australia
            </a>
            <span className="h-4 w-px bg-white/20" aria-hidden />
            <span className="text-base font-semibold text-white/75">{company.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`rounded-full px-3 py-1 text-sm font-bold tracking-wide ${statusCls}`}>
              {planLabel}
            </span>
            <a
              href={`/directory/company/${company.slug}`}
              target="_blank"
              className="rounded-lg border border-white/20 px-3 py-1.5 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
            >
              View listing ↗
            </a>
            <a
              href="/api/directory/logout"
              className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-bold text-white transition hover:bg-red-500"
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
