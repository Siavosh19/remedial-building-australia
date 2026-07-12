import type { Metadata } from "next";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Podium Waterproofing Failure | Remedial Building Australia",
  description:
    "Technical guide to podium waterproofing failure — causes, inspection requirements, typical repair methodology and related repair systems for Class 2 buildings.",
};

const inspectionItems = [
  "Map all water ingress points on the soffit and walls of the car park or occupied space below the podium.",
  "Inspect the podium deck surface for membrane condition, cracking, blistering and areas of delamination.",
  "Assess drainage falls across the deck and confirm outlets are correctly positioned and unobstructed.",
  "Inspect all construction joints, movement joints and expansion joints for failed seals and waterproofing.",
  "Check waterproofing upturns at all perimeter walls, columns and transitions for height and continuity.",
  "Investigate under pavers, tiles or topping slab to assess the membrane condition where possible.",
  "Assess penetrations including drainage outlets, conduits, bollards and structural connections for failed detailing.",
  "Review the original waterproofing specification and drawings to confirm the specified system and installation requirements.",
];

const methodology = [
  "Engage a waterproofing consultant and structural engineer to confirm the defect assessment, extent of damage and repair system selection.",
  "Establish the repair zone boundary — localised patch repair or full-deck replacement depending on condition assessment.",
  "Protect drainage outlets and building services prior to removing surface finishes.",
  "Remove pavers, topping slab, screed, drainage composite and existing membrane system to expose the structural deck.",
  "Inspect and repair the structural deck for concrete spalling, cracking and reinforcement corrosion.",
  "Re-form drainage falls where insufficient — minimum 1:100 to each drainage outlet.",
  "Prepare the concrete substrate by grinding to remove all laitance, adhesive and contamination.",
  "Install new drainage outlets or upgrade existing outlets to be flush with the finished membrane surface.",
  "Prime the prepared substrate with the approved primer compatible with the selected membrane system.",
  "Install the approved trafficable waterproofing membrane system across the full deck area and upturns, in strict compliance with AS 4654 and the project specification.",
  "Detail all movement joints, construction joints and expansion joints with compatible joint tape and sealant.",
  "Install pre-formed or site-formed membrane collars at all penetrations through the deck.",
  "Install a drainage composite layer and geotextile over the membrane prior to reinstating the topping or paver finish.",
  "Carry out flood testing across the full deck area prior to reinstating the surface finish.",
  "Record all QA documentation including flood test results, membrane thickness measurements, product batch numbers and photographs.",
];

const risks = [
  "Ongoing water ingress to the car park or occupied space below.",
  "Structural deterioration of the podium deck slab and beams.",
  "Reinforcement corrosion and concrete spalling on soffits and columns.",
  "Damage to vehicles and building services from active water leaks.",
  "Significant cost escalation from deferred full-deck replacement.",
  "Liability under strata and building defect legislation.",
  "Progressive joint failure leading to widespread uncontrolled ingress.",
];

export default function PodiumWaterproofingFailurePage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <SiteHeader />

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/waterproofing-water-ingress" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Waterproofing & Water Ingress
          </a>

          <div className="mt-10">
            <div>
              <PageNav />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Waterproofing & Water Ingress</p>
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-sky-950">Podium Waterproofing Failure</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Podium waterproofing failure is one of the most significant and costly defects encountered in multi-storey Class 2 residential and mixed-use buildings. The podium deck is typically a large concrete slab spanning over car parks or retail spaces, subjected to traffic, landscape loading, UV exposure and thermal movement. When the waterproofing membrane system fails — at joints, penetrations or across the field area — water tracks directly into the structure and the occupied levels below. Full-deck replacement is often required, making early identification and repair critical.
              </p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Active water leaks and staining on the car park soffit",
                "Rust staining and concrete spalling on soffit beams and columns",
                "Ponding water on the podium deck surface",
                "Failed expansion joint sealants and membrane split at joints",
                "Efflorescence deposits on car park walls and columns",
                "Tile or paver lifting on the podium surface",
                "Blocked drainage outlets and overflowing drainage channels",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Membrane failure at movement and expansion joints",
                "Insufficient membrane upturn height at perimeter walls and columns",
                "Membrane puncture from traffic loading or installation damage",
                "Thermal cycling causing membrane splitting at laps and terminations",
                "Failed drainage outlet detailing allowing water bypass",
                "Inadequate falls resulting in sustained ponding against the membrane",
                "Deferred maintenance of joint sealants allowing water entry",
              ]}
            />
            <InfoCard title="Risk of Neglect" items={risks} />
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Inspection Requirements</h2>
            <ul className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-7">
              {inspectionItems.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-8 text-slate-800">
                  <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <div className="mt-6">
            <a href="/ai-scope-builder" className="inline-flex rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
              Start Inspection Checklist
            </a>
            <p className="mt-2 text-sm text-slate-500">Create a project inspection record, add defect locations, upload photos, and save notes for scope writing.</p>
          </div>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Typical Repair Methodology</h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              The final repair scope must be confirmed by the waterproofing consultant and structural engineer. The sequence below reflects a typical full-deck waterproofing replacement on a trafficable podium.
            </p>
<ol className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-7 py-6">
              {methodology.map((step, index) => (
                <li key={step} className="flex gap-4 text-base leading-8 text-slate-800" style={{ marginBottom: index < methodology.length - 1 ? "3mm" : 0 }}>
                  <span className="mt-1 shrink-0 text-sm font-bold text-slate-500">{String(index + 1).padStart(2, "0")}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-16">
            <a href="/repair-systems/waterproofing-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Trafficable liquid applied membrane systems", "Sheet membrane systems for podium decks", "Movement and expansion joint repair systems", "Drainage composite and filter systems", "Protective topping and paver systems"].map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 font-bold text-red-700">Open Repair Systems →</div>
            </a>
          </section>
        </section>
      </main>

      <SeoCrossPromo />

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12">
          <a href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">← Home</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.</p>
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

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm">
      <div className="mb-5 h-1.5 w-16 rounded-full bg-red-700" />
      <h2 className="text-2xl font-bold text-sky-950">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-8 text-slate-800">
            <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-red-700" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
