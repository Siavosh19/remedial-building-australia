"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "FC-panel"
  | "Large-format"
  | "Non-combustible"
  | "NCC-2022"
  | "AS-1530.1"
  | "Prefinished"
  | "Primed"
  | "Through-colour"
  | "Grooved"
  | "Coastal"
  | "Concealed-fix"
  | "James-Hardie"
  | "Equitone"
  | "CSR-Cemintel";

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
    fullLabel: "Etex / Equitone Australia",
    brandUrl: "https://www.equitone.com/en-au",
    tdsUrl: "https://www.equitone.com/en-au/products/tectiva/",
    accentColor: "#e2003a",
    name: "Equitone Tectiva — Through-Colour FC Panel",
    descriptionLine: "Premium through-colour fibre cement architectural panel — visible natural aggregates, integral pigmentation, no coating required — concealed-fix capable — non-combustible NCC 2022 compliant",
    productType: "Through-colour fibre cement panel — large-format architectural cladding",
    filterTags: ["FC-panel", "Large-format", "Non-combustible", "NCC-2022", "AS-1530.1", "Prefinished", "Through-colour", "Coastal", "Concealed-fix", "Equitone"],
    techChips: [
      { label: "Through-colour", cls: "bg-red-100 text-red-800" },
      { label: "Non-combustible", cls: "bg-amber-100 text-amber-700" },
      { label: "Concealed-fix", cls: "bg-slate-100 text-slate-700" },
      { label: "NCC 2022 compliant", cls: "bg-green-100 text-green-700" },
      { label: "Coastal rated", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Equitone Tectiva is a large-format through-colour fibre cement panel with a smooth homogeneous face and visible natural aggregates. The colour extends throughout the full panel depth — a chip or cut edge reveals the same tone as the face, eliminating the visible white substrate of painted panels. Non-combustible and classified Group 1 under AS 1530.1. Available in large-format sheets up to 3100 × 1250 mm, suitable for concealed-fix subframe systems. Equitone Tectiva is widely specified in contemporary facade remediation where a premium natural-texture non-combustible panel is required. The through-colour appearance changes subtly with light and moisture exposure, providing a natural finish that ages gracefully. Australian distribution is through Etex Australia — confirm lead times as panels are manufactured offshore.",
    technicalProperties: [
      "Through-colour mineral pigmentation — colour integral to panel depth, no coating to maintain or repaint",
      "Non-combustible — AS 1530.1 Group 1 — NCC 2022 compliant for all building heights and classes",
      "Large format: up to 3100 × 1250 mm — fewer joints, cleaner facade appearance",
      "Thickness: 8 mm and 12 mm — confirm with Equitone Australia for current stock sizes",
      "Concealed-fix system available — no visible screw heads on face",
      "Coastal rated — cement composition resistant to salt spray without special treatment",
    ],
    limitations: [
      "Premium cost — significantly more expensive than painted compressed FC sheet or primed FC panel",
      "Requires specialist concealed-fix subframe — not compatible with standard direct-fix to stud framing",
      "Colour range limited to natural mineral tones — not available in arbitrary RAL or custom colours",
      "Heavy: 8 mm = approximately 14 kg/m², 12 mm = approximately 20 kg/m² — subframe must be engineered for dead load",
      "Long lead times for non-stock colours and sizes — confirm with Etex Australia before committing to programme",
    ],
    procurementSources: [
      { name: "Etex Australia — Equitone distributor", url: "https://www.equitone.com/en-au" },
      { name: "Equitone AU — find a distributor", url: "https://www.equitone.com/en-au" },
      { name: "Facade specialists — confirm local distributor", url: "https://www.equitone.com/en-au" },
    ],
  },
  {
    fullLabel: "CSR Cemintel Australia",
    brandUrl: "https://www.csr.com.au/cemintel",
    tdsUrl: "https://www.csr.com.au/cemintel/products",
    accentColor: "#0369a1",
    name: "Cemintel Territory Panel — Large-Format Primed FC",
    descriptionLine: "Large-format compressed fibre cement panel — primed for painting, smooth face, up to 2700 × 1200 mm — non-combustible NCC 2022 — CSR national supply network",
    productType: "Large-format primed FC panel — rainscreen cladding — site-painted finish",
    filterTags: ["FC-panel", "Large-format", "Non-combustible", "NCC-2022", "AS-1530.1", "Primed", "Coastal", "CSR-Cemintel"],
    techChips: [
      { label: "Non-combustible", cls: "bg-sky-100 text-sky-800" },
      { label: "NCC 2022 compliant", cls: "bg-green-100 text-green-700" },
      { label: "Primed / paintable", cls: "bg-slate-100 text-slate-700" },
      { label: "CSR backed", cls: "bg-amber-100 text-amber-700" },
    ],
    systemDescription:
      "Cemintel Territory is a large-format compressed fibre cement panel supplied factory-primed, ready for site painting. Available in sheets up to 2700 × 1200 mm with a smooth flat face. Non-combustible per AS 1530.1 Group 1 and NCC 2022 compliant for all building heights. Suited to rainscreen cladding applications over a drained and ventilated cavity on aluminium or steel subframe. The primed surface accepts most exterior acrylic paint systems — confirm paint system compatibility with the Cemintel installation guide before specifying. CSR Cemintel has a well-established Australian supply and technical support network, including joint treatment systems and installation guidance specific to their panel range. Lower cost than through-colour panels where a site-painted finish is acceptable.",
    technicalProperties: [
      "Non-combustible — AS 1530.1 Group 1 — NCC 2022 compliant for external walls of all Classes",
      "Sheet size: up to 2700 × 1200 mm — approximately 3.24 m² per sheet",
      "Thickness: 9 mm nominal — confirm from current Cemintel product guide",
      "Factory primed — compatible with exterior acrylic paint systems — confirm paint system with Cemintel TDS",
      "Smooth face — suitable for fine-joint or expressed-joint rainscreen appearance",
      "CSR Cemintel joint treatment and flashing systems available to match",
    ],
    limitations: [
      "Site painting required — colour quality entirely dependent on paint specification and applicator",
      "Factory primer requires careful protection during transport and installation — site damage exposes unprimed substrate",
      "Joint treatment between panels requires Cemintel-specified detailing — non-standard joint treatments may void warranty",
      "Heavier than ACP — dead load design check required for subframe",
      "Primed surface not suitable for exposure without topcoat — must be painted within manufacturer's recommended window",
    ],
    procurementSources: [
      { name: "CSR Cemintel — Product Range", url: "https://www.csr.com.au/cemintel" },
      { name: "CSR BuildersChoice Trade — national", url: "https://www.csr.com.au" },
      { name: "Cemintel technical — confirm local distributor", url: "https://www.csr.com.au/cemintel" },
    ],
  },
  {
    fullLabel: "James Hardie Australia",
    brandUrl: "https://www.jameshardie.com.au",
    tdsUrl: "https://www.jameshardie.com.au/products/scyon",
    accentColor: "#7c3aed",
    name: "Scyon Axon Panel — Grooved FC Architectural Panel",
    descriptionLine: "Compressed FC panel with vertical groove profile at 133 mm or 200 mm centres — architectural appearance at mid-range cost — NCC 2022 non-combustible — James Hardie national supply",
    productType: "Grooved FC panel — architectural facade — primed for painting",
    filterTags: ["FC-panel", "Non-combustible", "NCC-2022", "AS-1530.1", "Primed", "Grooved", "Coastal", "James-Hardie"],
    techChips: [
      { label: "Grooved profile", cls: "bg-purple-100 text-purple-800" },
      { label: "Non-combustible", cls: "bg-amber-100 text-amber-700" },
      { label: "NCC 2022 compliant", cls: "bg-green-100 text-green-700" },
      { label: "James Hardie", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Scyon Axon Panels from James Hardie are compressed fibre cement sheets with a machined vertical groove profile at 133 mm or 200 mm centres, providing an architectural facade appearance at a lower cost than premium through-colour or aluminium panels. The groove pattern articulates the facade surface, creates defined shadow lines, and conceals minor dimensional variation between adjacent panels — a practical advantage in remediation where subframe tolerance may vary. Primed and ready for painting with a James Hardie-warranted paint system. Non-combustible per AS 1530.1 and NCC 2022 compliant for external walls. James Hardie has the strongest national supply network of any fibre cement manufacturer in Australia — panels are widely stocked by trade suppliers and building merchants.",
    technicalProperties: [
      "Non-combustible — AS 1530.1 Group 1 — NCC 2022 compliant for external walls of all Classes",
      "Groove profile at 133 mm or 200 mm centres — groove pattern must be specified at design stage",
      "Sheet size: typically 2700 × 1200 mm — confirm with James Hardie for current stock sizes",
      "Thickness: 9 mm nominal — confirm from current Scyon Axon TDS",
      "Factory primed — warranty available with James Hardie-specified paint system",
      "National supply: strongest trade and builder merchant network in Australia",
    ],
    limitations: [
      "Groove pitch fixed at 133 mm or 200 mm — not available in arbitrary profile spacing",
      "Groove pattern alignment at panel joints requires precise subframe layout — off-module joints are visible",
      "Site painting required — as with all primed FC panels",
      "Heavier than ACP — dead load consideration for subframe engineering",
      "Groove profile retains more moisture at the base groove than smooth face — drainage detail at base important",
    ],
    procurementSources: [
      { name: "James Hardie — Scyon Product Range", url: "https://www.jameshardie.com.au" },
      { name: "Bunnings Trade — Scyon panels", url: "https://www.bunnings.com.au" },
      { name: "James Hardie Trade Centres — national", url: "https://www.jameshardie.com.au" },
    ],
  },
  {
    fullLabel: "Etex / Equitone Australia",
    brandUrl: "https://www.equitone.com/en-au",
    tdsUrl: "https://www.equitone.com/en-au/products/natura/",
    accentColor: "#b45309",
    name: "Equitone Natura — Exposed Aggregate Through-Colour FC",
    descriptionLine: "Raw exposed-aggregate through-colour fibre cement panel — uncoated natural finish — visible cement and aggregate texture — non-combustible NCC 2022 — high-end architectural facade",
    productType: "Exposed-aggregate through-colour FC panel — uncoated natural finish",
    filterTags: ["FC-panel", "Large-format", "Non-combustible", "NCC-2022", "AS-1530.1", "Prefinished", "Through-colour", "Coastal", "Concealed-fix", "Equitone"],
    techChips: [
      { label: "Exposed aggregate", cls: "bg-orange-100 text-orange-800" },
      { label: "No coating", cls: "bg-slate-100 text-slate-700" },
      { label: "Non-combustible", cls: "bg-amber-100 text-amber-700" },
      { label: "Concealed-fix", cls: "bg-sky-100 text-sky-800" },
    ],
    systemDescription:
      "Equitone Natura is a raw, uncoated through-colour fibre cement panel with an exposed aggregate face. The manufacturing process removes the smooth surface layer to reveal the natural cement binder and aggregates underneath, giving a raw, tactile, and architecturally distinctive appearance that contrasts strongly with painted or coated panels. Like Tectiva, the colour is integral — no surface coating is applied or required. Non-combustible and NCC 2022 compliant. The uncoated surface absorbs water and darkens when wet, then dries back to the original colour — this breathing behaviour must be understood and accepted before specification as it is a feature, not a defect. Available in large formats up to 3100 × 1250 mm through Etex Australia.",
    technicalProperties: [
      "Uncoated raw exposed-aggregate face — no painting or surface coating required",
      "Through-colour — colour integral to full depth of panel, not a surface treatment",
      "Non-combustible — AS 1530.1 Group 1 — NCC 2022 compliant for all building Classes and heights",
      "Absorbs water and darkens when wet — returns to dry colour when dry; this is a design feature",
      "Large format: up to 3100 × 1250 mm — confirm with Etex Australia",
      "Concealed-fix system available — no visible fasteners on face",
    ],
    limitations: [
      "Wet/dry colour variation must be accepted — not appropriate where consistent appearance in rain is required",
      "Premium cost — higher than Tectiva and significantly above painted FC sheet",
      "Colour range limited to natural raw cement tones — grey and off-white palette only",
      "Long lead times — manufactured offshore and imported through Etex Australia",
      "Specialist handling required — raw face scratches more easily than smooth-face panels",
    ],
    procurementSources: [
      { name: "Etex Australia — Equitone Natura", url: "https://www.equitone.com/en-au" },
      { name: "Equitone AU — find a distributor", url: "https://www.equitone.com/en-au" },
      { name: "Architectural facade suppliers — confirm local distributor", url: "https://www.equitone.com/en-au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "FC-panel", label: "FC panel" },
  { id: "Large-format", label: "Large format" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "NCC-2022", label: "NCC 2022" },
  { id: "AS-1530.1", label: "AS 1530.1" },
  { id: "Through-colour", label: "Through-colour" },
  { id: "Primed", label: "Primed / paintable" },
  { id: "Grooved", label: "Grooved profile" },
  { id: "Concealed-fix", label: "Concealed-fix" },
  { id: "Coastal", label: "Coastal rated" },
  { id: "James-Hardie", label: "James Hardie" },
  { id: "Equitone", label: "Equitone" },
  { id: "CSR-Cemintel", label: "CSR Cemintel" },
];

const SYSTEM_COMPARISON: {
  product: string;
  brand: string;
  finish: string;
  thickness: string;
  maxPanel: string;
  ncc2022: string;
  coastal: string;
  primaryUse: string;
}[] = [
  { product: "Equitone Tectiva", brand: "Etex/Equitone", finish: "Through-colour (no coating)", thickness: "8 / 12 mm", maxPanel: "3100 × 1250 mm", ncc2022: "Compliant — all heights", coastal: "Yes", primaryUse: "Premium — natural mineral tone — concealed fix" },
  { product: "Equitone Natura", brand: "Etex/Equitone", finish: "Uncoated exposed aggregate", thickness: "8 / 12 mm", maxPanel: "3100 × 1250 mm", ncc2022: "Compliant — all heights", coastal: "Yes", primaryUse: "Raw texture — architectural — breathes wet/dry" },
  { product: "Cemintel Territory", brand: "CSR Cemintel", finish: "Primed — site painted", thickness: "9 mm", maxPanel: "2700 × 1200 mm", ncc2022: "Compliant — all heights", coastal: "Yes", primaryUse: "Mid-cost — smooth face — CSR support network" },
  { product: "Scyon Axon Panel", brand: "James Hardie", finish: "Primed — site painted", thickness: "9 mm", maxPanel: "2700 × 1200 mm", ncc2022: "Compliant — all heights", coastal: "Yes", primaryUse: "Grooved profile — architectural — national supply" },
];

const TECH_INFO = {
  typicalApplications: [
    "NCC 2022 compliant cladding replacement on Class 2–9 buildings replacing combustible ACP or EPS cladding",
    "Rainscreen cladding system over drained cavity on aluminium or steel subframe",
    "Architectural feature facade panels where texture and material honesty are design drivers",
    "Concealed-fix panel systems where no visible fastener is acceptable on face",
    "Large-format panel systems where minimal joint lines and refined appearance are required",
  ],
  selectionCriteria: [
    "Select through-colour panels where no maintenance repainting is acceptable or where coating failure risk must be eliminated",
    "Select primed/painted panels where colour flexibility is required and periodic repainting is programmed",
    "Select grooved profile (Scyon Axon) where subframe tolerance variation may cause visible misalignment of smooth-face panels",
    "Always confirm AS 1530.1 Group 1 classification for the specific product and thickness before specifying for high-rise Class 2",
    "Confirm concealed-fix compatibility between panel product and subframe rail system before committing to either",
    "Larger panel format reduces joints but requires tighter subframe tolerance — confirm subframe set-out accuracy before panel ordering",
  ],
  limitations: [
    "FC panel systems require a purpose-engineered aluminium or steel subframe — cannot be direct-fixed to battens or stud framing",
    "Panel dead load must be included in structural design — heavier than ACP and significantly heavier than lightweight render",
    "Through-colour panels do not accept painting for colour change — colour selection is permanent",
    "All primed FC panels require topcoating within the manufacturer's recommended timeframe — uncoated primed face degrades",
    "Panel joints require compatible joint sealant or expressed joint system — incorrect sealant is a common cause of staining and joint failure",
  ],
  standardsNotes: [
    "AS 1530.1 — Non-combustibility test — confirms Group 1 classification for NCC 2022 compliance",
    "NCC 2022 Volume One — C2D3 — external walls of Class 2–9 buildings must use non-combustible cladding above ground floor",
    "AS 3700 — masonry structures — applies to flashing and weatherproofing details at panel head and sill",
    "ABCB Housing Provisions — relevant to single-storey Class 1 and 10 buildings; FC panels are commonly specified",
    "Manufacturer installation guides — structural load tables, concealed-fix compatibility, joint treatment specification",
  ],
  suitableDefects: [
    "Combustible ACP (PE-core) cladding requiring replacement for NCC 2022 compliance",
    "EPS-backed render or combustible cladding systems on Class 2–9 buildings requiring remediation",
    "Failed or end-of-life cladding systems on high-rise residential and mixed-use buildings",
    "Buildings where the design team requires a non-combustible panel with an architectural exposed-aggregate or through-colour finish",
    "Facades where periodic painting maintenance is to be eliminated by specifying uncoated through-colour panels",
  ],
  typicalSubstrates: [
    "Aluminium top-hat subframe on helping-hand brackets fixed to concrete or masonry substrate",
    "Steel RHS or C-section subframe fixed to primary structure — isolate aluminium from steel with EPDM pads",
    "Proprietary thermal-break bracket and rail systems (Nvelope, Hilti MFT, Fischer) where thermal performance is specified",
    "Over existing masonry wall with drained cavity — confirm pull-out capacity of bracket anchors before specifying",
    "New construction steel frame — fire-rated sheathing board behind panels where NCC fire rating applies to wall assembly",
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
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
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
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>
              ))}
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

export function FCPanelIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are fibre cement architectural panels?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Fibre cement architectural panels are large-format non-combustible cladding panels used where a refined facade appearance and full NCC 2022 compliance are required. They are the non-combustible alternative to polyethylene-core ACP on Class 2–9 buildings, offering a range of finishes from raw through-colour to primed-for-painting formats.</p>
        {expanded && (
          <>
            <p>Products range from premium through-colour panels (Equitone Tectiva and Natura — no coating required) to large-format primed/painted FC panels (Cemintel Territory, Scyon Axon feature panels — site-painted finish). All are non-combustible Group 1 under AS 1530.1 and NCC 2022 compliant for external wall cladding on any Class 2–9 building.</p>
            <p>FC architectural panels are fixed to an engineered aluminium or steel subframe — they are not direct-fixed to studs or battens. The subframe creates a drained and ventilated cavity of minimum 25 mm behind the panel. Panel dead load is substantially greater than ACP and must be included in the structural design of the subframe and its connections to the primary structure.</p>
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

export function FCPanelProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
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
            <p className="mt-1 text-sm text-slate-500">4 products — fibre cement architectural panels — scroll to view all</p>
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
                      {product.tdsUrl && (
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700">
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of fibre cement architectural panels. Confirm all selections against the current manufacturer TDS before specifying.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Thickness</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Max panel</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">NCC 2022</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finish}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.thickness}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.maxPanel}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.ncc2022}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
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
