import type { Metadata } from "next";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Roof Leaks | Remedial Building Australia",
  description: "Technical guide to roof leaks in Class 2 buildings — causes, inspection requirements, repair methodology and related systems.",
};

const inspectionItems = [
  "Inspect the roof covering from the exterior for displaced, cracked, slipped or missing tiles or sheeting sections.",
  "Inspect all ridge and hip capping for failed or missing mortar bedding — tap to identify hollow sections.",
  "Inspect valley gutters, box gutters and parapet gutters for debris, corrosion and inadequate falls.",
  "Inspect all penetration flashings including skylights, exhaust fans, pipes and antennas for failed sealant.",
  "Enter the roof space during or immediately after rain to identify active drip locations and map against the roof plan.",
  "Inspect sarking membrane for tears, gaps and inadequate lapping between sheets.",
  "Assess the condition of the battens and roof framing for moisture damage, staining and rot.",
  "Engage a roofing contractor or building consultant to assess the full extent of defects from the roof surface.",
];

const methodology = [
  "Engage a roofing contractor to conduct a full roof inspection and prepare a scope of defective areas.",
  "Address all active leaks by temporary patching until the full repair programme is mobilised.",
  "Replace all cracked, broken and displaced roof tiles, re-bedding and pointing all ridge and hip capping.",
  "Relay all valley flashings where corroded, holed or inadequately lapped — use a minimum 0.6 mm aluminium or copper valley lining.",
  "Re-seal all penetration flashings with a compatible polyurethane or silicone sealant.",
  "Clear all debris from valley gutters, box gutters and downpipes.",
  "Repair or replace sarking membrane where torn or absent in sections where driving rain is a risk.",
  "Apply a roof tile sealer or re-pointing mortar treatment to all capping after bedding is repaired.",
  "Inspect and test all repairs with a hose test before demobilising.",
  "Repair all internal ceiling staining and plaster damage after confirming the leak is resolved.",
];

const risks = [
  "Structural damage to roof framing and ceiling joists from prolonged moisture",
  "Internal ceiling collapse in severe cases",
  "Mould growth creating health risks for occupants",
  "Damage to insulation reducing thermal performance",
  "Electrical hazard from water ingress near lighting and wiring",
  "Progressive deterioration of plaster ceilings, cornices and finishes",
  "Significant cost escalation if structural timber decay occurs",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <SiteHeader />

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/roofing-defects" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Roofing Defects
          </a>

          <div className="mt-10">
            <div>
              <PageNav />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Roofing Defects</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Roof Leaks</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Roof leaks in Class 2 buildings result from failure of the primary roof covering, junctions, penetrations or associated drainage elements. Unlike flat membrane roofs covered separately under Waterproofing, pitched roof leaks typically arise from tile displacement, cracked ridge capping, failed flashing sealants, and deteriorated valley gutters. Active leaks cause rapid damage to internal ceilings, insulation and building services and must be investigated and repaired promptly to prevent structural deterioration of the ceiling and roof framing.</p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Active water ingress through the ceiling during or after rain", "Staining and wet patches on internal plaster ceilings", "Mould growth in roof space and at ceiling level", "Displaced, cracked or missing roof tiles or sheeting", "Daylight visible through the roof cladding when viewed from the roof space", "Failed or open ridge and hip capping mortar", "Rust staining at valley gutters and box gutters"]} />
            <InfoCard title="Common Causes" items={["Displaced or cracked concrete or terracotta roof tiles", "Failed mortar bedding to ridge and hip capping", "Deteriorated lead or aluminium valley gutters", "Failed flashing sealant at penetrations and abutments", "Debris blockage causing overflow at gutters and valleys", "Insufficient tile lapping in low-pitch roof sections", "Sarking membrane deterioration or absence in driving rain conditions"]} />
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
            <a href="/repair-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Roof tile replacement and rebedding systems", "Ridge and hip capping re-mortar systems", "Valley and box gutter replacement systems", "Penetration flashing and sealant systems", "Roof space sarking and ventilation systems"].map((item) => (
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
