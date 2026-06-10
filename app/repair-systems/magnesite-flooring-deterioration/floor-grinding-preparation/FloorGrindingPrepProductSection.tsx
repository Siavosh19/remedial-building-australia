"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag = "Floor-Grinder" | "HEPA-Vacuum" | "M-Class" | "H-Class" | "250-280mm" | "Wet-Method" | "Dry-Method" | "Magnesite-Prep";

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
    fullLabel: "Husqvarna Construction",
    brandUrl: "https://www.husqvarnacp.com/au/",
    accentColor: "#d97706",
    name: "Husqvarna PG 280 — Single-Head Floor Grinder",
    descriptionLine: "Single-head diamond floor grinding machine with dust shroud — 280 mm working width",
    productType: "Diamond floor grinding machine for surface preparation",
    filterTags: ["Floor-Grinder", "250-280mm", "Dry-Method", "Magnesite-Prep"],
    techChips: [
      { label: "280 mm", cls: "bg-amber-100 text-amber-800" },
      { label: "Single-head", cls: "bg-orange-100 text-orange-800" },
      { label: "Floor grinder", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Husqvarna PG 280 is a single-head diamond floor grinding machine with an integrated dust shroud connection for HEPA vacuum attachment. At 280 mm working width, it is suitable for medium-area floor preparation in apartments and commercial buildings — maneuverable through standard doorways and in smaller rooms. Used for achieving CSP 2 profile on magnesite and concrete substrates prior to moisture primer and self-levelling underlayment application. Available for hire from Husqvarna-authorised hire centres.",
    technicalProperties: [
      "Working width: 280 mm",
      "Machine weight: approximately 60–70 kg (check current model)",
      "Single-head planetary grinding — accepts various diamond segment segments",
      "Integrated dust shroud connection for M/H-class HEPA vacuum",
      "Suitable for CSP 1–3 surface profiles depending on segment selection",
      "Electric (240V) — no engine exhaust, suitable for occupied building floor work",
    ],
    limitations: [
      "CAUTION: Magnesite contains magnesium chloride — classified as a respiratory and chemical hazard. Grinding must be performed with connected M or H-class HEPA vacuum at all times — dry airborne dust is prohibited",
      "Cannot grind right into corners and edges — hand angle grinder required to complete edge areas",
      "Hire machine — check current availability and compatibility with required diamond segments",
      "Operator must wear P2 respirator minimum, safety glasses, hearing protection, and gloves",
      "Magnesite dust must be disposed of as chemical waste — not general site waste",
      "Do not operate without dust shroud connection — WHS compliance requires on-tool extraction",
    ],
    procurementSources: [
      { name: "Husqvarna Construction Products", url: "https://www.husqvarnacp.com/au/" },
      { name: "Kennards Hire", url: "https://www.kennards.com.au/" },
    ],
  },
  {
    fullLabel: "Blastrac Australia",
    brandUrl: "https://www.blastrac.com/en-au",
    accentColor: "#be123c",
    name: "Blastrac 1-10DS — Single-Head Floor Grinder with Integrated Vacuum",
    descriptionLine: "Single-head floor grinder with integrated vacuum connection — 250 mm working width",
    productType: "Floor grinding machine with on-board vacuum connection",
    filterTags: ["Floor-Grinder", "250-280mm", "Dry-Method", "Magnesite-Prep"],
    techChips: [
      { label: "250 mm", cls: "bg-red-100 text-red-800" },
      { label: "Integrated extraction", cls: "bg-rose-100 text-rose-800" },
      { label: "Floor grinder", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Blastrac 1-10DS is a single-head floor grinder designed with an integrated dust control connection. Its compact 250 mm working width allows access through standard doorways. Frequently used in residential strata floor preparation for magnesite grinding as it is designed from the outset for dust-controlled operation. Compatible with Blastrac and third-party M-class HEPA extractors.",
    technicalProperties: [
      "Working width: approximately 250 mm",
      "Integrated vacuum port — designed for closed dust extraction",
      "Single-head with diamond tooling — various segment options for magnesite and concrete",
      "Electric operation — suitable for occupied floor areas",
      "Compact profile — manoeuvrable in apartment rooms and corridors",
      "Available for hire from surface preparation specialist hire companies",
    ],
    limitations: [
      "CAUTION: Magnesite grinding without HEPA extraction is a WHS violation — M or H-class extractor mandatory",
      "Edge areas require angle grinder follow-up — machine cannot reach building line",
      "Diamond segment selection critical for magnesite hardness — consult supplier for correct specification",
      "Operator PPE mandatory: P2 respirator, eye protection, hearing protection, gloves",
      "Disposal of collected magnesite dust as classified chemical waste — contact local EPA for requirements",
      "Do not grind wet unless product is rated for wet operation — check current TDS",
    ],
    procurementSources: [
      { name: "Blastrac Australia", url: "https://www.blastrac.com/en-au" },
      { name: "Surface preparation hire specialists", url: "https://www.kennards.com.au/" },
    ],
  },
  {
    fullLabel: "HTC Floor Systems",
    brandUrl: "https://www.htc-floorsystems.com/en/",
    accentColor: "#15803d",
    name: "HTC Superfloor 270EG — Edge & Floor Grinding Machine",
    descriptionLine: "Edge and floor grinding machine — 270 mm effective width, planetary head for flush edge grinding",
    productType: "Edge-grinding floor preparation machine",
    filterTags: ["Floor-Grinder", "250-280mm", "Dry-Method", "Magnesite-Prep"],
    techChips: [
      { label: "270 mm", cls: "bg-green-100 text-green-800" },
      { label: "Edge-grinding", cls: "bg-emerald-100 text-emerald-800" },
      { label: "Planetary", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "HTC Superfloor 270EG is a floor and edge grinding machine with a planetary head that grinds flush to wall faces. This capability reduces or eliminates the need for separate edge grinding with an angle grinder, which is a significant time saving on magnesite floor preparation in apartments where full-area floor grinding is required. Compatible with HTC HEPA vacuum systems for compliant dust-controlled magnesite grinding.",
    technicalProperties: [
      "Working width: approximately 270 mm",
      "Planetary grinding head — edge-grinding capability, reaches to wall face",
      "Compatible with HTC and third-party M/H-class HEPA extractors",
      "Electric operation",
      "Available in HTC hire network and specialist surface preparation hire",
      "Diamond tooling for magnesite and concrete — select appropriate bond and grit",
    ],
    limitations: [
      "CAUTION: Magnesite dust — HEPA extraction mandatory at all times",
      "Operator must be familiar with planetary grinder operation — different from single-head machines",
      "Edge grinding capability reduces but may not eliminate all angle grinder follow-up in very tight corners",
      "Full PPE mandatory: P2 respirator, safety glasses, hearing protection, gloves",
      "Magnesite waste disposal per EPA requirements",
      "Availability and hire rates vary by state — confirm with HTC or local hire company",
    ],
    procurementSources: [
      { name: "HTC Floor Systems Australia", url: "https://www.htc-floorsystems.com/en/" },
      { name: "Diamond Tool Warehouse (HTC stockist)", url: "https://www.diamondtoolwarehouse.com.au/" },
    ],
  },
  {
    fullLabel: "Festool Australia",
    brandUrl: "https://www.festool.com.au/",
    accentColor: "#78716c",
    name: "Festool CTL MIDI — M-Class HEPA Dust Extractor",
    descriptionLine: "M-class HEPA dust extractor 15 L for magnesite grinding and surface preparation — M-class filtration",
    productType: "M-class HEPA dust extractor for magnesite and construction dust",
    filterTags: ["HEPA-Vacuum", "M-Class", "Magnesite-Prep"],
    techChips: [
      { label: "M-class HEPA", cls: "bg-stone-100 text-stone-800" },
      { label: "15 L", cls: "bg-zinc-100 text-zinc-800" },
      { label: "Magnesite-safe", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Festool CTL MIDI is an M-class HEPA dust extractor rated to capture particles down to 1 µm, suitable for magnesite grinding dust extraction in conjunction with floor grinding machines and angle grinders. M-class filtration is the minimum required for magnesite grinding under current WHS regulations. Connected directly to the dust shroud port of the grinding machine, it captures magnesite dust at source before it becomes airborne. Filter cleaning and dust bag disposal must follow classified chemical waste protocols.",
    technicalProperties: [
      "Container capacity: 15 L",
      "Filtration: M-class HEPA — rated to 1 µm particle capture",
      "Complies with Safe Work Australia requirements for construction dust extraction",
      "Compatible with Festool tools and most standard 35 mm / 50 mm hose connections",
      "Automatic filter cleaning (AFC) option reduces filter blinding during grinding",
      "Weight approximately 8 kg — mobile and manoeuvrable on site",
    ],
    limitations: [
      "M-class extractor is the minimum — for large magnesite grinding projects, H-class may be preferred",
      "Do not empty dust bag into general waste — magnesite dust is a classified chemical waste",
      "Replace HEPA filter at manufacturer intervals — blocked filter reduces extraction effectiveness",
      "Ensure hose connection to grinder shroud is secure before grinding — loose connections release dust",
      "Extractor must run continuously throughout grinding — do not turn off between grinding passes",
      "Extractor alone does not eliminate all dust risk — PPE (P2 respirator, glasses) still mandatory",
    ],
    procurementSources: [
      { name: "Festool Australia", url: "https://www.festool.com.au/" },
      { name: "Total Tools", url: "https://www.totaltools.com.au/" },
      { name: "Blackwoods", url: "https://www.blackwoods.com.au/" },
    ],
  },
  {
    fullLabel: "Makita Australia",
    brandUrl: "https://www.makita.com.au/",
    accentColor: "#0f766e",
    name: "Makita VC3211MX1 — M-Class HEPA Industrial Vacuum",
    descriptionLine: "M-class HEPA industrial wet/dry vacuum 32 L for magnesite and concrete grinding dust — M-class filtration",
    productType: "M-class HEPA industrial wet/dry vacuum for construction dust",
    filterTags: ["HEPA-Vacuum", "M-Class", "Magnesite-Prep"],
    techChips: [
      { label: "M-class HEPA", cls: "bg-teal-100 text-teal-800" },
      { label: "32 L", cls: "bg-cyan-100 text-cyan-800" },
      { label: "Wet/dry", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Makita VC3211MX1 is a 32-litre M-class HEPA industrial wet/dry vacuum suitable for use in conjunction with floor grinding machines during magnesite floor preparation. Its large capacity reduces the frequency of bag changes on larger floor areas. M-class HEPA filtration meets the minimum dust capture standard required for magnesite grinding under WHS regulations. Compatible with standard vacuum hoses and most grinding machine dust shroud connections.",
    technicalProperties: [
      "Container capacity: 32 L (larger than typical 15–20 L trade vacuums)",
      "Filtration: M-class HEPA — minimum 1 µm particle capture efficiency",
      "Wet/dry capability — can collect wet slurry if wet grinding method is used",
      "Standard hose connections compatible with most floor grinder shrouds",
      "Auto-clean filter function on select models",
      "Weight approximately 15 kg — on-wheels for site mobility",
    ],
    limitations: [
      "M-class minimum — check current WHS guidance; H-class may be required for certain magnesite project scales",
      "Large capacity means heavier bag when full — handle with care, use bin liners for chemical waste disposal",
      "Wet/dry vacuum — if used wet, ensure proper drainage and decontamination of machine after use",
      "P2 respirator, safety glasses, and gloves mandatory even with HEPA vacuum extraction",
      "Filter maintenance is critical — replace per manufacturer schedule",
      "Consult Safe Work Australia Code of Practice: Managing the Risks of Silica Dust and construction dust",
    ],
    procurementSources: [
      { name: "Makita Australia", url: "https://www.makita.com.au/" },
      { name: "Blackwoods", url: "https://www.blackwoods.com.au/" },
      { name: "Total Tools", url: "https://www.totaltools.com.au/" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "Floor-Grinder", label: "Floor grinder" },
  { tag: "HEPA-Vacuum", label: "HEPA vacuum" },
  { tag: "M-Class", label: "M-class" },
  { tag: "H-Class", label: "H-class" },
  { tag: "250-280mm", label: "250–280 mm" },
  { tag: "Dry-Method", label: "Dry method" },
  { tag: "Wet-Method", label: "Wet method" },
  { tag: "Magnesite-Prep", label: "Magnesite prep" },
];

const TECH_INFO = {
  typicalApplications: [
    "Grinding encapsulated magnesite floors to achieve minimum CSP 2 surface profile before primer",
    "Removing laitance, adhesive residues, and surface contamination from magnesite and concrete",
    "Surface preparation before moisture suppression primer and self-levelling underlayment application",
    "Dust extraction during all grinding operations on magnesite — mandatory WHS requirement",
    "Edge and perimeter grinding where main floor grinder cannot reach",
  ],
  selectionCriteria: [
    "Floor grinder (Husqvarna PG 280, Blastrac 1-10DS): for main floor area grinding — must connect to HEPA extractor",
    "Edge-capable grinder (HTC Superfloor 270EG): reduces angle grinder edge follow-up in apartments",
    "M-class HEPA vacuum: minimum dust extraction requirement for magnesite grinding",
    "H-class vacuum: for projects with very large magnesite grinding areas or in enclosed spaces",
    "Extractor capacity: larger capacity (32 L+) reduces bag change frequency on large floor areas",
    "Wet grinding option: reduces dust generation but requires water management and slurry disposal",
  ],
  limitations: [
    "CRITICAL: Magnesite dust contains magnesium chloride and is classified as a respiratory hazard — dry grinding without HEPA extraction is a WHS violation and must never occur",
    "All collected magnesite dust is classified chemical waste — must not be disposed of in general waste",
    "Floor grinders cannot reach right into corners — angle grinder with appropriate disc is required for edge areas",
    "Floor grinder hire machines vary — always confirm diamond segment compatibility for magnesite hardness before commencing work",
    "No grinding equipment compensates for delaminated or unstable magnesite — remove loose areas before grinding",
  ],
  standardsNotes: [
    "ICRI 310.2R: CSP 2 minimum surface profile required before moisture primer on magnesite",
    "Safe Work Australia: Code of Practice — Managing the Risks of Silica Dust (2020)",
    "WHS Regulations: respirable crystalline silica TWA 0.05 mg/m³ as at 2024",
    "AS/NZS 1716: respiratory protective devices — P2 minimum for magnesite grinding",
    "EPA guidance (state-specific): disposal requirements for magnesite dust as a chemical waste",
  ],
  suitableDefects: [
    "Magnesite flooring deterioration — all grinding and surface preparation",
    "Adhesive-contaminated concrete floor slabs before levelling system application",
    "Laitance removal on concrete slab surfaces before floor primer",
    "Paint-coated floor surfaces requiring stripping before floor levelling",
  ],
  typicalSubstrates: [
    "Encapsulated magnesite flooring in Class 2 strata apartments (1950s–1980s construction)",
    "Concrete floor slabs with adhesive, paint, or contamination requiring removal",
    "Post-grinding concrete and magnesite surfaces requiring extraction during preparation",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "Husqvarna PG 280", brand: "Husqvarna", type: "Floor grinder", width: "280 mm", extraction: "HEPA connection" },
  { product: "Blastrac 1-10DS", brand: "Blastrac", type: "Floor grinder", width: "250 mm", extraction: "Integrated port" },
  { product: "HTC Superfloor 270EG", brand: "HTC", type: "Edge + floor grinder", width: "270 mm", extraction: "HEPA connection" },
  { product: "Festool CTL MIDI", brand: "Festool", type: "M-class extractor", width: "—", extraction: "15 L, M-class HEPA" },
  { product: "Makita VC3211MX1", brand: "Makita", type: "M-class extractor", width: "—", extraction: "32 L, M-class HEPA" },
];

export function FloorGrindingPrepIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
          <BookOpen size={16} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">Floor grinding & preparation for magnesite remediation</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">Floor grinding machines and M-class HEPA dust extractors for surface preparation of magnesite and concrete before primer and self-levelling underlayment. Read more ↓</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>
            Floor grinding is a mandatory first step in all magnesite flooring remediation projects. The purpose is to achieve a minimum CSP 2 surface profile (per ICRI 310.2R) on the magnesite or concrete surface, remove laitance, open pores, and eliminate any surface contaminants — adhesive residues, paints, or efflorescence — before moisture primer and self-levelling underlayment are applied. Without adequate surface preparation, primers cannot penetrate or bond, and self-levelling compounds delaminate.
          </p>
          <p>
            CAUTION — magnesite dust is a serious respiratory and chemical hazard. Magnesium oxychloride cement (magnesite) contains soluble chloride salts. Grinding generates airborne dust that is classified as a chemical hazard under WHS regulations. All magnesite grinding must be performed with M-class or H-class HEPA vacuum extraction connected directly to the grinding machine dust shroud. Dry grinding without dust extraction is prohibited. Operators must wear P2 respirators (minimum), safety glasses, hearing protection, and gloves throughout the operation. Collected magnesite dust must be disposed of as chemical waste per state EPA requirements.
          </p>
          <p>
            For whole-floor preparation in apartments and strata units, single-head or planetary floor grinding machines (Husqvarna PG 280, Blastrac 1-10DS, HTC Superfloor 270EG) are the appropriate tools. These are typically hired from specialist surface preparation equipment hire companies. The machine must be fitted with diamond grinding segments suitable for the hardness of the magnesite (soft to medium bond) and connected to an M or H-class HEPA extractor throughout the operation.
          </p>
          <p>
            Wall perimeters and corners not reachable by the floor grinder must be completed with an angle grinder fitted with a diamond grinding disc — also with vacuum extraction. After grinding, the entire floor is vacuumed clean, moisture-tested (ASTM F2170), and the surface profile assessed before primer is applied.
          </p>
        </div>
      )}
    </div>
  );
}

export function FloorGrindingPrepProductSection() {
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
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Width</th>
                <th className="px-4 py-3 text-left font-bold text-slate-600 whitespace-nowrap">Extraction</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 bg-inherit px-5 py-3 font-semibold text-slate-800 border-r border-slate-200 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600">{row.width}</td>
                  <td className="px-4 py-3 text-slate-600">{row.extraction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
