import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

const DISCLAIMER =
  "All services are preliminary desktop advisory services unless otherwise stated. They are not a substitute for site inspection, engineering certification, regulated design, waterproofing certification, legal advice, or a formal building inspection report.";

const services = [
  {
    title: "Preliminary Defect Assessment",
    description:
      "Desktop review of photos and building information to identify the defect type, risk level, and recommended next step.",
    href: "/expert-remedial-advice/preliminary-defect-assessment",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
        <rect x="6" y="18" width="26" height="22" rx="2" stroke="#0c4a6e" strokeWidth="2" />
        <path d="M18 18 L16 26 L20 30 L18 40" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="34" cy="14" r="8" stroke="#0c4a6e" strokeWidth="2" />
        <line x1="39.6" y1="19.6" x2="44" y2="24" stroke="#0c4a6e" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="34" cy="14" r="3" fill="#dc2626" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Scope, Quote & Tender Review",
    description:
      "Independent review of a remedial scope, quote, or tender before you approve or sign — checking for missing items, vague wording, exclusions, and variation risk.",
    href: "/expert-remedial-advice/scope-quote-tender-review",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
        <rect x="10" y="6" width="28" height="36" rx="3" stroke="#0c4a6e" strokeWidth="2" />
        <line x1="16" y1="15" x2="32" y2="15" stroke="#0c4a6e" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="21" x2="32" y2="21" stroke="#0c4a6e" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="27" x2="26" y2="27" stroke="#0c4a6e" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="34" cy="34" r="7" fill="white" stroke="#0c4a6e" strokeWidth="2" />
        <path d="M30.5 34 L33 36.5 L37.5 31" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Remedial Budget Estimate",
    description:
      "Indicative cost range for a remedial defect before committing to consultant fees, tenderers, or a full diagnosis.",
    href: "/expert-remedial-advice/remedial-budget-estimate",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
        <rect x="6" y="30" width="7" height="12" rx="1.5" fill="#0c4a6e" opacity="0.3" stroke="#0c4a6e" strokeWidth="1.5" />
        <rect x="16" y="22" width="7" height="20" rx="1.5" fill="#0c4a6e" opacity="0.5" stroke="#0c4a6e" strokeWidth="1.5" />
        <rect x="26" y="14" width="7" height="28" rx="1.5" fill="#0c4a6e" opacity="0.7" stroke="#0c4a6e" strokeWidth="1.5" />
        <rect x="36" y="8" width="7" height="34" rx="1.5" fill="#0c4a6e" stroke="#0c4a6e" strokeWidth="1.5" />
        <path d="M21 10 L26 7 L31 10" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="26" y1="4" x2="26" y2="12" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Building Repair Strategy Advice",
    description:
      "Independent advice on the best repair pathway when the approach is unclear or multiple options are being considered.",
    href: "/expert-remedial-advice/building-repair-strategy-advice",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
        <rect x="4" y="28" width="10" height="12" rx="1.5" stroke="#0c4a6e" strokeWidth="2" />
        <rect x="19" y="20" width="10" height="20" rx="1.5" stroke="#0c4a6e" strokeWidth="2" />
        <rect x="34" y="10" width="10" height="30" rx="1.5" stroke="#0c4a6e" strokeWidth="2" />
        <path d="M14 32 L19 28" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
        <path d="M29 24 L34 18" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
        <path d="M31 17 L34 18 L33 21" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 30 L19 28 L18 31" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Pre-Purchase Apartment Defect Review",
    description:
      "Desktop review of strata records, AGM minutes, capital works fund status, and available defect information before buying an apartment.",
    href: "/expert-remedial-advice/pre-purchase-apartment-defect-review",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
        <rect x="8" y="12" width="24" height="30" rx="2" stroke="#0c4a6e" strokeWidth="2" />
        <line x1="8" y1="20" x2="32" y2="20" stroke="#0c4a6e" strokeWidth="1.5" />
        <line x1="20" y1="12" x2="20" y2="42" stroke="#0c4a6e" strokeWidth="1.5" />
        <rect x="11" y="23" width="5" height="5" rx="1" fill="#0c4a6e" opacity="0.4" />
        <rect x="11" y="31" width="5" height="5" rx="1" fill="#0c4a6e" opacity="0.4" />
        <rect x="23" y="23" width="5" height="5" rx="1" fill="#0c4a6e" opacity="0.4" />
        <circle cx="37" cy="18" r="7" fill="white" stroke="#0c4a6e" strokeWidth="2" />
        <path d="M33.5 18 L36 20.5 L40.5 15" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Capital Works Forecast",
    description:
      "Preliminary forecast of future remedial building works and costs for strata capital works planning, with a 5–10 year budget range.",
    href: "/expert-remedial-advice/capital-works-forecast",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9">
        <rect x="5" y="8" width="38" height="28" rx="2.5" stroke="#0c4a6e" strokeWidth="2" />
        <line x1="5" y1="16" x2="43" y2="16" stroke="#0c4a6e" strokeWidth="1.5" />
        <line x1="17" y1="8" x2="17" y2="36" stroke="#0c4a6e" strokeWidth="1" opacity="0.4" />
        <line x1="29" y1="8" x2="29" y2="36" stroke="#0c4a6e" strokeWidth="1" opacity="0.4" />
        <rect x="9" y="22" width="5" height="10" rx="1" fill="#dc2626" opacity="0.7" />
        <rect x="21" y="19" width="5" height="13" rx="1" fill="#0c4a6e" opacity="0.5" />
        <rect x="33" y="24" width="5" height="8" rx="1" fill="#0c4a6e" opacity="0.3" />
        <path d="M18 40 L24 40 M30 40 L36 40" stroke="#0c4a6e" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="36" x2="24" y2="44" stroke="#0c4a6e" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export const metadata: Metadata = {
  title: "Expert Remedial Advice | Remedial Building Australia",
  description:
    "Independent desktop remedial advice for owners, strata managers and building stakeholders — defect assessments, scope, quote and tender reviews, budgets, repair strategy and capital works forecasts.",
  alternates: { canonical: "/expert-remedial-advice" },
};

export default function ExpertRemedialAdvicePage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />

      <main className="px-6 py-10">
        <section className="mx-auto max-w-7xl">

          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">
              Expert Remedial Advice
            </p>
            <h1 className="mt-3 text-2xl font-extrabold leading-tight text-sky-950 sm:text-3xl md:text-4xl">
              Independent desktop advice for building defects, repair scopes, quotes, budgets, and strata capital works planning.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
              Practical expert advice provided as a desktop service — without the cost of a site visit or full consultant engagement.
              Suitable for building owners, strata committees, property managers, buyers, and anyone navigating a remedial building decision.
            </p>
          </div>

          <div className="mt-10 grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.href}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-lg"
              >
                <div className="p-5">
                  <div className="mb-3 h-1 w-10 rounded-full bg-red-700" />
                  <div className="mb-3 text-sky-900">{service.icon}</div>
                  <h2 className="text-base font-bold leading-snug text-sky-950">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>
                  <a
                    href={service.href}
                    className="mt-4 block w-full rounded-xl bg-sky-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-sky-800"
                  >
                    Request This Advice
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Disclaimer</p>
            <p className="mt-1.5 text-xs leading-6 text-slate-500">{DISCLAIMER}</p>
          </div>

        </section>
      </main>

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">
            ← Home
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
