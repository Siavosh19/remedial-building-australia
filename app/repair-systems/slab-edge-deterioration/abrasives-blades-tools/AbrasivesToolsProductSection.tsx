"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag = "Diamond" | "Abrasive" | "125mm" | "100mm" | "Surface-Prep" | "Dry-Cut" | "Wet-Cut" | "Angle-Grinder";

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
    fullLabel: "Husqvarna Australia",
    brandUrl: "https://www.husqvarnacp.com/au/",
    accentColor: "#d97706",
    name: "Husqvarna Vari-Cut — Diamond Grinding Disc",
    descriptionLine: "Segmented diamond grinding disc for concrete surface preparation — 100/125 mm dia",
    productType: "Diamond segmented grinding disc",
    filterTags: ["Diamond", "125mm", "100mm", "Surface-Prep", "Dry-Cut"],
    techChips: [
      { label: "Diamond", cls: "bg-amber-100 text-amber-800" },
      { label: "100/125 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Dry cut", cls: "bg-orange-100 text-orange-800" },
    ],
    systemDescription:
      "Husqvarna Vari-Cut segmented diamond disc used for grinding and profiling concrete slab edges prior to repair mortar application. Achieves CSP 3 surface profile per ICRI 310.2R when used on an angle grinder with appropriate technique. Suitable for exposing aggregate and removing carbonated surface layers before bonding agent application.",
    technicalProperties: [
      "Disc diameter: 100 mm or 125 mm to suit grinder",
      "Bond type: segmented diamond for concrete and masonry",
      "Arbor: 22.23 mm standard angle grinder spindle",
      "Dry use: no water cooling required in most applications",
      "Achieves ICRI CSP 3 with multiple passes on concrete",
      "Use with angle grinder at 8,000–12,000 RPM",
    ],
    limitations: [
      "Wear rate increases on high-aggregate concrete — select correct bond hardness",
      "Not suitable for cutting: use crack chaser or cut-off disc for slot cutting",
      "Generate concrete dust — mandatory vacuum extraction or wet method",
      "Do not exceed max RPM stamped on disc",
      "Eye, face, and P2 respiratory PPE mandatory per AS 4991",
    ],
    procurementSources: [
      { name: "Husqvarna Construction", url: "https://www.husqvarnacp.com/au/" },
      { name: "Total Tools", url: "https://www.totaltools.com.au/" },
      { name: "Kennards Hire", url: "https://www.kennards.com.au/" },
    ],
  },
  {
    fullLabel: "Norton Abrasives Australia",
    brandUrl: "https://www.nortonabrasives.com/en-au",
    accentColor: "#0369a1",
    name: "Norton Bear-Tex — Abrasive Concrete Grinding Disc",
    descriptionLine: "Non-woven abrasive surface conditioning disc for concrete — 100/125 mm dia",
    productType: "Non-woven abrasive disc for concrete",
    filterTags: ["Abrasive", "125mm", "100mm", "Surface-Prep", "Dry-Cut"],
    techChips: [
      { label: "Non-woven", cls: "bg-sky-100 text-sky-800" },
      { label: "100/125 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Surface-condition", cls: "bg-blue-100 text-blue-800" },
    ],
    systemDescription:
      "Norton Bear-Tex non-woven abrasive disc used for surface conditioning and light grinding on concrete slab edges. Effective for opening surface pores, removing contamination, and conditioning the surface before primer application without excessive substrate removal. Less aggressive than diamond segments — suited to final profile pass or inter-coat keying.",
    technicalProperties: [
      "Disc diameter: 100 mm or 125 mm",
      "Non-woven nylon abrasive construction",
      "Grade: medium or coarse for concrete application",
      "Use dry at standard angle grinder speeds",
      "Does not generate coarse dust — still requires vacuum extraction",
      "Compatible with all standard angle grinders",
    ],
    limitations: [
      "Less aggressive than diamond — not suitable for achieving CSP 3 in one pass on hard concrete",
      "Short service life on hard aggregate concrete",
      "Not suitable for deep grinding or material removal",
      "Replace when abrasive face loading occurs",
      "P2 respiratory PPE and eye protection mandatory",
    ],
    procurementSources: [
      { name: "Norton Abrasives / Saint-Gobain", url: "https://www.nortonabrasives.com/en-au" },
      { name: "Blackwoods", url: "https://www.blackwoods.com.au/" },
    ],
  },
  {
    fullLabel: "Metabo Australia",
    brandUrl: "https://www.metabo.com/au/",
    accentColor: "#15803d",
    name: "Metabo Abrasive Grinding Wheel — Concrete",
    descriptionLine: "Resin-bonded abrasive grinding wheel for concrete surface preparation — 125 mm dia",
    productType: "Resin-bonded abrasive grinding wheel",
    filterTags: ["Abrasive", "125mm", "Surface-Prep", "Dry-Cut", "Angle-Grinder"],
    techChips: [
      { label: "Resin-bonded", cls: "bg-green-100 text-green-800" },
      { label: "125 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Concrete", cls: "bg-emerald-100 text-emerald-800" },
    ],
    systemDescription:
      "Metabo resin-bonded abrasive grinding wheel for concrete surface preparation. Used with Metabo or compatible angle grinders to abrade and profile slab edge faces prior to repair mortar application. Effective for removing laitance, paint, and surface contamination. Combines well with vacuum extraction for cleaner working environment.",
    technicalProperties: [
      "Disc diameter: 125 mm (also available 100 mm)",
      "Resin-bonded silicon carbide or aluminium oxide abrasive",
      "Max operating speed: check disc for RPM rating",
      "Use with standard M14 angle grinder spindle",
      "Suitable for concrete, stone, and masonry surfaces",
      "Complies with EN 12413 bonded abrasive products standard",
    ],
    limitations: [
      "Moderate service life on high-silica aggregate concrete",
      "Grinding wheel breakage risk if dropped or struck — inspect before use",
      "Do not use damaged or cracked wheels",
      "Not suitable for cutting operations",
      "Silica dust hazard — HEPA vacuum extraction mandatory",
    ],
    procurementSources: [
      { name: "Metabo Australia", url: "https://www.metabo.com/au/" },
      { name: "Blackwoods", url: "https://www.blackwoods.com.au/" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au/trade" },
    ],
  },
  {
    fullLabel: "Makita Australia",
    brandUrl: "https://www.makita.com.au/",
    accentColor: "#0f766e",
    name: "Makita Abrasive & Diamond Grinding Disc — Concrete",
    descriptionLine: "Abrasive and diamond grinding disc range for concrete angle grinder surface prep — 125 mm dia",
    productType: "Diamond and abrasive grinding disc for concrete",
    filterTags: ["Diamond", "Abrasive", "125mm", "Surface-Prep", "Dry-Cut", "Angle-Grinder"],
    techChips: [
      { label: "Diamond/abrasive", cls: "bg-teal-100 text-teal-800" },
      { label: "125 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Dry cut", cls: "bg-orange-100 text-orange-800" },
    ],
    systemDescription:
      "Makita range of diamond and abrasive grinding discs designed for use with Makita angle grinders for concrete surface preparation. Both segmented diamond cup wheels and resin-bonded abrasive discs available. Suitable for slab edge profiling, laitance removal, and CSP 3 surface preparation before bonding agent and repair mortar application.",
    technicalProperties: [
      "Disc diameter: 125 mm (M14 spindle, standard)",
      "Diamond cup wheel option: 16-segment aggressive profile",
      "Resin-bonded abrasive option: medium grit for surface conditioning",
      "Compatible with Makita and all M14 angle grinders",
      "Suitable for concrete, render, and cementitious substrates",
      "Use dry in most applications — wet optional to reduce dust",
    ],
    limitations: [
      "Diamond cup wheel more aggressive — risk of over-profiling on soft concrete",
      "Abrasive disc wears faster on hard or high-aggregate concrete",
      "Do not use without vacuum extraction — silica dust hazard",
      "Eye protection and P2 respirator mandatory",
      "Check disc for damage before each use",
    ],
    procurementSources: [
      { name: "Makita Australia", url: "https://www.makita.com.au/" },
      { name: "Total Tools", url: "https://www.totaltools.com.au/" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au/trade" },
    ],
  },
  {
    fullLabel: "Bosch Australia",
    brandUrl: "https://www.bosch-professional.com/au/",
    accentColor: "#1e40af",
    name: "Bosch Expert — Concrete Surface Grinding Disc",
    descriptionLine: "Expert-series diamond grinding disc for concrete surface preparation — 125 mm dia",
    productType: "Expert diamond grinding disc for concrete",
    filterTags: ["Diamond", "125mm", "Surface-Prep", "Dry-Cut", "Wet-Cut", "Angle-Grinder"],
    techChips: [
      { label: "Expert series", cls: "bg-blue-100 text-blue-800" },
      { label: "125 mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Diamond", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Bosch Expert-series diamond grinding disc engineered for high-performance concrete surface preparation. Multi-segment diamond bond for long service life on slab edge faces. Available for both dry and wet use. Achieves ICRI CSP 3 profile required before application of repair mortar bonding agents. Consistent segment height for predictable stock removal.",
    technicalProperties: [
      "Disc diameter: 125 mm, arbor 22.23 mm",
      "Diamond segments: multi-segment high-concentration bond",
      "Suitable for dry and wet grinding",
      "Max RPM: 11,000 RPM (check disc label)",
      "Complies with EN 13236 superabrasives standard",
      "Delivers consistent CSP 3 profile per ICRI 310.2R",
    ],
    limitations: [
      "Dry use generates significant airborne silica dust — vacuum extraction mandatory",
      "Wet use requires water source and drainage management on elevated slabs",
      "Segment wear accelerates on ultra-hard concrete — select correct bond",
      "Not for cutting — use cut-off disc or crack chaser for slot operations",
      "PPE: safety glasses/face shield, P2 respirator, hearing protection mandatory",
    ],
    procurementSources: [
      { name: "Bosch Professional", url: "https://www.bosch-professional.com/au/" },
      { name: "Total Tools", url: "https://www.totaltools.com.au/" },
      { name: "Bunnings Trade", url: "https://www.bunnings.com.au/trade" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "Diamond", label: "Diamond disc" },
  { tag: "Abrasive", label: "Abrasive disc" },
  { tag: "125mm", label: "125 mm" },
  { tag: "100mm", label: "100 mm" },
  { tag: "Surface-Prep", label: "Surface prep" },
  { tag: "Dry-Cut", label: "Dry cut" },
  { tag: "Wet-Cut", label: "Wet cut" },
  { tag: "Angle-Grinder", label: "Angle grinder" },
];

const TECH_INFO = {
  typicalApplications: [
    "Grinding and profiling concrete slab edge faces before repair mortar application",
    "Achieving ICRI CSP 3 surface profile prior to bonding agent slurry",
    "Removing carbonated laitance, paint, curing membrane residue, and surface contamination",
    "Abrading between repair mortar lifts to remove bleed water sheen",
    "Inter-coat surface conditioning before topcoat or sealer application",
  ],
  selectionCriteria: [
    "Segmented diamond disc: preferred for hard concrete, large area, efficient stock removal",
    "Resin-bonded abrasive disc: suited for lighter surface conditioning and softer substrates",
    "125 mm disc: standard for slab edge face and nosing areas",
    "100 mm disc: better access in restricted nosing areas or confined slab edges",
    "Dry cut: suitable for most repair applications where vacuum extraction is connected",
    "Wet cut: used where dust suppression is critical and water drainage is available",
  ],
  limitations: [
    "No grinding disc creates a crack-free bonded interface without correct bonding agent application",
    "Over-grinding removes structural aggregate and weakens substrate — do not chase excessive depth",
    "All concrete grinding generates respirable crystalline silica — mandatory WHS controls apply",
    "Not suitable for large-area full slab grinding — use dedicated floor grinding machine",
    "Grinding alone does not detect hollow or delaminated areas — combine with tap test",
  ],
  standardsNotes: [
    "ICRI 310.2R-2013: surface profile assessment — CSP 3 minimum for repair mortars",
    "AS 4991-2004: protective equipment for abrasive blasting (PPE framework)",
    "Safe Work Australia Code of Practice: Managing the Risks of Silica Dust",
    "WHS Regulations: silica dust exposure standard 0.05 mg/m³ TWA (as at 2024)",
    "EN 12413 (bonded abrasives) and EN 13236 (superabrasives): disc construction standards",
  ],
  suitableDefects: [
    "Slab edge deterioration — surface preparation phase",
    "Spalled and delaminated slab edge faces",
    "Carbonated surface layer removal before repair",
    "Paint-contaminated or sealed surfaces prior to repair mortar",
    "Slab nosing and exposed aggregate edge preparation",
  ],
  typicalSubstrates: [
    "Reinforced concrete slab edges (C25 to C65 grade)",
    "Post-tensioned slab edges and band beams",
    "Precast concrete slab edge units",
    "Render-covered concrete (to remove render before substrate repair)",
    "Concrete slab nosing and exposed aggregate edges",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "Husqvarna Vari-Cut", brand: "Husqvarna", type: "Diamond segmented", size: "100/125 mm", profile: "CSP 3" },
  { product: "Norton Bear-Tex", brand: "Norton", type: "Non-woven abrasive", size: "100/125 mm", profile: "CSP 2–3" },
  { product: "Metabo Abrasive Wheel", brand: "Metabo", type: "Resin-bonded abrasive", size: "125 mm", profile: "CSP 2–3" },
  { product: "Makita Diamond Disc", brand: "Makita", type: "Diamond / abrasive", size: "125 mm", profile: "CSP 3" },
  { product: "Bosch Expert Disc", brand: "Bosch", type: "Multi-segment diamond", size: "125 mm", profile: "CSP 3" },
];

export function AbrasivesToolsIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
          <BookOpen size={16} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">Abrasives, blades & tools for slab edge surface preparation</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">Diamond and abrasive discs for achieving CSP 3 surface profile on concrete slab edges before repair mortar application. Read more ↓</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>
            Surface preparation is the single most important factor governing bond strength of repair mortars applied to slab edges. ICRI 310.2R specifies surface profile standards from CSP 1 (lightest) to CSP 10 (most aggressive). Polymer-modified cementitious repair mortars on concrete slab edges require a minimum CSP 3 profile — equivalent to medium abrasive blasting or rotary disc grinding. Without adequate profile, even the best-specified repair mortar will delaminate in service.
          </p>
          <p>
            Angle grinder discs are the standard tool for slab edge surface preparation in remedial building work. The restricted geometry of slab edges — typically 50–200 mm in height and often with limited overhead access — makes full-face floor grinders impractical. A 125 mm angle grinder fitted with a segmented diamond disc can access most slab nosing and edge face geometries, including internal corners, soffit areas, and narrow edge bands.
          </p>
          <p>
            Diamond discs cut harder and faster than abrasive discs and last significantly longer on concrete. Resin-bonded abrasive discs are suitable for lighter surface conditioning, inter-coat keying, and work on softer repair mortars. Both types generate concrete and silica dust — HEPA vacuum extraction is mandatory under current WHS silica dust regulations (TWA 0.05 mg/m³). All site operations must comply with the Safe Work Australia Code of Practice for Managing the Risks of Silica Dust, including wet or on-tool extraction methods, PPE provision, and health monitoring.
          </p>
          <p>
            This page covers angle grinder discs for hand-held slab edge surface preparation. For large-area slab grinding (e.g. full floor preparation under self-levelling compounds), refer to the floor grinding & preparation category under magnesite flooring deterioration.
          </p>
        </div>
      )}
    </div>
  );
}

export function AbrasivesToolsProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const [accordionOpen, setAccordionOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (tag: FilterTag) =>
    setActiveFilters((prev) => {
      const n = new Set(prev);
      n.has(tag) ? n.delete(tag) : n.add(tag);
      return n;
    });

  const filtered =
    activeFilters.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.filterTags.some((t) => activeFilters.has(t)));

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      {/* Filter tags */}
      <div className="flex flex-wrap gap-2">
        {FILTER_DEFS.map(({ tag, label }) => {
          const active = activeFilters.has(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleFilter(tag)}
              className={`rounded-full border px-3 py-1 text-xs font-bold transition ${
                active
                  ? "border-sky-600 bg-sky-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-sky-300"
              }`}
            >
              {label}
            </button>
          );
        })}
        {activeFilters.size > 0 && (
          <button
            onClick={() => setActiveFilters(new Set())}
            className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700 transition hover:bg-red-100"
          >
            Clear filters
          </button>
        )}
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
          {filtered.length === 0 && (
            <div className="flex w-full items-center justify-center py-12 text-sm text-slate-400">
              No products match the selected filters.
            </div>
          )}
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
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Brand</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Type</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Size</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Profile</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 bg-inherit px-5 py-3 font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.size}</td>
                  <td className="px-4 py-3 text-slate-600">{row.profile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
