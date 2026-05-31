import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Failed Screeds | Remedial Building Australia",
  description: "Technical guide to failed balcony and podium screeds — cracking, delamination, drainage failure and repair methodology.",
};

const inspectionItems = [
  "Conduct a full hammer tap survey of the balcony surface to identify delaminated screed zones.",
  "Lift a sample tile and assess the screed condition — test strength by scratching with a key or nail.",
  "Check screed falls at drain locations using a digital level — falls should be minimum 1:100.",
  "Measure screed thickness at exposed edges or break-out locations — minimum 25 mm required for bonded screeds.",
  "Assess the substrate under the screed where delamination is confirmed — check for contamination and moisture.",
  "Inspect all drain outlets to confirm they are set flush with or below the screed surface.",
  "Engage a waterproofing consultant to assess whether the membrane below the screed has been compromised.",
  "Document the extent of failed screed with photographs and measurements for the removal and replacement scope.",
];

const methodology = [
  "Remove all delaminated and cracked screed identified in the survey — do not attempt to patch screed in place.",
  "Remove all adhesive and remaining screed material to expose the structural slab or waterproofing membrane.",
  "Clean the structural substrate of all dust, contamination and adhesive before applying a new screed.",
  "Prime the structural substrate with a compatible screed bonding agent.",
  "Set all drain outlet frames to the correct finished level before placing screed.",
  "Apply a polymer-modified sand and cement screed at minimum 25 mm thickness, formed to achieve a minimum 1:100 fall to all drainage outlets.",
  "Cure the screed for a minimum of 28 days before applying the waterproofing membrane system.",
  "Apply the waterproofing membrane over the cured screed in accordance with AS 3740.",
  "Conduct a flood test before relaying tiles.",
  "Lay tiles using a polymer-modified adhesive with minimum 95% coverage and appropriate movement joints.",
];

const risks = [
  "Water entrapment between the screed and membrane accelerating waterproofing failure",
  "Crack transmission from screed to the membrane and tile system above",
  "Ponding from inadequate falls increasing membrane hydrostatic loading",
  "Significant tile and waterproofing system cost if failed screed is not identified before relaying",
  "Screed replacement required — cannot be repaired in place where delaminated or cracked",
  "Ongoing staining and structural deterioration if water is trapped in the screed layer",
  "Total system failure if screeds are reinstated without addressing the underlying issues",
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
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Failed Screeds</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Balcony and podium screeds provide the drainage falls and surface substrate for tile and waterproofing systems. Screed failure — through cracking, delamination or inadequate falls — undermines the performance of all finishes above it. A delaminated screed creates a void that collects water and prevents the membrane from drying, accelerating failure. Cracked screeds transmit cracks to the membrane and tile system above. Screeds with insufficient falls trap water on the balcony, increasing hydrostatic pressure on the membrane. Screed failures are frequently discovered during tile removal works and must be fully addressed before any waterproofing system is reinstated.</p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Hollow sound when tiles are tapped over large areas — indicating screed delamination", "Cracking of tiles following the pattern of screed cracks below", "Ponding water on balcony surfaces — indicating inadequate screed falls", "Screed visible at broken tile edges in a friable or low-strength condition", "Delaminated screed sections lifting with tiles during removal", "Drainage outlets sitting above the screed surface level", "Previous screed repair patches that have themselves cracked or delaminated"]} />
            <InfoCard title="Common Causes" items={["Screed applied too thin — less than 25 mm minimum for bonded screeds", "Screed applied to a contaminated or un-primed substrate reducing bond", "Insufficient drainage falls formed in the screed — minimum 1:100 to outlets", "High water-cement ratio in the screed mix causing excessive shrinkage cracking", "Screed not protected from rapid drying during curing in hot or windy conditions", "Drainage outlet frames not set at the correct level before screed is applied", "Heavy loads applied to the screed before it reaches sufficient strength"]} />
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
                {["Screed removal and replacement systems", "Polymer-modified screed systems", "Screed fall reformation systems", "Waterproofing membrane systems over screed", "Drainage outlet installation and adjustment systems"].map((item) => (
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
