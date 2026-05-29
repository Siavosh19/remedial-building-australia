import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentAdminUser } from "@/lib/directory-auth";

export default async function AdminReviewLayout({ children }: { children: ReactNode }) {
  const admin = await getCurrentAdminUser();
  if (!admin) redirect("/directory/login");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3 text-sm">
            <Link href="/directory" className="text-slate-500 hover:text-slate-900 transition">
              Directory
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-900">Admin Review Queue</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">{admin.email}</span>
            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
              Admin
            </span>
            <a
              href="/api/directory/logout"
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
