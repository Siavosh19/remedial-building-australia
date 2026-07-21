import type { Metadata } from "next";
import Link from "next/link";

import SiteHeader from "@/components/SiteHeader";
export const metadata: Metadata = {
  title: "Materials & Products — Coming Soon — Remedial Building Australia",
  description:
    "Technical product database for Australian remedial building — applications, compatible substrates, coverage rates and linked defects. Coming soon.",
};

export default function MaterialsProductsComingSoonPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <SiteHeader />

      <main>
        <section className="border-b border-slate-200 bg-white px-8 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700">
              Coming Soon
            </span>
            <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-sky-950 md:text-6xl">
              Materials & Products
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Technical product database for Australian remedial building — applications, compatible substrates, coverage rates and linked defects.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-500">
              We are building this section. It will be available shortly.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/repair-systems" className="inline-flex items-center gap-2 rounded-xl bg-sky-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800">
                Browse Repair Systems
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-sky-950 transition hover:border-sky-300 hover:shadow-sm">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-10">
          <Link href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200 transition">← Home</Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
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
