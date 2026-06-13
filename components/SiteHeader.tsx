"use client";

import { useState } from "react";
import { Menu, ChevronDown } from "lucide-react";

const expertServices = [
  { title: "Preliminary Defect Assessment",       href: "/expert-remedial-advice/preliminary-defect-assessment" },
  { title: "Scope, Quote & Tender Review",         href: "/expert-remedial-advice/scope-quote-tender-review" },
  { title: "Remedial Budget Estimate",             href: "/expert-remedial-advice/remedial-budget-estimate" },
  { title: "Building Repair Strategy Advice",      href: "/expert-remedial-advice/building-repair-strategy-advice" },
  { title: "Pre-Purchase Apartment Defect Review", href: "/expert-remedial-advice/pre-purchase-apartment-defect-review" },
  { title: "Capital Works Forecast",               href: "/expert-remedial-advice/capital-works-forecast" },
];

export default function SiteHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [expertOpen, setExpertOpen] = useState(false);
  const [mobileExpertOpen, setMobileExpertOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 md:gap-8 md:px-8">
        <a href="/" className="flex shrink-0 items-center gap-3">
          <div>
            <div className="text-lg font-extrabold tracking-tight text-sky-950">
              Remedial Building Australia
            </div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">
              Technical Remedial Building Platform
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-sky-800 md:flex">
          <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
          <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700 transition">Repair Systems</a>
          <div
            className="relative"
            onMouseEnter={() => setExpertOpen(true)}
            onMouseLeave={() => { setTimeout(() => setExpertOpen(false), 150); }}
          >
            <a
              href="/expert-remedial-advice"
              className="flex items-center gap-1 whitespace-nowrap hover:text-red-700 transition"
            >
              Expert Advice
              <ChevronDown size={13} className={`mt-px transition-transform duration-200 ${expertOpen ? "rotate-180" : ""}`} />
            </a>
            {expertOpen && (
              <div className="absolute left-0 top-full z-50 mt-1 w-72 rounded-xl border border-sky-100 bg-white py-2 shadow-lg">
                {expertServices.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    className="block px-4 py-2.5 text-sm font-semibold text-sky-800 hover:bg-sky-50 hover:text-red-700 transition"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="/directory" className="whitespace-nowrap hover:text-red-700 transition">Directory</a>
          <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700 transition">AI Scope Builder</a>
          <a href="/industry-news" className="whitespace-nowrap hover:text-red-700 transition">News &amp; Insights</a>
        </nav>

        <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        <button
          className="md:hidden p-1"
          onClick={() => setMobileNavOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>
      </div>
      {mobileNavOpen && (
        <div className="border-t border-sky-100 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-semibold text-sky-800">
            <a href="/" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Home</a>
            <a href="/repair-systems" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Repair Systems</a>
            <div>
              <button
                className="flex w-full items-center justify-between hover:text-red-700 transition"
                onClick={() => setMobileExpertOpen((o) => !o)}
              >
                <span>Expert Advice</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${mobileExpertOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileExpertOpen && (
                <div className="ml-4 mt-2 flex flex-col gap-3 border-l-2 border-sky-100 pl-4">
                  {expertServices.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      onClick={() => setMobileNavOpen(false)}
                      className="text-sm font-medium text-sky-700 hover:text-red-700 transition"
                    >
                      {s.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a href="/ai-scope-builder" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">AI Scope Builder</a>
            <a href="/defect-library" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Defect Library</a>
            <a href="/directory" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">Business Directory</a>
            <a href="/industry-news" onClick={() => setMobileNavOpen(false)} className="hover:text-red-700 transition">News &amp; Insights</a>
            <a href="/directory/login" onClick={() => setMobileNavOpen(false)} className="mt-2 inline-flex rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 transition">Login / Create Account</a>
          </nav>
        </div>
      )}
    </header>
  );
}
