// ─────────────────────────────────────────────────────────────────────────────
// System Selector — live card registry (concrete-cracking stages).
//
// Maps each cracking category slug to the EXACT product arrays the repair-system
// library renders (same RefCard objects, content unchanged). Kept separate from
// the spalling registry because cracking reuses some slug names (epoxy-anchoring,
// repair-mortars-polymer-modified) with a different product set/order.
// ─────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";
import type { SelectorCardSource } from "./spalling-cards";
import { INJECTION_PU_CARDS } from "../../concrete-cracking/injection-resins-pu-flexible/injectionPUData";
import { INJECTION_EPOXY_CARDS } from "../../concrete-cracking/injection-resins-epoxy-rigid/injectionEpoxyData";
import { SEALANT_PU_CARDS } from "../../concrete-cracking/sealants-polyurethane/sealantsPUData";
// Cracking reuses the canonical epoxy-anchoring cards (Hilti-led) the CC reference page renders.
import { EPOXY_ANCHORING_CARDS } from "../../reinforcement-corrosion/epoxy-anchoring-adhesives/epoxyAnchoringData";
import { REF_CARDS } from "../../concrete-spalling/repair-mortars-polymer-modified/referenceCardData";
import { CRACK_STITCH_CARDS } from "../../concrete-cracking/crack-stitching/crackStitchingData";
// CFRP for cracking reuses the same CFRP product set the RC/CC CFRP pages render.
import { CFRP_CARDS } from "../../reinforcement-corrosion/cfrp-strips-laminates/cfrpData";

// Stage 4 (post-stitching gap fill) uses the eight named polymer-modified mortars
// from the PM reference set, in the set's existing order (352NFG leads).
const STAGE4_MORTARS = new Set([
  "Sika MonoTop-352NFG",
  "Sika MonoTop-612N",
  "Sika MonoTop-412NFG",
  "ARDEX BR 340",
  "ARDEX BR 345",
  "Fosroc Renderoc HB40",
  "Mapei Mapegrout T40",
  "Mapei Mapegrout T60",
]);
const CC_MORTAR_CARDS = (REF_CARDS as unknown as RefCard[]).filter((c) => STAGE4_MORTARS.has(c.rangeName));

export const CRACKING_SELECTOR_CARDS: Record<string, SelectorCardSource> = {
  "injection-resins-pu-flexible": { cards: INJECTION_PU_CARDS },
  "injection-resins-epoxy-rigid": { cards: INJECTION_EPOXY_CARDS },
  "sealants-polyurethane": { cards: SEALANT_PU_CARDS },
  "epoxy-anchoring-adhesives": { cards: EPOXY_ANCHORING_CARDS },
  "crack-stitching": { cards: CRACK_STITCH_CARDS },
  "cfrp-strips-laminates": { cards: CFRP_CARDS as unknown as RefCard[] },
  "repair-mortars-polymer-modified": { cards: CC_MORTAR_CARDS },
};
