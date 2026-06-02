import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blocked & Undersized Stormwater | Remedial Building Australia",
  description: "Technical guide to blocked and undersized stormwater drainage in Class 2 buildings.",
};

const inspectionItems = [
  "CCTV inspect all accessible stormwater pipes to identify blockages, root intrusion, deformation and joint failure.",
  "Inspect all pits for debris accumulation, condition of benching, and inlet grate capacity.",
  "Assess the diameter of all stormwater pipes against the contributing catchment area.",
  "Conduct a hydraulic capacity check of the drainage system against AS/NZS 3500.3 design storm requirements.",
  "Inspect all roof outlets and balcony drains for blockage and correct grate opening area.",
  "Check all stormwater discharge points to the council system or absorption trench.",
  "Engage a hydraulic engineer where system capacity is in question or flooding is recurrent.",
  "Review council drainage records for the downstream system capacity.",
];

const methodology = [
  "Conduct a high-pressure water jetting clean of all stormwater pipes to remove debris, sediment and root intrusions.",
  "CCTV inspect pipes post-jetting to assess structural condition and identify any remaining defects.",
  "Reline or replace pipe sections that are collapsed, deformed or structurally compromised.",
  "Clean all pits and sumps of sediment and debris accumulation.",
  "Replace all blocked or damaged inlet grates with grates of the correct open area.",
  "Upsize pipe sections identified as hydraulically undersized through the hydraulic assessment.",
  "Install additional pits and inlets where the catchment area or inlet spacing is inadequate.",
  "Root treat identified root intrusion zones with foaming root killer and re-CCTV after 30 days.",
  "Establish a maintenance programme for annual jetting and inspection of the stormwater system.",
  "Record all works with CCTV reports, pipe schedules and photographs.",
];

const risks = [
  "Flooding of basement car parks and lower building levels during storm events",
  "Water ingress to the building structure from overwhelmed drainage",
  "Damage to vehicles, building services and stored property in basement",
  "Insurance claims and strata liability for flood damage",
  "Safety hazard from rapidly rising water in basement areas",
  "Tree root damage to stormwater pipes extending to adjacent structures",
  "Long-term structural damage from repeated saturation of substructure",
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
            <a href="/industry-news" className="whitespace-nowrap hover:text-red-700">Industry News</a>
            <a href="/directory" className="whitespace-nowrap hover:text-red-700">Directory</a>
            <a href="/ai-scope-builder" className="whitespace-nowrap hover:text-red-700">AI Scope Builder</a>
          
          </nav>
          <a href="/directory/login" className="hidden shrink-0 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-800 transition md:inline-flex">Login / Create Account</a>
        </div>
      </header>
      <main className="px-6 py-20">
        <section className="mx-auto max-w-7xl">
          <a href="/defect-library/services-drainage" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">← Back to Services & Drainage</a>
          <div className="mt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Services & Drainage</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Blocked & Undersized Stormwater</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Blocked and undersized stormwater infrastructure is one of the most common causes of building flooding and water damage in Class 2 buildings. Stormwater systems sized to the minimum requirements at the time of construction may be inadequate as development increases impervious areas or as climate change increases rainfall intensity. Blocked pipes from debris, tree root intrusion or collapsed sections prevent even correctly-sized systems from functioning, rapidly leading to surcharge, overflow and ingress.</p>
            </div>
          </div>
          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Surface flooding on car park levels and podium areas during rain", "Overflowing pits and surcharging grate inlets during moderate rain", "Water entering the basement from overwhelmed surface drainage", "Gurgling noises in drainage pipes indicating partial blockage", "Slow drainage from roof outlets and balcony drains", "Tree root intrusion visible at inspection pit openings", "Surface staining below corroded or leaking stormwater pipes"]} />
            <InfoCard title="Common Causes" items={["Debris and sediment accumulation blocking pits, pipes and outlets", "Tree root intrusion into older clay or concrete stormwater pipes", "Collapsed or deformed pipe sections restricting flow", "Pipe sizes designed below current AS/NZS 3500.3 requirements", "Increased upstream catchment area from subsequent development", "Inadequate maintenance cleaning frequency", "Pit lids and grates replaced with solid covers blocking inlet capacity"]} />
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
              <ul className="mt-4 space-y-2">{["High-pressure water jetting systems", "CCTV pipe inspection services", "Stormwater pipe relining systems", "Pipe replacement and upsizing programmes", "Pit and grate upgrade systems"].map((item) => (<li key={item} className="flex gap-3 text-base leading-7 text-slate-700"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}</ul>
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
        {items.map((item) => (<li key={item} className="flex gap-3 text-base leading-8 text-slate-800"><span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-red-700" />{item}</li>))}
      </ul>
    </div>
  );
}
