import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentDirectoryUser();
  if (!user || user.role !== "admin") redirect("/directory/login");

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm font-bold tracking-tight text-white hover:text-red-400 transition">
              Remedial Building Australia
            </a>
            <span className="h-4 w-px bg-slate-700" />
            <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">{user.email}</span>
            <a
              href="/api/directory/logout"
              className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-red-600 hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
