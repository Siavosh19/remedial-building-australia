"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Wrench, Building2 } from "lucide-react";

// Airbnb-style role switch. One login, two dashboards. The active side is derived
// from the URL; each side links through /api/account/switch so the client profile
// is provisioned on the first switch. Uses <a> (full navigation) so the server
// redirect runs.
export default function RoleSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const isClient = !!pathname && pathname.startsWith("/client");

  const seg = (active: boolean) =>
    `flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
      active ? "bg-white text-sky-950 shadow-sm" : "text-slate-500 hover:text-slate-700"
    }`;

  return (
    <div
      className={`inline-flex items-center rounded-full border border-slate-200 bg-slate-100 p-0.5 ${className}`}
      role="tablist"
      aria-label="Switch account mode"
    >
      <Link href="/api/account/switch?to=business" className={seg(!isClient)} role="tab" aria-selected={!isClient}>
        <Wrench size={13} className="shrink-0" />
        <span className="whitespace-nowrap">Service Business</span>
      </Link>
      <Link href="/api/account/switch?to=client" className={seg(isClient)} role="tab" aria-selected={isClient}>
        <Building2 size={13} className="shrink-0" />
        <span className="whitespace-nowrap">Client</span>
      </Link>
    </div>
  );
}
