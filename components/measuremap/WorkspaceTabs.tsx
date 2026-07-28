"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// 48px project tab bar. Sky-blue active state (primary #0369a1) matching the
// Remedial Estimating design system. Only routes that exist are shown.
export default function WorkspaceTabs({ projectId }: { projectId: string }) {
  const pathname = usePathname();
  const base = `/measuremap/projects/${projectId}`;
  const tabs = [
    { href: `${base}/overview`, label: "Overview" },
    { href: `${base}/map`, label: "Map Measure" },
    { href: `${base}/drawings`, label: "Plans & Takeoffs" },
    { href: `${base}/export`, label: "Export" },
  ];
  return (
    <div className="flex h-12 items-end border-b border-[#D8DDE1] bg-white px-5">
      {tabs.map((t) => {
        const active = pathname === t.href || (t.href.endsWith("/overview") && pathname === base);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={[
              "relative flex h-full items-center px-5 text-[13px] font-medium transition",
              active ? "text-[#0369a1]" : "text-[#343A3E] hover:text-[#0c4a6e]",
            ].join(" ")}
          >
            {t.label}
            {active && <span className="absolute bottom-0 left-0 h-[3px] w-full bg-[#0369a1]" />}
          </Link>
        );
      })}
    </div>
  );
}
