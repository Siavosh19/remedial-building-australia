import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Defective & Non-Compliant Balustrades | Remedial Building Australia",
  description:
    "Technical guide to defective and non-compliant balustrades in Class 2 buildings — corroded steel, rotten timber, failed glass fixings, non-compliant heights and structurally inadequate masonry balustrades.",
};

const inspectionItems = [
  "Inspect all balustrade elements of all material types — steel, aluminium, timber, glass, masonry — for corrosion, rot, section loss, delamination and structural deterioration.",
  "Apply a lateral load test to all balustrade posts — apply a minimum 1.0 kN (approximately 100 kg) horizontal force at top rail height and observe for deflection, movement or cracking.",
  "Measure balustrade height at all balcony, stair, void and common area locations — minimum 1000 mm to the top of the rail where the fall height exceeds 1 m; 865 mm minimum at stairs.",
  "For steel posts: tap the post base and surrounding tile and screed for hollowness; probe with a sharp tool or bore camera to inspect the embedded section where corrosion is suspected below the surface.",
  "For timber posts and rails: probe with a sharp tool to identify softening and decay in exposed sections, end grain, base junctions and any areas in contact with moisture-retaining substrates.",
  "For aluminium balustrades: inspect all fixings, post bases and extrusion sections for pitting corrosion, galvanic corrosion at steel fasteners and section loss in marine environments.",
  "For glass balustrades: inspect all patch fittings, spigot bases, channel clamps and structural fixings for corrosion, looseness and correct engagement with the glass edge.",
  "For masonry balustrades (single-skin brick, core-filled block, concrete upstand): assess structural capacity by observation and consult a structural engineer where height, slenderness or cracking is a concern.",
  "Inspect all balustrade-to-facade junctions and post penetrations for failed sealant, open gaps and water ingress pathways.",
  "Engage a structural engineer to assess all balustrades where structural non-compliance, deterioration beyond maintenance, or non-compliant height is identified.",
];

const methodology = [
  "Engage a structural engineer to assess all defective balustrade posts and systems and confirm structural compliance and load-bearing capacity before commencing works.",
  "Erect temporary hoarding, fencing or barriers to protect occupants where structurally compromised balustrades have been identified — do not delay this step.",
  "Develop a prioritised works programme distinguishing safety-critical structural defects from cosmetic deterioration and maintenance items.",
  "For corroded steel posts: remove tiles and screed to expose the embedded section; extract corroded posts by cutting at slab level and drilling out the core fill; install stainless steel grade 316 or hot-dip galvanised replacement posts with a correctly specified base plate and anchor to the structural engineer's design.",
  "For rotting timber posts and rails: remove all decayed timber; treat the surrounding structure with a timber preservative; install replacement treated hardwood or alternative compliant material, ensuring no direct contact between replacement timber and moisture-retaining substrates.",
  "For corroded aluminium posts and frames: assess extent of section loss; clean, re-treat and repaint where loss is minor; replace sections or the full frame where structural capacity is affected.",
  "For glass balustrades with failed fixings: replace patch fittings, spigot bases and structural hardware with compliant stainless steel alternatives; confirm glass engagement, edge clearance and load capacity with the engineer.",
  "For balustrades with non-compliant height: extend or replace the balustrade assembly to achieve the minimum compliant height — obtain structural engineering documentation to confirm the new configuration meets AS/NZS 1170.1.",
  "For masonry balustrades found to be structurally inadequate: demolish and replace with a compliant framed or reinforced alternative — masonry balustrades must be designed for the specified lateral loads by a structural engineer.",
  "Install a waterproof sleeve, membrane patch or correctly detailed waterproofing at all post base penetrations through the waterproofing membrane before screed and tile reinstatement.",
  "Reseal all balustrade-to-facade and post-base junctions with a polyurethane sealant over backer rod — ensure the sealant is continuous and correctly tooled.",
  "Obtain structural engineering sign-off on all structural works and record all documentation, photos and test results in the strata maintenance register.",
];

const risks = [
  "Structural failure and fall from height — the primary life safety risk associated with balustrade defects.",
  "Non-compliance with AS 1657, AS 1428.1 and AS/NZS 1170.1 minimum loading and height requirements.",
  "Building Commission or council urgent rectification orders and potential stop orders on common areas.",
  "Strata body corporate liability for injury or death from balustrade failure.",
  "Glass panel failure where structural fixings deteriorate without inspection or maintenance.",
  "Accelerating structural deterioration in untreated corroded posts leading to full replacement requirements.",
  "Escalating cost of remediation as associated tiling, waterproofing and structural elements require concurrent replacement.",
];

export default function DefectiveNonCompliantBalustradesPage() {
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
          <a href="/" className="hidden shrink-0 rounded-xl bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800 md:inline-flex">Home</a>
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
              <h1 className="mt-4 text-5xl font-extrabold leading-tight text-sky-950">Defective & Non-Compliant Balustrades</h1>
              <p className="mt-6 text-xl leading-9 text-slate-700">
                Balustrade defects in Class 2 buildings range from corroded steel posts and rotten timber frames to non-compliant heights and structurally inadequate masonry constructions. As balustrades are primary fall-prevention barriers, any defect affecting structural capacity — regardless of material type — represents a serious life safety risk. Beyond steel corrosion, which is well documented, many older buildings contain timber balustrades subject to decay, aluminium frames with corrosion at fixings, glazed balustrades with deteriorated structural hardware, and single-skin brick or concrete upstand balustrades that do not meet current loading requirements. A structured inspection programme covering all balustrade materials and types is required to identify and prioritise defects by severity, structural impact and compliance status.
              </p>
            </div>
          </div>

          <section className="mt-20 grid gap-10 lg:grid-cols-3">
            <InfoCard
              title="Common Signs"
              items={[
                "Rust staining on balcony and podium surfaces at steel post bases",
                "Cracking, tile lift or swelling at steel post base locations from corrosion expansion",
                "Softening, discolouration or surface decay on timber balustrade frames and rails",
                "Paint blistering and section loss on painted steel or aluminium elements",
                "Pitting corrosion on aluminium frames and fixings in coastal environments",
                "Loose, cracked or poorly supported glass balustrade panels",
                "Balustrade height clearly below minimum 1000 mm at balconies",
                "Posts that move or deflect visibly when pushed laterally",
                "Open or unsealed core fill penetrations at post base locations",
                "Failed or absent sealant at balustrade-to-facade junctions",
              ]}
            />
            <InfoCard
              title="Common Causes"
              items={[
                "Steel posts core-filled into slabs without waterproofing at the base",
                "Timber frames in direct contact with moisture-retaining substrates without treatment or isolation",
                "Aluminium frames in marine environments without adequate corrosion protection at fixings",
                "Non-compliant height at time of original construction",
                "Single-skin brick or concrete upstand balustrades with inadequate lateral load capacity",
                "Core-filled blockwork balustrades not engineered to current AS/NZS 1170 loadings",
                "Failed sealant around post penetrations allowing continuous water ingress to the embedded zone",
                "Lack of maintenance painting and resealing over many years",
                "Age-related structural deterioration without inspection or assessment",
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
              Balustrade remediation must be prioritised by structural risk. Any balustrade identified as structurally compromised must be taken out of service immediately and temporary barriers erected before any scope of works is prepared. All structural replacement or modification works require a structural engineer&rsquo;s design and sign-off.
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
                  "Steel and stainless steel balustrade post replacement systems",
                  "Timber balustrade replacement and preservative treatment systems",
                  "Glass balustrade structural fixing and panel replacement",
                  "Core fill waterproofing and post base sealing systems",
                  "Non-compliant balustrade height extension and replacement systems",
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
