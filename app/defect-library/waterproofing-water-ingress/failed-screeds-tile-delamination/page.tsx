import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Failed Screeds & Tile Delamination | Remedial Building Australia",
  description:
    "Technical guide to failed balcony and podium screeds and tile delamination in Class 2 buildings — causes, inspection, drainage falls and repair methodology.",
};

const inspectionItems = [
  "Sound all tiles using a rubber hammer or coin tap test — map and record all hollow, drummy and loose areas systematically across the full surface.",
  "Inspect all tile grout joints for cracking, opening, debonding and efflorescence — efflorescence indicates active moisture movement beneath the tile.",
  "Check the fall of the screed surface to all drainage outlets — minimum 1:50 for open balconies, 1:80 for covered areas under AS 3740.",
  "Inspect all drainage outlets for correct height relative to the finished tile surface — outlets set too high prevent effective drainage and cause ponding.",
  "Where tiles are loose or lifted, remove selected tiles to inspect the screed and membrane beneath for saturation, breakdown and delamination.",
  "Probe or core the screed at selected locations to assess compressive strength — screed should achieve a minimum 15 MPa; saturated or crumbling screed indicates failure.",
  "Measure moisture content of exposed screed using a moisture meter — readings above the manufacturer's threshold indicate the substrate must dry before recoating or relaying.",
  "Inspect the underside of the balcony or podium for water staining, efflorescence and concrete deterioration — these indicate ongoing water penetration through the slab.",
  "Where membrane is accessible beneath lifted tiles, inspect for cracks, punctures, delamination and failed junctions at drains and upstands.",
  "Review original building documentation for the specified waterproofing system, screed mix, screed thickness and tile adhesive type.",
];

const methodology = [
  "Conduct a full tap test survey to identify all hollow and loose tiles and map the extent of affected areas before preparing the scope of works.",
  "Remove all drummy, cracked and debonded tiles carefully to minimise damage to underlying layers — tile removal should be documented with photographs.",
  "Inspect the screed beneath all removed tiles for soundness, moisture content and adhesion to the membrane or substrate below.",
  "Where the waterproofing membrane is exposed and intact: clean and assess adhesion before allowing screed reinstatement.",
  "Where the waterproofing membrane is damaged, failed or absent: repair or replace the full membrane system to the structural engineer's and waterproofing consultant's specification before any screed or tile reinstatement.",
  "Remove all failed, saturated, contaminated or poorly bonded screed from affected areas — do not relay over failed substrate.",
  "Prepare the substrate surface — remove all loose material, clean thoroughly and apply a primer or bonding agent as required by the screed manufacturer.",
  "Install new screed with correct fall to all outlets — minimum 1:50 for open balconies and 1:80 for covered areas — verified with a digital level before the screed sets.",
  "Confirm outlet heights are correctly set relative to the new screed level before allowing the screed to cure.",
  "Allow the screed to cure to the manufacturer's minimum specification — do not apply tile adhesive over green or damp screed.",
  "Select a tile adhesive appropriate for the exposure conditions and substrate — a flexible, waterproof adhesive rated for external use is required for balcony and podium applications.",
  "Lay tiles with full bed adhesion in compliance with AS 3958.1, incorporating movement joints at all perimeters and at maximum 3–4.5 m field intervals.",
  "Apply a waterproof grout to all tile joints and a polyurethane or silicone sealant at all movement joints.",
  "Conduct a flood test on completion — fill the balcony or podium to a depth of 25 mm and observe for a minimum 24 hours to confirm the waterproofing system and drainage are performing correctly.",
  "Record all works, product batch numbers and test results in the strata maintenance register.",
];

const risks = [
  "Progressive water ingress to structural elements below — accelerating concrete carbonation and reinforcement corrosion.",
  "Increasing area of tile and screed failure as moisture spreads beneath the floor finish.",
  "Trip and fall hazard from rocking, lifted or cracked tiles on common area balconies and walkways.",
  "Water damage to occupied spaces, ceilings and electrical services below.",
  "Ongoing membrane damage from standing water on failed or poorly draining surfaces.",
  "Significant escalation in remediation cost if waterproofing membrane failure is left unaddressed.",
  "Building Commission defect orders where common area finishes present a safety hazard.",
];

export default function FailedScreedsTileDelaminationPage() {
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
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Failed Screeds & Tile Delamination</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Failed balcony and podium screeds leading to tile delamination are among the most commonly reported finishes defects in Class 2 buildings. The screed layer beneath tiled surfaces provides the substrate, the drainage fall, and in many cases a wearing course over the waterproofing membrane. When screeds fail — from moisture intrusion, inadequate mix design, poor adhesion, or incorrect falls — the tiles above become drummy, hollow and eventually debond. Tile delamination is frequently a symptom of a defect beneath the tile itself, including waterproofing failure, a saturated substrate or screed breakdown. Rectifying the tiles alone without addressing the underlying cause will result in recurring failure.
              </p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Hollow or drummy sound when tiles are tapped",
                "Cracked, lifted or debonded tiles on balconies and podiums",
                "Water visible beneath lifted tiles or tracking from tile edges",
                "Cracking or subsidence in the screed surface",
                "Tiles rocking or moving underfoot",
                "Grout joint cracking, opening or debonding",
                "Efflorescence at tile joints or grout lines",
                "Water staining or damage on ceilings and walls below",
                "Ponding water on the balcony surface after rain",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Moisture trapped beneath tiled finishes from failed or absent waterproofing membrane",
                "Screed breakdown from repeated wetting and drying",
                "Inadequate screed thickness or incorrect mix design",
                "Poor falls causing water to pond and remain in contact with the screed",
                "Screed applied to a contaminated or inadequately prepared substrate",
                "Tile adhesive failure from substrate movement or moisture incompatibility",
                "Drainage outlets set too high — preventing effective discharge",
                "Inadequate provision for thermal and structural movement joints",
                "Waterproofing membrane failure at drain junctions or upstands",
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
              Screed and tile reinstatement must address the root cause — waterproofing membrane condition, drainage falls and substrate integrity — before any finishes are reinstated. Relaying tiles over a failed membrane or saturated substrate will result in recurring delamination.
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
                {[
                  "Balcony and podium waterproofing repair and replacement systems",
                  "Screed reinstatement and levelling systems",
                  "Drainage outlet replacement and height adjustment",
                  "Tile adhesive selection for external applications",
                  "Movement joint design and sealant systems for tiled surfaces",
                ].map((item) => (
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
            <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and AI-assisted scope writing.</p>
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
