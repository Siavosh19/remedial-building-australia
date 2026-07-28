"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map as MapIcon, FileText, Download } from "lucide-react";

export default function WorkspaceTabs({ projectId }: { projectId: string }) {
  const pathname = usePathname();
  const base = `/measuremap/projects/${projectId}`;
  const tabs = [
    { href: `${base}/map`, label: "Map", icon: MapIcon },
    { href: `${base}/drawings`, label: "Drawings", icon: FileText },
    { href: `${base}/export`, label: "Export", icon: Download },
  ];
  return (
    <div className="flex gap-1 border-b border-slate-200 bg-white px-3 text-sm font-semibold">
      {tabs.map((t) => {
        const active = pathname === t.href || (t.href.endsWith("/map") && pathname === base);
        const Icon = t.icon;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`flex items-center gap-1.5 border-b-2 px-3 py-2 transition ${
              active ? "border-slate-900 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Icon className="h-4 w-4" /> {t.label}
          </Link>
        );
      })}
    </div>
  );
}
