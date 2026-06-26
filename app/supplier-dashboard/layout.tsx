import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function SupplierDashboardLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentDirectoryUser();
  if (!user || user.role !== "supplier_user") redirect("/directory/login?next=/supplier-dashboard");
  if (!user.supplier_id) redirect("/directory/login");

  const supplier = await prisma.supplier.findUnique({ where: { id: user.supplier_id }, select: { brand_name: true, slug: true, status: true } });

  const nav = [
    { href: "/supplier-dashboard", label: "Overview" },
    { href: "/supplier-dashboard/profile", label: "Profile" },
    { href: "/supplier-dashboard/products", label: "Products" },
    { href: "/supplier-dashboard/promotions", label: "Promotions" },
    { href: "/supplier-dashboard/billing", label: "Billing" },
    { href: "/supplier-dashboard/analytics", label: "Analytics" },
    { href: "/supplier-dashboard/update-requests", label: "Update Requests" },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-bold tracking-tight text-slate-900 hover:text-red-600 transition">
              Remedial Building Australia
            </Link>
            <span className="h-4 w-px bg-slate-300" />
            <span className="text-sm font-semibold text-slate-700">{supplier?.brand_name ?? "Supplier Portal"}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">{user.email}</span>
            <a
              href="/api/directory/logout"
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600"
            >
              Sign out
            </a>
            <a
              href="/directory/login"
              className="rounded-lg bg-red-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-800"
            >
              Login / Create Account
            </a>
          </div>
        </div>
        <nav className="mx-auto max-w-7xl px-6">
          <div className="flex gap-1 overflow-x-auto">
            {nav.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition border-b-2 border-transparent hover:border-slate-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
