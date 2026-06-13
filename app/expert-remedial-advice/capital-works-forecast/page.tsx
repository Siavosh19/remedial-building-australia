import SiteHeader from "@/components/SiteHeader";
import ExpertAdviceForm from "@/components/expert-advice/ExpertAdviceForm";
import FileUploadZone from "@/components/expert-advice/FileUploadZone";

const whoFor = [
  "Owners corporation committees planning capital works fund contributions",
  "Strata managers preparing capital works fund reviews",
  "Building managers assessing future maintenance and repair liabilities",
  "Owners corporations facing ageing or deteriorating building stock",
];

const includes = [
  "Review of available building information and condition data",
  "Condition commentary on key building elements",
  "Identification of anticipated future remedial items",
  "Priority and risk ranking of items",
  "5 to 10 year indicative budget forecast range",
  "Staging suggestions for phased works",
  "Maintenance recommendations to extend asset life",
  "Capital works fund commentary and planning notes",
];

const PURPOSE_OPTIONS = [
  "Levy planning",
  "AGM discussion",
  "Repair prioritisation",
  "Budget planning",
];

const fieldClass =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20";
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

export default function CapitalWorksForecastPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />

      <main className="px-6 py-10">
        <section className="mx-auto max-w-4xl">

          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <a href="/expert-remedial-advice" className="hover:text-sky-700 transition">Expert Remedial Advice</a>
            <span>›</span>
            <span className="text-sky-800">Capital Works Forecast</span>
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Expert Remedial Advice</p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight text-sky-950 sm:text-3xl md:text-4xl">
            Capital Works Forecast
          </h1>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 h-1 w-10 rounded-full bg-red-700" />
              <h2 className="text-base font-bold text-sky-950">What It Is</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                A preliminary forecast of future remedial building works and indicative costs for strata capital works planning — based on desktop review of available building information and condition data.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This service provides strata committees and managers with a structured, remedial building perspective on what works are likely to be needed over the coming 5–10 years, in what priority order, and what an indicative budget range might look like — to inform capital works fund planning and levy discussions.
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500 italic">
                Note: this is a preliminary desktop forecast, not a formal capital works fund report, engineering assessment, or actuarial valuation.
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

          {/* Pricing */}
          <div className="mt-6 rounded-xl bg-sky-950 px-6 py-5 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300">Pricing</p>
            <div className="mt-2">
              <span className="text-2xl font-extrabold text-white">By quote</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-sky-200">
              Pricing is based on the size and complexity of the building, and the volume of information provided. We will confirm the fee after reviewing your submission before starting any work.
            </p>
            <a
              href="#request-form"
              className="mt-4 inline-flex rounded-xl bg-red-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-600"
            >
              Request This Advice
            </a>
          </div>

          {/* Request form */}
          <div id="request-form" className="mt-6 scroll-mt-24">
            <div className="mb-4">
              <h2 className="text-xl font-extrabold text-sky-950">Request This Advice</h2>
              <p className="mt-1 text-sm text-slate-500">
                Fill in the details below. We will review your submission and confirm the fee before starting.
              </p>
            </div>

            <ExpertAdviceForm service="capital-works-forecast" serviceName="Capital Works Forecast">
              <div>
                <label className={labelClass}>
                  Number of Lots / Units <span className="text-xs font-normal text-slate-400">(optional)</span>
                </label>
                <input type="text" name="numberOfLots" className={fieldClass} placeholder="e.g. 24 lots" />
              </div>
              <div>
                <label className={labelClass}>
                  Approximate Building Age <span className="text-xs font-normal text-slate-400">(optional)</span>
                </label>
                <input type="text" name="buildingAge" className={fieldClass} placeholder="e.g. 1985, approximately 40 years old" />
              </div>
              <FileUploadZone
                name="capitalWorksPlan"
                label="Existing Capital Works Plan"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                hint="Any existing capital works fund plan or schedule"
                maxFiles={4}
              />
              <FileUploadZone
                name="defectReports"
                label="Defect Reports"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                hint="Recent defect inspection or assessment reports"
                maxFiles={10}
              />
              <FileUploadZone
                name="engineeringReports"
                label="Engineering Reports"
                accept=".pdf,.doc,.docx"
                hint="Structural, waterproofing, or condition assessment reports"
                maxFiles={10}
              />
              <FileUploadZone
                name="waterproofingReports"
                label="Waterproofing Reports"
                accept=".pdf,.doc,.docx"
                hint="Waterproofing inspection or failure assessment reports"
                maxFiles={10}
              />
              <div>
                <label className={labelClass}>
                  Known Upcoming Works <span className="text-xs font-normal text-slate-400">(optional)</span>
                </label>
                <textarea name="knownUpcomingWorks" rows={3} className={`${fieldClass} resize-y`} placeholder="List any works already identified or planned..." />
              </div>
              <fieldset>
                <legend className={`${labelClass} mb-3`}>Main Purpose <span className="text-xs font-normal text-slate-400">(select all that apply)</span></legend>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                  {PURPOSE_OPTIONS.map((o) => (
                    <label key={o} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                      <input type="checkbox" name="mainPurpose" value={o} className="h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-500" />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3">
                <p className="text-sm font-semibold text-sky-900">Strata plan recommended</p>
                <p className="mt-1 text-xs leading-5 text-sky-700">
                  If this is a strata or apartment building, please attach the strata plan below. It helps us understand the building layout and identify the affected areas.
                </p>
              </div>
              <FileUploadZone
                name="strataPlan"
                label="Strata Plan"
                accept=".pdf,image/jpeg,image/png,image/heic"
                hint="PDF or image of the strata plan (optional)"
                maxFiles={2}
              />
            </ExpertAdviceForm>
          </div>

        </section>
      </main>

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href="/expert-remedial-advice" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">
            ← Expert Remedial Advice
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 md:grid-cols-[1.2fr_1fr]">
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
