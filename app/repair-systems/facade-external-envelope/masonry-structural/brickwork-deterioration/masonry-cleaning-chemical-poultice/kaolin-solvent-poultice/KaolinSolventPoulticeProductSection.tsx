"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Poultice"
  | "Kaolin"
  | "Oil-stain"
  | "Masonry-cleaning"
  | "Heritage"
  | "Sensitive-substrate"
  | "Solvent"
  | "Hydrocarbon"
  | "Fire-risk";

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
    fullLabel: "Remmers Australia",
    brandUrl: "https://www.remmers.com.au",
    accentColor: "#0369a1",
    name: "Remmers kaolin / paper pulp + solvent poultice — oil and grease stain removal",
    descriptionLine: "Kaolin clay or paper pulp saturated with hydrocarbon solvent — dissolves oil/grease and draws it out of masonry pores during drying — suitable for sandstone, limestone, and heritage masonry — fire risk during application — PPE required",
    productType: "Kaolin / paper pulp + solvent poultice — oil and grease removal — heritage masonry",
    filterTags: ["Poultice", "Kaolin", "Oil-stain", "Masonry-cleaning", "Heritage", "Sensitive-substrate", "Solvent", "Hydrocarbon", "Fire-risk"],
    techChips: [
      { label: "Kaolin + solvent", cls: "bg-sky-100 text-sky-800" },
      { label: "Oil / grease / tar", cls: "bg-amber-100 text-amber-800" },
      { label: "Heritage safe", cls: "bg-green-100 text-green-700" },
      { label: "Fire risk — ventilate", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "Remmers Australia provides kaolin clay and solvent-based poultice systems for removal of oil, grease, tar, and hydrocarbon staining from masonry facades on Class 2 strata buildings and heritage structures. The kaolin clay (or paper pulp) carrier is saturated with a hydrocarbon solvent matched to the stain type — acetone for general oils, naphtha for tar and bitumen, mineral spirits for lubricant and cooking oil staining. The solvent dissolves the oil or grease contamination; the carrier absorbs it and draws the contamination out of the masonry pore structure as the poultice dries at 15 mm application thickness. Apply and cover with plastic sheeting to control evaporation rate during the 24–48 hour dwell period. Fire risk during application and drying — eliminate all ignition sources and maintain ventilation throughout the work area. PPE required: solvent-resistant gloves, safety glasses, adequate respiratory protection for the specific solvent in use. Solvent waste from removed poultice is classified as hazardous waste under EPA regulations — do not dispose of to stormwater. Suitable for sandstone, limestone, and all masonry types — no acid is used in solvent poultice systems.",
    technicalProperties: [
      "Stain type: Oil, grease, tar, hydrocarbon — solvent dissolves the stain; clay carrier absorbs and draws it out during drying",
      "Carrier: Kaolin clay or paper pulp — absorbs dissolved oil/grease out of masonry pores by capillary action",
      "Active: Hydrocarbon solvent (acetone, naphtha, mineral spirits) — select solvent matched to the stain type",
      "Application: 15 mm paste, cover with plastic sheeting to control evaporation during 24–48 hr dwell period",
      "Heritage safe: Suitable for sandstone, limestone, and all masonry types — no acid chemistry involved",
      "Multiple applications safe: Allow 48 hours drying between cycles; may leave faint ghost stain after several cycles on very old staining",
      "Remmers technical support: Product data sheets and SDS available for heritage documentation requirements",
    ],
    limitations: [
      "Fire risk during application and drying — hydrocarbon solvent vapours are flammable; eliminate all ignition sources and maintain ventilation",
      "Solvent vapour in enclosed spaces — do not work in confined spaces without forced ventilation and appropriate respiratory protection",
      "Solvent disposal is hazardous waste — removed poultice and contaminated materials cannot be disposed of to stormwater; confirm EPA requirements",
      "Wrong solvent on wrong stain type produces poor results — match solvent to stain type; consult Remmers technical data for solvent selection",
      "May leave a faint ghost stain after treatment on very old or heavily saturated oil staining — manage client expectations",
      "Not suitable for organic, rust, or calcium-based staining — specify attapulgite + H₂O₂ or proprietary chelating agent for those stain types",
    ],
    procurementSources: [
      { name: "Remmers Australia — specialist masonry and heritage conservation products nationally", url: "https://www.remmers.com.au" },
      { name: "Blackwoods — kaolin clay, acetone, naphtha, and mineral spirits industrial supply", url: "https://www.blackwoods.com.au" },
      { name: "Chem Supply Australia — solvents bulk supply, hazardous waste disposal guidance", url: "https://www.chemsupply.com.au" },
      { name: "Parchem Construction Supplies — specialist masonry care products nationally", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Specialist Masonry Restoration Suppliers",
    brandUrl: "#",
    accentColor: "#b45309",
    name: "Site-mixed kaolin / paper pulp solvent poultice — hydrocarbon stain removal",
    descriptionLine: "Site-mixed kaolin or paper pulp carrier saturated with selected solvent — for oil, grease, tar, and hydrocarbon staining from masonry — select solvent to match stain type — fire risk — hazardous waste disposal required",
    productType: "Site-mixed solvent poultice — hydrocarbon stain removal — masonry and heritage",
    filterTags: ["Poultice", "Kaolin", "Oil-stain", "Masonry-cleaning", "Heritage", "Sensitive-substrate", "Solvent", "Hydrocarbon", "Fire-risk"],
    techChips: [
      { label: "Site-mixed", cls: "bg-slate-100 text-slate-700" },
      { label: "Kaolin / paper pulp", cls: "bg-amber-100 text-amber-800" },
      { label: "Solvent — match to stain", cls: "bg-sky-100 text-sky-800" },
      { label: "Fire risk", cls: "bg-red-100 text-red-700" },
    ],
    systemDescription:
      "A site-mixed solvent poultice formulation using kaolin clay powder or standard paper pulp as the carrier, saturated with a hydrocarbon solvent selected to match the specific stain type, for removal of oil, grease, tar, and hydrocarbon staining from masonry facades. Paper pulp is more economical and widely available from office supply outlets — shredded paper pulp mixed to a paste consistency with the selected solvent at approximately 1:1 by volume. Kaolin clay powder provides a finer, more uniform carrier and is preferred for smooth stone surfaces where paper pulp texture may affect the finish. Solvent selection is critical: acetone for general cooking and lubricating oil; mineral spirits (white spirit) for heavier grease and machinery oil; naphtha for tar and bitumen staining. Apply at 10–15 mm thickness, cover with plastic sheeting to control evaporation, allow 24–48 hour dwell, remove with plastic scraper, flush with clean water. Fire risk during application and drying — ventilate the work area and eliminate ignition sources. Solvent-contaminated poultice waste is classified as hazardous waste — do not dispose to stormwater.",
    technicalProperties: [
      "Economical site-mixed option — kaolin clay powder or paper pulp from office supply; solvent from hardware or chemical supply",
      "Paper pulp carrier: shredded paper mixed with solvent at 1:1 ratio — widely available, low cost, suitable for general masonry",
      "Kaolin carrier: finer and more uniform than paper pulp — preferred for smooth stone surfaces and heritage masonry",
      "Solvent selection: acetone (general oils), mineral spirits (heavy grease), naphtha (tar/bitumen) — match solvent to stain type",
      "Suitable for all masonry types including sandstone, limestone, and heritage terracotta — no acid chemistry",
      "Multiple applications can be safely repeated at 48-hour drying intervals",
    ],
    limitations: [
      "Fire risk — hydrocarbon solvents are flammable; eliminate ignition sources, ensure ventilation throughout application and drying",
      "Incorrect solvent selection produces poor results — identify stain type and match solvent before applying",
      "Solvent-contaminated poultice waste is hazardous waste — do not dispose of to stormwater; confirm EPA requirements for disposal",
      "May leave a faint ghost stain after treatment on heavy or longstanding oil contamination",
      "Not suitable for organic, rust, or calcium-based staining — wrong poultice on wrong stain type produces no result",
      "PPE mandatory: solvent-resistant gloves, safety glasses, respiratory protection appropriate to the solvent in use",
    ],
    procurementSources: [
      { name: "Blackwoods — kaolin clay powder, acetone, mineral spirits, naphtha industrial supply", url: "https://www.blackwoods.com.au" },
      { name: "Bunnings / Mitre 10 — mineral spirits and acetone in store; paper shredding office supply", url: "https://www.bunnings.com.au" },
      { name: "Chem Supply Australia — kaolin clay and solvent bulk supply", url: "https://www.chemsupply.com.au" },
      { name: "Office supply / newsagent — paper pulp source for site-mixed carrier (shredded newspaper)", url: "https://www.bunnings.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Poultice", label: "Poultice" },
  { id: "Kaolin", label: "Kaolin / paper pulp" },
  { id: "Oil-stain", label: "Oil / grease stain" },
  { id: "Hydrocarbon", label: "Hydrocarbon / tar" },
  { id: "Solvent", label: "Solvent active" },
  { id: "Fire-risk", label: "Fire risk" },
  { id: "Heritage", label: "Heritage" },
  { id: "Sensitive-substrate", label: "Sensitive substrate" },
  { id: "Masonry-cleaning", label: "Masonry cleaning" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  product: string;
  stainType: string;
  carrier: string;
  active: string;
  distribution: string;
  keyFeature: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Remmers Australia",
    product: "Kaolin + solvent poultice",
    stainType: "Oil / grease / tar",
    carrier: "Kaolin clay (proprietary)",
    active: "Solvent (formulated)",
    distribution: "Remmers specialist supply",
    keyFeature: "TDS / SDS — heritage documentation",
    primaryUse: "Oil stain — heritage and strata",
  },
  {
    supplier: "Site-mixed",
    product: "Kaolin / paper pulp + solvent",
    stainType: "Oil / grease / tar / hydrocarbon",
    carrier: "Kaolin or paper pulp",
    active: "Acetone / mineral spirits / naphtha",
    distribution: "Hardware / chemical supply",
    keyFeature: "Low cost; solvent matched to stain",
    primaryUse: "Oil stain — general masonry",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Removal of cooking oil, lubricant, and machinery grease staining from masonry facades on Class 2 strata building common areas and carparks",
    "Removal of tar and bitumen staining from masonry surfaces adjacent to road works, asphalting, or waterproofing operations",
    "Oil and grease stain removal from heritage sandstone and limestone facades where acid cleaning is prohibited",
    "Hydrocarbon staining from fuel spillage or vehicle runoff on masonry paving and walls in carpark structures",
    "Oil contamination removal from masonry courtyard paving on strata buildings where pressure washing would spread the contamination",
  ],
  selectionCriteria: [
    "Confirm stain type is oil, grease, tar, or hydrocarbon before selecting kaolin + solvent poultice — this system does not work on organic, rust, or calcium stains",
    "Select solvent to match stain type: acetone for general cooking/lubricating oils; mineral spirits for heavy machinery grease; naphtha for tar and bitumen",
    "Commission a trial area (0.1 m²) on an inconspicuous section before full-area treatment — confirm solvent does not damage substrate finish or surface treatment",
    "Confirm fire safety requirements before commencing: eliminate ignition sources, ventilate the work area, and brief all workers on solvent hazards",
    "Cover poultice with plastic sheeting to control evaporation rate and maximise extraction depth — especially in hot or windy conditions",
    "Identify the source of recurring oil contamination (leaking vehicles, equipment) and rectify before treating — without source correction, staining will recur",
  ],
  limitations: [
    "Fire risk — hydrocarbon solvent vapours are flammable; mandatory fire safety precautions and ventilation during application and drying",
    "Wrong solvent on wrong stain produces no result — stain type identification and solvent matching is mandatory",
    "Solvent waste is hazardous — removed poultice cannot be disposed of to stormwater; confirm EPA hazardous waste requirements",
    "Confined space risk — solvent vapour accumulates in enclosed spaces; forced ventilation required for indoor or enclosed poultice work",
    "Not suitable for organic, biological, rust, or efflorescence staining — wrong poultice type will produce no stain reduction",
  ],
  standardsNotes: [
    "Safe Work Australia — hazardous substances handling; flammable liquid requirements; SDS must be on site for all solvent poultice work",
    "State WHS regulations — confined space requirements if solvent poultice is used in enclosed or semi-enclosed areas",
    "EPA state regulations — hazardous waste disposal for solvent-contaminated poultice material; do not dispose to stormwater",
    "Heritage Council of NSW and state heritage authorities — trial area documentation requirements for listed buildings",
    "Manufacturer SDS and TDS — mandatory on site for all proprietary poultice products",
  ],
  suitableDefects: [
    "Oil and grease staining on masonry facades and paving from cooking oil, lubricants, machinery oil, or vehicle runoff",
    "Tar and bitumen staining from road works, waterproofing operations, or roofing materials that have contacted masonry",
    "Hydrocarbon fuel staining on carpark masonry surfaces from vehicle spillage or fuel line leaks",
    "Heritage masonry oil staining where acid cleaning is prohibited and surface scrubbing would spread the contamination",
    "Old or deeply penetrated oil staining in porous masonry where surface cleaning methods have failed",
  ],
  typicalSubstrates: [
    "Sandstone — kaolin + solvent is safe on sandstone; no acid involved; suitable for heritage conservation works",
    "Limestone — same safety profile; solvent selection must not dissolve any surface treatment on polished limestone",
    "Fired clay brick — suitable for oil staining on brick facades; kaolin carrier preferred over paper pulp for brick surfaces",
    "Concrete masonry and concrete paving — suitable for oil and grease staining on concrete surfaces",
    "Terracotta tiles and heritage masonry — preferred over acid cleaning for hydrocarbon staining on heritage substrates",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({
  items,
  icon,
  limit = 3,
}: {
  items: string[];
  icon: "check" | "x";
  limit?: number;
}) {
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
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600"
        >
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
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-[9px] font-bold text-slate-400 hover:text-slate-600"
        >
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div
              key={src.name}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs"
            >
              {src.url && src.url !== "#" ? (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900"
                >
                  {src.name}
                  <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">
        Confirm suitability with the current manufacturer TDS before specifying or applying.
      </p>
    </div>
  );
}

function CollapsibleCardDetails({
  text,
  chips,
}: {
  text: string;
  chips: { label: string; cls: string }[];
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                  {chip.label}
                </span>
              ))}
            </div>
          )}
        </>
      )}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600"
      >
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>
        {text}
      </p>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

function TechCard({
  icon,
  title,
  items,
  style,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  style: "bullet" | "check" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
          {icon}
        </div>
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

export function KaolinSolventPoulticeIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is kaolin / paper pulp solvent poultice?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Kaolin clay or paper pulp saturated with a hydrocarbon solvent is the correct poultice formulation for removing oil, grease, tar, and hydrocarbon staining from masonry facades on Class 2 strata buildings and heritage structures. The solvent dissolves the oil or grease contamination; the clay or pulp carrier absorbs it and draws it out of the masonry pore structure as the poultice slowly dries. Suitable for all masonry types including acid-sensitive substrates — no acid is used in solvent poultice systems.
        </p>
        {expanded && (
          <>
            <p>
              The critical selection rule is matching the solvent to the stain type. General cooking and lubricating oils respond well to acetone; heavy machinery grease and gear oil respond to mineral spirits (white spirit); tar and bitumen staining from road works or waterproofing operations requires naphtha or a stronger hydrocarbon solvent. Using an inappropriate solvent will not dissolve the contamination effectively and wastes application time. A trial area application of 0.1 m² is mandatory before full-area treatment to confirm both effectiveness on the specific stain and compatibility with the masonry substrate surface treatment.
            </p>
            <p>
              Fire safety requirements are non-negotiable for all solvent poultice work. Hydrocarbon solvent vapours are flammable — eliminate all ignition sources in the work area before commencing and maintain adequate fresh air ventilation throughout application and drying. In enclosed carparks or semi-enclosed courtyards, forced ventilation may be required. All solvent-contaminated poultice material removed from the masonry is classified as hazardous waste under EPA regulations and must not be disposed of to stormwater or general waste — confirm local EPA requirements for solvent waste disposal before commencing.
            </p>
          </>
        )}
      </div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

export function KaolinSolventPoulticeProductSection() {
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
      : PRODUCTS.filter((p) =>
          Array.from(activeFilters).every((f) => p.filterTags.includes(f))
        );

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
            <p className="mt-0.5 text-xs text-slate-500">
              Applications, selection criteria, limitations, standards, suitable substrates
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (
              <>Hide detail <ChevronUp size={14} /></>
            ) : (
              <>Show detail <ChevronDown size={14} /></>
            )}
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

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">2 product systems — kaolin / paper pulp solvent poultice — scroll to view all</p>
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
                  active
                    ? "border-sky-950 bg-sky-950 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button
              type="button"
              onClick={() => setActiveFilters(new Set())}
              className="text-xs text-slate-400 underline hover:text-slate-600"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
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
            <div
              key={product.name}
              className="flex-none"
              style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}
            >
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeftWidth: 4, borderLeftColor: product.accentColor }}
              >
                {/* Card header */}
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a
                          href={product.tdsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      {product.brandUrl !== "#" && (
                        <a
                          href={product.brandUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <ExternalLink size={9} /> Brand Site
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips}
                  />
                </div>

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
                </div>

                {/* Technical Properties & Limitations */}
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

                {/* Procurement Sources */}
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
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of kaolin/paper pulp solvent poultice systems. Match solvent to stain type. Confirm fire safety and hazardous waste disposal requirements before commencing.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Stain type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Carrier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Active</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Distribution</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key feature</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.stainType}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.carrier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.active}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.distribution}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.keyFeature}</td>
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
