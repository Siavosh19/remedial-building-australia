import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Useful Resources — Coming Soon — Remedial Building Australia",
  description:
    "Practical drawings, data sheets, spreadsheets and reference documents suited to remedial building scopes, systems and industry applications. Coming soon.",
};

export default function UsefulResourcesComingSoonPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-8 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700">
              Coming Soon
            </span>
            <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-6xl">
              Useful Resources
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Practical drawings, data sheets, spreadsheets and reference documents suited to remedial building scopes, systems and industry applications.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-500">
              We are building this section. Resources will be available shortly.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="/repair-systems" className="inline-flex items-center gap-2 rounded-xl bg-sky-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800">
                Browse Repair Systems
              </a>
              <a href="/" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-sky-950 transition hover:border-sky-300 hover:shadow-sm">
                Back to Home
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <a href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Home</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            <a href="/directory" className="hover:text-sky-700">Business Directory</a>
            <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl border-t border-slate-200 px-5 py-5 text-xs text-slate-400">
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved. Unauthorised reproduction prohibited.
        </div>
      </footer>
    </div>
  );
}
