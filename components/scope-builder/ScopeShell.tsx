"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/repair-systems", label: "Repair Systems" },
  { href: "/industry-news", label: "News & Insights" },
  { href: "/ai-scope-builder", label: "AI Scope Builder" },
];

interface Props {
  children: React.ReactNode;
  activePath?: string;
  bgClass?: string;
}

export function ScopeShell({ children, activePath = "/ai-scope-builder", bgClass = "bg-slate-50" }: Props) {
  return (
    <div className={`min-h-screen ${bgClass} text-slate-800`}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>

      <header className="no-print sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">
                Technical Defect Database
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === "/" ? activePath === "/" : activePath.startsWith(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap transition ${
                    isActive ? "text-red-700" : "hover:text-red-700"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          <Menu className="md:hidden text-sky-950" size={22} />
        </div>
      </header>

      {children}

      <footer className="no-print mt-16 border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12">
          <Link
            href="/"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
          >
            ← Home
          </Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <Link href="/about" className="hover:text-sky-700">About</Link>
            <Link href="/contact" className="hover:text-sky-700">Contact</Link>
            <Link href="/terms" className="hover:text-sky-700">Terms</Link>
            <Link href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</Link>
            <Link href="/defect-library" className="hover:text-sky-700">Defect Library</Link>
            <Link href="/repair-systems" className="hover:text-sky-700">Repair Systems</Link>
            <Link href="/industry-news" className="hover:text-sky-700">News &amp; Insights</Link>
            <Link href="/directory" className="hover:text-sky-700">Business Directory</Link>
            <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>
    </div>
  );
}
