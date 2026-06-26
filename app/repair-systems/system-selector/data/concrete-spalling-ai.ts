// ─────────────────────────────────────────────────────────────────────────────
// System Selector — Concrete Spalling data registry
//
// SINGLE SOURCE OF TRUTH: this file imports the EXACT AI Selection Data blocks
// (Stage 1 + Stage 2) that are rendered on each product page. Nothing is
// re-typed, inferred, or fabricated here — the selector consumes the same
// objects the pages display. A product with selectable:false / data_status
// "unconfirmed" is carried through verbatim and excluded by the engine.
// ─────────────────────────────────────────────────────────────────────────────

import { AI_STAGE1 as bondingS1, AI_STAGE2 as bondingS2 } from "../../concrete-spalling/bonding-agents-sbr-latex/BondingAgentsSBRProductSection";
import { AI_STAGE1 as cemMortarS1, AI_STAGE2 as cemMortarS2 } from "../../concrete-spalling/cementitious-repair-mortars/CementitiousMortarsProductSection";
import { AI_STAGE1 as epoxyS1, AI_STAGE2 as epoxyS2 } from "../../concrete-spalling/epoxy-repair-mortars/EpoxyMortarsProductSection";
import { AI_STAGE1 as pmS1, AI_STAGE2 as pmS2 } from "../../concrete-spalling/repair-mortars-polymer-modified/RepairMortarsPMProductSection";
import { AI_STAGE1 as highBuildS1, AI_STAGE2 as highBuildS2 } from "../../concrete-spalling/high-build-repair-mortars/HighBuildRepairMortarsProductSection";
import { AI_STAGE1 as microS1, AI_STAGE2 as microS2 } from "../../concrete-spalling/micro-concrete/MicroConcreteProductSection";
import { AI_STAGE1 as groutS1, AI_STAGE2 as groutS2 } from "../../concrete-spalling/structural-grouts/StructuralGroutsProductSection";
import { AI_STAGE1 as rebarS1, AI_STAGE2 as rebarS2 } from "../../concrete-spalling/rebar-primers-inhibitors/RebarPrimersProductSection";
import { AI_STAGE1 as primerS1, AI_STAGE2 as primerS2 } from "../../concrete-spalling/concrete-primers-realkalisation/ConcretePrimersProductSection";
import { AI_STAGE1 as adhesiveS1, AI_STAGE2 as adhesiveS2 } from "../../concrete-spalling/concrete-repair-adhesives/ConcreteRepairAdhesivesProductSection";
import { AI_STAGE1 as curCompS1, AI_STAGE2 as curCompS2 } from "../../concrete-spalling/curing-compounds/CuringCompoundsProductSection";
import { AI_STAGE1 as curSheetS1, AI_STAGE2 as curSheetS2 } from "../../concrete-spalling/curing-sheeting/CuringSheetingProductSection";
import { AI_STAGE1 as fairingS1, AI_STAGE2 as fairingS2 } from "../../concrete-spalling/fairing-finishing-coats/FairingFinishingProductSection";
import { AI_STAGE1 as cementS1, AI_STAGE2 as cementS2 } from "../../concrete-spalling/cement-aggregates/CementAggregatesProductSection";

// ── Shared shapes (loose — gate vocabularies differ per category) ────────────

export type AiGateDef = { allowed: string[]; rule: string };
export type AiStage1 = {
  headers: string[];
  rows: string[][];
  json: { category: string; stage1_gates: Record<string, AiGateDef> };
};
export type AiStage2Json = {
  id: string;
  gates: Record<string, string>;
  tag?: Record<string, unknown>;
  rank?: Record<string, unknown>;
  meta: Record<string, unknown> & { data_status?: string; selectable?: boolean; source?: string };
};
export type AiStage2Entry = { rows: string[][]; json: AiStage2Json };
export type AiStage2 = Record<string, AiStage2Entry>;

// Where the category sits in the assembled concrete-spalling repair sequence.
export type RepairStage =
  | "surface-prep"
  | "rebar-primer"
  | "bonding-agent"
  | "repair-mortar"
  | "structural-grout"
  | "curing"
  | "formwork"
  | "finishing";

export type SelectorCategory = {
  slug: string;
  displayName: string;
  repairStage: RepairStage;
  href: string;
  stage1: AiStage1;
  stage2: AiStage2;
};

const cs = (slug: string): string => `/repair-systems/concrete-spalling/${slug}`;

// Cast through unknown — the page consts have narrow inferred literal types;
// the engine reads them via the loose shapes above.
const a1 = (x: unknown) => x as AiStage1;
const a2 = (x: unknown) => x as AiStage2;

// Order matters: this is the order the assembled repair system is presented in.
export const CONCRETE_SPALLING_CATEGORIES: SelectorCategory[] = [
  { slug: "rebar-primers-inhibitors", displayName: "Rebar Primers & Inhibitors", repairStage: "rebar-primer", href: cs("rebar-primers-inhibitors"), stage1: a1(rebarS1), stage2: a2(rebarS2) },
  { slug: "bonding-agents-sbr-latex", displayName: "Bonding Agents & SBR Latex", repairStage: "bonding-agent", href: cs("bonding-agents-sbr-latex"), stage1: a1(bondingS1), stage2: a2(bondingS2) },
  { slug: "concrete-primers-realkalisation", displayName: "Concrete Primers & Re-alkalisation", repairStage: "bonding-agent", href: cs("concrete-primers-realkalisation"), stage1: a1(primerS1), stage2: a2(primerS2) },
  { slug: "concrete-repair-adhesives", displayName: "Concrete Repair Adhesives", repairStage: "bonding-agent", href: cs("concrete-repair-adhesives"), stage1: a1(adhesiveS1), stage2: a2(adhesiveS2) },
  { slug: "cementitious-repair-mortars", displayName: "Cementitious Repair Mortars", repairStage: "repair-mortar", href: cs("cementitious-repair-mortars"), stage1: a1(cemMortarS1), stage2: a2(cemMortarS2) },
  { slug: "repair-mortars-polymer-modified", displayName: "Polymer-Modified Repair Mortars", repairStage: "repair-mortar", href: cs("repair-mortars-polymer-modified"), stage1: a1(pmS1), stage2: a2(pmS2) },
  { slug: "epoxy-repair-mortars", displayName: "Epoxy Repair Mortars", repairStage: "repair-mortar", href: cs("epoxy-repair-mortars"), stage1: a1(epoxyS1), stage2: a2(epoxyS2) },
  { slug: "high-build-repair-mortars", displayName: "High-Build Repair Mortars", repairStage: "repair-mortar", href: cs("high-build-repair-mortars"), stage1: a1(highBuildS1), stage2: a2(highBuildS2) },
  { slug: "micro-concrete", displayName: "Micro-Concrete", repairStage: "repair-mortar", href: cs("micro-concrete"), stage1: a1(microS1), stage2: a2(microS2) },
  { slug: "cement-aggregates", displayName: "Cement & Aggregates (site-batched)", repairStage: "repair-mortar", href: cs("cement-aggregates"), stage1: a1(cementS1), stage2: a2(cementS2) },
  { slug: "structural-grouts", displayName: "Structural Grouts", repairStage: "structural-grout", href: cs("structural-grouts"), stage1: a1(groutS1), stage2: a2(groutS2) },
  { slug: "curing-compounds", displayName: "Curing Compounds", repairStage: "curing", href: cs("curing-compounds"), stage1: a1(curCompS1), stage2: a2(curCompS2) },
  { slug: "curing-sheeting", displayName: "Curing Sheeting", repairStage: "curing", href: cs("curing-sheeting"), stage1: a1(curSheetS1), stage2: a2(curSheetS2) },
  { slug: "fairing-finishing-coats", displayName: "Fairing & Finishing Coats", repairStage: "finishing", href: cs("fairing-finishing-coats"), stage1: a1(fairingS1), stage2: a2(fairingS2) },
];

export const REPAIR_STAGE_ORDER: RepairStage[] = [
  "surface-prep",
  "rebar-primer",
  "bonding-agent",
  "repair-mortar",
  "structural-grout",
  "curing",
  "formwork",
  "finishing",
];

export const REPAIR_STAGE_LABEL: Record<RepairStage, string> = {
  "surface-prep": "Surface preparation & breakout",
  "rebar-primer": "Reinforcement priming",
  "bonding-agent": "Bonding agent / primer",
  "repair-mortar": "Repair mortar",
  "structural-grout": "Structural grout",
  "curing": "Curing",
  "formwork": "Formwork & fixings",
  "finishing": "Fairing / finishing",
};
