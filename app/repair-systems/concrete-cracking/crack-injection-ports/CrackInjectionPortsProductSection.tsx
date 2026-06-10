"use client";

import { useState, useRef } from "react";
import { Layers, SquareStack, Ruler, ExternalLink, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag =
  | "Surface-Bonded"
  | "Mechanical"
  | "PU-Compatible"
  | "Epoxy-Compatible"
  | "Thick-Element"
  | "Adhesive"
  | "Diagnostic-Tool";

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
    fullLabel: "Sika / Mapei / Fosroc",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/concrete-repair-and-protection.html",
    accentColor: "#0369a1",
    name: "Surface-Bonded Plastic Injection Port — Standard Low-Pressure Crack Injection",
    descriptionLine: "Surface-bonded plastic nipple — epoxy paste adhesive — 100–300 mm spacing — max 0.5 MPa — compatible with both PU and epoxy injection resins",
    productType: "Surface-bonded plastic injection port — low-pressure crack injection hardware",
    filterTags: ["Surface-Bonded", "PU-Compatible", "Epoxy-Compatible"],
    techChips: [
      { label: "No drilling required", cls: "bg-sky-100 text-sky-800" },
      { label: "100–300 mm spacing", cls: "bg-slate-100 text-slate-700" },
      { label: "Max 0.5 MPa", cls: "bg-amber-50 text-amber-700" },
      { label: "PU and epoxy compatible", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Surface-bonded plastic injection ports are the most common port type for crack injection in Australian remedial building work. A small plastic nipple with a flange base is bonded directly over the crack trace using a fast-setting epoxy paste adhesive (Sika Monotop 623, Fosroc Nitomortar FC, or matched brand port adhesive). Ports are spaced at 100–300 mm centres depending on crack width — closer spacing for fine cracks below 0.2 mm. The crack surface between ports is sealed with the same epoxy paste to prevent resin bypassing the port and running down the face before it penetrates the crack. After port adhesive cures (typically 30–60 minutes), injection begins at the lowest port, continues until resin bleeds from the next adjacent port, that port is closed, and injection advances upward. The plastic barrel accepts a standard injection pump nozzle — confirm male or female fitting with the injection pump before purchase. Available from all major injection system suppliers as part of their full product range. Surface ports suit accessible flat or near-flat surfaces at injection pressures up to 0.5 MPa.",
    technicalProperties: [
      "Surface-bonded to concrete over crack trace using epoxy paste adhesive — no drilling required",
      "Spacing: 100–300 mm depending on crack width — closer for cracks below 0.2 mm",
      "Compatible with both PU and epoxy injection resins",
      "Maximum injection pressure 0.2–0.5 MPa — limited by surface adhesive bond strength",
      "Available from Sika, Mapei, Fosroc, and specialist suppliers as part of full injection system",
    ],
    limitations: [
      "Port adhesive must cure fully (30–60 min) before injection — premature injection dislodges ports and wastes resin",
      "Crack between ports must be surface-sealed — unsealed cracks allow resin to bypass ports and run down the face",
      "Not suitable for injection pressures above 0.5 MPa — surface bond of port adhesive limits pressure — use mechanical ports for high-pressure applications",
      "Fine cracks below 0.1 mm may not accept resin flow at low pressure through surface ports — reduce port spacing and confirm with injection resin TDS",
    ],
    procurementSources: [
      { name: "Sika Australia — injection system supply", url: "https://aus.sika.com" },
      { name: "Mapei Australia — complete injection system", url: "https://www.mapei.com/au" },
      { name: "DCP Chemprox — specialist injection supply", url: "https://www.dcpchemprox.com.au" },
    ],
  },
  {
    fullLabel: "Hilti / DCP Chemprox / Specialist Supply",
    brandUrl: "https://www.hilti.com.au",
    accentColor: "#be123c",
    name: "Mechanical Hammer-In Injection Port — Drilled and Inserted into Crack",
    descriptionLine: "Drilled hole 12–16 mm at 30–45 degrees — hammer-inserted port — max 1–2 MPa — thick elements and overhead applications",
    productType: "Mechanical hammer-in injection port — high-pressure crack injection hardware",
    filterTags: ["Mechanical", "PU-Compatible", "Epoxy-Compatible", "Thick-Element"],
    techChips: [
      { label: "Drill 12–16 mm at 30–45°", cls: "bg-red-100 text-red-800" },
      { label: "Max 1–2 MPa", cls: "bg-slate-100 text-slate-700" },
      { label: "PT slab GPR required", cls: "bg-amber-50 text-amber-700" },
      { label: "Higher skill required", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Mechanical hammer-in injection ports are installed by drilling a hole (typically 12–16 mm diameter) through the concrete surface into the crack plane at an angle of approximately 30–45 degrees to the face, then hammering a tapered plastic or steel port to seal the hole. This creates a port mechanically locked into the concrete, resisting injection pressures up to 1–2 MPa without debonding. Used for thick structural elements, high-pressure injection of deep cracks, or overhead injection where surface-bonded port adhesive bond strength is inadequate. The drill hole must be positioned to intersect the crack within the body of the element — not just at the surface trace. Accurate drill angle is critical: an incorrectly angled hole misses the crack entirely, resulting in a blind hole that accepts resin without delivering it into the crack. The port type is used by specialist crack injection contractors for bridge structures, carpark decks, and heavy commercial building frames. In post-tensioned slabs, GPR scan is mandatory before drilling — drill paths at 30–45 degrees will intercept PT tendons at cover depth if not confirmed. Available through DCP Chemprox, Rawlplug, Hilti, and Sika Australia.",
    technicalProperties: [
      "Drilled and hammer-inserted — mechanically locked — tolerates injection pressure up to 1–2 MPa",
      "Drill hole at 30–45 degrees to intercept crack in element body",
      "Suitable for thick elements, high injection pressure, and overhead application",
      "Reduces risk of port adhesive failure under high pressure compared to surface-bonded ports",
    ],
    limitations: [
      "Drilling angle must intersect the crack — incorrect angle produces a blind hole — resin is wasted without entering the crack",
      "Drill dust must be blown clear from the hole before inserting the port — dust blocks the port barrel and prevents resin flow",
      "POST-TENSIONED SLABS: confirm all PT tendon positions by GPR scan before drilling — drill paths at 30–45 degrees will intercept PT tendons at cover depth if not confirmed",
      "Higher skill and equipment cost than surface-bonded ports — typically used by specialist crack injection contractors",
    ],
    procurementSources: [
      { name: "DCP Chemprox — specialist injection supply", url: "https://www.dcpchemprox.com.au" },
      { name: "Hilti Australia — injection hardware", url: "https://www.hilti.com.au" },
    ],
  },
  {
    fullLabel: "Sika / Fosroc / Mapei",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/concrete-repair-and-protection.html",
    accentColor: "#15803d",
    name: "Crack Port Adhesive — Fast-Setting Epoxy Paste for Port Bonding and Surface Sealing",
    descriptionLine: "Fast-setting 2-component epoxy paste — bonds surface ports to concrete AND seals crack between ports — required before any injection — TODO: owner confirm product names: Sika Monotop 623 not confirmed on aus.sika.com; Fosroc Nitomortar FC not confirmed on fosroc.com.au; Mapei Eporip Turbo (confirmed in search results)",
    productType: "Fast-setting epoxy paste — port bonding and crack surface sealing — injection system accessory",
    filterTags: ["Surface-Bonded", "Adhesive", "PU-Compatible", "Epoxy-Compatible"],
    techChips: [
      { label: "10–30 min initial set", cls: "bg-emerald-100 text-emerald-800" },
      { label: "Port bonding + surface seal", cls: "bg-slate-100 text-slate-700" },
      { label: "Thin application required", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Port adhesive is a fast-setting 2-component epoxy paste performing two functions in a crack injection job: (1) bonding the surface port flange to the concrete directly over the crack, and (2) sealing the crack surface between ports to prevent resin bypassing the port and running along the crack surface before penetrating. TODO: owner confirm product names — Sika Monotop 623 not confirmed on current aus.sika.com range (June 2026); Fosroc Nitomortar FC not confirmed on current fosroc.com.au range (June 2026); Mapei Eporip Turbo is confirmed in search results as a current AU product. Mix and apply with a palette knife or tongue depressor — build a small fillet around the port base to ensure contact across the full flange. For the surface seal between ports, apply a bead of 10–15 mm width centred on the crack trace. Initial set typically 10–30 minutes at 20°C; injection can begin once ports and seal are firm to touch. Over-thick application of port adhesive (more than 3–4 mm) can bridge the crack and interfere with injection resin flow into the crack body — keep adhesive thin and strictly on the surface. Do not apply port adhesive into the crack itself — it seals the surface, not the depth.",
    technicalProperties: [
      "Fast-setting 2-component epoxy paste — port bonding and crack surface sealing",
      "TODO: owner confirm product names — Sika Monotop 623 not confirmed on aus.sika.com (June 2026); Fosroc Nitomortar FC not confirmed on fosroc.com.au (June 2026); Mapei Eporip Turbo (confirmed in search results as current AU product)",
      "Apply thin bead (10–15 mm wide) between ports to seal crack trace at surface",
      "Initial set 10–30 minutes — injection begins after firm set — do not inject before firm",
    ],
    limitations: [
      "Do not apply port adhesive into the crack itself — surface seal only — adhesive in the crack blocks injection resin penetration",
      "Do not inject before port adhesive has reached firm set — premature injection dislodges ports",
      "Surface seal between ports must be continuous — gaps allow resin to track along the crack surface without penetrating",
      "Do not apply excess adhesive — a large fillet obscures whether the port is centred over the crack and can bridge the crack at the surface",
    ],
    procurementSources: [
      { name: "Sika Australia — TODO: confirm current AU port adhesive product name (Monotop 623 not confirmed on aus.sika.com June 2026)", url: "https://aus.sika.com" },
      { name: "Parchem Construction Supplies — TODO: confirm current AU port adhesive product name (Fosroc Nitomortar FC not confirmed on fosroc.com.au June 2026)", url: "https://www.parchem.com.au" },
      { name: "Mapei Australia — Eporip Turbo (confirmed in AU product references)", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Sika / DCP Chemprox / Engineering Suppliers",
    brandUrl: "https://aus.sika.com",
    accentColor: "#78716c",
    name: "Crack Width Gauge — Comparator Card and Feeler Gauge for Pre-Injection Classification",
    descriptionLine: "Comparator card (0.05–3 mm visual reference) or feeler gauge set — mandatory pre-injection measurement — determines resin selection, port spacing, and injection feasibility",
    productType: "Crack classification and measurement tool — inspection kit item — pre-injection mandatory",
    filterTags: ["Diagnostic-Tool"],
    techChips: [
      { label: "0.05–3 mm range", cls: "bg-stone-100 text-stone-700" },
      { label: "Required before injection", cls: "bg-amber-50 text-amber-700" },
      { label: "Determines resin + port spacing", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Accurate crack width measurement before injection determines resin selection, port spacing, and whether injection is feasible. Crack measurement tools used in Australian practice include: (1) Crack comparator card — a plastic card printed with reference line widths from 0.05 mm to 3 mm, held against the crack for a visual match; (2) Crack width gauge — a set of thin calibrated feeler strips inserted into the crack opening to measure width directly. This is a classification tool, not a manufactured product in the traditional sense — but it is a required item in any crack injection scope. Crack width determines: which injection resin viscosity is required (finer cracks need lower viscosity); port spacing (finer cracks need closer ports at 100–150 mm; wider cracks at 250–300 mm); and whether injection is feasible at all (cracks below 0.05 mm are generally not injectable with current commercial resins). Cards and feeler gauges are available from Sika Australia, DCP Chemprox, and engineering equipment suppliers. Include crack width data in the repair specification — do not inject without measured crack width on record.",
    technicalProperties: [
      "Comparator card: visual reference 0.05–3 mm — quick field classification",
      "Feeler gauge set: physical measurement inserted into crack — more precise than visual comparison",
      "Measurement determines resin selection, port spacing, and injection feasibility",
      "Required item before any crack injection scope — document crack width measurements",
    ],
    limitations: [
      "Comparator card gives visual estimate only — not precision measurement — for structural assessment, optical microscopy or digital crack gauge gives more reliable data",
      "Crack width at the surface may not represent width at depth — tapered cracks may be wider internally than at the surface",
      "Feeler gauge measures accessible opening only — does not account for crack tortuosity or closed sections",
      "Do not estimate crack width from memory or experience — always measure at the point of port installation and document",
    ],
    procurementSources: [
      { name: "Sika Australia — inspection tools and accessories", url: "https://aus.sika.com" },
      { name: "DCP Chemprox — crack measurement tools", url: "https://www.dcpchemprox.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Surface-Bonded", label: "Surface-bonded" },
  { id: "Mechanical", label: "Mechanical (drilled)" },
  { id: "PU-Compatible", label: "PU compatible" },
  { id: "Epoxy-Compatible", label: "Epoxy compatible" },
  { id: "Thick-Element", label: "Thick elements" },
  { id: "Adhesive", label: "Port adhesive" },
  { id: "Diagnostic-Tool", label: "Diagnostic tool" },
];

const SYSTEM_COMPARISON = [
  { port: "Surface-bonded plastic port", installation: "Epoxy paste adhesive bond", maxPressure: "0.2–0.5 MPa", bestFor: "Accessible flat surfaces — standard crack injection", drillRequired: "No" },
  { port: "Mechanical hammer-in port", installation: "Drilled 12–16 mm at 30–45°", maxPressure: "1–2 MPa", bestFor: "Thick elements, high pressure, overhead injection", drillRequired: "Yes" },
  { port: "Crack port adhesive", installation: "Applied to port base + crack surface", maxPressure: "N/A — surface seal", bestFor: "Port bonding and inter-port crack sealing", drillRequired: "No" },
  { port: "Crack width gauge", installation: "N/A — inspection tool", maxPressure: "N/A", bestFor: "Pre-injection crack classification — 0.05–3 mm", drillRequired: "No" },
];

const TECH_INFO = {
  typicalApplications: [
    "Surface-bonded ports: standard crack injection preparation on flat accessible concrete surfaces — walls, slabs, beams, and columns",
    "Mechanical ports: thick structural elements, elevated injection pressures, overhead or ceiling surfaces where port adhesive may not provide adequate bond",
    "Port adhesive: every crack injection job — bonding ports and sealing crack surface between ports before any injection",
    "Crack width gauge: pre-injection field inspection to classify crack width, select resin viscosity, and set port spacing",
  ],
  selectionCriteria: [
    "Accessible flat surface, injection pressure below 0.5 MPa → surface-bonded plastic port",
    "Thick element, high pressure required, overhead application → mechanical hammer-in port",
    "Post-tensioned slab (any port type) → GPR scan and PT tendon confirmation before any port installation or drilling",
    "Resin selection → confirm crack width first with gauge — fine cracks need low-viscosity epoxy and closer port spacing",
    "Port adhesive → same brand as injection system where possible for system compatibility",
  ],
  limitations: [
    "Ports are hardware — they do not seal or repair the crack; the injection resin seals and reinstates",
    "Surface-bonded ports fail if injected before adhesive cures — allow full initial set (30–60 minutes) before starting injection",
    "Mechanical ports in PT slabs require GPR scan — drilling at 30–45 degrees will intercept tendons if positions are not confirmed",
    "Do not apply port adhesive into the crack body — seals the surface only — adhesive in the crack blocks resin penetration",
    "Crack width gauge measurements must be recorded before specification — do not specify injection without crack width data on file",
  ],
  standardsNotes: [
    "EN 1504-5 — injection products for crack sealing and structural reinstatement — port type and spacing are installation variables not covered by the standard",
    "AS 3600 — Concrete Structures — structural engineer must approve crack injection scope and confirm port installation plan for structural elements",
    "Post-tensioned structures: confirm all PT tendon positions by GPR before drilling — see AS 3600 and project structural drawings",
    "Manufacturer TDS — injection pressure limits, port spacing, and adhesive cure time must be confirmed for each product",
  ],
  suitableDefects: [
    "Any concrete crack requiring PU or epoxy injection — ports are the required access hardware for all injection work",
    "Cracks in basement walls, retaining walls, slabs, columns, and beams — surface-bonded ports for accessible faces",
    "Cracks in thick structural elements and overhead elements — mechanical ports for higher-pressure applications",
  ],
  typicalSubstrates: [
    "In-situ concrete — surface-bonded ports on flat, clean, dry surfaces",
    "Precast concrete elements — same preparation as in-situ",
    "Post-tensioned concrete — only with GPR tendon survey and engineer approval before any drilling",
    "Masonry and block walls — confirm port adhesive compatibility with mortar joints",
  ],
};

export function CrackInjectionPortsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Port selection and correct injection sequence</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Surface-bonded ports suit most crack injection applications on accessible flat surfaces at pressures below 0.5 MPa. Mechanical hammer-in ports are used for thick structural elements, overhead applications, and where injection pressure exceeds 0.5 MPa. Both types require port adhesive to bond the port and seal the crack surface between ports before injection begins.
        </p>
        {expanded && (
          <>
            <p>
              Correct injection sequence is critical: install all ports along the crack → seal crack surface between ports with epoxy paste → wait for adhesive to reach firm set (30–60 minutes) → inject at the lowest port → close each port when resin bleeds from the next adjacent port → advance upward or outward. Never inject simultaneously from adjacent ports — simultaneous injection pressurises both ends of a crack section and traps air in the middle, preventing full fill and creating a void that will not be detected until the repair fails.
            </p>
            <p>
              Crack width must be measured and recorded before injection. Crack width determines resin viscosity selection (finer cracks need lower-viscosity epoxy), port spacing, and whether injection is feasible — cracks below 0.05 mm are generally not injectable with current commercial resins. Always use a comparator card or feeler gauge; never estimate crack width by eye.
            </p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

export function CrackInjectionPortsProductSection() {
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

  const visibleProducts = activeFilters.size === 0
    ? PRODUCTS
    : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (<>Hide detail <ChevronUp size={14} /></>) : (<>Show detail <ChevronDown size={14} /></>)}
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
            <p className="mt-1 text-sm text-slate-500">4 items — injection ports, adhesive, and measurement tool — scroll to view all</p>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} item{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all</span>
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
                        <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>
                      )}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
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
            <h2 className="text-2xl font-extrabold text-sky-950">Port Type Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of injection port types, adhesive, and measurement tool. Confirm product specifications from current manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Port / item</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Installation</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Max pressure</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Best for</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Drill required</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.port} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.port}</td>
                  <td className="px-4 py-3 text-slate-600">{row.installation}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.maxPressure}</td>
                  <td className="px-4 py-3 text-slate-600">{row.bestFor}</td>
                  <td className="px-4 py-3 text-slate-600">{row.drillRequired}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
