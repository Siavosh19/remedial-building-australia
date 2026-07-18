import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";
export const metadata: Metadata = {
  title: "AI Scope Builder — Coming Soon — Remedial Building Australia",
  description:
    "The AI Scope Builder for Australian Class 2 strata remedial works is coming soon — AI-assisted scope of works generation for waterproofing, concrete repair, façade and drainage defects.",
};

export default function AIScopeBuilderComingSoonPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-8 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700">
              Coming Soon
            </span>
            <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-6xl">
              AI Scope Builder
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              AI-assisted scope of works generation for Australian Class 2 strata remedial works — waterproofing, concrete repair, façade, sealants and drainage defects.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-500">
              We are finishing development. The AI Scope Builder will be available shortly.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/repair-systems"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
              >
                Browse Repair Systems
              </Link>
              <Link
                href="/defect-library"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-sky-950 transition hover:border-sky-300 hover:shadow-sm"
              >
                Defect Library
              </Link>
            </div>
          </div>
        </section>

        <section className="px-8 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-extrabold text-sky-950">What the AI Scope Builder will do</h2>
              <p className="mt-2 text-sm text-slate-500">Generate complete remedial scopes in minutes — structured for Australian strata and Class 2 buildings.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  num: "01",
                  title: "Enter project details",
                  desc: "Building address, type, occupancy, access constraints and coastal exposure.",
                },
                {
                  num: "02",
                  title: "Identify defects",
                  desc: "Add defects by category, type, location, severity and estimated extent.",
                },
                {
                  num: "03",
                  title: "Select repair systems",
                  desc: "Choose from curated product categories matched to each defect type.",
                },
                {
                  num: "04",
                  title: "Specify materials",
                  desc: "Pick brand products, quantities and application notes.",
                },
                {
                  num: "05",
                  title: "Generate scope",
                  desc: "AI assembles a structured scope of works document ready for review.",
                },
                {
                  num: "06",
                  title: "Export & use",
                  desc: "Download as PDF or Word — ready to include in reports and tenders.",
                },
              ].map((step) => (
                <div key={step.num} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-red-700">{step.num}</p>
                  <h3 className="text-sm font-extrabold text-sky-950">{step.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <Link href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Home</Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
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
