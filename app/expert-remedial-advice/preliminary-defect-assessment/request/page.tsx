import SiteHeader from "@/components/SiteHeader";
import ExpertAdviceForm from "@/components/expert-advice/ExpertAdviceForm";
import DefectEntryList from "@/components/expert-advice/DefectEntryList";

const RAIN_OPTIONS = ["During rain only", "All the time", "Intermittent — no clear pattern", "Unknown"];

const fieldClass =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20";
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";
const fileClass =
  "w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-sky-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-sky-700 hover:file:bg-sky-100";

export default function PreliminaryDefectAssessmentRequestPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />
      <main className="px-6 py-10">
        <section className="mx-auto max-w-4xl">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <a href="/expert-remedial-advice" className="hover:text-sky-700 transition">Expert Remedial Advice</a>
            <span>›</span>
            <a href="/expert-remedial-advice/preliminary-defect-assessment" className="hover:text-sky-700 transition">Preliminary Defect Assessment</a>
            <span>›</span>
            <span className="text-sky-800">Request This Advice</span>
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Expert Remedial Advice</p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight text-sky-950 sm:text-3xl md:text-4xl">
            Request This Advice
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Preliminary Defect Assessment — fill in the details below. We will review your submission and confirm the fee before starting.
          </p>

          <div id="request-form" className="mt-6 scroll-mt-24">
            <ExpertAdviceForm
              service="preliminary-defect-assessment"
              serviceName="Preliminary Defect Assessment"
              hideGeneralPhotos
            >
              <DefectEntryList />

              <div>
                <label className={labelClass}>When did the Issue Start?</label>
                <input type="text" name="whenIssueStarted" className={fieldClass} placeholder="e.g. 6 months ago, after last winter" />
              </div>
              <div>
                <label className={labelClass}>Does it happen during rain or all the time?</label>
                <select name="rainPattern" className={fieldClass}>
                  <option value="">Select one</option>
                  {RAIN_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3">
                <p className="text-sm font-semibold text-sky-900">Strata plan recommended</p>
                <p className="mt-1 text-xs leading-5 text-sky-700">
                  If this is a strata or apartment building, please attach the strata plan below. It helps us pinpoint which lot and area is affected.
                </p>
              </div>
              <div>
                <label className={labelClass}>
                  Strata Plan <span className="text-xs font-normal text-slate-400">(optional)</span>
                </label>
                <input type="file" name="strataPlan" accept=".pdf,image/jpeg,image/png" className={fileClass} />
                <p className="mt-1 text-xs text-slate-400">PDF or image of the strata plan</p>
              </div>
            </ExpertAdviceForm>
          </div>

          <div className="mt-6">
            <a href="/expert-remedial-advice/preliminary-defect-assessment" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">← Back to Preliminary Defect Assessment</a>
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
            <div className="flex flex-col gap-2">
              <a href="/directory" className="hover:text-sky-700">Business Directory</a>
              <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
              <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
              <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            </div>
            <div className="flex flex-col gap-2">
              <a href="/advertise" className="hover:text-sky-700">Advertise With Us</a>
              <a href="/contact" className="hover:text-sky-700">Contact</a>
              <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
              <a href="/terms" className="hover:text-sky-700">Terms</a>
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
