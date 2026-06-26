// ─────────────────────────────────────────────────────────────────────────────
// System Selector — Balcony / podium / roof / planter waterproofing engine
//
// Builds the FULL waterproofing system, bottom-to-top, linking every product
// family on the balcony-waterproofing-failure page to the position where it sits:
//
//   deck → prep & primer → structural upstand (hobs) → [warm roof: VCL → insulation]
//   → [falls: screed] → WATERPROOFING MEMBRANE SYSTEM (full multi-layer; over
//   insulation the base course is a SELF-ADHESIVE thermal-base sheet — never torch
//   onto insulation — with a torch-on cap over it) → membrane detailing (fabric /
//   collars / flashing / termination) → drainage → movement joints → protection &
//   overburden → finish (tile / pedestals) → flood-test QA.
//
// Membrane stages are ordered TESTED-FIRST with a "Not tested" badge on any product
// without documented AU certification. Card lists come live from the product
// library (no invention). Empty categories are linked but show no carousel.
// ─────────────────────────────────────────────────────────────────────────────

import type {
  Question, Demand, SelectorOutput, SelectorCategory, ProductResult, StageResult, Advisory, AiStage1,
} from "./selector-core";
import type { RefCard, RefBadge } from "../../_components/ProductSpecCardV2";

import { PRIMER_CARDS } from "../../balcony-waterproofing-failure/primers-bonding-agents/primersData";
import { TOOLS_CARDS } from "../../balcony-waterproofing-failure/abrasives-blades-tools/toolsData";
import { HOBS_CARDS } from "../../balcony-waterproofing-failure/hobs-upstands/hobsData";
import { TERMINATION_BAR_CARDS } from "../../balcony-waterproofing-failure/membrane-termination-bars-accessories/terminationBarData";
import { VCL_CARDS } from "../../balcony-waterproofing-failure/vapour-control-layers-warm-roof/vclData";
import { TAPERED_INSULATION_CARDS } from "../../balcony-waterproofing-failure/tapered-insulation-board-systems/taperedInsulationData";
import { SCREED_PM_CARDS } from "../../balcony-waterproofing-failure/screed-systems-polymer-modified/screedPMData";
import { SCREED_SL_CARDS } from "../../balcony-waterproofing-failure/screed-systems-self-levelling/screedSLData";
import { PU_MEMBRANE_CARDS } from "../../balcony-waterproofing-failure/liquid-applied-membranes-polyurethane/puMembranesData";
import { ACRYLIC_MEMBRANE_CARDS } from "../../balcony-waterproofing-failure/liquid-applied-membranes-acrylic/acrylicMembranesData";
import { CEMENTITIOUS_FLEX_CARDS } from "../../balcony-waterproofing-failure/cementitious-flexible-membranes/cementitiousMembranesData";
import { COLD_SHEET_CARDS } from "../../balcony-waterproofing-failure/sheet-membranes-cold-applied/coldSheetMembranesData";
import { TORCH_ON_CARDS } from "../../balcony-waterproofing-failure/sheet-membranes-torch-on/torchOnMembranesData";
import { HDPE_MEMBRANE_CARDS, SINGLE_PLY_CARDS } from "../../balcony-waterproofing-failure/hdpe-sheet-membrane-systems/pvcSheetCards";
import { TPO_CARDS } from "../../balcony-waterproofing-failure/tpo-fpo-sheet-membranes-exposed/tpoMembranesData";
import { HOT_MELT_CARDS } from "../../balcony-waterproofing-failure/hot-melt-rubberised-asphalt-systems/hotMeltData";
import { ROOT_RESISTANT_CARDS } from "../../balcony-waterproofing-failure/root-resistant-membrane-systems/rootResistantData";
import { REINFORCING_FABRIC_CARDS } from "../../balcony-waterproofing-failure/reinforcing-fabric-mesh/reinforcingFabricData";
import { PENETRATION_COLLAR_CARDS } from "../../balcony-waterproofing-failure/penetration-collars/penetrationCollarData";
import { FLASHING_CARDS } from "../../balcony-waterproofing-failure/flashing-compound-systems/flashingData";
import { PUDDLE_FLANGE_CARDS } from "../../balcony-waterproofing-failure/drainage-puddle-flanges-floor-wastes/puddleFlangeData";
import { LINEAR_DRAIN_CARDS } from "../../balcony-waterproofing-failure/drainage-linear-grates-channel-drains/linearDrainData";
import { GUTTER_LINING_CARDS } from "../../balcony-waterproofing-failure/gutter-lining-systems/gutterLiningData";
import { BACKER_ROD_CARDS } from "../../balcony-waterproofing-failure/backer-rod-bond-breaker-tape/backerRodData";
import { EXPANSION_JOINT_CARDS } from "../../balcony-waterproofing-failure/expansion-joint-cover-systems-trafficable/expansionJointData";
import { PROTECTION_BOARD_CARDS } from "../../balcony-waterproofing-failure/protection-boards/protectionBoardData";
import { TILE_ADHESIVE_CARDS } from "../../balcony-waterproofing-failure/tile-adhesive-systems/tileAdhesiveData";
import { TILE_SEALANT_CARDS } from "../../balcony-waterproofing-failure/tile-sealants-silicone-sanitary/tileSealantsData";
import { PEDESTAL_CARDS } from "../../balcony-waterproofing-failure/pedestal-systems-adjustable-height/pedestalData";
import { FLOOD_TEST_CARDS } from "../../balcony-waterproofing-failure/flood-test-equipment/floodTestData";
import { PODIUM_OUTLET_CARDS } from "../../balcony-waterproofing-failure/drainage-podium-outlets-scuppers/podiumOutletData";
import { DRAINAGE_CELL_CARDS } from "../../balcony-waterproofing-failure/drainage-cell-systems/drainageCellData";
import { FILTER_FABRIC_CARDS } from "../../balcony-waterproofing-failure/filter-fabric-systems/filterFabricData";
import { BALLAST_CARDS } from "../../balcony-waterproofing-failure/ballast-systems/ballastData";

export const BWP_QUESTIONS: Question[] = [
  {
    key: "element",
    prompt: "Where is the waterproofing failing?",
    help: "Pick the element being remediated — it drives the membrane type and detailing.",
    options: [
      { value: "balcony", label: "Balcony / terrace", pillLabel: "Balcony / terrace", hint: "Occupied space below — tiled or trafficable balcony or terrace" },
      { value: "podium", label: "Podium deck", pillLabel: "Podium", hint: "Deck over occupied space or parking — often paved, landscaped or trafficked" },
      { value: "roof", label: "Flat / low-slope roof", pillLabel: "Roof", hint: "Concrete roof deck — exposed, insulated (warm roof) or with overburden" },
      { value: "planter", label: "Planter box / green roof", pillLabel: "Planter / green roof", hint: "Soil and planting against the membrane — root resistance required" },
    ],
  },
  {
    key: "finish",
    prompt: "What is the finish over the membrane?",
    help: "What sits on top of the waterproofing decides both the membrane and the finish stage.",
    options: [
      { value: "tiled", label: "Tiled (under-tile membrane)", pillLabel: "Tiled", hint: "Membrane below a tile bed — bonded under-tile system" },
      { value: "exposed", label: "Exposed / trafficable membrane", pillLabel: "Exposed / trafficable", hint: "The membrane (or its coating) is the wearing surface" },
      { value: "covered", label: "Pavers / pedestals / ballast (covered)", pillLabel: "Covered overburden", hint: "Raised or ballasted floor over a protected membrane" },
      { value: "landscaped", label: "Soil / planting (landscaped)", pillLabel: "Landscaped", hint: "Growing medium over the membrane — root resistance required" },
    ],
  },
  {
    key: "traffic",
    prompt: "What is the traffic / loading on the deck?",
    help: "Loading drives the membrane duty and the protection / overburden — a carpark podium is very different to a residential balcony.",
    options: [
      { value: "pedestrian", label: "Pedestrian — foot traffic (incl. retail / public)", pillLabel: "Pedestrian", hint: "Balconies, terraces, residential & public-access decks" },
      { value: "vehicular", label: "Vehicular — carpark / plant access", pillLabel: "Vehicular", hint: "Carpark podiums, plant access — heavy-duty system + structural design" },
    ],
  },
  {
    key: "buildup",
    prompt: "How are the falls and build-up handled?",
    help: "Falls to the outlets are essential — ponding is a leading cause of failure. Choose how falls (and any insulation) are achieved.",
    options: [
      { value: "to-falls", label: "Already falls to drain — no levelling", pillLabel: "Falls OK — drainage only", hint: "Deck already drains to the outlets; detail the drainage only" },
      { value: "sand-cement", label: "Build falls — conventional sand & cement screed", pillLabel: "Sand/cement screed to falls", hint: "Site-batched screed laid to falls (≥ 1:100)" },
      { value: "polymer-screed", label: "Build falls — polymer-modified screed", pillLabel: "Polymer screed to falls", hint: "Bonded polymer-modified screed to falls" },
      { value: "tapered-insulation", label: "Tapered insulation to create falls (warm roof)", pillLabel: "Tapered insulation", hint: "Insulate and grade to falls in one layer — warm-roof build-up" },
      { value: "flat-insulation", label: "Flat insulation — deck already to falls (warm roof)", pillLabel: "Flat insulation", hint: "Insulate; falls already built into the structural deck" },
    ],
  },
  {
    key: "drainage_type",
    prompt: "How does this deck drain?",
    help: "Drainage type drives the outlet product and the QA method — and the drain must be compatible with the chosen membrane. On a remedial job, confirm what is actually there.",
    options: [
      { value: "floor-waste", label: "Floor waste / puddle flange (through-slab)", pillLabel: "Floor waste", hint: "Through-deck outlet bonded / clamped to the membrane" },
      { value: "linear", label: "Linear channel drain to a floor waste", pillLabel: "Linear drain", hint: "Channel discharging to a through-deck waste" },
      { value: "scupper", label: "Scupper / overflow through parapet or fascia", pillLabel: "Scupper / overflow", hint: "Edge discharge — no through-slab waste" },
      { value: "rainwater-head", label: "Rainwater head / gutter at the edge", pillLabel: "Rainwater head", hint: "Edge collection to a downpipe" },
      { value: "unknown", label: "Unknown — needs investigation", pillLabel: "Drainage unknown", hint: "Existing outlet type / condition not yet confirmed" },
      { value: "none", label: "No outlet yet — hydraulic design incomplete", pillLabel: "No outlet yet", hint: "Drainage design not finalised" },
    ],
  },
  {
    // Conditional — only when an existing outlet is present (not 'none').
    key: "drainage_condition",
    prompt: "What is the condition of the existing drainage outlet?",
    help: "On a remedial deck the existing outlet is a common cause of the original failure — confirm it before specifying.",
    options: [
      { value: "sound", label: "Sound & compatible — retain and connect", pillLabel: "Outlet sound", hint: "Connect the new membrane to it" },
      { value: "damaged", label: "Corroded / damaged — replace first", pillLabel: "Outlet damaged", hint: "Replace before waterproofing" },
      { value: "raise", label: "Height needs raising / replacing", pillLabel: "Raise outlet", hint: "Adjust so the new membrane overlaps correctly" },
      { value: "not-inspected", label: "Not yet inspected — investigation required", pillLabel: "Outlet not inspected", hint: "Hold point before specifying" },
    ],
  },
  {
    key: "deck",
    prompt: "What is the structural deck?",
    help: "The base of the build-up — it drives the prep / primer and whether an existing membrane is stripped or (in a warm-roof build-up) retained as the vapour layer.",
    options: [
      { value: "concrete", label: "Bare / sound concrete deck", pillLabel: "Concrete deck", hint: "Prepared, sound concrete structural deck" },
      { value: "existing", label: "Existing roof / deck membrane in place", pillLabel: "Existing membrane on deck", hint: "Old membrane on the deck — strip back, or (warm roof) retain as a vapour layer; confirm" },
    ],
  },
  {
    // Conditional — only shown when deck = existing (see isSkipped in the client).
    key: "existing_membrane",
    prompt: "What type is the existing membrane?",
    help: "The existing type decides bond, primer and whether the old membrane must be stripped.",
    options: [
      { value: "torch-on", label: "Torch-on bitumen sheet", pillLabel: "Existing: torch-on", hint: "SBS / APP bitumen sheet" },
      { value: "cold-sheet", label: "Cold-applied self-adhesive sheet", pillLabel: "Existing: cold sheet", hint: "Self-adhesive / butyl sheet" },
      { value: "liquid", label: "Liquid-applied (acrylic / PU)", pillLabel: "Existing: liquid", hint: "Acrylic or polyurethane coating" },
      { value: "unknown", label: "Unknown — confirm on site", pillLabel: "Existing: unknown", hint: "Test-patch and identify before specifying" },
    ],
  },
  {
    // Conditional — only when overlaying an existing membrane in a warm-roof build-up.
    key: "strip_retain",
    prompt: "Will the existing membrane be stripped or retained?",
    help: "On a warm-roof overlay a sound, adhered existing membrane can sometimes be retained as the vapour control layer instead of stripping to bare concrete.",
    options: [
      { value: "strip", label: "Strip & remove — prepare bare concrete", pillLabel: "Strip existing", hint: "Remove to the deck; new VCL + insulation over bare concrete" },
      { value: "retain", label: "Retain as the vapour control layer", pillLabel: "Retain as VCL", hint: "If sound & adhered — assess, then insulate over it (no separate VCL)" },
    ],
  },
  {
    key: "coastal",
    prompt: "Is the site in a coastal / marine exposure zone?",
    help: "Within ~1 km of salt water the metal components and detailing change (corrosion / chlorides).",
    options: [
      { value: "no", label: "No — standard / inland exposure", pillLabel: "Inland", hint: "Standard suburban / inland exposure" },
      { value: "yes", label: "Yes — coastal / marine", pillLabel: "Coastal", hint: "Within ~1 km of salt water — Grade 316 stainless, chloride detailing" },
    ],
  },
  {
    key: "fire",
    prompt: "Is there occupied space or a carpark directly below?",
    help: "Decks over occupied space / carparks in Class 2 buildings can carry a fire-resistance level (FRL) requirement.",
    options: [
      { value: "no", label: "No — on ground / non-critical below", pillLabel: "No FRL trigger", hint: "On ground or over non-occupied space" },
      { value: "yes", label: "Yes — occupied space / carpark below", pillLabel: "Occupied below", hint: "Confirm the FRL of the deck / system with the fire engineer" },
    ],
  },
  {
    key: "hob_required",
    prompt: "Is a new structural hob / upstand required?",
    help: "A new hob is only needed where one is missing, structurally failed, too low, or being demolished and rebuilt. If a sound existing hob is retained, choose No — the membrane simply dresses up to it.",
    options: [
      { value: "yes", label: "Yes — a new hob / upstand must be built", pillLabel: "New hob required", hint: "Missing, failed, too low, or being rebuilt" },
      { value: "no", label: "No — existing hob retained, or none required", pillLabel: "Existing hob retained", hint: "Dress the membrane up to the existing upstand height" },
    ],
  },
];

// ── Helpers (mirror the magnesite engine) ────────────────────────────────────
const EMPTY_STAGE1: AiStage1 = { headers: [], rows: [], json: { category: "", stage1_gates: {} } };

const wpCat = (slug: string, displayName: string): SelectorCategory => ({
  slug, displayName, repairStage: slug,
  href: `/repair-systems/balcony-waterproofing-failure/${slug}`,
  stage1: EMPTY_STAGE1, stage2: {},
});

const wpProd = (name: string): ProductResult => ({
  name, id: name, selectable: true, dataStatus: "confirmed", score: 0, matchedGates: [], failedGates: [], source: "AU manufacturer TDS",
});

const leadName = (cards: RefCard[]) => (cards[0] ? `${cards[0].brand} — ${cards[0].rangeName}` : "Confirm product with manufacturer TDS");

// Generic stage with cards (clickable category + product carousel).
const mkStage = (key: string, label: string, slug: string, name: string, cards: RefCard[], cardNote: string): StageResult => ({
  stage: key, label,
  passingCategories: [], alternativeCategories: [],
  recommended: { category: wpCat(slug, name), product: wpProd(cards.length ? leadName(cards) : "See reference"), why: [] },
  options: [], cardNote, cards,
});
// A linkable sibling option (category link + product label).
const linkOpt = (slug: string, name: string, productName: string) => ({ category: wpCat(slug, name), product: wpProd(productName) });

// ── Tested-first ordering + "Not tested" badge (membrane stages only) ────────
const isEmptyVal = (v?: string) => {
  const s = (v ?? "").trim();
  return s === "" || s === "—" || s === "-" || /^n\/a\b/i.test(s) || /^confirm\b/i.test(s) || /^tbc\b/i.test(s);
};
// "Tested" = the "Class 2 / NCC tested" key-property value carries real documented
// evidence (a named certifier / standard), not merely a non-empty cell — or a
// certification badge. The value, not the column label, must show the evidence.
const CERT_EVIDENCE = /csiro|branz|codemark|nata|fll|as\s*4654|as\s*4858|as\s*3740|assess|certif|tested by/i;
const isTested = (c: RefCard): boolean => {
  const f = c.appInfo.find((a) => /class\s*2|ncc tested/i.test(a.label));
  if (f && !isEmptyVal(f.value) && CERT_EVIDENCE.test(f.value)) return true;
  return (c.badges || []).some((b) => /\bclass\s*2\b|certified|csiro|branz|codemark|nata/i.test(b.label));
};
const NOT_TESTED_BADGE: RefBadge = { label: "Not tested — confirm certification", tone: "amber" };
function prepMembrane(cards: RefCard[]): RefCard[] {
  const tested = cards.filter(isTested);
  // When certified options exist, drop the uncertified ones from the carousel entirely
  // (they are not an approved substitute). Only if NONE are certified do we keep them, badged.
  if (tested.length) return tested;
  return cards.map((c) => ({ ...c, badges: [...(c.badges || []), NOT_TESTED_BADGE] }));
}
const anyTested = (cards: RefCard[]) => cards.some(isTested);

// Membrane stage = tested-first cards + a certification note when none are tested.
const memStage = (key: string, label: string, slug: string, name: string, cards: RefCard[], note: string): StageResult => {
  const prepared = prepMembrane(cards);
  const s = mkStage(key, label, slug, name, prepared, note + (anyTested(cards) ? "" : " Note: no product in this category currently shows documented AU test certification — confirm certification before specifying."));
  s.recommended!.product = wpProd(leadName(prepared));
  return s;
};

type Alt = { slug: string; name: string; cards: RefCard[] };
const altOption = (a: Alt) => linkOpt(a.slug, a.name, leadName(prepMembrane(a.cards)));

// ── Context gating — keep only products that belong in the chosen path ────────
const cardText = (c: RefCard) =>
  `${c.rangeName} ${c.shortType} ${(c.filterTags || []).join(" ")} ${(c.badges || []).map((b) => b.label).join(" ")} ${c.appInfo.map((a) => a.value).join(" ")} ${c.advanced?.description || ""}`.toLowerCase();
// Drop below-grade tanking products from every above-ground path (e.g. Tremco Paraseal LG).
const aboveGrade = (cards: RefCard[]) => cards.filter((c) => !/below-grade|paraseal|bentonite|tanking|negative-side/.test(cardText(c)));
// Drop under-tile-only membranes from EXPOSED/trafficable paths (keep UV-stable / wear-rated ones).
const isUndertileOnly = (c: RefCard) => {
  const head = `${c.rangeName} ${c.shortType}`.toLowerCase();
  const undertile = /under.?tile|undertile/.test(head);
  const exposedRated = /(exposed|uv[- ]?stable|trafficable|deck.?coat|as 4654\.1 \(exposed\))/.test(cardText(c));
  return undertile && !exposedRated;
};
const exposedCapable = (cards: RefCard[]) => cards.filter((c) => !isUndertileOnly(c));
// Drop roof-specific hobs (e.g. precast lintel hob) from balcony / podium / planter paths.
const groundHobs = (cards: RefCard[]) => cards.filter((c) => !(c.filterTags || []).some((t) => /roof-specific/i.test(t)));
// Demote proprietary membrane-specific drains (Schlüter KERDI-DRAIN) to the end of the list.
const demoteProprietary = (cards: RefCard[]) => [...cards].sort((a, b) => Number(/kerdi/i.test(a.rangeName)) - Number(/kerdi/i.test(b.rangeName)));
// Drop non-waterproofing primers and (unless a torch system) torch/bitumen primers.
const gatePrimers = (cards: RefCard[], torchOk: boolean) => cards.filter((c) => {
  const t = cardText(c);
  if (/westox|wesprime|colourcote|satintex|glosstex|wesdex/.test(t)) return false; // decorative coating primers
  if (!torchOk && /torch|shelterbit|wpm 240/.test(t)) return false; // torch-membrane primer outside a torch path
  return true;
});
// Warm roof: the membrane sits on the insulation; the primer prepares the DECK for the VCL only.
// Drop tile / porous-surface primers that have no role on a deck-to-VCL bond.
const warmRoofPrimers = (cards: RefCard[]) => cards.filter((c) => !/secure prime|tile primer|wpm 265|porous/.test(cardText(c)));
// A warm-roof VCL must be vapour-RESISTANT — drop breathable / vapour-open underlays (e.g. Kingspan Nilvent).
const vclOnly = (cards: RefCard[]) => cards.filter((c) => !/breathable|vapour.?open|vapour.?permeable|nilvent|non-tenting/.test(cardText(c)));
// XPS is a flat board (no tapered profile) — drop it from the TAPERED insulation stage.
const taperedOnly = (cards: RefCard[]) => cards.filter((c) => !/\bxps\b|extruded polystyrene/.test(cardText(c)));
// Tile-insert drains only suit a tiled finish — gate them out of exposed / covered / landscaped paths.
const drainsForFinish = (cards: RefCard[], finish: string) => (finish === "tiled" ? cards : cards.filter((c) => !/tile.?insert/.test(cardText(c))));
// Flag the proprietary KERDI-DRAIN as membrane-specific wherever it appears.
const badgeKerdi = (cards: RefCard[]) => cards.map((c) => (/kerdi/i.test(c.rangeName) ? { ...c, badges: [...(c.badges || []), { label: "KERDI membrane only", tone: "amber" as const }] } : c));
// Tiled paths: drop exposed-only deck-coating products (e.g. Tremco Vulkem 350R) from the UNDER-TILE membrane.
const undertileCapable = (cards: RefCard[]) => cards.filter((c) => {
  const head = `${c.rangeName} ${c.shortType}`.toLowerCase();
  const exposedOnly = /deck.?coat|vulkem 350/.test(cardText(c));
  const undertile = /under.?tile|undertile/.test(head);
  return !(exposedOnly && !undertile);
});
// FLAT insulation stage: drop tapered-profile products (they belong in the tapered stage).
const flatOnly = (cards: RefCard[]) => cards.filter((c) => !/tapered|thermataper/.test(cardText(c)));
// Warm-roof torch system: split the torch-on family into a self-adhesive BASE course and a torch-on CAP.
const baseSheets = (cards: RefCard[]) => { const f = cards.filter((c) => /base|underlay|self.?adhesive|armourbase|flam 180/.test(cardText(c))); return f.length ? f : cards; };
const capSheets = (cards: RefCard[]) => { const f = cards.filter((c) => /\bcap\b|mineral|armour cap|250|polybest|np250/.test(cardText(c))); return f.length ? f : cards; };
// Coastal: flag metal components to confirm Grade 316 stainless.
const coastalFlag = (cards: RefCard[], coastal?: string) => (coastal !== "yes" ? cards : cards.map((c) => (/stainless|galvanis|g275|\bsteel\b|aluminium|\bmetal\b/.test(cardText(c)) ? { ...c, badges: [...(c.badges || []), { label: "Coastal — confirm Grade 316", tone: "amber" as const }] } : c)));
// Sheet-membrane paths: surface heat-weldable / flanged / EPDM collars first; liquid-system collars last.
const sheetCollars = (cards: RefCard[]) => [...cards].sort((a, b) => Number(/stainless|epdm|dektite|weld|boot|flang/.test(cardText(b))) - Number(/stainless|epdm|dektite|weld|boot|flang/.test(cardText(a))));
// Retain-as-VCL: only compatibility / over-membrane primers (no bare-concrete primers).
const retainPrimers = (cards: RefCard[]) => cards.filter((c) => /bitumen|solvent|torch|self.?adhesive|compatibil|colphene|primer.?3n|over.*membrane/.test(cardText(c)));
// Drain-to-membrane compatibility: for bitumen / sheet systems, surface metal / weldable / clamping
// drains and demote bonded PVC puddle flanges (which suit liquid systems).
const drainGate = (cards: RefCard[], membraneType: string) => {
  if (membraneType === "liquid") return cards;
  const score = (c: RefCard) => { const t = cardText(c); if (/stainless|alwitra|turbo|aluminium|clamp|weld|flang/.test(t)) return 1; if (/\bpvc\b|hydraloc|puddle flange/.test(t)) return -1; return 0; };
  return [...cards].sort((a, b) => score(b) - score(a));
};
// Exposed-membrane joints: drop tile sanitary silicones (keep PU / MS sealants).
const nonSanitary = (cards: RefCard[]) => { const f = cards.filter((c) => !/sanitary|mapesil|\bardex se\b/.test(cardText(c))); return f.length ? f : cards; };
// Protection boards relevant to the path: DITRA only for tiled, root-barrier only for landscaped.
const protectionFor = (cards: RefCard[], finish: string) => cards.filter((c) => {
  const t = cardText(c);
  if (/ditra|uncoupling/.test(t) && finish !== "tiled") return false;
  if (/root.?barrier|root.?resist/.test(t) && finish !== "landscaped") return false;
  return true;
});

// Membrane systems (alternatives reused across branches). Sheet systems are gated to above-ground.
const M = {
  PU: { slug: "liquid-applied-membranes-polyurethane", name: "Liquid-Applied PU & Hybrid Membranes", cards: PU_MEMBRANE_CARDS } as Alt,
  ACR: { slug: "liquid-applied-membranes-acrylic", name: "Liquid-Applied Acrylic Membranes", cards: ACRYLIC_MEMBRANE_CARDS } as Alt,
  CEM: { slug: "cementitious-flexible-membranes", name: "Cementitious Flexible Membranes", cards: CEMENTITIOUS_FLEX_CARDS } as Alt,
  COLD: { slug: "sheet-membranes-cold-applied", name: "Cold-Applied / Self-Adhesive Sheet (e.g. WPM 1000)", cards: COLD_SHEET_CARDS } as Alt,
  TORCH: { slug: "sheet-membranes-torch-on", name: "Torch-On Sheet Membranes", cards: TORCH_ON_CARDS } as Alt,
  HDPE: { slug: "hdpe-sheet-membrane-systems", name: "HDPE / Single-Ply Sheet Membranes", cards: aboveGrade(HDPE_MEMBRANE_CARDS) } as Alt,
  SINGLE: { slug: "single-ply-membrane-systems-ballasted", name: "Single-Ply Ballasted Membranes", cards: aboveGrade(SINGLE_PLY_CARDS) } as Alt,
  TPO: { slug: "tpo-fpo-sheet-membranes-exposed", name: "TPO/FPO Exposed Sheet Membranes", cards: TPO_CARDS } as Alt,
  HOT: { slug: "hot-melt-rubberised-asphalt-systems", name: "Hot-Melt Rubberised Asphalt", cards: HOT_MELT_CARDS } as Alt,
  ROOT: { slug: "root-resistant-membrane-systems", name: "Root-Resistant Membrane Systems", cards: ROOT_RESISTANT_CARDS } as Alt,
};

// Returns the membrane layer-stage(s), the alternative systems, whether the system
// is a liquid membrane (→ reinforcing fabric stage), and any contradiction advisory.
function membraneSystem(d: Demand, warmRoof: boolean): { layers: StageResult[]; alts: Alt[]; liquid: boolean; advisory?: Advisory } {
  // Vehicular exposed deck → heavy-duty hot-melt / torch under a structural wearing course (NOT thin liquid / single-ply).
  if (d.finish === "exposed" && d.traffic === "vehicular") {
    return {
      layers: [memStage("membrane", "Waterproofing membrane — heavy-duty (vehicular)", M.HOT.slug, M.HOT.name, M.HOT.cards,
        warmRoof
          ? "Vehicular over a warm roof is a specialist build-up: a heavy-duty hot-melt or reinforced torch-on system under high-compressive protection and a structural wearing course, all designed by the structural engineer. Single-ply sheet is only suitable beneath a structural topping with engineering sign-off."
          : "Vehicular / plant traffic needs a heavy-duty HOT-MELT rubberised asphalt or reinforced 2-ply torch-on system under a structural wearing course (reinforced concrete / asphalt), designed by the structural engineer. Thin liquid or single-ply systems are NOT trafficable wearing surfaces.")],
      alts: [M.TORCH, M.HDPE], liquid: false,
    };
  }
  // Planter / landscaped → root-resistant (continuous; loose-laid or adhered over insulation in a warm build-up).
  if (d.element === "planter" || d.finish === "landscaped") {
    return {
      layers: [memStage("membrane", "Waterproofing membrane — root-resistant", M.ROOT.slug, M.ROOT.name, M.ROOT.cards,
        `Planters / green roofs / landscaped podiums need a root-resistant membrane continuous through laps, upstands and penetrations${warmRoof ? ", loose-laid or adhered over the insulation" : ""}. The membrane is buried and effectively irreplaceable — specify one with documented FLL root-resistance and current AU test evidence (NATA / CSIRO); uncertified products carry a "Not tested" badge.`)],
      alts: [M.HDPE, M.TORCH], liquid: false,
    };
  }
  // Exposed roof → torch-on cap-sheet SYSTEM.
  if (d.element === "roof" && d.finish === "exposed") {
    if (warmRoof) {
      return {
        layers: [
          memStage("membrane-base", "Membrane base sheet — self-adhesive SBS (to insulation)", M.TORCH.slug, "Torch-On System — self-adhesive SBS base sheet", baseSheets(M.TORCH.cards),
            "Warm roof: the first course over the insulation must be a SELF-ADHESIVE SBS BITUMEN base / underlay sheet (torch-compatible, from the torch-on system family — NOT a cold butyl sheet such as WPM 1000), bonded to the boards. ⚠️ Do NOT torch directly onto PIR / XPS insulation — the facing melts or ignites. Confirm the base-sheet-to-insulation method with the manufacturer."),
          memStage("membrane-cap", "Membrane cap sheet — torch-on", M.TORCH.slug, M.TORCH.name, capSheets(M.TORCH.cards),
            "Torch-on SBS/APP cap sheet fully bonded OVER the self-adhesive SBS base sheet (two-layer system), with a mineral or reflective finish. The torch only ever sees the base sheet, never the insulation."),
        ],
        alts: [M.HDPE, M.TPO, M.SINGLE], liquid: false,
      };
    }
    return {
      layers: [memStage("membrane", "Waterproofing membrane — torch-on (2-layer base + cap)", M.TORCH.slug, M.TORCH.name, M.TORCH.cards,
        "A full two-layer torch-on system: an underlay / base sheet torched to the primed deck, then an SBS/APP cap sheet with a mineral or reflective finish. Class 2 / roof — specify only a membrane with current Australian test certification.")],
      alts: [M.HDPE, M.TPO, M.HOT, M.PU], liquid: false,
    };
  }
  // Covered / ballasted over podium or roof → protected sheet membrane.
  if (d.finish === "covered" && (d.element === "podium" || d.element === "roof")) {
    // Over insulation (warm roof) suppress flame/hot-melt alternatives — they cannot be used over insulation boards.
    const coveredAlts = warmRoof ? [M.SINGLE, M.TPO] : [M.SINGLE, M.TPO, M.TORCH, M.HOT];
    return {
      layers: [memStage("membrane", "Waterproofing membrane — protected sheet", M.HDPE.slug, M.HDPE.name, M.HDPE.cards,
        `Under a protected (paved / pedestal / ballasted) build-up, a loose-laid or adhered sheet membrane is the durable choice${warmRoof ? ", adhered or loose-laid over the insulation (no torch / hot-melt onto boards)" : ""}. Class 2 / roof — specify only a membrane with current Australian test certification.`)],
      alts: coveredAlts, liquid: false,
    };
  }
  // Tiled → bonded under-tile liquid membrane (PU lead). Over a warm roof, never on insulation — sheet over a cover board.
  if (d.finish === "tiled") {
    if (warmRoof) {
      return {
        layers: [memStage("membrane", "Waterproofing membrane — sheet over cover board", M.HDPE.slug, M.HDPE.name, M.HDPE.cards,
          "Tiling over a warm roof: do NOT apply membrane directly onto insulation. Lay a rigid cover board over the insulation, then a sheet membrane, then a bonded screed before tiling. Confirm the build-up with the manufacturer and engineer.")],
        alts: [M.SINGLE, M.TPO], liquid: false,
        advisory: { severity: "critical", title: "Tiled finish over a warm roof", body: "A tiled finish directly over insulation is not standard. Use a rigid cover board over the insulation, then a sheet membrane, then a bonded screed, then tiles. Liquid membranes are not applied directly onto insulation boards — the stages below reflect the cover-board build-up." },
      };
    }
    return {
      layers: [memStage("membrane", "Waterproofing membrane — under-tile (reinforced)", M.PU.slug, "Liquid-Applied PU & Hybrid Membranes (under-tile)", undertileCapable(M.PU.cards),
        "Bonded under-tile membrane applied as a full reinforced system — primer, two coats with reinforcing fabric at internal corners, junctions and penetrations — dressed up the hobs and over the upstands before tiling. Class 2 (NCC) for balconies — specify only a membrane with current Australian test certification.")],
      alts: [M.COLD, M.CEM, M.ACR], liquid: true,
    };
  }
  // Exposed / trafficable balcony or podium over a warm roof → sheet over insulation, then a wearing course.
  if (warmRoof) {
    return {
      layers: [memStage("membrane", "Waterproofing membrane — sheet over insulation", M.HDPE.slug, M.HDPE.name, M.HDPE.cards,
        "Exposed over a warm roof: lay a sheet membrane adhered / loose-laid over the insulation (no liquid directly onto boards, no torch onto boards), then a separate wearing course / topping for trafficability. Confirm the build-up with the manufacturer and engineer.")],
      alts: [M.SINGLE, M.TPO], liquid: false,
      advisory: { severity: "warning", title: "Exposed finish over a warm roof", body: "Liquid membranes are not applied directly onto insulation, and the sheet membrane over insulation is not itself a trafficable wearing surface — add a separate wearing course / topping. Confirm the build-up with the manufacturer and engineer." },
    };
  }
  // Exposed / trafficable balcony or podium → liquid PU wearing membrane (under-tile-only products gated out).
  return {
    layers: [memStage("membrane", "Waterproofing membrane — exposed (reinforced + wear coat)", M.PU.slug, "Liquid-Applied PU & Hybrid Membranes (exposed)", exposedCapable(M.PU.cards),
      "Exposed / trafficable: a UV-stable polyurethane applied as a full system — primer, reinforced base coats (fabric at details) and the manufacturer's wear / top coat. Note: the sheet alternatives below are not trafficable finishes on their own — they need a separate wearing course / topping. Class 2 (NCC) for balconies — specify only a membrane with current Australian test certification.")],
    alts: [M.TORCH, M.COLD], liquid: true,
  };
}

export function runSelectorBWP(d: Demand): SelectorOutput {
  const stages: StageResult[] = [];
  const advisories: Advisory[] = [];
  const warmRoof = d.buildup === "tapered-insulation" || d.buildup === "flat-insulation";
  const screed = d.buildup === "sand-cement" || d.buildup === "polymer-screed";
  const retainVCL = warmRoof && d.deck === "existing" && d.strip_retain === "retain";

  // 1 — SURFACE PREP & PRIMER (always; abrasives/tools linked). Torch primer only on a torch path.
  const torchOk = d.element === "roof" && d.finish === "exposed" && !warmRoof;
  const primerCards = retainVCL
    ? retainPrimers(PRIMER_CARDS)
    : warmRoof
    ? warmRoofPrimers(gatePrimers(PRIMER_CARDS, torchOk))
    : gatePrimers(PRIMER_CARDS, torchOk);
  const primerNote = retainVCL
    ? "Retain-as-VCL: the existing membrane is the substrate AND the vapour control layer — do NOT apply a concrete primer. Test adhesion first (≥ 1 m² test cuts); if it fails, strip back to the deck. Where sound, clean it, seal laps / blisters, and use only a compatibility primer matched to the existing membrane and the insulation fixing method."
    : warmRoof
    ? "Warm-roof build-up: prepare and prime the concrete DECK for the vapour control layer (VCL). The waterproofing membrane is applied OVER the insulation — preparation of the insulation face is per the membrane system TDS only (often no separate primer; self-adhesive base sheets bond to the board facing, mechanically-fixed systems need none). Do NOT apply a concrete primer to the insulation face."
    : screed
    ? "Prepare and prime the CURED SCREED surface (laid to falls in the screed stage) — allow full cure and confirm moisture is within the membrane manufacturer's limit before priming. Use the primer matched to the membrane and to the screed surface (not a bare-concrete primer unless the TDS specifies it)."
    : d.deck === "existing"
    ? "Existing deck membrane: confirm type, soundness and compatibility — strip back to the substrate where required. Grind / captive-blast to profile and prime the bonding surface per the membrane manufacturer's TDS."
    : "Prepare the concrete to the required profile (sound, clean, correct moisture) and prime to the TDS. The primer must be matched to the chosen membrane and to the surface it actually bonds to.";
  const primer = mkStage("primer", retainVCL ? "Existing membrane — compatibility check & prime" : "Surface preparation & primer", "primers-bonding-agents", "Primers & Bonding Agents", primerCards, primerNote);
  primer.options = [linkOpt("abrasives-blades-tools", "Abrasives, Blades & Tools", leadName(TOOLS_CARDS))];
  stages.push(primer);

  // 2 — STRUCTURAL UPSTAND — HOBS (only when a new hob is required; roof-specific hobs gated out of balcony/podium/planter).
  if (d.hob_required !== "no") {
    const hobs = mkStage("hobs", "Structural upstand / hob", "hobs-upstands", "Hobs & Upstands", coastalFlag(d.element === "roof" ? HOBS_CARDS : groundHobs(HOBS_CARDS), d.coastal),
      "A NEW structural upstand: provide the waterproofing upstand at thresholds, perimeters and penetrations over a hob (precast, cast-in, in-situ, masonry or lintel). Upstand height per AS 4654.2 / NCC and the membrane manufacturer; the membrane is dressed up and terminated to it.");
    hobs.options = [linkOpt("membrane-termination-bars-accessories", "Membrane Termination Bars & Accessories", leadName(TERMINATION_BAR_CARDS))];
    stages.push(hobs);
  } else {
    advisories.push({ severity: "warning", title: "Existing hob / upstand retained", body: "No new structural hob is being built — dress the membrane up the existing upstand to the required height (per AS 4654.2 / NCC and the membrane manufacturer) and terminate it with a termination bar. Confirm the existing upstand height and substrate condition are adequate." });
  }

  // 3 — VAPOUR CONTROL LAYER (warm roof only; skipped when the retained existing membrane IS the VCL).
  if (warmRoof && !retainVCL) {
    stages.push(mkStage("vcl", "Vapour control layer (warm roof)", "vapour-control-layers-warm-roof", "Vapour Control Layers (warm roof)", vclOnly(VCL_CARDS),
      "Warm-roof build-up: place a vapour-RESISTANT control layer on the WARM side of the insulation (on the deck, below the boards) with taped, airtight laps. (Breathable / vapour-open underlays are NOT VCLs and are excluded here.) Confirm a dew-point / condensation analysis for the assembly."));
  } else if (retainVCL) {
    advisories.push({ severity: "warning", title: "Existing membrane retained as the VCL", body: "The existing membrane is being retained as the warm-roof vapour control layer, so no separate VCL is added. Confirm it is sound, adhered and continuous, lap-seal any defects, and check the insulation fixing method is compatible with its surface. If adhesion fails on test cuts, strip back and add a new VCL." });
  }

  // 4 — INSULATION (warm roof) OR SCREED (falls).
  if (warmRoof) {
    const tapered = d.buildup === "tapered-insulation";
    stages.push(mkStage("insulation", tapered ? "Tapered insulation to falls" : "Flat insulation board", "tapered-insulation-board-systems", "Tapered & Flat Insulation Boards", tapered ? taperedOnly(TAPERED_INSULATION_CARDS) : flatOnly(TAPERED_INSULATION_CARDS),
      tapered
        ? "Tapered insulation creates the falls (≥ 1:100) AND insulates in one layer over the VCL — the membrane is laid OVER the insulation (self-adhesive base course, see membrane stage). Confirm the board layout / scheme and membrane-to-insulation compatibility."
        : "Flat insulation over the VCL where the deck already provides falls — the membrane is laid OVER the insulation (self-adhesive base course). Confirm membrane-to-insulation compatibility."));
    if (d.buildup === "flat-insulation") {
      advisories.push({ severity: "warning", title: "Confirm the structural falls", body: "Flat insulation does NOT create falls — confirm the structural deck already falls ≥ 1:100 to the outlets with no ponding before proceeding, or switch to tapered insulation (or a screed) to build the falls." });
    }
  } else if (screed) {
    const sandCement = d.buildup === "sand-cement";
    const sc = mkStage("screed", sandCement ? "Screed to falls — sand & cement" : "Screed to falls — polymer-modified", "screed-systems-polymer-modified", "Screed Systems — Polymer-Modified", SCREED_PM_CARDS,
      sandCement
        ? "Conventional site-batched sand : cement screed (≈ 3:1) to falls (≥ 1:100). A bonded polymer-modified screed (cards below) improves bond, strength and water resistance. Confirm falls, bond coat and full cure before waterproofing."
        : "Bonded polymer-modified screed to falls (≥ 1:100 to the outlets). Confirm bond, thickness and cure before waterproofing.");
    sc.options = [linkOpt("screed-systems-self-levelling", "Screed Systems — Self-Levelling", leadName(SCREED_SL_CARDS))];
    stages.push(sc);
    advisories.push({ severity: "warning", title: "Screed curing — hold point", body: "Allow the screed to cure fully before priming and waterproofing (≈ 28 days for sand : cement; per the TDS for polymer-modified) and confirm the moisture is within the membrane manufacturer's limit. Do not prime or membrane a green / wet screed — this is an inspection hold point." });
  } else {
    advisories.push({ severity: "warning", title: "Confirm the falls & drainage", body: "No levelling stage was added because the deck was indicated as already falling to the outlets. Confirm the falls are adequate (≥ 1:100, no back-falls or ponding)." });
  }

  // 5 — WATERPROOFING MEMBRANE SYSTEM (full; tested-first).
  const ms = membraneSystem(d, warmRoof);
  const mSlug = ms.layers[ms.layers.length - 1]?.recommended?.category.slug ?? "";
  const membraneType = mSlug === "sheet-membranes-torch-on" ? "torch"
    : mSlug === "hot-melt-rubberised-asphalt-systems" ? "hot"
    : (mSlug === "hdpe-sheet-membrane-systems" || mSlug === "root-resistant-membrane-systems" || mSlug === "single-ply-membrane-systems-ballasted") ? "pvc-sheet"
    : mSlug === "sheet-membranes-cold-applied" ? "sheet"
    : "liquid";
  ms.layers.forEach((layer, i) => {
    if (i === ms.layers.length - 1) layer.options = ms.alts.map(altOption); // alternatives on the final membrane layer
    stages.push(layer);
  });
  if (ms.advisory) advisories.push(ms.advisory);

  // 6 — MEMBRANE DETAILING — reinforcing fabric (liquid) / collars / flashing / termination.
  if (ms.liquid) {
    const detail = mkStage("detailing", "Membrane detailing — reinforcing & junctions", "reinforcing-fabric-mesh", "Reinforcing Fabric & Mesh", REINFORCING_FABRIC_CARDS,
      "Reinforce internal corners, changes of plane and junctions with the matched fabric / fleece fully embedded between coats; seal pipe penetrations with collars and detail upstands / drains with the system flashing compound. Dry fabric or voids fail.");
    detail.options = [
      linkOpt("penetration-collars", "Penetration Collars", leadName(PENETRATION_COLLAR_CARDS)),
      linkOpt("flashing-compound-systems", "Flashing Compound Systems", leadName(FLASHING_CARDS)),
      linkOpt("membrane-termination-bars-accessories", "Termination Bars & Accessories", leadName(TERMINATION_BAR_CARDS)),
    ];
    stages.push(detail);
  } else {
    const detail = mkStage("detailing", "Membrane detailing — penetrations & junctions", "penetration-collars", "Penetration Collars", sheetCollars(PENETRATION_COLLAR_CARDS),
      "Sheet-membrane system: use heat-weldable / flanged or EPDM (Dektite-type) collars compatible with the sheet — the ARDEX / Mapei liquid-membrane collars shown last are for liquid systems only. Detail upstands / drains with the system flashing and terminate the sheet to the upstand with a termination bar. Weld / bond all laps and details per the system.");
    detail.options = [
      linkOpt("flashing-compound-systems", "Flashing Compound Systems", leadName(FLASHING_CARDS)),
      linkOpt("membrane-termination-bars-accessories", "Termination Bars & Accessories", leadName(TERMINATION_BAR_CARDS)),
    ];
    stages.push(detail);
  }

  // 7 — DRAINAGE (gated by the drainage type and membrane compatibility).
  const dtype = d.drainage_type;
  const compatNote = membraneType === "torch" || membraneType === "hot"
    ? "Torch-on / bitumen systems CANNOT bond to a PVC puddle flange — use a stainless or aluminium clamping flange (or a proprietary bitumen-compatible drain). PVC flanges are demoted below."
    : membraneType === "pvc-sheet"
    ? "PVC / FPO sheet systems need a weldable / clamping-ring drain compatible with the sheet (e.g. an Alwitra Turbo-type), NOT a bonded puddle flange for liquid systems. Compatible drains are surfaced first."
    : "Bond the puddle flange / floor waste to the membrane at every outlet. Confirm the drain type is compatible with the selected membrane.";
  let drainage: StageResult;
  if (dtype === "scupper" || dtype === "rainwater-head") {
    drainage = mkStage("drainage", "Drainage — scupper / rainwater outlet", "drainage-podium-outlets-scuppers", "Podium Outlets & Scuppers", coastalFlag(PODIUM_OUTLET_CARDS, d.coastal),
      "Drainage is via a scupper / overflow or edge rainwater outlet — detail the membrane to the outlet and the parapet / fascia flashing (not a through-slab puddle flange). Confirm the outlet is compatible with the selected membrane.");
    drainage.options = [linkOpt("gutter-lining-systems", "Edge & Overflow Trims", leadName(GUTTER_LINING_CARDS)), linkOpt("drainage-puddle-flanges-floor-wastes", "Puddle Flanges & Floor Wastes", leadName(PUDDLE_FLANGE_CARDS))];
  } else if (dtype === "linear") {
    drainage = mkStage("drainage", "Drainage — linear channel to floor waste", "drainage-linear-grates-channel-drains", "Linear Grates & Channel Drains", coastalFlag(LINEAR_DRAIN_CARDS, d.coastal),
      "Linear channel drain discharging to a floor waste — bond / weld the channel and the waste to the membrane. " + compatNote);
    drainage.options = [linkOpt("drainage-puddle-flanges-floor-wastes", "Puddle Flanges & Floor Wastes", leadName(PUDDLE_FLANGE_CARDS))];
  } else {
    drainage = mkStage("drainage", "Drainage — outlets bonded to the membrane", "drainage-puddle-flanges-floor-wastes", "Drainage — Puddle Flanges & Floor Wastes", coastalFlag(badgeKerdi(drainGate(drainsForFinish(demoteProprietary(PUDDLE_FLANGE_CARDS), d.finish), membraneType)), d.coastal),
      compatNote + " Confirm the falls deliver water to the outlets with no ponding. (Proprietary membrane-specific drains — e.g. Schlüter KERDI-DRAIN — only suit their own membrane system.)");
    drainage.options = [
      linkOpt("drainage-linear-grates-channel-drains", "Linear Grates & Channel Drains", leadName(LINEAR_DRAIN_CARDS)),
      linkOpt("gutter-lining-systems", "Edge & Overflow Trims", leadName(GUTTER_LINING_CARDS)),
      linkOpt("drainage-podium-outlets-scuppers", "Podium Outlets & Scuppers", leadName(PODIUM_OUTLET_CARDS)),
    ];
  }
  stages.push(drainage);
  if (dtype === "unknown") advisories.push({ severity: "critical", title: "Drainage outlet not investigated", body: "The existing drainage outlet type / condition is unknown — inspect and confirm it (type, condition, height) BEFORE finalising the system. Blocked or failed drainage is a leading cause of the original failure; an uninvestigated outlet is a hold point. The puddle-flange products shown are indicative only." });
  if (dtype === "none") advisories.push({ severity: "warning", title: "No drainage outlet yet", body: "No outlet is defined — complete the hydraulic / drainage design (outlet type, number, position and falls to outlets) with the engineer before specifying the drainage detail." });
  if (d.drainage_condition === "damaged") advisories.push({ severity: "warning", title: "Replace the existing outlet", body: "The existing drainage outlet is corroded / damaged — replace it before waterproofing. A new membrane over a failed outlet will leak at the outlet." });
  if (d.drainage_condition === "raise") advisories.push({ severity: "warning", title: "Outlet height", body: "Raise / replace the puddle flange so the new membrane achieves adequate overlap and the outlet sits correctly relative to the finished falls." });
  if (d.drainage_condition === "not-inspected") advisories.push({ severity: "critical", title: "Drainage outlet condition not confirmed", body: "Inspect and confirm the existing outlet condition before finalising the specification — this is a pre-waterproofing hold point." });

  // 8 — MOVEMENT JOINTS (podium / roof / covered).
  if (d.element === "podium" || d.element === "roof" || d.finish === "covered") {
    const joints = mkStage("joints", "Movement & expansion joints", "backer-rod-bond-breaker-tape", "Backer Rod & Bond-Breaker Tape", BACKER_ROD_CARDS,
      "Carry structural / expansion joints through the build-up — back the membrane joint with a backer rod & bond-breaker tape, and in trafficable areas fit a trafficable expansion-joint cover. Never bridge a movement joint rigidly.");
    joints.options = [linkOpt("expansion-joint-cover-systems-trafficable", "Expansion Joint Cover Systems — Trafficable", leadName(EXPANSION_JOINT_CARDS))];
    stages.push(joints);
  }

  // 9 — PROTECTION & OVERBURDEN (covered / landscaped).
  if (d.finish === "covered" || d.finish === "landscaped") {
    const prot = mkStage("protection", "Protection & overburden", "protection-boards", "Protection Boards", protectionFor(PROTECTION_BOARD_CARDS, d.finish),
      d.finish === "landscaped"
        ? "Protect the membrane before the landscaped build-up: a protection board / slip layer, then the drainage cell, filter fabric and growing medium. Confirm the root-resistant membrane and the drainage above it."
        : "Protect the membrane under the covered build-up with a protection board / slip layer before pavers, pedestals or ballast.");
    prot.options = d.finish === "landscaped"
      ? [linkOpt("root-resistant-membrane-systems", "Root-Resistant Membrane Systems", leadName(ROOT_RESISTANT_CARDS))]
      : [linkOpt("ballast-systems", "Ballast Systems", leadName(BALLAST_CARDS))];
    stages.push(prot);
    // Landscaped / green-roof: drainage cells then filter fabric over the protection board.
    if (d.finish === "landscaped") {
      stages.push(mkStage("drainage-cell", "Drainage layer — drainage cells", "drainage-cell-systems", "Drainage Cell Systems", DRAINAGE_CELL_CARDS,
        "Install a drainage cell / cuspated drainage layer over the protection board to carry water to the outlets (falls ≥ 1:100). Required in green-roof / planter build-ups for sub-surface drainage."));
      stages.push(mkStage("filter-fabric", "Filter fabric / geotextile", "filter-fabric-systems", "Filter Fabric Systems", FILTER_FABRIC_CARDS,
        "Lay a non-woven filter geotextile over the drainage cells before the growing medium — it stops fine soil migrating into and clogging the drainage void."));
    }
  } else if (d.finish === "exposed" && warmRoof) {
    // Warm-roof exposed: the sheet membrane over insulation is NOT trafficable — add protection + a wearing course.
    stages.push(mkStage("protection", "Protection & wearing course", "protection-boards", "Protection Boards", protectionFor(PROTECTION_BOARD_CARDS, d.finish),
      "A sheet membrane over insulation is NOT a trafficable surface. Install a protection board / geocomposite over the membrane, then a structural wearing course — reinforced screed, in-situ concrete or precast pavers — designed by the structural engineer for the imposed / wheel load (protection-board compressive strength to suit; higher for vehicular)."));
  }

  // 10 — FINISH (tiled → tile adhesive + sealants; covered → pedestals).
  if (d.finish === "tiled") {
    const tile = mkStage("tile-adhesive", "Finish — tile adhesive & grout", "tile-adhesive-systems", "Tile Adhesive Systems", TILE_ADHESIVE_CARDS,
      "Tile over the cured, flood-tested membrane with a deformable adhesive (ISO 13007 C2 S1/S2) compatible with the membrane — allow full membrane cure and confirm the manufacturer permits direct tiling.");
    stages.push(tile);
    // Mandatory movement-joint sealant in a tiled finish (AS 3958.1) — its own stage, not a footnote.
    stages.push(mkStage("tile-sealant", "Finish — movement-joint sealant", "tile-sealants-silicone-sanitary", "Tile Sealants — Silicone & Sanitary", TILE_SEALANT_CARDS,
      "Seal all perimeter joints, internal angle joints, changes of plane and tile-to-membrane / drain interfaces with a sanitary-grade silicone or MS-polymer sealant — never rigid-grout these joints (AS 3958.1 / AS 4654). Match the sealant colour to the grout. Unsealed movement joints in tiling are a leading cause of recurring leaks."));
  } else if (d.finish === "covered") {
    const ped = mkStage("pedestals", "Finish — raised floor on pedestals", "pedestal-systems-adjustable-height", "Adjustable Pedestal Systems", PEDESTAL_CARDS,
      "Create a free-draining raised floor of pavers or decking over the (protected) membrane on adjustable pedestals — always on a protection / slip pad, never point-loaded onto the membrane. Ballast is an alternative covered build-up.");
    ped.options = [linkOpt("ballast-systems", "Ballast Systems", leadName(BALLAST_CARDS))];
    stages.push(ped);
  } else if (d.finish === "exposed") {
    // Exposed membranes still need their terminations and movement joints sealed.
    stages.push(mkStage("exposed-sealant", "Termination & movement-joint sealant", "tile-sealants-silicone-sanitary", "Sealants — PU / MS (exposed)", nonSanitary(TILE_SEALANT_CARDS),
      "Seal all membrane terminations, perimeter expansion joints and structural movement joints over a backer rod — and at termination bars, seal the bar flange onto the membrane. Use a PU / MS-polymer sealant compatible with the membrane (tile sanitary silicones are not for exposed membranes). Unsealed terminations and joints are a primary failure point on exposed membranes."));
  }

  // 11 — QA — FLOOD TEST (only where outlets can be dammed; otherwise an alternative-QA advisory).
  const dammable = !dtype || dtype === "floor-waste" || dtype === "linear";
  if (dammable) {
    stages.push(mkStage("flood-test", "QA — flood test before covering", "flood-test-equipment", "Flood Test Equipment", FLOOD_TEST_CARDS,
      "Flood-test the cured membrane (typically 24–72 h, dammed to the upstands; plug the outlets) and rectify before tiling, screeding or laying overburden. For large roof / podium areas confirm the deck can sustain the hydrostatic load (~1 kPa per 100 mm head) with the structural engineer — or use an alternative QA (electronic leak detection / tracer gas). Record the test."));
  } else {
    advisories.push({ severity: "warning", title: "QA — flood-test method", body: "With scupper-only / edge or undefined drainage there may be no through-deck outlet to plug for a standard flood test. Confirm the QA method with the engineer — temporary damming, electronic leak detection (ELD) or tracer-gas testing are alternatives. Record the result." });
  }

  // ── Triage advisories (traffic / coastal / fire / existing membrane) ──
  if (d.element === "podium" || d.traffic === "vehicular") {
    advisories.push({ severity: "warning", title: "Structural / hydraulic engineer — podium loads", body: "Podium and trafficked decks must be designed with the structural engineer: live / imposed loads, deflection limits (which set the membrane DFT and the protection-board compressive strength), waterstops at construction joints, and the drainage hydraulics. Confirm before specifying." });
  }
  if (d.traffic === "vehicular") {
    advisories.push({ severity: "warning", title: "Vehicular / heavy-duty loading", body: "Vehicular or plant traffic needs a heavy-duty system (e.g. hot-melt rubberised asphalt or a reinforced sheet) under a high-compressive-strength protection layer and a structural wearing course — light under-tile or thin liquid systems are not suitable. Match the membrane and protection board to the wheel loads." });
  }
  if (d.finish === "tiled" && d.traffic === "vehicular") {
    advisories.push({ severity: "critical", title: "Heavy / vehicular loading under tiles", body: "The under-tile membranes shown are standard pedestrian-rated liquid systems. For vehicular or heavy plant loading under tiles, confirm the membrane's compressive duty and DFT with the manufacturer and structural engineer — a 2-layer torch-on SBS or hot-melt rubberised asphalt system beneath a structural screed may be required instead of a thin liquid membrane." });
  }
  if (d.coastal === "yes") {
    advisories.push({ severity: "warning", title: "Coastal / marine exposure — Grade 316", body: "Within a coastal zone, specify Grade 316 stainless steel for ALL metal components — drainage flanges / outlets, edge & overflow trims, termination bars and fixings — and confirm the chloride-resistance of the membrane and primer. Avoid plain galvanised / zinc components." });
  }
  if (d.fire === "yes") {
    advisories.push({ severity: "warning", title: "Fire-resistance level (FRL)", body: "Over occupied space or a carpark in a Class 2 building, the deck / membrane system may need to meet a fire-resistance level (FRL). Some membrane / insulation products affect FRL compliance — confirm the system's FRL with the fire engineer and the manufacturer." });
  }
  if (d.deck === "existing" && d.existing_membrane) {
    const m = d.existing_membrane;
    const body = m === "torch-on"
      ? "Existing torch-on bitumen: prime with a compatible solvent bitumen primer if overlaying with a bitumen system, or strip back for a liquid / sheet system that cannot bond to bitumen. A sound bitumen sheet may serve as a base / vapour layer in a warm-roof build-up — confirm."
      : m === "liquid"
      ? "Existing liquid (acrylic / PU): confirm intercoat adhesion and compatibility — many new membranes will not bond to an aged or chalking liquid coat. Abrade and test-patch, or strip back to the substrate."
      : m === "cold-sheet"
      ? "Existing cold-applied / self-adhesive sheet: confirm soundness and adhesion; most new systems require removal rather than overlay — confirm with the manufacturer."
      : "Existing membrane type unknown: identify it (test patch / cut sample) before specifying — bond, primer and whether to strip all depend on the existing type.";
    advisories.push({ severity: "warning", title: "Existing membrane — overlay strategy", body });
  }

  // Termination method by membrane type.
  if (membraneType === "pvc-sheet") {
    advisories.push({ severity: "warning", title: "Sheet membrane termination", body: "Terminate PVC / FPO sheet by heat-welding a termination strip or folding it over a stainless trim with a cover flashing — do NOT screw a mechanical bar through the sheet (it punctures the waterproofing). Use the manufacturer's system termination." });
  } else if (membraneType === "torch" || membraneType === "hot") {
    advisories.push({ severity: "warning", title: "Bitumen membrane termination", body: "Terminate torch-on / bitumen with an aluminium or stainless bar bedded in bitumen mastic / a compatible sealant and dress the cap sheet to the detail — not a tile-grade sanitary sealant." });
  }

  // ── Lead advisory — certification (first) ──
  advisories.unshift({
    severity: "warning",
    title: "Use a certified membrane — tested systems are listed first",
    body: "For Class 2 balconies, roofs, podiums and planters, specify only a waterproofing membrane with current Australian test certification (AS 4654 / AS 4858, with CSIRO / BRANZ / NATA / CodeMark evidence). In every membrane stage below, certified systems are ordered first; any product without documented test evidence carries a “Not tested — confirm certification” badge and is not an approved substitute. See the “Class 2 / NCC tested” field on each membrane card.",
  });

  return { stages, advisories };
}
