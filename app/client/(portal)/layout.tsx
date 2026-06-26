import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import ClientDashboardNav from "@/components/client/ClientDashboardNav";

export default async function ClientLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login");
  // Wrong account type — send each role to its own home.
  if (user.role !== "client_user") {
    redirect(
      user.role === "supplier_user"
        ? "/supplier-dashboard"
        : user.role === "admin" || user.role === "super_admin"
          ? "/directory/admin"
          : "/directory/dashboard",
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <header className="border-b border-sky-900/40 bg-sky-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-4">
            <a href="/" className="text-base font-bold tracking-tight text-white transition hover:text-sky-300">
              Remedial Building Australia
            </a>
            <span className="h-4 w-px bg-white/20" aria-hidden />
            <span className="text-base font-semibold text-white/75">Strata / Client Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-white/60 sm:inline">{user.full_name ?? user.email}</span>
            <a
              href="/api/directory/logout"
              className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-bold text-white transition hover:bg-red-500"
            >
              Sign out
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <ClientDashboardNav />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-sky-900">
            RBA is a directory and quote request platform. RBA does not recommend, endorse, supervise, verify
            workmanship, or act as a builder, consultant, superintendent, or project manager. Users must make their own
            enquiries before engaging any business.
          </p>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-6 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
