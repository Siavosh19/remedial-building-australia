import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Render Cracking & Delamination | Remedial Building Australia",
  description:
    "Technical guide to external render cracking and delamination — causes, inspection requirements, typical repair methodology and related repair systems for Class 2 buildings.",
};

const inspectionItems = [
  "Map all visible render cracks across the facade, recording crack width, pattern and location relative to structural elements and movement joints.",
  "Tap the render surface with a hammer over the full affected area — a hollow sound indicates delamination between the render and substrate.",
  "Assess the extent of delaminated areas by hammer sounding and mark boundaries for quantification.",
  "Inspect the original render composition and layer thicknesses by probing exposed or broken edges — excessive single-coat thickness is a common cause of failure.",
  "Check the condition and position of control and movement joints — cracking at mid-panel locations often indicates absent or inadequate joints.",
  "Assess substrate condition where render has already detached — check for moisture, contamination, smooth formwork faces or inadequate mechanical key.",
  "Inspect flashings, window heads and horizontal ledges for water directing onto the render surface.",
  "Engage a facade engineer or specialist contractor where delamination affects large areas or where the render is at height above pedestrians.",
];

const methodology = [
  "Erect scaffolding or swing stage to provide safe access to all affected facade areas.",
  "Conduct a full hammer sounding survey of the facade and mark all delaminated areas — include buffer zones around mapped boundaries.",
  "Remove all delaminated, cracked and hollow render by hand-held breakers or chisels to expose the sound substrate.",
  "Clean the exposed substrate surface to remove all dust, contamination, paint, oils and old adhesive.",
  "Check and prepare substrate surface profile — mechanically scabble or acid etch smooth masonry or concrete substrates to improve bond.",
  "Install movement joints at maximum 4.5 m centres in each direction and at all structural junctions in accordance with AS 3700 and render manufacturer requirements.",
  "Prime the prepared substrate with the specified render bonding agent and allow to tack before applying render.",
  "Apply the first scratch coat of fibre-reinforced polymer-modified render to the primed substrate at 6–10 mm thickness and key the surface.",
  "Allow the scratch coat to cure for a minimum of 7 days before applying the finish coat.",
  "Apply the finish coat at 4–6 mm thickness, finishing to the specified texture and profile.",
  "Seal all interface junctions between the new render and windows, doors, flashings and adjacent materials with a compatible polyurethane or silicone sealant.",
  "Apply a breathable, UV-stable acrylic or elastomeric coating system to the completed render in accordance with the specification.",
  "Record all QA documentation including photographs, area measurements, product batch numbers and moisture readings.",
];

const risks = [
  "Delaminated render panels detaching from height — falling hazard to pedestrians below.",
  "Water ingress behind render causing substrate deterioration and internal water damage.",
  "Corrosion of embedded ties, fixings and reinforcement from moisture penetration.",
  "Accelerating failure of adjacent sound render areas if delamination is not contained.",
  "Significant cost escalation from a piecemeal repair approach versus early full remediation.",
  "Staining and aesthetic impact on building appearance and property values.",
  "Potential owner corporation liability for failure to maintain the building's external envelope.",
];

export default function RenderCrackingDelaminationPage() {
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
          <a href="/defect-library/facade-external-envelope" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Façade & External Envelope
          </a>

          <div className="mt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Façade & External Envelope</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Render Cracking & Delamination</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                External render cracking and delamination is one of the most prevalent facade defects in Class 2 buildings. Render failures manifest as map cracking, shrinkage cracking, diagonal cracking at openings, and progressive loss of bond between the render layers or between the render and substrate. Delaminated render presents a falling hazard when at height, and allows water ingress behind the cladding layer — causing substrate deterioration, corrosion of embedded fixings and internal moisture damage. Early identification and containment are critical to preventing escalation.
              </p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Map cracking or crazing across render panel surfaces",
                "Diagonal cracking at corners of windows and door openings",
                "Hollow sound when render is tapped — indicating delamination",
                "Visible separation and lifting of render at edges and junctions",
                "Staining and moisture streaks below cracks or joints",
                "Paint blistering and bubbling over render surfaces",
                "Fallen render debris at the base of the building",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Render applied too thick in a single coat without sufficient substrate key",
                "Inadequate or absent movement joints allowing thermal and shrinkage stress",
                "Incompatible render products applied over existing layers",
                "Smooth concrete or masonry substrate without mechanical preparation",
                "High water-cement ratio in the render mix causing excessive shrinkage",
                "Render applied in hot, dry or windy conditions without curing protection",
                "Substrate movement or deflection transferring stress to the render layer",
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
              Render repairs require full removal of all delaminated material, substrate preparation and a correctly specified two-coat render system. Spot repairs to delaminated render are generally not successful and result in recurring failure.
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
                {["Polymer-modified two-coat render systems", "Fibre-reinforced render and mesh systems", "Elastomeric facade coating systems", "Movement joint and sealant systems", "Facade bonding and priming systems"].map((item) => (
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
