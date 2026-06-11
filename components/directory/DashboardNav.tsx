"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Overview",        href: "/directory/dashboard" },
  { label: "Profile",         href: "/directory/dashboard/profile" },
  { label: "Quote Requests",  href: "/directory/dashboard/quote-requests" },
  { label: "Subscription",    href: "/directory/dashboard/subscription" },
  { label: "Settings",        href: "/directory/dashboard/settings" },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1">
      {NAV.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`relative px-4 py-3 text-sm font-semibold transition ${
              isActive
                ? "text-slate-950 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-red-600 after:content-['']"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
