"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Sika"
  | "Silane"
  | "Penetrating"
  | "Water-repellent"
  | "Masonry"
  | "Concrete"
  | "Breathable"
  | "Colourless"
  | "Flood-coat"
  | "AS-3700"
  | "Vapour-permeable";

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
    name: "Sika Protectosil BHN / CIT penetrating silane water repellent",
    descriptionLine: "Deep-penetrating silane water repellent — covalently bonds within pore structure — reduces water absorption up to 95% — no surface film — vapour permeable — for porous masonry, brick, stone and render",
    productType: "Penetrating silane water repellent — no surface film — flood coat application — bare masonry and concrete",
    filterTags: ["Sika", "Silane", "Penetrating", "Water-repellent", "Masonry", "Concrete", "Breathable", "Colourless", "Flood-coat", "AS-3700", "Vapour-permeable"],
    techChips: [
      { label: "Penetrating silane", cls: "bg-sky-100 text-sky-800" },
      { label: "No surface film", cls: "bg-green-100 text-green-700" },
      { label: "Vapour permeable", cls: "bg-slate-100 text-slate-700" },
      { label: "Coverage 150–250 mL/m²", cls: "bg-amber-100 text-amber-800" },
    ],
    systemDescription:
      "Sika Protectosil BHN (broad-spectrum silane/siloxane blend) and Protectosil CIT (isobutyltrimethoxysilane for highly porous substrates) are penetrating water repellents that chemically bond within the pore structure of masonry and concrete. Covalent bonding within the pore walls means the treatment cannot peel or blister as surface film products can. No surface film is formed — appearance is unchanged after treatment. Maintains vapour permeability (breathable) — allows moisture within the masonry to escape outward. Penetration depth 10–20 mm into dense brick; up to 30 mm into porous historic brick. Application by brush, roller, or low-pressure spray — flood coat method required; surface must be saturated at 150–250 mL/m² depending on substrate porosity. Two wet-on-wet coats recommended on most substrates. Masonry must be clean and dry — minimum 48–72 hours no rain; substrate moisture below 4–6%. Protectosil BHN is preferred for mixed masonry facades; Protectosil CIT for very porous old brick or concrete where maximum penetration depth is required. Confirm treatment success with water drop test after 7 days cure.",
    technicalProperties: [
      "Covalent bonding within pore structure — treatment cannot peel or blister unlike surface film products",
      "Penetration depth 10–30 mm depending on substrate porosity — porous brick up to 30 mm; dense brick 10–20 mm",
      "Water absorption reduction up to 95% — reduces chloride ingress and carbonation rate in concrete",
      "Vapour permeable — maintains breathability of treated masonry; moisture within the wall can escape outward",
      "No surface film — appearance unchanged after treatment; colourless and invisible on masonry",
      "Coverage 150–250 mL/m² depending on porosity — flood coat application by brush, roller or low-pressure spray",
    ],
    limitations: [
      "Supplementary protection only — does NOT seal cracks wider than ~0.1 mm; all defects must be repaired before treatment",
      "Substrate must be dry — minimum 48–72 hours no rain; substrate moisture below 4–6% by weight",
      "Ineffective on painted or coated surfaces — must penetrate bare masonry or concrete pore structure",
      "Requires re-application every 10–15 years depending on exposure and substrate porosity",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade supply", url: "https://www.sika.com.au" },
      { name: "Parchem Construction Supplies — national (Sika distributor)", url: "https://www.parchem.com.au" },
      { name: "Boral Building Products — masonry treatment range", url: "https://www.boral.com.au" },
      { name: "Rockcote / Parex — specialist masonry treatment supply", url: "https://www.rockcote.com.au" },
    ],
  },
];

const SYSTEM_COMPARISON: {
  attribute: string;
  value: string;
}[] = [
  { attribute: "Supplier", value: "Sika Australia" },
  { attribute: "Product range", value: "Protectosil BHN / CIT" },
  { attribute: "Type", value: "Penetrating silane" },
  { attribute: "Surface film", value: "None (penetrating treatment)" },
  { attribute: "Vapour permeable", value: "Yes" },
  { attribute: "Penetration depth", value: "10–30 mm depending on substrate" },
  { attribute: "Water absorption reduction", value: "Up to 95%" },
  { attribute: "Coverage rate", value: "150–250 mL/m² (flood coat)" },
  { attribute: "Application method", value: "Brush, roller or low-pressure spray — flood coat" },
  { attribute: "Substrate moisture limit", value: "Below 4–6% by weight" },
  { attribute: "Reapplication interval", value: "10–15 years" },
  { attribute: "Colourless", value: "Yes — appearance unchanged" },
];

const TECH_INFO = {
  typicalApplications: [
    "Water repellent treatment to porous masonry facades after structural repairs, repointing and crack repair are complete",
    "Supplementary protection on exposed masonry parapets, piers and wind-driven rain faces",
    "Penetrating treatment of concrete masonry facades to reduce chloride ingress in coastal locations",
    "Post-salt-attack remediation treatment to reduce future water and chloride ingress into repaired masonry",
    "Heritage masonry water repellent treatment where breathability must be maintained and no surface film is acceptable",
  ],
  selectionCriteria: [
    "Specify Protectosil BHN for general mixed masonry facades — broad-spectrum silane/siloxane blend",
    "Specify Protectosil CIT for very porous old brick or concrete where maximum penetration depth is required",
    "Apply as a flood coat — surface must be saturated; inadequate application rate is the most common cause of poor performance",
    "All structural defects, cracks, and failed joints must be repaired before silane treatment — silane does not seal cracks",
    "Substrate must be dry — minimum 48–72 hours no rain; confirm substrate moisture below 4–6% before applying",
    "Confirm treatment effectiveness with water drop test after 7 days — drop should bead for at least 60 minutes",
  ],
  limitations: [
    "Does not seal cracks — any crack wider than ~0.1 mm will allow water entry regardless of silane treatment",
    "Will not stop rising damp or below-ground moisture — silane is a facade water repellent only",
    "Ineffective on painted, coated, or contaminated surfaces — must penetrate bare masonry pore structure",
    "Do not apply in direct sunlight when surface temperature exceeds 30°C — carrier evaporates before penetration",
    "Do not apply to frozen surfaces or when frost is forecast within 24 hours of application",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — references water repellent treatment as supplementary protection",
    "BS EN 13580 — Products and systems for protection and repair of concrete — water absorption after impregnation",
    "CCAA Data Sheet — Water Repellent Treatments for Concrete — guidance on silane selection and application",
    "Sika Protectosil TDS — confirm current product grade (BHN or CIT), coverage rate, and substrate moisture limit",
  ],
  suitableDefects: [
    "Porous or absorbent masonry facade where water ingress occurs through the pore structure (not through cracks or open joints)",
    "Wind-driven rain penetration on exposed elevations where masonry porosity is confirmed as the ingress mechanism",
    "Efflorescence caused by water cycling through porous masonry — treat after eliminating salts and completing repointing",
    "Post-remediation treatment to reduce recurrence of water-related deterioration after structural repairs are complete",
  ],
  typicalSubstrates: [
    "Modern fired clay brick — bare, dry, unpainted surface required — flood coat application to saturation",
    "Historic and heritage brick — confirm Protectosil CIT for very porous old brick — consult heritage specialist",
    "Concrete masonry block — bare, dry concrete — Protectosil CIT recommended for corrosion protection",
    "Render and textured masonry coatings — confirm product compatibility with the render type before specifying",
    "NOT suitable: painted or coated surfaces — coating blocks silane penetration; strip coating before treatment",
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

export function SikaProtectosilIntroSection() {
  return (
    <div className="rounded-2xl border border-sky-100 bg-sky-50 p-7">
      <h2 className="mb-3 text-lg font-extrabold text-sky-950">What is Sika Protectosil penetrating silane water repellent?</h2>
      <p className="mb-4 max-w-3xl text-sm leading-6 text-slate-700">
        Sika Protectosil BHN and CIT are penetrating silane water repellents that chemically bond within the pore structure of masonry and concrete, forming a hydrophobic lining without a surface film. Applied by flood coat at 150–250 mL/m², the treatment reduces water absorption by up to 95% while maintaining vapour permeability. The treated surface is colourless and unchanged in appearance. Masonry must be clean and dry. All cracks and defects must be repaired before application.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: <Layers size={14} />, label: "Type", value: "Penetrating silane (no film)" },
          { icon: <Ruler size={14} />, label: "Water absorption reduction", value: "Up to 95%" },
          { icon: <BookOpen size={14} />, label: "Standard", value: "AS 3700 / BS EN 13580" },
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

export function SikaProtectosilProductSection() {
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
        <h2 className="text-xl font-extrabold text-sky-950">Supplier reference — Sika Protectosil penetrating silane</h2>
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
        {(["Sika", "Silane", "Penetrating", "Water-repellent", "Masonry", "Concrete", "Breathable", "Vapour-permeable"] as FilterTag[]).map((f) => (
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
          <h3 className="text-sm font-extrabold text-sky-950">Sika Protectosil — key technical data</h3>
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
