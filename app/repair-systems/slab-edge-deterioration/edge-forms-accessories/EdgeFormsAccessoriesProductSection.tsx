"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag = "Galvanised-Steel" | "PVC" | "Permanent" | "Temporary" | "Edge-Form" | "Nosing-Form" | "Strip-Off";

type Product = {
  fullLabel: string;
  brandUrl: string;
  tdsUrl?: string;
  accentColor: string;
  name: string;
  descriptionLine: string;
  productType: string;
  filterTags: FilterTag[];
  techChips: { label: string; cls: string }[];
  systemDescription: string;
  technicalProperties: string[];
  limitations: string[];
  procurementSources: { name: string; url?: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Hy-Ten Australia",
    brandUrl: "https://www.hyten.com.au",
    accentColor: "#0369a1",
    name: "Hy-Ten Galvanised Steel Edge Form Angle",
    descriptionLine: "Galvanised steel angle edge form for slab edge repair — fixed in position before mortar placement — provides clean arris profile on repaired edge — strip or leave permanent",
    productType: "Galvanised steel angle edge form — slab edge and nosing repair",
    filterTags: ["Galvanised-Steel", "Edge-Form", "Nosing-Form", "Strip-Off", "Temporary"],
    techChips: [
      { label: "Galvanised steel", cls: "bg-sky-100 text-sky-800" },
      { label: "Strip or permanent", cls: "bg-slate-100 text-slate-700" },
      { label: "Clean arris", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Galvanised steel angle edge forms from Hy-Ten are fixed to the slab face before repair mortar is placed, defining the geometry of the repaired slab edge or nosing and providing a shuttering surface that produces a clean, true arris when the mortar is applied and screeded. In slab edge repair, edge forms are fixed using concrete nails or screws into the existing concrete face before primer is applied and mortar is placed. The form angle holds the repair mortar in position on the vertical face, preventing it from slumping off the edge during application and curing. Standard angles are 50×50 mm, 65×65 mm, or custom-cut to the existing slab depth. Galvanised steel forms can be stripped after the mortar has achieved sufficient early strength — typically after 24–48 hours — or left in place permanently if the specification allows. If left permanently, the galvanised coating provides corrosion resistance but may ultimately rust at cut edges over time in aggressive exposure. Confirm angle size to match existing slab edge profile before cutting. Available through Hy-Ten and other steel reinforcement and formwork suppliers nationally.",
    technicalProperties: [
      "Galvanised steel angle — 50×50 mm, 65×65 mm, or custom cut to slab depth",
      "Fixed to slab face with concrete nails or powder-actuated fasteners before primer and mortar",
      "Holds repair mortar on vertical face — prevents slumping during application",
      "Produces clean, true arris profile on repaired edge — consistent geometry",
      "Strip after 24–48 hours early mortar strength, or leave permanent",
      "Available through Hy-Ten and steel reinforcement suppliers nationally",
    ],
    limitations: [
      "If left permanently, cut edges of galvanised angle will rust over time in aggressive coastal exposure",
      "Must be fixed level and plumb to produce a true edge arris — poor fixing produces uneven repair profile",
      "Do not apply primer over the form — fix form, then apply primer to exposed substrate only",
      "Strip carefully to avoid damaging the mortar face before it has fully hardened",
      "Not suitable as a structural connection — edge form is a formwork accessory only",
    ],
    procurementSources: [
      { name: "Hy-Ten — reinforcement and formwork accessories", url: "https://www.hyten.com.au" },
      { name: "Steel reinforcement suppliers — nationally", url: "https://www.hyten.com.au" },
      { name: "Concrete and formwork trade suppliers", url: "https://www.hyten.com.au" },
    ],
  },
  {
    fullLabel: "Various / Trade Supply",
    brandUrl: "https://www.bunnings.com.au",
    accentColor: "#be123c",
    name: "PVC Plastic Edge Form Angle — Slab Edge and Nosing Form",
    descriptionLine: "PVC plastic angle edge form for slab edge repair — lighter than steel — easy cutting — strip off after cure — suitable for straight slab edge repairs on balconies and walkways",
    productType: "PVC plastic angle edge form — slab edge repair formwork accessory",
    filterTags: ["PVC", "Edge-Form", "Nosing-Form", "Strip-Off", "Temporary"],
    techChips: [
      { label: "PVC plastic", cls: "bg-rose-100 text-rose-700" },
      { label: "Lightweight", cls: "bg-slate-100 text-slate-700" },
      { label: "Easy cut to length", cls: "bg-green-50 text-green-700" },
      { label: "Strip after cure", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "PVC plastic angle edge forms are a lightweight alternative to galvanised steel for slab edge repair on balconies and external walkways where the form will be stripped after the mortar has cured. PVC angle is easily cut with a hacksaw or tin snips to the required length and fixed to the slab face with concrete nails or screws. It holds the repair mortar on the vertical face, defines the edge arris profile, and is stripped cleanly from the cured mortar surface — PVC does not bond to cementitious mortars and releases cleanly without the need for form release agent. PVC edge forms are not suitable for permanent installation in structural applications or where the form will be embedded in the repair — use galvanised steel or stainless steel if the form is to remain in place. Standard angle sections: 50×50 mm or 65×65 mm. Available through formwork suppliers, hardware merchants, and Bunnings trade counters nationally. Confirm PVC grade is appropriate for the exposure temperature on site — some low-grade PVC becomes brittle in UV and cold temperature exposure.",
    technicalProperties: [
      "PVC angle — 50×50 mm or 65×65 mm — cut to length with hacksaw or tin snips",
      "Lightweight and easy to fix — concrete nails or screws to slab face",
      "Does not bond to cementitious mortar — strips cleanly after cure",
      "No form release agent required — PVC naturally releases from mortar surface",
      "Not suitable for permanent embedding in repair — strip off after mortar cures",
      "Widely available through hardware and formwork trade suppliers",
    ],
    limitations: [
      "Not suitable for permanent installation — use galvanised or stainless steel if form is to remain",
      "Low-grade PVC may become brittle in prolonged UV and cold weather — confirm grade with supplier",
      "Not suitable for high-temperature applications or repairs adjacent to heat sources",
      "Must be fixed accurately — poor fixing produces uneven edge geometry",
    ],
    procurementSources: [
      { name: "Bunnings Trade — PVC angle section", url: "https://www.bunnings.com.au" },
      { name: "Formwork and concrete suppliers nationally", url: "https://www.bunnings.com.au" },
    ],
  },
  {
    fullLabel: "Dincel Construction System",
    brandUrl: "https://www.dincel.com.au",
    accentColor: "#15803d",
    name: "Dincel PVC Permanent Structural Edge and Kicker Form",
    descriptionLine: "Permanent interlocking PVC structural formwork for slab edge and kicker applications — stays in place as part of the repair — fire-rated and structural formwork system",
    productType: "Permanent PVC structural formwork — slab edge and kicker form — Dincel",
    filterTags: ["PVC", "Permanent", "Edge-Form"],
    techChips: [
      { label: "Permanent formwork", cls: "bg-green-100 text-green-800" },
      { label: "Structural — stays in place", cls: "bg-slate-100 text-slate-700" },
      { label: "Interlocking PVC", cls: "bg-blue-50 text-blue-700" },
      { label: "Dincel system", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Dincel is a permanent structural PVC formwork system that remains in place as part of the finished element. In slab edge repair and new construction, Dincel PVC forms are used as permanent stay-in-place shuttering that is filled with concrete or repair mortar. Unlike strip-off edge forms, Dincel forms are not removed after the repair — they become an integral part of the finished element, providing a smooth, durable external face without the need for stripping or patch repair after form removal. The interlocking profile provides lateral restraint for the filled repair mortar and produces a clean, even external finish. Dincel is more commonly used in new construction and major structural upgrade works rather than routine slab edge patch repair — confirm with the project structural engineer whether the Dincel system is appropriate for the repair scope and whether the PVC form face is acceptable for the intended finish. Dincel is manufactured in Australia and distributed nationally. Confirm current product range, structural classification, and fire rating from the current Dincel technical documentation before specifying.",
    technicalProperties: [
      "Permanent interlocking PVC formwork — stays in place after mortar or concrete placement",
      "Provides smooth, durable external face without strip-off and patch repair",
      "Interlocking profile provides lateral restraint for filled mortar",
      "Australian-manufactured — nationally distributed",
      "Fire-rated classifications available — confirm from Dincel technical documentation",
    ],
    limitations: [
      "More commonly used in new construction or major structural upgrade — confirm suitability with structural engineer for routine slab edge patch repair",
      "PVC face is visible in finished condition — confirm acceptable to project specification",
      "Not strip-off — permanent installation means geometry must be correct first time",
      "Confirm fire-rating requirements from current Dincel documentation",
    ],
    procurementSources: [
      { name: "Dincel Construction System — nationally", url: "https://www.dincel.com.au" },
    ],
  },
  {
    fullLabel: "Generic / Trade Supply",
    brandUrl: "https://www.bunnings.com.au",
    accentColor: "#78716c",
    name: "Galvanised Steel Angle — 50×50×3 mm — Generic Edge Form",
    descriptionLine: "Standard galvanised steel equal angle — 50×50×3 mm — cut to length on site as slab edge form — widely available through steel merchants and hardware nationally",
    productType: "Galvanised steel equal angle — generic edge form material — trade supply",
    filterTags: ["Galvanised-Steel", "Edge-Form", "Nosing-Form", "Strip-Off", "Temporary", "Permanent"],
    techChips: [
      { label: "50×50×3 mm angle", cls: "bg-stone-100 text-stone-700" },
      { label: "Galvanised", cls: "bg-slate-100 text-slate-700" },
      { label: "Cut to length on site", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Standard 50×50×3 mm galvanised steel equal angle is the most common edge form material for slab edge repair in Australian practice. Cut to required lengths on site with an angle grinder or cold saw, drilled and fixed to the slab face with concrete nails or powder-actuated fasteners, and used as shuttering to hold repair mortar on the vertical slab edge face during placement and curing. The angle is left in place or stripped after 24–48 hours depending on project specification. When left permanently, the galvanised coating provides initial corrosion resistance, but cut edges will rust over time — in coastal and corrosive environments, specify 316 stainless steel angle for permanent-leave forms. Standard 50×50×3 mm galvanised angle is available per metre through steel merchants (OneSteel, Midalia Steel), hardware merchants (Bunnings, Mitre 10, Home Hardware), and building trade suppliers nationally. Order standard 6 m lengths and cut on site. Apply at the correct position and height to produce the correct slab edge geometry before any primer or mortar is applied.",
    technicalProperties: [
      "50×50×3 mm galvanised steel equal angle — standard section widely available",
      "Cut to length on site — angle grinder or cold saw",
      "Fixed to slab face with concrete nails or powder-actuated fasteners before primer",
      "Leave permanent or strip after 24–48 hours early mortar strength",
      "Available per metre through OneSteel, Midalia, Bunnings, Mitre 10 nationally",
      "Specify 316 SS angle for permanent-leave forms in coastal or corrosive environments",
    ],
    limitations: [
      "Cut edges will rust over time if left permanently — specify SS for coastal or permanent applications",
      "Must be fixed level and plumb — poor alignment produces uneven repair profile",
      "Galvanised coating is not suitable for all exposure classifications if left permanently — confirm with structural engineer",
      "Do not prime or coat the form face — mortar must release cleanly when stripping",
    ],
    procurementSources: [
      { name: "Bunnings — galvanised steel angle per metre", url: "https://www.bunnings.com.au" },
      { name: "OneSteel / InfraBuild — steel merchants nationally", url: "https://www.infrabuild.com" },
      { name: "Midalia Steel — galvanised angle nationally", url: "https://www.midaliasteel.com.au" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "Galvanised-Steel", label: "Galvanised steel" },
  { tag: "PVC", label: "PVC" },
  { tag: "Permanent", label: "Permanent" },
  { tag: "Temporary", label: "Temporary (strip off)" },
  { tag: "Edge-Form", label: "Edge form" },
  { tag: "Nosing-Form", label: "Nosing form" },
  { tag: "Strip-Off", label: "Strip off" },
];

const TECH_INFO = {
  typicalApplications: [
    "Slab edge shuttering to hold repair mortar on vertical face during placement",
    "Step nosing and stair tread edge form to define correct nosing geometry",
    "Balcony fascia beam edge form for soffit and face repair",
    "Carpark deck edge form for nosing repair",
    "Kicker and wall base shuttering for cementitious repair mortar",
  ],
  selectionCriteria: [
    "Permanent or strip-off: galvanised steel for strip-off or short-term; 316 SS for permanent leave in coastal exposures",
    "Slab edge depth: confirm angle leg sizes to match actual slab cover and edge depth",
    "PVC for lightweight strip-off applications where corrosion of permanent form is not acceptable",
    "Dincel system for major structural upgrade or new construction — confirm with structural engineer",
    "Fixing method: concrete nails for low-strength fixings; powder-actuated fasteners for reliable fixing to hard concrete",
  ],
  limitations: [
    "Edge form is not a structural element — do not use as a permanent structural component without engineering confirmation",
    "Galvanised steel permanently left in place will rust at cut edges over time — specify 316 SS for aggressive exposures",
    "PVC is not suitable for permanent installation in structural applications",
    "The form must be fixed accurately before primer and mortar — repositioning after priming is not possible",
    "Do not apply repair mortar without a fixed edge form on exposed slab edge faces — mortar will slump off the edge",
  ],
  standardsNotes: [
    "AS 3600 — concrete cover requirements at slab edges — informs edge form angle size selection",
    "AS 1397 — steel sheet — relevant for galvanised angle grade and coating weight",
    "ICRI 310.2 — surface profile requirements — form is fixed before CSP preparation work is done to protect adjacent concrete",
    "Engineer confirmation required where form is to remain permanent and is within the structural element",
  ],
  suitableDefects: [
    "Slab edge spalling requiring repair mortar on exposed vertical face",
    "Step nosing damage requiring edge geometry to be rebuilt",
    "Balcony fascia beam edge repair where soffit face profile must be maintained",
    "All repair mortar applications on exposed vertical slab or beam edges",
  ],
  typicalSubstrates: [
    "Reinforced concrete slab edges (in-situ and precast)",
    "Concrete step nosings and stair treads",
    "Fascia beams and balcony soffits",
    "Carpark deck edges and ramp nosings",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "Hy-Ten steel angle", type: "Galvanised steel", use: "Temporary or permanent", note: "Strip or leave; rust risk at cut edges" },
  { product: "PVC plastic angle", type: "PVC", use: "Temporary (strip off)", note: "No bond to mortar — clean release" },
  { product: "Dincel form", type: "Structural PVC", use: "Permanent", note: "Stay-in-place system; confirm with engineer" },
  { product: "50×50×3 mm galv angle", type: "Galvanised steel", use: "Temporary or permanent", note: "Standard trade supply; specify 316 SS for coastal" },
];

export function EdgeFormsAccessoriesIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><BookOpen size={16} /></div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">Why edge forms are required in slab edge repair</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">The role of the edge form in producing a true arris and holding mortar on the vertical face during placement</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>A slab edge form angle is a temporary or permanent shuttering piece fixed to the face of the slab before repair mortar is placed. Without it, repair mortar applied to a vertical slab edge will sag, slump, and fall off before it has had time to set — even with a thixotropic mortar, gravity wins on a fully exposed vertical face with no containment. The edge form holds the mortar in the void and defines the geometry of the finished repair edge: the angle of the arris, the depth of the slab face, and the alignment of the repaired edge with the existing slab above and below.</p>
          <p>In practice, the edge form angle is the detail that determines whether the completed repair looks like a professional repair or an obvious patch. A misaligned or absent form produces a repair with a rounded, irregular arris that visually signals the repair location. A correctly fixed form angle produces a sharp, true arris that is indistinguishable from the adjacent original slab edge once the protective coating is applied.</p>
          <p>Fix the form before applying the bonding primer — the primer goes over the exposed concrete within the repair area, not over the form face. The form is stripped after 24–48 hours or left permanently depending on specification.</p>
        </div>
      )}
    </div>
  );
}

export function EdgeFormsAccessoriesProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const [accordionOpen, setAccordionOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (tag: FilterTag) =>
    setActiveFilters((prev) => { const n = new Set(prev); n.has(tag) ? n.delete(tag) : n.add(tag); return n; });

  const filtered = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.some((t) => activeFilters.has(t)));

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter:</span>
        {FILTER_DEFS.map(({ tag, label }) => (
          <button key={tag} onClick={() => toggleFilter(tag)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${activeFilters.has(tag) ? "border-red-700 bg-red-700 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-sky-400"}`}>{label}</button>
        ))}
        {activeFilters.size > 0 && <button onClick={() => setActiveFilters(new Set())} className="text-xs font-bold text-red-700 underline">Clear</button>}
      </div>

      <div className="relative">
        <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronLeft size={16} /></button>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-2" style={{ scrollbarWidth: "none" }}>
          {filtered.map((p) => (
            <div key={p.name} className="w-80 shrink-0 rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeftWidth: 4, borderLeftColor: p.accentColor }}>
              <div className="border-b border-slate-100 px-5 py-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{p.fullLabel}</span>
                  <div className="flex gap-1">
                    {p.tdsUrl && <a href={p.tdsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 hover:text-slate-700"><FileText size={9} /> TDS</a>}
                    <a href={p.brandUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 hover:text-slate-700">Brand</a>
                  </div>
                </div>
                <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{p.name}</h3>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{p.productType}</p>
                <CollapsibleCardDetails text={p.descriptionLine} chips={p.techChips} />
              </div>
              <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                <CollapsibleDescription text={p.systemDescription} />
              </div>
              <div className="space-y-3 px-5 py-4">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                  <CollapsibleList items={p.technicalProperties} icon="check" limit={3} />
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                  <CollapsibleList items={p.limitations} icon="x" limit={3} />
                </div>
              </div>
              <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                <CollapsibleSources sources={p.procurementSources} />
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronRight size={16} /></button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? "Hide detail" : "Show detail"} <ChevronDown size={14} className={`transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<Layers size={15} />} title="Typical Applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<Ruler size={15} />} title="Selection Criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="When NOT to Use" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-4 text-lg font-extrabold text-sky-950">System Comparison</h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left font-bold text-slate-700 whitespace-nowrap sticky left-0 bg-slate-50 border-r border-slate-200">Product</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Type</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Use</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Note</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 bg-inherit px-5 py-3 font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.use}</td>
                  <td className="px-4 py-3 text-slate-600">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
