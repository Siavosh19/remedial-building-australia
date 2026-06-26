"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Megaphone,
  CreditCard,
  Bot,
  BarChart2,
  ClipboardList,
  Mail,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  FileCheck,
  MessageSquare,
  List,
  Pencil,
  Lightbulb,
  Newspaper,
  Tags,
} from "lucide-react";

const NAV = [
  { href: "/directory/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/directory/admin/directory-companies", label: "Directory Companies", icon: List },
  { href: "/directory/admin/claims", label: "Claim Requests", icon: FileCheck },
  { href: "/directory/admin/quote-requests", label: "Quote Requests", icon: MessageSquare },
  { href: "/directory/admin/client-quote-requests", label: "Client Quote Requests", icon: ClipboardList },
  { href: "/directory/admin/client-users", label: "Client Users", icon: Users },
  { href: "/directory/admin/expert-advice-requests", label: "Expert Advice Requests", icon: Lightbulb },
  { href: "/directory/admin/suppliers", label: "Suppliers", icon: Building2 },
  { href: "/directory/admin/supplier-marketing", label: "Promotions", icon: Megaphone },
  { href: "/directory/admin/billing", label: "Billing", icon: CreditCard },
  { href: "/directory/admin/plans", label: "Plans & Pricing", icon: Tags },
  { href: "/directory/admin/ai-scope-users", label: "AI Scope Users", icon: Bot },
  { href: "/directory/admin/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/directory/admin/audit-log", label: "Audit Log", icon: ClipboardList },
  { href: "/directory/admin/news-articles", label: "News Articles", icon: Newspaper },
  { href: "/directory/admin/rba-insights", label: "RBA Insights", icon: Pencil },
  { href: "/directory/admin/update-requests", label: "Update Requests", icon: RefreshCw },
  { href: "/directory/admin/news-subscribers", label: "Subscribers", icon: Mail },
  { href: "/directory/admin/directory-signups", label: "Directory Signups", icon: Users },
  { href: "/directory/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({ email }: { email: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  function isActive(item: (typeof NAV)[number]) {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  }

  return (
    <aside
      className={`relative flex h-screen flex-col border-r border-slate-800 bg-slate-950 transition-all duration-200 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-slate-800 px-4">
        {!collapsed && (
          <Link href="/" className="flex-1 text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-red-400 transition">
            RBA Admin
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-800 hover:text-slate-200 transition"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        {NAV.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                active
                  ? "bg-slate-800 text-white font-semibold"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              }`}
            >
              <Icon size={16} className={`shrink-0 ${active ? "text-red-400" : ""}`} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-3">
        {!collapsed && (
          <p className="mb-2 truncate px-1 text-xs text-slate-500">{email}</p>
        )}
        <a
          href="/api/directory/logout"
          title={collapsed ? "Sign out" : undefined}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-red-600 hover:text-white transition"
        >
          <LogOut size={15} className="shrink-0" />
          {!collapsed && <span>Sign out</span>}
        </a>
      </div>
    </aside>
  );
}
