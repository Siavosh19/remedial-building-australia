"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers,
  ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "Inflatable-rubber"
  | "Mechanical-expansion"
  | "Integrated-plug"
  | "50mm"
  | "75mm"
  | "100mm"
  | "38mm-to-100mm"
  | "Reusable"
  | "Site-fabricated"
  | "Plumbing-trade"
  | "CodeMark"
  | "Waterproofing-trade";

type Product = {
  fullLabel: string;
  brandUrl?: string;
  tdsUrl?: string;
  accentColor: string;
  name: string;
  descriptionLine: string;
  productType: string;
  filterTags: FilterTag[];
  techChips: { label: string; cls: string }[];
  systemDescription: string[];
  technicalProperties: string[];
  limitations: string[];
  specifierNote: string;
  procurementSources: { name: string; url?: string }[];
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "H2O Supplies / The Waterproofing Shop / various",
    brandUrl: "https://h2osupplies.com.au",
    tdsUrl: "https://h2osupplies.com.au/products/flood-test-balloon",
    accentColor: "#0ea5e9",
    name: "Inflatable Rubber Flood Test Balloon Plug",
    descriptionLine: "Inflatable rubber balloon drain plug — 50mm, 75mm, and 100mm sizes — inserted into the drain outlet and inflated to seal against the pipe wall — flood test standard for residential balcony and wet area membrane QA — reusable",
    productType: "Inflatable rubber drain plug — flood test — 50mm / 75mm / 100mm",
    filterTags: ["Inflatable-rubber", "50mm", "75mm", "100mm", "Reusable", "Waterproofing-trade"],
    techChips: [
      { label: "Inflatable rubber", cls: "bg-sky-100 text-sky-800" },
      { label: "50 / 75 / 100mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Hand pump inflation", cls: "bg-green-50 text-green-700" },
      { label: "Tie-off ring", cls: "bg-amber-50 text-amber-700" },
      { label: "Reusable", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription: [
      "Inflatable rubber balloon flood test plugs are the standard drain sealing product for flood testing balcony and terrace waterproofing membranes on Australian residential and strata remediation projects. The rubber balloon is inserted into the drain outlet pipe in its deflated state, then inflated using a hand pump or air compressor — the expanded rubber body presses against the internal pipe wall to create a watertight seal. Available in 50mm, 75mm, and 100mm sizes to suit standard nominal pipe diameters.",
      "The balloon is fitted with an air inflation valve and a tie-off ring or circle hook at the top — a rope or wire is attached to the tie-off ring before insertion to prevent the plug from dropping down the pipe if it deflates or is dislodged during the test. The tie-off rope should be tied off at the drain grate or an adjacent fixing point before filling commences. After the flood test is complete, the balloon is deflated and removed from the drain.",
      "Confirm the pipe internal diameter before ordering — the balloon must match the actual internal diameter of the drain outlet pipe, not the nominal pipe size. On remediation projects, the existing drain pipe internal diameter may differ from the nominal size due to age, pipe type, or previous modifications. Measure the pipe ID before ordering plugs.",
    ],
    technicalProperties: [
      "Heavy-duty inflatable rubber construction — reusable",
      "Available in 50mm, 75mm, and 100mm sizes — suits standard drain pipe internal diameters",
      "Fitted with air inflation valve and tie-off ring",
      "Inflated by hand pump or air compressor",
      "Creates a seal against the internal pipe wall — holds test head of water for minimum 24-hour test period",
      "Suitable for residential and commercial balcony, wet area, and pipe testing applications",
    ],
    limitations: [
      "Confirm the balloon size matches the actual internal pipe diameter before inserting — incorrect size will not seal correctly",
      "Tie-off ring must be used — attach rope before insertion to prevent loss down the pipe",
      "Do not over-inflate — over-inflation can damage the drain body or puddle flange",
      "Inspect the balloon for damage before each use — a cracked or degraded balloon will not maintain a seal for the full test period",
      "Inflate slowly and check for seal before filling — do not fill the balcony until the plug is confirmed seated and not leaking around the perimeter",
      "Confirm current availability and sizing with supplier before ordering",
    ],
    specifierNote: "Confirm plug size against the actual internal pipe diameter before ordering.",
    procurementSources: [
      { name: "H2O Supplies", url: "https://h2osupplies.com.au" },
      { name: "The Waterproofing Shop", url: "https://thewaterproofingshop.com.au" },
      { name: "WaterStop Shop", url: "https://waterstop.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
      { name: "Bldcare", url: "https://www.bldcare.com.au" },
      { name: "TradieCart", url: "https://www.tradiecart.com.au" },
    ],
  },
  {
    fullLabel: "Plumboss / Drainchem / plumbing trade",
    brandUrl: "https://www.plumboss.com.au",
    accentColor: "#64748b",
    name: "Mechanical Expansion Test Plug — Aluminium",
    descriptionLine: "Mechanical aluminium expansion plug — wing nut tightened — expands to seal a range of internal pipe diameters — alternative to inflatable balloon where pipe surface is irregular or a rigid plug is preferred — plumbing trade supply",
    productType: "Mechanical wing nut expansion plug — 38mm to 100mm+ — plumbing trade",
    filterTags: ["Mechanical-expansion", "38mm-to-100mm", "Reusable", "Plumbing-trade"],
    techChips: [
      { label: "Mechanical expansion", cls: "bg-slate-100 text-slate-700" },
      { label: "Aluminium body", cls: "bg-slate-100 text-slate-700" },
      { label: "38–100mm+ range", cls: "bg-green-50 text-green-700" },
      { label: "No pump — hand tightened", cls: "bg-amber-50 text-amber-700" },
      { label: "Rigid body", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription: [
      "Mechanical aluminium expansion plugs use a wing nut and plate mechanism to compress a rubber gasket against the internal pipe wall, expanding the plug body to create a seal. Unlike inflatable balloon plugs, mechanical expansion plugs do not require air pressure — they are tightened by hand to the correct compression level. Available in a range of sizes covering standard pipe diameters from 38mm (1½ inch) through to 100mm (4 inch) and larger.",
      "Mechanical expansion plugs are used in flood testing where the drain pipe internal surface is irregular, out-of-round, or where the rigidity of the plug body provides a more reliable seal than an inflatable balloon. They are also preferred on some commercial and strata remediation projects where the specifier or QA protocol requires a mechanical plug rather than an inflatable format.",
      "The plug is inserted into the drain outlet, the wing nut is tightened until the rubber gasket is firmly compressed against the pipe wall, and the balcony is filled. After the test, the wing nut is loosened and the plug is removed. Reusable. Confirm the pipe internal diameter before selecting the correct plug size — mechanical plugs are sized to a specific pipe diameter range, not a single size.",
    ],
    technicalProperties: [
      "Aluminium body with rubber compression gasket — mechanical wing nut expansion",
      "Available in pipe diameter sizes from 38mm to 100mm+ — confirm size range with supplier",
      "Does not require air or pump — hand-tightened",
      "Rigid body — suitable for irregular or out-of-round pipe bore",
      "Reusable — durable construction for repeated use",
      "Available through plumbing trade supply in Australia",
    ],
    limitations: [
      "Confirm the correct size against the actual internal pipe diameter — mechanical plugs are sized to a range, not a single nominal size",
      "Over-tightening can damage the drain body or create stress on the puddle flange perimeter — tighten to firm compression only",
      "Mechanical plug bodies protrude above the drain — confirm clearance with the drain grate before inserting",
      "Confirm current availability and sizing with plumbing trade supplier before ordering",
    ],
    specifierNote: "Confirm plug size against actual internal pipe diameter before ordering.",
    procurementSources: [
      { name: "Plumboss", url: "https://www.plumboss.com.au" },
      { name: "Drainchem", url: "https://www.drainchem.com.au" },
      { name: "Reece Plumbing — confirm stocking with local branch", url: "https://www.reece.com.au" },
      { name: "Tradelink — confirm stocking with local branch", url: "https://www.tradelink.com.au" },
    ],
  },
  {
    fullLabel: "Plumtest / Plumbers Choice",
    brandUrl: "https://www.plumberschoice.com.au",
    tdsUrl: "https://www.plumberschoice.com.au/product/plumtest-inflatable-test-plug-100mm/",
    accentColor: "#3b82f6",
    name: "Plumtest Inflatable Test Plug — Plumbers Choice",
    descriptionLine: "Inflatable rubber test plug — 50mm and 100mm — plumbing trade supply — for flood testing balcony drains and pressure testing drainage pipes — standard plumbers bung format",
    productType: "Inflatable rubber bung — plumbing trade supply — 50mm and 100mm",
    filterTags: ["Inflatable-rubber", "50mm", "100mm", "Reusable", "Plumbing-trade"],
    techChips: [
      { label: "Inflatable rubber", cls: "bg-blue-100 text-blue-800" },
      { label: "50mm and 100mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Plumbing trade supply", cls: "bg-green-50 text-green-700" },
      { label: "Reusable", cls: "bg-slate-100 text-slate-700" },
      { label: "Widely available", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: [
      "Plumtest inflatable rubber test plugs (distributed through Plumbers Choice and plumbing trade suppliers) are a standard plumbing trade format inflatable drain bung for flood testing and pipe pressure testing. Available in 50mm and 100mm sizes for standard pipe diameters. The rubber body is inflated to seal against the internal pipe wall, the area is filled, and the plug is deflated and removed after the test.",
      "This is a widely available plumbing trade product stocked through plumbing suppliers across Australia — Plumbers Choice, Reece, Tradelink, and similar. It is a practical alternative to waterproofing-specific flood test balloon products where the waterproofing supplier does not stock inflatable plugs or where plumbing trade supply is more convenient for the project.",
      "Confirm the plug size against the actual internal pipe diameter before ordering. The 100mm plug suits standard 100mm nominal floor waste drain outlets on residential balconies. The 50mm plug suits 50mm nominal pipe diameters used in some linear drain and secondary outlet applications.",
    ],
    technicalProperties: [
      "Inflatable rubber test plug — plumbing trade format",
      "Available in 50mm and 100mm sizes",
      "Inflated to seal against internal pipe wall",
      "Reusable — standard rubber bung construction",
      "Available through plumbing trade supply across Australia",
    ],
    limitations: [
      "Confirm the plug includes a tie-off feature before inserting — not all plumbing bung formats include a tie-off ring — if no tie-off is present, attach a wire or cord to the valve stem before insertion to prevent loss down the pipe",
      "Confirm size against actual internal pipe diameter before ordering",
      "Inspect for damage before use — degraded rubber will not maintain a flood test seal",
      "Confirm current availability with local plumbing trade supplier before ordering",
    ],
    specifierNote: "Confirm plug size against actual internal pipe diameter before ordering. Confirm tie-off method before insertion.",
    procurementSources: [
      { name: "Plumbers Choice", url: "https://www.plumberschoice.com.au" },
      { name: "Reece Plumbing — confirm stocking with local branch", url: "https://www.reece.com.au" },
      { name: "Tradelink — confirm stocking with local branch", url: "https://www.tradelink.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Stormtech",
    brandUrl: "https://stormtech.com.au",
    tdsUrl: "https://stormtech.com.au/product/100flex",
    accentColor: "#0d9488",
    name: "Stormtech 100FLEX — Integrated Flood Test Plug",
    descriptionLine: "100mm flexible neoprene puddle flange with built-in removable flood test plug and water level gauge — eliminates the need for a separate drain plug — CodeMark certified — internal and external wet area applications",
    productType: "Integrated flood test plug — 100FLEX puddle flange system — CodeMark CM40377",
    filterTags: ["Integrated-plug", "100mm", "CodeMark", "Waterproofing-trade"],
    techChips: [
      { label: "Integrated flood test plug", cls: "bg-teal-100 text-teal-800" },
      { label: "100mm", cls: "bg-slate-100 text-slate-700" },
      { label: "Built-in water level gauge", cls: "bg-green-50 text-green-700" },
      { label: "CodeMark CM40377", cls: "bg-slate-100 text-slate-700" },
      { label: "Lifetime warranty", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription: [
      "The Stormtech 100FLEX is a 100mm neoprene flexible rubber puddle flange with an integrated, removable flood test plug built into the flange body. The flood test plug is a purpose-designed component of the 100FLEX system — it seals the drain outlet without requiring a separate inflatable balloon or mechanical plug. A small incision in the plug base allows water to be released after the test. A water level gauge is also built into the flange, simplifying the process of monitoring water depth during the flood test.",
      "The 100FLEX is CodeMark Australia certified (CM40377) for internal and external wet area applications on concrete substrates and carries a lifetime warranty. In balcony waterproofing remediation, the 100FLEX is specified where the project calls for an integrated, all-in-one puddle flange and flood test solution — the flange provides the membrane integration at the drain point and the flood test plug and gauge are built in, eliminating the need to source, size, and manage separate flood test equipment.",
      "This product is listed on this flood test page as a reference for specifiers who are selecting puddle flanges and want to be aware that integrated flood test plug options exist. The full puddle flange specification for this product should be confirmed on the Drainage Puddle Flanges page.",
    ],
    technicalProperties: [
      "Neoprene flexible rubber puddle flange — 100mm outlet",
      "Integrated removable flood test plug — no separate drain plug required",
      "Built-in water level gauge — simplifies depth monitoring during flood test",
      "CodeMark Australia certified CM40377 — internal and external wet areas on concrete",
      "Lifetime warranty",
      "Membrane bonds to neoprene flange surface — confirm membrane compatibility with Stormtech before specifying",
    ],
    limitations: [
      "Confirms the puddle flange and flood test plug in a single product — if the 100FLEX is not the specified puddle flange on the project, a separate flood test plug from Cards 1–3 is required",
      "Confirm membrane compatibility with the neoprene flange material and Stormtech technical before applying any liquid-applied membrane over the flange",
      "100mm only — no alternative sizes currently listed — confirm current product range with Stormtech before specifying",
      "The incision method for water release after the test must be made carefully to avoid damaging the membrane lap at the flange perimeter",
    ],
    specifierNote: "Confirm full puddle flange specification on the Drainage Puddle Flanges page. Confirm membrane compatibility with Stormtech before specifying.",
    procurementSources: [
      { name: "Stormtech", url: "https://stormtech.com.au" },
      { name: "The Waterproofing Shop", url: "https://thewaterproofingshop.com.au" },
      { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au" },
    ],
  },
  {
    fullLabel: "Various / site-fabricated",
    accentColor: "#94a3b8",
    name: "Water Level Gauge / Depth Marker",
    descriptionLine: "Water level gauge or depth marker — used to mark and monitor water level during the flood test period — required for accurate pass/fail assessment and evaporation allowance — site-fabricated or purpose-made gauge",
    productType: "Flood test accessory — site-fabricated or trade supply — no brand required",
    filterTags: ["Site-fabricated"],
    techChips: [
      { label: "Site-fabricated", cls: "bg-slate-100 text-slate-700" },
      { label: "Flood test accessory", cls: "bg-slate-100 text-slate-700" },
      { label: "QA documentation", cls: "bg-green-50 text-green-700" },
      { label: "Evaporation reference", cls: "bg-amber-50 text-amber-700" },
      { label: "No brand required", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription: [
      "A water level gauge or depth marker is used during the flood test to record the starting water level and monitor any drop in water level over the test period. Without a reference mark, it is impossible to accurately assess whether any reduction in water level during the test is due to membrane leakage or evaporation. The gauge does not need to be a purpose-manufactured product — a pencil mark on the wall or upstand at the starting water level, combined with a small evaporation reference container on the balcony surface, is sufficient for a standard residential balcony flood test.",
      "On larger or more formal strata remediation projects, a purpose-made gauge tube — a transparent PVC tube fixed vertically to the wall or upstand with graduations marked in millimetres — provides a more accurate and auditable water level record for the flood test certificate. Some puddle flange systems (such as the Stormtech 100FLEX) include a built-in water level gauge at the drain.",
      "The evaporation reference container — a small open container of water placed on the balcony surface at the start of the test — allows the evaporation rate at the balcony microclimate to be measured over the test period. The measured evaporation from the reference container is deducted from any apparent water level drop in the balcony before a fail determination is made.",
    ],
    technicalProperties: [
      "Water level gauge — pencil mark, tape mark, or purpose-made graduated gauge tube on the wall or upstand",
      "Evaporation reference container — small open container placed on the balcony surface at test commencement",
      "No specific brand or product required — site-fabricated or purpose-made",
      "Record starting water level, ending water level, and evaporation reference reading for the flood test certificate",
    ],
    limitations: [
      "A pencil or tape mark on the wall is the minimum acceptable gauge — it must be clearly visible and not disturbed during the test",
      "The evaporation reference container must be placed on the balcony surface — not on an adjacent surface — to capture the site-specific evaporation rate during the test",
      "Photograph the starting water level mark and the reference container at the commencement of the test for the flood test certificate record",
      "Do not use the evaporation allowance to explain away a large, rapid drop in water level — a significant drop indicates a leak, not evaporation",
    ],
    specifierNote: "No product specification required — implement as part of the flood test procedure and document in the flood test certificate.",
    procurementSources: [
      { name: "Site-fabricated — pencil mark or tape on wall and small open container on balcony surface" },
      { name: "Transparent PVC gauge tube — plumbing trade supply" },
      { name: "Some puddle flange systems include integrated gauge — see Stormtech 100FLEX (Card 4)" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Inflatable-rubber", label: "Inflatable rubber" },
  { id: "Mechanical-expansion", label: "Mechanical expansion" },
  { id: "Integrated-plug", label: "Integrated plug" },
  { id: "50mm", label: "50mm" },
  { id: "75mm", label: "75mm" },
  { id: "100mm", label: "100mm" },
  { id: "38mm-to-100mm", label: "38mm–100mm range" },
  { id: "Reusable", label: "Reusable" },
  { id: "Site-fabricated", label: "Site-fabricated" },
  { id: "Plumbing-trade", label: "Plumbing trade supply" },
  { id: "CodeMark", label: "CodeMark certified" },
  { id: "Waterproofing-trade", label: "Waterproofing trade supply" },
];

type ComparisonRow = {
  product: string;
  brand: string;
  type: string;
  pipeSizes: string;
  inflationMethod: string;
  tieOff: string;
  keyRestriction: string;
};

const COMPARISON: ComparisonRow[] = [
  {
    product: "Inflatable Rubber Balloon Plug",
    brand: "H2O Supplies / The Waterproofing Shop / various",
    type: "Inflatable rubber",
    pipeSizes: "50mm, 75mm, 100mm",
    inflationMethod: "Hand pump or air compressor",
    tieOff: "Yes — tie-off ring — mandatory",
    keyRestriction: "Confirm balloon size matches actual pipe ID — do not over-inflate — inspect for damage before use",
  },
  {
    product: "Mechanical Aluminium Expansion Plug",
    brand: "Plumboss / Drainchem / various",
    type: "Mechanical wing nut expansion",
    pipeSizes: "38mm to 100mm+ — confirm range",
    inflationMethod: "No pump — hand tightened",
    tieOff: "No — attach cord to valve or body before insertion",
    keyRestriction: "Confirm correct size for pipe ID — do not over-tighten — confirm protrusion clearance with drain grate",
  },
  {
    product: "Plumtest Inflatable Test Plug",
    brand: "Plumtest / Plumbers Choice",
    type: "Inflatable rubber — plumbing trade format",
    pipeSizes: "50mm and 100mm",
    inflationMethod: "Hand pump",
    tieOff: "Confirm before ordering — not all formats include tie-off ring",
    keyRestriction: "Widely available through plumbing trade — confirm tie-off method before insertion",
  },
  {
    product: "Stormtech 100FLEX — Integrated Plug",
    brand: "Stormtech",
    type: "Integrated flood test plug — built into puddle flange",
    pipeSizes: "100mm only",
    inflationMethod: "N/A — integrated plug",
    tieOff: "N/A — built-in system",
    keyRestriction: "Only available as part of the 100FLEX puddle flange — not a standalone plug — confirm membrane compatibility with Stormtech",
  },
  {
    product: "Water Level Gauge / Depth Marker",
    brand: "Various / site-fabricated",
    type: "Pencil mark, tape mark, or graduated gauge tube",
    pipeSizes: "N/A",
    inflationMethod: "N/A",
    tieOff: "N/A",
    keyRestriction: "Minimum: pencil mark on wall — add evaporation reference container — photograph for QA record",
  },
];

const TECH_INFO = {
  as3740: [
    "AS 3740:2021 requires that waterproofing membranes in wet areas be tested before covering",
    "For external balcony applications on Class 2 strata buildings, the flood test is a mandatory hold point — the membrane must be tested and confirmed defect-free before tile adhesive and tiles are applied",
    "The standard requires a minimum water depth of 25mm above the lowest point of the membrane surface and a minimum test period",
    "Confirm the current AS 3740:2021 flood test requirements with the waterproofing consultant or certifier for the specific project — requirements may vary by jurisdiction and project type",
  ],
  procedure: [
    "1. Confirm the membrane is fully cured — do not flood test an incompletely cured membrane",
    "2. Visually inspect the full membrane surface for pinholes, thin patches, dry fabric edges, uncovered junctions, and defects at penetrations — repair and re-cure any identified defects before testing",
    "3. Install flood test plugs in all drain outlets — confirm the plug is correctly seated and will hold the test head of water without leaking before filling",
    "4. Fill the balcony to a minimum depth of 25mm above the lowest membrane point — mark the water level on the wall or upstand at the start of the test",
    "5. Record the start time, water depth, date, and weather conditions",
    "6. Inspect the underside of the balcony slab and all areas below or adjacent to the balcony for any sign of water during the test period",
    "7. At the end of the minimum test period (typically 24 hours — confirm with project specification), record the water level — any drop not attributable to evaporation indicates a leak",
    "8. If pass: record the result, remove plugs, allow to drain, and proceed with tile adhesive",
    "9. If fail: identify the leak location, repair the defect, re-cure, and re-test before proceeding",
  ],
  plugSelection: [
    "Inflatable rubber balloon plug — suits 50mm, 75mm, and 100mm internal pipe diameters — inflated with a hand pump or air compressor — most common format on residential balconies — must be fitted with a tie-off ring to prevent loss down the pipe",
    "Mechanical expansion plug — aluminium or nylon body expanded by tightening a wing nut — suits a range of pipe diameters — more rigid than inflatable format — appropriate where the drain pipe internal surface may be irregular",
    "Integrated puddle flange flood test plug — some puddle flange systems (e.g. Stormtech 100FLEX) include a built-in removable flood test plug — eliminates the need for a separate drain plug — confirm whether the installed puddle flange has an integrated plug before ordering separate plugs",
  ],
  evaporation: [
    "On external balconies exposed to sun and wind, water evaporation during the test period can cause a reduction in water level that is not the result of membrane leakage",
    "A reasonable evaporation allowance should be applied when interpreting test results",
    "Place a shallow container of water on the balcony surface at the start of the test and measure evaporation from it over the same period — this provides a site-specific evaporation rate to deduct from any apparent water level drop before concluding a fail",
    "Do not use the evaporation allowance to explain away a large, rapid drop in water level — a significant drop indicates a leak, not evaporation",
  ],
  documentation: [
    "The flood test record must include: project address and balcony location, date and start and end time of the test, water depth at commencement and at the end of the test period, evaporation allowance applied, weather conditions during the test, name and licence number of the waterproofing applicator, pass or fail result, and the applicator's signature",
    "On Class 2 strata projects, a formal flood test certificate is typically required by the strata manager, owners corporation, or certifier before tiling proceeds",
    "Photographs of the plug in place, the starting water level mark, and the final water level mark should be retained with the certificate",
    "A verbal pass is not a QA record — written documentation is mandatory on every compliant balcony waterproofing scope",
  ],
  structuralLoading: [
    "Water at 25mm depth imposes a load of approximately 25 kg/m² on the balcony slab — at 50mm depth the load is approximately 50 kg/m²",
    "On balconies with significant floor area, confirm with the structural engineer that the flood test water load does not exceed the balcony's design imposed load before conducting the test",
    "This is particularly relevant on large podium deck areas and older buildings where the balcony structural capacity may be limited or unknown",
    "Do not assume all balconies can sustain a flood test load without engineering confirmation on large or older structures",
  ],
};

/* ── Collapsible helpers ── */

function CollapsibleList({
  items,
  icon,
  limit = 3,
}: {
  items: string[];
  icon: "check" | "x";
  limit?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
  const extra = items.length - limit;
  return (
    <div>
      <ul className="space-y-1.5">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs leading-5 text-slate-600">
            {icon === "check" ? (
              <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-500" />
            ) : (
              <XCircle size={12} className="mt-0.5 shrink-0 text-red-400" />
            )}
            {item}
          </li>
        ))}
      </ul>
      {items.length > limit && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600"
        >
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
        <button
          onClick={() => setExpanded((e) => !e)}
          className="text-[9px] font-bold text-slate-400 hover:text-slate-600"
        >
          {expanded ? "Hide ↑" : "See more ↓"}
        </button>
      </div>
      {expanded && (
        <div className="mt-2 space-y-1.5">
          {sources.map((src) => (
            <div
              key={src.name}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs"
            >
              {src.url ? (
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900"
                >
                  {src.name}
                  <ExternalLink size={9} className="text-slate-300" />
                </a>
              ) : (
                <span className="font-semibold text-slate-600">{src.name}</span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="mt-2 text-[10px] italic text-slate-400">
        Confirm suitability with the current manufacturer TDS before specifying or applying.
      </p>
    </div>
  );
}

function CollapsibleCardDetails({
  text,
  chips,
}: {
  text: string;
  chips: { label: string; cls: string }[];
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (
        <>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>
          {chips.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                  {chip.label}
                </span>
              ))}
            </div>
          )}
        </>
      )}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600"
      >
        {expanded ? "Hide details ↑" : "Show details ↓"}
      </button>
    </div>
  );
}

function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p
        className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}
      >
        {text}
      </p>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Show less ↑" : "Show more ↓"}
      </button>
    </div>
  );
}

export function FloodTestIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is flood test equipment — balcony waterproofing?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Flood testing is the process of verifying the integrity of a completed waterproofing membrane before it is covered by screed, tiles, or any other finish. All drainage points in the area are sealed with flood test plugs, the area is filled with water to a minimum depth, and the water level is monitored over a minimum period — typically 24 hours — while the underside and perimeter of the balcony or terrace are inspected for any sign of water penetration. A flood test that passes confirms that the membrane is continuous, correctly applied, and watertight before it is permanently covered. A flood test that fails identifies the location of a defect while the membrane is still accessible and repairable.
        </p>
        {expanded && (
          <>
            <p>
              Flood test equipment for balcony waterproofing remediation consists primarily of drain plugs that seal the floor waste or puddle flange outlet during the test. The plug must be capable of sealing the drain completely against the test head of water without leaking, must not damage the membrane or the drain body, and must be easily removable after the test. Drain plugs used in flood testing are available in inflatable rubber balloon formats, mechanical expansion formats, and as integrated components built into specific puddle flange systems. The correct plug type depends on the drain outlet diameter, the drain body type, and the puddle flange system installed.
            </p>
            <p>
              Flood test documentation is a mandatory quality assurance hold point on Class 2 strata balcony waterproofing remediation projects. The test result — pass or fail, water depth, test duration, date, and inspector — must be recorded and retained as part of the project QA record. On strata remediation projects, the flood test certificate is typically required by the building manager, owners corporation, or certifier before tiling can proceed.
            </p>
          </>
        )}
      </div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900"
      >
        {expanded ? "Read less ↑" : "Read more ↓"}
      </button>
    </div>
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
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-sky-950 text-white">
          {icon}
        </div>
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

export function FloodTestProductSection() {
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

  const visibleProducts =
    activeFilters.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) =>
          Array.from(activeFilters).every((f) => p.filterTags.includes(f))
        );

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 400 : -400, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Technical Accordion ── */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setAccordionOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50"
        >
          <div>
            <p className="text-base font-extrabold text-sky-950">System Technical Reference</p>
            <p className="mt-0.5 text-xs text-slate-500">
              AS 3740 flood test requirements, test procedure, water depth, test duration, documentation, plug selection, fail protocol
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">
            {accordionOpen ? (
              <>Hide detail <ChevronUp size={14} /></>
            ) : (
              <>Show detail <ChevronDown size={14} /></>
            )}
          </div>
        </button>
        {accordionOpen && (
          <div className="border-t border-slate-100 px-7 pb-7 pt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TechCard icon={<BookOpen size={15} />} title="AS 3740 Flood Test Requirements" items={TECH_INFO.as3740} style="bullet" />
              <TechCard icon={<Layers size={15} />} title="Flood Test Procedure — Standard Balcony" items={TECH_INFO.procedure} style="check" />
              <TechCard icon={<CheckCircle size={15} />} title="Plug Selection" items={TECH_INFO.plugSelection} style="check" />
              <TechCard icon={<AlertTriangle size={15} />} title="Evaporation Allowance" items={TECH_INFO.evaporation} style="warn" />
              <TechCard icon={<FileText size={15} />} title="Documentation" items={TECH_INFO.documentation} style="bullet" />
              <TechCard icon={<AlertTriangle size={15} />} title="Structural Loading" items={TECH_INFO.structuralLoading} style="warn" />
            </div>
          </div>
        )}
      </div>

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Product Reference</h2>
            <p className="mt-1 text-sm text-slate-500">
              5 products — 4 brands — inflatable rubber plugs, mechanical expansion plugs, integrated puddle flange plug systems, and water level gauges — flood test equipment for balcony and terrace membrane QA
            </p>
          </div>
        </div>

        {/* Filter chips */}
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
                  active
                    ? "border-sky-950 bg-sky-950 text-white"
                    : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                }`}
              >
                {f.label}
              </button>
            );
          })}
          {activeFilters.size > 0 && (
            <button
              type="button"
              onClick={() => setActiveFilters(new Set())}
              className="text-xs text-slate-400 underline hover:text-slate-600"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Nav row */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400">
            {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""} — 3 visible, scroll for more
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-sky-300 hover:text-sky-950"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable card row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {visibleProducts.map((product) => (
            <div
              key={product.name}
              className="flex-none"
              style={{ width: "calc(33.333% - 14px)", minWidth: "300px" }}
            >
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                style={{ borderLeft: `4px solid ${product.accentColor}` }}
              >
                {/* Card header */}
                <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      {product.fullLabel}
                    </span>
                    <div className="flex shrink-0 items-center gap-1">
                      {product.tdsUrl && (
                        <a
                          href={product.tdsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <FileText size={9} /> TDS
                        </a>
                      )}
                      {product.brandUrl && (
                        <a
                          href={product.brandUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                        >
                          <ExternalLink size={9} /> Brand Site
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                    {product.techChips.filter((c) => c.label.toLowerCase().includes("warranty")).map((chip) => (
                      <span key={chip.label} className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${chip.cls}`}>
                        {chip.label}
                      </span>
                    ))}
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips.filter((c) => !c.label.toLowerCase().includes("warranty"))}
                  />
                </div>

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription.join('\n\n')} />
                </div>

                {/* Technical Properties & Limitations */}
                <div className="space-y-3 px-5 py-4">
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-green-700">Technical Properties</p>
                    <CollapsibleList items={product.technicalProperties} icon="check" limit={3} />
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-red-700">Limitations</p>
                    <CollapsibleList items={product.limitations} icon="x" limit={3} />
                  </div>
                  {product.specifierNote && (
                    <div className="rounded-lg border border-sky-100 bg-sky-50 px-3 py-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-sky-700">Specifier note</p>
                      <p className="mt-0.5 text-xs italic text-sky-800">{product.specifierNote}</p>
                    </div>
                  )}
                </div>

                {/* Procurement Sources */}
                <div className="mt-auto border-t border-slate-100 bg-slate-50 px-5 py-3">
                  <CollapsibleSources sources={product.procurementSources} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Comparison Table ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Flood test equipment comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of flood test plug types and accessories. Confirm all product selections against the current manufacturer TDS before specifying.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Brand</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pipe sizes</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Inflation method</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Tie-off</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key restriction</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row, i) => (
                <tr key={row.product} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.product}</td>
                  <td className="px-4 py-3 text-slate-600">{row.brand}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.pipeSizes}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.inflationMethod}</td>
                  <td className="px-4 py-3 text-slate-600">{row.tieOff}</td>
                  <td className="px-4 py-3 text-slate-500 text-[11px] italic">{row.keyRestriction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
