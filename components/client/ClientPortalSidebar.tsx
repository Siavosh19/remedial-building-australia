"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  FilePlus2,
  Pencil,
  Settings,
  LogOut,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

type Item = { key: string; href: string; label: string; icon: LucideIcon };

const ITEMS: Item[] = [
  { key: "overview", href: "/client/dashboard", label: "Overview", icon: LayoutDashboard },
  { key: "requests", href: "/client/quote-requests", label: "My Quote Requests", icon: ClipboardList },
  { key: "new", href: "/client/quote-requests/new", label: "Create New Quote Request", icon: FilePlus2 },
  { key: "edit", href: "/client/quote-requests?mode=edit", label: "Edit Existing Quote Requests", icon: Pencil },
  { key: "settings", href: "/client/settings", label: "Settings", icon: Settings },
];

function activeKey(pathname: string, mode: string | null): string {
  if (pathname === "/client/dashboard") return "overview";
  if (pathname.startsWith("/client/quote-requests/new")) return "new";
  if (pathname.endsWith("/edit")) return "edit";
  if (pathname === "/client/quote-requests" && mode === "edit") return "edit";
  if (pathname.startsWith("/client/quote-requests")) return "requests";
  if (pathname.startsWith("/client/settings")) return "settings";
  return "";
}

export default function ClientPortalSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const mode = useSearchParams().get("mode");
  const current = activeKey(pathname, mode);
  const [mobileOpen, setMobileOpen] = useState(false);

  function links(onNavigate?: () => void) {
    return ITEMS.map((item) => {
      const active = current === item.key;
      const Icon = item.icon;
      return (
        <Link
          key={item.key}
          href={item.href}
          onClick={onNavigate}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
            active ? "bg-white/10 font-semibold text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Icon size={16} className={`shrink-0 ${active ? "text-red-400" : ""}`} />
          {item.label}
        </Link>
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
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-3 top-2.5 z-40 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 shadow-sm md:hidden"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} aria-hidden />
          <aside className="absolute left-0 top-0 flex h-full w-72 max-w-[84%] flex-col bg-sky-950 shadow-xl">
            <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
              <span className="text-sm font-bold text-white">Client Portal</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">{links(() => setMobileOpen(false))}</nav>
            {footer}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sky-900/40 bg-sky-950 md:flex">
        <div className="flex h-16 items-center border-b border-white/10 px-5">
          <Link href="/" className="text-sm font-bold tracking-tight text-white transition hover:text-sky-300">
            Remedial Building Australia
          </Link>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">{links()}</nav>
        {footer}
      </aside>
    </>
  );
}
