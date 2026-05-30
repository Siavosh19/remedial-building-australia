import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planter Box Waterproofing Failure | Remedial Building Australia",
  description:
    "Technical guide to planter box waterproofing failure — causes, inspection requirements, typical repair methodology and related repair systems for Class 2 buildings.",
};

const inspectionItems = [
  "Identify evidence of water tracking from planter boxes to soffits, walls or adjacent occupied areas.",
  "Inspect the planter box internal surfaces for membrane condition, cracks and failed joints.",
  "Check for the presence and condition of a root barrier system over the waterproofing membrane.",
  "Assess the drainage layer configuration and confirm drainage outlets are clear and functional.",
  "Inspect the external walls of the planter box for salt efflorescence, staining and concrete deterioration.",
  "Check that weep holes or drainage points are present, correctly positioned and unblocked.",
  "Assess the structural condition of the planter box walls and base for signs of moisture-related deterioration.",
  "Review detailing at all junctions between the planter box and adjacent building elements.",
];

const methodology = [
  "Engage a waterproofing consultant to confirm the defect assessment, system selection and repair scope.",
  "Completely remove all soil, planting media, drainage aggregate, root barrier, screed and existing membrane.",
  "Inspect and repair the structural substrate including any spalling, cracking or reinforcement corrosion.",
  "Prepare the concrete substrate by grinding to remove laitance, old adhesive residue and contamination.",
  "Form or restore falls to drainage outlets — minimum 1:100 gradient required.",
  "Inspect and clear all drainage outlets and weep holes, replacing where corroded or damaged.",
  "Prime the substrate with the approved primer compatible with the selected waterproofing system.",
  "Install the approved waterproofing membrane system — typically a two-coat liquid applied or sheet membrane system.",
  "Detail all internal corners with coved transitions and ensure upturns extend a minimum 150 mm above the finished growing media level.",
  "Install a compatible, chemically resistant root barrier system over the waterproofing membrane.",
  "Install a drainage composite layer or aggregate drainage layer over the root barrier.",
  "Install a geotextile filter fabric over the drainage layer to prevent migration of soil into the drainage system.",
  "Reinstate the growing media and planting in accordance with the design.",
  "Monitor for water ingress to the structure below for a minimum of six weeks following reinstatement.",
  "Record all QA documentation including membrane thickness checks, product batch numbers and photographs.",
];

const risks = [
  "Corrosion of reinforcement within the planter box walls and base slab.",
  "Concrete spalling and structural deterioration from prolonged moisture exposure.",
  "Water ingress to occupied spaces or car parks below the planter box.",
  "Root penetration through failed membrane causing accelerated deterioration.",
  "Progressive salt efflorescence and staining on adjacent building elements.",
  "High remediation cost from extensive concrete and structural repairs.",
  "Liability under building defect warranty for inadequate waterproofing installation.",
];

export default function PlanterBoxWaterproofingFailurePage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">Remedial Building Australia</div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">Technical Remedial Building Platform</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
                        <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">Repair Systems</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">Industry News</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
            <a href="/directory/login" className="whitespace-nowrap hover:text-red-700 transition">Login</a>
            <a href="/directory/login" className="whitespace-nowrap hover:text-red-700 transition">Login</a>
          
          </nav>
          <a href="/" className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 md:inline-flex">Home</a>
        </div>
      </header>

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/waterproofing-water-ingress" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Waterproofing & Water Ingress
          </a>

          <div className="mt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Waterproofing & Water Ingress</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Planter Box Waterproofing Failure</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Planter box waterproofing failure is a frequently identified defect in Class 2 residential and mixed-use buildings, particularly at podium level and on terrace areas. Planter boxes impose sustained moisture loads on the waterproofing system, which must also contend with root penetration, drainage layer surcharging and chemical attack from fertilisers and organic matter. Failure of the membrane or drainage system allows water to migrate into the concrete structure, causing reinforcement corrosion, concrete deterioration and water ingress to spaces below.
              </p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Water staining or active leaks on the soffit or wall below",
                "Salt efflorescence on the planter box walls and base",
                "Concrete spalling or rust staining on planter walls",
                "Blocked or overflowing drainage outlets",
                "Saturated or waterlogged growing media",
                "Root intrusion visible at cracks or joints",
                "Damp internal finishes adjacent to the planter box",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Absence of or inadequate root barrier over the membrane",
                "Membrane failure at the base-to-wall junction",
                "Blocked drainage layer causing water surcharging against the membrane",
                "Insufficient or absent weep holes in the planter wall",
                "Chemical attack on the membrane from fertilisers or soil acids",
                "Membrane puncture during installation of plants or irrigation",
                "Inadequate membrane upturn height at the planter perimeter",
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
            <a href="/ai-scope-builder/new" className="inline-flex rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
              Start Inspection Checklist
            </a>
            <p className="mt-2 text-sm text-slate-500">Create a project inspection record, add defect locations, upload photos, and save notes for scope writing.</p>
          </div>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Typical Repair Methodology</h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Full reinstatement of the planter box waterproofing and drainage system is typically required. The scope must be confirmed by a waterproofing consultant.
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
                {["Liquid applied waterproofing membranes", "Root-resistant membrane systems", "Drainage composite systems", "Cementitious tanking systems", "Geotextile and filter fabric systems"].map((item) => (
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
          <a href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">← Home</a>
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div>
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-semibold text-sky-950">
            <a href="/about" className="hover:text-sky-700">About</a>
            <a href="/contact" className="hover:text-sky-700">Contact</a>
            <a href="/terms" className="hover:text-sky-700">Terms</a>
            <a href="/privacy-policy" className="hover:text-sky-700">Privacy Policy</a>
            <a href="/defect-library" className="hover:text-sky-700">Defect Library</a>
            <a href="/repair-systems" className="hover:text-sky-700">Repair Systems</a>
            <a href="/industry-news" className="hover:text-sky-700">Industry News</a>
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
