"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Dashboard", href: "/client/dashboard" },
  { label: "New Quote Request", href: "/client/quote-requests/new" },
  { label: "My Quote Requests", href: "/client/quote-requests" },
  { label: "Documents", href: "/client/documents" },
  { label: "Account Settings", href: "/client/settings" },
];

export default function ClientDashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto">
      {NAV.map(({ label, href }) => {
        const isActive =
          pathname === href ||
          (href === "/client/quote-requests" &&
            pathname.startsWith("/client/quote-requests/") &&
            pathname !== "/client/quote-requests/new");
        return (
          <Link
            key={href}
            href={href}
            className={`relative whitespace-nowrap px-4 py-3 text-base font-semibold transition focus:outline-none ${
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
