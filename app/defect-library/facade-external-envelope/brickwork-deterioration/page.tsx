import type { Metadata } from "next";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Brickwork Deterioration | Remedial Building Australia",
  description:
    "Technical guide to brickwork deterioration in Class 2 buildings — spalling, mortar failure, efflorescence and repair methodology.",
};

const inspectionItems = [
  "Inspect the full facade for spalling, cracking, displacement and mortar joint deterioration across all elevations.",
  "Assess mortar joint depth and condition — recessed, crumbling or hollow mortar joints indicate weathering failure and require repointing.",
  "Check for efflorescence (white salt deposits) on brick faces as an indicator of moisture movement through the wall.",
  "Inspect expansion and movement joints across the facade — absence or blockage with mortar is a primary cause of brickwork cracking.",
  "Assess the condition of wall ties by probing mortar joints at regular intervals — corroded or absent ties are a serious structural concern.",
  "Inspect weepholes at the base of cavity walls and at lintel levels to confirm they are clear and functioning.",
  "Check window and door head flashings and sill flashings for correct installation, continuity and condition.",
  "Engage a structural engineer where wall tie failure, significant cracking or displaced brickwork is identified.",
];

const methodology = [
  "Erect scaffolding to provide safe access to all affected brickwork areas across the facade.",
  "Conduct a hammer sounding survey to identify hollow or de-bonded bricks — mark boundaries for removal.",
  "Remove all spalled, cracked and structurally unsound bricks from the affected areas by careful cutting to minimise impact on adjacent sound bricks.",
  "Source matching replacement bricks — consider weathering, colour variation and local availability when selecting materials.",
  "Clean and prepare mortar beds and perpend joints in the opening before installing replacement bricks.",
  "Install replacement bricks using a compatible mortar mix matched to the existing in strength and composition.",
  "Rake out all deteriorated mortar joints across the repointing scope to a depth of 20 mm using an angle grinder or oscillating tool.",
  "Clean all raked joints with compressed air or a stiff brush to remove all dust and loose material before repointing.",
  "Repoint raked joints with a pre-bagged pointing mortar matched to the existing in colour, texture and strength.",
  "Tool joints to match the existing profile — ironed, flush or raked as specified.",
  "Install movement joints at all structural junctions, control joints and at maximum 8 m centres where absent, in accordance with AS 3700.",
  "Clear all blocked weepholes and install new weepholes at 600 mm centres where absent or missing.",
  "Apply a penetrating silane water repellent treatment to the completed brickwork where specified by the engineer.",
  "Inspect and rectify flashings at all window and door heads, sills and cavity walls where defective.",
];

const risks = [
  "Water ingress through failed mortar joints causing internal moisture damage.",
  "Progressive brick spalling creating falling hazards at height.",
  "Wall tie corrosion leading to loss of structural wall tie connection and potential leaf separation.",
  "Salt crystallisation causing accelerating brick face deterioration.",
  "Inadequate weather resistance from missing or blocked weepholes.",
  "Cracking from thermal and moisture movement in absent movement joints.",
  "Significant remediation cost once widespread wall tie failure is confirmed.",
];

export default function BrickworkDeteriorationPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <SiteHeader />

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/facade-external-envelope" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Façade & External Envelope
          </a>

          <div className="mt-10">
            <div>
              <PageNav />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Façade & External Envelope</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Brickwork Deterioration</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Brickwork deterioration in Class 2 buildings encompasses spalling of brick faces, progressive mortar joint failure, salt efflorescence, cracking from absent movement joints and wall tie corrosion in cavity wall construction. Brick facade systems are exposed to repeated wetting and drying, thermal movement and salt attack — particularly in coastal and humid climates. Mortar joint failure allows moisture to enter the cavity, wet the wall ties and penetrate to the internal leaf, driving progressive deterioration that is disproportionately expensive to remediate if left unaddressed.
              </p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Spalling or flaking of brick face material",
                "White efflorescence deposits on brick surfaces",
                "Recessed, crumbling or hollow mortar joints",
                "Horizontal or stepped cracking through mortar beds",
                "Rust staining from corroding wall ties bleeding through the face",
                "Displaced or bulging brickwork sections",
                "Blocked or absent weepholes at base of cavity",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Mortar too strong relative to the brick — restrains natural movement",
                "Absent or blocked expansion and movement joints",
                "Corroded or failed wall ties in cavity construction",
                "Salt crystallisation from moisture cycling in porous bricks",
                "Incorrectly installed or absent flashings and weepholes",
                "Use of Portland cement mortar over softer heritage bricks",
                "Water penetration at failed sealants, sills and head flashings",
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
              Brickwork remediation requires careful selection of compatible materials. Over-strong mortar mixes on soft or heritage bricks cause further spalling and must be avoided.
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
            <a href="/repair-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Masonry repointing and mortar repair systems", "Wall tie replacement systems", "Movement joint installation and sealant systems", "Brick replacement and matching programmes", "Penetrating silane water repellent systems"].map((item) => (
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
