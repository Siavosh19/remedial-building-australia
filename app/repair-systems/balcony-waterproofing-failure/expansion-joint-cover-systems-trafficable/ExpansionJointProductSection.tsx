"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Expansion-joint"
  | "Trafficable"
  | "Aluminium"
  | "Stainless-steel"
  | "EPDM"
  | "Neoprene"
  | "Movement-joint"
  | "External"
  | "Balcony"
  | "Podium"
  | "Surface-mount"
  | "Recessed";

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
    fullLabel: "Schluter Systems",
    brandUrl: "https://www.schluter.com.au",
    tdsUrl: "https://www.schluter.com.au",
    accentColor: "#f59e0b",
    name: "Schluter DILEX-EKE",
    descriptionLine: "Recycled rigid PVC anchoring legs with CPE (chlorinated polyethylene) 5 mm movement zone — corner and movement joint profile for tiled floor/wall junctions and balcony surfaces",
    productType: "PVC / CPE corner movement joint profile",
    filterTags: ["Expansion-joint", "Trafficable", "EPDM", "Movement-joint", "External", "Balcony", "Podium", "Surface-mount"],
    techChips: [
      { label: "Rigid PVC legs / CPE zone", cls: "bg-sky-100 text-sky-800" },
      { label: "Trafficable", cls: "bg-green-50 text-green-700" },
      { label: "Tiled deck — corner joint", cls: "bg-slate-100 text-slate-700" },
      { label: "Balcony / terrace", cls: "bg-amber-50 text-amber-700" },
      { label: "AS 3740", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Schluter DILEX-EKE is a corner movement joint profile with trapezoid-perforated recycled rigid PVC anchoring legs and a 5 mm-wide soft CPE (chlorinated polyethylene) movement zone — not aluminium legs and not EPDM. It is designed for expansion and movement joints at floor/wall transitions and inside corners in tiled balcony, terrace and podium deck surfaces. The CPE infill accommodates lateral movement while the profile separates individual tile fields at the junction. The CPE movement zone is UV-resistant, resistant to fungi and bacteria, and suitable for external exposed conditions. PVC anchor legs are bedded into the tile adhesive on each side of the joint and must be continuous and void-free for the profile to remain in place. Profile size is selected according to tile thickness.\n\nUsed in Class 2 strata balcony and podium deck remediation where expansion joints at floor/wall junctions or within the tile plane require a trafficable waterproofing cover. Confirm movement accommodation and profile selection with Schluter Australia before specifying.",
    technicalProperties: [
      "Recycled rigid PVC trapezoid-perforated anchor legs — bedded into tile adhesive on each side of joint",
      "CPE (chlorinated polyethylene) 5 mm-wide movement zone — UV resistant — suitable for external conditions",
      "Trafficable profile — designed to be walked on in tiled deck installations",
      "Profile sized according to tile thickness — confirm profile series and size with Schluter Australia",
      "CPE movement zone is resistant to acids, alkalis, oils, and solvents — suitable for food contact areas",
    ],
    limitations: [
      "Not suitable as a structural movement joint cover where the joint must accommodate large vertical differential movement — confirm joint movement type and magnitude with Schluter technical",
      "Tile adhesive placement must be continuous and void-free under the anchor legs — voids allow flexing and detachment of the profile",
      "CPE infill does not eliminate the need for the waterproofing membrane to be detailed correctly at the joint faces before the profile is installed",
      "Confirm current product specification, availability, and movement accommodation values with Schluter Australia before specifying",
    ],
    procurementSources: [
      { name: "Schluter Systems Australia — trade supply — contact for current pricing", url: "https://www.schluter.com.au" },
      { name: "Tile trade suppliers nationally — confirm current stock", url: "https://www.schluter.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com",
    accentColor: "#ef4444",
    name: "Sikaflex Expansion Joint System",
    descriptionLine: "Sika polyurethane sealant expansion joint system — trafficable balcony and podium deck joints",
    productType: "PU sealant joint system",
    filterTags: ["Expansion-joint", "Trafficable", "Movement-joint", "External", "Balcony", "Podium", "Surface-mount"],
    techChips: [
      { label: "PU sealant system", cls: "bg-sky-100 text-sky-800" },
      { label: "Trafficable", cls: "bg-green-50 text-green-700" },
      { label: "Balcony / podium", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika system", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sika supplies trafficable expansion joint sealant systems for balcony and podium deck applications using Sikaflex polyurethane products rated for light foot traffic and limited vehicular loads. The joint is saw-cut or formed to the correct width, cleaned, prepared with Sika primer, backer rod installed, and sealed with a traffic-rated Sikaflex sealant. The completed joint accommodates lateral movement while remaining flush and trafficable.\n\n// TODO: Confirm the current Sika Australia product designation for trafficable deck joint sealant — Sikaflex 2C NS EZ Mix, Sikaflex PRO-3 WF, or a current alternative — and confirm traffic rating and movement accommodation class from Sika technical.\n\nSika also supplies aluminium and stainless expansion joint cover profiles (Sika Combitec range) as an alternative to sealant-only joint solutions — confirm current Combitec product availability in Australia with Sika technical.",
    technicalProperties: [
      "Polyurethane sealant — good elongation — suitable for trafficable balcony and deck expansion joints",
      "Sika primer required on all substrates — confirm primer selection with Sika technical",
      "Backer rod required for correct joint depth control — closed-cell PE foam at correct diameter",
      // TODO: confirm movement accommodation class and traffic load rating from current Sika TDS
    ],
    limitations: [
      "Sealant-only trafficable joint has service life limitations under foot traffic — requires periodic inspection and re-sealing over building life",
      "Sealant must not be used without backer rod — three-sided adhesion will cause premature sealant failure under movement",
      "Confirm traffic load rating — not all Sikaflex products are rated for vehicular traffic",
      "Confirm current product designation and traffic rating with Sika Australia before specifying",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply — contact for current pricing", url: "https://aus.sika.com" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Tremco CPG Australia",
    brandUrl: "https://www.tremcosealants.com.au",
    tdsUrl: "https://www.tremcosealants.com.au",
    accentColor: "#22c55e",
    name: "Tremco Emshield DFR",
    descriptionLine: "EPDM dual-seal expansion joint cover system — trafficable deck and balcony applications",
    productType: "EPDM dual-seal joint cover",
    filterTags: ["Expansion-joint", "Trafficable", "EPDM", "Movement-joint", "External", "Balcony", "Podium", "Recessed"],
    techChips: [
      { label: "EPDM dual-seal", cls: "bg-sky-100 text-sky-800" },
      { label: "Trafficable", cls: "bg-green-50 text-green-700" },
      { label: "Recessed / surface-mount", cls: "bg-slate-100 text-slate-700" },
      { label: "Balcony / podium", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Tremco Emshield DFR is a dual-flanged rubber (EPDM) expansion joint cover system used in trafficable horizontal deck surfaces including balconies and podium decks. The profile is mechanically fixed with aluminium or stainless retaining flanges on each side of the joint, with the EPDM centre element spanning the joint and accommodating movement. Suitable for foot traffic and, in some configurations, light vehicular traffic.\n\n// TODO: Confirm current Tremco CPG Australia product designation for Emshield DFR — Emshield product names and series may vary between the US and Australian markets. Confirm the current Australian product designation, movement accommodation values, and installation method with Tremco CPG Australia technical.\n\nEmshield systems are typically installed in the concrete substrate during remediation works — the joint is prepared and the retaining flanges are fixed before the finish surface is applied.",
    technicalProperties: [
      "EPDM rubber — UV and ozone-resistant — suitable for external exposed deck and balcony applications",
      "Dual-flange mechanical fixings — profile is not relying on adhesion alone — maintainable and replaceable",
      "EPDM centre element accommodates lateral movement and some vertical differential movement",
      // TODO: confirm movement accommodation range and traffic load rating from current Tremco TDS
    ],
    limitations: [
      "Profile installation requires correct recess preparation in the substrate — not a surface-applied system only",
      "// TODO: Confirm current product designation, movement range and installation details with Tremco CPG Australia",
      "Retaining flange fixings must be into sound substrate — hollow or delaminated substrate will not hold mechanical fixings under traffic loads",
      "Confirm current product specification, availability and traffic rating with Tremco CPG Australia before specifying",
    ],
    procurementSources: [
      { name: "Tremco CPG Australia — trade supply — contact for current pricing", url: "https://www.tremcosealants.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Expansion-joint", label: "Expansion joint" },
  { id: "Trafficable", label: "Trafficable" },
  { id: "Aluminium", label: "Aluminium" },
  { id: "Stainless-steel", label: "Stainless steel" },
  { id: "EPDM", label: "EPDM" },
  { id: "Neoprene", label: "Neoprene" },
  { id: "Movement-joint", label: "Movement joint" },
  { id: "External", label: "External" },
  { id: "Balcony", label: "Balcony" },
  { id: "Podium", label: "Podium" },
  { id: "Surface-mount", label: "Surface mount" },
  { id: "Recessed", label: "Recessed" },
];

const BRAND_EQUIV: { system: string; schluter: string; sika: string; tremco: string }[] = [
  { system: "PVC/CPE — tiled trafficable deck — corner movement joint — surface mount", schluter: "DILEX-EKE", sika: "—", tremco: "—" },
  { system: "PU sealant — trafficable deck joint", schluter: "—", sika: "Sikaflex system*", tremco: "Vulkem*" },
  { system: "EPDM dual-flange — trafficable deck — recessed", schluter: "—", sika: "—", tremco: "Emshield DFR*" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; coverType: string; primaryMaterial: string; movementZone: string; trafficRating: string; installMethod: string;
}[] = [
  {
    product: "Schluter DILEX-EKE",
    brand: "Schluter",
    coverType: "Tile-embedded corner movement profile",
    primaryMaterial: "Recycled rigid PVC legs + CPE movement zone",
    movementZone: "CPE (chlorinated polyethylene) — 5 mm wide",
    trafficRating: "Foot traffic — tiled deck",
    installMethod: "PVC anchor legs embedded in tile adhesive each side of joint",
  },
  {
    product: "Sikaflex Expansion Joint System",
    brand: "Sika",
    coverType: "Sealant-based system",
    primaryMaterial: "Polyurethane sealant",
    movementZone: "PU sealant (field-replaceable)",
    trafficRating: "Foot traffic — confirm product with Sika",
    installMethod: "Sealant over backer rod — saw-cut or formed joint",
  },
  {
    product: "Tremco Emshield DFR",
    brand: "Tremco",
    coverType: "Dual-flange cover profile",
    primaryMaterial: "EPDM rubber + metal flanges",
    movementZone: "EPDM centre element",
    trafficRating: "Foot + light vehicular — confirm with Tremco",
    installMethod: "Mechanically fixed flanges — recessed substrate preparation",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Structural expansion joints in concrete balcony and podium deck slabs requiring a trafficable waterproofed cover",
    "Expansion joints in tiled balcony, terrace and podium deck surfaces where tile-to-tile grout joints are insufficient to accommodate movement",
    "Movement joints in concrete podium decks subject to thermal expansion and contraction where sealant-only joints have a limited service life",
    "Remediation of failed or open expansion joints in trafficable balcony and deck surfaces allowing water ingress to waterproofing membrane",
  ],
  selectionCriteria: [
    "Select profile type based on joint width and expected movement magnitude — confirm with manufacturer technical that the selected product accommodates the design movement",
    "Select aluminium/EPDM tile-embedded profiles (e.g. Schluter DILEX) for tiled trafficable decks where the profile must be flush with the tile surface",
    "Select EPDM dual-flange systems (e.g. Tremco Emshield) for wider joints or joints requiring higher movement accommodation",
    "Select trafficable sealant systems (Sikaflex or Vulkem) for narrow joints where a profile is not practical or cost-effective",
    "Confirm traffic load rating against expected use — foot traffic only, or vehicular access on podium decks",
  ],
  limitations: [
    "No expansion joint cover system eliminates the need for correct waterproofing membrane detailing at the joint faces below the cover profile",
    "EPDM infill elements in aluminium profiles have a finite service life — replacement may be required during the building service life",
    "Trafficable sealant joints in high-traffic areas have shorter service lives than metal-covered joint systems — plan maintenance schedules accordingly",
    "Movement accommodation must be confirmed with the manufacturer — specifying a cover with insufficient movement range will lead to profile failure under thermal cycling",
  ],
  standardsNotes: [
    "AS 3740 — Waterproofing of Domestic Wet Areas — waterproofing continuity requirements across movement joints",
    "AS 4654.2 — Waterproofing of Wet Areas Within Residential Buildings — movement joint requirements for balcony and deck assemblies",
    "NCC Volume One — Class 2 building requirements for waterproofing continuity and performance across structural movement joints",
  ],
  suitableDefects: [
    "Failed or open structural expansion joints in balcony or podium deck slabs allowing water ingress through or around existing joint cover",
    "Cracked or debonded sealant in expansion joints of tiled trafficable deck surfaces",
    "Missing or inadequate expansion joint covers in remediated balcony and podium deck waterproofing systems",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — structural expansion joints cast into the slab",
    "Tiled deck surfaces — aluminium profile profiles embedded in tile adhesive on each side of the joint",
    "Waterproofed concrete deck surfaces — EPDM flanged profiles fixed to the concrete on each side of the joint",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? (
              <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
            ) : (
              <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
            )}
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
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name} <ExternalLink size={9} className="text-slate-300" />
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

export function ExpansionJointIntroSection() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">What are expansion joint cover systems — trafficable?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Expansion joint cover systems are profiles and assemblies that span structural movement joints in trafficable balcony, terrace and podium deck surfaces. They bridge the gap between the two sides of the joint, accommodating thermal expansion, contraction, and other forms of structural movement, while maintaining waterproofing continuity across the joint and a trafficable surface finish.
        </p>
        <p>
          Trafficable expansion joint cover systems for balcony and deck surfaces typically use aluminium anchor profiles with an EPDM or neoprene rubber infill element. The aluminium flanges are embedded in the tile adhesive or mechanically fixed to the concrete substrate on each side of the joint. The rubber infill spans the joint and accommodates movement in both the horizontal (lateral) and, to a limited degree, vertical plane. On wider or high-movement joints, dual-flanged EPDM systems are used.
        </p>
        <p>
          The expansion joint cover system is installed above — not instead of — the waterproofing membrane. The membrane must be correctly detailed at the joint faces before the cover profile is installed. The cover system protects the membrane from traffic damage and provides the visible surface finish, but the primary waterproofing continuity across the joint depends on the membrane detailing at the joint faces below.
        </p>
        <div className="mt-2 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="mb-2 text-xs font-bold text-slate-700">Do not confuse expansion joint cover systems with:</p>
          <ul className="space-y-1.5">
            {[
              "Backer rod — used beneath sealant in movement joints, not a standalone joint cover",
              "Termination bars — membrane edge anchors at upstands, not joint cover systems",
              "Tile edge trims — decorative and protective tile-edge profiles, not movement joint systems",
              "Compressible joint filler — cast-in foam board used to form the structural joint — installed during construction, not a joint cover",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-xs leading-5 text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ExpansionJointProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleProducts =
    activeFilters.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Technical Accordion ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable defects and substrates</p>
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
              <TechCard icon={<AlertTriangle size={15} />} title="Limitations" items={TECH_INFO.limitations} style="warn" />
              <TechCard icon={<BookOpen size={15} />} title="Standards & Testing" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<CheckCircle size={15} />} title="Suitable Defects" items={TECH_INFO.suitableDefects} style="check" />
              <TechCard icon={<SquareStack size={15} />} title="Typical Substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">3 products — 3 brands — trafficable expansion joint cover systems — scroll to view all</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">
              Clear filters
            </button>
          )}
        </div>

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("left")} aria-label="Scroll left" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll("right")} aria-label="Scroll right" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable card row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
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

      {/* ── System Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of trafficable expansion joint cover systems for balcony and podium deck applications. * Confirm movement accommodation and traffic rating with manufacturer.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Cover type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Primary material</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Movement zone</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Traffic rating</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-600">Install method</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600">{row.coverType}</td>
                  <td className="px-4 py-3 text-slate-600">{row.primaryMaterial}</td>
                  <td className="px-4 py-3 text-slate-600">{row.movementZone}</td>
                  <td className="px-4 py-3 text-slate-600">{row.trafficRating}</td>
                  <td className="px-4 py-3 text-slate-600">{row.installMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Brand Equivalents ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Brand Equivalents</h2>
            <p className="mt-1 text-sm text-slate-500">
              Trafficable expansion joint cover equivalents across brands. * Confirm exact product designation and movement accommodation with manufacturer.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">System type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#f59e0b" }}>Schluter</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#ef4444" }}>Sika</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap" style={{ color: "#22c55e" }}>Tremco</th>
              </tr>
            </thead>
            <tbody>
              {BRAND_EQUIV.map((row, i) => (
                <tr key={row.system} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-slate-800">{row.system}</td>
                  {[row.schluter, row.sika, row.tremco].map((val, j) => (
                    <td key={j} className="px-4 py-3 text-slate-600">{val === "—" ? <span className="text-slate-300">—</span> : val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Warning callouts — BELOW comparison table only ── */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-7">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white">
            <AlertTriangle size={15} />
          </div>
          <h3 className="text-base font-extrabold text-amber-900">Critical design requirements — expansion joint cover systems</h3>
        </div>
        <ul className="space-y-2">
          {[
            "Expansion joint cover profiles must not be specified without confirming the movement accommodation range against the calculated design movement for the joint — under-specified profiles will fail under thermal cycling",
            "The waterproofing membrane must be correctly detailed at the joint faces before the cover profile is installed — the cover system protects the membrane but is not a substitute for correct membrane detailing",
            "EPDM infill elements have a finite service life — maintenance replacement of the infill should be included in the building maintenance schedule from day one",
            "Do not allow tile adhesive or grout to fill the gap between the cover profile and the adjacent tile or concrete surface — this prevents movement accommodation and will cause profile detachment",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-amber-900">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
