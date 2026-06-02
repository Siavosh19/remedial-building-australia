import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flashing Failures | Remedial Building Australia",
  description: "Technical guide to roof flashing failures — ridge, valley, penetration and abutment flashing defects and repair methodology.",
};

const inspectionItems = [
  "Inspect all ridge and hip flashing details for correct installation, lapping and sealant condition.",
  "Inspect step flashings at wall abutments for correct integration with tile courses and wall cladding.",
  "Check all penetration flashings including skylights, pipes and exhaust fans for correct upstand height and sealant condition.",
  "Assess the material condition of all metal flashings for corrosion, holes and galvanic attack.",
  "Inspect the lapping of all flashing sections — minimum 75 mm lap required.",
  "Check that flashings are correctly counter-flashed or tucked into mortar joints at wall abutments.",
  "Conduct a hose test at suspected flashing locations to isolate ingress points.",
  "Record all defective flashings with photographs and measurements for the repair scope.",
];

const methodology = [
  "Conduct a hose test to confirm all defective flashing locations before committing to the repair scope.",
  "Remove all corroded, holed or displaced flashings from the affected locations.",
  "For step flashings at wall abutments — remove tiles in the affected zone, strip out the existing flashing and install a new continuous Colorbond or aluminium step flashing correctly integrated with each tile course.",
  "Counter-flash all step flashings into the mortar joint of the adjacent wall at minimum 75 mm depth and seal with polyurethane.",
  "For penetration flashings — remove the existing flashing, inspect the substrate and install a pre-formed or site-formed flashing collar with a minimum 150 mm upstand.",
  "Seal all flashing laps, joints and terminations with a compatible polyurethane sealant.",
  "Re-bed and point all disturbed ridge and hip capping after flashing works.",
  "Conduct a post-repair hose test to confirm all locations are watertight.",
  "Repair internal plaster and ceiling damage after confirming repairs are effective.",
];

const risks = [
  "Water ingress causing damage to internal ceilings, walls and timber framing",
  "Structural timber rot at wall plates and rafters from prolonged moisture",
  "Mould growth in wall cavities at junction locations",
  "Corrosion of embedded structural elements near flashing failures",
  "Significant remediation cost if timber framing is affected",
  "Internal staining and finish damage from repeated ingress events",
  "Difficulty in isolating the specific ingress point without experienced investigation",
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
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">Industry News</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/roofing-defects" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Roofing Defects
          </a>

          <div className="mt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Roofing Defects</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Flashing Failures</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Roof flashings are the transition details that seal junctions between roof surfaces, penetrations and adjacent walls or structures. They are consistently among the most common sources of roof leaks — a correctly installed primary roof covering can remain watertight while a failed flashing allows concentrated water flow directly into the structure. Flashing failure includes corrosion, displacement, failed sealant, inadequate lapping and the use of incompatible materials that react and deteriorate over time.</p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Water ingress at specific locations corresponding to wall abutments, chimneys or penetrations", "Rust staining on the facade below flashing locations", "Visible separation, lifting or displacement of flashing from the substrate", "Failed or absent sealant at flashing laps and junctions", "Corroded or holed metal flashing in older buildings", "Daylight visible at abutment junctions when viewed from the roof space", "Staining and moisture at the internal face of walls adjacent to roof abutments"]} />
            <InfoCard title="Common Causes" items={["Corrosion of steel flashings in coastal or humid environments", "Galvanic corrosion from incompatible metals in contact", "Failed sealant at flashing laps and wall junctions from age and UV", "Flashing displaced by thermal movement, wind or tile movement", "Inadequate lapping of flashing sections — minimum 75 mm required", "Step flashings not correctly integrated with the roof tile courses", "Lead flashings cracking from work hardening and thermal cycling"]} />
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
                {["Step and counter-flashing systems", "Penetration flashing collar systems", "Ridge and hip flashing replacement systems", "Valley flashing systems", "Polyurethane and silicone flashing sealant systems"].map((item) => (
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
