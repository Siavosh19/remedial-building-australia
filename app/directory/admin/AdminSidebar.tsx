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
  ChevronDown,
  Menu,
  X,
  RefreshCw,
  FileCheck,
  MessageSquare,
  List,
  Pencil,
  Lightbulb,
  Newspaper,
  Tags,
  Briefcase,
  Inbox,
  DollarSign,
} from "lucide-react";

type NavItem = { href: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };

// A single always-visible entry point, then the rest grouped into collapsible
// sections so the sidebar reads as ~7 headings instead of one long 23-item list.
const DASHBOARD: NavItem = { href: "/directory/admin", label: "Dashboard", icon: LayoutDashboard, exact: true };

const NAV_GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: "Directory",
    items: [
      { href: "/directory/admin/directory-companies", label: "Directory Companies", icon: List },
      { href: "/directory/admin/claims", label: "Claim Requests", icon: FileCheck },
      { href: "/directory/admin/directory-signups", label: "Directory Signups", icon: Users },
      { href: "/directory/admin/update-requests", label: "Update Requests", icon: RefreshCw },
    ],
  },
  {
    label: "Leads & Quotes",
    items: [
      { href: "/directory/admin/quote-requests", label: "Quote Requests", icon: MessageSquare },
      { href: "/directory/admin/client-quote-requests", label: "Client Quote Requests", icon: ClipboardList },
      { href: "/directory/admin/strata-intake", label: "Strata Connect", icon: Inbox },
      { href: "/directory/admin/client-users", label: "Client Users", icon: Users },
      { href: "/directory/admin/expert-advice-requests", label: "Expert Advice Requests", icon: Lightbulb },
    ],
  },
  {
    label: "Suppliers & Jobs",
    items: [
      { href: "/directory/admin/jobs", label: "Jobs Management", icon: Briefcase },
      { href: "/directory/admin/suppliers", label: "Suppliers", icon: Building2 },
      { href: "/directory/admin/supplier-marketing", label: "Promotions", icon: Megaphone },
    ],
  },
  {
    label: "Billing & Plans",
    items: [
      { href: "/directory/admin/billing", label: "Billing", icon: CreditCard },
      { href: "/directory/admin/plans", label: "Plans & Pricing", icon: Tags },
      { href: "/directory/admin/lead-pricing", label: "Lead Pricing", icon: DollarSign },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/directory/admin/news-articles", label: "News Articles", icon: Newspaper },
      { href: "/directory/admin/rba-insights", label: "RBA Insights", icon: Pencil },
      { href: "/directory/admin/news-subscribers", label: "Subscribers", icon: Mail },
    ],
  },
  {
    label: "AI & Analytics",
    items: [
      { href: "/directory/admin/ai-scope-users", label: "AI Scope Users", icon: Bot },
      { href: "/directory/admin/analytics", label: "Analytics", icon: BarChart2 },
      { href: "/directory/admin/audit-log", label: "Audit Log", icon: ClipboardList },
    ],
  },
  {
    label: "System",
    items: [{ href: "/directory/admin/settings", label: "Settings", icon: Settings }],
  },
];

// Flat list (dashboard + every grouped item) — used for the collapsed icon rail.
const ALL_ITEMS: NavItem[] = [DASHBOARD, ...NAV_GROUPS.flatMap((g) => g.items)];

export default function AdminSidebar({ email }: { email: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  function isActive(item: NavItem) {
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  }

  // Start with only the group holding the current page expanded; the rest closed.
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(NAV_GROUPS.map((g) => [g.label, g.items.some((it) => isActive(it))])),
  );
  const toggleGroup = (label: string) => setOpenGroups((o) => ({ ...o, [label]: !o[label] }));

  function itemLink(item: NavItem, { labels, indent, onNavigate }: { labels: boolean; indent?: boolean; onNavigate?: () => void }) {
    const active = isActive(item);
    const Icon = item.icon;
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onNavigate}
        title={!labels ? item.label : undefined}
        className={`flex items-center gap-3 py-2.5 text-sm transition ${indent && labels ? "pl-7 pr-4" : "px-4"} ${
          active ? "bg-slate-800 text-white font-semibold" : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
        }`}
      >
        <Icon size={16} className={`shrink-0 ${active ? "text-red-400" : ""}`} />
        {labels && <span className="truncate">{item.label}</span>}
      </Link>
    );
  }

  // The nav body. When `labels` is false (desktop collapsed rail) we drop the
  // group headings and just show every icon flat, so nothing is hidden behind a
  // collapsed section the user can't expand.
  function navContent({ labels, onNavigate }: { labels: boolean; onNavigate?: () => void }) {
    if (!labels) return <>{ALL_ITEMS.map((it) => itemLink(it, { labels: false }))}</>;
    return (
      <>
        {itemLink(DASHBOARD, { labels: true, onNavigate })}
        {NAV_GROUPS.map((group) => {
          const open = openGroups[group.label];
          const hasActive = group.items.some((it) => isActive(it));
          return (
            <div key={group.label} className="mt-1">
              <button
                onClick={() => toggleGroup(group.label)}
                className={`flex w-full items-center justify-between px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  hasActive ? "text-slate-300" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <span>{group.label}</span>
                <ChevronDown size={14} className={`shrink-0 transition-transform ${open ? "" : "-rotate-90"}`} />
              </button>
              {open && <div>{group.items.map((it) => itemLink(it, { labels: true, indent: true, onNavigate }))}</div>}
            </div>
          );
        })}
      </>
    );
  }

  return (
    <>
      {/* ── Mobile: hamburger (sits in the header strip) ─────────────────────── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-3 top-2.5 z-40 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 shadow-sm md:hidden"
        aria-label="Open admin menu"
      >
        <Menu size={18} />
      </button>

      {/* ── Mobile: slide-in drawer + backdrop ───────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} aria-hidden />
          <aside className="absolute left-0 top-0 flex h-full w-64 max-w-[82%] flex-col border-r border-slate-800 bg-slate-950 shadow-xl">
            <div className="flex h-14 items-center justify-between border-b border-slate-800 px-4">
              <Link href="/" onClick={() => setMobileOpen(false)} className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-red-400 transition">
                RBA Admin
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition"
                aria-label="Close admin menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-3">
              {navContent({ labels: true, onNavigate: () => setMobileOpen(false) })}
            </nav>
            <div className="border-t border-slate-800 p-3">
              <p className="mb-2 truncate px-1 text-xs text-slate-500">{email}</p>
              <a
                href="/api/directory/logout"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 hover:bg-red-600 hover:text-white transition"
              >
                <LogOut size={15} className="shrink-0" />
                <span>Sign out</span>
              </a>
            </div>
          </aside>
        </div>
      )}

      {/* ── Desktop sidebar ──────────────────────────────────────────────────── */}
      <aside
        className={`relative hidden h-screen flex-col border-r border-slate-800 bg-slate-950 transition-all duration-200 md:flex ${
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
          {navContent({ labels: !collapsed })}
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
    </>
  );
}
