"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, Ruler, SquareStack, FileText } from "lucide-react";
import { CollapsibleList, CollapsibleDescription, CollapsibleSources, CollapsibleCardDetails, TechCard, CheckCircle, AlertTriangle } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { MS_CARDS } from "./moistureSuppressionData";

type FilterTag = "2-Part-Epoxy" | "1-Part-Acrylic" | "High-RH" | "Moisture-Control" | "Adhesion-Primer" | "Floor-Levelling" | "Magnesite";

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
    fullLabel: "Ardex Australia",
    brandUrl: "https://www.ardex.com.au",
    accentColor: "#0369a1",
    name: "Ardex MC Rapid — Two-Part Epoxy Moisture Control Primer",
    descriptionLine: "Two-part epoxy moisture-suppressing floor primer for high-RH magnesite and concrete substrates — confirm AU pack size with Ardex",
    productType: "Two-part epoxy moisture control primer",
    filterTags: ["2-Part-Epoxy", "High-RH", "Moisture-Control", "Floor-Levelling", "Magnesite"],
    techChips: [
      { label: "2-part epoxy", cls: "bg-sky-100 text-sky-800" },
      { label: "High-RH", cls: "bg-blue-100 text-blue-800" },
      { label: "Moisture control", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ardex MC Rapid is a two-part epoxy moisture control primer designed for substrates with elevated relative humidity — a condition commonly found over encapsulated magnesite floors. Applied as a single low-viscosity coat, it penetrates the substrate and forms a moisture barrier that allows self-levelling underlayments to be applied without adhesion failure or osmotic blistering caused by rising moisture.",
    technicalProperties: [
      "TODO: owner confirm — pack size: AU product page returned 404; US TDS lists a 6.25 L unit. Verify current AU pack size with Ardex Australia before publishing.",
      "Mix ratio: follow TDS — confirm current A:B ratio from Ardex Australia TDS",
      "TODO: owner confirm — RH rating: US TDS states 'up to 100% RH'; AU product page unavailable. Verify current AU RH rating with Ardex Australia before publishing.",
      "TODO: owner confirm — coverage: US TDS states approx. 23–25 m² per 6.25 L unit at 250 µm. AU coverage rate requires confirmation from Ardex Australia TDS.",
      "Overcoating time: check TDS — typically min. 4 hrs before SLC application (confirm current AU TDS)",
      "Complies with ASTM F2170 moisture testing protocol",
    ],
    limitations: [
      "Must not be applied over active water ingress, running water, or efflorescence",
      "Substrate must achieve minimum CSP 2 profile before primer application",
      "Do not apply to oily, dusty, or contaminated surfaces — adhesion failure will result",
      "Moisture testing (in-situ RH probe or calcium chloride) is mandatory before application",
      "Two-component mixing is time-critical — do not exceed pot life",
      "Remove all friable magnesite before priming — loose areas will cause SLC delamination",
    ],
    procurementSources: [
      { name: "Ardex Australia", url: "https://www.ardex.com.au" },
      { name: "Tile Depot (Ardex stockist)", url: "https://www.tiledepot.com.au/" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#be123c",
    name: "Sika Primer MB — Two-Part Epoxy Moisture-Suppressing Floor Primer",
    descriptionLine: "Two-part epoxy moisture-suppressing floor primer for magnesite and concrete before self-levelling — 4 kg kit",
    productType: "Two-part epoxy moisture-suppressing floor primer",
    filterTags: ["2-Part-Epoxy", "High-RH", "Moisture-Control", "Floor-Levelling", "Magnesite"],
    techChips: [
      { label: "2-part epoxy", cls: "bg-red-100 text-red-800" },
      { label: "Moisture barrier", cls: "bg-rose-100 text-rose-800" },
      { label: "SLC primer", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika Primer MB is a two-component solvent-free epoxy primer specifically formulated to suppress moisture vapour transmission from problematic substrates including over magnesite floors. When properly applied, it enables self-levelling compounds to bond to the substrate without the osmotic blistering or adhesion failure associated with high-RH slab surfaces in occupied buildings.",
    technicalProperties: [
      "Pack size: 4 kg kit (Part A 3 kg + Part B 1 kg)",
      "Two-component epoxy — mix per TDS before application",
      "TODO: owner confirm — rated RH limit: AU TDS (April 2023) states moisture content up to 6% CM (~9% Tramex); card claims '~97% RH when used with Sika Level floor systems' — this specific RH percentage could not be confirmed from the AU TDS PDF (binary-encoded, unreadable). Verify against current Sika AU TDS before publishing.",
      "Coverage: approximately 10–15 m²/4 kg kit depending on substrate porosity",
      "Apply by roller to achieve uniform coverage",
      "Allow to cure before applying self-levelling compound — typically 24 hrs at 20°C",
    ],
    limitations: [
      "Excess primer pooling must be avoided — roll out to prevent thick puddles which can remain tacky",
      "Not suitable for application over actively damp substrates with free water",
      "Remove all laitance, adhesive residues, and contamination before priming",
      "Working time limited — do not mix more than can be applied within pot life",
      "Must not be used as a standalone adhesive or bonding agent",
      "Always test RH before and after application to confirm moisture control performance",
    ],
    procurementSources: [
      { name: "Sika Australia", url: "https://aus.sika.com" },
      { name: "Sika Direct / distributor", url: "https://aus.sika.com/en/group/find-a-sika-branch.html" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#1d4ed8",
    name: "Mapei Mapeproof Primer",
    descriptionLine: "Two-part epoxy moisture barrier / DPM primer — confirm current specification and Australian availability with Mapei technical before specifying",
    productType: "Two-part epoxy moisture barrier / DPM primer",
    filterTags: ["2-Part-Epoxy", "High-RH", "Moisture-Control", "Magnesite"],
    techChips: [
      { label: "Two-part epoxy moisture barrie", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Mapei Mapeproof Primer is a Two-part epoxy moisture barrier / DPM primer. Two-part epoxy moisture-vapour barrier over high-RH or encapsulated magnesite substrates before levelling. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Mapei technical before specifying. TODO: verify specific performance figures from the current Mapei TDS.",
    technicalProperties: [
      "Two-part epoxy moisture barrier / DPM primer",
      "Two-part epoxy moisture-vapour barrier over high-RH or encapsulated magnesite substrates before levelling.",
      "Confirm key performance values (strength / coverage / application) from the current Mapei TDS — TODO",
      "Australian-market product — confirm current availability and pack sizes with Mapei",
    ],
    limitations: [
      "Confirm current product formulation and system suitability with Mapei technical before specifying",
      "TODO: confirm application limits, substrate preparation and temperature range from the current TDS",
      "Verify current Australian availability and pack sizes with Mapei",
    ],
    procurementSources: [
      { name: "Mapei — Australian trade supply", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#1d4ed8",
    name: "Mapei Triblock P",
    descriptionLine: "Three-component epoxy-cementitious moisture / DPM primer — confirm current specification and Australian availability with Mapei technical before specifying",
    productType: "Three-component epoxy-cementitious moisture / DPM primer",
    filterTags: ["2-Part-Epoxy", "High-RH", "Moisture-Control", "Magnesite"],
    techChips: [
      { label: "Three-component epoxy-cementit", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Mapei Triblock P is a Three-component epoxy-cementitious moisture / DPM primer. Three-component epoxy-cementitious moisture-tolerant primer/DPM for damp and high-RH floor substrates. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Mapei technical before specifying. TODO: verify specific performance figures from the current Mapei TDS.",
    technicalProperties: [
      "Three-component epoxy-cementitious moisture / DPM primer",
      "Three-component epoxy-cementitious moisture-tolerant primer/DPM for damp and high-RH floor substrates.",
      "Confirm key performance values (strength / coverage / application) from the current Mapei TDS — TODO",
      "Australian-market product — confirm current availability and pack sizes with Mapei",
    ],
    limitations: [
      "Confirm current product formulation and system suitability with Mapei technical before specifying",
      "TODO: confirm application limits, substrate preparation and temperature range from the current TDS",
      "Verify current Australian availability and pack sizes with Mapei",
    ],
    procurementSources: [
      { name: "Mapei — Australian trade supply", url: "https://www.mapei.com/au" },
    ],
  },
  {
    fullLabel: "Ardex Australia",
    brandUrl: "https://ardexaustralia.com",
    accentColor: "#0369a1",
    name: "Ardex WPM 300",
    descriptionLine: "Two-part epoxy moisture vapour barrier — confirm current specification and Australian availability with Ardex technical before specifying",
    productType: "Two-part epoxy moisture vapour barrier",
    filterTags: ["2-Part-Epoxy", "High-RH", "Moisture-Control", "Magnesite"],
    techChips: [
      { label: "Two-part epoxy moisture vapour", cls: "bg-slate-100 text-slate-700" },
      { label: "Ardex — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Ardex WPM 300 is a Two-part epoxy moisture vapour barrier. Two-part epoxy moisture-vapour barrier to control residual moisture before applying levelling compounds. Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Ardex technical before specifying. TODO: verify specific performance figures from the current Ardex TDS.",
    technicalProperties: [
      "Two-part epoxy moisture vapour barrier",
      "Two-part epoxy moisture-vapour barrier to control residual moisture before applying levelling compounds.",
      "Confirm key performance values (strength / coverage / application) from the current Ardex TDS — TODO",
      "Australian-market product — confirm current availability and pack sizes with Ardex",
    ],
    limitations: [
      "Confirm current product formulation and system suitability with Ardex technical before specifying",
      "TODO: confirm application limits, substrate preparation and temperature range from the current TDS",
      "Verify current Australian availability and pack sizes with Ardex",
    ],
    procurementSources: [
      { name: "Ardex — Australian trade supply", url: "https://ardexaustralia.com" },
    ],
  }



];

const FILTER_DEFS: { tag: FilterTag; label: string }[] = [
  { tag: "2-Part-Epoxy", label: "2-part epoxy" },
  { tag: "1-Part-Acrylic", label: "1-part acrylic" },
  { tag: "High-RH", label: "High RH" },
  { tag: "Moisture-Control", label: "Moisture control" },
  { tag: "Adhesion-Primer", label: "Adhesion primer" },
  { tag: "Floor-Levelling", label: "Floor levelling" },
  { tag: "Magnesite", label: "Magnesite" },
];

const TECH_INFO = {
  typicalApplications: [
    "Priming encapsulated magnesite floors before self-levelling underlayment application",
    "Moisture suppression on high-RH concrete slab surfaces before floor levelling",
    "Adhesion priming over non-porous, smooth, or contamination-risk substrates",
    "Pre-treatment of substrates where previous floor coverings have been removed",
    "Consolidating friable or powdery magnesite surface layers before levelling",
  ],
  selectionCriteria: [
    "Two-part epoxy primer: required when in-situ RH exceeds approximately 75%",
    "One-part acrylic primer: suitable when RH is within limits and substrate is sound",
    "Ardex MC Rapid / Sika Primer MB: preferred for occupied buildings with unknown magnesite condition",
    "Mapei Eco Prim T Plus: convenient single-component option for low-risk primed surfaces",
    "Match primer to SLC brand where possible for manufacturer warranty continuity",
    "Always test RH using ASTM F2170 in-situ probe or calcium chloride test before primer selection",
  ],
  limitations: [
    "No primer compensates for friable, actively corroding, or poorly adhered magnesite — remove first",
    "Primer does not eliminate the need for moisture testing — test before and after priming",
    "Primers do not provide structural consolidation of deeply carbonated or delaminated magnesite",
    "One-part acrylic primers are not moisture-barrier products and must not be used where RH is elevated",
    "Primer application over contaminated (oil, adhesive, paint) surfaces will fail — prepare substrate first",
  ],
  standardsNotes: [
    "ASTM F2170: standard for determining relative humidity in concrete floors",
    "ASTM F1869: calcium chloride test method for concrete moisture emission",
    "AS 1884: floor coverings — tolerances for floor surfaces in occupied buildings",
    "Manufacturer TDS: primer coverage rates, overcoating windows, and RH rating vary by product",
    "Safe Work Australia: guidance on magnesite dust management and respiratory hazards",
  ],
  suitableDefects: [
    "Magnesite flooring deterioration — pre-SLC primer treatment",
    "Moisture-affected concrete floor slabs before floor levelling",
    "Post-strip floor adhesive removal — adhesion primer for bare slab",
    "Corroded or partially removed magnesite before encapsulation and levelling",
  ],
  typicalSubstrates: [
    "Encapsulated magnesite flooring in Class 2 strata and residential buildings",
    "Concrete floor slabs with elevated or unknown relative humidity",
    "Smooth or non-absorptive concrete requiring adhesion improvement before SLC",
    "Previously adhesive-bonded surfaces after adhesive removal",
  ],
};

const SYSTEM_COMPARISON = [
  { product: "Ardex MC Rapid", brand: "Ardex", type: "2-part epoxy", rh: "TODO: confirm AU TDS", packSize: "TODO: confirm AU pack size" },
  { product: "Sika Primer MB", brand: "Sika", type: "2-part epoxy", rh: "TODO: confirm from AU TDS", packSize: "4 kg kit" },
  { product: "Fosroc Nitoprime 28", brand: "Fosroc/Parchem", type: "2-part epoxy", rh: "High-RH rated", packSize: "4 L kit" },
  { product: "Parchem Epirez 510", brand: "Parchem", type: "2-part epoxy", rh: "Moderate–high RH", packSize: "5 L kit" },
  { product: "Mapei Eco Prim T Plus", brand: "Mapei", type: "1-part acrylic", rh: "Low RH only — confirm AU TDS", packSize: "1 L / 10 L" },
];

export function MoistureSupprimersPrimersIntroSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 text-left">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
          <BookOpen size={16} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-sky-950">Moisture suppression primers for magnesite flooring</h2>
            <ChevronDown size={16} className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
          <p className="mt-1 text-sm text-slate-500">Epoxy and acrylic primers that suppress moisture vapour from magnesite and concrete substrates before self-levelling underlayment. Read more ↓</p>
        </div>
      </button>
      {open && (
        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-7 text-slate-600">
          <p>
            Magnesite flooring (magnesium oxychloride cement) is found in thousands of Australian Class 2 strata buildings constructed from the 1950s to 1980s. When intact and well-encapsulated, it functions as a stable floor screed. The critical remediation challenge is moisture: magnesite is hygroscopic and contains chloride salts which attract and retain water vapour. When floor coverings are replaced or new self-levelling underlayments are applied directly over magnesite without moisture control, osmotic blistering, adhesion failure, and chloride-driven delamination occur within months.
          </p>
          <p>
            Moisture suppression primers address this by creating a vapour barrier between the magnesite substrate and the overlying floor levelling compound. Two-part epoxy primers (Ardex MC Rapid, Sika Primer MB, Fosroc Nitoprime 28) provide a genuine moisture barrier rated to elevated relative humidity levels — typically 85–97% depending on the product. Single-component acrylic primers (Mapei Eco Prim T) improve adhesion but do not suppress moisture and must only be used where RH has been tested and confirmed to be within acceptable limits.
          </p>
          <p>
            Mandatory pre-treatment steps before primer application include: magnesite moisture testing per ASTM F2170 (in-situ RH probe method) or ASTM F1869 (calcium chloride test); removal of all friable, delaminating, and actively corroding magnesite; grinding to a minimum CSP 2 surface profile; and removal of all contaminants (oil, adhesives, paint, laitance). No primer — however well specified — can compensate for inadequate substrate preparation.
          </p>
          <p>
            The primer selected must be compatible with the self-levelling underlayment system. Where manufacturer warranty is required, specifying both primer and SLC from the same manufacturer (e.g. Ardex MC Rapid + Ardex K 15; Sika Primer MB + Sika Level-01 Top) is the most defensible approach. Always confirm current product specification and RH rating against the manufacturer&apos;s current TDS.
          </p>
        </div>
      )}
    </div>
  );
}

const DESIGN_CRITERIA = "Chemistry — two-part epoxy moisture-vapour suppression vs penetrating/consolidating epoxy (acrylic generally NOT suitable as a vapour barrier) and function (reduce slab moisture/vapour emission before flooring/coatings); in-situ relative humidity the system can be applied over (RH % per AS 1884 / ASTM F2170, e.g. up to ~95–98%) and the moisture-vapour-emission limit it brings the slab below for the flooring adhesive (MVER, g/m²/24h); film build / number of coats; bond/pull-off strength to damp concrete and to the subsequent levelling/topping (MPa); pot life, cure and overcoat window (min and max); viscosity/penetration for the slab porosity; aggregate broadcast for keying the topping; alkali and osmotic-blister resistance; surface preparation (mechanical abrasion to CSP, laitance removal); application temperature and dew-point/condensation control; NOT a structural/positive-side waterproofing membrane";

export function MoistureSupprimersPrimersProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);

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

      <AutoProductReference products={PRODUCTS} designCriteria={DESIGN_CRITERIA} sectionLabel="Magnesite flooring deterioration" cards={MS_CARDS} />
    </>
  );
}
