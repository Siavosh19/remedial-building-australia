import type { Metadata } from "next";
import Link from "next/link";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Façade & External Envelope | Remedial Building Australia",
  description:
    "Technical guidance on façade and external envelope defects in Class 2 buildings — render cracking, brickwork deterioration, cladding failure, joint sealants, balustrades, coatings and perimeter leaks.",
};

const defects = [
  {
    title: "Render Cracking & Delamination",
    description: "Cracking, blistering and detachment of external render systems from the substrate due to moisture, movement and adhesion failure.",
    image: "/Images/Categories/facade-external-envelope.jpg",
    href: "/defect-library/facade-external-envelope/render-cracking-delamination",
    imagePosition: "object-center",
  },
  {
    title: "Brickwork Deterioration",
    description: "Spalling, cracking and mortar joint failure in face brick facades caused by moisture cycling, salt attack and movement.",
    image: "/Images/Categories/facade-external-envelope.jpg",
    href: "/defect-library/facade-external-envelope/brickwork-deterioration",
    imagePosition: "object-center",
  },
  {
    title: "Cladding Failure",
    description: "Delamination, cracking or detachment of facade cladding panels including fibre cement, composite and aluminium systems.",
    image: "/Images/Categories/facade-external-envelope.jpg",
    href: "/defect-library/facade-external-envelope/cladding-failure",
    imagePosition: "object-center",
  },
  {
    title: "Failed Sealants & Joints",
    description: "Deterioration and failure of movement joint sealants allowing water ingress and moisture damage to the building envelope.",
    image: "/Images/Categories/facade-external-envelope.jpg",
    href: "/defect-library/facade-external-envelope/failed-sealants-joints",
    imagePosition: "object-center",
  },
  {
    title: "Façade Cracking",
    description: "Structural and non-structural cracking through external facades caused by thermal movement, loading and differential settlement.",
    image: "/Images/Categories/facade-external-envelope.jpg",
    href: "/defect-library/facade-external-envelope/facade-cracking",
    imagePosition: "object-center",
  },
  {
    title: "Window & Door Perimeter Failure",
    description: "Water ingress, rotten frames, jammed sashes, failed flashings, missing storm angles and non-compliant door hobs at window and door perimeters.",
    image: "/Images/Categories/facade-external-envelope.jpg",
    href: "/defect-library/facade-external-envelope/window-door-perimeter-failure",
    imagePosition: "object-center",
  },
  {
    title: "Defective & Non-Compliant Balustrades",
    description: "Corroded steel posts, rotten timber frames, non-compliant heights, failed glass fixings and structurally inadequate masonry balustrades.",
    image: "/Images/Categories/facade-external-envelope.jpg",
    href: "/defect-library/facade-external-envelope/defective-non-compliant-balustrades",
    imagePosition: "object-center",
  },
  {
    title: "External Coating & Paint Deterioration",
    description: "Peeling, blistering, chalking and failed external coatings on rendered, masonry, concrete, timber and metal facade elements.",
    image: "/Images/Categories/facade-external-envelope.jpg",
    href: "/defect-library/facade-external-envelope/external-coating-paint-deterioration",
    imagePosition: "object-center",
  },
];

export default function FacadeExternalEnvelopePage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <SiteHeader />

      <main className="px-6 py-16">
        <section className="mx-auto max-w-7xl">
          <Link href="/defect-library" className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100">
            ← Back to Defect Library
          </Link>

          <div className="mt-10 max-w-4xl">
            <PageNav />
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Defect Category</p>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-sky-950">Façade & External Envelope</h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Technical guidance covering render, brickwork, cladding, joint sealants, window and door perimeters, balustrades, external coatings and perimeter failures across the external envelope of Class 2 residential and mixed-use buildings.
            </p>
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
        <div className="mx-auto max-w-7xl px-5 pt-12">
          <Link href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">← Home</Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.</p>
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
