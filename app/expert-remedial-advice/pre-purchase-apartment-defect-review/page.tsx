import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import ServiceSchema from "@/components/expert-advice/ServiceSchema";
import PageNav from "@/components/PageNav";
import { isExpertServiceHidden } from "@/lib/expert-advice-hidden";

const whoFor = [
  "Buyers considering purchasing an apartment in a strata building",
  "Buyers who have received a strata report but are unsure what the building issues mean",
  "Buyers concerned about future special levies or capital works costs",
  "Buyers looking at older apartment buildings",
  "Buyers considering apartments in buildings with past leaks, façade issues, balcony issues, roof issues, concrete spalling or window problems",
  "Buyers concerned about magnesite, damp flooring, mould, water staining or previous water ingress",
  "Buyers who want to understand whether the property may carry future repair risk",
  "Buyers who want a second opinion before exchange or before making a final purchase decision",
  "Buyers who want to know what questions to ask the agent, vendor, strata manager or solicitor before proceeding",
];

const includes = [
  "Review of supplied strata report, meeting minutes, capital works records, photos and available purchase documents",
  "Review of known defects, previous repairs and planned future works",
  "Comment on likely future repair or cost exposure based on the available information",
  "Identification of warning signs that may indicate future special levies or major capital works",
  "Comment on common apartment building risks such as façade deterioration, balcony defects, waterproofing issues, roof membrane ageing, window leaks, concrete spalling, magnesite, dampness and water ingress",
  "Practical explanation of what the issues may mean for a buyer",
  "General purchase risk rating: Low, Medium or High",
  "Suggested questions to ask the agent, vendor, strata manager or solicitor before proceeding",
  "Practical advice to help the buyer decide whether to proceed, proceed cautiously, ask for more information, renegotiate, or reconsider the purchase",
];

export const metadata: Metadata = {
  title: "Pre-Purchase Apartment Defect Review | Expert Remedial Advice",
  description:
    "Independent defect and building-risk review before you buy an apartment — surfacing the red flags that affect value, liveability and future repair costs.",
  alternates: { canonical: "/expert-remedial-advice/pre-purchase-apartment-defect-review" },
};

export default function PrePurchaseApartmentDefectReviewPage() {
  if (isExpertServiceHidden("pre-purchase-apartment-defect-review")) notFound();
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />
      <ServiceSchema
        name="Pre-Purchase Apartment Defect Review"
        description="Independent defect and building-risk review before you buy an apartment — surfacing the red flags that affect value, liveability and future repair costs."
        path="/expert-remedial-advice/pre-purchase-apartment-defect-review"
      />

      <main className="px-6 py-10">
        <section className="mx-auto max-w-4xl">

          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/expert-remedial-advice" className="hover:text-sky-700 transition">Expert Remedial Advice</Link>
            <span>›</span>
            <span className="text-sky-800">Pre-Purchase Apartment Defect Review</span>
          </div>
          <PageNav />

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Expert Remedial Advice</p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight text-sky-950 sm:text-3xl md:text-4xl">
            Pre-Purchase Apartment Defect Review
          </h1>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 h-1 w-10 rounded-full bg-red-700" />
              <h2 className="text-base font-bold text-sky-950">What It Is</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Pre-Purchase Apartment Defect Review is a desktop review for buyers who are considering purchasing an apartment and want to better understand potential building-related risks before committing to the purchase.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We review the available purchase information, such as strata reports, meeting minutes, capital works records, past repair history, defect reports, photos, building age and known issues, to identify warning signs that may affect the buyer after purchase.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The review focuses on whether the building may have future repair exposure, possible special levy risk, unresolved defects, ageing building systems, planned remedial works, or signs that the owners corporation may need to spend significant money in the future.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The aim is to help buyers make a more informed purchase decision before exchange, renegotiation or final commitment.
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
              Submit your details and available strata records on the next page. We will review your submission and confirm a fixed fee before any work begins.
            </p>
            <Link
              href="/expert-remedial-advice/pre-purchase-apartment-defect-review/request"
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
