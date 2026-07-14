import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentDirectoryUser, userHasClientAccess } from "@/lib/directory-auth";
import ClientPortalSidebar from "@/components/client/ClientPortalSidebar";
import RoleSwitcher from "@/components/RoleSwitcher";
import NotificationBell from "@/components/NotificationBell";
import PushRegister from "@/components/PushRegister";

export default async function ClientLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login");
  // Admin/supplier accounts have their own homes; everyone else can switch into
  // client mode (a ClientProfile is provisioned by /api/account/switch).
  if (user.role === "admin" || user.role === "super_admin") redirect("/directory/admin");
  if (user.role === "supplier_user") redirect("/supplier-dashboard");
  if (!(await userHasClientAccess(user))) redirect("/api/account/switch?to=client");

  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      <ClientPortalSidebar email={user.email} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar — hamburger space (mobile), role switch, bell */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-slate-200 bg-white pl-16 pr-4 md:pl-6">
          <div className="min-w-0 flex-1">
            <span className="truncate text-sm font-semibold text-sky-950 sm:text-base">Client Portal</span>
          </div>
          <RoleSwitcher className="hidden md:inline-flex" />
          <NotificationBell />
        </header>

        {/* Mobile role switch — full width under the bar */}
        <div className="border-b border-slate-200 bg-white px-4 py-2 md:hidden">
          <RoleSwitcher className="flex w-full" />
        </div>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
        <PushRegister />

        <footer className="border-t border-sky-200 bg-slate-100">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-sky-900">
              RBA is a directory and quote request platform. RBA does not recommend, endorse, supervise, verify
              workmanship, or act as a builder, consultant, superintendent, or project manager. Users must make their own
              enquiries before engaging any business.
            </p>
          </div>
          <div className="mx-auto max-w-7xl border-t border-slate-200 px-4 py-5 text-xs text-slate-400 sm:px-6">
            © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
