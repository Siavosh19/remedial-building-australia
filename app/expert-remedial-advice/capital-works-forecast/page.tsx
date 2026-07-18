import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import ServiceSchema from "@/components/expert-advice/ServiceSchema";
import PageNav from "@/components/PageNav";

const whoFor = [
  "Owners corporations planning future capital works",
  "Strata managers preparing early repair and maintenance forecasts",
  "Committees reviewing whether current capital funds are likely to be enough",
  "Buildings with ageing façades, balconies, roofs, membranes, windows, doors or concrete elements",
  "Strata schemes with known defects but no clear future cost plan",
  "Buildings that may need future waterproofing, façade, roof, concrete spalling, balustrade, window or drainage works",
  "Committees considering future levy planning, special levies or increased capital works contributions",
  "Buildings where previous repairs suggest larger works may be required later",
  "Owners who want to understand likely future maintenance exposure before costs become urgent",
  "Strata schemes wanting a practical remedial view before commissioning detailed reports or tenders",
];

const includes = [
  "Review of supplied strata reports, capital works plans, photos, repair history and available building information",
  "Preliminary identification of likely future remedial and maintenance items",
  "Comment on expected repair priorities based on building type, age, condition and known issues",
  "General budget ranges for future capital works planning",
  "Comment on possible timing or staging of future works where practical",
  "Identification of likely major cost drivers, such as access, façade extent, waterproofing systems, roof areas, concrete repairs, windows, drainage or hidden defects",
  "Practical comments on levy planning, capital funds and whether current contributions may need review",
  "Advice to help owners corporations plan ahead and reduce the risk of sudden large levy increases when future works become urgent",
  "Guidance on which repair items may need further investigation before accurate pricing",
  "Advice on whether future works may require consultants, engineers, builders, specialist contractors or tender documentation",
  "A practical summary to help the owners corporation plan levies, funding and future remedial priorities",
];

export const metadata: Metadata = {
  title: "Capital Works Forecast | Expert Remedial Advice",
  description:
    "Long-term capital works forecasting to help strata schemes plan and budget for remedial and maintenance works with confidence.",
  alternates: { canonical: "/expert-remedial-advice/capital-works-forecast" },
};

export default function CapitalWorksForecastPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />
      <ServiceSchema
        name="Capital Works Forecast"
        description="Long-term capital works forecasting to help strata schemes plan and budget for remedial and maintenance works with confidence."
        path="/expert-remedial-advice/capital-works-forecast"
      />

      <main className="px-6 py-10">
        <section className="mx-auto max-w-4xl">

          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/expert-remedial-advice" className="hover:text-sky-700 transition">Expert Remedial Advice</Link>
            <span>›</span>
            <span className="text-sky-800">Capital Works Forecast</span>
          </div>
          <PageNav />

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Expert Remedial Advice</p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight text-sky-950 sm:text-3xl md:text-4xl">
            Capital Works Forecast
          </h1>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 h-1 w-10 rounded-full bg-red-700" />
              <h2 className="text-base font-bold text-sky-950">What It Is</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Capital Works Forecast is a desktop review to help owners corporations, strata managers and committees understand likely future remedial repair and maintenance costs for their building.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We review the available information provided, such as strata reports, capital works plans, building reports, photos, repair history, known defects, maintenance records and background details from the owners or strata manager.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Based on the building type, age, construction system, visible issues, past repairs and common remedial maintenance patterns, we provide a preliminary forecast of likely future works and estimated cost ranges for planning purposes.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The aim is to help the owners corporation understand what major repair items may be coming, what should be prioritised, and how levies or capital funds may need to be planned ahead of time.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Early forecasting can help committees prepare owners financially, stage future works where practical, and avoid sudden large levy increases or unexpected special levies when repair works or major maintenance items become urgent.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 h-1 w-10 rounded-full bg-red-700" />
              <h2 className="text-base font-bold text-sky-950">Who It&apos;s For</h2>
              <ul className="mt-3 space-y-1.5">
                {whoFor.map((item) => (
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
              Submit your details and building information on the next page. We will review your submission and confirm a fixed fee before any work begins.
            </p>
            <Link
              href="/expert-remedial-advice/capital-works-forecast/request"
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
