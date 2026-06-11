"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Standing-seam"
  | "Metal-profiled"
  | "Colorbond"
  | "Zinc"
  | "Copper"
  | "Stainless"
  | "Non-combustible"
  | "NCC-2022"
  | "Coastal"
  | "Concealed-fix"
  | "Roll-formed"
  | "AS-1562"
  | "Industrial";

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
    fullLabel: "BlueScope Steel — Colorbond",
    brandUrl: "https://www.bluescopesteel.com.au",
    tdsUrl: "https://www.bluescopesteel.com.au/products/colorbond-steel",
    accentColor: "#e2003a",
    name: "Colorbond Steel — Standing Seam Wall Cladding",
    descriptionLine: "Colorbond pre-painted steel standing seam wall cladding — roll-formed profiled panels — non-combustible — NCC 2022 compliant — Australian iconic brand — wide colour range — concealed-fix",
    productType: "Colorbond steel standing seam wall cladding — non-combustible — roll-formed",
    filterTags: ["Standing-seam", "Metal-profiled", "Colorbond", "Non-combustible", "NCC-2022", "Coastal", "Concealed-fix", "Roll-formed", "AS-1562"],
    techChips: [
      { label: "Non-combustible", cls: "bg-red-100 text-red-800" },
      { label: "Colorbond", cls: "bg-amber-100 text-amber-700" },
      { label: "NCC 2022 compliant", cls: "bg-green-100 text-green-700" },
      { label: "Concealed-fix", cls: "bg-sky-100 text-sky-800" },
      { label: "Coastal rated", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Colorbond pre-painted Zincalume steel standing seam wall cladding from BlueScope Steel is the benchmark metal profiled cladding system for Australian industrial, commercial, and Class 2 residential buildings. Roll-formed from Colorbond steel (Zincalume base with pre-painted PVDF or acrylic coating), it is non-combustible under NCC 2022 and available in a range of standard Colorbond colours. Standing seam profiles use a concealed clip system with no exposed fasteners on the weather face, creating a clean vertical or horizontal facade expression. Available in a range of standard profiles including 25/75/150/200 mm flat-seam and curved profiles through local rollformers. AS 1562.1 compliant design. Widely used for cladding replacement on Class 2 buildings in industrial precincts and contemporary residential towers.",
    technicalProperties: [
      "Non-combustible steel substrate — NCC 2022 compliant for external walls of Class 2–9 buildings",
      "Colorbond pre-painted finish — PVDF or polyester coating — Colorbond standard colour range",
      "Standing seam concealed-clip fix — no exposed fasteners on facade weather face",
      "AS 1562.1 compliant design — confirm profile and fastener pattern with rollformer",
      "Zincalume base — superior corrosion resistance including coastal environments with Colorbond coastal grades",
      "Roll-formed to project-specific panel lengths — continuous panels from eave to base reduce joints",
    ],
    limitations: [
      "Thermal expansion is significant — a 6 m Colorbond panel expands approximately 6 mm over 50°C temperature swing — must be accommodated in clip and joint design",
      "Metal facades transmit sound — rain noise on metal profiled cladding is a known amenity issue in occupied Class 2 buildings",
      "Colorbond colour range is fixed — custom colours not available; colour must be selected from standard Colorbond palette",
      "Profile depth and shadow line appearance differ significantly from ACP — facade appearance will not replicate original ACP",
      "Dents and dings from hail or mechanical impact are not repairable — affected panels must be replaced",
    ],
    procurementSources: [
      { name: "BlueScope Steel — Colorbond product range", url: "https://www.bluescopesteel.com.au" },
      { name: "Rollformers and cladding contractors — profiled to site lengths", url: "https://www.bluescopesteel.com.au" },
      { name: "Lysaght / BlueScope — national distribution", url: "https://www.lysaght.com" },
    ],
  },
  {
    fullLabel: "Rheinzink / Zintek — Zinc Facade Systems",
    brandUrl: "https://www.rheinzink.com/en-au",
    tdsUrl: "https://www.rheinzink.com/en-au/products/rainscreen-facade",
    accentColor: "#0369a1",
    name: "Rheinzink Standing Seam — Zinc Wall Cladding",
    descriptionLine: "Zinc (titanium zinc) standing seam wall cladding — natural zinc or pre-weathered finish — non-combustible — concealed-fix — architecturally distinctive — coastal suitable — long service life 80–100yr",
    productType: "Zinc standing seam wall cladding — titanium zinc — pre-weathered finish — non-combustible",
    filterTags: ["Standing-seam", "Metal-profiled", "Zinc", "Non-combustible", "NCC-2022", "Coastal", "Concealed-fix", "Roll-formed", "AS-1562"],
    techChips: [
      { label: "Titanium zinc", cls: "bg-sky-100 text-sky-800" },
      { label: "Non-combustible", cls: "bg-amber-100 text-amber-700" },
      { label: "80–100yr life", cls: "bg-green-100 text-green-700" },
      { label: "Coastal rated", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Zinc (titanium zinc) standing seam wall cladding is the premium architectural metal facade option, widely used in Europe and increasingly in Australian high-end residential, commercial, and Class 2 remediation projects. Rheinzink (Germany) is the leading titanium zinc facade product, available in pre-weathered blue-grey (prePATINA bluegrey) and graphite-grey finishes that replicate decades of natural zinc patina from day one. Non-combustible and NCC 2022 compliant. Service life of 80–100+ years in normal atmospheres. Zinc naturally re-seals minor scratches through the patination process. Suitable for coastal environments (confirmed with Rheinzink Australia for specific marine exposure categories). Standing seam concealed-clip fixing eliminates exposed fasteners. Zinc expands significantly — expansion provisions are more critical than steel and must be designed by the installer.",
    technicalProperties: [
      "Titanium zinc alloy — non-combustible — NCC 2022 compliant for all Class and height combinations",
      "Pre-weathered finish available from day one — eliminates the 5–15 year natural weathering period",
      "Service life: 80–100+ years in normal atmosphere — 60+ years in coastal environments",
      "Self-sealing patina — minor surface scratches re-seal through natural zinc oxide/carbonate patination",
      "Standing seam concealed-clip — no exposed fasteners on face",
      "Coastal rated — confirm specific exposure category with Rheinzink Australia technical",
    ],
    limitations: [
      "High material cost — titanium zinc is significantly more expensive than Colorbond steel per m²",
      "Significant thermal expansion — zinc expands 2.2× more than steel per °C — expansion clips and joints must be carefully designed",
      "Specialist installers required — zinc standing seam is a trade skill not common to standard roofing/cladding contractors",
      "Run-off from new zinc stains adjacent materials (concrete, render) during initial weathering — design to contain run-off",
      "Long lead times for pre-weathered product — confirm with Rheinzink Australia before committing to programme",
    ],
    procurementSources: [
      { name: "Rheinzink Australia — product enquiry", url: "https://www.rheinzink.com/en-au" },
      { name: "Zinc facade specialists — confirm local installers", url: "https://www.rheinzink.com/en-au" },
      { name: "Architectural metals distributors — Rheinzink AU stock", url: "https://www.rheinzink.com/en-au" },
    ],
  },
  {
    fullLabel: "Fielders Steel / Stramit Australia",
    brandUrl: "https://www.fielders.com.au",
    accentColor: "#7c3aed",
    name: "Fielders KingFlor / Panelrib — Profiled Steel Wall Cladding",
    descriptionLine: "Fielders profiled steel wall cladding — Panelrib, Longline, and concealed-fix profiles — Colorbond steel — non-combustible — face or concealed fix — NCC 2022 — national rollformer network",
    productType: "Profiled steel wall cladding — Fielders — face and concealed-fix — NCC 2022",
    filterTags: ["Metal-profiled", "Colorbond", "Non-combustible", "NCC-2022", "Coastal", "Roll-formed", "AS-1562", "Industrial"],
    techChips: [
      { label: "Fielders brand", cls: "bg-purple-100 text-purple-800" },
      { label: "Non-combustible", cls: "bg-amber-100 text-amber-700" },
      { label: "NCC 2022 compliant", cls: "bg-green-100 text-green-700" },
      { label: "National network", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Fielders Steel is one of Australia's leading profiled steel cladding manufacturers, offering a range of wall cladding profiles in Colorbond pre-painted steel including Panelrib (ribbed wall profile), Longline (flat-seam profiled panel), and concealed-fix profiles. All profiles are manufactured from BlueScope Colorbond steel and are non-combustible under NCC 2022. Fielders has a national rollformer network providing project-specific panel lengths and profiles cut to order. Face-fixed profiles use standard Colorbond screws; concealed-fix profiles use clip systems. The wider Fielders range also includes box-rib and corrugated profiles suited to industrial and contemporary residential facades. Popular for Class 2 building remediation where industrial aesthetic and rapid installation are preferred over premium architectural panels.",
    technicalProperties: [
      "Non-combustible Colorbond steel — NCC 2022 compliant for external walls",
      "Range of profiles: Panelrib, Longline, concealed-fix — confirm profile availability with local Fielders rollformer",
      "Panel lengths: roll-formed to project-specific lengths — no joints in long runs",
      "Colorbond colour range — BlueScope standard and special-order colours",
      "AS 1562.1 structural design — confirm fixing pattern and span with Fielders engineering",
      "National rollformer network — short lead times for standard Colorbond profiles",
    ],
    limitations: [
      "Industrial aesthetic — profiled steel facade appearance does not suit all Class 2 building design contexts",
      "Face-fixed profiles have exposed fasteners — specify concealed-fix profile where clean appearance is required",
      "Thermal expansion must be managed in screw-fix joints — over-tightening of screws causes pull-through on thermal cycling",
      "Rain noise on profiled steel cladding can be significant for occupied Class 2 residential buildings",
      "Colorbond colour palette fixed — no custom colours outside BlueScope standard range",
    ],
    procurementSources: [
      { name: "Fielders Steel — Wall Cladding", url: "https://www.fielders.com.au" },
      { name: "Fielders rollformers — national network", url: "https://www.fielders.com.au" },
      { name: "BlueScope Distribution — Colorbond sheet", url: "https://www.bluescopesteel.com.au" },
    ],
  },
  {
    fullLabel: "KME Group / Aurubis — Copper Facade",
    brandUrl: "https://www.kme.com",
    accentColor: "#b45309",
    name: "KME Copper — Standing Seam Facade",
    descriptionLine: "Copper standing seam wall cladding — natural, pre-oxidised, or lacquered finish — non-combustible — 100yr+ service life — premium architectural — coastal corrosion resistant — patinating finish",
    productType: "Copper standing seam wall cladding — premium architectural — patinating finish",
    filterTags: ["Standing-seam", "Metal-profiled", "Copper", "Non-combustible", "NCC-2022", "Coastal", "Concealed-fix"],
    techChips: [
      { label: "Copper", cls: "bg-orange-100 text-orange-800" },
      { label: "Non-combustible", cls: "bg-amber-100 text-amber-700" },
      { label: "100yr+ service", cls: "bg-green-100 text-green-700" },
      { label: "Patinating", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Copper standing seam wall cladding is the most distinctive and long-lasting metal facade option — a premium specification for landmark, heritage, or architecturally significant Class 2 buildings. Pure copper is fully non-combustible and NCC 2022 compliant. Over time, copper develops a natural green-blue patina (verdigris) that is stable and protective — the patina is often the desired design outcome. Pre-oxidised and pre-patinated copper is available from KME and Aurubis where immediate natural weathered appearance is required. Service life of 100+ years in most environments. Specialist copper-working contractors required — copper requires soldering, not welding, and different tools from steel. Copper run-off stains adjacent materials green — this is a critical design consideration for drainage routing.",
    technicalProperties: [
      "Pure copper — fully non-combustible — NCC 2022 compliant for all Class and height combinations",
      "Service life: 100+ years — natural patina provides stable long-term corrosion protection",
      "Pre-oxidised and pre-patinated grades available — immediate natural weathered appearance from installation",
      "Standing seam concealed-clip fixing — no exposed fasteners on face",
      "Coastal rated — copper naturally resists marine corrosion; patina stable in salt environments",
      "Heritage material — accepted by heritage authorities for conservation work where original copper cladding is present",
    ],
    limitations: [
      "Extremely high material cost — copper is one of the most expensive facade metals per m²",
      "Copper run-off creates green staining on adjacent materials (concrete, render, glass) — drainage routing critical",
      "Specialist copper-working contractors required — not interchangeable with standard metal cladding contractors",
      "Galvanic corrosion with aluminium, zinc, and steel — copper must not contact or drain onto incompatible metals",
      "Very long lead times for pre-patinated grades — confirm 12–20 week lead time with KME/Aurubis Australia before specifying",
    ],
    procurementSources: [
      { name: "KME Group — Copper Architectural", url: "https://www.kme.com" },
      { name: "Aurubis — Copper for architecture", url: "https://www.aurubis.com" },
      { name: "Architectural metals specialist — confirm Australian import and copper working contractors", url: "https://www.kme.com" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Standing-seam", label: "Standing seam" },
  { id: "Metal-profiled", label: "Metal profiled" },
  { id: "Colorbond", label: "Colorbond" },
  { id: "Zinc", label: "Zinc" },
  { id: "Copper", label: "Copper" },
  { id: "Non-combustible", label: "Non-combustible" },
  { id: "NCC-2022", label: "NCC 2022" },
  { id: "Coastal", label: "Coastal rated" },
  { id: "Concealed-fix", label: "Concealed-fix" },
  { id: "Roll-formed", label: "Roll-formed" },
  { id: "Industrial", label: "Industrial" },
];

const SYSTEM_COMPARISON: {
  product: string; brand: string; metal: string; finish: string;
  ncc2022: string; coastal: string; serviceLife: string; primaryUse: string;
}[] = [
  { product: "Colorbond Standing Seam", brand: "BlueScope", metal: "Zincalume steel", finish: "Colorbond pre-painted", ncc2022: "Compliant", coastal: "Yes — Colorbond coastal", serviceLife: "25–40 yr", primaryUse: "Standard — wide colour — Class 2 and industrial" },
  { product: "Rheinzink Standing Seam", brand: "Rheinzink", metal: "Titanium zinc", finish: "Natural or pre-weathered", ncc2022: "Compliant", coastal: "Yes — confirm grade", serviceLife: "80–100+ yr", primaryUse: "Premium architectural — grey/graphite tones" },
  { product: "Fielders Profiled Steel", brand: "Fielders", metal: "Colorbond steel", finish: "Colorbond pre-painted", ncc2022: "Compliant", coastal: "Yes", serviceLife: "25–40 yr", primaryUse: "Industrial and commercial — national supply" },
  { product: "KME Copper Standing Seam", brand: "KME / Aurubis", metal: "Pure copper", finish: "Natural patinating", ncc2022: "Compliant", coastal: "Yes", serviceLife: "100+ yr", primaryUse: "Landmark / heritage — premium architectural" },
];

const TECH_INFO = {
  typicalApplications: [
    "Non-combustible cladding replacement on Class 2 buildings where profiled metal aesthetic is appropriate",
    "Industrial-adjacent Class 2 buildings where Colorbond or profiled steel is consistent with building context",
    "Premium architectural Class 2 facades specifying zinc, copper, or pre-weathered metal for design distinction",
    "Contemporary residential and mixed-use buildings where standing-seam vertical or horizontal facade expression is specified",
    "Re-cladding of existing metal facade buildings where like-for-like metal replacement is required",
  ],
  selectionCriteria: [
    "Select Colorbond or Fielders for standard Class 2 buildings where cost, speed, and national supply are priorities",
    "Select zinc (Rheinzink) for premium architectural facades requiring distinctive grey-tone natural metal appearance",
    "Select copper only for landmark, heritage, or architecturally exceptional buildings where 100-year service and patinated appearance justify cost",
    "Always specify concealed-fix standing seam where clean facade without visible fasteners is the design intent",
    "Manage thermal expansion in the design — zinc expands most, steel and Colorbond intermediate — ensure clip and joint design accommodates movement",
    "Confirm acoustic performance for occupied Class 2 residential — rain noise on metal profiled cladding can reduce amenity",
  ],
  limitations: [
    "Rain noise on metal cladding is a significant amenity issue for occupied Class 2 residential — acoustic lining or insulation behind panels is often required",
    "Metal cladding creates a thermal bridge through the subframe and clips — thermal break bracket design should be specified for energy-compliant buildings",
    "Metal facade panels dent permanently — hail risk in some Australian regions is a design and warranty consideration",
    "Galvanic corrosion occurs where dissimilar metals contact — copper must not drain onto zinc or steel; aluminium must be isolated from steel structure",
    "Thermal expansion is greater than for concrete and masonry — clip and joint design must accommodate full seasonal expansion range",
  ],
  standardsNotes: [
    "AS 1562.1 — design and installation of sheet roof and wall cladding — metal cladding design reference",
    "NCC 2022 Volume One — C2D3 — steel and zinc are non-combustible; confirm product test evidence if required by certifier",
    "AS/NZS 4600 — cold-formed steel structures — applies to structural roll-formed metal cladding on high-rise",
    "BlueScope / Fielders / Rheinzink design and installation guides — structural load tables, fixing patterns, thermal expansion",
    "Colorbond warranty — BlueScope Colorbond product warranty conditions — confirm coastal grade for marine environments",
  ],
  suitableDefects: [
    "Combustible PE-core ACP replacement on industrial-context Class 2 buildings where profiled metal aesthetic is acceptable",
    "End-of-life Colorbond or profiled steel cladding requiring replacement after 25–40 years of service",
    "Zinc or copper cladding restoration on premium buildings where like-for-like metal replacement is required",
    "Industrial and commercial Class 2 facades where rapid installation with a national supply chain is required",
    "Contemporary residential towers where standing-seam metal facade is the design intention",
  ],
  typicalSubstrates: [
    "Aluminium top-hat or Z-section subframe on helping-hand brackets — standard subframe for metal facade panels",
    "Steel C-section or RHS subframe — galvanic isolation from aluminium clips essential — EPDM tape mandatory",
    "Concrete or masonry primary structure — bracket anchors designed for wind load and panel dead load",
    "Proprietary thermal-break bracket system (Nvelope, Fischer) for energy-compliant high-rise facades",
    "For Colorbond and Fielders profiles — fix directly to cold-formed steel purlins or girts per AS 1562.1 span tables",
  ],
};

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
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <button onClick={() => setExpanded((e) => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">
              {src.url ? (
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">
                  {src.name}<ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : <span className="font-semibold text-slate-600">{src.name}</span>}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with the current manufacturer TDS before specifying or applying.</p>
    </div>
  );
}

function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>{chip.label}</span>)}
            </div>
          )}
        </>
      )}
      <button onClick={() => setExpanded((e) => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded((e) => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

export function MetalProfiledIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What is metal profiled and standing seam cladding?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Metal profiled and standing seam wall cladding systems use roll-formed or flat sheet metal panels fixed to a structural subframe to form the outer weather skin of a building. Steel (Colorbond), zinc, copper, and aluminium are all non-combustible metal options available for NCC 2022 compliant Class 2 building facades.</p>
        {expanded && (
          <>
            <p>Standing seam systems use a concealed clip fixed to the subframe to engage a folded seam at the panel edge — no fastener penetrates the weather face. Profiled steel systems (ribbed, box-rib, corrugated) may use face-fixed screws or concealed clips depending on the profile. All metal cladding systems must accommodate thermal expansion through their clip and joint design — metal facades expand and contract significantly more than concrete and masonry substrates.</p>
            <p>The primary considerations for metal facade specification are: material choice (steel vs zinc vs copper vs aluminium), finish specification (Colorbond, powder-coat, or natural patinating), thermal expansion management, acoustic performance for occupied buildings, and corrosion compatibility between dissimilar metals in the system.</p>
          </>
        )}
      </div>
      <button onClick={() => setExpanded((e) => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
  );
}

function TechCard({ icon, title, items, style }: { icon: React.ReactNode; title: string; items: string[]; style: "bullet" | "check" | "warn" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">{icon}</div>
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

export function MetalProfiledProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (id: FilterTag) => {
    setActiveFilters((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };
  const visibleProducts = activeFilters.size === 0 ? PRODUCTS : PRODUCTS.filter((p) => Array.from(activeFilters).every((f) => p.filterTags.includes(f)));
  const scroll = (dir: "left" | "right") => { scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" }); };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? <>Hide detail <ChevronUp size={14} /></> : <>Show detail <ChevronDown size={14} /></>}
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
            <p className="mt-1 text-sm text-slate-500">4 products — metal profiled and standing seam facade cladding — scroll to view all</p>
          </div>
        </div>
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="shrink-0 text-xs font-semibold text-slate-500">Filter by:</span>
          {FILTER_DEFS.map((f) => {
            const active = activeFilters.has(f.id);
            return (
              <button key={f.id} type="button" onClick={() => toggleFilter(f.id)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active ? "border-sky-950 bg-sky-950 text-white" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}>
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && <button type="button" onClick={() => setActiveFilters(new Set())} className="text-xs text-slate-400 underline hover:text-slate-600">Clear filters</button>}
        </div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">{visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all</span>
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
                      {product.tdsUrl && <a href={product.tdsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><FileText size={9} /> TDS</a>}
                      <a href={product.brandUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"><ExternalLink size={9} /> Brand Site</a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
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
            <p className="mt-1 text-sm text-slate-500">Side-by-side comparison of metal profiled and standing seam cladding systems. Confirm all selections against the current manufacturer TDS.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Metal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Finish</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">NCC 2022</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Coastal</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Service life</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.metal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.finish}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.ncc2022}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.coastal}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.serviceLife}</td>
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
