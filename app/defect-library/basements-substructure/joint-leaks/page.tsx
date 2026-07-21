import type { Metadata } from "next";
import Link from "next/link";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Joint Leaks | Remedial Building Australia",
  description: "Technical guide to construction and expansion joint leaks in Class 2 building basements — causes, inspection and repair methodology.",
};

const inspectionItems = [
  "Map all construction and expansion joint locations in the basement and assess each for moisture, seepage and active flow.",
  "Determine the severity of ingress at each joint — weeping, seeping or flowing.",
  "Probe joint faces to identify the presence and condition of any existing waterstop or sealant.",
  "Assess whether joints are moving (expansion joints) or dormant (construction joints).",
  "Review original structural drawings to confirm waterstop specification and joint locations.",
  "Install tell-tales at joints showing signs of active movement before specifying the repair approach.",
  "Conduct injection tests at minor seeping joints to assess the potential for polyurethane injection to be effective.",
  "Engage a waterproofing engineer to confirm the repair specification — particularly for active flowing joints.",
];

const methodology = [
  "For minor seeping construction joints — chase out 20 mm wide and 20 mm deep along the full joint length, inject with hydrophilic polyurethane, and apply a cementitious repair and crystalline coating.",
  "For moderate ingress at construction joints — drill and install injection ports at 100–150 mm centres along the joint and inject with hydrophilic polyurethane resin.",
  "For active flowing joints — install hydraulic cement or quick-setting plugging compound to reduce flow rate before injection.",
  "For failed expansion joints — remove all existing sealant and backing, install new closed-cell backer rod and apply a two-component polyurethane sealant in accordance with the joint movement capacity.",
  "Where a waterstop was never installed or has failed — install an injectable water bar system into a chase cut along the joint.",
  "Apply a crystalline waterproofing coating over all repaired joint zones as a secondary barrier.",
  "Install a drainage channel along the slab-wall junction where ongoing seepage cannot be fully stopped.",
  "Record all injection locations, port positions, product details and test results.",
];

const risks = [
  "Ongoing water ingress from high-risk joints causing basement flooding in heavy rain",
  "Corrosion of reinforcement adjacent to chronically wet joint zones",
  "Progressive damage to basement finishes from ongoing moisture",
  "Joint ingress escalating to slab and wall face ingress as adjacent concrete deteriorates",
  "Significant cost of joint remediation — particularly at the slab-wall junction",
  "Strata disputes and liability from ongoing flooding events",
  "Structural concern if joint movement is still active and increasing",
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
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-sky-950">Joint Leaks</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Construction joints, day joints and expansion joints are the most common location for water ingress in basement concrete structures. These joints represent deliberate or unavoidable discontinuities in the concrete — and despite being designed with waterstops, injection hoses or sealants, are frequently the first point of failure when subjected to hydrostatic pressure. In multi-storey Class 2 buildings, the wall-to-slab construction joint is the single highest-risk location for basement water ingress and must be treated as a primary waterproofing concern in both new construction and remediation.</p>
            </div>
          </div>
          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Active water flow or seeping at the junction of the basement slab and wall", "Staining and efflorescence directly at construction joint lines", "Water ingress visible at horizontal construction joint bands across the wall face", "Failed or absent waterstop visible at joints where concrete has spalled away", "Active ingress at expansion joint locations from failed sealant or waterstop", "Damp patches on the wall face directly corresponding to pour sequence joint locations", "Tide marks and salt deposits along joint lines"]} />
            <InfoCard title="Common Causes" items={["Failed or absent PVC or hydrophilic waterstop in the construction joint", "Waterstop displaced from correct position during concrete pour", "Failed injectable hose system — hose blocked or not injected", "Construction joint sealant failed from age, movement or incompatible product", "Poor concrete consolidation at the joint zone leaving voids", "Joint formed without any waterproofing treatment", "Differential structural movement opening construction joints over time"]} />
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
              <ul className="mt-4 space-y-2">{["Hydrophilic polyurethane joint injection systems", "Injectable water bar installation systems", "Expansion joint reseal systems", "Crystalline waterproofing coating systems", "Drainage channel installation systems"].map((item) => (<li key={item} className="flex gap-3 text-base leading-7 text-slate-700"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}</ul>
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
