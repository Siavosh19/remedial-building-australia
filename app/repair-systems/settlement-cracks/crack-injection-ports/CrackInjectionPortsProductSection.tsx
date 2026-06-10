"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";

type FilterTag = "Surface-Mount" | "Drill-In" | "PU-Injection" | "Epoxy-Injection" | "Low-Pressure" | "High-Pressure";

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
  procurementSources: { name: string; url?: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Multiple suppliers — Surface-Mounted Adhesive Port",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#0369a1",
    name: "Surface-Mounted Adhesive Plastic Port — Low-Pressure Crack Injection",
    descriptionLine: "Plastic base + steel nipple — epoxy-adhered to crack surface — low-pressure PU and epoxy injection — no drilling",
    productType: "Surface-mounted adhesive crack injection port",
    filterTags: ["Surface-Mount", "PU-Injection", "Epoxy-Injection", "Low-Pressure"],
    techChips: [
      { label: "No drilling", cls: "bg-sky-100 text-sky-800" },
      { label: "Epoxy adhered", cls: "bg-slate-100 text-slate-700" },
      { label: "PU & epoxy resins", cls: "bg-sky-50 text-sky-700" },
    ],
    systemDescription: "Surface-mounted adhesive ports are the most common port type used in settlement crack injection for masonry and concrete. A plastic base (25–35 mm diameter) with an integral steel or plastic nipple is epoxy-adhered directly over the crack face at 100–300 mm centres along the crack length. The crack surface between ports is sealed with a surface-applied epoxy paste seal, which directs the injected resin into the crack rather than allowing it to escape at the surface. After the surface seal has cured, resin is injected through each port in sequence from the lowest point upward. Surface-mounted ports are used for low-pressure injection of PU flexible resins (hydrophilic foam, elastic PU) and epoxy rigid resins. No drilling into the crack is required — making them the correct choice for masonry where drilling would damage brick faces. Available from Sika, Parchem (DCP), and generic suppliers.",
    technicalProperties: [
      "Plastic base (25–35 mm) + steel/plastic nipple — epoxy-adhered to crack surface",
      "Installed at 100–300 mm centres along crack length",
      "Crack between ports sealed with epoxy paste before injection",
      "Compatible with low-pressure PU and epoxy injection systems",
    ],
    limitations: [
      "Port bond to surface depends on surface preparation — surface must be clean, dry, and free of dust, paint, and laitance before epoxy adhesive application",
      "Surface seal must cure before injection — typically 1–2 hours for epoxy paste sealants at 20°C",
      "Port adhesive must withstand injection pressure — verify port adhesive bond before injecting, particularly on aged or contaminated masonry surfaces",
      "Low-pressure surface ports are not suitable for high-pressure injection above approximately 0.5 MPa",
    ],
    procurementSources: [
      { name: "Parchem / DCP Chemprox", url: "https://www.parchem.com.au" },
      { name: "Sika Australia", url: "https://aus.sika.com" },
      { name: "Generic — trade suppliers", url: "https://www.parchem.com.au" },
    ],
  },
  {
    fullLabel: "Multiple suppliers — Mechanical Drill-In Port",
    brandUrl: "https://www.parchem.com.au",
    accentColor: "#15803d",
    name: "Mechanical Drill-In Port — Drilled Into Crack for Higher-Pressure Injection",
    descriptionLine: "8–13 mm OD port — drilled and grouted into concrete — suitable for higher injection pressure — epoxy and PU resins",
    productType: "Mechanical drill-in crack injection port",
    filterTags: ["Drill-In", "PU-Injection", "Epoxy-Injection", "Low-Pressure", "High-Pressure"],
    techChips: [
      { label: "Drilled install", cls: "bg-green-100 text-green-800" },
      { label: "8–13 mm OD", cls: "bg-slate-100 text-slate-700" },
      { label: "Higher pressure rated", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription: "Mechanical drill-in ports are drilled into the crack at a 45-degree angle, with the drill hole intersecting the crack plane below the surface. The port body (typically 8–13 mm OD plastic or metal) is inserted and locked into the hole mechanically or with a quick-set grout. The drill-in installation provides a more secure anchor than surface adhesive and allows higher injection pressures — important in concrete elements where the resin needs to be driven into fine crack networks or where hydrostatic pressure must be overcome. Used in settlement crack repair for concrete foundations and retaining walls where crack widths are narrow (< 0.2 mm) and higher injection pressure is required for full penetration. Not appropriate for masonry where drilling through brick faces would be required — use surface-mounted ports in masonry.",
    technicalProperties: [
      "Drilled at 45° to intersect crack plane — 8–13 mm OD port body",
      "Mechanical or grout-locked installation — secure under higher injection pressure",
      "Compatible with PU flexible and epoxy rigid injection resins",
      "Allows injection pressures up to ~2 MPa depending on port type and substrate",
    ],
    limitations: [
      "Drilling required — not suitable for masonry where drilling through brick faces would damage the substrate",
      "Drill hole must intersect the crack plane — incorrect drill angle results in the port not connecting to the crack and injection fails",
      "GPR scan required before drilling in PT concrete — tendons must be avoided",
      "Port installation adds time compared to surface-mounted ports — factor into programme for larger crack systems",
    ],
    procurementSources: [
      { name: "Parchem / DCP Chemprox", url: "https://www.parchem.com.au" },
      { name: "Sika Australia", url: "https://aus.sika.com" },
      { name: "Hilti Australia — packers for higher-pressure injection", url: "https://www.hilti.com.au" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "Surface-Mount", label: "Surface-mounted port" },
  { tag: "Drill-In", label: "Drill-in port" },
  { tag: "PU-Injection", label: "PU resin compatible" },
  { tag: "Epoxy-Injection", label: "Epoxy resin compatible" },
  { tag: "Low-Pressure", label: "Low-pressure injection" },
  { tag: "High-Pressure", label: "Higher-pressure rated" },
];

const TECH_INFO = {
  typicalApplications: [
    "Port installation for PU flexible injection of active wet cracks in masonry and concrete foundations",
    "Port installation for epoxy rigid injection of dormant dry cracks in concrete",
    "Surface-mounted ports for masonry crack injection — no drilling through brick faces",
    "Drill-in ports for narrow concrete crack injection requiring higher pressure for penetration",
    "Port installation at 100–300 mm centres along settlement crack length",
  ],
  selectionCriteria: [
    "Surface-mounted ports: use for masonry and for concrete where drilling is not feasible or not desirable",
    "Drill-in ports: use for narrow concrete cracks (< 0.2 mm) where higher injection pressure is required for full resin penetration",
    "Port spacing: 100 mm for very fine cracks; 150–200 mm for medium cracks; 250–300 mm for wider cracks",
    "Confirm port compatibility with the selected resin viscosity — low-pressure ports are not suitable for high-pressure systems",
    "Always inject from the lowest port upward — rising injection confirms crack is filling",
  ],
  whenNotToUse: [
    "Do not use drill-in ports in masonry where drilling requires going through brick faces — this damages the masonry and is not reversible in heritage repair",
    "Do not install surface-mounted ports on dirty, painted, or contaminated surfaces without thorough cleaning — port adhesive will not develop adequate bond",
    "Do not inject before the surface seal between ports has fully cured — injecting through unsealed sections will cause surface blowout",
    "Do not exceed the maximum injection pressure rating for the port type — surface ports in particular will detach under excessive pressure",
    "Crack injection is not a standalone treatment — it is part of a complete repair sequence that must include structural assessment and cause treatment",
  ],
  standardsNotes: [
    "ICRI Technical Guideline 310.3 — Guide for the Selection of Polymer Materials for Crack Repair",
    "ACI 224.1R — Causes, Evaluation, and Repair of Cracks in Concrete Structures",
    "Port installation and injection procedure per resin manufacturer's current TDS and application guide",
    "Injection pump operating pressure typically limited to 0.5 MPa for surface-mounted ports; verify with port supplier",
    "Engineer confirmation of crack cause and repair strategy before port installation",
  ],
  suitableDefects: [
    "PU flexible injection of active water-bearing settlement cracks in masonry and concrete",
    "Epoxy rigid injection of dormant structural settlement cracks in concrete",
    "Crack injection in masonry foundations before structural stitching",
    "Injection port installation in fine-crack networks in concrete from differential settlement",
    "Emergency water-stop injection through surface ports in leaking basement settlement cracks",
  ],
  typicalSubstrates: [
    "Brick and masonry walls — surface-mounted ports only (no brick face drilling)",
    "Reinforced concrete foundations and retaining walls",
    "Concrete structural walls and frames",
    "Concrete masonry block walls",
    "Below-grade concrete elements — basement walls, pits, and retaining structures",
  ],
};

const SYSTEM_COMPARISON = [
  { portType: "Surface-mounted adhesive port", install: "Epoxy-adhered to surface", pressure: "Low (≤ 0.5 MPa)", suitable: "Masonry + concrete", resins: "PU and epoxy" },
  { portType: "Mechanical drill-in port", install: "Drilled 45° into crack plane", pressure: "Low to medium (≤ 2 MPa)", suitable: "Concrete only", resins: "PU and epoxy" },
];

export function CrackInjectionPortsIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><BookOpen size={16} /></div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">Crack injection ports — surface mount vs drill-in, and spacing rules</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">Port type selection, installation, spacing, and sequencing for settlement crack injection</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>Crack injection ports are the access points through which PU flexible or epoxy rigid injection resins enter the crack. Port selection depends on substrate type and required injection pressure. Surface-mounted ports are epoxy-adhered over the crack and are the only practical option for masonry (brick) where drilling through brick faces is not acceptable. Drill-in ports are installed by drilling a 45-degree hole into the concrete to intersect the crack — giving a more secure anchor and allowing higher injection pressures for fine crack penetration.</p>
          <p>Port spacing is determined by crack width: tighter spacing (100 mm) for very fine cracks; 150–200 mm for medium cracks. Injection always proceeds from the lowest port upward — resin rising from the previously injected port confirms the crack between ports is full. Incomplete injection (resin not appearing at the next port) indicates a blockage or wider void — slow the injection rate and allow the resin more time to penetrate.</p>
        </div>
      )}
    </div>
  );
}

export function CrackInjectionPortsProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const [accordionOpen, setAccordionOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (tag: FilterTag) =>
    setActiveFilters((prev) => { const n = new Set(prev); n.has(tag) ? n.delete(tag) : n.add(tag); return n; });

  const filtered = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => p.filterTags.some((t) => activeFilters.has(t)));

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === "left" ? -420 : 420, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter:</span>
        {FILTER_DEFS.map(({ tag, label }) => (
          <button key={tag} onClick={() => toggleFilter(tag)} className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${activeFilters.has(tag) ? "border-red-700 bg-red-700 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-sky-400"}`}>{label}</button>
        ))}
        {activeFilters.size > 0 && <button onClick={() => setActiveFilters(new Set())} className="text-xs font-bold text-red-700 underline">Clear</button>}
      </div>

      <div className="relative">
        <button onClick={() => scroll("left")} className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronLeft size={16} /></button>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none]">
          {filtered.map((p) => (
            <div key={p.name} className="w-[380px] shrink-0 rounded-2xl border border-slate-200 bg-white overflow-hidden" style={{ borderTop: `4px solid ${p.accentColor}` }}>
              <div className="p-5">
                <a href={p.brandUrl} target="_blank" rel="noopener noreferrer" className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-sky-700">{p.fullLabel} ↗</a>
                <h3 className="text-sm font-extrabold leading-snug text-sky-950">{p.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{p.descriptionLine}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{p.productType}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.techChips.map((c) => <span key={c.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${c.cls}`}>{c.label}</span>)}
                </div>
                <CollapsibleDescription text={p.systemDescription} />
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <CollapsibleCardDetails
                    text=""
                    chips={p.filterTags.map((t) => ({ label: t.replace(/-/g, " "), cls: "bg-sky-50 text-sky-700" }))}
                  />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Technical properties</p>
                  <CollapsibleList items={p.technicalProperties} icon="check" limit={3} />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Limitations</p>
                  <CollapsibleList items={p.limitations} icon="x" limit={3} />
                </div>
                <div className="mt-3">
                  <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">Procurement</p>
                  <CollapsibleSources sources={p.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scroll("right")} className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:bg-slate-50"><ChevronRight size={16} /></button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <button onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><Layers size={16} /></div>
            <span className="text-sm font-extrabold text-sky-950">Crack injection ports technical reference</span>
          </div>
          <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-6 pb-6 pt-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <TechCard icon={<Layers size={14} />} title="Typical applications" items={TECH_INFO.typicalApplications} style="bullet" />
              <TechCard icon={<CheckCircle size={14} />} title="Selection criteria" items={TECH_INFO.selectionCriteria} style="check" />
              <TechCard icon={<AlertTriangle size={14} />} title="When NOT to use" items={TECH_INFO.whenNotToUse} style="warn" />
              <TechCard icon={<FileText size={14} />} title="Standards & notes" items={TECH_INFO.standardsNotes} style="bullet" />
              <TechCard icon={<SquareStack size={14} />} title="Suitable defects" items={TECH_INFO.suitableDefects} style="bullet" />
              <TechCard icon={<Ruler size={14} />} title="Typical substrates" items={TECH_INFO.typicalSubstrates} style="bullet" />
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-sm font-extrabold text-sky-950">Port type comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {["Port type", "Installation", "Max pressure", "Suitable substrates", "Resin types"].map((h) => (
                  <th key={h} className="px-3 py-2.5 text-left font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SYSTEM_COMPARISON.map((row) => (
                <tr key={row.portType} className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 font-semibold text-sky-950">{row.portType}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.install}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.pressure}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.suitable}</td>
                  <td className="px-3 py-2.5 text-slate-600">{row.resins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
