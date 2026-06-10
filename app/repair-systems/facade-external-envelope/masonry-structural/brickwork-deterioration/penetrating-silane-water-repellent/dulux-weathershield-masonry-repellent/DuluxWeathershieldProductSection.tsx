"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Dulux"
  | "Silane"
  | "Silane-siloxane"
  | "Penetrating"
  | "Breathable"
  | "Masonry"
  | "Invisible"
  | "Trade-retail";

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
    fullLabel: "Dulux",
    brandUrl: "https://www.dulux.com.au",
    accentColor: "#0369a1",
    name: "Dulux Weathershield Masonry Water Repellent — silane/siloxane penetrating treatment",
    descriptionLine: "Penetrating silane/siloxane water repellent — invisible breathable hydrophobic treatment — for brick, masonry and concrete facades — available through Dulux trade and retail channels",
    productType: "Penetrating silane/siloxane water repellent — no surface film — trade and retail availability",
    filterTags: ["Dulux", "Silane", "Silane-siloxane", "Penetrating", "Breathable", "Masonry", "Invisible", "Trade-retail"],
    techChips: [
      { label: "Penetrating silane/siloxane", cls: "bg-sky-100 text-sky-800" },
      { label: "No surface film", cls: "bg-green-100 text-green-700" },
      { label: "Breathable", cls: "bg-slate-100 text-slate-700" },
      { label: "Trade + retail", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Dulux Weathershield Masonry Water Repellent is a penetrating silane/siloxane water repellent for brick, masonry and concrete facades available through Dulux trade and retail channels. Penetrates the pore structure to form a hydrophobic barrier without forming a surface film — the masonry appearance is unchanged after treatment. Breathable — maintains vapour permeability. Suitable for general masonry facade water repellent treatment where Dulux supply channels are preferred or where a widely available product is required for maintenance use. Coverage and application method per Dulux TDS — typically 100–200 mL/m² depending on substrate porosity. Substrate must be clean, dry, and all defects repaired before application. Masonry must be bare and uncoated for penetration. Confirm current product grade, coverage and re-application interval with Dulux TDS or Dulux technical representative before specifying.",
    technicalProperties: [
      "Penetrating silane/siloxane — chemically bonds within pore structure; no surface film",
      "Breathable treatment — maintains vapour permeability of treated masonry",
      "Invisible — masonry appearance unchanged after treatment",
      "Wide availability — through Dulux trade centres and hardware retail nationally",
      "Suitable for maintenance and general masonry protection on less critical applications",
      "Single-component, ready to use — simpler site handling than specialist construction products",
    ],
    limitations: [
      "Less specialised than construction-grade silane/siloxane products — confirm suitability for high-exposure or critical facade applications",
      "Substrate must be dry, clean, bare and free of all coatings — any coating blocks penetration",
      "Does not seal cracks — all cracks and defects must be repaired before treatment",
      "Coverage and re-application interval must be confirmed with current Dulux TDS — product formulation may vary",
      "Not suitable for painted or contaminated surfaces — strip coating before treatment",
    ],
    procurementSources: [
      { name: "Dulux Trade Centres — national trade supply", url: "https://www.dulux.com.au" },
      { name: "Bunnings — wide retail availability nationally", url: "https://www.bunnings.com.au" },
      { name: "Mitre 10 — hardware retail nationally", url: "https://www.mitre10.com.au" },
      { name: "Total Tools / PBS Building Supplies — trade nationally", url: "https://www.dulux.com.au" },
    ],
  },
];

const SYSTEM_COMPARISON: {
  attribute: string;
  value: string;
}[] = [
  { attribute: "Supplier", value: "Dulux" },
  { attribute: "Product", value: "Weathershield Masonry Water Repellent" },
  { attribute: "Type", value: "Penetrating silane/siloxane" },
  { attribute: "Surface film", value: "None (penetrating treatment)" },
  { attribute: "Breathability", value: "Vapour permeable" },
  { attribute: "Coverage rate", value: "100–200 mL/m² — confirm with current TDS" },
  { attribute: "Application method", value: "Brush, roller or spray — flood coat" },
  { attribute: "Substrate preparation", value: "Clean, dry, bare masonry" },
  { attribute: "Re-treatment interval", value: "Confirm with Dulux TDS" },
  { attribute: "Suitable substrates", value: "Brick, masonry, concrete, render" },
  { attribute: "Colourless", value: "Yes — appearance unchanged" },
  { attribute: "Availability", value: "Trade and retail — Dulux centres, Bunnings, Mitre 10" },
];

const TECH_INFO = {
  typicalApplications: [
    "General water repellent treatment to brick and masonry facades after structural repairs and repointing are complete",
    "Maintenance re-application to previously treated facades as part of a building maintenance programme",
    "Water repellent treatment on domestic or residential masonry where retail product availability is preferred",
    "Post-remediation supplementary protection on less critical masonry facade applications",
    "Small area treatments or patch applications where full specialist-product procurement is impractical",
  ],
  selectionCriteria: [
    "Specify Dulux Weathershield where Dulux supply channels are preferred or where retail availability is required for maintenance use",
    "For specialist construction or high-exposure facade applications, consider Sika Protectosil or Mapei Antipluviol S — construction-grade silane/siloxane products",
    "Apply as a flood coat to saturation — do not brush-apply lightly; inadequate application rate is the most common cause of poor performance",
    "All structural defects, cracks, and failed joints must be repaired before silane treatment",
    "Substrate must be dry — minimum 48 hours no rain; confirm substrate is bare and uncoated",
  ],
  limitations: [
    "Does not seal cracks — any crack wider than ~0.1 mm will allow water entry regardless of silane treatment",
    "Will not stop rising damp or below-ground moisture",
    "Ineffective on painted, coated, or contaminated surfaces — must penetrate bare masonry pore structure",
    "Do not apply in direct sunlight when surface temperature is high — carrier evaporates before penetration",
    "Confirm re-application interval and current product specification with Dulux before including in a long-term maintenance plan",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — references water repellent treatment as supplementary protection",
    "Dulux Weathershield TDS — confirm current coverage rate, application conditions and re-application interval",
    "CCAA Data Sheet — Water Repellent Treatments for Concrete — guidance on silane selection and application",
    "Dulux technical representative — confirm product suitability for the specific masonry type and exposure before applying",
  ],
  suitableDefects: [
    "Porous or absorbent masonry facade where water ingress occurs through the pore structure rather than through open defects",
    "Maintenance re-application to brick facades after the original water repellent treatment service life has elapsed",
    "General wind-driven rain protection on residential masonry facades after repointing is complete",
    "Post-remediation supplementary protection after salt attack or weathering remediation on residential buildings",
  ],
  typicalSubstrates: [
    "Fired clay brick — bare, dry, unpainted surface required — apply by flood coat",
    "Concrete masonry block — bare, dry concrete — confirm coverage rate on dense concrete",
    "Render and textured masonry coatings — confirm product compatibility with the render type before specifying",
    "Concrete pavers and retaining walls — for water repellent treatment outside building facade scope",
    "NOT suitable: painted or coated surfaces — strip coating before treatment; permanently wet or below-grade surfaces",
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

export function DuluxWeathershieldIntroSection() {
  return (
    <div className="rounded-2xl border border-sky-100 bg-sky-50 p-7">
      <h2 className="mb-3 text-lg font-extrabold text-sky-950">What is Dulux Weathershield Masonry Water Repellent?</h2>
      <p className="mb-4 max-w-3xl text-sm leading-6 text-slate-700">
        Dulux Weathershield Masonry Water Repellent is a penetrating silane/siloxane water repellent for brick, masonry and concrete facades. Penetrates the pore structure and forms a hydrophobic barrier without a surface film — the treated surface is invisible and vapour permeable. Available through Dulux trade centres and hardware retail nationally, making it accessible for maintenance applications and residential projects. All defects must be repaired and masonry must be clean and dry before application.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: <Layers size={14} />, label: "Type", value: "Penetrating silane/siloxane" },
          { icon: <Ruler size={14} />, label: "Film", value: "Invisible — no surface film" },
          { icon: <BookOpen size={14} />, label: "Availability", value: "Trade + retail" },
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

export function DuluxWeathershieldProductSection() {
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
        <h2 className="text-xl font-extrabold text-sky-950">Supplier reference — Dulux Weathershield Masonry Water Repellent</h2>
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
        {(["Dulux", "Silane", "Penetrating", "Breathable", "Masonry", "Invisible", "Trade-retail"] as FilterTag[]).map((f) => (
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
          <h3 className="text-sm font-extrabold text-sky-950">Dulux Weathershield Masonry Water Repellent — key technical data</h3>
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
