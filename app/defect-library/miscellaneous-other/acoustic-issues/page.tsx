import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acoustic Issues | Remedial Building Australia",
  description: "Technical guide to acoustic performance deficiencies in Class 2 buildings — sound transmission, NCC compliance and remediation.",
};

const inspectionItems = [
  "Engage a NATA-accredited acoustic consultant to conduct sound transmission measurements between representative adjacent lots.",
  "Test both airborne sound (Rw) and impact sound (LnTw) between all separating floor and wall combinations.",
  "Compare measured performance against NCC Volume 1 F5.5 requirements for the building class.",
  "Identify all flanking paths — measure noise levels in rooms not directly adjacent to the sound source to identify flanking routes.",
  "Inspect separating floor construction to confirm the specification of resilient layers, mass and decoupling.",
  "Inspect acoustic sealing at all penetrations through separating walls and floors — services, skirtings, cornices.",
  "Assess glazing acoustic performance in external-noise-exposed rooms.",
  "Engage the acoustic consultant to prepare the remediation specification based on measurement findings.",
];

const methodology = [
  "Engage an acoustic consultant to confirm the acoustic upgrade specification before any works commence.",
  "For inadequate separating floors — install a floating floor system using resilient mounts or resilient underlay over the full floor area.",
  "Ensure no acoustic bridges exist between the floating floor and the structural slab — check all fixings, skirting boards and services penetrations.",
  "For inadequate separating walls — install additional plasterboard layers with resilient battens or staggered stud systems.",
  "Seal all penetrations through separating walls and floors with acoustic-grade mineral wool and fire-rated acoustic sealant.",
  "Install acoustic boxing around all building services penetrating through separating elements.",
  "For external noise — upgrade glazing to acoustically rated double or laminated glass.",
  "Conduct post-upgrade acoustic testing to confirm NCC compliance.",
  "Record all acoustic test reports, product specifications and installation photographs.",
];

const risks = [
  "Ongoing resident amenity loss from inadequate sound insulation",
  "Strata disputes and NCAT applications from affected lot owners",
  "Legal liability for building defects not meeting NCC acoustic requirements",
  "Invasive and expensive remediation required — often requiring floor or ceiling strip-out",
  "Impact on property values and marketability of affected lots",
  "Building Commission and warranty claims against builders",
  "Difficulty in achieving acoustic compliance on retrofit works within existing construction",
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
          <a href="/defect-library/miscellaneous-other" className="inline-flex rounded-xl border border-slate-300 bg-white px-5 py-3 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-100">← Back to Miscellaneous & Other</a>
          <div className="mt-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-700">Miscellaneous & Other</p>
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Acoustic Issues</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">Acoustic performance deficiencies in Class 2 buildings — insufficient sound insulation between lots, inadequate impact sound control, and excessive external noise transmission — are a frequent source of resident complaints and strata disputes. The National Construction Code (NCC) requires that separating floors and walls between habitable rooms in different dwellings achieve minimum Weighted Sound Reduction Index (Rw) and Weighted Standardised Impact Sound Pressure Level (LnTw) values. Deficiencies from construction shortcuts, incorrect materials or poor detailing can result in acoustic performance substantially below the NCC requirements, with remediation often requiring invasive construction works.</p>
            </div>
          </div>
          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard title="Common Signs" items={["Airborne noise from adjacent apartments clearly audible — conversation, television, music", "Impact noise — footsteps, dropped objects — transmitted from the floor above", "External traffic or aircraft noise significantly louder than expected", "Noise from building services (pumps, lifts, air conditioning) audible in habitable rooms", "Complaints escalating between adjacent lot owners from recurring noise", "Acoustic consultant measurements confirming sub-NCC performance", "Noise flanking around separating walls through continuous ceiling or floor elements"]} />
            <InfoCard title="Common Causes" items={["Lightweight separating floor construction without adequate mass or resilient layer", "Floating floor systems with isolated resilient mounts incorrectly installed — acoustic bridging", "Penetrations through separating walls and floors not acoustically sealed", "Flanking noise paths through continuous concrete elements bypassing the separating assembly", "External glazing with insufficient sound reduction for the external noise environment", "Building services not isolated from the structure — vibration transmitted to habitable rooms", "Construction shortcuts — missing acoustic batts, direct-fixed floor finishes over concrete"]} />
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
              <ul className="mt-4 space-y-2">{["Floating floor acoustic systems", "Resilient ceiling systems", "Acoustic wall lining systems", "Penetration acoustic sealing systems", "Acoustic glazing upgrade systems"].map((item) => (<li key={item} className="flex gap-3 text-base leading-7 text-slate-700"><span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-800" />{item}</li>))}</ul>
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
