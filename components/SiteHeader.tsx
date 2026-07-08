"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, X } from "lucide-react";

const repairSystemsLinks = [
  { title: "Repair Systems Library",       href: "/repair-systems/library" },
  { title: "System Selector",              href: "/repair-systems/system-selector" },
  { title: "Materials & Products Index",   href: "/materials-products-index" },
];

const expertServices = [
  { title: "Preliminary Defect Assessment",       href: "/expert-remedial-advice/preliminary-defect-assessment" },
  { title: "Scope, Quote & Tender Review",         href: "/expert-remedial-advice/scope-quote-tender-review" },
  { title: "Remedial Budget Estimate",             href: "/expert-remedial-advice/remedial-budget-estimate" },
  { title: "Building Repair Strategy Advice",      href: "/expert-remedial-advice/building-repair-strategy-advice" },
  { title: "Pre-Purchase Apartment Defect Review", href: "/expert-remedial-advice/pre-purchase-apartment-defect-review" },
  { title: "Capital Works Forecast",               href: "/expert-remedial-advice/capital-works-forecast" },
];

// ── Mobile menu row styling (clean horizontal rows, navy text, subtle dividers) ──
const mRow =
  "flex w-full items-center border-b border-slate-100 border-l-2 border-l-transparent px-5 py-3.5 text-[15px] font-medium text-sky-900 transition hover:bg-sky-50 hover:text-sky-950";
const mRowActive = "text-red-600 border-l-red-600 hover:text-red-700"; // active/expanded parent
const mSubRow =
  "flex w-full items-center border-b border-sky-100 px-5 py-3 pl-9 text-[14px] font-medium text-sky-800 transition hover:bg-sky-100 hover:text-sky-950";

// ── Desktop dropdown panel + rows (light blue-tinted panel, blue left line) ──
const dPanel =
  "absolute left-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-xl border border-sky-100 border-l-2 border-l-sky-300 bg-sky-50 shadow-lg";
const dRow =
  "block border-b border-sky-100 px-5 py-3 text-[14px] font-medium text-sky-800 transition last:border-b-0 hover:bg-sky-100 hover:text-sky-950";

export default function SiteHeader() {
  const pathname = usePathname();
  const isAuthPage = !!pathname && (pathname.startsWith("/directory/login") || pathname.startsWith("/directory/signup"));
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [expertOpen, setExpertOpen] = useState(false);
  const [mobileExpertOpen, setMobileExpertOpen] = useState(false);
  const [repairOpen, setRepairOpen] = useState(false);
  const [mobileRepairOpen, setMobileRepairOpen] = useState(false);
  const expertCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const repairCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lock body scroll while the slide-in drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileNavOpen]);

  // Keep the Expert Advice dropdown open while the cursor is over the trigger
  // or the menu; only close it ~500ms after the cursor actually leaves.
  const openExpert = () => {
    if (expertCloseTimer.current) {
      clearTimeout(expertCloseTimer.current);
      expertCloseTimer.current = null;
    }
    setExpertOpen(true);
  };
  const closeExpertSoon = () => {
    if (expertCloseTimer.current) clearTimeout(expertCloseTimer.current);
    expertCloseTimer.current = setTimeout(() => setExpertOpen(false), 500);
  };

  // Same hover behaviour for the Repair Systems dropdown.
  const openRepair = () => {
    if (repairCloseTimer.current) {
      clearTimeout(repairCloseTimer.current);
      repairCloseTimer.current = null;
    }
    setRepairOpen(true);
  };
  const closeRepairSoon = () => {
    if (repairCloseTimer.current) clearTimeout(repairCloseTimer.current);
    repairCloseTimer.current = setTimeout(() => setRepairOpen(false), 500);
  };

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:gap-8 md:px-8 md:py-5">
        <div className="flex min-w-0 items-center gap-2 xl:shrink-0">
          <button
            className="xl:hidden shrink-0 p-1 text-sky-900"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <a href="/" className="flex min-w-0 items-center gap-3">
            <div className="min-w-0">
              <div className="text-base font-extrabold tracking-tight text-sky-950 sm:text-lg">
                Remedial Building Australia
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-900 sm:text-xs sm:tracking-[0.22em]">
                Technical Remedial Building Platform
              </div>
            </div>
          </a>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-sky-800 xl:flex">
          <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
          <div
            className="relative"
            onMouseEnter={openRepair}
            onMouseLeave={closeRepairSoon}
          >
            <a
              href="/repair-systems"
              className="flex items-center gap-1 whitespace-nowrap hover:text-red-700 transition"
            >
              Repair Systems
              <ChevronDown size={13} className={`mt-px transition-transform duration-200 ${repairOpen ? "rotate-180" : ""}`} />
            </a>
            {repairOpen && (
              <div className={dPanel}>
                {repairSystemsLinks.map((s) => (
                  <a key={s.href} href={s.href} className={dRow}>
                    {s.title}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div
            className="relative"
            onMouseEnter={openExpert}
            onMouseLeave={closeExpertSoon}
          >
            <a
              href="/expert-remedial-advice"
              className="flex items-center gap-1 whitespace-nowrap hover:text-red-700 transition"
            >
              Expert Advice
              <ChevronDown size={13} className={`mt-px transition-transform duration-200 ${expertOpen ? "rotate-180" : ""}`} />
            </a>
            {expertOpen && (
              <div className={dPanel}>
                {expertServices.map((s) => (
                  <a key={s.href} href={s.href} className={dRow}>
                    {s.title}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="/directory" className="whitespace-nowrap hover:text-red-700 transition">Directory</a>
          <a href="/request-quotes" className="whitespace-nowrap hover:text-red-700 transition">Request Quotes</a>
          <a href="/industry-news" className="whitespace-nowrap hover:text-red-700 transition">News &amp; Insights</a>
          <a href="/industry-jobs" className="whitespace-nowrap hover:text-red-700 transition">Industry Jobs</a>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          {!isAuthPage && (
            <a
              href="/directory/login"
              className="inline-flex shrink-0 items-center rounded-lg bg-red-700 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-red-800 transition sm:px-3.5 sm:py-1.5 sm:text-xs"
            >
              <span className="sm:hidden">Login</span>
              <span className="hidden sm:inline">Login / Create Account</span>
            </a>
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
            <a href="/" onClick={() => setMobileNavOpen(false)} className={mRow}>Home</a>

            {/* Repair Systems — expandable */}
            <div className="flex flex-col">
              <button
                className={`${mRow} justify-between ${mobileRepairOpen ? mRowActive : ""}`}
                onClick={() => setMobileRepairOpen((o) => !o)}
              >
                <span>Repair Systems</span>
                <ChevronDown size={15} className={`transition-transform duration-200 ${mobileRepairOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileRepairOpen && (
                <div className="flex flex-col border-l-2 border-sky-300 bg-sky-50/70">
                  <a href="/repair-systems" onClick={() => setMobileNavOpen(false)} className={mSubRow}>
                    Repair Systems Overview
                  </a>
                  {repairSystemsLinks.map((s) => (
                    <a key={s.href} href={s.href} onClick={() => setMobileNavOpen(false)} className={mSubRow}>
                      {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Expert Advice — expandable */}
            <div className="flex flex-col">
              <button
                className={`${mRow} justify-between ${mobileExpertOpen ? mRowActive : ""}`}
                onClick={() => setMobileExpertOpen((o) => !o)}
              >
                <span>Expert Advice</span>
                <ChevronDown size={15} className={`transition-transform duration-200 ${mobileExpertOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileExpertOpen && (
                <div className="flex flex-col border-l-2 border-sky-300 bg-sky-50/70">
                  {expertServices.map((s) => (
                    <a key={s.href} href={s.href} onClick={() => setMobileNavOpen(false)} className={mSubRow}>
                      {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="/defect-library" onClick={() => setMobileNavOpen(false)} className={mRow}>Defect Library</a>
            <a href="/directory" onClick={() => setMobileNavOpen(false)} className={mRow}>Business Directory</a>
            <a href="/request-quotes" onClick={() => setMobileNavOpen(false)} className={mRow}>Request Quotes</a>
            <a href="/industry-news" onClick={() => setMobileNavOpen(false)} className={mRow}>News &amp; Insights</a>
            <a href="/industry-jobs" onClick={() => setMobileNavOpen(false)} className={mRow}>Industry Jobs</a>
          </nav>
        </div>
      </div>
    </>
  );
}
