import SiteHeader from "@/components/SiteHeader";
import ExpertAdviceForm from "@/components/expert-advice/ExpertAdviceForm";
import FileUploadZone from "@/components/expert-advice/FileUploadZone";

const DISCLAIMER =
  "All services are preliminary desktop advisory services unless otherwise stated. They are not a substitute for site inspection, engineering certification, regulated design, waterproofing certification, legal advice, or a formal building inspection report.";

const whoFor = [
  "Apartment buyers conducting pre-purchase due diligence",
  "Conveyancers wanting a defect risk summary for a client",
  "Buyers' agents assessing building condition risk before purchase",
  "Strata due diligence reviews for investment or owner-occupier purchases",
];

const includes = [
  "Strata report review",
  "AGM and general meeting minutes review",
  "Capital works fund status and commentary",
  "Review of any available defect, inspection, or repair photos",
  "Red flags for waterproofing defects",
  "Red flags for concrete and structural issues",
  "Red flags for cladding, windows, roof, and façade",
  "Special levy risk commentary",
  "Plain-English risk summary",
];

const CONCERN_OPTIONS = [
  "Waterproofing",
  "Concrete cancer",
  "Cladding",
  "Roof",
  "Windows",
  "Façade",
  "Levies",
];

const fieldClass =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20";
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";
const fileClass =
  "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-sky-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-sky-700 hover:file:bg-sky-100";

export default function PrePurchaseApartmentDefectReviewPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />

      <main className="px-6 py-16">
        <section className="mx-auto max-w-4xl">

          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-400">
            <a href="/expert-remedial-advice" className="hover:text-sky-700 transition">Expert Remedial Advice</a>
            <span>›</span>
            <span className="text-sky-800">Pre-Purchase Apartment Defect Review</span>
          </div>

          <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Expert Remedial Advice</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-sky-950 sm:text-4xl md:text-5xl">
            Pre-Purchase Apartment Defect Review
          </h1>

          <div className="mt-10 grid gap-8 md:grid-cols-2">

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-4 h-1.5 w-12 rounded-full bg-red-700" />
              <h2 className="text-xl font-bold text-sky-950">What It Is</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                A desktop review of strata records and available building information to identify building defect risk before purchasing an apartment in a strata scheme.
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Strata reports and meeting minutes often contain early warning signs of defects, repair backlogs, unfunded capital works, and upcoming special levies. This service is designed to interpret that information through a remedial building lens — identifying what a standard conveyancer or solicitor review may miss.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-4 h-1.5 w-12 rounded-full bg-red-700" />
              <h2 className="text-xl font-bold text-sky-950">Who It&apos;s For</h2>
              <ul className="mt-4 space-y-3">
                {whoFor.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:col-span-2">
              <div className="mb-4 h-1.5 w-12 rounded-full bg-red-700" />
              <h2 className="text-xl font-bold text-sky-950">What It Includes</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3.5 3.5L13 4.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Pricing */}
          <div className="mt-8 rounded-2xl bg-sky-950 px-8 py-8 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300">Pricing</p>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="text-3xl font-extrabold text-white">From $295</span>
              <span className="text-lg font-semibold text-sky-300">+ GST</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-sky-200">
              Prices shown are starting prices. Final pricing will be confirmed after we review the information, photos and documents provided.
            </p>
            <a
              href="#request-form"
              className="mt-6 inline-flex rounded-xl bg-red-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-600"
            >
              Request This Advice
            </a>
          </div>

          {/* Request form */}
          <div id="request-form" className="mt-8 scroll-mt-24">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-sky-950">Request This Advice</h2>
              <p className="mt-2 text-sm text-slate-500">
                Fill in the details below. We will review your submission and confirm the fee before starting.
              </p>
            </div>

            <ExpertAdviceForm service="pre-purchase-apartment-defect-review" serviceName="Pre-Purchase Apartment Defect Review">
              <FileUploadZone
                name="strataReport"
                label="Strata Report"
                accept=".pdf,.doc,.docx"
                hint="The strata inspection or due diligence report"
                maxFiles={4}
              />
              <FileUploadZone
                name="agmMinutes"
                label="AGM / Committee Minutes"
                accept=".pdf,.doc,.docx"
                hint="Recent AGM minutes — useful for identifying known defects and levy history"
                maxFiles={4}
              />
              <FileUploadZone
                name="capitalWorksFund"
                label="Capital Works Fund / Levy Information"
                accept=".pdf,.doc,.docx"
                hint="Capital works fund statement or levy schedule"
                maxFiles={4}
              />
              <FileUploadZone
                name="buildingInspectionReport"
                label="Building Inspection Report"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                hint="Any building or pest inspection report obtained"
                maxFiles={4}
              />
              <div>
                <label className={labelClass}>
                  Listing Link <span className="text-xs font-normal text-slate-400">(optional)</span>
                </label>
                <input type="url" name="listingLink" className={fieldClass} placeholder="https://www.realestate.com.au/..." />
              </div>
              <div>
                <label className={labelClass}>
                  Auction / Offer Deadline <span className="text-xs font-normal text-slate-400">(optional)</span>
                </label>
                <input type="date" name="auctionDeadline" className={fieldClass} />
              </div>
              <fieldset>
                <legend className={`${labelClass} mb-3`}>Main Concern <span className="text-xs font-normal text-slate-400">(select all that apply)</span></legend>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
                  {CONCERN_OPTIONS.map((o) => (
                    <label key={o} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                      <input type="checkbox" name="mainConcern" value={o} className="h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-500" />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>
            </ExpertAdviceForm>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-8 py-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Disclaimer</p>
            <p className="mt-2 text-sm leading-7 text-slate-500">{DISCLAIMER}</p>
          </div>

        </section>
      </main>

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12">
          <a href="/expert-remedial-advice" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">
            ← Expert Remedial Advice
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            <a href="/directory" className="hover:text-sky-700">Business Directory</a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>
    </div>
  );
}
