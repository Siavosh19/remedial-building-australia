"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";

type FilterTag =
  | "National"
  | "Eastern-states"
  | "SA-WA"
  | "WA-only"
  | "Bagged"
  | "Bulk"
  | "Trade"
  | "AS-3700"
  | "GP-cement"
  | "Hydrated-lime";

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
    fullLabel: "Boral Australia",
    brandUrl: "https://www.boral.com.au",
    accentColor: "#b45309",
    name: "Boral GP Cement (Builders Cement) + Boral Hydrated Lime — M3/M4 Repointing Mortar",
    descriptionLine: "Boral GP Cement (40 kg / 20 kg bags) + Boral Hydrated Lime (20 kg bags) — site-mixed to AS 3700 M3 or M4 designation — national distribution through Boral trade network and hardware merchants",
    productType: "Site-mixed GP cement + hydrated lime repointing mortar — Boral — national supply",
    filterTags: ["National", "Bagged", "Trade", "AS-3700", "GP-cement", "Hydrated-lime"],
    techChips: [
      { label: "Boral GP Cement", cls: "bg-amber-100 text-amber-800" },
      { label: "Boral Hydrated Lime", cls: "bg-stone-100 text-stone-700" },
      { label: "National supply", cls: "bg-green-50 text-green-700" },
      { label: "Trade + hardware", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Boral Australia's GP cement (marketed as Boral Builders Cement or Boral GP Cement) combined with Boral Hydrated Lime for site-mixed repointing mortar on Class 2 strata building facades. Boral GP Cement conforms to AS 3972 (Type GP), providing consistent compressive strength and workability. When blended with Boral Hydrated Lime at a 1:1:6 (cement:lime:sand) ratio by volume, the mix produces an AS 3700 M3 class mortar — the standard specification for external face brick and concrete masonry repointing. A 1:2:9 ratio produces a softer M4 class mortar for less exposed locations. Boral products are available in 20 kg and 40 kg bags through Boral trade centres, Bunnings Warehouse, Mitre 10, and independent masonry merchants across all states and territories. Boral operates cement grinding facilities and lime production nationally, providing consistent and reliable supply. The correct mix proportion must be confirmed with the engineer, as the mortar designation must match or be softer than the existing brick unit. A cured trial panel (minimum 28 days) is mandatory before approving colour match.",
    technicalProperties: [
      "Boral GP Cement — AS 3972 Type GP compliant — consistent compressive strength and workability nationally",
      "Boral Hydrated Lime — calcium hydroxide filler — improves workability, reduces shrinkage, increases long-term flexibility",
      "1:1:6 blend (cement:lime:sand) → AS 3700 M3 mortar (~8 MPa) — standard external repointing designation",
      "1:2:9 blend (cement:lime:sand) → AS 3700 M4 mortar (~5 MPa) — suitable for less exposed or sheltered locations",
      "Boral supply network: Boral trade centres, Bunnings, Mitre 10, and masonry merchants nationally",
      "20 kg and 40 kg cement bags; 20 kg hydrated lime bags — standard retail and trade pack sizes",
    ],
    limitations: [
      "Site-mixed mortar quality depends on accurate batching — use calibrated measuring buckets, not shovels, for cement:lime:sand proportions",
      "Colour consistency relies on using the same sand source throughout the job — change in sand colour will cause visible banding",
      "28-day cured trial panel mandatory before approving colour match — fresh and cured mortar colours differ significantly",
      "Not suitable for soft, historic, or lime-mortar brickwork — cement mortar too rigid — causes brick face spalling",
    ],
    procurementSources: [
      { name: "Boral Trade Centres — all states", url: "https://www.boral.com.au" },
      { name: "Bunnings Warehouse — Boral Builders Cement + Hydrated Lime", url: "https://www.bunnings.com.au" },
      { name: "Mitre 10 — national", url: "https://www.mitre10.com.au" },
      { name: "Independent masonry merchants — confirm local availability", url: "https://www.boral.com.au" },
    ],
  },
  {
    fullLabel: "Cement Australia (Holcim / Hanson)",
    brandUrl: "https://www.cementaustralia.com.au",
    accentColor: "#0369a1",
    name: "Cement Australia GP Cement + Hydrated Lime — M3/M4 Repointing Mortar",
    descriptionLine: "Cement Australia GP Cement (now under Holcim) + hydrated lime — site-mixed to AS 3700 M3 or M4 — strong eastern states coverage through Holcim, Hanson and Cement Australia distribution",
    productType: "Site-mixed GP cement + hydrated lime repointing mortar — Cement Australia / Holcim — eastern states",
    filterTags: ["National", "Eastern-states", "Bagged", "Bulk", "Trade", "AS-3700", "GP-cement", "Hydrated-lime"],
    techChips: [
      { label: "Cement Australia / Holcim", cls: "bg-sky-100 text-sky-800" },
      { label: "Eastern states supply", cls: "bg-green-50 text-green-700" },
      { label: "Bagged + bulk", cls: "bg-slate-100 text-slate-700" },
      { label: "AS 3972 GP", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Cement Australia GP Cement (now part of the Holcim group following the Holcim/Lafarge and subsequent Hanson acquisitions) combined with hydrated lime for site-mixed repointing mortar on Class 2 strata facades. Cement Australia operates clinker and grinding facilities in Queensland and New South Wales, with distribution across eastern Australia through the Cement Australia, Holcim, and former Hanson trade supply networks. The GP cement conforms to AS 3972 Type GP. When blended with hydrated lime and washed sharp sand at a 1:1:6 volume ratio, the mix achieves AS 3700 M3 mortar designation (~8 MPa). Bulk supply from Cement Australia batching facilities is available for large projects, in addition to 20 kg and 40 kg trade bags. Note: confirm current product branding with the supplier — Cement Australia products may be marketed under the Holcim name in some states. Hanson Building Products (also now Holcim-owned) may also supply compatible GP cement and hydrated lime products in eastern states where both networks overlap.",
    technicalProperties: [
      "Cement Australia GP Cement — AS 3972 Type GP — consistent strength and workability from eastern states manufacturing",
      "Hydrated lime from Cement Australia / Holcim distribution — calcium hydroxide filler per AS 1672",
      "Bulk supply available for large remediation projects — confirm with local Holcim / Cement Australia batching plant",
      "Strong Qld and NSW distribution network — consolidated under Holcim / Cement Australia combined brand",
      "1:1:6 blend → M3 mortar; 1:2:9 blend → M4 mortar — confirm designation with AS 3700 and project engineer",
      "20 kg and 40 kg bags available through Holcim/Cement Australia trade network and independent merchants",
    ],
    limitations: [
      "Confirm current product branding — Cement Australia products may be sold under Holcim branding in some states",
      "Western Australian supply limited — Cement Australia distribution focused on eastern states; use Adbri or Cockburn for WA projects",
      "Bulk delivery requires confirmed batching plant and volume — confirm minimum order and lead time for bulk",
      "Same site-mixed colour variability limitations as all GP cement+lime mortars — trial panel mandatory",
    ],
    procurementSources: [
      { name: "Cement Australia trade network — Qld / NSW / Vic", url: "https://www.cementaustralia.com.au" },
      { name: "Holcim Australia — national (includes former Cement Australia / Hanson)", url: "https://www.holcim.com.au" },
      { name: "Hanson Building Products — eastern states", url: "https://www.hanson.com.au" },
      { name: "Independent masonry merchants — confirm local availability", url: "https://www.cementaustralia.com.au" },
    ],
  },
  {
    fullLabel: "Adbri (Adelaide Brighton Cement)",
    brandUrl: "https://www.adbri.com.au",
    accentColor: "#7c3aed",
    name: "Adbri GP Cement + Adbri Hydrated Lime — M3/M4 Repointing Mortar",
    descriptionLine: "Adbri (Adelaide Brighton) GP Cement + Adbri Hydrated Lime — site-mixed to AS 3700 M3 or M4 — national distribution, dominant in SA and WA through Adbri / Cockburn supply network",
    productType: "Site-mixed GP cement + hydrated lime repointing mortar — Adbri — national, strong SA/WA",
    filterTags: ["National", "SA-WA", "Bagged", "Bulk", "Trade", "AS-3700", "GP-cement", "Hydrated-lime"],
    techChips: [
      { label: "Adbri / Adelaide Brighton", cls: "bg-purple-100 text-purple-800" },
      { label: "Strong SA/WA supply", cls: "bg-green-50 text-green-700" },
      { label: "Bagged + bulk", cls: "bg-slate-100 text-slate-700" },
      { label: "Cockburn Cement subsidiary", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Adbri Cement (formerly Adelaide Brighton Cement) GP Cement and Hydrated Lime for site-mixed repointing mortar on Class 2 strata facades. Adbri is Australia's largest independent cement manufacturer, with a particularly strong presence in South Australia, Western Australia, and Northern Territory through its own plants and the Cockburn Cement subsidiary in WA. Adbri GP Cement conforms to AS 3972 Type GP and is available in 20 kg bags nationally through Adbri trade outlets, hardware merchants, and independent masonry suppliers. Adbri Hydrated Lime is produced at the Angaston plant in South Australia and distributed nationally. In states where Boral has a dominant position (Qld, NSW, Vic), Adbri products may be obtained through independent trade merchants. Adbri's national network is supplemented by Cockburn Cement supply in WA for residential and commercial projects. Mix proportions to AS 3700 M3 (1:1:6) or M4 (1:2:9) as confirmed by the project engineer. Trial panel mandatory before colour approval.",
    technicalProperties: [
      "Adbri GP Cement — AS 3972 Type GP — manufactured nationally, dominant in SA/WA",
      "Adbri Hydrated Lime from Angaston (SA) plant — consistent lime quality nationally",
      "National distribution network — SA/WA/NT particularly strong; eastern states through independent merchants",
      "Cockburn Cement subsidiary (WA) supplies equivalent GP cement and hydrated lime in WA under Cockburn brand",
      "Bulk cement supply available from Adbri manufacturing plants and distribution terminals",
      "Mix proportions to AS 3700 as per project engineer specification — M3 or M4 class",
    ],
    limitations: [
      "Queensland and eastern states distribution less dominant than Boral / Cement Australia — confirm local availability with Adbri trade",
      "Cockburn Cement (WA subsidiary) products are essentially the same chemistry but may carry different product names — confirm equivalence",
      "Adbri has undergone corporate restructuring — confirm current brand name and product range with local supplier",
      "Same colour variability and trial panel limitations as all site-mixed cement-lime mortars",
    ],
    procurementSources: [
      { name: "Adbri Cement — national trade network", url: "https://www.adbri.com.au" },
      { name: "Cockburn Cement (Adbri group) — WA and SA", url: "https://www.adbri.com.au" },
      { name: "Bunnings Warehouse — Adbri cement products nationally", url: "https://www.bunnings.com.au" },
      { name: "Independent masonry merchants — confirm local Adbri or Cockburn supply", url: "https://www.adbri.com.au" },
    ],
  },
  {
    fullLabel: "Cockburn Cement",
    brandUrl: "https://www.adbri.com.au",
    accentColor: "#be123c",
    name: "Cockburn GP Cement + Cockburn Hydrated Lime — M3/M4 Repointing Mortar",
    descriptionLine: "Cockburn GP Cement + Cockburn Hydrated Lime — site-mixed to AS 3700 M3 or M4 — WA and SA supply through Cockburn Cement (Adbri group) distribution network",
    productType: "Site-mixed GP cement + hydrated lime repointing mortar — Cockburn Cement — WA / SA",
    filterTags: ["SA-WA", "WA-only", "Bagged", "Bulk", "Trade", "AS-3700", "GP-cement", "Hydrated-lime"],
    techChips: [
      { label: "Cockburn Cement", cls: "bg-rose-100 text-rose-800" },
      { label: "WA / SA dominant", cls: "bg-green-50 text-green-700" },
      { label: "Adbri group", cls: "bg-slate-100 text-slate-700" },
      { label: "Trade + builder supply", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Cockburn Cement is the dominant cement manufacturer in Western Australia and a key supplier in South Australia, operating as a subsidiary of the Adbri group. Cockburn GP Cement and Cockburn Hydrated Lime are the standard raw materials for site-mixed repointing mortar on Class 2 strata buildings in Perth, WA and regional Western Australia. Cockburn Cement's products conform to AS 3972 (GP cement) and AS 1672 (hydrated lime) and are distributed through Cockburn trade depots, hardware merchants (Bunnings, Mitre 10), and independent masonry suppliers across the WA market. For Class 2 strata projects in Perth and regional WA, Cockburn is typically the most cost-effective and readily available supplier for GP cement and hydrated lime mortar raw materials. Mix proportions to AS 3700 M3 (1:1:6) or M4 (1:2:9) as confirmed by the project engineer. Trial panel mandatory before colour approval. For eastern states projects, use Boral, Cement Australia, or Adbri instead — Cockburn distribution does not extend east of WA.",
    technicalProperties: [
      "Cockburn GP Cement — AS 3972 Type GP — manufactured at Cockburn Sound plant, WA",
      "Cockburn Hydrated Lime — calcium hydroxide per AS 1672 — produced in WA",
      "Dominant WA market presence — highest availability and most competitive pricing in Perth metro and regional WA",
      "Available in 20 kg and 40 kg cement bags; 20 kg hydrated lime bags through WA trade network",
      "Same mix proportions as all GP cement + lime mortars — M3 (1:1:6) or M4 (1:2:9) per AS 3700",
      "Consistent quality from WA manufacturing — controlled by Adbri group quality standards",
    ],
    limitations: [
      "WA supply only — Cockburn Cement does not distribute outside WA and SA; use Boral, Cement Australia, or Adbri for eastern states",
      "Adbri group brand — may be referred to as Adbri cement in some contexts; confirm product name with local supplier",
      "Same colour variability limitations as all site-mixed cement-lime mortars — trial panel mandatory",
      "Bulk supply requires confirmed batching plant and volume — confirm lead time for bulk delivery in regional WA",
    ],
    procurementSources: [
      { name: "Cockburn Cement trade depots — Perth and WA", url: "https://www.adbri.com.au" },
      { name: "Bunnings Warehouse WA — Cockburn cement products", url: "https://www.bunnings.com.au" },
      { name: "Mitre 10 WA — trade supply", url: "https://www.mitre10.com.au" },
      { name: "Independent masonry merchants — Perth metro and regional WA", url: "https://www.adbri.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "National", label: "National supply" },
  { id: "Eastern-states", label: "Eastern states" },
  { id: "SA-WA", label: "SA / WA" },
  { id: "WA-only", label: "WA only" },
  { id: "Bagged", label: "Bagged" },
  { id: "Bulk", label: "Bulk supply" },
  { id: "Trade", label: "Trade" },
  { id: "AS-3700", label: "AS 3700" },
  { id: "GP-cement", label: "GP cement" },
  { id: "Hydrated-lime", label: "Hydrated lime" },
];

const SYSTEM_COMPARISON: {
  supplier: string;
  region: string;
  cement: string;
  lime: string;
  formats: string;
  keyStrength: string;
  primaryUse: string;
}[] = [
  {
    supplier: "Boral Australia",
    region: "National",
    cement: "Boral Builders Cement (GP)",
    lime: "Boral Hydrated Lime",
    formats: "20 kg / 40 kg bags",
    keyStrength: "Widest national retail + trade distribution",
    primaryUse: "All states — standard repointing projects",
  },
  {
    supplier: "Cement Australia (Holcim)",
    region: "Eastern states (Qld/NSW/Vic)",
    cement: "Cement Australia GP / Holcim GP",
    lime: "Holcim Hydrated Lime",
    formats: "20 kg / 40 kg bags + bulk",
    keyStrength: "Bulk supply capacity for large projects",
    primaryUse: "Eastern states — larger volume projects",
  },
  {
    supplier: "Adbri (Adelaide Brighton)",
    region: "National — dominant SA/WA",
    cement: "Adbri GP Cement",
    lime: "Adbri Hydrated Lime",
    formats: "20 kg bags + bulk",
    keyStrength: "Dominant position in SA / WA / NT",
    primaryUse: "SA / WA / NT projects",
  },
  {
    supplier: "Cockburn Cement",
    region: "WA and SA only",
    cement: "Cockburn GP Cement",
    lime: "Cockburn Hydrated Lime",
    formats: "20 kg / 40 kg bags",
    keyStrength: "Lowest cost and highest availability in WA",
    primaryUse: "Perth metro and WA regional projects",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Repointing deteriorated cement-mortar joints in modern clay brick facades on Class 2 strata buildings — all states",
    "Repointing exposed concrete masonry (block) and calcium silicate brick facades where original mortar was cement-based",
    "Parapet coping repointing where UV and water exposure accelerate mortar deterioration — M3 class or stronger",
    "Repointing at exposed piers, columns, and wind-driven rain exposed masonry zones",
    "Restoration of mortar joints following salt attack treatment and substrate preparation",
  ],
  selectionCriteria: [
    "Confirm mortar designation with engineer — AS 3700 M3 (1:1:6) is appropriate for most exposed Class 2 facade repointing",
    "Always include hydrated lime — plain GP cement without lime is too rigid and shrinks excessively for facade repointing",
    "Confirm mortar is softer than the brick unit — hard mortar on soft brick causes brick face spalling under thermal movement",
    "Commission a 28-day cured trial panel before approving colour match — fresh and cured mortar colours differ significantly",
    "Confirm sand source consistency throughout the job — different sand colours will cause visible colour banding",
    "Select supplier based on regional availability — Cockburn/Adbri for WA; Boral/Cement Australia for east coast",
  ],
  limitations: [
    "Never use GP cement mortar on soft, historic, or original lime-mortar brickwork — causes brick face spalling and moisture trapping",
    "Do not repoint over existing movement joints with mortar — movement joints must be resealed with polyurethane or silicone sealant",
    "Plain Portland cement without hydrated lime is not suitable for facade repointing — too rigid and shrinks excessively",
    "GP cement-lime mortars have low vapour permeability — can trap moisture in damp or salt-contaminated masonry",
    "Do not apply in direct sun, high wind, or when rain is expected within 24 hours of application",
  ],
  standardsNotes: [
    "AS 3700 — Masonry Structures — mortar proportions and designations (M1–M4) — Table 10.2 for exposure classifications",
    "AS 3972 — Portland and blended cements — Type GP — governs GP cement quality and consistency",
    "AS 1672 — Limes and limestones for building — governs hydrated lime product quality",
    "NATSPEC worksection 03 41 00 — Masonry — project specification requirements for repointing",
    "NCC Volume One and Two — masonry and facade requirements for Class 2 buildings",
  ],
  suitableDefects: [
    "Deteriorated, crumbling or eroded cement-based mortar joints in modern clay brick or concrete masonry facades",
    "Mortar joints where original cement mortar has recessed more than 6mm behind the brick face — needs repointing",
    "Failed or debonded cement repointing from previous remediation — rake out and re-point",
    "Mortar joints cracked and open to water ingress — particularly at parapets and exposed piers",
  ],
  typicalSubstrates: [
    "Modern fired clay brick — post-1960s construction — hard, well-burnt brick where cement mortar is appropriate",
    "Calcium silicate (sand-lime) brick — confirm mortar hardness does not exceed brick compressive strength",
    "Concrete masonry units (CMU) — blocks and besser blocks — cement mortar is the standard specification",
    "NOT suitable: pre-1960s colonial or inter-war brickwork where original mortar was lime-based — specify lime mortar instead",
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
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>
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

export function GpCementMortarIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white">
          <BookOpen size={15} />
        </div>
        <h3 className="text-base font-extrabold text-sky-950">
          What is GP cement + hydrated lime repointing mortar?
        </h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          GP cement plus hydrated lime repointing mortar is the standard site-mixed mortar for repointing modern clay brick, concrete masonry, and calcium silicate brick facades on Class 2 strata buildings. Blended on site from General Purpose Portland cement (AS 3972 Type GP), hydrated lime (AS 1672), and washed sharp sand at proportions specified per AS 3700, this mortar produces a durable, workable joint filler for standard external masonry repointing. The four main Australian suppliers — Boral, Cement Australia (Holcim), Adbri, and Cockburn Cement — all produce equivalent GP cement and hydrated lime to the same Australian standards.
        </p>
        {expanded && (
          <>
            <p>
              The correct mix proportions must be confirmed with the project engineer. AS 3700 M3 class mortar (1:1:6 cement:lime:sand by volume, approximately 8 MPa) is the standard external repointing specification for modern hard-burnt clay brick. M4 class (1:2:9, approximately 5 MPa) is softer and used for less exposed locations or moderately hard brick. The mortar must always be softer in compressive strength than the brick unit it is repointing — hard mortar on softer brick concentrates thermal movement stress at the brick-mortar interface, causing brick face spalling.
            </p>
            <p>
              Hydrated lime must always be included in the mix — plain Portland cement without lime is too rigid, shrinks excessively on cure, and will crack and debond from the joint edges within 2–5 years. A minimum 28-day cured trial panel must be built and approved on the building before committing to colour proportions and sand source for the full job.
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

export function GpCementMortarProductSection() {
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
              Applications, selection criteria, limitations, standards, suitable substrates
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

      {/* ── Product Reference ── */}
      <div>
        <div className="mb-5 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Supplier Reference</h2>
            <p className="mt-1 text-sm text-slate-500">4 suppliers — GP cement + hydrated lime mortar — scroll to view all</p>
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
            {visibleProducts.length} supplier{visibleProducts.length !== 1 ? "s" : ""} — scroll to view all
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
                      <a
                        href={product.brandUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                      >
                        <ExternalLink size={9} /> Brand Site
                      </a>
                    </div>
                  </div>
                  <h3 className="mt-2 text-sm font-extrabold leading-snug text-sky-950">{product.name}</h3>
                  <div className="mt-0.5 flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-red-700">{product.productType}</p>
                  </div>
                  <CollapsibleCardDetails
                    text={product.descriptionLine}
                    chips={product.techChips}
                  />
                </div>

                {/* System Description */}
                <div className="border-b border-sky-100 bg-sky-50 px-5 py-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sky-700">System Description</p>
                  <CollapsibleDescription text={product.systemDescription} />
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

      {/* ── Supplier Comparison ── */}
      <div>
        <div className="mb-6 flex items-start gap-3">
          <div className="mt-1 h-5 w-1 shrink-0 rounded-full bg-red-700" />
          <div>
            <h2 className="text-2xl font-extrabold text-sky-950">Supplier Comparison</h2>
            <p className="mt-1 text-sm text-slate-500">
              Side-by-side comparison of GP cement + hydrated lime mortar suppliers. All products are equivalent in specification — selection is based on regional availability and pricing. Confirm mortar designation with project engineer before ordering.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="sticky left-0 border-r border-slate-200 bg-slate-50 px-5 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Region</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Cement product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Lime product</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Pack formats</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Key strength</th>
                <th className="px-4 py-3 text-left text-xs font-bold whitespace-nowrap text-slate-700">Primary use</th>
              </tr>
            </thead>
            <tbody>
              {SYSTEM_COMPARISON.map((row, i) => (
                <tr key={row.supplier} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="sticky left-0 border-r border-slate-200 bg-inherit px-5 py-3 font-semibold whitespace-nowrap text-sky-950">{row.supplier}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.region}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.cement}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.lime}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{row.formats}</td>
                  <td className="px-4 py-3 text-slate-600">{row.keyStrength}</td>
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
