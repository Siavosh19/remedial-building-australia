import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import ServiceSchema from "@/components/expert-advice/ServiceSchema";
import PageNav from "@/components/PageNav";

const suitableFor = [
  "Owners corporations planning future remedial or capital works",
  "Strata managers preparing early budget advice for committees",
  "Committees unsure what repair options may be available",
  "Buildings considering façade upgrades or external envelope repairs",
  "Units affected by magnesite, damp flooring or internal substrate issues",
  "Buildings with ageing roof membranes, balcony membranes or waterproofing systems",
  "Projects where the client wants to compare basic repair, staged repair or full upgrade options",
  "Situations where a rough budget is needed before engaging consultants or preparing tenders",
  "Owners who need early cost guidance before deciding whether to proceed further",
  "Strata schemes trying to plan capital funds, special levies or future repair priorities",
];

const includes = [
  "Review of supplied photos, reports, plans and background information",
  "Preliminary assessment of the likely scope of works",
  "Identification of possible repair or upgrade options",
  "General budget estimate or budget range for planning purposes",
  "Comment on whether works may be staged or prioritised",
  "Comparison of practical options where applicable, such as temporary repair, targeted repair, staged upgrade or full replacement",
  "Advice on likely cost drivers, including access, extent of works, product/system selection, sequencing and hidden conditions",
  "Comment on items that may require further investigation before accurate pricing",
  "Guidance on whether a consultant, engineer, architect, quantity surveyor, builder or specialist contractor may be required next",
  "Early planning advice to assist with capital works forecasting, committee discussion or funding decisions",
];

export const metadata: Metadata = {
  title: "Remedial Budget Estimate | Expert Remedial Advice",
  description:
    "Realistic, defensible budget estimates to support strata planning, funding and decision making before committing to remedial works.",
  alternates: { canonical: "/expert-remedial-advice/remedial-budget-estimate" },
};

export default function RemedialBudgetEstimatePage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />
      <ServiceSchema
        name="Remedial Budget Estimate"
        description="Realistic, defensible budget estimates to support strata planning, funding and decision making before committing to remedial works."
        path="/expert-remedial-advice/remedial-budget-estimate"
      />

      <main className="px-6 py-10">
        <section className="mx-auto max-w-4xl">

          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/expert-remedial-advice" className="hover:text-sky-700 transition">Expert Remedial Advice</Link>
            <span>›</span>
            <span className="text-sky-800">Preliminary Scope &amp; Budget Estimate</span>
          </div>
          <PageNav />

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Expert Remedial Advice</p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight text-sky-950 sm:text-3xl md:text-4xl">
            Preliminary Scope &amp; Budget Estimate
          </h1>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 h-1 w-10 rounded-full bg-red-700" />
              <h2 className="text-base font-bold text-sky-950">What It Is</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                A preliminary desktop review to help owners, strata managers and committees understand possible repair or upgrade options before committing to a full consultant report, tender process or contractor engagement.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This service is suitable where the issue is broader than a single visible defect and the client needs an early view on the likely scope of works and approximate budget range. This may include façade upgrades, balcony repairs, roof membrane replacement, magnesite removal, waterproofing upgrades, concrete spalling repairs, window and door replacement, render and coating works, or other remedial building works.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We review the information, photos, reports, plans or background details provided and prepare a preliminary scope and budget estimate to help with early planning, capital works forecasting, committee discussions or funding decisions.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The aim is to help clients understand what options may be available, what level of work may be required, and what budget range they should allow before spending money on detailed design, tender documentation or formal contractor pricing.
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
              href="/expert-remedial-advice/remedial-budget-estimate/request"
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
