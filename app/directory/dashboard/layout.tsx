import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import PortalSidebar from "@/components/directory/PortalSidebar";
import { planLabel } from "@/lib/plans";


const STATUS_COLOR: Record<string, string> = {
  basic:    "bg-slate-100 text-slate-600",
  claimed:  "bg-sky-100 text-sky-800",
  featured: "bg-amber-100 text-amber-800",
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login");
  if (user.role === "admin") redirect("/directory/admin");

  // A listing is optional now: any account can reach the portal (e.g. to post
  // jobs) before it has a directory listing. The "My Business" pages prompt to
  // create one when it's missing.
  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: { id: true, name: true, slug: true, status: true, plan_type: true, profile_status: true },
  });

  const planDisplay = company ? planLabel(company.plan_type) : null;
  const statusCls = company ? (STATUS_COLOR[company.plan_type] ?? "bg-slate-100 text-slate-600") : "";

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      <PortalSidebar email={user.email} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Slim top bar — listing name, plan and quick link (only when a listing exists) */}
        {company ? (
          <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-3">
            <span className="truncate text-base font-semibold text-sky-950">{company.name}</span>
            <div className="flex items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-bold tracking-wide ${statusCls}`}>{planDisplay}</span>
              <a
                href={`/directory/company/${company.slug}`}
                target="_blank"
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-sky-800 transition hover:border-sky-300"
              >
                View listing ↗
              </a>
            </div>
          </header>
        ) : null}

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
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
            <div className="flex flex-col gap-2">
              <a href="/directory" className="hover:text-sky-700">Business Directory</a>
              <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
              <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
              <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="/advertise" className="hover:text-sky-700">Advertise With Us</a>
              <a href="/contact" className="hover:text-sky-700">Contact</a>
              <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
              <a href="/terms" className="hover:text-sky-700">Terms</a>
              <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>
      </div>
    </div>
  );
}
