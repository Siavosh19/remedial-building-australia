import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, SlidersHorizontal, Package, ArrowRight, AlertCircle } from "lucide-react";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Repair Systems — Remedial Building Australia",
  description:
    "Explore technical repair systems, choose the right system for your project, or browse materials and products for Australian remedial building practice.",
};

const CARDS = [
  {
    icon: BookOpen,
    title: "Repair Systems Library",
    description: "Browse technical repair system categories and system pages.",
    button: "Browse Library",
    href: "/repair-systems/library",
  },
  {
    icon: SlidersHorizontal,
    title: "System Selector",
    description: "Find the right repair system for your project by defect, location, substrate, and application.",
    button: "Open Selector",
    href: "/repair-systems/system-selector",
  },
  {
    icon: Package,
    title: "Materials & Products Index",
    description: "Browse materials and products by brand, material type, and repair system page.",
    button: "Browse Index",
    href: "/materials-products-index",
  },
] as const;

export default function RepairSystemsGatewayPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <SiteHeader />

      {/* Under-development notice */}
      <div className="border-b border-amber-200 bg-amber-50">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-6 py-3 text-sm text-amber-900">
          <span aria-hidden>🚧</span>
          <span><span className="font-semibold">This section is still under development.</span> Content is being added and refined — some pages may be incomplete.</span>
        </div>
      </div>

      <main>

        {/* ── Hero ── */}
        <section className="border-b border-slate-200 bg-white px-4 sm:px-8 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-sky-700 transition">Home</Link>
              <span>/</span>
              <span className="text-sky-950">Repair Systems</span>
            </nav>
            <PageNav />

            {/* Red accent bar */}
            <div className="mb-6 h-1 w-12 rounded-full bg-red-700" />

            <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-700">Remedial Building Australia</p>
            <h1 className="mt-3 text-5xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-6xl">
              Repair Systems
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500">
              Explore technical repair systems, choose the right system for your project, or browse materials and products.
            </p>
          </div>
        </section>

        {/* ── Three entrance cards ── */}
        <section className="px-4 sm:px-8 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-3">
              {CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <a
                    key={card.href}
                    href={card.href}
                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                  >
                    {/* Icon */}
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-sky-950 transition group-hover:border-sky-200 group-hover:bg-sky-50">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>

                    {/* Text */}
                    <div className="mb-0.5 h-0.5 w-6 rounded-full bg-red-700" />
                    <h2 className="mt-4 text-xl font-extrabold leading-snug text-sky-950 transition group-hover:text-sky-700">
                      {card.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
                      {card.description}
                    </p>

                    {/* Button */}
                    <div className="mt-8 inline-flex items-center gap-2 self-start rounded-xl border border-sky-950 px-5 py-2.5 text-sm font-bold text-sky-950 transition group-hover:bg-sky-950 group-hover:text-white">
                      {card.button} <ArrowRight size={14} />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA banner ── */}
        <section className="px-8 pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-sky-100 bg-sky-950 px-4 sm:px-8 py-10 md:px-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white">
                    Not sure which repair system applies?
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-sky-200">
                    Use the System Selector to choose the most appropriate repair system for your project.
                  </p>
                </div>
                <Link
                  href="/repair-systems/system-selector"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-sky-950 transition hover:bg-sky-100"
                >
                  Open System Selector <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Technical note ── */}
        <section className="px-8 pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-6 py-4">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-600" />
              <p className="text-xs leading-5 text-amber-800">
                System recommendations are general in nature. Always refer to manufacturer documentation, relevant standards, and project-specific design advice before specification.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <SeoCrossPromo />

      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <Link href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Home</Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <div className="flex flex-col gap-2">
              <Link href="/directory" className="hover:text-sky-700">Business Directory</Link>
              <Link href="/repair-systems" className="hover:text-sky-700">Repair Systems</Link>
              <Link href="/defect-library" className="hover:text-sky-700">Defect Library</Link>
              <Link href="/industry-news" className="hover:text-sky-700">News &amp; Insights</Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/advertise" className="hover:text-sky-700">Advertise With Us</Link>
              <Link href="/contact" className="hover:text-sky-700">Contact</Link>
              <Link href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-sky-700">Terms</Link>
              <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>
    </div>
  );
}
