"use client";

import { useState, useRef } from "react";
import {
  CheckCircle, AlertTriangle, BookOpen, Layers, SquareStack,
  Ruler, ExternalLink, ChevronDown, ChevronUp,
  XCircle, ChevronLeft, ChevronRight, FileText,
} from "lucide-react";
import { AISelectionStage1, AISelectionStage2, DataNote } from "../../_components/ProductPageShared";
import { AutoProductReference } from "../../_components/AutoProductReference";
import { EPOXY_MORTAR_CARDS } from "./epoxyMortarsData";

type FilterTag = "Epoxy" | "2-part" | "3-part" | "High-strength" | "Chemical-resistant" | "Thin-section" | "Rapid-strength" | "Pre-bagged";

type Product = {
  fullLabel: string; brandUrl: string; tdsUrl?: string; accentColor: string;
  name: string; descriptionLine: string; productType: string; filterTags: FilterTag[];
  techChips: { label: string; cls: string }[];
  systemDescription: string; technicalProperties: string[]; limitations: string[];
  procurementSources: { name: string; url: string }[];
  dataNote?: string;
};

export const PRODUCTS: Product[] = [
  {
    fullLabel: "Sika Australia",
    brandUrl: "https://aus.sika.com",
    tdsUrl: "https://aus.sika.com/en/construction/concrete-repair-protection/concrete-repair-mortars/epoxy-repair-mortarsandrigidbonding/sikadur-41-cf-normal.html",
    accentColor: "#be123c",
    name: "Sikadur-41 CF Normal",
    descriptionLine: "3-component thixotropic high-strength epoxy resin patching mortar — 11 kg pre-proportioned kit — Sikadur-31 Parts A+B and Sikadur Aggregates 501 — EN 1504-3 tested — Sika trade supply nationally",
    productType: "3-component epoxy repair mortar — Sika Australia",
    filterTags: ["Epoxy", "3-part", "High-strength", "Chemical-resistant", "Thin-section", "Rapid-strength"],
    techChips: [
      { label: "3-component epoxy mortar", cls: "bg-rose-100 text-rose-800" },
      { label: "11 kg pre-proportioned kit", cls: "bg-slate-100 text-slate-700" },
      { label: "High strength — abrasion resistant", cls: "bg-green-50 text-green-700" },
      { label: "EN 1504-3 tested — CE mark", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Sikadur-41 CF Normal is a 3-component thixotropic mortar based on a solvent-free epoxy resin and selected aggregates — confirmed on the Sika AU product page. It consists of Sikadur-31 Part A and B combined with Sikadur Aggregates 501. It is supplied as pre-proportioned 11 kg kits. Sikadur-41 CF Normal is easy to mix and apply on site, achieves high strength, and provides good abrasion resistance and good chemical resistance. It is tested for structural and non-structural repair according to EN 1504-3 and carries the CE mark. Typical applications include carpark deck repairs, vehicle ramps, and structural concrete repairs requiring chemical and abrasion resistance. Component A is white, Component B is dark grey, Component C is sand aggregate — the colour coding provides a visual check on mixing. Confirm current product TDS, primer requirements, pot life, and temperature range from the current Sika Australia TDS before specifying — do not use Sika European or international TDS for Australian projects. Source: aus.sika.com product page confirmed 3-component, 11 kg kit, EN 1504-3 tested, Sikadur-31 Parts A+B + Aggregates 501.",
    technicalProperties: [
      "3-component epoxy mortar — Sikadur-31 Part A and B + Sikadur Aggregates 501 — 11 kg pre-proportioned kit",
      "High strength — good abrasion resistance — good chemical resistance",
      "Thixotropic — suitable for vertical and overhead application",
      "Tested to EN 1504-3 for structural and non-structural repair — CE mark",
      "Available through Sika Australia trade supply and Bayset nationally",
    ],
    limitations: [
      "3-component mixing requires care — confirm ratios from Sika AU TDS — incorrect mixing causes cure failure",
      "Dry substrate required — epoxy does not cure on wet or saturated concrete",
      "Reduced pot life in hot weather — mix in small batches — confirm pot life from current Sika Australia TDS",
      "Rigid cure — not suitable for active or moving cracks",
      "TODO: owner confirm — primer coat requirements for Sikadur-41 CF Normal from current Sika Australia TDS",
    ],
    procurementSources: [
      { name: "Sika Australia — trade supply", url: "https://aus.sika.com" },
      { name: "Bayset — national Sika distribution", url: "https://www.bayset.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Construction Supplies",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.fosroc.com.au/product/nitomortar-903",
    accentColor: "#7c2d12",
    name: "Fosroc Nitomortar 903",
    descriptionLine: "Epoxy repair mortar for carpark deck and structural concrete repair — confirmed AU Fosroc epoxy mortar — confirm pack size, primer, pot life, and EN 1504 class with Parchem technical before specifying",
    productType: "Epoxy repair mortar — Fosroc / Parchem Australia",
    dataNote: "Owner to confirm — 'Fosroc Nitomortar 50' was previously listed on this card but does not appear in the current Fosroc Australia product range (fosroc.com.au sitemap, June 2026). The confirmed AU Fosroc epoxy mortar range is Nitomortar AP, 903, 908, and EL-HB; Nitomortar 903 is the nearest confirmed equivalent for carpark deck and structural repair. Confirm the correct product, pack size, primer, and application requirements with Parchem technical before specifying.",
    filterTags: ["Epoxy", "3-part", "High-strength", "Chemical-resistant", "Thin-section"],
    techChips: [
      { label: "TODO: confirm product name", cls: "bg-orange-100 text-orange-900" },
      { label: "TODO: confirm pack size", cls: "bg-slate-100 text-slate-700" },
      { label: "Carpark ramps and decks", cls: "bg-green-50 text-green-700" },
      { label: "Parchem nationally", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "TODO: owner confirm — 'Fosroc Nitomortar 50' was listed in this card but does not appear in the current Fosroc Australia product range (checked fosroc.com.au sitemap June 2026 — no Nitomortar 50 found). The confirmed Fosroc AU epoxy mortar range includes Nitomortar AP (2-component paste), Nitomortar 903, Nitomortar 908, Nitomortar EL-HB, and Nitomortar F4 Fillers. Nitomortar 903 is a confirmed AU product and may be the closest equivalent for carpark deck and structural repair — but confirm the correct product, pack size, primer, and application requirements with Parchem technical before specifying. Source: fosroc.com.au sitemap confirmed no Nitomortar 50 — Nitomortar 903 and 908 confirmed in range.",
    technicalProperties: [
      "TODO: owner confirm — Nitomortar 50 not found in AU range — verify correct product name with Parchem",
      "Confirmed AU Fosroc epoxy mortar range: Nitomortar AP, 903, 908, EL-HB — confirm appropriate grade",
      "TODO: confirm pack size, primer, pot life, and EN 1504 class from Parchem TDS",
      "Parchem (DuluxGroup) — national trade supply with technical branch support",
      "Confirm current product and TDS before specifying",
    ],
    limitations: [
      "TODO: owner confirm — Nitomortar 50 does not appear in the current Fosroc AU range — this card must be updated with a confirmed AU product",
      "Dry substrate required for epoxy cure — confirm from Parchem TDS for confirmed replacement product",
      "Reduced pot life in hot weather — mix in small batches — confirm pot life from Parchem TDS",
      "Not suitable for active or moving cracks — rigid cure",
      "Higher cost than cementitious alternatives — specify only where chemical resistance or high early strength is required",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
      { name: "Fosroc Australia — product information", url: "https://www.fosroc.com.au" },
    ],
  },
  {
    fullLabel: "Fosroc / Parchem Construction Supplies",
    brandUrl: "https://www.parchem.com.au",
    tdsUrl: "https://www.fosroc.com.au/product/nitomortar-ap-au",
    accentColor: "#92400e",
    name: "Fosroc Nitomortar AP",
    descriptionLine: "2-component epoxy paste — patching repairs to concrete, bonding precast concrete, anchor bolt setting — potable water approved AS4020:2018 — can be applied on saturated surface dry (SSD) concrete — Parchem (DuluxGroup) nationally",
    productType: "2-component epoxy paste — repair and bonding — Fosroc / Parchem Australia",
    filterTags: ["Epoxy", "2-part", "High-strength", "Chemical-resistant", "Thin-section", "Pre-bagged"],
    techChips: [
      { label: "2-component epoxy paste", cls: "bg-amber-100 text-amber-900" },
      { label: "TODO: confirm pack size", cls: "bg-slate-100 text-slate-700" },
      { label: "SSD concrete compatible", cls: "bg-green-50 text-green-700" },
      { label: "Parchem nationally", cls: "bg-amber-50 text-amber-700" },
    ],
    systemDescription:
      "Fosroc Nitomortar AP is a 2-component epoxy paste — confirmed as 2-component on the Fosroc AU product page (not 3-part as previously stated). It is used for patching repairs to concrete and bonding of precast concrete components where strength, impermeability to water, and resistance to aggressive chemicals is essential. It is also used for setting starter bars, dowels, anchoring in general, and as an adhesive for the Nitofill LV crack injection system and bonding Expoband F to concrete. Key advantages include excellent resistance to abrasion and impact, resistance to a wide range of acids, alkalis, and industrial chemicals, two-pack colour coding for visual check on correct mixing, and potable water approval to AS4020:2018. It can be used on saturated surface dry (SSD) concrete — an advantage over many epoxy systems. Confirm current pack size, application depth range, and primer requirements from the current Fosroc/Parchem TDS before specifying. Source: fosroc.com.au product page confirmed 2-component, potable water approved, SSD compatible.",
    technicalProperties: [
      "2-component epoxy paste — confirmed 2-component (not 3-part) from fosroc.com.au AU product page",
      "Can be applied to saturated surface dry (SSD) concrete — unusual advantage for epoxy system",
      "Potable water approved AS4020:2018 — suitable for water infrastructure repair",
      "Resistant to wide range of acids, alkalis, and industrial chemicals — abrasion and impact resistant",
      "Available through Parchem Construction Supplies nationally — also for anchor bolt setting and precast bonding",
    ],
    limitations: [
      "TODO: owner confirm — pack size for Nitomortar AP AU — not confirmed from available AU page data",
      "TODO: owner confirm — whether Nitoproof Epoxy primer is required or if SSD application eliminates primer requirement",
      "Rigid cure — not suitable for active cracks or moving joints",
      "Confirm appropriate Nitomortar grade for the application — range includes AP, 903, 908, EL-HB",
      "Confirm current product TDS from Parchem before specifying — Fosroc product range subject to periodic revision",
    ],
    procurementSources: [
      { name: "Parchem Construction Supplies — national (DuluxGroup)", url: "https://www.parchem.com.au" },
    ],
  }
];

const FILTER_DEFS: { id: FilterTag; label: string }[] = [
  { id: "Epoxy", label: "Epoxy" },
  { id: "2-part", label: "2-part" },
  { id: "3-part", label: "3-part" },
  { id: "High-strength", label: "High strength" },
  { id: "Chemical-resistant", label: "Chemical resistant" },
  { id: "Thin-section", label: "Thin-section" },
  { id: "Rapid-strength", label: "Rapid strength" },
];

const SYSTEM_COMPARISON = [
  { brand: "Ardex", product: "Ardex RA 88 Plus", parts: "2-part", kit: "627 mL / 254 mL cartridge", primer: "TODO: confirm from Ardex AU TDS", strength: "> 55 MPa", bestFor: "Repair adhesive — spalls, cracks, anchor bolts" },
  { brand: "Sika", product: "Sikadur-41 CF Normal", parts: "3-part", kit: "11 kg pre-proportioned", primer: "TODO: confirm from Sika AU TDS", strength: "High — EN 1504-3 tested", bestFor: "Structural repair — carparks, vertical and overhead" },
  { brand: "Fosroc / Parchem", product: "TODO: confirm — Nitomortar 50 not in AU range", parts: "TODO", kit: "TODO", primer: "TODO: confirm with Parchem", strength: "TODO", bestFor: "TODO: confirm correct AU product" },
  { brand: "Fosroc / Parchem", product: "Fosroc Nitomortar AP", parts: "2-part", kit: "TODO: confirm pack size", primer: "TODO: confirm from Parchem TDS", strength: "High — acid/alkali resistant", bestFor: "Concrete repair, anchor setting, SSD compatible" },
];

const TECH_INFO = {
  typicalApplications: [
    "Carpark deck and vehicle ramp concrete spalling repair where chemical and fuel resistance is required",
    "Thin-section structural concrete repair where insufficient depth is available for a standard cementitious mortar build-up",
    "Heavy-duty repair of columns, beams, and slab soffits subject to impact or high sustained loading",
    "Fast-track programme repairs where rapid strength gain is required for early traffic reinstatement",
    "Chemical splash zones and vehicle bays where resistance to fuel, oil, or dilute chemicals is required",
  ],
  selectionCriteria: [
    "Chemical resistance: specify epoxy mortar where the repair surface is subject to fuel, oil, or chemical attack — standard cementitious mortars are not suitable",
    "Application depth: minimum 10 mm — for thinner sections, confirm product capability with manufacturer",
    "Substrate condition: dry substrate is required — cementitious mortars are preferred for wet or saturated conditions",
    "Pot life: confirm pot life in the expected application temperature — reduce batch size in hot weather",
    "Cost: epoxy mortars are significantly more expensive than cementitious alternatives — reserve for applications where epoxy-specific properties (chemical resistance, high early strength, thin section) are genuinely required",
    "2-part vs 3-part: 2-part systems are simpler to mix; 3-part systems incorporate aggregate separately and allow greater control over aggregate grading",
  ],
  limitations: [
    "Rigid, high-modulus cure — will crack under active substrate movement or differential thermal expansion — not suitable for live joints or active cracks",
    "Minimum application depth 10 mm — cannot be feathered to a thin edge — use cementitious fine mortar for cosmetic surface profiling",
    "Dry substrate required — contact with water during mixing or application will cause cure failure",
    "Exothermic reaction — significant heat generated during cure in large pours — confirm maximum application thickness and pot life from TDS",
    "Not suitable for use as an anchor grout — use a dedicated structural grout product instead",
    "High cost — epoxy mortars are not justified for general concrete spalling repair in typical residential strata",
  ],
  standardsNotes: [
    "EN 1504-3 — Products and Systems for Protection and Repair of Concrete Structures — epoxy repair mortars are typically rated Class R4 (highest class) — confirm from manufacturer TDS",
    "AS 3600 — Concrete Structures — minimum cover requirements apply to the reinstated repair section",
    "ICRI 310.2 — CSP substrate preparation profile for epoxy mortar: minimum CSP 3–5 on prepared, dry concrete",
    "Do not apply over curing compounds, release agents, or contaminated concrete — confirm surface preparation requirements from manufacturer TDS",
  ],
  suitableDefects: [
    "Concrete spalling in carpark decks and vehicle ramps — chemical and abrasion resistance required",
    "Thin-section structural repair where depth is limited to 10–20 mm",
    "Spalling repair in chemical plant or industrial areas with fuel, oil or solvent exposure",
    "Fast-track programme repair where high early strength is required within hours",
  ],
  typicalSubstrates: [
    "In-situ concrete — must be clean, dry, and free of laitance, oil, and curing compounds — mechanically prepared to CSP 3–5 minimum",
    "Precast concrete — same preparation requirements — confirm primer compatibility with manufacturer",
    "Exposed reinforcement — clean to bright steel and prime with compatible epoxy rebar primer before applying epoxy mortar",
  ],
};

function CollapsibleList({ items, icon, limit = 3 }: { items: string[]; icon: "check" | "x"; limit?: number }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, limit);
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
      {items.length > limit && <button onClick={() => setExpanded(e => !e)} className="mt-2 text-[10px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Show less ↑" : `+${items.length - limit} more ↓`}</button>}
    </div>
  );
}
function CollapsibleSources({ sources }: { sources: { name: string; url?: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">PROCUREMENT SOURCES</p>
        <button onClick={() => setExpanded(e => !e)} className="text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide ↑" : "See more ↓"}</button>
      </div>
      {expanded && <div className="mt-2 space-y-1.5">{sources.map(src => (<div key={src.name} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs">{src.url ? <a href={src.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-slate-700 hover:text-slate-900">{src.name} <ExternalLink size={9} className="text-slate-300" /></a> : <span className="font-semibold text-slate-600">{src.name}</span>}</div>))}</div>}
      <p className="mt-2 text-[10px] italic text-slate-400">Confirm suitability with current manufacturer TDS before specifying.</p>
    </div>
  );
}
function CollapsibleCardDetails({ text, chips }: { text: string; chips: { label: string; cls: string }[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      {expanded && (<><p className="mt-1 text-[10px] leading-4 text-slate-500">{text}</p>{chips.length > 0 && <div className="mt-2 flex flex-wrap gap-1.5">{chips.map(c => <span key={c.label} className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${c.cls}`}>{c.label}</span>)}</div>}</>)}
      <button onClick={() => setExpanded(e => !e)} className="mt-0.5 text-[9px] font-bold text-slate-400 hover:text-slate-600">{expanded ? "Hide details ↑" : "Show details ↓"}</button>
    </div>
  );
}
function CollapsibleDescription({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <p className={`whitespace-pre-line text-xs leading-6 text-slate-700 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      <button onClick={() => setExpanded(e => !e)} className="mt-1.5 text-[10px] font-bold text-sky-700 hover:text-sky-900">{expanded ? "Show less ↑" : "Show more ↓"}</button>
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
      <ul className="space-y-2">{items.map((item, i) => (<li key={i} className="flex items-start gap-2.5 text-xs leading-5 text-slate-600">{style === "check" && <CheckCircle size={12} className="mt-0.5 shrink-0 text-green-600" />}{style === "warn" && <AlertTriangle size={12} className="mt-0.5 shrink-0 text-amber-500" />}{style === "bullet" && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" />}{item}</li>))}</ul>
    </div>
  );
}

// ── AI Selection Data (review mode) — derived from this page; unverified = unconfirmed/null ──
export const AI_STAGE1 = {
  headers: ["Gate", "Demand (allowed values)", "Pass rule"],
  rows: [
    ["defect_type", "spalling / thin_section / chemical_exposure / active_crack / anchor_grout", "spalling/thin_section/chemical_exposure → this category; active_crack → not_suitable (rigid); anchor_grout → requires_alternative (structural grout)"],
    ["substrate_moisture", "dry / ssd / wet", "wet → not_suitable (epoxy won't cure); dry required unless product states SSD"],
    ["chemical_exposure", "none / fuel_oil / chemical", "fuel_oil/chemical → epoxy suited; none → cementitious may suffice (cost)"],
    ["repair_depth_mm", "min 10 mm typical", "< 10 mm feather → requires_alternative (fine cementitious)"],
    ["movement", "static / active", "active → not_suitable (rigid high-modulus cure)"],
  ],
  json: {
    category: "epoxy_repair_mortars",
    stage1_gates: {
      defect_type: { allowed: ["spalling", "thin_section", "chemical_exposure", "active_crack", "anchor_grout"], rule: "spalling/thin_section/chemical_exposure=suitable; active_crack=not_suitable; anchor_grout=requires_alternative" },
      substrate_moisture: { allowed: ["dry", "ssd", "wet"], rule: "wet=not_suitable; dry required unless product states SSD" },
      chemical_exposure: { allowed: ["none", "fuel_oil", "chemical"], rule: "fuel_oil/chemical=suitable; none=cementitious may suffice" },
      repair_depth_mm: { allowed: ["min_10mm_typical"], rule: "<10mm feather=requires_alternative (fine cementitious)" },
      movement: { allowed: ["static", "active"], rule: "active=not_suitable" },
    },
  },
};

const AI_STAGE2_HEADERS = ["Field", "Type", "Value"];

export const AI_STAGE2: Record<string, { rows: string[][]; json: unknown }> = {
  "Ardex RA 88 Plus": {
    rows: [
      ["defect_role", "gate", "repair_adhesive"],
      ["parts", "gate", "2_part"],
      ["substrate_moisture_max", "gate", "unconfirmed"],
      ["orientation", "gate", "horizontal/vertical/overhead"],
      ["movement", "gate", "static_only"],
      ["min_depth_mm", "rank", "null (unconfirmed)"],
      ["compressive_mpa", "rank", "55 (>55)"],
      ["chemistry", "tag", "epoxy"],
      ["en1504_class", "tag", "unconfirmed"],
      ["format", "meta", "cartridge"],
      ["pack_size", "meta", "627mL/254mL"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "ardex_ra_88_plus",
      gates: { defect_role: "repair_adhesive", parts: "2_part", substrate_moisture_max: "unconfirmed", orientation: "horizontal/vertical/overhead", movement: "static_only" },
      tag: { chemistry: "epoxy", en1504_class: "unconfirmed" },
      rank: { min_depth_mm: null, compressive_mpa: 55 },
      meta: { format: "cartridge", pack_size: "627mL/254mL", alternative_product: null, data_status: "verified", selectable: true, source: "ardexaustralia.com Ardex RA 88 Plus product page", confirmed_date: null },
    },
  },
  "Sikadur-41 CF Normal": {
    rows: [
      ["defect_role", "gate", "bulk_mortar"],
      ["parts", "gate", "3_part"],
      ["substrate_moisture_max", "gate", "dry"],
      ["orientation", "gate", "vertical/overhead (thixotropic)"],
      ["movement", "gate", "static_only"],
      ["min_depth_mm", "rank", "null (unconfirmed)"],
      ["compressive_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "epoxy"],
      ["en1504_class", "tag", "tested (EN1504-3, CE)"],
      ["format", "meta", "kit"],
      ["pack_size", "meta", "11kg"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "sikadur_41_cf_normal",
      gates: { defect_role: "bulk_mortar", parts: "3_part", substrate_moisture_max: "dry", orientation: "vertical/overhead", movement: "static_only" },
      tag: { chemistry: "epoxy", en1504_class: "tested" },
      rank: { min_depth_mm: null, compressive_mpa: null },
      meta: { format: "kit", pack_size: "11kg", alternative_product: null, data_status: "verified", selectable: true, source: "aus.sika.com Sikadur-41 CF Normal product page", confirmed_date: null },
    },
  },
  "Fosroc Nitomortar 903": {
    rows: [
      ["defect_role", "gate", "unconfirmed"],
      ["parts", "gate", "unconfirmed"],
      ["substrate_moisture_max", "gate", "unconfirmed"],
      ["orientation", "gate", "unconfirmed"],
      ["movement", "gate", "unconfirmed"],
      ["min_depth_mm", "rank", "null (unconfirmed)"],
      ["compressive_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "epoxy"],
      ["en1504_class", "tag", "unconfirmed"],
      ["format", "meta", "null (unconfirmed)"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["data_status", "meta", "unconfirmed"],
      ["selectable", "meta", "false"],
    ],
    json: {
      id: "fosroc_nitomortar_903",
      gates: { defect_role: "unconfirmed", parts: "unconfirmed", substrate_moisture_max: "unconfirmed", orientation: "unconfirmed", movement: "unconfirmed" },
      tag: { chemistry: "epoxy", en1504_class: "unconfirmed" },
      rank: { min_depth_mm: null, compressive_mpa: null },
      meta: { format: null, pack_size: null, alternative_product: null, data_status: "unconfirmed", selectable: false, source: "fosroc.com.au — Nitomortar 50 not in AU range; correct product unverified", confirmed_date: null },
    },
  },
  "Fosroc Nitomortar AP": {
    rows: [
      ["defect_role", "gate", "bonding"],
      ["parts", "gate", "2_part"],
      ["substrate_moisture_max", "gate", "ssd"],
      ["orientation", "gate", "unconfirmed"],
      ["movement", "gate", "static_only"],
      ["min_depth_mm", "rank", "null (unconfirmed)"],
      ["compressive_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "epoxy"],
      ["en1504_class", "tag", "unconfirmed"],
      ["format", "meta", "paste"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "fosroc_nitomortar_ap",
      gates: { defect_role: "bonding", parts: "2_part", substrate_moisture_max: "ssd", orientation: "unconfirmed", movement: "static_only" },
      tag: { chemistry: "epoxy", en1504_class: "unconfirmed" },
      rank: { min_depth_mm: null, compressive_mpa: null },
      meta: { format: "paste", pack_size: null, alternative_product: null, data_status: "verified", selectable: true, source: "fosroc.com.au Nitomortar AP — SSD/potable confirmed", confirmed_date: null },
    },
  },
  "Sikadur-31 CF Normal": {
    rows: [
      ["defect_role", "gate", "bonding"],
      ["parts", "gate", "2_part"],
      ["substrate_moisture_max", "gate", "dry"],
      ["orientation", "gate", "vertical/overhead (thixotropic)"],
      ["movement", "gate", "static_only"],
      ["min_depth_mm", "rank", "null (unconfirmed)"],
      ["compressive_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "epoxy"],
      ["en1504_class", "tag", "unconfirmed"],
      ["format", "meta", "paste"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "sikadur_31_cf_normal",
      gates: { defect_role: "bonding", parts: "2_part", substrate_moisture_max: "dry", orientation: "vertical/overhead", movement: "static_only" },
      tag: { chemistry: "epoxy", en1504_class: "unconfirmed" },
      rank: { min_depth_mm: null, compressive_mpa: null },
      meta: { format: "paste", pack_size: null, alternative_product: null, data_status: "verified", selectable: true, source: "aus.sika.com Sikadur-31 CF Normal — formulation/system to confirm", confirmed_date: null },
    },
  },
  "Sikadur-33": {
    rows: [
      ["defect_role", "gate", "bonding"],
      ["parts", "gate", "2_part"],
      ["substrate_moisture_max", "gate", "dry"],
      ["orientation", "gate", "unconfirmed"],
      ["movement", "gate", "static_only"],
      ["min_depth_mm", "rank", "null (unconfirmed)"],
      ["compressive_mpa", "rank", "null (unconfirmed)"],
      ["chemistry", "tag", "epoxy"],
      ["en1504_class", "tag", "unconfirmed"],
      ["format", "meta", "paste"],
      ["pack_size", "meta", "null (unconfirmed)"],
      ["data_status", "meta", "verified"],
      ["selectable", "meta", "true"],
    ],
    json: {
      id: "sikadur_33",
      gates: { defect_role: "bonding", parts: "2_part", substrate_moisture_max: "dry", orientation: "unconfirmed", movement: "static_only" },
      tag: { chemistry: "epoxy", en1504_class: "unconfirmed" },
      rank: { min_depth_mm: null, compressive_mpa: null },
      meta: { format: "paste", pack_size: null, alternative_product: null, data_status: "verified", selectable: true, source: "aus.sika.com Sikadur-33 — formulation/system to confirm", confirmed_date: null },
    },
  },
};

export function EpoxyMortarsIntroSection() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-950 text-white"><BookOpen size={15} /></div>
        <h3 className="text-base font-extrabold text-sky-950">What are epoxy repair mortars?</h3>
      </div>
      <div className="space-y-4 text-sm leading-7 text-slate-600">
        <p>Epoxy repair mortars are 2-part or 3-part systems combining an epoxy resin, a hardener, and a graded aggregate filler. Unlike cementitious and polymer-modified mortars that cure through hydration, epoxy mortars cure through a chemical cross-linking reaction — producing a rigid, high-strength, chemical-resistant repair with very low porosity. They are used specifically where chemical resistance, high early strength, thin-section capability, or heavy load resistance is required.</p>
        {expanded && (<p>In Australian Class 2 strata and commercial remediation practice, epoxy repair mortars are not the default choice for concrete spalling — they are reserved for applications where their specific properties are needed: carpark decks and ramps subject to fuel and chemical exposure, repairs requiring traffic reinstatement within hours, or thin-section structural repairs where insufficient depth is available for a cementitious mortar build-up. For standard concrete spalling on balcony soffits, columns, and beams in a residential strata context, a polymer-modified cementitious repair mortar (EN 1504-3 Class R3) is the appropriate and lower-cost specification.</p>)}
      </div>
      <button onClick={() => setExpanded(e => !e)} className="mt-4 text-xs font-bold text-sky-700 hover:text-sky-900">{expanded ? "Read less ↑" : "Read more ↓"}</button>
    </div>
  );
}

const DESIGN_CRITERIA = "Component count (2-pt paste/adhesive vs 3-pt aggregate-filled mortar for structural reinstatement); compressive/flexural/tensile bond strength (MPa, epoxy typ >50 MPa compressive); min/max layer thickness & max build per pass; E-modulus & thermal expansion mismatch vs concrete (high E/CTE — limit thickness, NOT for thin overlays or thermal cycling exposure); pot life & cure time at temp; application/cure temperature window (epoxy sensitive <10°C); substrate moisture tolerance (most need dry, SSD not suitable); chemical/chloride resistance; non-sag (vertical/overhead) vs flowable; bond/primer requirement; EN 1504-3/-4 structural class; service temp limit (epoxy softens / not for fire/high-temp).";

export function EpoxyMortarsProductSection() {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <button type="button" onClick={() => setAccordionOpen(o => !o)} className="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition hover:bg-slate-50">
          <div><p className="text-base font-extrabold text-sky-950">System Technical Reference</p><p className="mt-0.5 text-xs text-slate-500">Applications, selection criteria, limitations, standards, suitable substrates</p></div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-500">{accordionOpen ? (<>Hide detail <ChevronUp size={14} /></>) : (<>Show detail <ChevronDown size={14} /></>)}</div>
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

      <AutoProductReference products={PRODUCTS} cards={EPOXY_MORTAR_CARDS} designCriteria={DESIGN_CRITERIA} sectionLabel="Epoxy repair mortars" />
    </>
  );
}
