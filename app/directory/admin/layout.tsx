import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <AdminSidebar email={user.email} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center border-b border-slate-200 bg-white pl-16 pr-4 md:px-6">
          <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">Admin Panel</span>
          <a
            href="/api/directory/logout"
            className="ml-auto rounded-lg bg-red-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-800"
          >
            Sign out
          </a>
        </header>
        <main className="flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6">{children}</main>
      </div>
    </div>
  );
}
