import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import ServiceSchema from "@/components/expert-advice/ServiceSchema";
import PageNav from "@/components/PageNav";
import { isExpertServiceHidden } from "@/lib/expert-advice-hidden";

const suitableFor = [
  "Owners who can see damage inside their apartment but are unsure where it is coming from",
  "Strata managers needing an early view before arranging quotes or inspections",
  "Committees unsure whether a defect needs urgent attention",
  "Balcony leaks, window leaks and door frame water damage",
  "Mould, dampness, swollen skirting boards or internal water staining",
  "Concrete spalling and reinforcement corrosion",
  "Roof membrane deterioration or suspected roof leaks",
  "Planter box leaks and waterproofing failures",
  "Façade cracks, render defects and external wall leaks",
  "Drummy tiles, delaminated finishes or visible deterioration",
];

const includes = [
  "Review of supplied photos and background information",
  "Preliminary assessment of the likely defect type",
  "Comment on possible causes or contributing issues",
  "General risk rating: Low, Medium or High",
  "Practical next-step recommendation",
  "Guidance on whether you may need a builder, remedial consultant, waterproofing specialist, structural engineer, façade consultant, architect, roofer or other specialist",
  "Advice on what further investigation or information may be required",
  "General technical comments to help you understand the issue before arranging repairs or formal inspections",
];

export const metadata: Metadata = {
  title: "Preliminary Defect Assessment | Expert Remedial Advice",
  description:
    "Independent desktop review of photos and building information to identify the likely defect, its causes, a risk rating and a recommended next step.",
  alternates: { canonical: "/expert-remedial-advice/preliminary-defect-assessment" },
};

export default function PreliminaryDefectAssessmentPage() {
  if (isExpertServiceHidden("preliminary-defect-assessment")) notFound();
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />
      <ServiceSchema
        name="Preliminary Defect Assessment"
        description="Independent desktop review of photos and building information to identify the likely defect, its causes, a risk rating and a recommended next step."
        path="/expert-remedial-advice/preliminary-defect-assessment"
      />

      <main className="px-6 py-10">
        <section className="mx-auto max-w-4xl">

          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/expert-remedial-advice" className="hover:text-sky-700 transition">Expert Remedial Advice</Link>
            <span>›</span>
            <span className="text-sky-800">Preliminary Defect Assessment</span>
          </div>
          <PageNav />

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Expert Remedial Advice</p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight text-sky-950 sm:text-3xl md:text-4xl">
            Preliminary Defect Assessment
          </h1>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 h-1 w-10 rounded-full bg-red-700" />
              <h2 className="text-base font-bold text-sky-950">What It Is</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                A preliminary desktop review for visible building defects where you are unsure what the problem is, how serious it may be, or who should be engaged next.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This service is designed for situations such as mould near skirting boards, damp carpet, water staining around balcony doors, swollen or delaminated door frames, visible concrete spalling, roof membrane deterioration, leaking windows, façade cracks, planter box leaks, or other signs of water ingress and building deterioration.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We review the photos, description and available information you provide and give a preliminary view on the likely defect type, possible contributing cause, general risk level, and the most practical next step before you spend money on the wrong trade, consultant or inspection.
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
              <ul className="mt-3 sm:columns-2 sm:gap-x-8">
                {includes.map((item) => (
                  <li key={item} className="mb-2 flex break-inside-avoid items-start gap-2.5 text-sm text-slate-600">
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
              href="/expert-remedial-advice/preliminary-defect-assessment/request"
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
