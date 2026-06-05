"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Sika"
  | "One-part"
  | "Polyurethane"
  | "ISO-11600"
  | "AS-3700"
  | "Movement-joint"
  | "Masonry"
  | "Paintable"
  | "25LM"
  | "Bond-breaker";

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
    fullLabel: "Sika Australia",
    brandUrl: "https://www.sika.com.au",
    accentColor: "#0369a1",
    name: "Sikaflex-11FC+ one-part moisture-curing polyurethane sealant",
    descriptionLine: "Industry-standard one-part moisture-curing PU sealant — ISO 11600 F 25 LM — ±25% movement accommodation — paintable after cure — for masonry facade movement joints and control joints",
    productType: "One-part moisture-curing polyurethane sealant — ISO 11600 F 25 LM — masonry movement joints",
    filterTags: ["Sika", "One-part", "Polyurethane", "ISO-11600", "AS-3700", "Movement-joint", "Masonry", "Paintable", "25LM", "Bond-breaker"],
    techChips: [
      { label: "One-part PU", cls: "bg-sky-100 text-sky-800" },
      { label: "ISO 11600 F 25 LM", cls: "bg-slate-100 text-slate-700" },
      { label: "±25% movement", cls: "bg-green-100 text-green-700" },
      { label: "Paintable after cure", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Sikaflex-11FC+ is the industry-standard one-part moisture-curing polyurethane sealant for movement joints in masonry facades, around window and door frames, and at material change-of-plane junctions on Class 2 strata buildings. Rated ISO 11600 F 25 LM — accommodates ±25% of the joint width in movement at low modulus. Single-component formulation requires no mixing — simplifies site handling and eliminates mixing-ratio errors. Shore A hardness approximately 35 when fully cured. Skin time approximately 60 minutes at 23°C / 50% RH; cure rate 3–5 mm per day. Service temperature range −40°C to +90°C. Elongation at break greater than 500%. Primer required on porous masonry substrates — use Sika Primer-3 N on brick, concrete, and render. Bond breaker polyethylene foam backer rod is mandatory at the joint base to prevent three-sided bonding. Joint width-to-depth ratio must be maintained at 2:1. Gun-grade application from standard cartridge or sausage packs. Available in standard colours: grey, black, beige, white, brown. Paintable with most water-based paints after full cure.",
    technicalProperties: [
      "One-part moisture-curing — no mixing required; eliminates mixing-ratio errors on site",
      "ISO 11600 F 25 LM — accommodates ±25% of joint width in movement at low modulus",
      "Elongation at break greater than 500% — high elastic recovery after cyclic movement",
      "Paintable after full cure with most water-based paints — allows topcoat application where required",
      "Service temperature −40°C to +90°C — suitable for Australian climate extremes",
      "Shore A hardness ~35 — low modulus, low stress on joint faces in thermally active facades",
    ],
    limitations: [
      "Moisture-curing — requires ambient humidity for cure; slow in very dry or cold conditions",
      "Bond breaker backer rod mandatory — three-sided bond restricts movement and causes cohesive tearing",
      "Substrate must be dry, clean and primed — do not apply to wet or contaminated joint faces",
      "NOT for traffic-bearing joints or permanently immersed conditions — specify appropriate wet-rated sealant",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade supply", url: "https://www.sika.com.au" },
      { name: "Parchem Construction Supplies — national (Sika distributor)", url: "https://www.parchem.com.au" },
      { name: "Total Fasteners — national trade supply", url: "https://www.totalfasteners.com.au" },
      { name: "Bunnings Trade — wide retail availability nationally", url: "https://www.bunnings.com.au" },
    ],
  },
];

const SYSTEM_COMPARISON: {
  attribute: string;
  value: string;
}[] = [
  { attribute: "Supplier", value: "Sika Australia" },
  { attribute: "Product", value: "Sikaflex-11FC+" },
  { attribute: "Components", value: "One-part" },
  { attribute: "Cure mechanism", value: "Moisture-curing" },
  { attribute: "ISO class", value: "F 25 LM" },
  { attribute: "Movement accommodation", value: "±25%" },
  { attribute: "Shore A hardness (cured)", value: "~35A" },
  { attribute: "Elongation at break", value: ">500%" },
  { attribute: "Service temp range", value: "−40°C to +90°C" },
  { attribute: "Paintable", value: "Yes — after full cure" },
  { attribute: "Primer required", value: "Yes — Sika Primer-3 N on porous substrates" },
  { attribute: "Bond breaker required", value: "Yes — PE foam backer rod" },
  { attribute: "Joint width:depth ratio", value: "2:1" },
  { attribute: "Traffic bearing", value: "No" },
];

const TECH_INFO = {
  typicalApplications: [
    "Masonry expansion joints and control joints at 5–6 m centres per AS 3700 requirements",
    "Window and door frame perimeter joints — at junction of aluminium frame and masonry surround",
    "Control joints in rendered masonry facades — where render is cut through to the substrate",
    "Parapet coping joints — high thermal movement and water exposure zones",
    "Material change-of-plane joints — where different cladding or substrate types meet",
  ],
  selectionCriteria: [
    "Specify Sikaflex-11FC+ for general masonry facade movement joint repair — one-part, familiar to contractors, widely available",
    "Confirm joint width meets the 6–25 mm working range — wider joints may require a different formulation",
    "Apply joint width:depth ratio of 2:1 — install PE foam backer rod to control depth before sealant application",
    "Apply when joint is at mid-range temperature — not at seasonal minimum (contracted) or maximum (expanded)",
    "Prime all porous substrates with Sika Primer-3 N before applying sealant — prime aluminium frames per TDS",
  ],
  limitations: [
    "Bond breaker tape or backer rod at the joint base is mandatory — three-sided bond causes cohesive tearing failure",
    "Do not apply to wet joint faces — moisture on the bond face prevents adhesion",
    "Do not apply over existing uncured or contaminated sealant — rake out fully to sound substrate",
    "Do not use in traffic-bearing joints — specify a traffic-grade PU or polyurethane traffic sealant",
    "Colour range limited — confirm required colour is available before ordering on large projects",
  ],
  standardsNotes: [
    "ISO 11600 — Classification and requirements for joint sealants — F 25 LM designates facade grade, ±25%, low modulus",
    "AS 3700 — Masonry Structures — movement joint spacing and sealant requirements for masonry facades",
    "NATSPEC worksection 05 32 00 — Sealants — project specification requirements for sealant work",
    "Sika Primer-3 N TDS — confirm current primer specification for each substrate type before applying",
  ],
  suitableDefects: [
    "Failed, cracked or debonded polyurethane sealant in masonry facade movement joints",
    "Open control joints where original sealant has cured out, shrunk or pulled away from the joint face",
    "Perimeter joints around window and door frames where original sealant is deteriorated or absent",
    "New movement joints cut into masonry as part of a remedial programme for crack repair or salt attack work",
  ],
  typicalSubstrates: [
    "Modern fired clay brick — prime porous surfaces with Sika Primer-3 N before sealant application",
    "Concrete masonry units and precast concrete panels — prime per TDS",
    "Rendered masonry facades — confirm render is cured, clean and primed before sealing",
    "Aluminium window frames and curtain wall profiles — prime per manufacturer TDS",
    "NOT suitable: traffic-bearing joints, immersed joints, or permanently wet conditions",
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

export function Sikaflex11FCIntroSection() {
  return (
    <div className="rounded-2xl border border-sky-100 bg-sky-50 p-7">
      <h2 className="mb-3 text-lg font-extrabold text-sky-950">What is Sikaflex-11FC+ one-part polyurethane sealant?</h2>
      <p className="mb-4 max-w-3xl text-sm leading-6 text-slate-700">
        Sikaflex-11FC+ is a one-part moisture-curing polyurethane sealant rated ISO 11600 F 25 LM — the industry standard for movement joints in masonry facades on Australian Class 2 strata buildings. Gun-grade, single-component, no mixing required. Accommodates ±25% of the joint width in movement at low modulus, meaning low stress is transmitted to the joint faces. Paintable after full cure. Requires a polyethylene foam backer rod at the joint base and primer on porous substrates.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: <Layers size={14} />, label: "Movement class", value: "ISO 11600 F 25 LM (±25%)" },
          { icon: <Ruler size={14} />, label: "Cure mechanism", value: "One-part moisture-curing" },
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

export function Sikaflex11FCProductSection() {
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
        <h2 className="text-xl font-extrabold text-sky-950">Supplier reference — Sikaflex-11FC+ polyurethane sealant</h2>
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
        {(["Sika", "One-part", "Polyurethane", "ISO-11600", "Masonry", "Paintable", "25LM"] as FilterTag[]).map((f) => (
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
          <h3 className="text-sm font-extrabold text-sky-950">Sikaflex-11FC+ — key technical data</h3>
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
