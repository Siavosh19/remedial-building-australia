import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concrete Spalling | Remedial Building Australia",
  description:
    "Technical guide to concrete spalling — causes, inspection requirements, typical repair methodology and related repair systems for Class 2 buildings.",
};

const inspectionItems = [
  "Map visible cracking, rust staining, delamination and spalled areas.",
  "Hammer tap or chain drag test to identify drummy or delaminated concrete.",
  "Expose reinforcement locally where required to confirm corrosion extent.",
  "Check concrete cover depth and reinforcement condition.",
  "Assess likely water source, waterproofing failure or façade ingress path.",
  "Consider carbonation, chloride and concrete condition testing where required.",
];

const methodology = [
  "Allow for concrete spalling repairs to be measured on a litreage or volume-based rate where required.",
  "Remove concrete around exposed or corroded reinforcement until clean steel and sound concrete are exposed.",
  "Remove or replace reinforcement only where directed by the engineer or superintendent.",
  "Prepare all concrete surfaces to a roughened profile suitable for repair mortar bonding.",
  "Clean exposed reinforcement to remove corrosion, scale and loose material to an approved steel cleanliness standard.",
  "Remove dust, loose particles, laitance and deleterious material from all repair interfaces.",
  "Prime exposed reinforcement with an approved corrosion protection primer.",
  "Pre-wet the prepared concrete substrate where required and remove standing water before repair.",
  "Apply an approved bonding slurry or substrate primer compatible with the repair mortar system.",
  "Apply repair mortar while the bonding coat remains active and within manufacturer requirements.",
  "Apply repair mortar in layers within approved thickness limits and compact around reinforcement.",
  "Finish the repair to match the surrounding profile and required surface tolerance.",
  "Cure repaired concrete using approved curing methods immediately after application.",
  "Apply protective coating, membrane or anti-carbonation coating where required.",
  "Record QA photos, repair locations, products used, batch details and completed hold points.",
];

const risks = [
  "Falling concrete hazard.",
  "Progressive reinforcement corrosion.",
  "Loss of reinforcement section.",
  "Larger breakout areas over time.",
  "Water ingress into adjacent elements.",
  "Higher future repair cost.",
  "Potential structural capacity concerns.",
];

export default function ConcreteSpallingPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3">
            <div>
              <div className="text-lg font-extrabold tracking-tight text-sky-950">
                Remedial Building Australia
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">
                Technical Remedial Building Platform
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-sky-800 md:flex">
                        <a href="/" className="whitespace-nowrap hover:text-red-700 transition">Home</a>
            <a href="/defect-library" className="whitespace-nowrap hover:text-red-700">
              Defect Library
            </a>
            <a href="/repair-systems" className="whitespace-nowrap hover:text-red-700">
              Repair Systems
            </a>
            <a href="/materials-products" className="whitespace-nowrap hover:text-red-700">
              Materials
            </a>
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">
              Industry News
            </a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">
              AI Scope Builder
            </a>
            <a href="/directory/login" className="whitespace-nowrap hover:text-red-700 transition">Login</a>
          
          </nav>

          <a
            href="/"
            className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 md:inline-flex"
          >
            Home
          </a>
        </div>
      </header>

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
                Concrete Spalling
              </h1>

              <p className="mt-6 text-xl leading-9 text-slate-700">
                Concrete spalling is the breaking away, delamination or loss of
                concrete cover, commonly caused by corrosion of embedded steel
                reinforcement, moisture ingress, carbonation, chloride exposure,
                inadequate concrete cover or poor concrete quality.
              </p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Rust staining",
                "Cracked or drummy concrete",
                "Delaminated concrete cover",
                "Exposed reinforcement",
                "Loose concrete fragments",
              ]}
            />

            <InfoCard
              title="Common Causes"
              items={[
                "Reinforcement corrosion",
                "Carbonation",
                "Chloride contamination",
                "Low concrete cover",
                "Water ingress",
                "Poor compaction or honeycombing",
              ]}
            />

            <InfoCard title="Risk of Neglect" items={risks} />
          </section>

          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-sky-950">Inspection Requirements</h2>

            <ul className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-7">
              {inspectionItems.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-8 text-slate-800"
                >
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
            <h2 className="text-3xl font-bold text-sky-950">
              Typical Repair Methodology
            </h2>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              The final repair scope must be confirmed by the project engineer and
              selected repair system. The sequence below outlines a typical
              methodology for concrete spalling repairs.
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
              href="/repair-systems/concrete-spalling"
              className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">
                {["Polymer-modified repair mortars", "Cementitious repair mortars", "Epoxy repair mortars", "Bonding agents", "Rebar primers and inhibitors", "Curing compounds", "Formwork materials", "Tie wire and fixings", "Cement and aggregates", "Abrasives, blades and tools"].map((item) => (
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
              defects, repair systems, materials and future AI-assisted scope
              writing.
            </p>
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
          <li
            key={item}
            className="flex gap-3 text-base leading-8 text-slate-800"
          >
            <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-red-700" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
