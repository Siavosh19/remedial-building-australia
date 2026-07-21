import type { Metadata } from "next";
import Link from "next/link";
import PageNav from "@/components/PageNav";

import SiteHeader from "@/components/SiteHeader";
import SeoCrossPromo from "@/components/sections/SeoCrossPromo";
export const metadata: Metadata = {
  title: "Reinforcement Corrosion | Remedial Building Australia",
  description:
    "Technical guide to reinforcement corrosion — causes, inspection requirements, typical repair methodology and related repair systems for Class 2 buildings.",
};

const inspectionItems = [
  "Map rust staining, cracking and delamination across all affected elements.",
  "Hammer tap test to identify drummy or delaminated concrete cover.",
  "Measure concrete cover depth with a cover meter across the element.",
  "Break out locally to expose reinforcement and assess corrosion extent and section loss.",
  "Test carbonation depth using phenolphthalein indicator on freshly broken surfaces.",
  "Test chloride content at reinforcement depth where marine or salt exposure is suspected.",
  "Assess concrete permeability, quality and likelihood of further ingress.",
];

const methodology = [
  "Confirm repair scope with the project engineer prior to commencing breakout.",
  "Break out concrete around corroded reinforcement until clean steel and sound concrete are exposed on all sides.",
  "Continue breakout to a minimum of 25mm behind the reinforcement bar.",
  "Assess reinforcement section loss and confirm acceptability with the engineer before proceeding.",
  "Replace or supplement reinforcement only where directed by the engineer.",
  "Clean reinforcement to remove all corrosion, scale and loose material to an approved cleanliness standard.",
  "Remove all dust, laitance and deleterious material from repair surfaces.",
  "Prime exposed reinforcement with an approved corrosion-inhibiting primer and allow to cure.",
  "Pre-wet the prepared concrete substrate and remove standing water before repair.",
  "Apply an approved bonding slurry or primer compatible with the selected repair mortar.",
  "Apply repair mortar in layers within approved thickness limits and compact firmly around reinforcement.",
  "Finish the repair flush with surrounding concrete to the required profile and tolerance.",
  "Cure repaired areas immediately using approved curing methods and protect from early drying.",
  "Apply anti-carbonation or protective coating to the repaired and surrounding surfaces where required.",
  "Record QA photos, repair locations, products used, batch numbers and completed hold points.",
];

const risks = [
  "Progressive section loss of reinforcement.",
  "Concrete spalling and delamination.",
  "Falling concrete hazard.",
  "Reduced structural capacity.",
  "Accelerating deterioration over time.",
  "Higher remedial cost if left untreated.",
  "Water ingress into adjacent elements.",
];

export default function ReinforcementCorrosionPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <SiteHeader />

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <Link
            href="/defect-library/concrete-structural-defects"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
          >
            ← Back to Concrete & Structural Defects
          </Link>

          <div className="mt-10">
            <div>
              <PageNav />
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
                Concrete & Structural Defects
              </p>

              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-sky-950">
                Reinforcement Corrosion
              </h1>

              <p className="mt-6 text-xl leading-9 text-slate-700">
                Reinforcement corrosion is the oxidation of embedded steel bars
                caused by carbonation, chloride ingress or moisture penetration
                through the concrete cover, resulting in expansive rust products
                that crack and delaminate the surrounding concrete.
              </p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Rust staining on concrete surfaces",
                "Cracking parallel to reinforcement",
                "Delaminated or drummy concrete",
                "Exposed corroded steel bars",
                "Map or pattern surface cracking",
              ]}
            />

            <InfoCard
              title="Common Causes"
              items={[
                "Carbonation of concrete cover",
                "Chloride ingress from marine or salt exposure",
                "Inadequate concrete cover depth",
                "Poor concrete quality or permeability",
                "Sustained moisture or water ingress",
                "Failed waterproofing or façade sealing",
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
            <Link href="/ai-scope-builder" className="inline-flex rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
              Start Inspection Checklist
            </Link>
            <p className="mt-2 text-sm text-slate-500">Create a project inspection record, add defect locations, upload photos, and save notes for scope writing.</p>
          </div>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">
              Typical Repair Methodology
            </h2>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              The final repair scope must be confirmed by the project engineer and
              selected repair system. The sequence below outlines a typical
              methodology for reinforcement corrosion repairs.
            </p>

            <ol className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-7 py-6">
              {methodology.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 text-base leading-8 text-slate-800"
                  style={{ marginBottom: index < methodology.length - 1 ? "3mm" : 0 }}
                >
                  <span className="mt-1 shrink-0 text-sm font-bold text-slate-500">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-16">
            <Link
              href="/repair-systems/reinforcement-corrosion"
              className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Corrosion inhibitors", "Zinc-rich primers", "Rebar primers and inhibitors", "Cathodic protection", "Repair mortars", "Reinforcement mesh", "Epoxy anchoring adhesives", "CFRP strips and laminates", "Abrasives, blades and tools"].map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 font-bold text-red-700">Open Repair Systems →</div>
            </Link>
          </section>
        </section>
      </main>

      <SeoCrossPromo />

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12">
          <Link
            href="/"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
          >
            ← Home
          </Link>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">
              Remedial Building Australia
            </div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">
              A structured Australian remedial building knowledge platform for
              defects, repair systems, materials and future AI-assisted scope writing.
            </p>
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
