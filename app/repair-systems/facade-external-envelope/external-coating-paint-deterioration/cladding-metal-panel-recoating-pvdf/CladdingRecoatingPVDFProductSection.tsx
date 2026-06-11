"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "PVDF"
  | "Fluoropolymer"
  | "Kynar-500"
  | "Metal-cladding"
  | "Aluminium"
  | "ACP-recoating"
  | "UV-resistant"
  | "Coastal"
  | "Factory-applied"
  | "Site-applied"
  | "High-performance"
  | "2-pack";

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
    fullLabel: "Valspar Australia",
    brandUrl: "https://www.valspar.com/en-au",
    accentColor: "#e2003a",
    name: "Valspar Fluropon Classic II PVDF",
    descriptionLine: "Premium 70% PVDF (Kynar 500) factory-applied fluoropolymer coating — benchmark for architectural aluminium cladding, curtain wall and ACP panels — exceptional UV and colour stability over 20+ years",
    productType: "70% PVDF fluoropolymer — factory-applied aluminium cladding and ACP",
    filterTags: ["PVDF", "Fluoropolymer", "Kynar-500", "Metal-cladding", "Aluminium", "ACP-recoating", "UV-resistant", "Coastal", "Factory-applied", "High-performance"],
    techChips: [
      { label: "70% PVDF", cls: "bg-red-100 text-red-800" },
      { label: "Kynar 500", cls: "bg-red-100 text-red-800" },
      { label: "Factory Applied", cls: "bg-orange-100 text-orange-800" },
      { label: "UV Stable", cls: "bg-blue-100 text-blue-800" },
      { label: "Coastal Grade", cls: "bg-cyan-100 text-cyan-800" },
      { label: "20+ Year Life", cls: "bg-green-100 text-green-800" },
    ],
    systemDescription:
      "Valspar Fluropon Classic II is a 70% PVDF (polyvinylidene fluoride) resin-based coating using Kynar 500 — the industry-standard fluoropolymer for architectural aluminium. Applied by authorised coil and extrusion coaters under strict factory conditions, it forms an ultra-durable film with outstanding resistance to UV degradation, chalking, colour fade, and chemical attack. Widely specified on Australian high-rise curtain wall, aluminium composite panels (ACP), louvres, and spandrel panels. System comprises chrome pretreatment + primer + PVDF topcoat + optional clear, per AS 3715 and AAMA 2605.",
    technicalProperties: [
      "PVDF resin content: minimum 70% by weight of binder (Kynar 500 / Hylar 5000)",
      "Gloss level: 25–35 GU (60°) — low-sheen architectural finish",
      "Colour retention: ΔE < 5 units after 10 years Florida exposure",
      "Chalk resistance: Rating 8 (ASTM D4214) after 10 years Florida exposure",
      "Salt spray resistance: 3,000+ hours (ASTM B117) — suitable for marine/coastal zones",
      "Pencil hardness: 2H — hard, abrasion-resistant film",
      "Adhesion: 100/100 crosshatch (ASTM D3359) on chrome-pretreated aluminium",
      "DFT: 20–25 µm topcoat; 5–8 µm primer; total system ≥ 40 µm with clear",
    ],
    limitations: [
      "Factory-applied only — cannot be site-applied by brush/roller in original PVDF form",
      "Site touch-up uses compatible fluoropolymer field paint (e.g. Fluropon Field Coat) — not identical to factory finish",
      "Requires authorised applicator — Valspar must approve coil coater or extrusion coater",
      "Chrome pretreatment (or approved alternative) is mandatory — adhesion will fail without it",
      "Colour matching of site repairs to aged factory panels is difficult — plan for full panel replacement in remediation",
      "Not suitable for steel, copper, or non-aluminium substrates without specialist primer",
    ],
    procurementSources: [
      { name: "Valspar AU — Architectural Finishes", url: "https://www.valspar.com/en-au" },
      { name: "Dulux Powder Coatings (Valspar distributor)", url: "https://www.dulux.com.au/commercial" },
    ],
  },
  {
    fullLabel: "PPG Industries Australia",
    brandUrl: "https://www.ppg.com/en-AU",
    accentColor: "#0369a1",
    name: "PPG Duranar XL PVDF",
    descriptionLine: "70% PVDF (Kynar 500) factory fluoropolymer coating — PPG's flagship architectural metal coating for curtain wall, aluminium extrusions, and ACP — superior chalk and fade resistance to AAMA 2605",
    productType: "70% PVDF fluoropolymer — factory-applied architectural aluminium",
    filterTags: ["PVDF", "Fluoropolymer", "Kynar-500", "Metal-cladding", "Aluminium", "ACP-recoating", "UV-resistant", "Coastal", "Factory-applied", "High-performance"],
    techChips: [
      { label: "70% PVDF", cls: "bg-blue-100 text-blue-800" },
      { label: "Kynar 500", cls: "bg-blue-100 text-blue-800" },
      { label: "AAMA 2605", cls: "bg-sky-100 text-sky-800" },
      { label: "Factory Applied", cls: "bg-orange-100 text-orange-800" },
      { label: "Coastal Grade", cls: "bg-cyan-100 text-cyan-800" },
      { label: "25-Year Warranty", cls: "bg-green-100 text-green-800" },
    ],
    systemDescription:
      "PPG Duranar XL is a high-performance 70% PVDF coating using Kynar 500 resin, factory-applied to aluminium extrusions and flat sheet by approved coil and spray coaters. PPG Duranar is one of the longest-established PVDF brands globally, with extensive track record on Australian high-rise buildings. The XL variant offers enhanced colour range and improved metallic/mica finishes while meeting AAMA 2605 — the most demanding US/AU standard for architectural coatings. System: chrome conversion coating + epoxy primer (5–8 µm) + Duranar XL topcoat (20–25 µm) + TODO: owner confirm — the Duranar Sunstable clear coat: fetched sources describe this as an essential component of the three-coat system for metallic finishes, not optional — confirm whether the clear coat is mandatory or optional for the specified colour and finish with PPG technical.",
    technicalProperties: [
      "PVDF resin: 70% by weight of binder — Kynar 500 fluoropolymer",
      "Gloss: 25–35 GU (60°) standard; metallic variants may vary slightly",
      "Colour fade: ΔE ≤ 5 after 10 years South Florida exposure (AAMA 2605)",
      "Chalk resistance: ≤ Rating 8 (ASTM D4214) at 10 years Florida exposure",
      "Salt spray: 3,000 hours minimum (ASTM B117) — marine/coastal approved",
      "Humidity resistance: 3,000 hours (ASTM D2247) — no blistering or delamination",
      "Crosshatch adhesion: 100/100 (ASTM D3359) — chrome-pretreated substrate",
      "DFT system: primer 5–8 µm + topcoat 20–25 µm + optional clear 5–8 µm",
    ],
    limitations: [
      "Factory application only — Duranar XL requires controlled coil or spray line environment",
      "Site repair must use PPG Duranar field touch-up paint — performance will differ from factory coat",
      "Chrome pretreatment (Bonderite or equivalent) required — no adhesion to bare or anodised aluminium",
      "Colour batches must be ordered together — colour consistency across batches can vary slightly",
      "Not for application over existing coatings without full strip and pretreatment",
      "Heavier metallic finishes (mica/pearlescent) may require additional clear coat — specify at order",
    ],
    procurementSources: [
      { name: "PPG Architectural — AU/NZ", url: "https://www.ppgarchitectural.com/en-AU" },
      { name: "PPG Industries Australia", url: "https://www.ppg.com/en-AU" },
    ],
  },
  {
    fullLabel: "Axalta Coating Systems Australia",
    brandUrl: "https://www.axaltacs.com/au",
    tdsUrl: "https://www.axaltacs.com/au/en/products/powder-coatings/alesta.html",
    accentColor: "#7c3aed",
    name: "Axalta Alesta PVDF Powder",
    descriptionLine: "PVDF-based powder coating for architectural aluminium — fluoropolymer performance in a solvent-free powder form — factory-applied via electrostatic spray — excellent UV and chalk resistance",
    productType: "PVDF powder coating — factory electrostatic applied architectural aluminium",
    filterTags: ["PVDF", "Fluoropolymer", "Metal-cladding", "Aluminium", "UV-resistant", "Coastal", "Factory-applied", "High-performance"],
    techChips: [
      { label: "PVDF Powder", cls: "bg-purple-100 text-purple-800" },
      { label: "Solvent-Free", cls: "bg-purple-100 text-purple-800" },
      { label: "Electrostatic", cls: "bg-violet-100 text-violet-800" },
      { label: "UV Stable", cls: "bg-blue-100 text-blue-800" },
      { label: "Factory Applied", cls: "bg-orange-100 text-orange-800" },
      { label: "Coastal Grade", cls: "bg-cyan-100 text-cyan-800" },
    ],
    systemDescription:
      "Axalta Alesta PVDF is a fluoropolymer-modified powder coating that delivers near-equivalent weathering performance to liquid PVDF systems in a solvent-free format. Applied electrostatically in factory powder coating lines and oven-cured, it achieves a durable, UV-stable film on aluminium extrusions, flat sheet, and fabricated components. Particularly suited to projects requiring powder coating (rather than liquid) for environmental or specification reasons. Meets AAMA 2604 minimum and approaches AAMA 2605 performance. The Alesta AP range includes superdurable and fluoropolymer-enhanced variants suited to Australian coastal and high-UV environments.",
    technicalProperties: [
      "Binder: PVDF-modified polyester or 70% PVDF fluoropolymer resin — specify Alesta AP/PVDF grade",
      "Application: electrostatic powder spray, oven cure at 180–200°C",
      "Film build: 60–80 µm DFT (single coat powder) — thicker than liquid PVDF but comparable barrier",
      "Gloss range: 20–85 GU — broad selection including matte and high-gloss variants",
      "UV resistance: superdurable grade passes AAMA 2604; PVDF grade approaches AAMA 2605",
      "Salt spray: 1,000–3,000 hours depending on grade and pretreatment",
      "Chip/impact resistance: superior to liquid PVDF — powder film is tougher",
      "Pretreatment: chrome or chrome-free conversion coating required for warranty",
    ],
    limitations: [
      "Solvent-free powder — cannot be site-applied; factory oven cure is mandatory",
      "Pure PVDF powder performance is slightly below liquid 70% PVDF at extreme UV exposures (>15 years)",
      "Colour range narrower than liquid PVDF — custom colours require minimum order quantity",
      "Powder lines have minimum batch sizes — not economical for small quantities or single pieces",
      "Site touch-up is not possible with powder — liquid touch-up paint required (colour match only)",
      "Oven size limits maximum component dimensions — large flat panels may require liquid PVDF instead",
    ],
    procurementSources: [
      { name: "Axalta Coating Systems AU", url: "https://www.axaltacs.com/au" },
      { name: "Alesta Powder Products", url: "https://www.axaltacs.com/au/en/products/powder-coatings/alesta.html" },
    ],
  },
  {
    fullLabel: "AkzoNobel / Interpon Australia",
    brandUrl: "https://www.interpon.com/en-AU",
    accentColor: "#b45309",
    name: "Interpon D3020 PVDF Powder",
    descriptionLine: "AkzoNobel's premium 70% PVDF powder coating — Interpon D3020 meets AAMA 2605 in powder form — factory-applied to aluminium cladding, curtain wall, and louvres — widest colour range of any PVDF powder",
    productType: "70% PVDF powder coating — AAMA 2605 grade architectural aluminium",
    filterTags: ["PVDF", "Fluoropolymer", "Metal-cladding", "Aluminium", "ACP-recoating", "UV-resistant", "Coastal", "Factory-applied", "High-performance"],
    techChips: [
      { label: "70% PVDF Powder", cls: "bg-amber-100 text-amber-800" },
      { label: "AAMA 2605", cls: "bg-amber-100 text-amber-800" },
      { label: "Solvent-Free", cls: "bg-yellow-100 text-yellow-800" },
      { label: "Factory Applied", cls: "bg-orange-100 text-orange-800" },
      { label: "UV Stable", cls: "bg-blue-100 text-blue-800" },
      { label: "Coastal Grade", cls: "bg-cyan-100 text-cyan-800" },
    ],
    systemDescription:
      "Interpon D3020 is AkzoNobel's highest-performance architectural powder coating, achieving full AAMA 2605 compliance through a 70% PVDF resin in powder form — the first powder coating to achieve this benchmark. Factory-applied by approved powder coaters to aluminium extrusions, sheet, and fabricated cladding components. Widely used across Australian commercial façades, high-rise curtain wall, louvres, and window frames. The D3020 system comprises chrome or chrome-free pretreatment + primer (optional) + D3020 PVDF powder topcoat, oven cured. Interpon's Australian network of licensed applicators ensures specification compliance and warranty coverage.",
    technicalProperties: [
      "PVDF resin: 70% by weight of binder — full AAMA 2605 compliance in powder form",
      "Colour retention: ΔE ≤ 5 at 10 years Florida exposure — equivalent to liquid PVDF",
      "Chalk resistance: Rating ≥ 8 (ASTM D4214) at 10 years Florida — same as liquid PVDF",
      "TODO: owner confirm — Film build: 60–80 µm DFT — Interpon D3020 TDS/brochure sources indicate minimum 50 µm (C1–C3 environments) or 60 µm (C4/C5 environments) — the range 60–80 µm is not confirmed from fetched sources — confirm current DFT specification with Interpon/AkzoNobel technical",
      "Salt spray: 3,000 hours (ASTM B117) — marine/coastal approved specification",
      "TODO: owner confirm — Impact resistance: 160 inch-pounds direct impact — this value not confirmed from fetched Interpon D3020 sources — confirm from current Interpon D3020 TDS with AkzoNobel technical",
      "Adhesion: 100/100 crosshatch (ASTM D3359) on chrome-pretreated aluminium",
      "TODO: owner confirm — Gloss options: 20–70 GU — fetched Interpon D3020 sources indicate gloss range of approximately 30–40% (brochure) — the stated 20–70 GU range may not be accurate for D3020 specifically — confirm current gloss range from Interpon D3020 product documentation with AkzoNobel technical",
    ],
    limitations: [
      "Factory powder coat only — oven cure at 180–200°C essential for film formation",
      "Site repair using Interpon D liquid touch-up paint — finish will not exactly match baked powder",
      "Requires approved Interpon licensed applicator — warranty void if applied by non-approved coater",
      "Chrome or approved chrome-free pretreatment mandatory — bare aluminium adhesion will fail",
      "Component size limited by oven dimensions — very large panels may need segmented coating",
      "Minimum order quantities apply to custom colours — standard range colours readily available",
    ],
    procurementSources: [
      { name: "Interpon AU — D Series PVDF", url: "https://www.interpon.com/en-AU/products/D-Series" },
      { name: "AkzoNobel Australia", url: "https://www.interpon.com/en-AU" },
    ],
  },
  {
    fullLabel: "Wattyl Industrial Coatings",
    brandUrl: "https://www.wattyl.com.au",
    accentColor: "#059669",
    name: "TODO: owner confirm — Wattyl Industrial Fluorocoat (exact current AU product name unconfirmed — 'Wattyl Industrial Fluorocoat' not found on wattyl.com.au Protective Coatings range at time of verification — confirm current site-applied fluoropolymer product name in the Wattyl industrial/protective range with Wattyl technical)",
    descriptionLine: "Site-applied fluoropolymer coating for metal cladding recoating — Wattyl's high-performance architectural metal recoat system — suitable for site application to existing aluminium, steel, and ACP panels where factory PVDF recoating is impractical",
    productType: "TODO: owner confirm — Site-applied fluoropolymer topcoat — architectural metal recoating (product name unconfirmed — see name field)",
    filterTags: ["Fluoropolymer", "Metal-cladding", "Aluminium", "ACP-recoating", "UV-resistant", "Coastal", "Site-applied", "High-performance", "2-pack"],
    techChips: [
      { label: "Site-Applied", cls: "bg-emerald-100 text-emerald-800" },
      { label: "Fluoropolymer", cls: "bg-emerald-100 text-emerald-800" },
      { label: "2-Pack", cls: "bg-green-100 text-green-800" },
      { label: "UV Stable", cls: "bg-blue-100 text-blue-800" },
      { label: "ACP Recoat", cls: "bg-teal-100 text-teal-800" },
      { label: "Coastal Grade", cls: "bg-cyan-100 text-cyan-800" },
    ],
    systemDescription:
      "Wattyl Industrial Fluorocoat is a 2-pack fluoropolymer-modified urethane coating designed for site application to existing metal cladding, ACP panels, aluminium curtain wall, and steel facades where strip and factory recoating is not feasible. Used extensively in Australian remediation projects where original PVDF or powder coat has faded, chalked, or delaminated. The system comprises a 2-pack epoxy primer over clean, abraded or chemically etched metal, followed by 2-pack Fluorocoat topcoat applied by airless spray. While site-applied fluoropolymers do not match factory PVDF in 20-year weathering, Fluorocoat delivers substantially better performance than standard polyurethane — realistic service life 10–15 years in Australian conditions.",
    technicalProperties: [
      "Binder: fluoropolymer-modified 2-pack polyurethane — enhanced UV and chalk resistance",
      "Gloss retention: significantly better than standard PU — moderate fluoropolymer UV protection",
      "Application method: airless spray (site), brush/roller touch-up only — not full coat brush",
      "DFT: 40–60 µm topcoat over 2-pack epoxy primer (25–40 µm) — total system 65–100 µm",
      "Recoat window: 6–24 hours at 25°C — overcoatable while still in cure",
      "Salt spray: 1,500 hours (ASTM B117) — suitable for coastal zones with 2-pack epoxy primer",
      "Colour range: tintable via trade mixing system — colour match to existing finishes possible",
      "Pot life: 4–8 hours at 25°C — 2-pack system requires on-site mixing",
    ],
    limitations: [
      "Site-applied fluoropolymer — cannot achieve factory PVDF AAMA 2605 weathering performance",
      "Realistic service life 10–15 years vs 20–25 years for factory PVDF — plan for re-inspection at 10 years",
      "Substrate preparation is critical — poor prep (missed chalking, contamination) will cause delamination",
      "2-pack system requires solvent for clean-up — check local EPA regulations and site safety requirements",
      "Colour matching aged or faded PVDF panels is challenging — mock-up approval essential before full application",
      "Steel substrates require blasting to Sa 2.5 + zinc-rich primer before Fluorocoat — additional cost",
      "Pot life limitation in hot weather — mix in small batches; do not apply at substrate temperature > 35°C",
    ],
    procurementSources: [
      { name: "Wattyl Industrial Coatings", url: "https://www.wattyl.com.au/industrial" },
      { name: "Wattyl Trade Centres — AU wide", url: "https://www.wattyl.com.au" },
    ],
  },
];

const ALL_FILTERS: FilterTag[] = [
  "PVDF", "Fluoropolymer", "Kynar-500", "Metal-cladding", "Aluminium",
  "ACP-recoating", "UV-resistant", "Coastal", "Factory-applied",
  "Site-applied", "High-performance", "2-pack",
];

type ComparisonKey = "product" | "brand" | "chemistry" | "application" | "standard" | "coastal" | "siteRepair" | "primaryUse";

const SYSTEM_COMPARISON: { key: ComparisonKey; label: string }[] = [
  { key: "product", label: "Product" },
  { key: "brand", label: "Brand" },
  { key: "chemistry", label: "Chemistry" },
  { key: "application", label: "Application" },
  { key: "standard", label: "Standard" },
  { key: "coastal", label: "Coastal" },
  { key: "siteRepair", label: "Site Repair" },
  { key: "primaryUse", label: "Primary Use" },
];

type ComparisonRow = Record<ComparisonKey, string>;

const COMPARISON_DATA: ComparisonRow[] = [
  { product: "Fluropon Classic II", brand: "Valspar", chemistry: "70% PVDF (Kynar 500)", application: "Factory liquid spray", standard: "AAMA 2605", coastal: "Yes", siteRepair: "Field touch-up only", primaryUse: "Curtain wall, ACP" },
  { product: "Duranar XL", brand: "PPG", chemistry: "70% PVDF (Kynar 500)", application: "Factory coil/spray", standard: "AAMA 2605", coastal: "Yes", siteRepair: "Duranar field coat", primaryUse: "Extrusions, curtain wall" },
  { product: "Alesta PVDF", brand: "Axalta", chemistry: "PVDF powder", application: "Factory electrostatic", standard: "≈ AAMA 2605", coastal: "Yes", siteRepair: "Liquid touch-up", primaryUse: "Extrusions, fabricated Al" },
  { product: "Interpon D3020", brand: "AkzoNobel", chemistry: "70% PVDF powder", application: "Factory electrostatic", standard: "AAMA 2605", coastal: "Yes", siteRepair: "D liquid touch-up", primaryUse: "Curtain wall, louvres" },
  { product: "Industrial Fluorocoat", brand: "Wattyl", chemistry: "Fluoropolymer 2-pack PU", application: "Site airless spray", standard: "N/A (proprietary)", coastal: "Yes (+ primer)", siteRepair: "Full system — site", primaryUse: "ACP/aluminium recoating" },
];

const TECH_INFO = {
  typicalApplications: [
    "Recoating faded, chalked, or delaminated PVDF/powder coat aluminium cladding panels",
    "Factory recoating of replacement ACP or curtain wall panels to match original specification",
    "Site application to existing aluminium louvres, sunshades, and spandrel panels — Wattyl Fluorocoat",
    "High-rise façade remediation where strip-off and factory recoat of original panels is cost-prohibitive",
    "New-build specification for architectural aluminium cladding in coastal or high-UV Australian locations",
    "Aluminium curtain wall mullions and transoms — factory Duranar or Fluropon application by approved coater",
  ],
  selectionCriteria: [
    "Factory vs site application: factory PVDF (Valspar/PPG/Axalta/Interpon) always preferred for new panels; Wattyl Fluorocoat for site recoating of existing cladding",
    "AAMA 2605 specification: Fluropon Classic II, Duranar XL, and Interpon D3020 comply — specify when the project requires warranted 20-year performance",
    "Powder vs liquid: Interpon D3020 and Alesta PVDF powder for projects requiring solvent-free factory coating; liquid PVDF for coil coating and large flat sheet",
    "Coastal and marine zones: all products are coastal-rated; liquid PVDF (Fluropon, Duranar) has longest salt-spray data; Wattyl Fluorocoat requires 2-pack epoxy primer for coastal sites",
    "Colour flexibility: liquid PVDF and D3020 powder offer broadest colour ranges; Axalta Alesta narrower custom range",
    "Budget: factory PVDF is most expensive upfront but lowest lifecycle cost; Wattyl Fluorocoat is lower initial cost but shorter service life requiring earlier recoating",
  ],
  limitations: [
    "No site-applied product matches factory PVDF in long-term UV and chalk resistance — site-applied fluoropolymer is a compromise",
    "Factory PVDF requires authorised coater — not all powder coating shops are approved applicators",
    "Chrome pretreatment is essential for adhesion — chrome-free alternatives (zirconium, titanium) acceptable only with manufacturer approval",
    "Colour matching aged PVDF during remediation is extremely difficult — full panel replacement often preferable to in-situ recoating",
    "PVDF and powder coatings cannot be applied over existing coatings — full strip or mechanical abrasion and re-pretreatment required",
    "2-pack site systems (Wattyl Fluorocoat) have pot life limitations — hot weather on-site reduces working time significantly",
  ],
  standardsNotes: [
    "AAMA 2605: most stringent US/AU architectural coating standard — 10-year Florida exposure requirements for colour, chalk, and adhesion",
    "AAMA 2604: mid-tier standard — polyester powder coatings; less demanding than AAMA 2605",
    "AS 3715:2002: Australian standard for metal finish coating of aluminium for architectural applications — references AAMA performance grades",
    "ASTM B117: 3,000-hour salt spray test used for coastal specification of PVDF factory coatings",
    "Kynar 500 / Hylar 5000: PVDF resins licensed to approved formulators — brand names on TDS confirm compliance",
    "NCC (National Construction Code): façade cladding systems must comply with fire resistance, weatherproofing, and durability provisions — coating specification is part of the cladding system documentation",
  ],
  suitableDefects: [
    "Chalking and powdering of original PVDF or polyester powder coat — UV degradation of binder",
    "Colour fade and bleaching of existing factory finish — UV and thermal cycling damage",
    "Delamination of original coating from substrate — adhesion failure due to inadequate pretreatment or aged coating",
    "Pitting and surface corrosion of aluminium below failed coating — oxidation product (white corrosion) formation",
    "Staining and contamination of cladding surfaces — pollutant adhesion to degraded coating",
    "Loss of water-shedding performance of original hydrophobic coating — chalked surface retains contamination",
  ],
  typicalSubstrates: [
    "Aluminium extrusions — curtain wall mullions, transoms, frames, louvres, sunshades",
    "Aluminium composite panels (ACP) — flat sheet, formed panels, cassettes",
    "Aluminium flat sheet — spandrel panels, coping caps, fascia panels",
    "Steel cladding and structural members — with appropriate primer system",
    "Galvanised steel — Wattyl Fluorocoat with zinc-compatible primer",
    "Existing PVDF or polyester powder coat — site-applied Wattyl Fluorocoat over prepared surface only",
  ],
};

function FilterBar({
  activeFilters,
  toggleFilter,
}: {
  activeFilters: Set<FilterTag>;
  toggleFilter: (f: FilterTag) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {ALL_FILTERS.map((f) => {
        const on = activeFilters.has(f);
        return (
          <button
            key={f}
            onClick={() => toggleFilter(f)}
            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-colors ${
              on
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-white text-slate-600 border-slate-300 hover:border-slate-500"
            }`}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [expanded, setExpanded] = useState(false);
  const accent = product.accentColor;

  return (
    <div
      className="flex-none w-80 bg-white rounded-2xl shadow border border-slate-100 overflow-hidden flex flex-col"
      style={{ borderTop: `4px solid ${accent}` }}
    >
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {product.fullLabel}
          </span>
          <a
            href={product.brandUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-600 shrink-0"
          >
            <ExternalLink size={13} />
          </a>
        </div>
        <h3 className="text-base font-bold text-slate-800 leading-tight mb-2">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-3">
          {product.descriptionLine}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {product.techChips.map((c) => (
            <span
              key={c.label}
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${c.cls}`}
            >
              {c.label}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {product.tdsUrl && (
            <a
              href={product.tdsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 hover:text-slate-700 border border-slate-200 rounded px-2 py-1"
            >
              <FileText size={10} /> TDS
            </a>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 hover:text-slate-700 border border-slate-200 rounded px-2 py-1"
          >
            {expanded ? (
              <>
                <ChevronUp size={10} /> Less
              </>
            ) : (
              <>
                <ChevronDown size={10} /> Details
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expanded */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-slate-100 pt-4 text-xs text-slate-600">
          <div>
            <p className="font-semibold text-slate-700 mb-1">System Description</p>
            <p className="leading-relaxed">{product.systemDescription}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-700 mb-1">Technical Properties</p>
            <ul className="space-y-1">
              {product.technicalProperties.map((t, i) => (
                <li key={i} className="flex gap-2">
                  <CheckCircle size={12} className="text-green-500 mt-0.5 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-700 mb-1">Limitations</p>
            <ul className="space-y-1">
              {product.limitations.map((l, i) => (
                <li key={i} className="flex gap-2">
                  <XCircle size={12} className="text-red-400 mt-0.5 shrink-0" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-slate-700 mb-1">Procurement</p>
            <ul className="space-y-1">
              {product.procurementSources.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                  >
                    <ExternalLink size={10} /> {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export function CladdingRecoatingPVDFIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-sky-950 text-white rounded-2xl p-6 mb-8">
      <div className="flex items-start gap-3 mb-3">
        <BookOpen size={20} className="text-sky-300 mt-0.5 shrink-0" />
        <h2 className="text-lg font-bold text-white">
          Metal Cladding Recoating — PVDF &amp; Fluoropolymer Systems
        </h2>
      </div>
      <p className="text-sky-100 text-sm leading-relaxed mb-2">
        PVDF (polyvinylidene fluoride) coatings — sold under brand names including Kynar 500 and Hylar 5000 — are the global benchmark for architectural aluminium cladding. Applied as factory-finished coatings to curtain wall, ACP panels, louvres, and extrusions, they deliver 20–25 year service life with minimal chalking or colour fade in Australian UV conditions. When original PVDF or powder coat degrades, remediation involves either factory recoating of replacement panels or site-applied fluoropolymer systems for existing cladding.
      </p>
      {open && (
        <div className="text-sky-100 text-sm leading-relaxed space-y-2 mt-2">
          <p>
            The PVDF system market splits into liquid 70% PVDF (Valspar Fluropon, PPG Duranar) applied in factory coil or spray lines, and PVDF-based powder coatings (Interpon D3020, Axalta Alesta) applied electrostatically and oven-cured. Both achieve AAMA 2605 compliance — the most stringent architectural coating standard — requiring 10-year Florida exposure without exceeding ΔE 5 colour change or chalk rating below 8. Chrome or chrome-free conversion coating pretreatment is mandatory for adhesion in all factory systems.
          </p>
          <p>
            For in-situ remediation of existing cladding where panel removal is impractical, site-applied 2-pack fluoropolymer-modified urethane coatings (Wattyl Industrial Fluorocoat) offer substantially better UV performance than standard polyurethane enamels, with realistic service lives of 10–15 years. Site preparation — including degreasing, abrading or chemically etching the degraded surface, and applying a 2-pack epoxy primer — is critical to adhesion. Colour matching aged PVDF is inherently difficult and mock-up approval is essential before committing to full recoating of any façade.
          </p>
          <p>
            Selection should account for: whether factory or site application is feasible, the required service life and warranty, coastal zone requirements, and the specification standard required (AAMA 2605 vs proprietary). Always confirm approved coater status with the manufacturer before ordering, and ensure TDS and warranty documentation is included in the project file.
          </p>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="mt-3 text-sky-300 text-xs font-semibold hover:text-white flex items-center gap-1"
      >
        {open ? <><ChevronUp size={13} /> Read less ↑</> : <><ChevronDown size={13} /> Read more ↓</>}
      </button>
    </div>
  );
}

export function CladdingRecoatingPVDFProductSection() {
  const [activeFilters, setActiveFilters] = useState<Set<FilterTag>>(new Set());
  const [techOpen, setTechOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function toggleFilter(f: FilterTag) {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });
  }

  const filtered =
    activeFilters.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) =>
          Array.from(activeFilters).every((f) => p.filterTags.includes(f))
        );

  return (
    <section className="space-y-8">
      {/* Filter */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            Filter by property
          </h3>
          {activeFilters.size > 0 && (
            <button
              onClick={() => setActiveFilters(new Set())}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Clear filters
            </button>
          )}
        </div>
        <FilterBar activeFilters={activeFilters} toggleFilter={toggleFilter} />
      </div>

      {/* Carousel */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} shown
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() =>
                scrollRef.current?.scrollBy({ left: -400, behavior: "smooth" })
              }
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() =>
                scrollRef.current?.scrollBy({ left: 400, behavior: "smooth" })
              }
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "thin" }}
        >
          {filtered.length === 0 ? (
            <p className="text-slate-400 text-sm py-8">
              No products match the selected filters.
            </p>
          ) : (
            filtered.map((p) => <ProductCard key={p.name} product={p} />)
          )}
        </div>
      </div>

      {/* System Comparison */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
          <SquareStack size={15} /> System Comparison
        </h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wide">
              <tr>
                {SYSTEM_COMPARISON.map((col) => (
                  <th key={col.key} className="px-3 py-2 text-left font-semibold whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COMPARISON_DATA.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  {SYSTEM_COMPARISON.map((col) => (
                    <td key={col.key} className="px-3 py-2 text-slate-700 whitespace-nowrap">
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Technical Accordion */}
      <div>
        <button
          onClick={() => setTechOpen(!techOpen)}
          className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Layers size={15} /> Technical Reference
          </span>
          {techOpen ? (
            <ChevronUp size={16} className="text-slate-400" />
          ) : (
            <ChevronDown size={16} className="text-slate-400" />
          )}
        </button>

        {techOpen && (
          <div className="mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <TechCard
              icon={<Ruler size={14} />}
              title="Typical Applications"
              items={TECH_INFO.typicalApplications}
              style="bullet"
            />
            <TechCard
              icon={<CheckCircle size={14} />}
              title="Selection Criteria"
              items={TECH_INFO.selectionCriteria}
              style="check"
            />
            <TechCard
              icon={<AlertTriangle size={14} />}
              title="Limitations"
              items={TECH_INFO.limitations}
              style="warn"
            />
            <TechCard
              icon={<FileText size={14} />}
              title="Standards &amp; Notes"
              items={TECH_INFO.standardsNotes}
              style="bullet"
            />
            <TechCard
              icon={<SquareStack size={14} />}
              title="Suitable Defects"
              items={TECH_INFO.suitableDefects}
              style="check"
            />
            <TechCard
              icon={<Layers size={14} />}
              title="Typical Substrates"
              items={TECH_INFO.typicalSubstrates}
              style="bullet"
            />
          </div>
        )}
      </div>
    </section>
  );
}

function TechCard({
  icon,
  title,
  items,
  style,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  style: "bullet" | "check" | "warn";
}) {
  const dot =
    style === "check" ? (
      <CheckCircle size={12} className="text-green-500 mt-0.5 shrink-0" />
    ) : style === "warn" ? (
      <AlertTriangle size={12} className="text-amber-500 mt-0.5 shrink-0" />
    ) : (
      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
    );

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3 flex items-center gap-2">
        {icon} {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-xs text-slate-600 leading-relaxed">
            {dot}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
