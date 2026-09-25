"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { slug: "", label: "Overview" },
  { slug: "/lots", label: "Strata roll" },
  { slug: "/budget", label: "Budget" },
  { slug: "/levies", label: "Levies" },
  { slug: "/arrears", label: "Arrears" },
  { slug: "/members", label: "People" },
];

export default function SchemeTabs({ schemeId }: { schemeId: number }) {
  const pathname = usePathname();
  const base = `/client/strata/${schemeId}`;

  return (
    <nav className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
      {TABS.map((t) => {
        const href = `${base}${t.slug}`;
        const active = t.slug === "" ? pathname === base : pathname.startsWith(href);
        return (
          <Link
            key={t.label}
            href={href}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
              active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
