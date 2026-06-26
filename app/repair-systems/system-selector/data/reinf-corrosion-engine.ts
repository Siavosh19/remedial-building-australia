// ─────────────────────────────────────────────────────────────────────────────
// System Selector — Reinforcement corrosion section (registry + config)
// Imports the exact AI blocks rendered on the 10 reinforcement-corrosion pages.
// ─────────────────────────────────────────────────────────────────────────────

import { AI_STAGE1 as abrasivesS1, AI_STAGE2 as abrasivesS2 } from "../../reinforcement-corrosion/abrasives-blades-tools/AbrasivesToolsRCProductSection";
import { AI_STAGE1 as rebarS1, AI_STAGE2 as rebarS2 } from "../../reinforcement-corrosion/rebar-primers-inhibitors/RebarPrimersProductSection";
import { AI_STAGE1 as epoxyZincS1, AI_STAGE2 as epoxyZincS2 } from "../../reinforcement-corrosion/epoxy-zinc-rich-primers/EpoxyZincRichPrimersProductSection";
import { AI_STAGE1 as mciS1, AI_STAGE2 as mciS2 } from "../../reinforcement-corrosion/corrosion-inhibitors-mci/CorrosionInhibitorsMCIProductSection";
import { AI_STAGE1 as cathodicS1, AI_STAGE2 as cathodicS2 } from "../../reinforcement-corrosion/cathodic-protection/CathodicProtectionProductSection";
import { AI_STAGE1 as anchorS1, AI_STAGE2 as anchorS2 } from "../../reinforcement-corrosion/epoxy-anchoring-adhesives/EpoxyAnchoringAdhesivesProductSection";
import { AI_STAGE1 as meshS1, AI_STAGE2 as meshS2 } from "../../reinforcement-corrosion/reinforcement-mesh/ReinforcementMeshProductSection";
import { AI_STAGE1 as pmS1, AI_STAGE2 as pmS2 } from "../../reinforcement-corrosion/repair-mortars-polymer-modified/RepairMortarsPMRCProductSection";
import { AI_STAGE1 as cfrpS1, AI_STAGE2 as cfrpS2 } from "../../reinforcement-corrosion/cfrp-strips-laminates/CFRPStripsLaminatesProductSection";
import { AI_STAGE1 as resinS1, AI_STAGE2 as resinS2 } from "../../reinforcement-corrosion/epoxy-laminating-resins/EpoxyLaminatingResinsProductSection";

import {
  runSelectorCore, type SectionConfig, type SelectorCategory, type Demand, type Question, type AiStage1, type AiStage2,
} from "./selector-core";

const rc = (slug: string) => `/repair-systems/reinforcement-corrosion/${slug}`;
const a1 = (x: unknown) => x as AiStage1;
const a2 = (x: unknown) => x as AiStage2;

const CATEGORIES: SelectorCategory[] = [
  { slug: "abrasives-blades-tools", displayName: "Abrasives, Blades & Tools", repairStage: "surface-prep", href: rc("abrasives-blades-tools"), stage1: a1(abrasivesS1), stage2: a2(abrasivesS2) },
  { slug: "rebar-primers-inhibitors", displayName: "Rebar Primers & Inhibitors", repairStage: "rebar-primer", href: rc("rebar-primers-inhibitors"), stage1: a1(rebarS1), stage2: a2(rebarS2) },
  { slug: "epoxy-zinc-rich-primers", displayName: "Epoxy Zinc-Rich Primers", repairStage: "rebar-primer", href: rc("epoxy-zinc-rich-primers"), stage1: a1(epoxyZincS1), stage2: a2(epoxyZincS2) },
  { slug: "corrosion-inhibitors-mci", displayName: "Corrosion Inhibitors (MCI)", repairStage: "corrosion-inhibitor", href: rc("corrosion-inhibitors-mci"), stage1: a1(mciS1), stage2: a2(mciS2) },
  { slug: "cathodic-protection", displayName: "Cathodic Protection", repairStage: "cathodic-protection", href: rc("cathodic-protection"), stage1: a1(cathodicS1), stage2: a2(cathodicS2) },
  { slug: "epoxy-anchoring-adhesives", displayName: "Epoxy Anchoring Adhesives", repairStage: "anchoring", href: rc("epoxy-anchoring-adhesives"), stage1: a1(anchorS1), stage2: a2(anchorS2) },
  { slug: "reinforcement-mesh", displayName: "Reinforcement Mesh & Bar", repairStage: "reinforcement-replacement", href: rc("reinforcement-mesh"), stage1: a1(meshS1), stage2: a2(meshS2) },
  { slug: "repair-mortars-polymer-modified", displayName: "Polymer-Modified Repair Mortars", repairStage: "repair-mortar", href: rc("repair-mortars-polymer-modified"), stage1: a1(pmS1), stage2: a2(pmS2) },
  { slug: "cfrp-strips-laminates", displayName: "CFRP Strips & Laminates", repairStage: "strengthening", href: rc("cfrp-strips-laminates"), stage1: a1(cfrpS1), stage2: a2(cfrpS2) },
  { slug: "epoxy-laminating-resins", displayName: "Epoxy Laminating Resins", repairStage: "strengthening-resin", href: rc("epoxy-laminating-resins"), stage1: a1(resinS1), stage2: a2(resinS2) },
];

const STAGE_ORDER = ["surface-prep", "rebar-primer", "corrosion-inhibitor", "cathodic-protection", "anchoring", "reinforcement-replacement", "repair-mortar", "strengthening", "strengthening-resin"];
const STAGE_LABELS: Record<string, string> = {
  "surface-prep": "Surface preparation & rebar cleaning",
  "rebar-primer": "Reinforcement priming / corrosion protection",
  "corrosion-inhibitor": "Corrosion inhibitor (adjunct)",
  "cathodic-protection": "Cathodic protection (adjunct)",
  "anchoring": "Anchoring / starter bars",
  "reinforcement-replacement": "Reinforcement replacement",
  "repair-mortar": "Repair mortar",
  "strengthening": "Structural strengthening (CFRP)",
  "strengthening-resin": "CFRP bonding / laminating resin",
};

export const RC_QUESTIONS: Question[] = [
  { key: "corrosion_cause", prompt: "What is driving the corrosion?", help: "Carbonation (loss of alkalinity) vs chloride (salt) attack.", options: [
    { value: "carbonation", label: "Carbonation", hint: "Aged concrete, CO₂ ingress, general cover loss" },
    { value: "chloride", label: "Chloride", hint: "Marine, de-icing salt, contaminated aggregate" },
    { value: "unknown", label: "Not sure", hint: "Cause not yet established — treat conservatively" },
  ] },
  { key: "exposure", prompt: "What is the exposure environment?", help: "AS 3600 exposure, in plain terms.", options: [
    { value: "sheltered", label: "Sheltered / internal", hint: "A1–A2" },
    { value: "moderate", label: "Moderate / external", hint: "B1" },
    { value: "coastal_high_chloride", label: "Coastal / high-chloride", hint: "B2–C2 marine/splash/de-icing" },
  ] },
  { key: "section_loss", prompt: "Is there loss of reinforcement section?", options: [
    { value: "none", label: "None", hint: "Cover loss only; bars sound" },
    { value: "minor", label: "Minor", hint: "Surface pitting; section largely intact" },
    { value: "significant", label: "Significant", hint: "Measurable section loss — replacement likely" },
  ] },
  { key: "repair_extent", prompt: "What is the extent of the repair?", options: [
    { value: "localized_patch", label: "Localised patches", hint: "Discrete repair areas" },
    { value: "large_area", label: "Large area", hint: "Widespread — full removal may be impractical" },
  ] },
  { key: "structural_capacity", prompt: "Is the element's structural capacity adequate after repair?", help: "Engineer's assessment — does it need added capacity?", options: [
    { value: "adequate", label: "Adequate", hint: "Reinstatement restores capacity" },
    { value: "deficient", label: "Deficient", hint: "Needs strengthening (e.g. CFRP)" },
  ] },
  { key: "orientation", prompt: "Orientation of the repair face?", options: [
    { value: "horizontal", label: "Horizontal", hint: "Slab top" },
    { value: "vertical", label: "Vertical", hint: "Wall / column / beam side" },
    { value: "overhead", label: "Overhead (soffit)", hint: "Underside of slab or beam" },
  ] },
  { key: "new_rebar", prompt: "Is new reinforcement / starter bars to be anchored in?", options: [
    { value: "yes", label: "Yes", hint: "Post-installed bars / dowels needed" },
    { value: "no", label: "No", hint: "Existing reinforcement retained" },
  ] },
];

function neededStages(d: Demand): string[] {
  // Surface preparation & rebar cleaning is a pre-repair site activity, not a
  // specifiable product stage — excluded from the assembled system output.
  const s = new Set<string>(["rebar-primer", "repair-mortar"]);
  const chlorideish = d.corrosion_cause === "chloride" || d.exposure === "coastal_high_chloride";
  if (chlorideish || d.repair_extent === "large_area") s.add("corrosion-inhibitor");
  if (chlorideish && (d.repair_extent === "large_area" || d.section_loss === "significant")) s.add("cathodic-protection");
  if (d.new_rebar === "yes" || d.section_loss === "significant") s.add("anchoring");
  if (d.section_loss === "significant") s.add("reinforcement-replacement");
  if (d.structural_capacity === "deficient") { s.add("strengthening"); s.add("strengthening-resin"); }
  return STAGE_ORDER.filter((x) => s.has(x));
}

function resolveDemandForGate(gateName: string, d: Demand): string | null {
  const chlorideish = d.corrosion_cause === "chloride" || d.exposure === "coastal_high_chloride";
  switch (gateName) {
    case "application_target": return "bare_rebar";
    case "environment": return chlorideish ? "chloride_coastal_marine" : "carbonation";
    case "defect_type": return "corrosion_spalling";
    case "structural_demand": return "structural";
    case "exposure": return d.exposure;
    case "element_orientation": return d.orientation;
    case "substrate_condition": return "exposed_rebar";
    case "corrosion_cause": return d.corrosion_cause === "unknown" ? "carbonation" : d.corrosion_cause;
    case "repair_extent": return d.repair_extent;
    case "function": return "corrosion_management"; // MCI: avoids the structural=not_suitable exclusion in its own stage
    case "chloride_level": return chlorideish ? "high" : "low";
    case "area": return d.repair_extent === "large_area" ? "large_area" : "patch_perimeter";
    default: return null; // every other gate is descriptive (no not_suitable/requires_alternative token) → untested/pass
  }
}

function productHardFails(gates: Record<string, string>, d: Demand): { gate: string; value: string; reason: string }[] {
  const fails: { gate: string; value: string; reason: string }[] = [];
  // chloride/marine repair → exclude a primer rated only to carbonation
  const env = gates["environment_max"];
  if (env && (d.corrosion_cause === "chloride" || d.exposure === "coastal_high_chloride") && env === "carbonation") {
    fails.push({ gate: "environment_max", value: env, reason: "chloride/marine exposure — product rated to carbonation only" });
  }
  return fails;
}

const rcConfig: SectionConfig = {
  id: "reinforcement-corrosion",
  categories: CATEGORIES,
  stageOrder: STAGE_ORDER,
  stageLabels: STAGE_LABELS,
  neededStages,
  resolveDemandForGate,
  productHardFails,
};

export function runSelectorRC(d: Demand) {
  return runSelectorCore(rcConfig, d);
}
