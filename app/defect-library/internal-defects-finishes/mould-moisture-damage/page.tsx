import type { Metadata } from "next";
import Link from "next/link";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Mould & Moisture Damage | Remedial Building Australia",
  description: "Technical guide to mould and moisture damage in Class 2 buildings — causes, health risks, inspection and remediation.",
};

const inspectionItems = [
  "Identify all visible mould growth and map locations relative to potential moisture sources.",
  "Measure relative humidity in affected rooms — sustained RH above 70% supports mould growth.",
  "Use a moisture meter to assess moisture content of affected walls, ceilings and floors.",
  "Inspect the external envelope at locations corresponding to internal mould — check for waterproofing, flashing or sealant failure.",
  "Inspect exhaust ventilation outlets for blockage and confirm they exhaust directly outside the building.",
  "Assess the insulation levels in external walls and ceilings adjacent to mould zones.",
  "Engage a mould assessor to conduct spore sampling where health impacts are reported.",
  "Confirm whether the moisture source is external ingress or internal condensation before specifying treatment.",
];

const methodology = [
  "Address the moisture source first — mould treatment without source rectification will result in recurrence.",
  "Engage a licensed mould remediation contractor where mould coverage exceeds 1 sqm or where health impacts are reported.",
  "Establish containment and negative pressure in affected areas before mould removal commences.",
  "Remove all mould-affected plasterboard, insulation and framing that cannot be effectively cleaned.",
  "Apply a biocidal mould treatment to all affected and adjacent surfaces, allowing adequate dwell time.",
  "HEPA vacuum all treated surfaces and dispose of contaminated materials as regulated waste.",
  "Allow the area to dry fully before re-lining.",
  "Re-line with moisture-resistant plasterboard in high-risk zones.",
  "Install additional mechanical ventilation where condensation is a recurring source.",
  "Apply a mould-resistant paint system throughout the remediated areas.",
  "Conduct a post-remediation verification inspection before reoccupation.",
];

const risks = [
  "Health risks including respiratory illness, allergic reactions and asthma from mould spore exposure",
  "Progressive contamination of building materials requiring full strip-out and replacement",
  "Structural damage to timber framing and plasterboard from prolonged mould",
  "Significant strata liability for health impacts on occupants",
  "Disputes and potential litigation if the moisture source is common property",
  "Difficulty in selling or renting affected lots",
  "Insurance claims and dispute resolution costs",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <SiteHeader />
      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <Link href="/defect-library/internal-defects-finishes" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">← Back to Internal Defects & Finishes</Link>
          <div className="mt-10">
            <div>
              <PageNav />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Internal Defects & Finishes</p>
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-sky-950">Mould & Moisture Damage</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Mould growth in Class 2 buildings is a significant health concern and is increasingly the subject of strata disputes and litigation. Mould requires moisture, a food source (building materials) and warmth to grow. In apartment buildings, the primary moisture sources driving mould are water ingress from external envelope defects, condensation from inadequate insulation and ventilation, and moisture from internal sources such as bathrooms and kitchens without adequate exhaust. Visible mould is the final indicator — by the time it appears on surfaces, the underlying building materials are likely already significantly contaminated.</p>
            </div>
          </div>
          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Visible mould growth on walls, ceilings and around windows", "Musty or earthy smell in affected rooms", "Condensation on windows and cold external walls", "Paint peeling and blistering in wet or cold areas", "Black staining in grout joints in bathrooms", "Residents experiencing respiratory symptoms, allergies or asthma", "Discolouration of plasterboard near external walls"]} />
            <InfoCard title="Common Causes" items={["Water ingress from failed waterproofing, flashings or sealants", "Inadequate exhaust ventilation in bathrooms, laundries and kitchens", "Thermal bridging at cold external walls creating condensation surfaces", "Absence of ceiling insulation causing condensation on ceiling plasterboard", "Inadequate make-up air allowing humidity to build up in sealed apartments", "Wet building materials from construction moisture not dried before enclosure", "Failed or unvented dryer exhausting moisture into the building"]} />
            <InfoCard title="Risk of Neglect" items={risks} />
          </section>
          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-3xl font-bold text-sky-950">Inspection Requirements</h2>
              <a href="#" className="rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">Download Inspection Checklist</a>
            </div>
            <ul className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-7">
              {inspectionItems.map((item) => (<li key={item} className="flex gap-3 text-base leading-8 text-slate-800"><span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}
            </ul>
          </section>
          <div className="mt-6">
            <Link href="/ai-scope-builder" className="inline-flex rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
              Start Inspection Checklist
            </Link>
            <p className="mt-2 text-sm text-slate-500">Create a project inspection record, add defect locations, upload photos, and save notes for scope writing.</p>
          </div>
          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Typical Repair Methodology</h2>
<ol className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-7 py-6">
              {methodology.map((step, index) => (<li key={step} className="flex gap-4 text-base leading-8 text-slate-800" style={{ marginBottom: index < methodology.length - 1 ? "3mm" : 0 }}><span className="mt-1 shrink-0 text-sm font-bold text-slate-500">{String(index + 1).padStart(2, "0")}.</span><span>{step}</span></li>))}
            </ol>
          </section>
          <section className="mt-16">
            <Link href="/repair-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">{["Mould remediation and containment systems", "Moisture source rectification systems", "Mechanical ventilation upgrade systems", "Mould-resistant lining and coating systems", "Post-remediation verification and air quality testing"].map((item) => (<li key={item} className="flex gap-3 text-base leading-7 text-slate-700"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}</ul>
              <div className="mt-6 font-bold text-red-700">Open Repair Systems →</div>
            </Link>
          </section>
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

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm">
      <div className="mb-5 h-1.5 w-16 rounded-full bg-red-700" />
      <h2 className="text-2xl font-bold text-sky-950">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (<li key={item} className="flex gap-3 text-base leading-8 text-slate-800"><span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-red-700" />{item}</li>))}
      </ul>
    </div>
  );
}
