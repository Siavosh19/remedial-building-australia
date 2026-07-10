"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Inbox,
  CreditCard,
  Settings,
  Briefcase,
  Plus,
  ClipboardList,
  FilePlus2,
  LogOut,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

type Item = { href: string; label: string; icon: LucideIcon; exact?: boolean; soon?: boolean };
type Group = { key: string; title: string; items: Item[] };

const GROUPS: Group[] = [
  {
    key: "business",
    title: "My Business",
    items: [
      { href: "/directory/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
      { href: "/directory/dashboard/profile", label: "Profile", icon: Building2 },
      { href: "/directory/dashboard/quote-requests", label: "Listing Enquiries", icon: MessageSquare },
      { href: "/directory/dashboard/lead-requests", label: "Matched Leads", icon: Inbox },
      { href: "/directory/dashboard/subscription", label: "Subscription", icon: CreditCard },
      { href: "/directory/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
  {
    key: "jobs",
    title: "Jobs",
    items: [
      { href: "/directory/dashboard/jobs", label: "Manage Jobs", icon: Briefcase },
      { href: "/directory/dashboard/jobs/new", label: "Post a Job", icon: Plus },
    ],
  },
  {
    key: "quotes",
    title: "Request Quotes",
    items: [
      { href: "/directory/dashboard/quotes/new", label: "Request a Quote", icon: FilePlus2 },
      { href: "/directory/dashboard/quotes", label: "My Quote Requests", icon: ClipboardList },
    ],
  },
];

function itemActive(item: Item, pathname: string) {
  if (item.soon) return false;
  if (item.exact) return pathname === item.href;
  if (item.href === "/directory/dashboard/jobs") {
    return pathname.startsWith("/directory/dashboard/jobs") && pathname !== "/directory/dashboard/jobs/new";
  }
  if (item.href === "/directory/dashboard/quotes") {
    return pathname.startsWith("/directory/dashboard/quotes") && pathname !== "/directory/dashboard/quotes/new";
  }
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

function NavLinks({ group, pathname }: { group: Group; pathname: string }) {
  return (
    <>
      {group.items.map((item) => {
        const active = itemActive(item, pathname);
        const Icon = item.icon;
        if (item.soon) {
          return (
            <span key={item.label} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/30">
              <Icon size={16} className="shrink-0" />
              {item.label}
            </span>
          );
        }
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
              active ? "bg-white/10 font-semibold text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon size={16} className={`shrink-0 ${active ? "text-red-400" : ""}`} />
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

export default function PortalSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  // A group starts open if it contains the active route; default the first open.
  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {};
    for (const g of GROUPS) state[g.key] = g.items.some((i) => itemActive(i, pathname));
    if (!Object.values(state).some(Boolean)) state[GROUPS[0].key] = true;
    return state;
  });

  const toggle = (key: string) => setOpen((s) => ({ ...s, [key]: !s[key] }));

  return (
    <>
      {/* Desktop left sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sky-900/40 bg-sky-950 md:flex">
        <div className="flex h-16 items-center border-b border-white/10 px-5">
          <Link href="/" className="text-sm font-bold tracking-tight text-white transition hover:text-sky-300">
            Remedial Building Australia
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {GROUPS.map((group) => {
            const isOpen = open[group.key];
            return (
              <div key={group.key} className="mb-2">
                <button
                  onClick={() => toggle(group.key)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition hover:bg-white/5"
                >
                  <span className="text-sm font-extrabold uppercase tracking-wider text-white">{group.title}</span>
                  <ChevronDown
                    size={16}
                    className={`text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="mt-1 space-y-0.5 pl-1">
                    <NavLinks group={group} pathname={pathname} />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <p className="mb-2 truncate px-1 text-xs text-white/40">{email}</p>
          <a
            href="/api/directory/logout"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white/70 transition hover:bg-red-600 hover:text-white"
          >
            <LogOut size={15} className="shrink-0" /> Sign out
          </a>
        </div>
      </aside>

      {/* Mobile top nav — collapsible sections stacked */}
      <div className="sticky top-0 z-20 border-b border-sky-900/40 bg-sky-950 md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-bold text-white">Remedial Building Australia</Link>
          <a href="/api/directory/logout" className="text-xs font-semibold text-white/70 hover:text-white">Sign out</a>
        </div>
        <div className="px-3 pb-3">
          {GROUPS.map((group) => {
            const isOpen = open[group.key];
            return (
              <div key={group.key} className="mb-1">
                <button
                  onClick={() => toggle(group.key)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left"
                >
                  <span className="text-sm font-extrabold uppercase tracking-wider text-white">{group.title}</span>
                  <ChevronDown size={16} className={`text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="space-y-0.5 pb-1 pl-1">
                    <NavLinks group={group} pathname={pathname} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
