import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import ServiceSchema from "@/components/expert-advice/ServiceSchema";
import PageNav from "@/components/PageNav";

const suitableFor = [
  "Owners corporations considering different remedial repair options",
  "Strata managers needing early technical direction before obtaining quotes",
  "Committees unsure whether to repair, replace, stage or upgrade building elements",
  "Buildings with balcony waterproofing, hob, balustrade or door threshold issues",
  "Projects where the correct membrane system or repair system is unclear",
  "Buildings with lintel corrosion, façade cracking, render failure or concrete spalling",
  "Projects involving roof membranes, planter boxes, window leaks or external envelope defects",
  "Clients unsure whether they need a builder, engineer, architect, façade consultant, waterproofing consultant or other specialist",
  "Situations where previous repairs have failed and a better long-term strategy is needed",
  "Projects where multiple repair options exist and the client wants practical guidance before proceeding",
];

const includes = [
  "Review of supplied photos, reports, drawings, scopes or background information",
  "Strategic advice on possible repair approaches",
  "Comment on suitable repair systems or construction methods",
  "Preliminary comments on waterproofing, membranes, drainage, hobs, thresholds and balcony detailing where applicable",
  "Review of balustrade, façade, lintel, window, door, roof or concrete repair strategy where relevant",
  "Comment on whether repair, replacement, upgrade or staged works may be more appropriate",
  "Identification of key risks that may affect cost, durability, access, sequencing or future maintenance",
  "Advice on likely consultant, engineer, architect, builder or specialist involvement required",
  "Comment on issues that may need further investigation before final design or tendering",
  "Practical recommendations to help the client decide the next step before spending money on detailed documentation or construction pricing",
];

export const metadata: Metadata = {
  title: "Building Repair Strategy Advice | Expert Remedial Advice",
  description:
    "Tailored, risk-based repair strategy advice that prioritises the right remedial works in the right order to protect your building and its value.",
  alternates: { canonical: "/expert-remedial-advice/building-repair-strategy-advice" },
};

export default function BuildingRepairStrategyAdvicePage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />
      <ServiceSchema
        name="Building Repair Strategy Advice"
        description="Tailored, risk-based repair strategy advice that prioritises the right remedial works in the right order to protect your building and its value."
        path="/expert-remedial-advice/building-repair-strategy-advice"
      />

      <main className="px-6 py-10">
        <section className="mx-auto max-w-4xl">

          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/expert-remedial-advice" className="hover:text-sky-700 transition">Expert Remedial Advice</Link>
            <span>›</span>
            <span className="text-sky-800">Building Repair Strategy Advice</span>
          </div>
          <PageNav />

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Expert Remedial Advice</p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight text-sky-950 sm:text-3xl md:text-4xl">
            Building Repair Strategy Advice
          </h1>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 h-1 w-10 rounded-full bg-red-700" />
              <h2 className="text-base font-bold text-sky-950">What It Is</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Building Repair Strategy Advice is for owners, strata managers and committees who need guidance on the best practical repair approach before committing to design, tendering or construction.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This service is suitable where there may be more than one possible repair method, system or design approach, and the client needs help understanding which option may be more suitable, practical or cost-effective.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We review the supplied photos, reports, drawings, scope information or background details and provide strategic advice on possible repair approaches. This may include comments on waterproofing systems, balcony detailing, balustrade options, hobs, lintels, façade repairs, window and door interfaces, concrete spalling repairs, roof membranes, planter boxes, drainage, access and staging.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The aim is to help clients understand the likely repair pathway, avoid poor system selection, reduce future variation risk, and make better decisions before engaging consultants, engineers, architects, builders or specialist contractors.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 h-1 w-10 rounded-full bg-red-700" />
              <h2 className="text-base font-bold text-sky-950">Who It&apos;s For</h2>
              <p className="mb-3 mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Suitable for</p>
              <ul className="space-y-1.5">
                {suitableFor.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
              <div className="mb-3 h-1 w-10 rounded-full bg-red-700" />
              <h2 className="text-base font-bold text-sky-950">What It Includes</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3.5 3.5L13 4.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Call to action */}
          <div className="mt-6 rounded-xl bg-sky-950 px-6 py-5 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300">How It Works</p>
            <p className="mt-2 text-sm leading-6 text-sky-100">
              Submit your details, photos and documents on the next page. We will review your submission and confirm a fixed fee before any work begins.
            </p>
            <Link
              href="/expert-remedial-advice/building-repair-strategy-advice/request"
              className="mt-4 inline-flex rounded-xl bg-red-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-600"
            >
              Request This Advice
            </Link>
          </div>

        </section>
      </main>

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <Link href="/expert-remedial-advice" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">
            ← Expert Remedial Advice
          </Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 md:grid-cols-[1.2fr_1fr]">
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
              <Link href="/faq" className="hover:text-sky-700">FAQ</Link>
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
