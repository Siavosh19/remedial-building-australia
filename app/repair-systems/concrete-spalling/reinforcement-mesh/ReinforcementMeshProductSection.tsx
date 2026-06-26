"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";

type FilterTag = "316-SS" | "304-SS" | "Welded-Mesh" | "Sheet" | "Chloride-Resistant" | "Slab-Edge" | "Supplementary-Reinforcement";

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
    fullLabel: "InfraBuild (OneSteel) Australia",
    brandUrl: "https://www.infrabuild.com",
    accentColor: "#0369a1",
    name: "InfraBuild 316 Stainless Steel Welded Wire Mesh",
    descriptionLine: "Grade 316 stainless steel welded wire reinforcement mesh — corrosion-resistant supplementary reinforcement for slab edge repair in chloride environments — 2400×1200 mm sheets",
    productType: "316 SS welded wire reinforcement mesh — supplementary reinforcement — slab edge",
    filterTags: ["316-SS", "Welded-Mesh", "Sheet", "Chloride-Resistant", "Slab-Edge", "Supplementary-Reinforcement"],
    techChips: [
      { label: "Grade 316 SS", cls: "bg-sky-100 text-sky-800" },
      { label: "Welded wire mesh", cls: "bg-slate-100 text-slate-700" },
      { label: "Chloride-resistant", cls: "bg-green-50 text-green-700" },
      { label: "2400×1200 mm sheet", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "InfraBuild (formerly OneSteel) supplies grade 316 stainless steel welded wire reinforcement mesh in standard 2400×1200 mm sheets for supplementary reinforcement in concrete slab edge repairs. Grade 316 SS mesh is specified in slab edge repair when: (1) the existing reinforcement has been exposed and treated but the concrete cover will be less than 40 mm after repair — the minimum cover to protect carbon steel from carbonation and chloride in exposed coastal environments; (2) the structural engineer specifies supplementary reinforcement to supplement the bonded repair mortar; or (3) the slab is in a high chloride exposure class (BS C or worse per AS 3600) where even well-covered carbon steel may be at risk over the design life. SS mesh is placed in the repair void after the exposed existing steel has been cleaned and treated with corrosion inhibitor primer. Spacers or clip ties hold the mesh in position to achieve minimum 30 mm cover from the repair surface. Apply the bonding primer over the prepared substrate around the mesh, then place the repair mortar. Confirm wire diameter, aperture spacing, and applicable Australian Standards for stainless steel reinforcement with InfraBuild before ordering.",
    technicalProperties: [
      "Grade 316 stainless steel — corrosion-resistant in chloride and coastal environments",
      "Welded wire mesh — consistent geometry — 2400×1200 mm sheets — cut to size on site",
      "Minimum 30 mm cover from repair mortar surface — maintain using plastic spacers or clip ties",
      "Used as supplementary reinforcement in repair mortar where existing cover is insufficient",
      "High resistance to chloride-induced corrosion — suitable for high chloride exposure classes",
      "Confirm wire diameter and aperture from InfraBuild — multiple mesh grades available",
    ],
    limitations: [
      "Stainless steel mesh is significantly more expensive than carbon steel mesh — specify only where required by engineer",
      "Do not use 304 SS grade in high-chloride environments — specify 316 SS minimum",
      "Minimum concrete cover of 30 mm must be maintained from mesh to repair surface",
      "Confirm structural requirement with project structural engineer before specifying supplementary mesh",
      "Do not substitute welded wire mesh with loose tie wire or non-structural mesh products",
    ],
    procurementSources: [
      { name: "InfraBuild (OneSteel) — steel distribution nationally", url: "https://www.infrabuild.com" },
      { name: "Steel reinforcement suppliers — confirm 316 SS mesh availability", url: "https://www.infrabuild.com" },
    ],
  },
  {
    fullLabel: "Midalia Steel Australia",
    brandUrl: "https://www.midaliasteel.com.au",
    accentColor: "#be123c",
    name: "Midalia Steel 316 SS Welded Reinforcement Mesh",
    descriptionLine: "Grade 316 stainless steel welded wire mesh — supplementary reinforcement for slab edge repair — various sheet sizes — Midalia Steel national distribution",
    productType: "316 SS welded wire mesh — supplementary reinforcement — Midalia Steel",
    filterTags: ["316-SS", "Welded-Mesh", "Sheet", "Chloride-Resistant", "Slab-Edge", "Supplementary-Reinforcement"],
    techChips: [
      { label: "Grade 316 SS", cls: "bg-rose-100 text-rose-800" },
      { label: "Various sheet sizes", cls: "bg-slate-100 text-slate-700" },
      { label: "Midalia distribution", cls: "bg-green-50 text-green-700" },
    ],
    systemDescription:
      "Midalia Steel distributes grade 316 stainless steel welded wire reinforcement mesh in various sheet sizes for supplementary reinforcement in concrete repair applications. Midalia has branches nationally and stocks both standard and cut-to-order mesh in 304 and 316 stainless steel grades. For slab edge repair in corrosive or coastal environments, specify grade 316 only — not 304. The mesh is cut to size on site with stainless steel wire cutters or angle grinder with SS cutting disc. Position in the repair void using plastic spacers to maintain minimum 30 mm cover before placing repair mortar. Confirm wire diameter, aperture size, sheet sizes, and current stock availability from the nearest Midalia Steel branch before ordering. Engineering confirmation is required before specifying supplementary mesh in structural slab edge repair — the mesh placement details (position, cover, ties) are part of the structural repair specification.",
    technicalProperties: [
      "Grade 316 SS welded wire mesh — multiple sheet sizes available from Midalia branches",
      "Cut to size on site — stainless steel wire cutters or angle grinder with SS disc",
      "Maintain minimum 30 mm cover from repair mortar surface using plastic spacers",
      "National branch network — confirm local stock with nearest Midalia Steel branch",
      "Specify 316 grade only for chloride and coastal exposure — not 304",
    ],
    limitations: [
      "Confirm structural requirement with project engineer before specifying supplementary mesh",
      "Confirm current 316 SS mesh stock with nearest Midalia branch — not all sheet sizes held locally",
      "Do not use 304 grade in high-chloride or marine environments",
      "Minimum 30 mm cover is mandatory — confirm this is achievable in the repair geometry before specifying mesh",
    ],
    procurementSources: [
      { name: "Midalia Steel — branches nationally", url: "https://www.midaliasteel.com.au" },
      { name: "Midalia Steel — confirm local branch stock", url: "https://www.midaliasteel.com.au" },
    ],
  },
  {
    fullLabel: "Stainless Steel Specialists Australia",
    brandUrl: "https://www.stainlesssteelspecialists.com.au",
    accentColor: "#15803d",
    name: "Stainless Steel Specialists — 316 SS Welded Mesh",
    descriptionLine: "Specialist stainless steel supplier — grade 316 welded wire mesh in custom sizes — supplementary reinforcement for concrete slab edge and balcony repair",
    productType: "316 SS welded wire mesh — specialist supply — supplementary reinforcement",
    filterTags: ["316-SS", "Welded-Mesh", "Sheet", "Chloride-Resistant", "Slab-Edge", "Supplementary-Reinforcement"],
    techChips: [
      { label: "Grade 316 SS", cls: "bg-green-100 text-green-800" },
      { label: "Custom sizes available", cls: "bg-slate-100 text-slate-700" },
      { label: "Specialist stainless", cls: "bg-blue-50 text-blue-700" },
    ],
    systemDescription:
      "Stainless Steel Specialists Australia is a specialist stainless steel supplier offering grade 316 welded wire mesh in standard and custom sizes for supplementary reinforcement in concrete repair and construction applications. For slab edge repair on balconies and carparks in coastal or chloride environments, specialist suppliers can provide mesh in non-standard aperture sizes or custom-cut panels where the geometry of the repair void requires a shape that is not efficiently cut from a standard 2400×1200 mm sheet. This reduces waste when repairs are of irregular shape or small area. Confirm grade 316 specification, wire diameter, aperture, and available sizes before ordering. Specialist stainless steel suppliers are used when standard steel merchants cannot supply the specific mesh product required for the project specification. Engineering confirmation of mesh specification is required before order.",
    technicalProperties: [
      "Grade 316 SS welded wire mesh — specialist stainless steel supply",
      "Custom and non-standard sizes available — reduces waste on irregular repair areas",
      "Suitable for supplementary reinforcement in slab edge repair voids",
      "Confirm wire diameter, aperture, and current availability before ordering",
    ],
    limitations: [
      "Confirm engineering specification before ordering — mesh grade, wire diameter, and aperture must match specification",
      "Lead time on custom sizes — order early in the repair programme",
      "Minimum 30 mm cover from mesh to repair surface mandatory",
      "Confirm current product range with Stainless Steel Specialists before specifying",
    ],
    procurementSources: [
      { name: "Stainless Steel Specialists Australia", url: "https://www.stainlesssteelspecialists.com.au" },
    ],
  },
  {
    fullLabel: "Mtalex / Various Trade",
    brandUrl: "https://www.mtalex.com.au",
    accentColor: "#78716c",
    name: "Mtalex 316 SS Welded Mesh — Various Sizes",
    descriptionLine: "Grade 316 stainless steel welded wire mesh — supplementary reinforcement — various mesh sizes — Mtalex stainless steel supply",
    productType: "316 SS welded wire mesh — Mtalex stainless steel supply",
    filterTags: ["316-SS", "Welded-Mesh", "Sheet", "Chloride-Resistant", "Supplementary-Reinforcement"],
    techChips: [
      { label: "Grade 316 SS", cls: "bg-stone-100 text-stone-700" },
      { label: "Mtalex supply", cls: "bg-slate-100 text-slate-700" },
      { label: "Various sizes", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Mtalex supplies grade 316 stainless steel welded wire mesh in various sheet sizes for use in supplementary concrete reinforcement applications including slab edge repair. Mtalex provides stainless steel products nationally and can source specific mesh grades on order. For slab edge repair applications, specify grade 316 (not 304) for chloride resistance in external and coastal environments. Confirm current stock, wire diameter, aperture, and available sheet sizes with Mtalex before ordering. Engineering confirmation of mesh type and placement is required before application in structural slab edge repair.",
    technicalProperties: [
      "Grade 316 SS welded wire mesh — various sheet sizes",
      "Stainless steel supply — Mtalex national sourcing",
      "Confirm current stock and available sizes before ordering",
    ],
    limitations: [
      "Confirm grade 316 (not 304) before ordering for chloride environments",
      "Confirm current product availability with Mtalex before specifying",
      "Engineering confirmation required for supplementary reinforcement placement",
    ],
    procurementSources: [
      { name: "Mtalex — stainless steel supply", url: "https://www.mtalex.com.au" },
    ],
  },
];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "316-SS", label: "Grade 316 SS" },
  { tag: "304-SS", label: "Grade 304 SS" },
  { tag: "Welded-Mesh", label: "Welded mesh" },
  { tag: "Sheet", label: "Sheet form" },
  { tag: "Chloride-Resistant", label: "Chloride resistant" },
  { tag: "Slab-Edge", label: "Slab edge" },
  { tag: "Supplementary-Reinforcement", label: "Supplementary reinf." },
];

const TECH_INFO = {
  typicalApplications: [
    "Supplementary reinforcement in slab edge repair voids where cover to existing steel is insufficient",
    "Added reinforcement in high-chloride or coastal exposure slab edge repairs",
    "Engineer-specified supplementary reinforcement in structural slab edge repair",
    "Repair of balcony fascia beam edges where existing steel has been fully replaced",
    "Corrosion-damaged reinforcement zone where new supplementary bars and mesh are required",
  ],
  selectionCriteria: [
    "Grade 316 SS — not 304 — for all external, chloride, or coastal exposure applications",
    "Wire diameter and aperture to match structural engineer's specification",
    "Sheet size to minimise waste relative to repair area geometry",
    "Minimum 30 mm concrete cover from mesh to repair mortar surface — confirm in repair geometry",
    "Engineering confirmation is mandatory before specifying supplementary mesh in structural repair",
  ],
  limitations: [
    "Never specify supplementary mesh without structural engineering confirmation — mesh placement affects structural capacity of the repair",
    "Minimum 30 mm cover to mesh from repair surface is mandatory — less cover is insufficient to protect against carbonation",
    "Grade 316 SS mandatory for chloride environments — 304 SS will corrode in coastal and marine exposure",
    "Mesh must be held in position with spacers during mortar placement — mesh that moves during compaction loses its designed cover",
    "Do not use as a substitute for replacing structurally deficient reinforcement — supplementary mesh adds tensile capacity but does not replace corroded main bars",
  ],
  standardsNotes: [
    "AS 3600 — Table 4.10.3 — exposure class and minimum concrete cover requirements for reinforcement",
    "AS/NZS 4671 — Steel reinforcing materials — confirm if stainless steel mesh meets relevant classification",
    "AS 1554.6 — Welding of stainless steel structural members — relevant if mesh is welded on site",
    "Engineer of record must confirm supplementary reinforcement details and cover requirements",
  ],
  suitableDefects: [
    "Slab edge spalling with exposed and severely corroded reinforcement",
    "Corrosion-driven cover loss at balcony slab edges requiring supplementary reinforcement",
    "Fascia beam structural repair requiring additional tensile reinforcement",
    "Any slab edge repair where the engineer specifies supplementary mesh reinforcement",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete slab edges after breakout and preparation",
    "Precast concrete panel edges after structural repair preparation",
    "Balcony fascia beams with corrosion-damaged reinforcement zone",
    "Carpark deck edges with chloride-contaminated concrete after breakout",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "InfraBuild 316 SS mesh", brand: "InfraBuild", grade: "316 SS", sizes: "2400×1200 mm standard", note: "National distribution — order in advance" },
  { product: "Midalia Steel 316 mesh", brand: "Midalia Steel", grade: "316 SS", sizes: "Various — confirm branch", note: "National branch network" },
  { product: "SS Specialists mesh", brand: "SS Specialists", grade: "316 SS", sizes: "Custom and standard", note: "Custom sizes available — allow lead time" },
  { product: "Mtalex SS mesh", brand: "Mtalex", grade: "316 SS", sizes: "Various", note: "Confirm current stock before ordering" },
];

export function ReinforcementMeshIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700"><BookOpen size={16} /></div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">When supplementary stainless steel mesh is required in slab edge repair</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">The cover, chloride exposure, and engineering triggers for specifying 316 SS mesh in slab edge voids</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>Supplementary stainless steel mesh is not routinely included in every slab edge repair — it is specified by the structural engineer where the repair void geometry or the degree of reinforcement corrosion means that the bonded repair mortar alone cannot achieve the required structural performance over the design life.</p>
          <p>The three most common triggers are: (1) Insufficient cover — where breakout of spalled concrete has removed the existing concrete cover and there is insufficient depth to reinstate full cover over the existing corroded bars after treatment; (2) Replacement reinforcement — where the structural engineer has determined that the existing corroded bars have lost too much section to remain as structural elements and supplementary bars or mesh must be installed; (3) High chloride exposure — where the slab edge is in direct marine spray or de-icing salt exposure and the engineer specifies SS mesh to eliminate the future corrosion cycle regardless of the repair mortar cover achieved.</p>
          <p>Grade 316 stainless steel is mandatory for all external and chloride-exposed applications. Grade 304 is not suitable in coastal or marine environments — it will corrode. Minimum 30 mm cover from the mesh to the repair surface is required. All supplementary mesh placement must be confirmed by the structural engineer before proceeding.</p>
        </div>
      )}
    </div>
  );
}

const DESIGN_CRITERIA = "Steel type & corrosion duty \u2014 carbon D500 (welded mesh / deformed bar) vs 316 stainless (chloride-exposed, splash/coastal supplementary reinforcement); grade & ductility class to AS/NZS 4671 (D500L mesh / D500N bar, L vs N ductility); bar diameter & pitch (6/8 mm mesh, N12/N16 bar, trench mesh L8/L11TM); cross-sectional steel area (mm\u00b2/m) to engineer design (AS 3600); cover requirement & exposure classification (AS 3600 Table \u2014 A1\u2013C2 / cover for durability); lap/development length & tie/weld detailing; compatibility/galvanic isolation when stainless adjacent to carbon steel; chloride & carbonation environment; bend/fabrication & sheet/bar size; concrete cover vs repair depth in patch repairs.";

export function ReinforcementMeshProductSection() {
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
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? "Hide detail" : "Show detail"} <ChevronDown size={14} className={`transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
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

      <AutoProductReference products={PRODUCTS} designCriteria={DESIGN_CRITERIA} sectionLabel="Concrete spalling" criteriaKey="concrete-spalling/reinforcement-mesh" />
    </>
  );
}
