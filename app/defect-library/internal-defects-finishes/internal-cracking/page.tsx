import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Internal Cracking | Remedial Building Australia",
  description: "Technical guide to internal cracking in Class 2 buildings — plaster, render and plasterboard cracking causes and repair.",
};

const inspectionItems = [
  "Map all internal cracks recording width, length, orientation and location.",
  "Classify each crack using a standardised classification system.",
  "Install tell-tale gauges at active cracks and monitor over a minimum 4–6 week period.",
  "Assess whether cracking is in the plasterboard finish coat, the substrate or the structure behind.",
  "Check for associated movement — binding doors, gaps at junctions, deflecting floors.",
  "Inspect the exterior at the equivalent location to determine if facade cracking corresponds to internal cracking.",
  "Engage a structural engineer for any crack wider than 1 mm or showing signs of structural significance.",
  "Record all cracks with photographs and measurements before patch repairs obscure the evidence.",
];

const methodology = [
  "Confirm whether cracks are dormant before proceeding with cosmetic repairs.",
  "For dormant hairline plasterboard joint cracks — apply a flexible jointing compound, feather edges and re-coat.",
  "For dormant fine to medium cracks in plaster — rake out to 6 mm depth, apply a flexible filler, feather and repaint.",
  "For dormant cracks at wall-to-ceiling junctions — apply a flexible acrylic sealant rather than a rigid compound.",
  "For active cracks — install tell-tales, monitor, identify cause and address root cause before any cosmetic repair.",
  "For structural cracks — engage an engineer to specify the repair before any works proceed.",
  "Where cracking is caused by absent control joints — install joints at the correct locations.",
  "Sand and repaint all repaired areas using a compatible paint system matched to the existing.",
  "Repaint walls and ceilings where patching produces an uneven finish across the visible surface.",
];

const risks = [
  "Structural cracking in load-bearing elements if not properly assessed",
  "Water ingress through active cracks in wet area or external-adjacent walls",
  "Ongoing crack widening if active movement is not addressed",
  "Cosmetic repair cost recurring if underlying cause is not resolved",
  "Purchaser and strata disclosure obligations where significant cracking is present",
  "Mould risk at crack locations in wet areas",
  "Impact on building valuation and marketability",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-8 py-5">
          <a href="/" className="flex shrink-0 items-center gap-3"><div><div className="text-lg font-extrabold tracking-tight text-sky-950">Remedial Building Australia</div><div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-900">Technical Remedial Building Platform</div></div></a>
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
          <a href="/defect-library/internal-defects-finishes" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">← Back to Internal Defects & Finishes</a>
          <div className="mt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Internal Defects & Finishes</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Internal Cracking</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Internal cracking in Class 2 buildings encompasses a wide range of crack types — from minor hairline shrinkage cracks in new plasterboard joints through to structural cracking in load-bearing walls and slabs. Accurate classification of internal cracking is essential: hairline cracks may require no more than cosmetic repair, while active structural cracks require engineering assessment and may indicate foundation movement, slab deflection or structural deficiency. Recurring cracks after patching are a reliable indicator of active movement that must be addressed before cosmetic reinstatement.</p>
            </div>
          </div>
          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Hairline to fine cracks in plasterboard joints and ceiling corners", "Diagonal cracks at window and door corners", "Cracks at the junction of walls and ceilings", "Stair-step cracking in masonry block partitions", "Cracks that are wider at one end — indicating ongoing movement", "Door and window frames binding or sticking", "Cracks recurring after previous patching"]} />
            <InfoCard title="Common Causes" items={["Plasterboard joint shrinkage from drying after installation", "Structural slab deflection transferring stress to partition walls", "Differential settlement causing diagonal cracking at openings", "Thermal and moisture movement in masonry partitions without control joints", "Inadequate fixing of plasterboard to framing causing joint cracking", "Vibration from construction or traffic loading", "Corrosion of reinforcement causing expansive cracking in concrete walls"]} />
            <InfoCard title="Risk of Neglect" items={risks} />
          </section>
          <section className="mt-16 rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h2 className="text-3xl font-bold text-sky-950">Inspection Requirements</h2>
              <a href="#" className="rounded-xl bg-sky-900 px-5 py-3 text-base font-semibold text-white hover:bg-sky-800">Download Inspection Checklist</a>
            </div>
            <ul className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-7">
              {inspectionItems.map((item) => (<li key={item} className="flex gap-3 text-base leading-8 text-slate-800"><span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}
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
              {methodology.map((step, index) => (<li key={step} className="flex gap-4 text-base leading-8 text-slate-800" style={{ marginBottom: index < methodology.length - 1 ? "3mm" : 0 }}><span className="mt-1 shrink-0 text-sm font-bold text-slate-500">{String(index + 1).padStart(2, "0")}.</span><span>{step}</span></li>))}
            </ol>
          </section>
          <section className="mt-16">
            <a href="/repair-systems" className="block rounded-3xl border border-slate-200 bg-white p-8 text-sky-950 shadow-md transition hover:shadow-xl">
              <h3 className="text-2xl font-bold">Related Repair Systems</h3>
              <ul className="mt-4 space-y-2">{["Plasterboard joint and crack repair systems", "Flexible sealant crack repair systems", "Structural crack injection and assessment services", "Internal render and plaster repair systems", "Crack monitoring and tell-tale systems"].map((item) => (<li key={item} className="flex gap-3 text-base leading-7 text-slate-700"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}</ul>
              <div className="mt-6 font-bold text-red-700">Open Repair Systems →</div>
            </a>
          </section>
        </section>
      </main>
      <footer className="border-t border-sky-200 bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 pt-12"><a href="/" className="inline-flex rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-sky-950 shadow-sm hover:bg-slate-200">← Home</a></div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr]">
          <div><div className="text-lg font-extrabold text-sky-950">Remedial Building Australia</div><p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-sky-900">A structured Australian remedial building knowledge platform for defects, repair systems, materials and future AI-assisted scope writing.</p></div>
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
        {items.map((item) => (<li key={item} className="flex gap-3 text-base leading-8 text-slate-800"><span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-red-700" />{item}</li>))}
      </ul>
    </div>
  );
}
