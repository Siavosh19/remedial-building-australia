import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concrete Deterioration — Balconies | Remedial Building Australia",
  description: "Technical guide to concrete deterioration on balconies and podiums — spalling, corrosion and repair methodology.",
};

const inspectionItems = [
  "Inspect balcony soffits and slab edges from below for spalling, staining and cracking.",
  "Conduct hammer sounding of all balcony soffits to identify hollow delaminated zones.",
  "Assess reinforcement cover depth at slab edges and soffits using a cover meter.",
  "Test carbonation depth of the concrete using phenolphthalein indicator on fresh break samples.",
  "Measure crack widths and orientations at balcony soffits and slab edges.",
  "Assess the extent of corroded reinforcement in areas of spalling — measure bar section loss where possible.",
  "Engage a structural engineer to assess whether balcony structural capacity has been compromised.",
  "Document all defective areas with photographs and measurements for the repair scope.",
];

const methodology = [
  "Erect scaffolding and install safety netting below all affected balconies before commencing works.",
  "Engage a structural engineer to confirm repair specification, minimum concrete removal requirements and structural capacity.",
  "Break out all delaminated, spalled and carbonated concrete to expose sound substrate and reinforcement — minimum 10 mm behind corroded steel.",
  "Clean all exposed reinforcement by mechanical wire brushing or abrasive blasting to remove all rust scale.",
  "Apply a two-component epoxy or cementitious reinforcement primer to all cleaned steel bars.",
  "Apply a corrosion inhibitor to all reinforcement within the repair zone that cannot be fully exposed.",
  "Apply the specified bonding agent to the prepared concrete substrate.",
  "Rebuild concrete profiles using a pre-bagged polymer-modified cementitious repair mortar in layers not exceeding 30 mm per coat.",
  "Re-form all drip grooves and edge profiles as part of the repair.",
  "Apply a penetrating silane sealer to all repaired and adjacent concrete surfaces.",
  "Apply an anti-carbonation coating system to all balcony soffits where specified.",
  "Record all QA documentation including photographs, product details and area measurements.",
];

const risks = [
  "Spalling concrete falling from height — serious injury hazard",
  "Structural capacity reduction from significant reinforcement section loss",
  "Accelerating deterioration once spalling exposes reinforcement to direct wetting",
  "Water ingress through spall cracks to the apartment below",
  "Significant remediation cost escalation if left unaddressed",
  "Building Commission and council intervention for urgent safety works",
  "Insurance and liability exposure from falling concrete incidents",
];

export default function Page() {
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
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">News &amp; Insights</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/balconies-podiums" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Balconies & Podiums
          </a>

          <div className="mt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Balconies & Podiums</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Concrete Deterioration</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Balcony and podium concrete deterioration encompasses spalling, cracking and reinforcement corrosion in the concrete slab and supporting structure. Balconies are highly exposed elements — cantilevering beyond the building face, directly exposed to rain, UV and coastal environments — and are among the highest-risk locations for concrete deterioration in Class 2 buildings. Corroding reinforcement expands within the concrete, generating crack and spall forces that progressively destroy concrete cover. Spalling concrete at height is a falling hazard and requires urgent attention.</p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Spalling and delamination of concrete at the balcony soffit and slab edges", "Rust staining on balcony soffits and fascias", "Cracking parallel to the balcony soffit indicating reinforcement corrosion", "Hollow sound when soffit concrete is tapped", "Exposed corroded reinforcement bars in areas of advanced spalling", "Cracking at balcony cantilever root from structural stress", "Failed or deteriorated concrete at balcony slab edge profiles"]} />
            <InfoCard title="Common Causes" items={["Insufficient concrete cover over balcony soffit and edge reinforcement", "Carbonation of concrete reducing pH and depassivating steel", "Chloride penetration in coastal environments initiating corrosion", "Water ingress through failed waterproofing and tile systems accelerating corrosion", "Thermal movement cracking in balcony slabs without adequate movement joints", "Poor concrete compaction during construction leaving voids near reinforcement", "Design concrete cover below minimum 40 mm required for exposed elements under AS 3600"]} />
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
                {["Concrete spalling repair and reinstatement systems", "Reinforcement primer and corrosion inhibitor systems", "Anti-carbonation coating systems", "Silane penetrating sealer systems", "Structural strengthening systems for balcony elements"].map((item) => (
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
