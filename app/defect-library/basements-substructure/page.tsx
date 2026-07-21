import type { Metadata } from "next";
import Link from "next/link";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Basements & Substructure | Remedial Building Australia",
  description: "Technical guidance on basement and substructure defects in Class 2 buildings — crack injection, hydrostatic pressure, joint leaks and negative-side waterproofing.",
};

const defects = [
  {
    "title": "Crack Injection Failures",
    "description": "Failed epoxy or polyurethane crack injection repairs in basement walls and slabs allowing ongoing water ingress.",
    "href": "/defect-library/basements-substructure/crack-injection-failures",
    "image": "/Images/Categories/basements-substructure.jpg",
    "imagePosition": "object-center"
  },
  {
    "title": "Hydrostatic Pressure Issues",
    "description": "Water ingress driven by groundwater pressure against basement walls and slabs without adequate waterproofing.",
    "href": "/defect-library/basements-substructure/hydrostatic-pressure-issues",
    "image": "/Images/Categories/basements-substructure.jpg",
    "imagePosition": "object-center"
  },
  {
    "title": "Joint Leaks",
    "description": "Water ingress at construction joints, expansion joints and day joints in basement concrete structures.",
    "href": "/defect-library/basements-substructure/joint-leaks",
    "image": "/Images/Categories/basements-substructure.jpg",
    "imagePosition": "object-center"
  },
  {
    "title": "Negative-Side Waterproofing Failure",
    "description": "Failure of internally applied negative-side waterproofing systems in basement walls and slabs.",
    "href": "/defect-library/basements-substructure/negative-side-waterproofing-failure",
    "image": "/Images/Categories/basements-substructure.jpg",
    "imagePosition": "object-center"
  }
];

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />
      <main className="px-6 py-16">
        <section className="mx-auto max-w-7xl">
          <Link href="/defect-library" className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100">← Back to Defect Library</Link>
          <div className="mt-10 max-w-4xl">
            <PageNav />
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Defect Category</p>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-sky-950">Basements & Substructure</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">Technical guidance covering basement waterproofing failure, crack injection, hydrostatic pressure issues, construction joint leaks and negative-side waterproofing defects in Class 2 multi-storey buildings.</p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {defects.map((defect) => (
              <a key={defect.title} href={defect.href} className="rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
<div className="p-8">
                  <div className="mb-5 h-1.5 w-16 rounded-full bg-red-700" />
                  <h2 className="text-2xl font-bold leading-tight text-sky-950">{defect.title}</h2>
                  <p className="mt-5 text-sm leading-7 text-slate-600">{defect.description}</p>
                  <div className="mt-8 text-sm font-bold text-sky-700 transition hover:text-red-700">Open Defect →</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <SeoCrossPromo />

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12"><Link href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">← Home</Link></div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div><div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.</p></div>
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
