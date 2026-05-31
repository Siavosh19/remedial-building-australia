import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Façade Water Ingress | Remedial Building Australia",
  description:
    "Technical guide to façade water ingress — causes, inspection requirements, typical repair methodology and related repair systems for Class 2 buildings.",
};

const inspectionItems = [
  "Map all internal areas showing water ingress and plot against the external façade to identify likely entry points.",
  "Inspect the full external façade systematically from top to bottom — note cracks, open joints, failed sealants and exposed substrate.",
  "Check all vertical and horizontal sealant joints in cladding, curtain wall and panel systems for cohesive and adhesive failure.",
  "Inspect window and door perimeter seals, head flashings, sill details and reveals for water entry.",
  "Assess the render or cladding system for cracking, delamination and areas of impact damage that may allow water penetration.",
  "Check junctions between different cladding systems and materials, particularly at floors and balcony interfaces.",
  "Inspect penetrations through the façade including pipes, conduits, fixings and louvres for failed sealing.",
  "Conduct a water hose test on suspect areas to confirm the water entry path before committing to repair.",
];

const methodology = [
  "Engage a façade consultant to confirm the water entry path diagnosis and specify the repair system.",
  "Establish a safe work platform — swing stage, mast climbing work platform or scaffold — appropriate for the façade height and repair scope.",
  "Remove all failed sealants from vertical and horizontal joints using a sealant removal tool, ensuring all adhesive residue is removed from the substrate.",
  "Prepare sealant joint faces by grinding or wire brushing to remove contamination, bond breaker and loose material.",
  "Install correctly sized backing rods to all joints to control sealant depth and achieve the correct bead geometry.",
  "Apply an approved primer to the joint faces where required by the sealant manufacturer.",
  "Install the approved low-modulus silicone or polyurethane sealant, tooling to a concave profile to promote drainage and UV durability.",
  "Repair all cracks in the render or cladding system with compatible flexible fillers or repair mortars as appropriate to the substrate.",
  "Where render or cladding is delaminated or structurally unsound, remove and reinstate in accordance with the specification.",
  "Reinstate all failed window and door head flashings with correctly lapped and sealed aluminium or stainless steel flashings.",
  "Apply a penetrating silane or siloxane water repellent to the full external masonry or render face where required.",
  "Seal all penetration through the façade including fixings, services and louvres with compatible sealant and flashing details.",
  "Carry out water hose testing on all repaired areas to confirm watertightness before removing the work platform.",
  "Monitor the internal areas previously affected by ingress over one full wet season to confirm the repair is effective.",
  "Record all QA documentation including photographs, sealant batch numbers, product application rates and test results.",
];

const risks = [
  "Progressive internal water damage to ceilings, walls and finishes.",
  "Corrosion of embedded fixings, steel frames and wall ties within the façade.",
  "Render delamination and cladding failure from saturated substrate.",
  "Mould growth in wall cavities and on internal surfaces.",
  "Damage to building services and electrical systems.",
  "Significant cost escalation from deferred remediation and substrate deterioration.",
  "Safety risk from falling render, cladding or spalled concrete from the façade.",
];

export default function FacadeWaterIngressPage() {
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
          
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
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
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Façade Water Ingress</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Façade water ingress is the penetration of water through the external building envelope into the building structure and interior spaces. In Class 2 multi-storey residential buildings, the façade is the primary barrier against weather — and when sealant joints fail, render cracks, cladding is damaged or flashings are absent, rainwater tracks directly into the building fabric. Façade water ingress typically presents as isolated wet patches on internal walls and ceilings, but sustained ingress causes progressive structural damage, mould growth and finishes deterioration that significantly escalates remediation costs.
              </p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Water staining on internal walls and ceilings during rain",
                "Failed, cracked or missing sealants in façade joints",
                "Cracked, delaminating or hollow-sounding render",
                "Rust staining from corroding embedded fixings",
                "Water entry around window and door frames",
                "Paint blistering and mould on internal wall faces",
                "Efflorescence and salt deposits on the external face",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Cohesive or adhesive failure of façade joint sealants",
                "Cracked render from thermal movement and substrate shrinkage",
                "Missing or incorrectly installed head flashings over windows",
                "Failed window and door perimeter seals",
                "Inadequate sealant depth or incorrect backing rod installation",
                "Cladding panel movement opening gaps at junctions",
                "Penetrations through the façade without adequate flashing or sealing",
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
              Façade repair requires safe elevated access and a systematic approach from top to bottom. The scope must be confirmed by a façade consultant following inspection from an elevated platform.
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
                {["Façade joint reseal systems", "External render repair and recoating systems", "Masonry water repellent treatment systems", "Window and door perimeter sealing systems", "External cladding repair and replacement systems"].map((item) => (
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
