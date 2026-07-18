import SiteHeader from "@/components/SiteHeader";
import Link from "next/link";
import ExpertAdviceForm from "@/components/expert-advice/ExpertAdviceForm";
import FileUploadZone from "@/components/expert-advice/FileUploadZone";

const ACCESS_OPTIONS = ["Scaffold", "Rope access", "EWP", "Internal access", "Unknown"];
const PURPOSE_OPTIONS = ["Planning", "Strata approval", "Tender", "Budget only"];

const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

export default function RemedialBudgetEstimateRequestPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />
      <main className="px-6 py-10">
        <section className="mx-auto max-w-4xl">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/expert-remedial-advice" className="hover:text-sky-700 transition">Expert Remedial Advice</Link>
            <span>›</span>
            <Link href="/expert-remedial-advice/remedial-budget-estimate" className="hover:text-sky-700 transition">Preliminary Scope &amp; Budget Estimate</Link>
            <span>›</span>
            <span className="text-sky-800">Request This Advice</span>
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Expert Remedial Advice</p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight text-sky-950 sm:text-3xl md:text-4xl">
            Request This Advice
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Preliminary Scope &amp; Budget Estimate — fill in the details below. We will review your submission and confirm the fee before starting.
          </p>

          <div id="request-form" className="mt-6 scroll-mt-24">
            <ExpertAdviceForm
              service="remedial-budget-estimate"
              serviceName="Preliminary Scope & Budget Estimate"
              descriptionLabel="Description of Works Needing Budget Estimate"
              descriptionPlaceholder="Describe the remedial works you need a budget estimate for — defect type, location, approximate extent if known..."
              hideFilesSection
            >
              <fieldset>
                <legend className={`${labelClass} mb-3`}>Access Requirement <span className="text-xs font-normal text-slate-400">(select all that apply)</span></legend>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3">
                  {ACCESS_OPTIONS.map((o) => (
                    <label key={o} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                      <input type="checkbox" name="accessRequirement" value={o} className="h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-500" />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className={`${labelClass} mb-3`}>Purpose <span className="text-xs font-normal text-slate-400">(select all that apply)</span></legend>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                  {PURPOSE_OPTIONS.map((o) => (
                    <label key={o} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                      <input type="checkbox" name="purpose" value={o} className="h-4 w-4 rounded border-slate-300 text-sky-700 focus:ring-sky-500" />
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

              <div className="space-y-4 pt-1">
                <p className="text-sm font-bold text-sky-950">Attach Files</p>
                <FileUploadZone
                  name="photos"
                  label="Photos"
                  accept="image/jpeg,image/png,image/webp,image/heic"
                  hint="Photos of the defect — close-up and wide-angle (auto-compressed)"
                  maxFiles={10}
                />
                <FileUploadZone
                  name="drawingsPlans"
                  label="Drawings & Plans"
                  accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png"
                  hint="Architectural or structural drawings, floor plans (PDF, DWG)"
                  maxFiles={10}
                />
                <FileUploadZone
                  name="reportsDocuments"
                  label="Reports & Documents"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  hint="Engineering reports, inspection reports, strata reports, quotes"
                  maxFiles={10}
                />
              </div>
            </ExpertAdviceForm>
          </div>

          <div className="mt-6">
            <Link href="/expert-remedial-advice/remedial-budget-estimate" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">← Back to Preliminary Scope &amp; Budget Estimate</Link>
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
