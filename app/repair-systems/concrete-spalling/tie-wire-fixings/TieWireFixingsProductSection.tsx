"use client";

import { useState, useRef } from "react";
import {
  Layers, SquareStack, Ruler, ExternalLink,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight, FileText, BookOpen,
} from "lucide-react";
import {
  CollapsibleList, CollapsibleDescription, CollapsibleSources,
  CollapsibleCardDetails, TechCard,
  AISelectionStage1, AISelectionStage2,
  CheckCircle, AlertTriangle,
} from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";

type FilterTag =
  | "Tie-wire"
  | "Bar-chair"
  | "Chemical-anchor"
  | "Formwork-fixing"
  | "Rebar-spacer"
  | "Form-tie"
  | "Plastic"
  | "Galvanised"
  | "Epoxy-anchor";

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

export const PRODUCTS: Product[] = [
  {
    fullLabel: "National Reinforcing / Generic Supply",
    brandUrl: "https://www.nationwidereinforcing.com.au",
    accentColor: "#374151",
    name: "Annealed Tie Wire — 1.0 mm / 1.6 mm Galvanised or Black",
    descriptionLine: "Annealed soft steel tie wire for tying reinforcement laps, cages, and bar chairs in concrete repair — the standard site consumable for rebar assembly",
    productType: "Annealed soft steel tie wire — rebar tying and formwork fixing",
    filterTags: ["Tie-wire", "Galvanised"],
    techChips: [
      { label: "1.0 mm / 1.6 mm diameter", cls: "bg-slate-700 text-white" },
      { label: "Annealed — soft and flexible", cls: "bg-slate-100 text-slate-700" },
      { label: "Black or galvanised", cls: "bg-amber-50 text-amber-700" },
      { label: "Pre-cut ties available", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Annealed soft steel tie wire in 1.0 mm and 1.6 mm diameter is the standard site consumable for tying reinforcement bars, binding laps, and fixing bar chairs and spacers in concrete repair formwork. Annealing (heat treatment) makes the wire soft and flexible — it bends easily by hand or with a reo tying tool without breaking, and the tied ends can be twisted and turned back to avoid projecting above the concrete surface. In concrete spalling repair, tie wire is used to secure additional reinforcement mesh or starter bars where reinforcement has been cut or additional bars are being added, to tie replacement cages in column and beam repairs, and to fix bar chairs and spacers at the correct cover depth before placing repair mortar. Black (non-galvanised) tie wire is standard for most applications. Galvanised tie wire is used in aggressive or marine environments where any projecting wire ends encased in the repair mortar must be corrosion-resistant — check this requirement from the repair specification. Pre-cut tie wire loops ('tying ties') are available from reinforcing suppliers for faster tying with a reo hook tool.",
    technicalProperties: [
      "1.0 mm and 1.6 mm diameter annealed soft steel wire — black (standard) or galvanised",
      "Annealed — soft and flexible — ties by hand or reo tying tool without breakage",
      "Pre-cut tying ties available from reinforcing suppliers for faster wire tying",
      "Apply twisted tie ends back into the concrete to avoid surface projection and rust staining",
    ],
    limitations: [
      "Do not use bare (un-galvanised) tie wire in the cover zone of marine or chloride-exposed repairs — any exposed tie wire end will rust and cause new corrosion staining — use galvanised tie wire or cut all tie wire ends back below the cover zone",
      "Tie wire left at the concrete surface will rust and stain the mortar face — bend all tie wire ends back into the concrete cover",
      "Do not use tie wire as structural fixings — tie wire provides no tensile or shear resistance — it is a temporary positioning aid only",
      "Over-tightening tie wire with a reo hook can break the wire — develop a feel for the required twist count and stop before the wire breaks",
    ],
    procurementSources: [
      { name: "National Reinforcing and reinforcing suppliers nationally", url: "https://www.nationwidereinforcing.com.au" },
      { name: "Bunnings Trade — tie wire nationally", url: "https://www.bunnings.com.au/trade" },
      { name: "Concrete and formwork trade suppliers nationally", url: "https://www.nationwidereinforcing.com.au" },
    ],
  },
  {
    fullLabel: "Hy-Ten / National Reinforcing / Generic",
    brandUrl: "https://www.nationwidereinforcing.com.au",
    accentColor: "#0369a1",
    name: "Plastic Bar Chairs and Rebar Spacers",
    descriptionLine: "Proprietary plastic bar chairs and circular spacers for maintaining minimum concrete cover over reinforcement in spalling repair mortar — critical for long-term repair durability",
    productType: "Plastic bar chairs and rebar spacers — concrete cover maintenance",
    filterTags: ["Bar-chair", "Rebar-spacer", "Plastic"],
    techChips: [
      { label: "20–50 mm cover heights", cls: "bg-sky-100 text-sky-800" },
      { label: "Slab, beam, column", cls: "bg-slate-100 text-slate-700" },
      { label: "Plastic — no rust staining", cls: "bg-green-50 text-green-700" },
      { label: "Clip-on and wheel types", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Plastic bar chairs and rebar spacers are used in concrete repair to maintain the correct minimum concrete cover over reinforcement — this is one of the most critical factors determining the durability of a repair, as inadequate cover over steel leads to rapid carbonation front penetration and re-initiation of corrosion within the repair life. Plastic spacers are used in preference to concrete or masonry nib spacers (blocks) and wire chairs because plastic does not rust and does not create rust staining paths to the mortar surface. Bar chairs are available in heights matching standard cover depths — typically 20 mm, 25 mm, 30 mm, 40 mm, and 50 mm — and in slab, beam, and wall types. Circular wheel spacers (ring spacers) are used for bottom mat and side cover in beams and walls. In repair mortar applications, bar chairs must be compatible with the fresh mortar cover — chairs that are too large in plan area will create voids or weak planes in thin repair mortar layers. Confirm the minimum chair size from the repair mortar TDS and the structural engineer's specified cover requirements.",
    technicalProperties: [
      "Plastic — no rust staining — maintains cover without creating corrosion paths to mortar surface",
      "Heights: 20, 25, 30, 40, 50 mm — matching standard cover depth requirements",
      "Slab chairs (bar supports), beam chairs, and wheel (ring) spacers available",
      "Clip-on types for beams and columns — ring spacers for side and soffit cover",
    ],
    limitations: [
      "Plastic bar chairs in very thin repair mortar layers (under 20–25 mm) can create visible 'voids' below the chair base — use minimum-footprint chair types in thin mortar applications",
      "Do not use concrete nib spacers (mortar block spacers) in exposed coastal or marine repairs — the nib spacer itself may have inadequate durability and can become a corrosion initiation point",
      "Bar chairs must be positioned on the substrate surface before placing mortar — chairs floating in wet mortar shift during compaction and do not maintain cover — fix chairs to the substrate with tie wire or a clip if required",
      "Confirm the cover depth specified in the structural engineer's drawings — the cover to the repaired rebar must match the original design intent or the engineer's remediation specification",
    ],
    procurementSources: [
      { name: "National Reinforcing — plastic spacers and bar chairs nationally", url: "https://www.nationwidereinforcing.com.au" },
      { name: "Bunnings Trade — bar chairs and rebar spacers nationally", url: "https://www.bunnings.com.au/trade" },
      { name: "Concrete formwork and reinforcing suppliers nationally", url: "https://www.nationwidereinforcing.com.au" },
    ],
  },
  {
    fullLabel: "Hilti / Ramset / Fischer",
    brandUrl: "https://www.hilti.com.au",
    accentColor: "#be123c",
    name: "Chemical Anchor — Epoxy or Hybrid Injection System",
    descriptionLine: "Two-component epoxy or hybrid injectable chemical anchor for starter bar installation, additional reinforcement, form tie fixings, and structural fixings in concrete repair",
    productType: "Injectable chemical anchor — epoxy or hybrid — starter bars and structural fixings",
    filterTags: ["Chemical-anchor", "Epoxy-anchor", "Form-tie"],
    techChips: [
      { label: "Epoxy / hybrid injection", cls: "bg-rose-100 text-rose-800" },
      { label: "Starter bars and fixings", cls: "bg-slate-100 text-slate-700" },
      { label: "Hilti HIT-RE 500 V4", cls: "bg-amber-50 text-amber-700" },
      { label: "AS 5216 rated", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Two-component injectable chemical anchors — epoxy (Hilti HIT-RE 500 V4, Ramset Chemset Epoxy 306, Fischer FIS EM) and hybrid polyester or vinylester (Hilti HIT-HY 200, Ramset Chemset Champion) — are used in concrete spalling repair to install additional reinforcement bars, connect new repair sections to existing structure, fix formwork ties into existing concrete, and provide structural dowels at repair interfaces. The resin is injected into a drilled, cleaned hole using a dual-cartridge dispensing gun — the two components mix in the static mixing nozzle and the combined resin fills the annulus between the anchor bar or bolt and the hole wall. After curing to the time stated in the TDS (varies significantly with temperature — longer at low temperature), the anchor is ready for loading. Chemical anchors require careful hole preparation — holes must be drilled to the correct diameter, brushed clean of dust, and blown clear with compressed air before resin injection. For structural applications (additional rebar, form tie fixings carrying mortar head loads), use only ETA-assessed anchors with AS 5216 design capacity documentation.",
    technicalProperties: [
      "Two-component injection resin — epoxy or hybrid — mixes in static nozzle in dispensing gun",
      "For starter bars, additional rebar, form tie fixings, and structural dowels in concrete repair",
      "Requires correctly sized, cleaned, and blown holes — hole preparation is critical for anchor performance",
      "Hilti HIT-RE 500 V4 and HIT-HY 200-A — ETA-assessed — AS 5216 design capacity documentation available",
    ],
    limitations: [
      "Curing time is temperature-dependent — at low temperature (under 10°C), cure time can be many hours — do not load the anchor before the minimum cure time at the ambient temperature — check the temperature-cure table in the TDS",
      "Resin will not cure in wet or flooded holes — the hole must be dry (or at most lightly damp for certain products designed for wet holes) — blow dry all holes and confirm no water ingress before injecting",
      "Hole preparation is critical — a hole that is not cleaned of dust, water, or debris will result in a reduced anchor capacity — brush and blow twice, then inject immediately",
      "Epoxy resin is a skin sensitiser and potential allergen — wear nitrile gloves and eye protection during injection — avoid skin contact with uncured resin",
    ],
    procurementSources: [
      { name: "Hilti Australia — chemical anchor systems nationally", url: "https://www.hilti.com.au" },
      { name: "Ramset — Chemset chemical anchors nationally", url: "https://www.ramset.com.au" },
      { name: "Trade hardware and concrete supply nationally", url: "https://www.bunnings.com.au/trade" },
    ],
  },
  {
    fullLabel: "Peri / Doka / Generic Supply",
    brandUrl: "https://www.peri.com.au",
    accentColor: "#64748b",
    name: "Formwork Fixings — Through-Ties, Wing Nuts, and Clamps",
    descriptionLine: "Proprietary through-ties, cone systems, wing nuts, and clamps for securing formwork panels to existing concrete in column and wall repair formwork",
    productType: "Formwork ties, clamps, and cone systems — formwork panel fixings",
    filterTags: ["Formwork-fixing", "Form-tie"],
    techChips: [
      { label: "Through-ties and wing nuts", cls: "bg-slate-100 text-slate-700" },
      { label: "Cone and she-bolt", cls: "bg-slate-100 text-slate-700" },
      { label: "15/17 mm through-hole", cls: "bg-amber-50 text-amber-700" },
      { label: "Peri, Doka, generic", cls: "bg-slate-100 text-slate-700" },
    ],
    systemDescription:
      "Formwork fixings — including through-tie bars, wing nuts, clamps, cone systems, and she-bolts — are used to secure plywood and steel formwork panels to the existing concrete structure and to each other during repair mortar casting. In concrete spalling repair, the most common formwork fixing configurations are: (1) through-tie systems in column and wall forms where the tie rod passes through the existing wall and is threaded through both form faces and secured with wing nuts or clamp plates; (2) she-bolt and cone systems that leave no permanent hole through the finished concrete face — the cone is removed on stripping and the she-bolt is unscrewed, leaving only a small cone-shaped hole that is filled with repair mortar; and (3) form clamps (C-clamps, snap ties) used where through-ties cannot be used — for example, on single-face wall forms where access to the back face is restricted. In many remedial repair situations, through-ties are not possible because drilling through the existing structure would damage it or compromise waterproofing — in these cases, surface-fixed form props and external clamps supported by chemical anchor fixings into the existing concrete are used instead.",
    technicalProperties: [
      "Through-tie bars — 15 mm and 17 mm diameter — pass through both formwork faces — threaded for wing nut or plate washer",
      "Cone and she-bolt system — no permanent hole in finished face — cone removed on stripping — small hole filled with repair mortar",
      "Form clamps and C-clamps — external compression fixings — used where through-ties are not possible",
      "Peri, Doka, and generic through-tie systems — match the fixing system to the formwork panel system in use",
    ],
    limitations: [
      "Through-ties through existing concrete walls must not damage structural reinforcement — locate reinforcement with GPR or rebar locator before drilling through-tie holes",
      "Through-ties in post-tensioned or prestressed structures must avoid PT tendons — do not drill without GPR scan of the structure first",
      "Through-tie holes left in the finished repair face must be filled with compatible repair mortar — do not leave through-tie holes unfilled on exposed or waterproofed surfaces",
      "Chemical anchor fixings used to support single-face form props must be sized for the design mortar head load — do not use light-duty chemical anchors for high pour-head formwork",
    ],
    procurementSources: [
      { name: "Peri Australia — formwork accessories nationally", url: "https://www.peri.com.au" },
      { name: "Doka Australia — formwork tie systems nationally", url: "https://www.doka.com/au" },
      { name: "Concrete formwork and trade suppliers nationally", url: "https://www.peri.com.au" },
    ],
  },
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Tie-wire", label: "Tie wire" },
  { id: "Bar-chair", label: "Bar chair" },
  { id: "Chemical-anchor", label: "Chemical anchor" },
  { id: "Formwork-fixing", label: "Formwork fixing" },
  { id: "Rebar-spacer", label: "Rebar spacer" },
  { id: "Form-tie", label: "Form tie" },
  { id: "Plastic", label: "Plastic" },
  { id: "Galvanised", label: "Galvanised" },
  { id: "Epoxy-anchor", label: "Epoxy anchor" },
];

const SYSTEM_COMPARISON = [
  {
    product: "Annealed Tie Wire",
    use: "Rebar tying and cage assembly",
    type: "Black / galvanised soft wire",
    supply: "Reinforcing suppliers, Bunnings",
    notes: "Bend ends back to avoid rust staining at concrete surface",
  },
  {
    product: "Plastic Bar Chairs",
    use: "Maintain concrete cover over rebar",
    type: "Plastic spacer — multiple heights",
    supply: "Reinforcing suppliers, Bunnings",
    notes: "Use correct height for specified cover — no rust staining",
  },
  {
    product: "Chemical Anchor — Epoxy",
    use: "Starter bars, dowels, form tie fixings",
    type: "Injectable 2-part epoxy/hybrid",
    supply: "Hilti, Ramset, Fischer",
    notes: "Clean hole, correct cure time — ETA-assessed for structural use",
  },
  {
    product: "Formwork Fixings — Ties",
    use: "Secure form panels to concrete",
    type: "Through-tie, clamp, cone system",
    supply: "Peri, Doka, formwork suppliers",
    notes: "Avoid PT tendons — fill tie holes after stripping with repair mortar",
  },
];

const TECH_INFO = {
  typicalApplications: [
    "Tie wire — binding reinforcement laps, securing additional bars in patch repairs, tying bar chairs to rebar cages before placing repair mortar",
    "Plastic bar chairs — maintaining minimum concrete cover in slab, beam, and column repair mortar — prevents inadequate cover and early corrosion re-initiation",
    "Chemical anchors (epoxy injection) — installing starter bars at construction joints, connecting new additional bars to existing structure, structural dowels at repair interfaces",
    "Chemical anchors — fixing form tie rods to existing concrete for single-face formwork systems in column and wall repairs",
    "Formwork ties and clamps — through-tie systems for column and wall forms, cone-and-bolt systems for clean face requirements, external clamps for restricted access applications",
    "All fixings used in the assembly and securing of concrete repair formwork in spalling repair",
  ],
  selectionCriteria: [
    "Tie wire: use galvanised in marine, coastal, or aggressive chloride environments — black annealed tie wire is acceptable for internal and sheltered applications",
    "Bar chairs: select height to match the engineer's specified concrete cover depth — confirm cover requirement from the structural drawings",
    "Bar chairs: use plastic only — not mortar block or wire chairs — to avoid rust staining paths to mortar surface",
    "Chemical anchors: use ETA-assessed epoxy anchors (Hilti HIT-RE 500 V4, Ramset Chemset Epoxy 306) for structural applications — confirm AS 5216 design capacity documentation is available",
    "Formwork fixings: through-tie systems require structural GPR scan to avoid rebar and PT tendons — in post-tensioned structures, use external prop and clamp systems fixed with surface chemical anchors",
    "For all chemical anchors and structural fixings, confirm the design load and anchor specification from the engineer's drawings before selecting the anchor product and size",
  ],
  limitations: [
    "Tie wire is NOT a structural fixing — it provides no load transfer and should not be used where a structural connection is required between new and existing concrete",
    "Do NOT use mortar block (concrete nib) spacers in the cover zone of repairs — they are porous and can create corrosion paths to the reinforcement",
    "Chemical anchors must not be loaded before the minimum cure time in the TDS — loading before cure causes anchor failure — cure time is highly temperature-dependent at site ambient temperatures",
    "Formwork through-ties through existing concrete must be preceded by a GPR scan to locate reinforcement and PT tendons — drilling through a PT tendon is a critical structural incident",
    "Resin in chemical anchors is a sensitiser — wear appropriate PPE (nitrile gloves, safety glasses) during injection — dispose of expired cartridges as chemical waste",
    "Do not reuse chemical anchor holes — once a hole has been injected and the anchor set, any attempt to reuse the hole for a different anchor will result in reduced performance",
  ],
  standardsNotes: [
    "AS 5216 — Design of Post-Installed Fasteners in Concrete — governs the structural design of chemical anchors and mechanical fasteners in concrete — required for all structural chemical anchor applications",
    "EN 1504-6 — Products and Systems for the Protection and Repair of Concrete — Part 6: Anchoring of Reinforcing Bar — covers the installation of additional reinforcement by chemical anchor",
    "AS 3600 — Concrete Structures — specifies minimum concrete cover to reinforcement for various exposure classifications — the cover depth governs the bar chair height selection",
    "AS 3610 — Formwork for Concrete — references form tie selection and design for concrete formwork systems",
    "Manufacturer ETA and AS 5216 design tables — required documentation for structural chemical anchor applications — confirm anchor capacity from ETA before specifying for structural connections",
  ],
  suitableDefects: [
    "Concrete spalling — primary application — tie wire and bar chairs used in all patch repair cycles requiring additional reinforcement",
    "Reinforcement corrosion — chemical anchors used to install replacement or supplementary bars in repair zones where original bars have been removed or are at minimum section",
    "Settlement cracks — chemical anchors for installing crack stitching bars (structural dowels across cracks)",
    "Slab edge deterioration — bar chairs and tie wire for positioning repair reinforcement at slab edges — formwork ties for edge form fixings",
    "Post-tensioned slab spalling — chemical anchors for replacing mild steel bars (not for replacing PT tendons) — always engage structural engineer for PT repair specifications",
  ],
  typicalSubstrates: [
    "Existing reinforced concrete — primary substrate for chemical anchor drilling — confirm rebar location with rebar locator or GPR before drilling",
    "New and replacement reinforcement bars — tie wire is applied to N-grade and Y-grade deformed bar — use galvanised wire in coastal environments",
    "Concrete repair mortar substrate — bar chairs are placed on cleaned, prepared concrete substrate before mortar placement",
    "Steel formwork and plywood form faces — formwork ties and clamps bear against ply and steel form faces — use correctly sized bearing plates to avoid local crushing of ply face",
  ],
};

// ── AI Selection Data (review mode) — derived from this page; unverified = unconfirmed/null ──
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["function", "rebar_tying / cover_spacing / structural_anchoring / formwork_fixing", "match consumable/fixing to its role in the repair"],
    ["structural_role", "positioning_only / structural_rated", "structural_rated → AS 5216 chemical anchor (NOT tie wire/chairs)"],
    ["environment", "standard / chloride_marine", "chloride_marine → galvanised/plastic only; no bare steel in cover zone"],
    ["pt_present", "yes / no", "yes → GPR scan before any drilling (avoid PT tendons)"],
    ["standard", "AS5216 / none", "structural anchoring → ETA-assessed AS 5216 capacity"],
  ],
  json: {
    category: "tie_wire_fixings",
    stage1_gates: {
      function: { allowed: ["rebar_tying", "cover_spacing", "structural_anchoring", "formwork_fixing"], rule: "match fixing to role" },
      structural_role: { allowed: ["positioning_only", "structural_rated"], rule: "structural_rated=AS5216 chemical anchor" },
      environment: { allowed: ["standard", "chloride_marine"], rule: "chloride_marine=galvanised/plastic; no bare steel in cover" },
      pt_present: { allowed: ["yes", "no"], rule: "yes=GPR scan before drilling" },
      standard: { allowed: ["AS5216", "none"], rule: "structural anchoring=ETA-assessed AS5216" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Annealed Tie Wire — 1.0 mm / 1.6 mm Galvanised or Black": {
    rows: [
      ["function", "gate", "rebar_tying"],
      ["structural_role", "gate", "positioning_only"],
      ["environment_max", "gate", "standard (galv for chloride)"],
      ["pt_safe", "gate", "yes"],
      ["material", "tag", "annealed_steel"],
      ["standard", "tag", "none"],
      ["supply", "meta", "national_reinforcing/bunnings"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "annealed_tie_wire",
      gates: { function: "rebar_tying", structural_role: "positioning_only", environment_max: "standard", pt_safe: "yes" },
      tag: { material: "annealed_steel", standard: "none" },
      rank: {},
      meta: { supply: "national_reinforcing/bunnings", alternative_product: "galvanised tie wire (chloride/marine)", data_status: "verified", selectable: true, source: "annealed tie wire 1.0/1.6mm — bend ends back below cover zone", confirmed_date: null },
    },
  },
  "Plastic Bar Chairs and Rebar Spacers": {
    rows: [
      ["function", "gate", "cover_spacing"],
      ["structural_role", "gate", "positioning_only"],
      ["environment_max", "gate", "chloride_marine (plastic, no rust)"],
      ["pt_safe", "gate", "yes"],
      ["material", "tag", "plastic"],
      ["standard", "tag", "none"],
      ["supply", "meta", "national_reinforcing/bunnings"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "plastic_bar_chairs_spacers",
      gates: { function: "cover_spacing", structural_role: "positioning_only", environment_max: "chloride_marine", pt_safe: "yes" },
      tag: { material: "plastic", standard: "none" },
      rank: { cover_heights_mm: "20/25/30/40/50" },
      meta: { supply: "national_reinforcing/bunnings", alternative_product: null, data_status: "verified", selectable: true, source: "plastic bar chairs/spacers 20-50mm — no rust staining; not concrete nib spacers in marine", confirmed_date: null },
    },
  },
  "Chemical Anchor — Epoxy or Hybrid Injection System": {
    rows: [
      ["function", "gate", "structural_anchoring"],
      ["structural_role", "gate", "structural_rated"],
      ["environment_max", "gate", "standard (confirm)"],
      ["pt_safe", "gate", "requires_gpr"],
      ["material", "tag", "epoxy_or_hybrid_resin"],
      ["standard", "tag", "AS5216 (ETA-assessed)"],
      ["supply", "meta", "hilti/ramset/fischer"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "chemical_anchor_injection",
      gates: { function: "structural_anchoring", structural_role: "structural_rated", environment_max: "standard", pt_safe: "requires_gpr" },
      tag: { material: "epoxy_or_hybrid_resin", standard: "AS5216" },
      rank: {},
      meta: { supply: "hilti/ramset/fischer", alternative_product: null, data_status: "verified", selectable: true, source: "Hilti HIT-RE 500 V4 / HIT-HY 200 etc — clean+dry holes; temperature-dependent cure", confirmed_date: null },
    },
  },
  "Formwork Fixings — Through-Ties, Wing Nuts, and Clamps": {
    rows: [
      ["function", "gate", "formwork_fixing"],
      ["structural_role", "gate", "structural_rated (mortar head load)"],
      ["environment_max", "gate", "n/a"],
      ["pt_safe", "gate", "requires_gpr"],
      ["material", "tag", "steel_fixing"],
      ["standard", "tag", "system_specific"],
      ["supply", "meta", "peri/doka"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "formwork_fixings_through_ties",
      gates: { function: "formwork_fixing", structural_role: "structural_rated", environment_max: "n/a", pt_safe: "requires_gpr" },
      tag: { material: "steel_fixing", standard: "system_specific" },
      rank: {},
      meta: { supply: "peri/doka", alternative_product: "surface-fixed props + chemical anchors (no through-tie)", data_status: "verified", selectable: true, source: "Peri/Doka through-ties, she-bolt/cone, clamps — GPR before drilling; fill tie holes", confirmed_date: null },
    },
  },
};

export function TieWireFixingsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">Tie wire, bar chairs and fixings in concrete spalling repair</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>
          Reinforcement assembly consumables — tie wire, bar chairs, chemical anchors, and formwork fixings — are the often-overlooked site hardware that holds a concrete spalling repair together during construction. Annealed tie wire positions and secures reinforcement cages; plastic bar chairs maintain the critical minimum concrete cover depth that determines long-term repair durability; chemical anchors provide the structural connection for additional or replacement bars; and formwork ties secure the form panels that contain the fresh repair mortar until it achieves strength.
        </p>
        {expanded && (
          <>
            <p>
              Each of these items carries a critical quality requirement: tie wire ends must be bent back to avoid rust staining of the mortar surface; bar chairs must be the correct height to achieve the engineer's specified cover; chemical anchors must be installed in correctly cleaned holes and allowed to cure before loading; and formwork ties must be installed without damaging existing reinforcement or PT tendons in the structure being repaired. Getting these details right at the small-items stage is essential to repair durability — a bar chair at the wrong height or a missing tie-wire end fold-back are the type of quality failures that lead to premature repair re-failure.
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

const DESIGN_CRITERIA = "For each ancillary, the governing spec: tie wire \u2014 annealed soft steel gauge/diameter & temper for tying rebar without snapping (galv for durability/cover zone); bar chairs/spacers \u2014 height to maintain design concrete cover (AS 3600 durability cover) & load/stability, plastic vs concrete vs wire (avoid corrosion path to surface); chemical anchors \u2014 epoxy/hybrid bond strength, embedment depth, edge distance & seismic/cracked-concrete rating (AS 5216 / ETA), hole cleaning & cure time; formwork ties \u2014 safe working load, cone/seal & water-tightness; corrosion compatibility & cover-zone suitability of any embedded steel.";

export function TieWireFixingsProductSection() {
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

      <AutoProductReference products={PRODUCTS} designCriteria={DESIGN_CRITERIA} sectionLabel="Concrete spalling" />
    </>
  );
}
