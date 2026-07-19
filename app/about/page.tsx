import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "About | Remedial Building Australia",
  description:
    "Remedial Building Australia is a strata and remedial building platform connecting owners corporations, strata managers, building managers, contractors, consultants, engineers, suppliers and industry professionals across Australia.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="rounded-2xl border-l-4 border-red-700 bg-[linear-gradient(135deg,rgba(185,28,28,0.16)_0%,rgba(185,28,28,0.06)_12%,#ffffff_30%,#ffffff_100%)] p-7 shadow-sm sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-700">
            About
          </p>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-sky-950 sm:text-3xl">
            Remedial Building Australia
          </h1>
          <div className="mt-5 flex flex-col gap-4 text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
            <p>
              Remedial Building Australia is a strata and remedial building platform connecting
              owners corporations, strata managers, building managers, contractors, consultants,
              engineers, suppliers and industry professionals across Australia.
            </p>
            <p>
              The platform includes a business directory, job board, request quote system,
              industry news and technical resources for the remedial building sector.
            </p>
            <p>
              Key resources include the Defect Library, Repair Solutions, Repair System Selector,
              Material Index, AI Scope Writer, courses and technical guidance covering
              waterproofing, concrete repair, façades, roofing, structural repairs, drainage,
              basements and building defects.
            </p>
            <p>
              The platform also includes an Expert Remedial Advice section, offering services such
              as Scope, Quote &amp; Tender Review, Remedial Budget Estimates, Building Repair
              Strategy Advice and Capital Works Forecasts for strata-related building repair
              decisions.
            </p>
          </div>
        </div>
      </main>

      {/* Footer — standard site links */}
      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">
              Remedial Building Australia
            </div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              Australia&rsquo;s strata and remedial building platform — directory, Strata
              Connect quote requests, defect library, repair systems and expert remedial
              advice.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <div className="flex flex-col gap-2">
              <Link href="/about" className="hover:text-sky-700">About</Link>
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
