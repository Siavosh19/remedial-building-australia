"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Globe,
  MessageSquare,
  Inbox,
  List,
  Eye,
  Pencil,
  Plus,
  CreditCard,
  KeyRound,
  Trash2,
  MailX,
  LifeBuoy,
  LogOut,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";

type Item = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  external?: boolean; // opens in a new tab (public listing)
  hash?: boolean;     // in-page anchor on the settings page
  view?: string;      // leads sub-view (new | all | viewed)
};
type Group = { key: string; title: string; items: Item[] };

// Nav reflects the real RBA workflow: businesses manage their listing, receive
// LEADS (they never quote on-platform), post jobs, and manage account settings.
function buildGroups(companySlug: string | null): Group[] {
  return [
    {
      key: "business",
      title: "My Business",
      items: [
        { href: "/directory/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
        { href: "/directory/dashboard/profile", label: "Edit Business Profile", icon: Building2 },
        {
          href: companySlug ? `/directory/company/${companySlug}` : "/directory/dashboard/profile",
          label: "Public Listing",
          icon: Globe,
          external: !!companySlug,
        },
        { href: "/directory/dashboard/quote-requests", label: "Listing Enquiries", icon: MessageSquare },
      ],
    },
    {
      key: "leads",
      title: "Leads",
      items: [
        { href: "/directory/dashboard/lead-requests?view=new", label: "New Leads", icon: Inbox, view: "new" },
        { href: "/directory/dashboard/lead-requests", label: "All Leads", icon: List, view: "all" },
        { href: "/directory/dashboard/lead-requests?view=viewed", label: "Viewed Leads", icon: Eye, view: "viewed" },
      ],
    },
    {
      key: "jobs",
      title: "Jobs Posted",
      items: [
        { href: "/directory/dashboard/jobs", label: "Edit Existing Jobs", icon: Pencil },
        { href: "/directory/dashboard/jobs/new", label: "Post New Job", icon: Plus },
      ],
    },
    {
      key: "settings",
      title: "Settings",
      items: [
        { href: "/directory/dashboard/subscription", label: "Subscription", icon: CreditCard },
        { href: "/directory/dashboard/settings#password", label: "Password Change", icon: KeyRound, hash: true },
        { href: "/directory/dashboard/settings#remove", label: "Remove Listing", icon: Trash2, hash: true },
        { href: "/directory/dashboard/settings#unsubscribe", label: "Unsubscribe", icon: MailX, hash: true },
        { href: "/contact", label: "Help & Support", icon: LifeBuoy, external: true },
      ],
    },
  ];
}

function itemActive(item: Item, pathname: string, view: string | null): boolean {
  if (item.external || item.hash) return false;
  const base = item.href.split("?")[0];
  if (item.exact) return pathname === base;
  if (base === "/directory/dashboard/lead-requests") {
    if (pathname !== base) return false;
    return (item.view ?? "all") === (view ?? "all");
  }
  if (base === "/directory/dashboard/jobs") {
    return pathname.startsWith(base) && !pathname.startsWith(`${base}/new`);
  }
  if (base === "/directory/dashboard/jobs/new") {
    return pathname.startsWith(base);
  }
  return pathname === base || pathname.startsWith(`${base}/`);
}

function NavLinks({
  group,
  pathname,
  view,
  onNavigate,
}: {
  group: Group;
  pathname: string;
  view: string | null;
  onNavigate?: () => void;
}) {
  return (
    <>
      {group.items.map((item) => {
        const active = itemActive(item, pathname, view);
        const Icon = item.icon;
        const cls = `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
          active ? "bg-white/10 font-semibold text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
        }`;
        if (item.external) {
          return (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={cls}>
              <Icon size={16} className="shrink-0" />
              <span className="flex-1">{item.label}</span>
              <ExternalLink size={12} className="shrink-0 text-white/30" />
            </a>
          );
        }
        return (
          <Link key={item.label} href={item.href} onClick={onNavigate} className={cls}>
            <Icon size={16} className={`shrink-0 ${active ? "text-red-400" : ""}`} />
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export default function PortalSidebar({ email, companySlug = null }: { email: string; companySlug?: string | null }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const groups = buildGroups(companySlug);

  // All groups start expanded so every destination (incl. Jobs) is visible at a
  // glance; the headers still collapse/expand on tap.
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {};
    for (const g of groups) state[g.key] = true;
    return state;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggle = (key: string) => setOpen((s) => ({ ...s, [key]: !s[key] }));

  function groupList(onNavigate?: () => void) {
    return groups.map((group) => {
      const isOpen = open[group.key];
      return (
        <div key={group.key} className="mb-2">
          <button
            onClick={() => toggle(group.key)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition hover:bg-white/5"
          >
            <span className="text-sm font-extrabold uppercase tracking-wider text-white">{group.title}</span>
            <ChevronDown size={16} className={`text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
          {isOpen && (
            <div className="mt-1 space-y-0.5 pl-1">
              <NavLinks group={group} pathname={pathname} view={view} onNavigate={onNavigate} />
            </div>
          )}
        </div>
      );
    });
  }

  const footer = (
    <div className="border-t border-white/10 p-4">
      <p className="mb-2 truncate px-1 text-xs text-white/40">{email}</p>
      <a
        href="/api/directory/logout"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white/70 transition hover:bg-red-600 hover:text-white"
      >
        <LogOut size={15} className="shrink-0" /> Sign out
      </a>
    </div>
  );

  return (
    <>
      {/* ── Mobile: hamburger (sits in the header strip) ─────────────────────── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-3 top-2.5 z-40 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 shadow-sm md:hidden"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* ── Mobile: slide-in drawer + backdrop ───────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} aria-hidden />
          <aside className="absolute left-0 top-0 flex h-full w-72 max-w-[84%] flex-col bg-sky-950 shadow-xl">
            <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
              <Link href="/" onClick={() => setMobileOpen(false)} className="text-sm font-bold text-white">
                Remedial Building Australia
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4">{groupList(() => setMobileOpen(false))}</nav>
            {footer}
          </aside>
        </div>
      )}

      {/* ── Desktop sidebar ──────────────────────────────────────────────────── */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sky-900/40 bg-sky-950 md:flex">
        <div className="flex h-16 items-center border-b border-white/10 px-5">
          <Link href="/" className="text-sm font-bold tracking-tight text-white transition hover:text-sky-300">
            Remedial Building Australia
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">{groupList()}</nav>
        {footer}
      </aside>
    </>
  );
}
