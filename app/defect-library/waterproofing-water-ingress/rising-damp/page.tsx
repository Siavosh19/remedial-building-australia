import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rising Damp | Remedial Building Australia",
  description:
    "Technical guide to rising damp — causes, inspection requirements, typical repair methodology and related repair systems for Class 2 buildings.",
};

const inspectionItems = [
  "Identify the high-water mark on affected walls — rising damp typically presents as a horizontal band of moisture and staining.",
  "Measure moisture content in the wall at multiple heights using a calibrated moisture meter to confirm the capillary rise profile.",
  "Inspect for the presence and condition of a damp proof course — check for bridging, damage or absence.",
  "Assess the external ground level relative to the internal floor and wall face — ground level above the DPC is a primary cause.",
  "Check for external garden beds, paving or soil built up against the wall that may be bridging the DPC.",
  "Inspect internal finishes for paint blistering, plaster failure, salt efflorescence and mould growth.",
  "Assess masonry and mortar joints for deterioration caused by salt crystallisation and moisture cycling.",
  "Consider laboratory testing of wall samples for chloride and nitrate content to confirm rising damp rather than condensation.",
];

const methodology = [
  "Confirm the diagnosis of rising damp by a qualified building consultant, distinguishing from condensation, penetrating damp or plumbing leaks before committing to remediation.",
  "Address the primary source where possible — reduce external ground levels to at least 150 mm below the floor level and DPC.",
  "Remove any external paving, garden beds or soil that are bridging the existing damp proof course.",
  "Improve external drainage to direct surface water away from the base of the building.",
  "Where a damp proof course is absent or failed, install a chemical DPC system by drilling and injecting a silane or siloxane-based damp proof cream or liquid into the masonry at the appropriate level.",
  "Drill injection holes at 120 mm centres in the mortar joint at the correct height and inject the DPC product under low pressure to ensure complete saturation of the masonry.",
  "Allow the chemical DPC to cure for the manufacturer's specified period before proceeding with internal remediation.",
  "Remove all deteriorated internal plaster, render and finishes to a height 300 mm above the observed high-water mark.",
  "Allow the wall to dry to the required moisture content before applying new finishes — this may take several months.",
  "Apply a renovating plaster or salt-resistant render system compatible with ongoing residual moisture during the drying period.",
  "Apply a breathable paint or finish to allow ongoing moisture vapour movement from the wall.",
  "Improve internal ventilation to assist in drying the building fabric and prevent condensation masking the outcome.",
  "Monitor moisture levels over a 6–12 month period to confirm the effectiveness of the treatment.",
];

const risks = [
  "Ongoing deterioration of internal plaster, render and decorative finishes.",
  "Salt crystallisation causing masonry and mortar joint degradation.",
  "Mould growth creating health risks for occupants.",
  "Structural weakening of load-bearing masonry from prolonged moisture exposure.",
  "Damage to timber floor framing and sub-floor elements.",
  "Continued staining and amenity impact for residents.",
  "High ongoing maintenance cost without addressing the root cause.",
];

export default function RisingDampPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">Remedial Building Australia</div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">Technical Defect Database</div>
            </div>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
            <a href="/defect-library" className="whitespace-nowrap hover:text-red-700">Defect Library</a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">Repair Systems</a>
            <a href="/materials-products" className="whitespace-nowrap hover:text-red-700">Materials</a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">Industry News</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
            <a
              href="/newsletter"
              className="whitespace-nowrap rounded-lg bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-800 transition"
            >
              Subscribe
            </a>
          </nav>
          <a href="/" className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 md:inline-flex">Home</a>
        </div>
      </header>

      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/waterproofing-water-ingress" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">
            ← Back to Waterproofing & Water Ingress
          </a>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Waterproofing & Water Ingress</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Rising Damp</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Rising damp is the upward movement of ground moisture through the pores and capillaries of masonry walls and concrete elements by capillary action. It is most prevalent in older buildings lacking an effective damp proof course and in newer buildings where the DPC has been damaged, bridged or installed incorrectly. Rising damp carries dissolved salts from the ground into the building fabric, causing progressive damage to finishes, plaster, masonry and timber elements. Accurate diagnosis is essential, as rising damp is frequently confused with penetrating damp and condensation.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <img src="/Images/Categories/waterproofing-water-ingress.jpg" alt="Rising damp in masonry wall" className="h-[420px] w-full object-cover" />
              <div className="border-t border-slate-200 p-5 text-base font-semibold text-slate-700">
                Characteristic tide mark staining and salt efflorescence from rising damp in a masonry wall.
              </div>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Horizontal tide mark staining on lower sections of walls",
                "Salt efflorescence and white deposits on wall surfaces",
                "Paint blistering and peeling from the wall surface",
                "Plaster softening, crumbling and detachment",
                "Damp or musty smell at lower wall levels",
                "Mould growth at the base of walls and behind furniture",
                "Deteriorating skirting boards and timber flooring",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Absence of a damp proof course in older masonry buildings",
                "Failed, cracked or perforated damp proof course",
                "DPC bridged by raised garden beds, paving or rendered external walls",
                "External ground levels higher than the internal floor slab",
                "Blocked subfloor drainage causing moisture accumulation",
                "Solid masonry construction with high capillary absorption",
                "Failed chemical DPC from previous remediation attempts",
              ]}
            />
            <InfoCard title="Risk of Neglect" items={risks} />
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h2 className="text-3xl font-bold text-sky-950">Inspection Requirements</h2>
              <a href="/downloads/rising-damp-inspection-checklist.pdf" className="rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">
                Download Inspection Checklist
              </a>
            </div>
            <ul className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-7">
              {inspectionItems.map((item) => (
                <li key={item} className="flex gap-3 text-base leading-8 text-slate-800">
                  <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Typical Repair Methodology</h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Rising damp remediation must address both the source of moisture entry and the resulting internal damage. Confirmation of diagnosis by an experienced building consultant is essential before treatment.
            </p>
            <img src="/Images/Categories/waterproofing-water-ingress.jpg" alt="Rising damp repair methodology" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover" />
            <ol className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-7 py-6">
              {methodology.map((step, index) => (
                <li key={step} className="flex gap-4 text-base leading-8 text-slate-800" style={{ marginBottom: index < methodology.length - 1 ? "3mm" : 0 }}>
                  <span className="mt-1 shrink-0 text-sm font-bold text-slate-500">{String(index + 1).padStart(2, "0")}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Before / After Repair</h2>
            <p className="mt-4 text-base leading-8 text-slate-700">
              Typical rising damp condition before and after chemical DPC installation and internal plaster reinstatement.
            </p>
            <img src="/Images/Categories/waterproofing-water-ingress.jpg" alt="Rising damp before and after repair" className="mt-8 w-full rounded-2xl border border-slate-200 object-cover" />
          </section>

          <section className="mt-16 grid gap-8 md:grid-cols-2">
            <a href="/repair-systems/waterproofing-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Chemical damp proof course injection systems", "Renovating plaster and render systems", "Crystalline waterproofing coatings", "Drainage and subfloor ventilation systems", "Salt-resistant internal coating systems"].map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 font-bold text-red-700">Open Repair Systems →</div>
            </a>
            <a href="/materials-products/waterproofing" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Materials</h3>
              <ul className="mt-4 space-y-2">
                {["Silane and siloxane DPC injection creams", "Salt-resistant renovating plasters", "Breathable masonry paints and coatings", "Cementitious waterproofing slurries", "Subfloor drainage and ventilation products"].map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 font-bold text-red-700">Open Materials →</div>
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
          <div className="grid grid-cols-2 gap-3 text-sm font-bold text-sky-950 md:grid-cols-3">
            <a href="/about" className="underline hover:text-sky-700">About</a>
            <a href="/terms" className="underline hover:text-sky-700">Terms</a>
            <a href="/contact" className="underline hover:text-sky-700">Contact</a>
          </div>
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
