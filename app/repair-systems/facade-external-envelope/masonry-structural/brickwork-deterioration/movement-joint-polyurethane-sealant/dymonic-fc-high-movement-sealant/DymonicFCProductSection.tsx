"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Tremco"
  | "One-part"
  | "Polyurethane"
  | "ISO-11600"
  | "AS-3700"
  | "Movement-joint"
  | "Masonry"
  | "35LM"
  | "High-movement"
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
    fullLabel: "Tremco",
    brandUrl: "https://www.tremcosealants.com.au",
    accentColor: "#0369a1",
    name: "Tremco Dymonic FC one-part high-movement polyurethane facade sealant",
    descriptionLine: "Premium one-part moisture-curing PU sealant — ±35% movement accommodation — specifically designed for facade masonry applications — low modulus (~25A Shore) — fuel-resistant — widely specified in Australia",
    productType: "One-part moisture-curing polyurethane sealant — high-movement — facade masonry joints",
    filterTags: ["Tremco", "One-part", "Polyurethane", "ISO-11600", "AS-3700", "Movement-joint", "Masonry", "35LM", "High-movement", "Bond-breaker"],
    techChips: [
      { label: "One-part PU", cls: "bg-sky-100 text-sky-800" },
      { label: "±35% movement", cls: "bg-green-100 text-green-700" },
      { label: "Shore ~25A (low modulus)", cls: "bg-slate-100 text-slate-700" },
      { label: "Fuel-resistant", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Tremco Dymonic FC is a one-part moisture-curing polyurethane sealant specifically designed for facade masonry applications requiring high-movement accommodation. Movement accommodation ±35% — higher than standard ISO 11600 F 25 LM products. Shore A hardness approximately 25A when cured — softer than Sikaflex-11FC+ (~35A) — lower modulus means lower stress transmitted to the joint faces in thermally active facades. One-part, gun-grade application from standard cartridge — no mixing required. Fuel and oil resistant formulation — suitable for joints in proximity to plant rooms, service areas, and parking structures. Wide colour range available. Primer required on porous masonry substrates — use Tremco Primer 171 on masonry and concrete per TDS. Bond breaker polyethylene foam backer rod mandatory at the joint base. Widely specified and used on masonry facade remediation projects throughout Australia. Confirm primer requirements and current product formulation with Tremco technical representative before specifying.",
    technicalProperties: [
      "One-part moisture-curing — no mixing required; reduces application error risk compared to two-part products",
      "Movement accommodation ±35% — higher movement class than standard ISO 11600 F 25 LM one-part products",
      "Shore A hardness ~25A — softer/lower modulus than standard PU; lower joint face stress in thermally active facades",
      "Fuel and oil resistant — suitable for joints in proximity to plant areas, parking structures, and service penetrations",
      "Wide colour range — better colour selection than many competitors for facade joint aesthetics",
      "Widely specified in Australia — high contractor familiarity; reduces application errors on facade remediation",
    ],
    limitations: [
      "Moisture-curing — requires ambient humidity for cure; slow cure in very dry or cold conditions",
      "Bond breaker backer rod mandatory — three-sided bond restricts movement and causes cohesive tearing failure",
      "Primer required on porous masonry substrates — Tremco Primer 171 on masonry and concrete per TDS",
      "Higher cost than standard one-part PU — justify use in high-movement or high-exposure facade locations",
    ],
    procurementSources: [
      { name: "Tremco — national trade supply", url: "https://www.tremcosealants.com.au" },
      { name: "Parchem Construction Supplies — Tremco distributor nationally", url: "https://www.parchem.com.au" },
      { name: "PBS Building Supplies — national", url: "https://www.pbsbuildingsupplies.com.au" },
      { name: "Confirm current AU distributor with Tremco local rep before ordering", url: "https://www.tremcosealants.com.au" },
    ],
  },
];

const SYSTEM_COMPARISON: {
  attribute: string;
  value: string;
}[] = [
  { attribute: "Supplier", value: "Tremco" },
  { attribute: "Product", value: "Dymonic FC" },
  { attribute: "Components", value: "One-part" },
  { attribute: "Cure mechanism", value: "Moisture-curing" },
  { attribute: "Movement accommodation", value: "±35%" },
  { attribute: "Shore A hardness (cured)", value: "~25A (low modulus)" },
  { attribute: "Fuel resistant", value: "Yes" },
  { attribute: "Paintable", value: "Confirm with current TDS" },
  { attribute: "Primer required", value: "Yes — Tremco Primer 171 on porous substrates" },
  { attribute: "Bond breaker required", value: "Yes — PE foam backer rod" },
  { attribute: "Colour range", value: "Wide range available" },
  { attribute: "Traffic bearing", value: "No" },
];

const TECH_INFO = {
  typicalApplications: [
    "High-movement masonry facade movement joints where standard ±25% accommodation is insufficient",
    "Wide or thermally active movement joints in masonry facades on north and west-facing elevations in Australian climate",
    "Facade joints in proximity to plant rooms, service areas, or parking structures where fuel and oil resistance is required",
    "Remedial joint resealing programmes where maximum movement class from a one-part product is specified",
    "Expansion joints in masonry facades with large panel sizes or high thermal exposure",
  ],
  selectionCriteria: [
    "Specify Dymonic FC when ±35% movement is required from a one-part product — avoids two-part mixing complexity",
    "Low modulus (~25A Shore) makes Dymonic FC particularly suited to facades with high thermal cycling and large joint spans",
    "Confirm primer is Tremco Primer 171 on masonry substrates — do not substitute with other brand primers",
    "Apply bond breaker backer rod before sealant — three-sided bonding causes cohesive failure regardless of product quality",
    "Apply when joint is at mid-range temperature — not at seasonal minimum or maximum",
  ],
  limitations: [
    "Bond breaker backer rod at the joint base is mandatory — three-sided bond restricts movement and causes tearing",
    "Do not apply to wet joint faces — substrate must be clean, dry and primed",
    "Moisture-curing — will cure slowly in very dry or cold conditions; confirm minimum application temperature",
    "Do not use in traffic-bearing joints — specify a traffic-grade sealant for vehicle-trafficked areas",
    "Confirm current colour availability with Tremco before specifying colour-critical facade joints",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — movement joint spacing and sealant requirements for masonry facades",
    "ISO 11600 — Classification and requirements for joint sealants — confirm product movement class from current TDS",
    "NATSPEC worksection 05 32 00 — Sealants — project specification requirements for sealant work",
    "Tremco Primer 171 TDS — confirm current primer specification for each substrate type before applying",
  ],
  suitableDefects: [
    "Failed polyurethane sealant in high-movement masonry facade movement joints where standard ±25% products have failed in service",
    "Open or deteriorated control joints in facades with high thermal exposure or large panel sizes",
    "Perimeter joints around window and door frames in thermally active facades",
    "Joints in proximity to plant rooms or parking structures requiring fuel-resistant sealant",
  ],
  typicalSubstrates: [
    "Modern fired clay brick — prime with Tremco Primer 171 before sealant application",
    "Concrete masonry units and precast concrete panels — prime per Tremco TDS",
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

export function DymonicFCIntroSection() {
  return (
    <div className="rounded-2xl border border-sky-100 bg-sky-50 p-7">
      <h2 className="mb-3 text-lg font-extrabold text-sky-950">What is Tremco Dymonic FC high-movement polyurethane sealant?</h2>
      <p className="mb-4 max-w-3xl text-sm leading-6 text-slate-700">
        Tremco Dymonic FC is a one-part moisture-curing polyurethane sealant specifically designed for facade masonry applications requiring high-movement accommodation. Accommodates ±35% joint movement at low modulus (Shore A ~25A) — lower modulus than standard one-part PU products. Gun-grade, no mixing. Fuel and oil resistant. Primer required on porous masonry substrates. Widely specified on Australian masonry facade remediation projects.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: <Layers size={14} />, label: "Movement", value: "±35% (high-movement)" },
          { icon: <Ruler size={14} />, label: "Modulus (Shore A)", value: "~25A (low modulus)" },
          { icon: <BookOpen size={14} />, label: "Standard", value: "AS 3700 / ISO 11600" },
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

export function DymonicFCProductSection() {
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
        <h2 className="text-xl font-extrabold text-sky-950">Supplier reference — Tremco Dymonic FC high-movement sealant</h2>
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
        {(["Tremco", "One-part", "Polyurethane", "ISO-11600", "Masonry", "35LM", "High-movement"] as FilterTag[]).map((f) => (
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
          <h3 className="text-sm font-extrabold text-sky-950">Tremco Dymonic FC — key technical data</h3>
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
