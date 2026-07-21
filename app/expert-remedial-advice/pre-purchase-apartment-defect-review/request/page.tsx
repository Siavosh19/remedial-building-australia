import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import ExpertAdviceForm from "@/components/expert-advice/ExpertAdviceForm";
import FileUploadZone from "@/components/expert-advice/FileUploadZone";
import { isExpertServiceHidden } from "@/lib/expert-advice-hidden";

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

export default function PrePurchaseApartmentDefectReviewRequestPage() {
  if (isExpertServiceHidden("pre-purchase-apartment-defect-review")) notFound();
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />
      <main className="px-6 py-10">
        <section className="mx-auto max-w-4xl">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/expert-remedial-advice" className="hover:text-sky-700 transition">Expert Remedial Advice</Link>
            <span>›</span>
            <Link href="/expert-remedial-advice/pre-purchase-apartment-defect-review" className="hover:text-sky-700 transition">Pre-Purchase Apartment Defect Review</Link>
            <span>›</span>
            <span className="text-sky-800">Request This Advice</span>
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Expert Remedial Advice</p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight text-sky-950 sm:text-3xl md:text-4xl">
            Request This Advice
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Pre-Purchase Apartment Defect Review — fill in the details below. We will review your submission and confirm the fee before starting.
          </p>

          <div id="request-form" className="mt-6 scroll-mt-24">
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
              <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3">
                <p className="text-sm font-semibold text-sky-900">Strata plan recommended</p>
                <p className="mt-1 text-xs leading-5 text-sky-700">
                  If available, please attach the strata plan for the building. It helps us identify the lot boundaries, common property areas, and likely areas of risk.
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

          <div className="mt-6">
            <Link href="/expert-remedial-advice/pre-purchase-apartment-defect-review" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">← Back to Pre-Purchase Apartment Defect Review</Link>
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
