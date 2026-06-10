"use client";

import { useState, useRef } from "react";
import {
  Layers, SquareStack, Ruler, ExternalLink,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen,
} from "lucide-react";
import {
  CollapsibleList, CollapsibleDescription, CollapsibleSources,
  CollapsibleCardDetails, TechCard,
  CheckCircle, AlertTriangle,
} from "../../_components/ProductPageShared";

type FilterTag =
  | "F11-structural"
  | "Film-faced"
  | "17mm"
  | "12mm"
  | "Reusable"
  | "Single-use"
  | "Soffit"
  | "Side-form"
  | "AS-6669";

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
    fullLabel: "Carter Holt Harvey / Tilling Timber",
    brandUrl: "https://www.chhwoodproducts.co.nz",
    accentColor: "#0369a1",
    name: "Ecoply F11 — 17 mm Structural Formwork Plywood",
    descriptionLine: "F11 17 mm structural formwork plywood — the standard specification for beam soffit, column, and slab edge formwork in remedial concrete repair",
    productType: "F11 17 mm structural plywood — concrete formwork and boxing",
    filterTags: ["F11-structural", "17mm", "Reusable", "Soffit", "Side-form", "AS-6669"],
    techChips: [
      { label: "F11 structural grade", cls: "bg-sky-100 text-sky-800" },
      { label: "17 mm thickness", cls: "bg-slate-100 text-slate-700" },
      { label: "AS/NZS 6669 certified", cls: "bg-green-50 text-green-700" },
      { label: "Reusable 3–5 pours", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ecoply F11 17 mm structural formwork plywood from Carter Holt Harvey is the standard specification for concrete formwork used in remedial concrete spalling repair in Australia. F11 denotes a minimum face grade that is appropriate for structural formwork — the plywood is stress-graded with a minimum MOR (modulus of rupture) of 11 MPa in the face direction. At 17 mm thickness, F11 plywood provides sufficient stiffness and bending strength to span between formwork bearers without excessive deflection under fresh concrete and mortar pressure, and to resist the hydrostatic pressure of repair mortar in column and wall forms. Ecoply is available from Bowens, Bunnings Trade, and timber merchants nationally in 2400 x 1200 mm sheets. In remedial repair work, 17 mm F11 plywood is cut to size for side forms on slab edges, boxing for column base repairs, and soffit support forms for beam and soffit repairs. Apply a water-based release agent to the ply face before each pour and allow to dry before placing mortar. Plywood in good condition can be reused 3–5 pours before face delamination reduces surface quality.",
    technicalProperties: [
      "F11 structural grade — stress-graded plywood — AS/NZS 6669 certification",
      "17 mm thickness — standard for concrete formwork — sufficient stiffness for most remedial repair forms",
      "2400 x 1200 mm standard sheet — cut to size on site — available nationally",
      "Reusable 3–5 pours with release agent — replace when face delaminates or warps significantly",
    ],
    limitations: [
      "Do not use unbranded or non-rated plywood for structural formwork — confirm F11 or better stress grade from supplier documentation",
      "Plywood warps if stored flat in direct sun or wet conditions — store on edge under cover — warped sheets produce bowed form faces and uneven repair mortar surfaces",
      "Do not leave formwork in contact with fresh concrete longer than 24 hours in summer without releasing — extended contact in heat causes the mortar to bond firmly to the ply face and increases risk of surface damage on stripping",
      "Damaged or delaminated face plies produce poor-quality mortar surfaces — replace sheets showing face delamination before use",
    ],
    procurementSources: [
      { name: "Bowens Timber — nationally", url: "https://www.bowens.com.au" },
      { name: "Bunnings Trade — formwork plywood nationally", url: "https://www.bunnings.com.au/trade" },
      { name: "Carter Holt Harvey via timber merchants", url: "https://www.chhwoodproducts.co.nz" },
    ],
  },
  {
    fullLabel: "Austral Ply / Tilling / Pacific Ply",
    brandUrl: "https://www.australply.com.au",
    accentColor: "#16a34a",
    name: "Austral Ply F11 — 12 mm Structural Formwork Plywood",
    descriptionLine: "F11 12 mm structural plywood for lighter-duty formwork applications — slab edge side forms, light boxing, and shallow beam forms in remedial repair",
    productType: "F11 12 mm structural plywood — light-duty formwork and boxing",
    filterTags: ["F11-structural", "12mm", "Reusable", "Side-form", "AS-6669"],
    techChips: [
      { label: "F11 structural grade", cls: "bg-green-100 text-green-800" },
      { label: "12 mm thickness", cls: "bg-slate-100 text-slate-700" },
      { label: "Lighter and easier cut", cls: "bg-amber-50 text-amber-700" },
      { label: "Lower pressure forms", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "F11 12 mm structural plywood is used in remedial repair work for lighter-duty formwork applications where the full rigidity of 17 mm is not required — shallow slab edge side forms, column side forms with close bearer spacing, light boxing around small repair patches, and temporary containment forms for repair mortar. At 12 mm thickness, the plywood is lighter and easier to cut and handle than 17 mm grade — this is a practical advantage when working in restricted access areas such as carpark columns, beam soffits, and balcony edges where space is limited and sheets must be lifted and fixed in tight locations. Use 12 mm F11 only where bearer spacing is close enough to prevent mid-span bending — a 12 mm sheet spanning more than 300–400 mm between bearers under fresh mortar pressure will deflect visibly. Available from Austral Ply, Tilling Timber, Pacific Ply, and trade timber merchants nationally.",
    technicalProperties: [
      "F11 structural grade — 12 mm thickness — lighter than 17 mm — easier handling in confined access areas",
      "Suitable for shallow slab edge forms, column boxing, and light-duty containment forms",
      "Limit span between bearers to 300–400 mm to prevent mid-span deflection under mortar pressure",
      "Apply release agent before each pour — reusable 3–5 pours in good condition",
    ],
    limitations: [
      "Do not use 12 mm plywood for column or wall forms with large mortar head (greater than 600–800 mm) without structural design — hydrostatic pressure from tall mortar fills requires 17 mm or thicker ply with close bearer spacing",
      "12 mm ply is more prone to warping than 17 mm when wet — store on edge under cover and check for flatness before use",
      "The face grade of F11 12 mm may be lower (more knots, patches) than premium formwork plywood — select sheets with clean faces for exposed mortar work",
      "Confirm F11 certification — off-grade or non-rated 12 mm ply is sometimes substituted and may not perform structurally under concrete pressure",
    ],
    procurementSources: [
      { name: "Austral Ply — trade timber merchants nationally", url: "https://www.australply.com.au" },
      { name: "Bunnings Trade — 12 mm structural ply nationally", url: "https://www.bunnings.com.au/trade" },
      { name: "Bowens Timber and independent timber merchants", url: "https://www.bowens.com.au" },
    ],
  },
  {
    fullLabel: "Film-Faced Formply (Various Brands)",
    brandUrl: "https://www.bowens.com.au",
    accentColor: "#7c3aed",
    name: "Film-Faced Formply — 17/18 mm Reusable Form Panel",
    descriptionLine: "Phenolic film-faced structural plywood for high-reuse formwork — smooth concrete face and extended reuse (8–20+ pours) in column and wall applications",
    productType: "Film-faced phenolic formply — high-reuse formwork — smooth face finish",
    filterTags: ["Film-faced", "17mm", "Reusable", "Soffit", "Side-form"],
    techChips: [
      { label: "Film-faced phenolic", cls: "bg-purple-100 text-purple-800" },
      { label: "8–20+ reuse", cls: "bg-green-100 text-green-800" },
      { label: "Smooth face finish", cls: "bg-slate-100 text-slate-700" },
      { label: "Reduced release agent", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Film-faced formply is structural plywood with a hard phenolic film bonded to both faces. The film face provides a smooth, non-porous surface that resists moisture absorption, reduces concrete adhesion, and gives a high-quality smooth finish on the cast concrete face. Film-faced formply can typically be reused 8–20+ pours (depending on edge protection and site handling) compared to 3–5 pours for uncoated F11 ply. In remedial repair work, film-faced formply is cost-effective when the same form configuration will be reused multiple times — for example, when repairing a series of identical columns or beam soffits on a project with multiple identical elements. The phenolic film face requires less release agent than uncoated ply — apply a thin coat of water-based release agent before each pour and allow to dry. Film-faced formply is available from trade timber merchants and concrete formwork suppliers nationally in 17 mm and 18 mm thicknesses. Edge sealing is important — the edges of film-faced ply must be sealed with edge tape or sealant to prevent moisture ingress and delamination of the phenolic film at edges.",
    technicalProperties: [
      "Phenolic film face bonded to structural plywood substrate — smooth, non-porous face — high-quality concrete surface finish",
      "Reuse 8–20+ pours — significantly longer service life than uncoated F11 ply",
      "17 mm and 18 mm thicknesses — structural grade substrate — for column, wall, and soffit forms",
      "Requires edge sealing — tape or sealant on all cut edges to prevent moisture ingress",
    ],
    limitations: [
      "Edge sealing is critical — unprotected cut edges absorb moisture and cause delamination of the phenolic film from the substrate — this ruins the face quality and makes stripping difficult",
      "More expensive than uncoated F11 ply — cost-effective only when the same form configuration is reused multiple times on a project",
      "Damaged film face (cut, gouged, or torn areas) cannot be repaired to the same quality — damaged sheets should be rejected for exposed concrete face work",
      "Do not use heavy release agents or petroleum oils on film-faced ply — they damage the film and reduce service life — use water-based reactive release agents only",
    ],
    procurementSources: [
      { name: "Bowens Timber — film-faced formply nationally", url: "https://www.bowens.com.au" },
      { name: "Concrete formwork suppliers nationally", url: "https://www.bowens.com.au" },
      { name: "Bunnings Trade and trade timber merchants", url: "https://www.bunnings.com.au/trade" },
    ],
  },
  {
    fullLabel: "Generic F11 — Timber Merchants",
    brandUrl: "https://www.mitre10.com.au",
    accentColor: "#374151",
    name: "Generic F11 Structural Plywood — Trade Supply",
    descriptionLine: "Unbranded F11 structural plywood from local timber merchants — acceptable for single-use rough formwork where surface finish is not critical",
    productType: "F11 structural plywood — general trade supply — single-use rough formwork",
    filterTags: ["F11-structural", "17mm", "12mm", "Single-use", "Side-form"],
    techChips: [
      { label: "F11 grade — confirm cert.", cls: "bg-slate-100 text-slate-700" },
      { label: "Trade merchant supply", cls: "bg-slate-100 text-slate-700" },
      { label: "Single-use applications", cls: "bg-amber-50 text-amber-700" },
      { label: "Verify stress grade", cls: "bg-red-50 text-red-700" },
    ],
    systemDescription:
      "Generic F11 structural plywood from local and independent timber merchants is acceptable for concrete formwork in remedial repair where the structural grade is confirmed from supplier documentation. The key requirement is that the plywood must be certified as F11 (or equivalent) structural grade — the F11 designation confirms that the plywood has been stress-graded and meets the minimum structural performance requirements for concrete formwork. Non-rated or off-grade plywood should not be used for structural concrete formwork. In Australian remedial repair, generic F11 ply is commonly used for single-use boxing and containment forms for patch repairs, temporary support forms, and protection boarding that does not need to be reused. For these applications, the face quality is less critical than for exposed concrete work. Confirm F11 certification from supplier documentation before using any plywood as structural concrete formwork — do not assume that plywood from a hardware store is structurally rated without checking the grade markings on the sheet or the supplier's documentation.",
    technicalProperties: [
      "F11 structural grade — confirm certification from supplier documentation or grade marking on sheet",
      "17 mm (standard formwork) or 12 mm (light duty) thicknesses",
      "Suitable for single-use rough boxing, containment forms, and protection boarding",
      "Trade merchant supply — widely available — lower cost than branded structural formply",
    ],
    limitations: [
      "Verify F11 certification — non-rated or decorative plywood from trade merchants can look identical to structural grade and may be substituted without notice",
      "Not recommended for high-quality concrete face work — face grade and knot density in generic trade supply varies between batches",
      "Lower reuse life than branded or film-faced formply — face delamination and warping are more common in lower-grade sheets",
      "Check for moisture damage and warping at point of purchase — reject damp, warped, or delaminated sheets",
    ],
    procurementSources: [
      { name: "Mitre 10 and independent timber merchants — nationally", url: "https://www.mitre10.com.au" },
      { name: "Bunnings Trade — structural plywood nationally", url: "https://www.bunnings.com.au/trade" },
      { name: "Local and regional timber merchants", url: "https://www.mitre10.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "F11-structural", label: "F11 structural" },
  { id: "Film-faced", label: "Film faced" },
  { id: "17mm", label: "17 mm" },
  { id: "12mm", label: "12 mm" },
  { id: "Reusable", label: "Reusable" },
  { id: "Single-use", label: "Single use" },
  { id: "Soffit", label: "Soffit" },
  { id: "Side-form", label: "Side form" },
  { id: "AS-6669", label: "AS/NZS 6669" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Ecoply F11 17 mm",
    facetype: "Uncoated veneer face",
    reuse: "3–5 pours",
    supply: "Bowens, Bunnings Trade",
    notes: "Standard for most remedial formwork — soffits, column boxing, slab edges",
  },
  {
    product: "Austral Ply F11 12 mm",
    facetype: "Uncoated veneer face",
    reuse: "3–5 pours",
    supply: "Austral Ply, timber merchants",
    notes: "Light duty — limit bearer span — easier handling in confined access",
  },
  {
    product: "Film-Faced Formply 17 mm",
    facetype: "Phenolic film — smooth",
    reuse: "8–20+ pours",
    supply: "Formwork suppliers, Bowens",
    notes: "High-reuse — cost-effective for repeated same-form pours — seal edges",
  },
  {
    product: "Generic F11 Trade Supply",
    facetype: "Uncoated — variable face",
    reuse: "1–3 pours",
    supply: "Mitre 10, independent merchants",
    notes: "Confirm F11 certification — single-use boxing and rough containment forms",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Slab edge side forms — boxing up deteriorated slab edges before casting repair mortar",
    "Column base boxing — forms around column base repairs where mortar must be cast to a confined shape",
    "Beam soffit formwork — temporary support and containment for cast repair mortar on beam soffits",
    "Wall and parapet boxing — side forms for parapet cap repairs and wall face reinstatement",
    "Curved or shaped boxing — film-faced formply for column and pier forms requiring high-quality face finish",
    "Precast component reinstatement — form panels for casting replacement corbels, fins, and precast details",
  ],
  selectionCriteria: [
    "17 mm F11 — standard selection for slab edge, column, beam soffit, and wall formwork — sufficient stiffness and strength for most remedial repair pour heads",
    "12 mm F11 — use for lighter-duty slab edge side forms and small boxing where reduced weight is a handling advantage and bearer spacing is 300–400 mm maximum",
    "Film-faced formply — select where the same form will be reused 5+ pours and/or a smooth, high-quality concrete face finish is required",
    "Generic F11 trade supply — acceptable for single-use rough containment boxing — always confirm F11 grade certification",
    "Confirm F11 structural grade from supplier documentation before specifying any plywood as concrete formwork",
    "Use water-based release agent (Sika Separol WB or Fosroc Ronaform) on all ply formwork — apply thin coat to dry ply face and allow to dry before placing mortar",
  ],
  limitations: [
    "Do NOT use non-rated or decorative plywood for structural concrete formwork — it may look identical to F11 grade but will not provide equivalent bending strength and stiffness under mortar pressure",
    "Warped plywood produces bowed or uneven form faces — store plywood on edge, under cover, off the ground — reject warped sheets before use",
    "Unprotected edges on film-faced formply absorb moisture and delaminate — seal all cut edges with tape or edge sealant",
    "Do not leave formwork bearing on fresh concrete longer than required — strip at the earliest safe time to allow early inspection and remediation of any surface defects",
    "Petroleum oils and diesel damage plywood face veneers and ply adhesive — use water-based release agents only on plywood formwork",
    "In summer, plywood in direct sun can reach temperatures that cause release agent to evaporate before mortar is placed — apply release agent in the shade or just before placing mortar",
  ],
  standardsNotes: [
    "AS/NZS 6669 — Plywood — Formwork — Australian and New Zealand standard for plywood used as structural formwork — F11 grade minimum for most remedial concrete formwork",
    "AS 3610 — Formwork for Concrete — design and specification standard for concrete formwork — governs plywood selection, bearer sizing, and tie requirements",
    "AS 3600 — Concrete Structures — references formwork design requirements including deflection limits under concrete pressure",
    "F11 stress grade — the minimum structural rating for formwork plywood — 'F' grades are stress grades in the Australian timber grading system — F11 = 11 MPa minimum MOR",
    "Film-faced formply — typically supplied to AS/NZS 6669 with phenolic film in accordance with DIN 68705 Part 3 (Europe) or equivalent",
  ],
  suitableDefects: [
    "Concrete spalling — primary application — forming up slab edge, column, beam, and soffit repairs",
    "Settlement cracks — forming up crack injection ports and patch infill repairs where mortar must be confined",
    "Slab edge deterioration — side form boxing for cast reinstatement of slab edge profiles",
    "Column base corrosion repairs — boxing forms around column pedestal repairs",
    "Precast element reinstatement — form panels for casting replacement sections in precast concrete repairs",
  ],
  typicalSubstrates: [
    "Existing concrete surfaces where formwork is fixed — forms must be sealed to existing concrete at all edges to prevent mortar blowout",
    "Steel form hangers and tie systems — ply forms are typically fixed to steel hangers, props, or tie rods anchored into the existing structure",
    "Timber bearer and stringer systems — ply faces are supported by timber or steel bearers at the design span",
    "Repair mortar contact face — apply release agent to ply face before each pour to ensure clean formwork stripping",
  ],
};

export function FormworkPlywoodIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Formwork plywood in concrete spalling repair</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Structural formwork plywood (F11 grade or better) is used in concrete spalling repair wherever fresh repair mortar or concrete must be cast into a shape that cannot be formed by hand — slab edge side forms, column boxing, beam soffit forms, and parapet cap forms. The plywood must be structurally rated for concrete formwork — F11 is the minimum grade specified in AS/NZS 6669 and AS 3610 for plywood used as structural formwork in Australia. At 17 mm thickness, F11 plywood provides the stiffness and bending strength required to contain the hydrostatic pressure of fresh repair mortar without excessive deflection.
        </p>
        {expanded && (
          <>
            <p>
              Apply a water-based release agent to the ply face before each pour and allow to dry — this is essential for clean form stripping without surface damage and for extending the reuse life of the sheets. Film-faced formply (phenolic film face) is the preferred option for high-reuse formwork where the same form configuration will be used multiple times on a project — it strips more cleanly, produces a smoother concrete face, and lasts 8–20+ pours before replacement.
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

export function FormworkPlywoodProductSection() {
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
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
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
            <p className="mt-1 text-sm text-slate-500">4 formwork plywood grades — F11 17 mm, F11 12 mm, film-faced, and generic trade supply — scroll to view all</p>
          </div>
        </div>

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

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll for more
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
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
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

      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">System Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of formwork plywood grades for concrete spalling repair. Confirm F11 certification from supplier documentation before use.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Face Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Reuse</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supply</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.facetype}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.reuse}</td>
                  <td className="px-4 py-3 text-slate-600">{row.supply}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
