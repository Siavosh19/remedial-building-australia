import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import PortalSidebar from "@/components/directory/PortalSidebar";
import RoleSwitcher from "@/components/RoleSwitcher";
import NotificationBell from "@/components/NotificationBell";
import PushRegister from "@/components/PushRegister";
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
      <PortalSidebar email={user.email} companySlug={company?.slug ?? null} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar — hamburger space (mobile), listing name/plan, role switch, bell */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white pl-16 pr-4 md:pl-6">
          <div className="min-w-0 flex-1">
            <span className="truncate text-sm font-semibold text-sky-950 sm:text-base">
              {company ? company.name : "Business portal"}
            </span>
            {company && planDisplay && (
              <span className={`ml-2 hidden rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide sm:inline ${statusCls}`}>
                {planDisplay}
              </span>
            )}
          </div>
          <RoleSwitcher className="hidden md:inline-flex" />
          <NotificationBell />
          {company && (
            <a
              href={`/directory/company/${company.slug}`}
              target="_blank"
              className="hidden rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-sky-800 transition hover:border-sky-300 sm:inline-block"
            >
              View listing ↗
            </a>
          )}
        </header>

        {/* Mobile role switch — full width under the bar */}
        <div className="border-b border-slate-200 bg-white px-4 py-2 md:hidden">
          <RoleSwitcher className="flex w-full" />
        </div>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-6 pb-24 sm:px-6 sm:pt-8 md:pb-10">
          {children}
        </main>
        <PushRegister />

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
              <Link href="/directory" className="hover:text-sky-700">Business Directory</Link>
              <Link href="/repair-systems" className="hover:text-sky-700">Repair Systems</Link>
              <Link href="/defect-library" className="hover:text-sky-700">Defect Library</Link>
              <Link href="/industry-news" className="hover:text-sky-700">News &amp; Insights</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/advertise" className="hover:text-sky-700">Advertise With Us</Link>
              <Link href="/contact" className="hover:text-sky-700">Contact</Link>
              <Link href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-sky-700">Terms</Link>
              <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 pt-5 pb-24 text-xs text-slate-400 md:pb-5">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>
      </div>
    </div>
  );
}
