import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import ServiceSchema from "@/components/expert-advice/ServiceSchema";
import PageNav from "@/components/PageNav";

const whoFor = [
  "Owners corporations reviewing remedial repair quotes before approval",
  "Strata managers preparing to issue or compare tender documents",
  "Committees unsure whether a scope properly covers the defect",
  "Owners who have received a contractor quote and want it reviewed before proceeding",
  "Projects involving balcony repairs, waterproofing, façade works, concrete spalling, roof membranes, windows, planter boxes or render repairs",
  "Situations where quotes are difficult to compare because each contractor has allowed for different items",
  "Tender packages with provisional sums, exclusions, unclear access assumptions or vague repair descriptions",
  "Projects where the committee wants to reduce variation risk before appointing a contractor",
  "Cases where a cheaper quote may be missing important scope items",
  "Cases where a more expensive quote may include unnecessary or excessive allowances",
];

const includes = [
  "Review of the proposed scope of works, quote, tender schedule or specification",
  "Check of repair methodology and proposed remedial system",
  "Review of specified products, membranes, coatings, sealants, mortars or repair materials where applicable",
  "Comment on whether the scope appears clear, complete and suitable for the visible defect or described issue",
  "Identification of missing items that may later become variations",
  "Review of provisional sums, lump sum items, exclusions and qualifications",
  "Review of access assumptions, including scaffold, EWP, rope access, internal access or staged access",
  "Comment on whether items are likely to be under-allowed, duplicated or unclear",
  "Practical comments on alternative repair methods or more cost-effective options where appropriate",
  "Review of tender comparison issues where multiple quotes are provided",
  "Identification of likely commercial risks before approval or contract award",
  "Recommended questions to ask the contractor, consultant or tenderer before proceeding",
];

export const metadata: Metadata = {
  title: "Scope, Quote & Tender Review | Expert Remedial Advice",
  description:
    "Independent review of a remedial scope, quote or tender before you approve or sign — checking for missing items, vague wording, exclusions and variation risk.",
  alternates: { canonical: "/expert-remedial-advice/scope-quote-tender-review" },
};

export default function ScopeQuoteTenderReviewPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />
      <ServiceSchema
        name="Scope, Quote & Tender Review"
        description="Independent review of a remedial scope, quote or tender before you approve or sign — checking for missing items, vague wording, exclusions and variation risk."
        path="/expert-remedial-advice/scope-quote-tender-review"
      />

      <main className="px-6 py-10">
        <section className="mx-auto max-w-4xl">

          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/expert-remedial-advice" className="hover:text-sky-700 transition">Expert Remedial Advice</Link>
            <span>›</span>
            <span className="text-sky-800">Scope, Quote &amp; Tender Review</span>
          </div>
          <PageNav />

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Expert Remedial Advice</p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight text-sky-950 sm:text-3xl md:text-4xl">
            Scope, Quote &amp; Tender Review
          </h1>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 h-1 w-10 rounded-full bg-red-700" />
              <h2 className="text-base font-bold text-sky-950">What It Is</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                A detailed desktop review of a proposed scope of works, contractor quote, tender package or repair methodology before works are approved or awarded.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This service is for situations where a client already has a scope, quote, tender schedule, specification or contractor proposal, but needs an experienced remedial review to check whether the proposed works are clear, complete, practical and commercially sensible.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We review the scope wording, repair systems, specified products, access assumptions, tender breakdown, provisional sums, lump sum items, exclusions, hidden cost risks and likely variation triggers. The aim is to identify what may be missing, unclear, over-specified, under-specified, duplicated, risky or likely to cause cost increases once the project starts.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                We can also comment on whether alternative repair approaches, staging, access methods or specification changes may provide a more practical or cost-effective outcome.
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
              Submit your details, documents and any quotes on the next page. We will review your submission and confirm a fixed fee before any work begins.
            </p>
            <Link
              href="/expert-remedial-advice/scope-quote-tender-review/request"
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
