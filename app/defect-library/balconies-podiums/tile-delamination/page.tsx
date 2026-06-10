import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tile Delamination | Remedial Building Australia",
  description: "Technical guide to tile delamination on balconies and podiums — causes, inspection requirements and repair methodology.",
};

const inspectionItems = [
  "Conduct a systematic hammer tap survey of the entire tiled surface — mark all hollow areas.",
  "Assess the extent of delamination as a percentage of the total tile area.",
  "Inspect tile edges, corners and movement joints for cracking, lifting and open grout joints.",
  "Lift a sample delaminated tile and assess the adhesive coverage and condition of the tile back.",
  "Check the substrate condition under lifted tiles — assess for moisture, contamination and cracking.",
  "Inspect movement joints for presence, spacing and condition — joints should be at maximum 4.5 m centres and at all changes of direction.",
  "Assess whether the waterproofing membrane below is intact or has been breached at tile failure locations.",
  "Engage a waterproofing and tiling consultant where delamination is widespread or associated with membrane failure.",
];

const methodology = [
  "Remove all delaminated tiles identified in the hammer tap survey — extend removals to the boundaries of all hollow areas plus a 300 mm buffer.",
  "Remove all adhesive from the substrate to expose the waterproofing membrane or bare concrete.",
  "Assess the condition of the waterproofing membrane — repair or replace any sections that are cracked, delaminated or damaged during tile removal.",
  "Allow the substrate and membrane to dry before relaying tiles.",
  "Install perimeter and field movement joints before laying tiles — maximum 4.5 m centres in each direction.",
  "Apply a polymer-modified tile adhesive achieving minimum 95% coverage to the back of each tile and the substrate.",
  "Lay tiles in the correct pattern and to the specified falls toward drains.",
  "Grout all tile joints using a polymer-modified, colour-consistent grout.",
  "Apply a polyurethane sealant to all movement joints — do not fill movement joints with grout.",
  "Apply a tile sealer where specified to reduce porosity and staining risk.",
  "Conduct a flood test on the tile field if membrane integrity is suspect.",
];

const risks = [
  "Safety hazard from loose or lifting tiles at balcony edges and step nosings",
  "Water ingress through cracked grout joints and open tile edges to the membrane and structure below",
  "Progressive delamination spreading from localised areas to the full tiled field",
  "Potential damage to the waterproofing membrane during tile removal if incorrectly executed",
  "Significant cost escalation if the entire tile field must be removed and re-laid",
  "Owner corporation liability for injury from loose tiles in common areas",
  "Damage to internal finishes below from membrane failure associated with tile loss",
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
          <a href="/defect-library/balconies-podiums" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Balconies & Podiums
          </a>

          <div className="mt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Balconies & Podiums</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Tile Delamination</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Tile delamination on balconies and podiums is the loss of adhesion between tiles and their substrate — caused by substrate movement, inadequate adhesive coverage, moisture under the tile bed or thermal stress. Delaminated tiles present a safety hazard as they can crack under load and detach from the substrate, particularly at balcony edges and step nosings. In tiled waterproofing systems, delaminated tiles also indicate a breach of the membrane system below and should be treated as a waterproofing concern as well as an adhesion failure.</p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Hollow sound when tiles are tapped — indicating loss of adhesion", "Cracked tiles with no visible impact damage", "Tiles rocking or moving underfoot", "Grout joint cracking or opening up between tiles", "Lifting at tile edges or corners", "Staining on the underside of lifted tiles indicating moisture ingress", "Failed or open movement joints in the tiled field"]} />
            <InfoCard title="Common Causes" items={["Insufficient adhesive coverage — less than 95% required for external tiles", "Rigid adhesive used without movement joints in large format tile installations", "Thermal expansion forces in tiles laid without perimeter and field movement joints", "Substrate deflection or cracking transferring stress to the adhesive bond", "Moisture beneath the tile bed causing hydrostatic pressure and adhesion loss", "Tile laid directly to an unstable or contaminated substrate", "Use of an interior-only adhesive in an exterior exposed application"]} />
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
                {["Tile removal and substrate preparation systems", "Waterproofing membrane repair and replacement systems", "Polymer-modified tile adhesive systems", "Movement joint design and installation systems", "Tile grouting and sealing systems"].map((item) => (
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
