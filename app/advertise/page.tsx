import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import AdvertiseForm from "@/components/advertise/AdvertiseForm";

export const metadata: Metadata = {
  title: "Advertise With Us | Remedial Building Australia",
  description:
    "Promote your business on Australia's leading remedial building directory — seen by strata managers, owners corporations and property professionals every day.",
};

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <SiteHeader />

      {/* Short hero + request a quote form */}
      <section id="enquiry" className="mx-auto max-w-3xl px-6 pt-14 pb-16 sm:pt-16">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-700">Advertise With Us</p>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight text-sky-950 sm:text-4xl">
            Reach Thousands of Strata &amp; Building Professionals
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Your business, front and centre on one of Australia&rsquo;s busiest remedial building directories — seen by
            strata managers, owners corporations and property managers every day.
          </p>
        </div>
        <div className="mt-9 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <h2 className="text-lg font-bold text-sky-950">Request a Quote</h2>
          <p className="mt-1 text-sm text-slate-500">Fill in the form below and one of our marketing consultants will be in touch shortly.</p>
          <div className="mt-6">
            <AdvertiseForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sky-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
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
          © 2025 Remedial Building Australia. All content copyright Arasep Projects Pty Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
