"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Wrench, Building2 } from "lucide-react";

// One login, two dashboards, shown as full-width browser-style tabs across the
// top of the portal. The active side is derived from the URL and rendered white
// (selected); the inactive side is greyed out and swaps when the other tab is
// clicked. Each side links through /api/account/switch so the client profile is
// provisioned on the first switch. Uses <a> (full navigation) so the server
// redirect runs.
export default function RoleSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const isClient = !!pathname && pathname.startsWith("/client");

  const tab = (active: boolean) =>
    `flex flex-1 items-center justify-center gap-2 px-4 py-3 text-xs font-bold transition sm:text-sm md:text-base ${
      active
        ? "bg-white text-sky-950 border-b-2 border-sky-600"
        : "bg-slate-100 text-slate-500 border-b border-slate-200 hover:bg-slate-50 hover:text-slate-700"
    }`;

  return (
    <div
      className={`flex w-full divide-x divide-slate-200 ${className}`}
      role="tablist"
      aria-label="Switch account mode"
    >
      <Link
        href="/api/account/switch?to=business"
        className={tab(!isClient)}
        role="tab"
        aria-selected={!isClient}
      >
        <Wrench size={17} className="shrink-0" />
        <span className="whitespace-nowrap">Manage My Business</span>
      </Link>
      <Link
        href="/api/account/switch?to=client"
        className={tab(isClient)}
        role="tab"
        aria-selected={isClient}
      >
        <Building2 size={17} className="shrink-0" />
        <span className="whitespace-nowrap">Client Quote Requests</span>
      </Link>
    </div>
  );
}
