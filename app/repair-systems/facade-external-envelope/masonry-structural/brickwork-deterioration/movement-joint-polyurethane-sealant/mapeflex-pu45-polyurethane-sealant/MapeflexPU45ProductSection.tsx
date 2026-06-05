"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Mapei"
  | "Two-part"
  | "Polyurethane"
  | "ISO-11600"
  | "AS-3700"
  | "Movement-joint"
  | "Masonry"
  | "35HM"
  | "Bond-breaker"
  | "High-movement";

type Supplier = {
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

const SUPPLIERS: Supplier[] = [
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#0369a1",
    name: "Mapeflex PU45 — two-part polyurethane movement joint sealant",
    descriptionLine: "Two-part moisture-resistant polyurethane sealant — ISO 11600 F 35 HM — ±35% movement accommodation — requires A+B mixing on site — high-movement masonry facade joints",
    productType: "Two-part polyurethane sealant — ISO 11600 F 35 HM — high movement",
    filterTags: ["Mapei", "Two-part", "Polyurethane", "ISO-11600", "AS-3700", "Movement-joint", "Masonry", "35HM", "Bond-breaker", "High-movement"],
    techChips: [
      { label: "Two-part PU", cls: "bg-sky-100 text-sky-800" },
      { label: "ISO 11600 F 35 HM", cls: "bg-slate-100 text-slate-700" },
      { label: "±35% movement", cls: "bg-green-100 text-green-700" },
      { label: "High movement", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Mapeflex PU45 is a two-part chemically curing polyurethane movement joint sealant rated ISO 11600 F 35 HM — accommodating ±35% of the joint width in movement at high modulus. Used where one-part products at ±25% are insufficient: wide movement joints, thermally active parapet junctions, dark-coloured cladding interfaces and joints subject to large differential thermal movement. Requires on-site mixing of A+B components in the correct ratio; incorrect mixing ratio will result in incomplete cure or out-of-specification mechanical properties. Pot life is limited — typically 30–45 minutes at 23°C — requiring the mixed sealant to be applied and tooled promptly. Shore A hardness approximately 45–50 when fully cured (higher modulus than 1-part LM products). Cure is by chemical reaction between components rather than by moisture — cure rate is less humidity dependent than one-part sealants. Bond breaker polyethylene foam backer rod is mandatory at the joint base. Joint width-to-depth ratio must be maintained at 2:1. Primer required on porous masonry substrates. Gun-grade application from mixed cartridge or separate component drums.",
    technicalProperties: [
      "Two-part chemical cure — less humidity dependent than moisture-curing one-part products",
      "ISO 11600 F 35 HM — accommodates ±35% of joint width in movement at high modulus",
      "Higher movement rating than 1-part ISO 11600 F 25 LM products — suited to wide or highly active joints",
      "Shore A hardness ~45–50 — higher modulus than LM products; confirm suitability for joint substrate",
      "Service temperature −40°C to +90°C — suitable for Australian climate extremes",
      "Predictable cure in controlled mixing conditions — less sensitive to low humidity than moisture-curing products",
    ],
    limitations: [
      "Two components must be mixed in correct ratio — incorrect mix ratio causes incomplete cure or wrong mechanical properties",
      "Short pot life (~30–45 min at 23°C) — mixed material must be applied promptly; do not batch-mix large quantities",
      "Higher modulus than LM products — transmits more stress to joint faces; confirm substrate can accommodate",
      "NOT for narrow joints (less than 6 mm width) — mixing and application difficulty increases; use 1-part products for narrow joints",
      "Bond breaker backer rod mandatory — three-sided bond restricts movement and causes cohesive tearing",
      "Primer required on porous masonry — confirm primer compatibility with Mapei TDS before applying",
    ],
    procurementSources: [
      { name: "Mapei Australia — national trade supply", url: "https://www.mapei.com/au" },
      { name: "Parchem Construction Supplies — national (Mapei distributor)", url: "https://www.parchem.com.au" },
      { name: "Rockcote — national distribution", url: "https://www.rockcote.com.au" },
    ],
  },
];

const SYSTEM_COMPARISON: {
  attribute: string;
  value: string;
}[] = [
  { attribute: "Supplier", value: "Mapei Australia" },
  { attribute: "Product", value: "Mapeflex PU45" },
  { attribute: "Components", value: "Two-part (A+B)" },
  { attribute: "Cure mechanism", value: "Chemical cure (A+B reaction)" },
  { attribute: "ISO class", value: "F 35 HM" },
  { attribute: "Movement accommodation", value: "±35%" },
  { attribute: "Shore A hardness (cured)", value: "~45–50A" },
  { attribute: "Elongation at break", value: ">300%" },
  { attribute: "Service temp range", value: "−40°C to +90°C" },
  { attribute: "Paintable", value: "Yes — after full cure" },
  { attribute: "Primer required", value: "Yes — Mapei primer on porous substrates" },
  { attribute: "Bond breaker required", value: "Yes — PE foam backer rod" },
  { attribute: "Joint width:depth ratio", value: "2:1" },
  { attribute: "Traffic bearing", value: "No" },
];

const TECH_INFO = {
  typicalApplications: [
    "Wide movement joints (>20 mm) in masonry facades where ±25% LM products are insufficient for the expected movement range",
    "Parapet junctions and coping joints with large thermal cycling — dark parapets in hot climates",
    "Joints at material change-of-plane junctions with high differential thermal movement",
    "Structural movement joints designed to accommodate both thermal and settlement movement",
    "Joints in precast concrete facade panels with high movement class specified by the structural engineer",
  ],
  selectionCriteria: [
    "Specify Mapeflex PU45 when the joint movement class required exceeds ±25% — typically for joints wider than 20 mm or joints subject to high thermal movement",
    "Calculate expected joint movement from AS 3700 movement joint spacing and thermal range; if ±35% class required, use this product",
    "Confirm mixing ratio capability on site — two-component products require careful handling; ensure applicator has correct equipment and training",
    "Apply joint width:depth ratio of 2:1 with PE foam backer rod before applying sealant",
    "Select 1-part Sikaflex-11FC+ (±25%) or Dymonic FC (±35% LM) for narrower joints or where two-component mixing is impractical",
  ],
  limitations: [
    "Mixing ratio is critical — do not estimate; use measured dispensing equipment for two-part mixing",
    "Pot life limits batch size — mix only what can be applied within the pot life window",
    "Higher modulus (HM) means higher stress is transmitted to joint faces — confirm substrate bond strength is adequate",
    "Not suitable for permanently immersed or traffic-bearing joints — specify appropriate traffic-grade or hydraulic sealant",
    "Two-part products add site complexity — simpler 1-part LM products are preferred where movement class permits",
  ],
  standardsNotes: [
    "ISO 11600 — Classification and requirements for joint sealants — F 35 HM designates facade grade, ±35%, high modulus",
    "AS 3700 — Masonry Structures — movement joint spacing and sealant requirements for masonry facades",
    "NATSPEC worksection 05 32 00 — Sealants — project specification requirements for sealant work",
    "Mapei Mapeflex PU45 TDS — confirm current mixing ratio, primer and pot life data before applying",
  ],
  suitableDefects: [
    "Failed high-movement joint sealant in masonry parapet or wide movement joint where standard ±25% products have torn",
    "Movement joints in precast concrete facade panels specified at ISO 11600 F 35 or higher movement class",
    "Replacement of polysulfide or two-part sealants in existing high-movement joints during facade remediation",
    "New joints cut into masonry as part of a structural crack repair programme with engineered movement joint design",
  ],
  typicalSubstrates: [
    "Dense fired clay brick and engineering brick — prime porous surfaces per Mapei TDS",
    "Precast concrete and in-situ concrete — prime per TDS; confirm primer for dense concrete surfaces",
    "Rendered masonry — confirm render is cured and primed before sealing",
    "Aluminium and steel facade panels — prime per manufacturer TDS; confirm adhesion on test piece",
    "NOT suitable: permanently wet joints, traffic-bearing joints, or narrow joints below 6 mm width",
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
  const visible = expanded ? sources : sources.slice(0, 2);
  const extra = sources.length - 2;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((s, i) => (
          <li key={i} className="flex items-center gap-2 text-xs">
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-sky-700 hover:underline">
                <ExternalLink size={10} /> {s.name}
              </a>
            ) : (
              <span className="text-slate-500">{s.name}</span>
            )}
          </li>
        ))}
      </ul>
      {sources.length > 2 && (
        <button onClick={() => setExpanded((e) => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">
          {expanded ? "Show less ↑" : `+${extra} more ↓`}
        </button>
      )}
    </div>
  );
}

function CollapsibleCardDetails({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen((o) => !o)} className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-600">
        {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        {open ? "Hide technical detail" : "Show technical detail"}
      </button>
      {open && <div className="mt-3 space-y-4 border-t border-slate-100 pt-4">{children}</div>}
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const preview = text.slice(0, 220);
  const isTruncated = text.length > 220;
  return (
    <p className="text-xs leading-5 text-slate-600">
      {expanded || !isTruncated ? text : <>{preview}…</>}
      {isTruncated && (
        <button onClick={() => setExpanded((e) => !e)} className="ml-1 font-bold text-sky-600 hover:underline">
          {expanded ? "less" : "more"}
        </button>
      )}
    </p>
  );
}

function TechCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-extrabold text-sky-950">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-sky-50 text-sky-700">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

export function MapeflexPU45IntroSection() {
  return (
    <div className="rounded-2xl border border-sky-100 bg-sky-50 p-7">
      <h2 className="mb-3 text-lg font-extrabold text-sky-950">What is Mapeflex PU45 two-part polyurethane sealant?</h2>
      <p className="mb-4 max-w-3xl text-sm leading-6 text-slate-700">
        Mapeflex PU45 is a two-part chemically curing polyurethane sealant rated ISO 11600 F 35 HM — accommodating ±35% of the joint width in movement. Used when one-part sealants at ±25% are insufficient for the expected joint movement range. Requires on-site mixing of A and B components in the correct ratio. Higher movement rating than standard 1-part products but adds site complexity through mixing requirements and limited pot life. Requires polyethylene foam backer rod and primer on porous substrates.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: <Layers size={14} />, label: "Movement class", value: "ISO 11600 F 35 HM (±35%)" },
          { icon: <Ruler size={14} />, label: "Cure mechanism", value: "Two-part chemical cure" },
          { icon: <BookOpen size={14} />, label: "Standard", value: "ISO 11600 / AS 3700" },
        ].map((s) => (
          <div key={s.label} className="flex items-start gap-3 rounded-xl border border-sky-200 bg-white p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">{s.icon}</span>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{s.label}</div>
              <div className="mt-0.5 text-sm font-extrabold text-sky-950">{s.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MapeflexPU45ProductSection() {
  const [activeFilters, setActiveFilters] = useState<FilterTag[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (f: FilterTag) =>
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const filtered =
    activeFilters.length === 0
      ? SUPPLIERS
      : SUPPLIERS.filter((s) => activeFilters.every((f) => s.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-sky-950">Supplier reference — Mapeflex PU45 polyurethane sealant</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll("left")} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50">
            <ChevronLeft size={15} />
          </button>
          <button onClick={() => scroll("right")} className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["Mapei", "Two-part", "Polyurethane", "ISO-11600", "Masonry", "35HM", "High-movement"] as FilterTag[]).map((f) => (
          <button
            key={f}
            onClick={() => toggleFilter(f)}
            className={`rounded-full border px-3 py-1 text-[11px] font-bold transition ${activeFilters.includes(f) ? "border-sky-600 bg-sky-600 text-white" : "border-slate-200 bg-white text-slate-500 hover:border-sky-300"}`}
          >
            {f.replace(/-/g, " ")}
          </button>
        ))}
        {activeFilters.length > 0 && (
          <button onClick={() => setActiveFilters([])} className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-[11px] font-bold text-red-600 hover:bg-red-100">
            Clear filters
          </button>
        )}
      </div>

      <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-2">
        {filtered.map((s) => (
          <div key={s.fullLabel} className="flex w-[340px] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ borderLeftColor: s.accentColor, borderLeftWidth: 4 }}>
            <div className="p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: s.accentColor }}>{s.fullLabel}</div>
                  <h3 className="mt-1 text-sm font-extrabold leading-snug text-sky-950">{s.name}</h3>
                </div>
                <div className="flex shrink-0 flex-col gap-1.5">
                  {s.brandUrl !== "#" && (
                    <a href={s.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-bold text-sky-700 hover:bg-sky-50">
                      <ExternalLink size={9} /> Brand Site
                    </a>
                  )}
                  {s.tdsUrl && (
                    <a href={s.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-bold text-sky-700 hover:bg-sky-50">
                      <FileText size={9} /> TDS
                    </a>
                  )}
                </div>
              </div>
              <CollapsibleDescription text={s.descriptionLine} />
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.techChips.map((c) => (
                  <span key={c.label} className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${c.cls}`}>{c.label}</span>
                ))}
              </div>
            </div>
            <div className="border-t border-slate-100 px-5 pb-5">
              <CollapsibleCardDetails>
                <div>
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">System description</div>
                  <p className="text-xs leading-5 text-slate-600">{s.systemDescription}</p>
                </div>
                <div>
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Technical properties</div>
                  <CollapsibleList items={s.technicalProperties} icon="check" />
                </div>
                <div>
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Limitations</div>
                  <CollapsibleList items={s.limitations} icon="x" />
                </div>
                <div>
                  <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Procurement sources</div>
                  <CollapsibleSources sources={s.procurementSources} />
                </div>
              </CollapsibleCardDetails>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="flex h-40 w-full items-center justify-center text-sm text-slate-400">No suppliers match the selected filters.</div>
        )}
      </div>

      {/* Technical data table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-6 py-4">
          <h3 className="text-sm font-extrabold text-sky-950">Mapeflex PU45 — key technical data</h3>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <th className="px-4 py-3 text-left">Attribute</th>
              <th className="px-4 py-3 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {SYSTEM_COMPARISON.map((row, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="px-4 py-3 font-semibold text-sky-900">{row.attribute}</td>
                <td className="px-4 py-3 text-slate-600">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Technical info cards */}
      <div className="grid gap-5 lg:grid-cols-2">
        <TechCard icon={<SquareStack size={14} />} title="Typical applications">
          <CollapsibleList items={TECH_INFO.typicalApplications} icon="check" />
        </TechCard>
        <TechCard icon={<CheckCircle size={14} />} title="Selection criteria">
          <CollapsibleList items={TECH_INFO.selectionCriteria} icon="check" />
        </TechCard>
        <TechCard icon={<AlertTriangle size={14} />} title="Limitations & exclusions">
          <CollapsibleList items={TECH_INFO.limitations} icon="x" />
        </TechCard>
        <TechCard icon={<BookOpen size={14} />} title="Standards & notes">
          <CollapsibleList items={TECH_INFO.standardsNotes} icon="check" />
        </TechCard>
        <TechCard icon={<Layers size={14} />} title="Suitable defects">
          <CollapsibleList items={TECH_INFO.suitableDefects} icon="check" />
        </TechCard>
        <TechCard icon={<Ruler size={14} />} title="Typical substrates">
          <CollapsibleList items={TECH_INFO.typicalSubstrates} icon="check" />
        </TechCard>
      </div>
    </div>
  );
}
