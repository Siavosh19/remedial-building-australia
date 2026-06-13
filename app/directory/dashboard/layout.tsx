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
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:gap-6 md:px-6 md:py-4">
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
        <div className="mx-auto max-w-6xl overflow-x-auto px-2 md:px-6">
          <DashboardNav />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {children}
      </main>

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            <a href="/directory" className="hover:text-sky-700">Business Directory</a>
            <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>
    </div>
  );
}
