"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Overview",        href: "/directory/dashboard" },
  { label: "Profile",         href: "/directory/dashboard/profile" },
  { label: "Quote Requests",  href: "/directory/dashboard/quote-requests" },
  { label: "Lead Requests",   href: "/directory/dashboard/lead-requests" },
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
            className={`relative px-4 py-3 text-base font-semibold transition focus:outline-none ${
              isActive
                ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-red-500 after:content-['']"
                : "text-white/55 hover:text-white/90"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
