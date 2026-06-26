"use client";

import { useState, useRef } from "react";
import {
  Layers, SquareStack, Ruler, ExternalLink,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen,
} from "lucide-react";
import {
  CollapsibleList, CollapsibleDescription, CollapsibleSources,
  CollapsibleCardDetails, TechCard, DataNote,
  AISelectionStage1, AISelectionStage2,
  CheckCircle, AlertTriangle,
} from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { EPOXY_ANCHORING_CARDS } from "./epoxyAnchoringData";

type FilterTag =
  | "AS-5216"
  | "Epoxy"
  | "Epoxy-acrylate"
  | "Vinylester"
  | "Starter-bar"
  | "Threaded-rod"
  | "Cracked-concrete"
  | "Edge-distance";

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
  dataNote?: string;
};

const PRODUCTS: Product[] = [
  {
    fullLabel: "Hilti Australia",
    brandUrl: "https://www.hilti.com.au",
    accentColor: "#be123c",
    name: "Hilti HIT-RE 500 V3",
    descriptionLine: "Pure epoxy chemical anchor — AS 5216 for cracked and uncracked concrete — rebar and threaded rod — seismic and fire rated",
    productType: "Pure epoxy chemical anchor — AS 5216 compliant",
    dataNote: "Owner to confirm — the Hilti Australia site shows HIT-RE 500 V4 as the current product; V3 is no longer listed and appears superseded. Confirm the current Hilti HIT-RE 500 version and its AS 5216 approval scope before publishing.",
    filterTags: ["AS-5216", "Epoxy", "Starter-bar", "Threaded-rod", "Cracked-concrete", "Edge-distance"],
    techChips: [
      { label: "Pure epoxy — AS 5216", cls: "bg-rose-100 text-rose-800" },
      { label: "Cracked + uncracked concrete", cls: "bg-slate-100 text-slate-700" },
      { label: "Seismic and fire rated", cls: "bg-amber-50 text-amber-700" },
      { label: "Hilti Australia — nationally", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Hilti HIT-RE 500 V3 is a pure epoxy chemical anchoring adhesive approved to AS 5216 for rebar connections and threaded rod anchors in cracked and uncracked concrete. The high-strength epoxy formulation achieves rated loads significantly higher than vinylester or epoxy-acrylate alternatives, and the AS 5216 design approval with cracked concrete (C1) rating makes it suitable for use in dynamic and seismic load cases as specified by the structural engineer. Used in reinforcement corrosion repair for starter bar installation (N12, N16), structural connection anchors, and post-installed rebar in repair pours. Installed in cleaned, dry or SSD drilled holes using the Hilti-specified cleaning protocol (brush, blow, repeat). Hilti provides PROFIS Anchor design software for anchor design to AS 5216 at no charge. Available through Hilti Direct, Hilti stores, and Hilti trade partners nationally.",
    technicalProperties: [
      "Pure epoxy — high bond strength — AS 5216 design approval for cracked and uncracked concrete",
      "C1 cracked concrete rating — seismic and fire-rated versions available",
      "Design using PROFIS Anchor software — free from Hilti Australia",
      "Hilti Direct — nationally available",
    ],
    limitations: [
      "Hole must be cleaned using Hilti-specified protocol (brush × 3, blow × 3 repeat) — deviation from the cleaning protocol voids the design approval",
      "TODO: owner confirm — product may be superseded by HIT-RE 500 V4; gel time and cure time are temperature-dependent — confirm from current Hilti TDS for the site temperature on the day of installation",
      "Do not load the anchor until the full cure time has elapsed — loading before cure creates a risk of bond failure",
      "High-strength epoxy — cured cartridge is a hazardous waste — dispose per SDS requirements",
    ],
    procurementSources: [
      { name: "Hilti Australia — Hilti Direct, stores, and trade partners", url: "https://www.hilti.com.au" },
    ],
  },
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    accentColor: "#0369a1",
    name: "Sika AnchorFix-3+",
    descriptionLine: "Epoxy acrylate chemical anchor — AS 5216 for cracked and uncracked concrete — starter bars, threaded rod, and rebar connections",
    productType: "Epoxy acrylate chemical anchor — AS 5216 compliant",
    dataNote: "Owner to confirm — AnchorFix-3+ was not found on the current Sika Australia chemical anchoring page (current lineup is AnchorFix-1, AnchorFix-3001, AnchorFix-3030). Confirm the correct current product name and chemistry with Sika Australia before specifying.",
    filterTags: ["AS-5216", "Epoxy-acrylate", "Starter-bar", "Threaded-rod", "Cracked-concrete"],
    techChips: [
      { label: "Epoxy acrylate — AS 5216", cls: "bg-sky-100 text-sky-800" },
      { label: "Cracked + uncracked concrete", cls: "bg-slate-100 text-slate-700" },
      { label: "Sika Australia nationally", cls: "bg-amber-50 text-amber-700" },
      { label: "Design using SikaAnchor software", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Sika AnchorFix-3+ is an epoxy acrylate chemical anchoring adhesive compliant with AS 5216 for installation of rebar and threaded rod anchors in cracked and uncracked concrete. The epoxy acrylate chemistry provides high bond strength and is suitable for use in both static and seismic load cases as designed to AS 5216. Used for starter bar installation, rebar post-installation in repair pours, and structural connection anchors in reinforcement corrosion repair. Install in holes cleaned using the Sika-specified protocol; confirm the cure time for the ambient temperature from the Sika AnchorFix-3+ TDS before loading. Available through Sika Australia distributors nationally. Sika provides AnchorFix anchor design software.",
    technicalProperties: [
      "Epoxy acrylate — AS 5216 design approval — cracked and uncracked concrete",
      "Suitable for rebar post-installation and threaded rod anchors",
      "Sika Australia — trade supply nationally",
      "AnchorFix anchor design software available from Sika",
    ],
    limitations: [
      "Hole cleaning protocol must be followed precisely — brush, blow, repeat as specified in the Sika TDS",
      "Cure time is temperature-dependent — do not load before full cure; confirm cure time from TDS for site temperature",
      "Epoxy acrylate has a stronger odour than pure epoxy — confirm site ventilation requirements from SDS",
      "Design must be carried out to AS 5216 by a structural engineer — do not specify load capacity from manufacturer marketing material",
    ],
    procurementSources: [
      { name: "Sika Australia — national trade supply", url: "https://aus.sika.com" },
    ],
  },
  {
    fullLabel: "Ramset / ITW Red Head",
    brandUrl: "https://www.ramset.com.au",
    accentColor: "#7c2d12",
    name: "Ramset Chemset Epoxy 500+",
    descriptionLine: "Epoxy chemical anchor — AS 5216 approved — rebar and threaded rod in concrete repair — Ramset national distribution",
    productType: "Epoxy chemical anchor — AS 5216 compliant",
    dataNote: "Owner to confirm — Chemset Epoxy 500+ was not found on the current Ramset Australia site; the current product appears to be ChemSet Reo 502 XTREM (600 mL, pure epoxy, dry/wet/flooded holes, AS 5216, seismic C1 and C2). Confirm the correct current product name and specification before specifying.",
    filterTags: ["AS-5216", "Epoxy", "Starter-bar", "Threaded-rod", "Cracked-concrete"],
    techChips: [
      { label: "Epoxy — AS 5216", cls: "bg-red-100 text-red-900" },
      { label: "Cracked concrete rating", cls: "bg-slate-100 text-slate-700" },
      { label: "Ramset — national distribution", cls: "bg-amber-50 text-amber-700" },
      { label: "Confirm current TDS", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Ramset Chemset Epoxy 500+ is an epoxy chemical anchor adhesive approved to AS 5216 for rebar and threaded rod installation in cracked and uncracked concrete. The Ramset (ITW Red Head / Ramset in Australia) brand has wide trade distribution nationally through hardware and fastener suppliers. Used in reinforcement corrosion repair for starter bar installation, structural connections, and anchor bolts in repair work. Follow the Ramset-specified hole cleaning protocol and cure time for the installation temperature. Confirm current AS 5216 approval scope from the current Ramset TDS — confirm which cracked concrete classes (C1, C2) are covered for the specific application. Design anchors to AS 5216 using the Ramset design data or an accepted anchor design software.",
    technicalProperties: [
      "Epoxy chemical anchor — AS 5216 design approval",
      "Cracked concrete rating — confirm specific C-class from current TDS",
      "Ramset — wide trade distribution nationally",
      "Compatible with N12 / N16 rebar and standard threaded rod",
    ],
    limitations: [
      "Confirm current AS 5216 approval scope and cracked concrete class from the current Ramset TDS — do not rely on historical data",
      "Hole cleaning and installation must follow the Ramset TDS protocol — deviation from the protocol voids the design approval",
      "Cure time is temperature dependent — confirm for site conditions before loading",
      "Do not over-mix or under-mix — initial mixed portion from the cartridge tip should be discarded until a uniform colour is achieved",
    ],
    procurementSources: [
      { name: "Ramset — national trade distribution", url: "https://www.ramset.com.au" },
    ],
  },
  {
    fullLabel: "Mapei Australia",
    brandUrl: "https://www.mapei.com/au",
    accentColor: "#1d4ed8",
    name: "Mapei Mapefix EP 100",
    descriptionLine: "Pure epoxy chemical anchor for rebar and threaded rod — confirm current specification and Australian availability with Mapei technical before specifying",
    productType: "Pure epoxy chemical anchor for rebar and threaded rod",
    filterTags: ["AS-5216", "Epoxy", "Starter-bar", "Threaded-rod", "Cracked-concrete"],
    techChips: [
      { label: "Pure epoxy chemical anchor for", cls: "bg-slate-100 text-slate-700" },
      { label: "Mapei — AU supply", cls: "bg-slate-100 text-slate-700" },
      { label: "TODO: confirm specs from TDS", cls: "bg-rose-100 text-rose-800" },
    ],
    systemDescription:
      "Mapei Mapefix EP 100 is a Pure epoxy chemical anchor for rebar and threaded rod. Pure-epoxy injection anchor for post-installed starter bars and threaded rod (replaces the previously listed, non-existent Mapefox EW). Confirm the current product data sheet, key performance values (such as strength, coverage and application limits) and Australian availability with Mapei technical before specifying. TODO: verify specific performance figures from the current Mapei TDS.",
    technicalProperties: [
      "Pure epoxy chemical anchor for rebar and threaded rod",
      "Pure-epoxy injection anchor for post-installed starter bars and threaded rod (replaces the previously listed, non-existent Mapefox EW).",
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
  }

];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "AS-5216", label: "AS 5216 compliant" },
  { id: "Epoxy", label: "Epoxy" },
  { id: "Epoxy-acrylate", label: "Epoxy acrylate" },
  { id: "Vinylester", label: "Vinylester" },
  { id: "Starter-bar", label: "Starter bar" },
  { id: "Threaded-rod", label: "Threaded rod" },
  { id: "Cracked-concrete", label: "Cracked concrete" },
  { id: "Edge-distance", label: "Edge distance" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Hilti HIT-RE 500 V3",
    compliance: "TODO: owner confirm — V4 now current on Hilti AU",
    cartridge: "Pure epoxy",
    notes: "Highest load capacity — PROFIS Anchor design software — confirm version",
  },
  {
    product: "Sika AnchorFix-3+",
    compliance: "TODO: owner confirm — product not found on current Sika AU site",
    cartridge: "TODO: owner confirm chemistry — epoxy acrylate unverified",
    notes: "Current Sika AU lineup: AnchorFix-1, AnchorFix-3001, AnchorFix-3030 — confirm correct product",
  },
  {
    product: "Ramset Chemset Epoxy 500+",
    compliance: "TODO: owner confirm — product not found on current Ramset AU site",
    cartridge: "Epoxy",
    notes: "Current Ramset product may be ChemSet Reo 502 XTREM (600 mL, wet/flooded holes) — confirm name",
  },
  {
    product: "Mapei Mapefox EW",
    compliance: "TODO: owner confirm — Mapei AU unverifiable (Cloudflare blocked)",
    cartridge: "Epoxy",
    notes: "Confirm approval scope from current Mapei TDS — live site inaccessible during audit",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Starter bar installation — N12 and N16 D500N rebar injected and grouted into drilled holes in existing concrete to form structural connections in repair pours",
    "Anchor bolt installation for mechanical equipment, handrail posts, facade brackets, and other structural attachments in repair or upgrade works",
    "Post-installed rebar in structural repair pours — connecting new concrete to existing concrete structure through epoxy-grouted rebar",
    "Reinforcement connection at new construction joints in repair works — where the engineer specifies post-installed rebar to reinstate structural continuity",
    "Edge repair of carpark slabs and balconies — starter bars installed at the edge before forming and pouring a new edge section",
    "CFRP laminate anchor pins — in CFRP strengthening systems, epoxy anchor adhesive is also used for end-zone anchor holes",
  ],
  selectionCriteria: [
    "Use an AS 5216-compliant product for all structural anchor applications — non-compliant products cannot be used in engineered connections",
    "For cracked concrete applications (beams, slabs, seismic zones), confirm the cracked concrete class (C1 or C2) is covered by the selected product's AS 5216 approval",
    "Use Hilti HIT-RE 500 (TODO: owner confirm current version — V4 now listed on Hilti AU) where the highest bond strength, seismic rating, or fire-rating is required — the most comprehensively approved product in the range",
    "For applications where ventilation is limited, check the product odour and VOC level — pure epoxy products (Hilti HIT-RE 500 series) have lower odour than epoxy acrylate products",
    "Confirm the design load requirements with the structural engineer and use the relevant anchor design software (PROFIS Anchor, SikaAnchor) to size the embedment depth and edge distance",
    "Consider gel time and working temperature — in cold conditions (below 10°C), gel time extends significantly; in hot conditions (above 35°C), gel time reduces sharply — confirm from TDS",
  ],
  limitations: [
    "Epoxy anchors must not be loaded before full cure at the specific installation temperature — failure to observe cure time is the most common cause of anchor bond failure",
    "Hole cleaning is critical — a single missed cleaning step (brush or blow) significantly reduces bond strength — follow the TDS protocol without deviation",
    "Do not install in wet holes — saturated or dripping water in the drilled hole prevents adhesive bond to the hole wall; dry the hole with compressed air before injection",
    "Do not use non-AS 5216-approved products for structural anchor applications — safety implications",
    "Inclined and horizontal installation overhead can cause the adhesive to run before cure — use a screen sleeve or confirm the product is rated for that installation orientation",
    "Chemical anchors are sensitive to temperature during cure — protect from rapid temperature change and UV exposure during the curing period",
  ],
  standardsNotes: [
    "AS 5216 — Design of post-installed fixings in concrete — the primary Australian standard for chemical and mechanical anchor design — sets approval and design requirements",
    "AS 5216 cracked concrete classes — C1 (dynamic loads, seismic) and C2 (quasi-static loads in cracked concrete) — confirm which class is required for the application from the engineer",
    "Hilti PROFIS Anchor — free design software for AS 5216 anchor design — preferred by most Australian structural engineers for Hilti product design",
    "AS 3600 — minimum edge distance and cover requirements for embedded anchors and post-installed rebar — the structural engineer's specification takes precedence",
    "SafeWork Australia SDS — epoxy and epoxy-acrylate chemical anchors contain hazardous materials — PPE (gloves, goggles) and controlled site disposal required",
  ],
  suitableDefects: [
    "Reinforcement corrosion repair requiring starter bar installation to connect a repair pour to the existing structure",
    "Edge spalling and section loss where the edge is rebuilt and new reinforcement needs to be connected to the existing slab or beam",
    "Structural upgrade works requiring post-installed rebar to reinstate structural continuity across a repair section",
    "CFRP strengthening installation requiring end-zone anchor bolts or pins",
  ],
  typicalSubstrates: [
    "In-situ reinforced concrete — the primary substrate for chemical anchor installation in remedial repair",
    "Precast concrete — same installation requirements as in-situ; confirm minimum edge distances and cover from AS 5216 and the precast manufacturer",
    "Masonry — some chemical anchors are rated for masonry substrates; confirm from the AS 5216 approval document for the specific product and masonry type",
    "Do NOT install in hollow masonry or cores without a screen sleeve — adhesive will flow into the void and not form a bond",
  ],
};

// ── AI Selection Data (review mode) — derived from this page; unverified = unconfirmed/null ──
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["application", "rebar_starter / threaded_rod / structural_dowel", "match anchor use in the repair"],
    ["concrete_condition", "cracked / uncracked", "cracked → product must carry C1/C2 cracked-concrete approval"],
    ["standard", "AS5216 / none", "structural anchoring → ETA-assessed AS 5216 design capacity required"],
    ["pt_present", "yes / no", "yes → GPR scan before drilling (avoid PT tendons)"],
  ],
  json: {
    category: "epoxy_anchoring_adhesives",
    stage1_gates: {
      application: { allowed: ["rebar_starter", "threaded_rod", "structural_dowel"], rule: "match anchor use" },
      concrete_condition: { allowed: ["cracked", "uncracked"], rule: "cracked=needs C1/C2 approval" },
      standard: { allowed: ["AS5216", "none"], rule: "structural=AS5216 design capacity" },
      pt_present: { allowed: ["yes", "no"], rule: "yes=GPR before drilling" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Hilti HIT-RE 500 V3": {
    rows: [
      ["application", "gate", "rebar_starter/threaded_rod/dowel"],
      ["concrete_condition", "gate", "cracked+uncracked (C1)"],
      ["standard", "tag", "AS5216"],
      ["chemistry", "tag", "pure_epoxy"],
      ["pt_safe", "gate", "requires_gpr"],
      ["data_status", "meta", "unconfirmed"],
      ["selectable", "meta", "false"],
    ],
    json: { id: "hilti_hit_re_500_v3", gates: { application: "rebar_starter/threaded_rod/dowel", concrete_condition: "cracked_uncracked", pt_safe: "requires_gpr" }, tag: { standard: "AS5216", chemistry: "pure_epoxy" }, rank: {}, meta: { data_status: "unconfirmed", selectable: false, source: "hilti.com.au shows HIT-RE 500 V4 as current; V3 not listed — superseded, confirm current product", confirmed_date: null } },
  },
  "Sika AnchorFix-3+": {
    rows: [
      ["application", "gate", "rebar_starter/threaded_rod"],
      ["concrete_condition", "gate", "cracked+uncracked"],
      ["standard", "tag", "AS5216"],
      ["chemistry", "tag", "epoxy_acrylate"],
      ["pt_safe", "gate", "requires_gpr"],
      ["data_status", "meta", "unconfirmed"],
      ["selectable", "meta", "false"],
    ],
    json: { id: "sika_anchorfix_3plus", gates: { application: "rebar_starter/threaded_rod", concrete_condition: "cracked_uncracked", pt_safe: "requires_gpr" }, tag: { standard: "AS5216", chemistry: "epoxy_acrylate" }, rank: {}, meta: { data_status: "unconfirmed", selectable: false, source: "AnchorFix-3+ not on current Sika AU page (lineup: AnchorFix-1/3001/3030) — confirm current product", confirmed_date: null } },
  },
  "Ramset Chemset Epoxy 500+": {
    rows: [
      ["application", "gate", "rebar_starter/threaded_rod"],
      ["concrete_condition", "gate", "cracked+uncracked"],
      ["standard", "tag", "AS5216"],
      ["chemistry", "tag", "epoxy"],
      ["pt_safe", "gate", "requires_gpr"],
      ["data_status", "meta", "unconfirmed"],
      ["selectable", "meta", "false"],
    ],
    json: { id: "ramset_chemset_epoxy_500plus", gates: { application: "rebar_starter/threaded_rod", concrete_condition: "cracked_uncracked", pt_safe: "requires_gpr" }, tag: { standard: "AS5216", chemistry: "epoxy" }, rank: {}, meta: { data_status: "unconfirmed", selectable: false, source: "Chemset Epoxy 500+ not on current Ramset AU site (current: ChemSet Reo 502 XTREM) — confirm current product", confirmed_date: null } },
  },
  "Mapei Mapefox EW": {
    rows: [
      ["application", "gate", "rebar_starter/threaded_rod"],
      ["concrete_condition", "gate", "unconfirmed (confirm AS5216 scope)"],
      ["standard", "tag", "AS5216 (scope to confirm)"],
      ["chemistry", "tag", "epoxy"],
      ["pt_safe", "gate", "requires_gpr"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: { id: "mapei_mapefox_ew", gates: { application: "rebar_starter/threaded_rod", concrete_condition: "unconfirmed", pt_safe: "requires_gpr" }, tag: { standard: "AS5216", chemistry: "epoxy" }, rank: {}, meta: { data_status: "verified", selectable: true, source: "mapei.com/au Mapefox EW — epoxy anchoring; confirm AS 5216 approval scope before specifying", confirmed_date: null } },
  },
};

export function EpoxyAnchoringAdhesivesIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Epoxy chemical anchor adhesives for structural rebar and anchor installation in concrete repair</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Epoxy chemical anchor adhesives are used to install post-drilled rebar (starter bars), threaded rods, and structural anchor bolts in existing concrete in reinforcement corrosion and structural repair works. They are the primary method for creating structural connections between new and existing concrete — for example, installing N12 or N16 starter bars to connect a repair pour to the existing slab or beam. All structural applications require anchors designed to AS 5216 by the structural engineer of record.
        </p>
        {expanded && (
          <>
            <p>
              The three main chemical anchor chemistries in Australian repair practice are pure epoxy (Hilti HIT-RE 500 — TODO: owner confirm current version; V4 now shown on Hilti AU), epoxy acrylate (Sika AnchorFix — TODO: owner confirm current product name; AnchorFix-3+ not found on current Sika AU site), and vinylester (various brands). Pure epoxy and epoxy acrylate systems carry AS 5216 design approval for cracked and uncracked concrete, including seismic applications. Installation protocol — hole cleaning in particular — is critical. Bond failure in chemical anchors is most commonly caused by inadequate hole cleaning, not installing in wet holes, or loading before full cure.
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

const DESIGN_CRITERIA = "Compliance/qualification to AS 5216 (ETA-equivalent design data) — bond strength (MPa) & characteristic resistance for rebar/threaded rod; base type (pure epoxy vs epoxy-acrylate/hybrid — pure epoxy highest load & creep performance, sustained-load qualified); embedment depth & drill diameter per anchor size; concrete condition — dry / damp / water-filled hole variant & cracked vs uncracked concrete rating; gel (working) time & full cure time vs temperature; service & installation temperature range; sustained-load (creep) & seismic (C1/C2) category; chemical/fire resistance & elevated-temperature performance; bond to post-installed rebar (development length design); edge distance & spacing; hole-cleaning regime sensitivity.";

export function EpoxyAnchoringAdhesivesProductSection() {
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

      <AutoProductReference products={PRODUCTS} cards={EPOXY_ANCHORING_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Epoxy anchoring adhesives" />
    </>
  );
}
