import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Magnesite Flooring Deterioration | Remedial Building Australia",
  description:
    "Technical guide to magnesite flooring deterioration — causes, inspection requirements, typical repair methodology and related repair systems for Class 2 buildings.",
};

const inspectionItems = [
  "Assess magnesite condition across the floor — firmness, delamination, cracking and surface breakdown.",
  "Identify moisture source and confirm waterproofing condition below and around the flooring.",
  "Use a moisture meter to measure moisture levels in the magnesite and substrate.",
  "Break out locally to inspect the structural slab, steel deck or reinforcement below.",
  "Assess extent and severity of corrosion to embedded reinforcement or steel substrate.",
  "Confirm extent of magnesite removal required before proceeding.",
  "Document affected areas with photos and mapping prior to any works.",
];

const methodology = [
  "Identify and address the moisture source before commencing any removal or repair.",
  "Isolate affected areas and establish containment to manage dust and debris from removal.",
  "Remove deteriorated magnesite flooring by mechanical means — grinding, scarifying or jackhammering as appropriate.",
  "Take care during removal not to damage the structural slab, steel deck or waterproofing substrate below.",
  "Clean all magnesite residue from the substrate surface after removal.",
  "Expose and assess the structural substrate fully once magnesite is removed.",
  "Treat corroded reinforcement or steel deck substrate as directed by the engineer.",
  "Apply concrete repairs to the slab substrate where required before waterproofing.",
  "Install an approved waterproofing or moisture barrier system to the prepared substrate.",
  "Allow waterproofing to fully cure and complete any required testing before overcoating.",
  "Install new approved flooring system compatible with the substrate and building use.",
  "Ensure adequate curing and protection of the new flooring system during construction.",
  "Record QA photos, product details, batch numbers, test results and completed hold points.",
];

const risks = [
  "Ongoing moisture damage to the structural substrate.",
  "Accelerated corrosion of reinforcement or steel deck.",
  "Structural deterioration if left untreated.",
  "Damage to finishes and fixtures above flooring.",
  "Increasing scope and cost of removal over time.",
  "Health and safety concerns from deteriorated surfaces.",
  "Moisture transmission affecting lower floor tenancies.",
];

export default function MagnesiteFlooringDeteriorationPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <SiteHeader />

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a
            href="/defect-library/concrete-structural-defects"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
          >
            ← Back to Concrete & Structural Defects
          </a>

          <div className="mt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">
                Concrete & Structural Defects
              </p>

              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">
                Magnesite Flooring Deterioration
              </h1>

              <p className="mt-6 text-xl leading-9 text-slate-700">
                Magnesite flooring deterioration occurs when moisture activates
                the magnesium chloride salts within the screed, causing softening,
                delamination, surface breakdown and accelerated corrosion of the
                underlying steel deck or concrete reinforcement.
              </p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Soft, powdery or friable surface",
                "Surface delamination and flaking",
                "Rust staining through flooring",
                "Moisture-related swelling or softening",
                "Cracking and surface breakdown",
                "Loose or hollow areas underfoot",
              ]}
            />

            <InfoCard
              title="Common Causes"
              items={[
                "Moisture activating magnesium chloride salts",
                "Failed waterproofing below or around flooring",
                "Inadequate surface sealing",
                "Drainage or plumbing failure",
                "Age-related deterioration",
                "Corrosion of steel deck substrate below",
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
            <h2 className="text-3xl font-bold text-sky-950">
              Typical Repair Methodology
            </h2>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Magnesite removal and reinstatement must be planned carefully. The
              moisture source must be resolved before repair. Final scope and
              substrate treatment to be confirmed by the project engineer.
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
            <a
              href="/repair-systems/magnesite-flooring-deterioration"
              className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Moisture suppression primers", "Self-levelling underlayments", "Floor patching compounds", "Floor grinding and preparation"].map((item) => (
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

      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12">
          <a
            href="/"
            className="inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
          >
            ← Home
          </a>
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
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">News &amp; Insights</a>
            <a href="/directory" className="hover:text-sky-700">Business Directory</a>
            <a href="#" className="termly-display-preferences hover:text-sky-700">Consent Preferences</a>
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
