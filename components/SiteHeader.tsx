"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

// ── Mobile menu row styling (clean horizontal rows, navy text, subtle dividers) ──
const mRow =
  "flex w-full items-center border-b border-slate-100 border-l-2 border-l-transparent px-5 py-3.5 text-[15px] font-medium text-sky-900 transition hover:bg-sky-50 hover:text-sky-950";

export default function SiteHeader() {
  const pathname = usePathname();
  const isAuthPage = !!pathname && (pathname.startsWith("/directory/login") || pathname.startsWith("/directory/signup"));
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Lock body scroll while the slide-in drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileNavOpen]);

  return (
    <>
    <header data-site-header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 md:gap-4 md:px-8 md:py-5">
        <div className="flex min-w-0 items-center gap-2 xl:shrink-0">
          <button
            className="xl:hidden shrink-0 p-1 text-sky-900"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="min-w-0">
              <div className="text-base font-extrabold tracking-tight text-sky-950 sm:text-lg">
                Remedial Building Australia
              </div>
              <div className="mt-0.5 max-w-[17rem] text-[13px] font-medium leading-snug text-slate-600 sm:max-w-[23rem] sm:text-[15px]">
                Australia&rsquo;s strata directory and remedial building platform for news and industry connections.
              </div>
            </div>
          </Link>
        </div>

        <nav className="hidden items-center gap-4 text-sm font-semibold text-sky-800 xl:flex">
          <Link href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</Link>
          <Link href="/materials-products-index" className="whitespace-nowrap hover:text-red-700 transition">Materials Index</Link>
          <Link href="/directory" className="whitespace-nowrap hover:text-red-700 transition">Directory</Link>
          <Link href="/directory/login" className="whitespace-nowrap hover:text-red-700 transition">Request Quotes</Link>
          <Link href="/industry-news" className="whitespace-nowrap hover:text-red-700 transition">News &amp; Insights</Link>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {!isAuthPage && (
            <Link
              href="/directory/login"
              className="inline-flex shrink-0 items-center rounded-lg bg-red-700 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-red-800 transition sm:px-3.5 sm:py-1.5 sm:text-xs"
            >
              <span className="sm:hidden">Login</span>
              <span className="hidden sm:inline">Login / Create Account</span>
            </Link>
          )}
        </div>
      </div>
      </header>
      {/* Mobile slide-in drawer (off-canvas from the left) — rendered outside the
          blurred <header> so its fixed positioning isn't clipped by the hero. */}
      <div
        className={`fixed inset-0 z-[60] xl:hidden ${mobileNavOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileNavOpen}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileNavOpen(false)}
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${mobileNavOpen ? "opacity-100" : "opacity-0"}`}
        />
        {/* Panel */}
        <div
          className={`absolute left-0 top-0 flex h-full w-80 max-w-[85%] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between border-b border-sky-100 px-5 py-4">
            <span className="text-sm font-extrabold uppercase tracking-[0.15em] text-sky-950">Menu</span>
            <button onClick={() => setMobileNavOpen(false)} aria-label="Close menu" className="p-1 text-slate-500 transition hover:text-red-700">
              <X size={22} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col overflow-y-auto">
            <Link href="/" onClick={() => setMobileNavOpen(false)} className={mRow}>Home</Link>

            <Link href="/directory" onClick={() => setMobileNavOpen(false)} className={mRow}>Business Directory</Link>
            <Link href="/directory/login" onClick={() => setMobileNavOpen(false)} className={mRow}>Request Quotes</Link>
            <Link href="/industry-news" onClick={() => setMobileNavOpen(false)} className={mRow}>News &amp; Insights</Link>
            <Link href="/materials-products-index" onClick={() => setMobileNavOpen(false)} className={mRow}>Materials Index</Link>
          </nav>
        </div>
      </div>
    </>
  );
}
