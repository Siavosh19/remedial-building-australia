import SiteHeader from "@/components/SiteHeader";
import ExpertAdviceForm from "@/components/expert-advice/ExpertAdviceForm";
import FileUploadZone from "@/components/expert-advice/FileUploadZone";

const whoFor = [
  "Building owners receiving a first remedial quote",
  "Strata managers reviewing contractor submissions",
  "Owners corporation committees approving scope and budget",
  "Property managers assessing maintenance contractor proposals",
  "Developers reviewing rectification tenders",
  "Anyone unsure whether a remedial scope is complete, fair, or well-scoped",
];

const includes = [
  "Review for missing scope items or gaps in coverage",
  "Identification of vague wording, undefined methods, or ambiguous exclusions",
  "Flag on provisional sums, daywork allowances, and PC items",
  "Access and scaffold assumption review",
  "Programme and sequencing concerns",
  "Variation risk commentary",
  "Multi-quote comparison (if multiple quotes provided)",
  "List of questions to raise with the contractor before signing",
];

const PRICING_GUIDE = [
  { label: "Single scope or quote review", price: "from $495 + GST" },
  { label: "2–3 quote comparison",         price: "from $750 + GST" },
  { label: "Complex tender review",         price: "from $950 + GST" },
];

const CONCERN_OPTIONS = [
  "Price",
  "Missing items",
  "Vague scope",
  "Exclusions",
  "Provisional sums",
  "Access",
  "Scaffold",
  "Programme",
  "Variations",
];

const QUOTE_COUNT = ["1", "2", "3", "4+"];
const REVIEW_PURPOSE = ["Approval before signing", "Quote comparison", "Dispute or variation"];
const WORKS_STARTED = ["Not started", "In progress", "Complete"];

const fieldClass =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20";
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

export default function ScopeQuoteTenderReviewPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />

      <main className="px-6 py-10">
        <section className="mx-auto max-w-4xl">

          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <a href="/expert-remedial-advice" className="hover:text-sky-700 transition">Expert Remedial Advice</a>
            <span>›</span>
            <span className="text-sky-800">Scope, Quote &amp; Tender Review</span>
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Expert Remedial Advice</p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight text-sky-950 sm:text-3xl md:text-4xl">
            Scope, Quote &amp; Tender Review
          </h1>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 h-1 w-10 rounded-full bg-red-700" />
              <h2 className="text-base font-bold text-sky-950">What It Is</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                An independent desktop review of a remedial scope of works, quote, or tender before you approve it or sign a contract.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Remedial building scopes are notoriously incomplete. Missing items, vague repair descriptions, unstated exclusions, and open-ended provisional sums are common — and can lead to significant variation costs once work begins. This service is designed to help you understand what you are agreeing to before committing.
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
            <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-2xl font-extrabold text-white">From $495</span>
              <span className="text-base font-semibold text-sky-300">+ GST</span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {PRICING_GUIDE.map((g) => (
                <li key={g.label} className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-sky-200">{g.label}</span>
                  <span className="shrink-0 font-semibold text-white">{g.price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-6 text-sky-200">
              Prices shown are starting prices. Final pricing will be confirmed after we review the information, photos and documents provided.
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

            <ExpertAdviceForm service="scope-quote-tender-review" serviceName="Scope, Quote & Tender Review">
              <FileUploadZone
                name="scopeDocument"
                label="Scope / Quote / Tender Document"
                accept=".pdf,.doc,.docx"
                hint="Upload the scope of works, quote, or tender document for review"
                maxFiles={10}
              />
              <div>
                <label className={labelClass}>Number of Quotes Being Reviewed</label>
                <select name="quoteCount" className={fieldClass}>
                  <option value="">Select</option>
                  {QUOTE_COUNT.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Purpose of Review</label>
                <select name="reviewPurpose" className={fieldClass}>
                  <option value="">Select</option>
                  {REVIEW_PURPOSE.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Have the Works Started?</label>
                <select name="worksStarted" className={fieldClass}>
                  <option value="">Select</option>
                  {WORKS_STARTED.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
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
              <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3">
                <p className="text-sm font-semibold text-sky-900">Strata plan recommended</p>
                <p className="mt-1 text-xs leading-5 text-sky-700">
                  If this is a strata or apartment building, please attach the strata plan below. It helps us pinpoint which lot and area is affected.
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
