"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "FC-sheet"
  | "Non-combustible"
  | "NCC-2022"
  | "AS-1530.1"
  | "Primed"
  | "Smooth"
  | "Coastal"
  | "Direct-fix"
  | "Subframe-fix"
  | "James-Hardie"
  | "CSR-Cemintel"
  | "BGC";

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
  procurementSources: { name: string; url: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "James Hardie Australia",
    brandUrl: "https://www.jameshardie.com.au",
    tdsUrl: "https://www.jameshardie.com.au/products/scyon/linea",
    accentColor: "#e2003a",
    name: "Scyon Linea Weatherboard — Compressed FC",
    descriptionLine: "Compressed fibre cement weatherboard — 180 mm and 225 mm cover widths — bevelled shadow-line profile — non-combustible NCC 2022 — primed — James Hardie national supply",
    productType: "FC weatherboard — horizontal cladding — residential and low-rise",
    filterTags: ["FC-sheet", "Non-combustible", "NCC-2022", "AS-1530.1", "Primed", "Smooth", "Coastal", "Direct-fix", "James-Hardie"],
    techChips: [
      { label: "Non-combustible", cls: "bg-red-100 text-red-800" },
      { label: "NCC 2022 compliant", cls: "bg-green-100 text-green-700" },
      { label: "Primed", cls: "bg-slate-100 text-slate-700" },
      { label: "Coastal rated", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Scyon Linea from James Hardie is a compressed fibre cement weatherboard with a smooth face and bevelled profile that creates a distinct shadow line between each course. Available in 180 mm and 225 mm cover widths. Non-combustible Group 1 under AS 1530.1 and NCC 2022 compliant. Fixed horizontally with a secret-nailing detail or face-fixed with stainless screws per the James Hardie installation guide. Primed and ready for painting with a warranted James Hardie paint system. Widely used on residential and low-rise Class 1 and Class 2 buildings. James Hardie's national supply network makes Scyon Linea one of the most accessible non-combustible weatherboard systems in Australia.",
    technicalProperties: [
      "Non-combustible — AS 1530.1 Group 1 — NCC 2022 compliant for external walls",
      "Cover widths: 180 mm and 225 mm — bevelled profile creates horizontal shadow-line coursing",
      "Length: 3600 mm standard — confirm current stock from James Hardie",
      "Thickness: 11 mm nominal — confirm from current TDS",
      "Primed — warranty with James Hardie-specified paint system — acrylic topcoat required",
      "Coastal rated — cement composition resists salt spray — stainless fixings mandatory",
    ],
    limitations: [
      "Horizontal application only — Scyon Linea is a weatherboard profile, not a flat sheet for vertical or panel layouts",
      "Secret nailing requires precise installation at joints and corner details — see James Hardie installation guide",
      "Site painting required — primed face must be topcoated within manufacturer's recommended timeframe",
      "Not suited to highly articulated facades, concealed-fix systems, or large-panel rainscreen layouts",
      "Stainless steel fixings mandatory — galvanised fasteners corrode in the alkaline FC environment and stain face",
    ],
    procurementSources: [
      { name: "James Hardie — Scyon Linea", url: "https://www.jameshardie.com.au" },
      { name: "Bunnings Trade — Scyon Linea", url: "https://www.bunnings.com.au" },
      { name: "James Hardie Trade Centres — national", url: "https://www.jameshardie.com.au" },
    ],
  },
  {
    fullLabel: "James Hardie Australia",
    brandUrl: "https://www.jameshardie.com.au",
    tdsUrl: "https://www.jameshardie.com.au/products/hardieflex",
    accentColor: "#0369a1",
    name: "HardieFlex — Flat Compressed FC Sheet",
    descriptionLine: "Standard compressed FC flat sheet — 4.5 mm to 9 mm — non-combustible — versatile fix options — Australia's most widely used non-combustible sheet — James Hardie national supply",
    productType: "Compressed FC flat sheet — general facade cladding and substrate",
    filterTags: ["FC-sheet", "Non-combustible", "NCC-2022", "AS-1530.1", "Primed", "Smooth", "Coastal", "Direct-fix", "Subframe-fix", "James-Hardie"],
    techChips: [
      { label: "Non-combustible", cls: "bg-sky-100 text-sky-800" },
      { label: "NCC 2022 compliant", cls: "bg-green-100 text-green-700" },
      { label: "Multiple thicknesses", cls: "bg-slate-100 text-slate-700" },
      { label: "Most versatile", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription:
      "HardieFlex is James Hardie's standard compressed fibre cement flat sheet — the most widely used FC sheet in Australia for facade substrates, wet area lining, and general cladding. Available in 4.5 mm, 6 mm, 7.5 mm, and 9 mm thicknesses in 2400 × 1200 mm and 3000 × 1200 mm. Non-combustible Group 1 under AS 1530.1 and NCC 2022 compliant. Primed and ready for painting or tiling. Used as a facade substrate behind tiles, as flat-face external cladding, and as sheathing behind rainscreen cladding. The 9 mm sheet is the standard specification for external wall cladding on Class 2 buildings. All fixings must be stainless steel per the James Hardie installation guide.",
    technicalProperties: [
      "Non-combustible — AS 1530.1 Group 1 — NCC 2022 compliant",
      "Thickness range: 4.5 mm, 6 mm, 7.5 mm, 9 mm — select for application span and loading",
      "Sheet sizes: 2400 × 1200 mm and 3000 × 1200 mm — confirm current stock",
      "Primed face — paintable or tileable substrate depending on application",
      "Fix options: direct-fix to framing, subframe, or adhesive behind tile",
      "Coastal rated — stainless fixings mandatory for all external applications",
    ],
    limitations: [
      "Joints between sheets require stopping with flexible FC filler and primer — do not leave butt joints untreated before painting",
      "Stainless steel fixings mandatory — galvanised, mild steel, or zinc-plated fasteners rust-stain the face",
      "Thinner sheets (4.5 mm, 6 mm) not suitable for external wall cladding — minimum 9 mm for cladding",
      "Flat sheet reveals subframe straightness defects — subframe must be plumb and true before sheeting",
      "Not structural — provides no in-plane racking resistance; structural bracing system required separately",
    ],
    procurementSources: [
      { name: "James Hardie — HardieFlex", url: "https://www.jameshardie.com.au" },
      { name: "Bunnings Trade — HardieFlex sheets", url: "https://www.bunnings.com.au" },
      { name: "James Hardie Trade Centres — national", url: "https://www.jameshardie.com.au" },
    ],
  },
  {
    fullLabel: "CSR Cemintel Australia",
    brandUrl: "https://www.csr.com.au/cemintel",
    accentColor: "#7c3aed",
    name: "Cemintel Barestone — Compressed FC Sheet",
    descriptionLine: "Compressed FC flat sheet — CSR Cemintel — non-combustible NCC 2022 — primed smooth face — compatible with Cemintel joint treatment range — CSR national supply",
    productType: "Compressed FC flat sheet — facade and substrate — CSR Cemintel",
    filterTags: ["FC-sheet", "Non-combustible", "NCC-2022", "AS-1530.1", "Primed", "Smooth", "Coastal", "Direct-fix", "Subframe-fix", "CSR-Cemintel"],
    techChips: [
      { label: "Non-combustible", cls: "bg-purple-100 text-purple-800" },
      { label: "NCC 2022 compliant", cls: "bg-green-100 text-green-700" },
      { label: "CSR Cemintel", cls: "bg-slate-100 text-slate-700" },
      { label: "Smooth face", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Cemintel Barestone is CSR's compressed fibre cement flat sheet for external cladding, facade substrates, and wet area applications. Non-combustible per AS 1530.1 Group 1 and NCC 2022 compliant. Available in 9 mm thickness for external cladding in 2400 × 1200 mm and 3000 × 1200 mm sheets. Primed smooth face ready for painting or tiling. CSR Cemintel provides a compatible joint treatment system — caulking compounds, fillers, and corner bead — specifically developed for use with Barestone and their panel range. The CSR supply network provides strong availability through BuildersChoice and trade merchants nationally. Lower cost than large-format architectural panels where a flat-face painted finish is acceptable.",
    technicalProperties: [
      "Non-combustible — AS 1530.1 Group 1 — NCC 2022 compliant for external walls",
      "Thickness: 6 mm and 9 mm for external applications — 9 mm minimum for external cladding",
      "Sheet sizes: 2400 × 1200 mm and 3000 × 1200 mm",
      "Primed smooth face — compatible with exterior acrylic paint systems",
      "CSR Cemintel compatible joint treatment range — stopping, filler, and corner bead products",
      "Coastal rated — stainless fixings mandatory for all coastal and external applications",
    ],
    limitations: [
      "Joint stopping mandatory between sheets before painting — confirm compatible CSR Cemintel stopping compound",
      "Stainless steel fixings mandatory — standard galvanised fixings corrode and stain face",
      "Cemintel joint treatment system recommended — third-party fillers may have different movement tolerance and may not be warranted",
      "9 mm minimum for external cladding — 6 mm only for substrates and internal lining",
      "Primed surface must be topcoated within manufacturer's timeframe — do not leave bare primed sheets exposed on site",
    ],
    procurementSources: [
      { name: "CSR Cemintel — Product Range", url: "https://www.csr.com.au/cemintel" },
      { name: "CSR BuildersChoice Trade — national", url: "https://www.csr.com.au" },
      { name: "Cemintel local distributor — confirm availability", url: "https://www.csr.com.au/cemintel" },
    ],
  },
  {
    fullLabel: "BGC Fibre Cement Australia",
    brandUrl: "https://www.bgcfibrecement.com.au",
    accentColor: "#b45309",
    name: "BGC FC Compressed Sheet — External Cladding Grade",
    descriptionLine: "BGC compressed FC flat sheet — non-combustible NCC 2022 — primed — competitive pricing — strong WA supply with growing eastern states distribution",
    productType: "Compressed FC flat sheet — external cladding — BGC Fibre Cement",
    filterTags: ["FC-sheet", "Non-combustible", "NCC-2022", "AS-1530.1", "Primed", "Smooth", "Coastal", "Direct-fix", "Subframe-fix", "BGC"],
    techChips: [
      { label: "Non-combustible", cls: "bg-orange-100 text-orange-800" },
      { label: "NCC 2022 compliant", cls: "bg-green-100 text-green-700" },
      { label: "BGC brand", cls: "bg-slate-100 text-slate-700" },
      { label: "Competitive price", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription:
      "BGC Fibre Cement is an Australian manufacturer of compressed fibre cement flat sheets for external wall cladding, substrate, and internal lining. Their compressed flat sheet range is non-combustible per AS 1530.1 Group 1 and NCC 2022 compliant. Primed smooth face suitable for painting. BGC has strong supply in Western Australia through trade merchants with growing national distribution. Competitively priced versus the James Hardie and CSR ranges, making BGC an attractive option for cost-sensitive Class 2 remedial and new-construction projects. Installation requirements are consistent with other FC flat sheets — stainless fixings mandatory, joint stopping required, minimum 9 mm for external cladding. Confirm current product grades, certifications, and availability with BGC before specifying.",
    technicalProperties: [
      "Non-combustible — AS 1530.1 Group 1 — NCC 2022 compliant",
      "Thickness: 9 mm for external cladding — confirm from current BGC product guide",
      "Sheet sizes: 2400 × 1200 mm — confirm current stock sizes with BGC distributor",
      "Primed face — compatible with standard exterior acrylic paint systems",
      "Competitive pricing compared to James Hardie and CSR equivalents",
      "Coastal rated with stainless fixings — confirm with BGC technical for extreme marine zones",
    ],
    limitations: [
      "BGC distribution strongest in Western Australia — confirm availability in eastern states before specifying on large projects",
      "Stainless steel fixings mandatory — consistent with all FC sheet products",
      "Joint stopping mandatory before painting — confirm compatible stopping compound from BGC",
      "Confirm current product NCC compliance documentation with BGC before specifying on Class 2 or higher",
      "Technical support network less established than James Hardie or CSR in eastern states",
    ],
    procurementSources: [
      { name: "BGC Fibre Cement — Product Range", url: "https://www.bgcfibrecement.com.au" },
      { name: "BGC distributors — confirm national availability", url: "https://www.bgcfibrecement.com.au" },
      { name: "Trade builders merchants — WA and national", url: "https://www.bgcfibrecement.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "FC-sheet", label: "FC sheet" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "NCC-2022", label: "NCC 2022" },
  { id: "Primed", label: "Primed / paintable" },
  { id: "Smooth", label: "Smooth face" },
  { id: "Coastal", label: "Coastal rated" },
  { id: "Direct-fix", label: "Direct-fix" },
  { id: "Subframe-fix", label: "Subframe-fix" },
  { id: "James-Hardie", label: "James Hardie" },
  { id: "CSR-Cemintel", label: "CSR Cemintel" },
  { id: "BGC", label: "BGC" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; profile: string; thickness: string;
  ncc2022: string; coastal: string; fixings: string; primaryUse: string;
}[] = [
  { product: "Scyon Linea Weatherboard", brand: "James Hardie", profile: "Bevelled weatherboard", thickness: "11 mm", ncc2022: "Compliant", coastal: "Yes", fixings: "SS nails/screws", primaryUse: "Horizontal coursing — residential/low-rise" },
  { product: "HardieFlex Sheet", brand: "James Hardie", profile: "Flat sheet", thickness: "4.5–9 mm", ncc2022: "Compliant", coastal: "Yes", fixings: "SS screws", primaryUse: "Most versatile — cladding and substrate" },
  { product: "Cemintel Barestone", brand: "CSR Cemintel", profile: "Flat sheet", thickness: "6–9 mm", ncc2022: "Compliant", coastal: "Yes", fixings: "SS screws", primaryUse: "CSR ecosystem — cladding and substrate" },
  { product: "BGC FC Sheet", brand: "BGC", profile: "Flat sheet", thickness: "9 mm", ncc2022: "Compliant", coastal: "Yes (SS fix)", fixings: "SS screws", primaryUse: "Competitive pricing — WA strong, national growing" },
];

const TECH_INFO = {
  typicalApplications: [
    "External wall cladding on Class 1 and Class 2 buildings — primed and painted facade finish",
    "Replacement of combustible cladding on low-rise buildings requiring non-combustible sheet",
    "Facade substrate behind tiles, texture coatings, or external renders",
    "Soffit lining — non-combustible and moisture-resistant under eaves and balconies",
    "Wet area and bathroom lining — 6 mm and 9 mm FC sheet as tile substrate",
  ],
  selectionCriteria: [
    "Select 9 mm minimum for external facade cladding — thinner sheets for substrate and internal lining only",
    "Select weatherboard profile (Scyon Linea) where horizontal coursing with shadow lines is the design intent",
    "Select flat sheet where a flush or fine-joint facade appearance is required",
    "Confirm AS 1530.1 Group 1 for the specific product and thickness — not all FC is classified non-combustible at all thicknesses",
    "Use stainless steel fixings in all coastal and external applications without exception",
    "Joint stopping is mandatory before painting — include in specification and confirm compatible compound with manufacturer",
  ],
  limitations: [
    "Compressed FC sheet requires joint stopping before painting — unfinished joints allow moisture ingress and are visible",
    "Not structural — provides no in-plane racking resistance — structural bracing required separately",
    "Must not be installed below 6 mm clearance from soil or landscaping — moisture wicking and biological growth occur at ground contact",
    "Not compatible with oil-based paints — use acrylic paint systems only — confirm with manufacturer TDS",
    "Galvanised and mild steel fixings cause rust staining — specify and check stainless steel fixings on all deliveries",
  ],
  standardsNotes: [
    "AS 1530.1 — Non-combustibility test — Group 1 classification required for NCC 2022",
    "NCC 2022 Volume One — C2D3 — external walls above ground floor of Class 2–9 buildings must use non-combustible cladding",
    "AS/NZS 2908.2 — Cellulose cement products — flat sheet classification",
    "James Hardie / Cemintel / BGC installation guides — fixing pattern, joint treatment, paint system warranty",
    "NATSPEC — Section 0263 — Sheet wall cladding — confirm applicable worksection for specification",
  ],
  suitableDefects: [
    "Combustible ACP or EPS-backed render cladding requiring NCC 2022 compliant replacement on lower-rise buildings",
    "Failed or delaminated facade substrate behind tiles on elevated facades — non-combustible replacement required",
    "Deteriorated or rotted timber weatherboard requiring non-combustible like-for-like replacement",
    "Soffit lining replacement after fire, water damage, or end of service life",
    "Partial facade sheet replacement where panel damage is isolated to a defined area",
  ],
  typicalSubstrates: [
    "Timber stud framing — minimum 70 × 35 mm F5 or better — confirm from installation guide for sheet thickness and fixing pattern",
    "Steel stud framing — confirm fixing pattern and stud gauge with manufacturer",
    "Aluminium or steel subframe — minimum 9 mm sheet on subframe for rainscreen",
    "Over existing masonry — direct-fix with mechanical fasteners into masonry — confirm pull-out capacity",
    "Over existing FC or plywood substrate — sheet-over-sheet where original substrate is confirmed sound and level",
  ],
};

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" /> : <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Show less ↑" : `+${extra} more ↓`}
        </button>
      )}
    </div>
  );
}

function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name}<ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : <span className="font-semibold text-slate-600">{src.name}</span>}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>)}
            </div>
          )}
        </>
      )}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

export function FCSheetIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are compressed fibre cement sheets?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Compressed fibre cement (FC) sheets are non-combustible cladding and substrate products widely used on Australian buildings. They are the most common non-combustible sheet replacement for combustible cladding on Class 2 buildings where large-format architectural panels are not required or not appropriate.</p>
        {expanded && (
          <>
            <p>FC sheets are manufactured by compressing a slurry of Portland cement, silica sand, and cellulose fibre under heat and pressure. The compressed matrix is dense, dimensionally stable, and non-combustible — classified Group 1 under AS 1530.1, meeting the NCC 2022 external wall non-combustibility requirement for Class 2–9 buildings.</p>
            <p>Supplied factory-primed, FC sheets must be coated with a compatible exterior acrylic paint system within the manufacturer's specified timeframe. Joint stopping between sheets is mandatory before painting. All fixings must be stainless steel — galvanised fasteners corrode in the alkaline cement environment and cause rust staining on the face. The 9 mm sheet is the standard external cladding grade; thinner sheets are for substrates and internal lining only.</p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div>
        <h3 className="text-sm font-extrabold text-sky-950">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">
            {style === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}
            {style === "warn" && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}
            {style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FCSheetProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };
  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
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
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">4 products — compressed fibre cement sheets — scroll to view all</p>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all</span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronLeft size={16} /></button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
          {visibleProducts.map((product) => (
            <div key={product.name} className="flex-none" style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeft: `4px solid ${product.accentColor}` }}>
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">{product.fullLabel}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  <CollapsibleCardDetails text={product.descriptionLine} chips={product.techChips} />
                </div>
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>
                <div className="space-y-3 px-5 py-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <CollapsibleList items={product.technicalProperties} icon="check" limit={3} />
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <CollapsibleList items={product.limitations} icon="x" limit={3} />
                  </div>
                </div>
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={product.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of compressed FC sheet products. Confirm all selections against the current manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Profile</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">NCC 2022</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Fixings</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.profile}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.ncc2022}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.fixings}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.primaryUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
