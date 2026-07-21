import type { Metadata } from "next";
import Link from "next/link";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Negative-Side Waterproofing Failure | Remedial Building Australia",
  description: "Technical guide to negative-side waterproofing failure in Class 2 building basements — causes, assessment and repair methodology.",
};

const inspectionItems = [
  "Hammer sound all negative-side coatings to identify hollow, delaminated zones.",
  "Inspect all coating surfaces for cracking, blistering and moisture breakthrough.",
  "Assess the coating thickness using a destructive test — probe with an awl at representative locations.",
  "Check the slab-wall junction termination detail — confirm the coating terminates correctly at the junction.",
  "Assess whether structural movement has contributed to coating failure.",
  "Measure moisture content in the substrate beneath the coating where delamination is confirmed.",
  "Assess the hydrostatic head based on the groundwater level from geotechnical data.",
  "Engage a waterproofing engineer to confirm whether re-coating or upgrade to a cavity drain system is the appropriate response.",
];

const methodology = [
  "Remove all delaminated and failed coating from the basement walls and slab.",
  "Prepare the substrate by grinding, scabbling and high-pressure washing to remove all contamination and laitance.",
  "Inject all active cracks and construction joints with hydrophilic polyurethane resin before applying the new coating.",
  "Allow the substrate to reach a saturated surface dry (SSD) condition before applying crystalline coating — do not apply to running wet surfaces.",
  "Apply the first coat of crystalline waterproofing slurry to the prepared substrate at the specified application rate.",
  "Apply the second coat perpendicular to the first after the first coat has reached initial set.",
  "Seal the slab-wall junction with a cove of crystalline mortar before applying the main coating.",
  "Apply the crystalline system to all penetrations, inlets and construction joints before applying to the field area.",
  "Protect the applied coating from rapid drying and apply a damp-cure regime for a minimum of 3 days.",
  "Monitor the repaired basement over 4 weeks before confirming system effectiveness.",
];

const risks = [
  "Ongoing water ingress to the basement after failed remediation attempt",
  "Delaminating coating creating a loose hazard at basement wall faces",
  "Further substrate deterioration from chronic moisture beneath a failed coating",
  "Significant cost of removing failed coating system and reapplying",
  "Escalation to cavity drain system at higher cost after coating systems fail",
  "Strata frustration from repeated failed repair cycles without structural resolution",
  "Reinforcement corrosion from chronic moisture on the internal wall face",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <SiteHeader />
      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <Link href="/defect-library/basements-substructure" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">← Back to Basements & Substructure</Link>
          <div className="mt-10">
            <div>
              <PageNav />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Basements & Substructure</p>
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-sky-950">Negative-Side Waterproofing Failure</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Negative-side waterproofing is applied to the internal (dry-side) face of basement walls and slabs, working against the direction of hydrostatic water pressure. Crystalline cementitious coatings, cementitious slurries and cavity drain systems are the primary negative-side systems used in basement remediation. While negative-side systems are the only option when the external face of the basement is inaccessible (as is typical for most remediation), they are more susceptible to pressure-induced delamination and require careful substrate preparation and application to achieve reliable performance.</p>
            </div>
          </div>
          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Delamination and detachment of internal crystalline or cementitious coating from the wall", "Active ingress beneath a previously applied negative-side coating", "Efflorescence pushing through the coating system", "Blistering or hollow areas in the applied coating", "Water appearing at the base of the wall where the coating terminates at the slab", "Reoccurrence of ingress shortly after application of a negative-side system", "Coating surface cracking from structural movement or inadequate substrate preparation"]} />
            <InfoCard title="Common Causes" items={["Crystalline coating applied to a contaminated or insufficiently prepared substrate", "Insufficient coating thickness — single coat where two coats were required", "Coating applied to a saturated substrate — water behind the coating prevents bonding", "Hydrostatic pressure exceeding the system design head", "Structural movement cracking the coating after application", "System termination at the slab-wall junction not sealed — water bypasses the coating", "Use of a negative-side system in conditions requiring positive-side tanking"]} />
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
              <ul className="mt-4 space-y-2">{["Crystalline cementitious waterproofing systems", "Cementitious slurry waterproofing systems", "Cavity drain membrane systems as upgrade", "Construction joint injection systems", "Waterproofing engineer assessment services"].map((item) => (<li key={item} className="flex gap-3 text-base leading-7 text-slate-700"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}</ul>
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
