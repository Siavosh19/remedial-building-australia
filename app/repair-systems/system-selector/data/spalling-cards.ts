// ─────────────────────────────────────────────────────────────────────────────
// System Selector — live card registry (all concrete-spalling stages).
//
// Maps a category slug to the EXACT product arrays the repair-system library
// renders, so the selector shows the real library cards (and stays in sync as
// products are added/removed/relocated — no separate copy to maintain).
// ─────────────────────────────────────────────────────────────────────────────

import type { RefCard } from "../../_components/ProductSpecCardV2";
import { REF_CARDS } from "../../concrete-spalling/repair-mortars-polymer-modified/referenceCardData";
import { CEMENTITIOUS_CARDS } from "../../concrete-spalling/cementitious-repair-mortars/cementitiousData";
import { HIGH_BUILD_CARDS } from "../../concrete-spalling/high-build-repair-mortars/highBuildData";
import { EPOXY_MORTAR_CARDS } from "../../concrete-spalling/epoxy-repair-mortars/epoxyMortarsData";
import { MICRO_CONCRETE_CARDS } from "../../concrete-spalling/micro-concrete/microConcreteData";
import { REBAR_PRIMER_CARDS } from "../../concrete-spalling/rebar-primers-inhibitors/rebarPrimersData";
import { BONDING_AGENT_CARDS } from "../../concrete-spalling/bonding-agents-sbr-latex/bondingAgentsData";
import { CONCRETE_PRIMER_CARDS } from "../../concrete-spalling/concrete-primers-realkalisation/concretePrimersData";
import { PRODUCTS as ADHESIVES } from "../../concrete-spalling/concrete-repair-adhesives/ConcreteRepairAdhesivesProductSection";
import { PRODUCTS as CEMENT_AGG } from "../../concrete-spalling/cement-aggregates/CementAggregatesProductSection";
import { STRUCTURAL_GROUT_CARDS } from "../../concrete-spalling/structural-grouts/structuralGroutsData";
import { CURING_COMPOUND_CARDS } from "../../concrete-spalling/curing-compounds/curingCompoundsData";
import { PRODUCTS as CURING_SHEET } from "../../concrete-spalling/curing-sheeting/CuringSheetingProductSection";
import { FAIRING_FINISHING_CARDS } from "../../concrete-spalling/fairing-finishing-coats/fairingFinishingData";

// AutoProductReference accepts either `cards` (RefCard[]) or `products`
// (AutoProduct[] — the page PRODUCTS arrays). We store whichever the page uses.
export type SelectorCardSource = { cards?: RefCard[]; products?: unknown[] };

const p = (a: unknown): SelectorCardSource => ({ products: a as unknown[] });

export const SELECTOR_CARDS: Record<string, SelectorCardSource> = {
  // rebar priming
  "rebar-primers-inhibitors": { cards: REBAR_PRIMER_CARDS },
  // bonding / primers / adhesives
  "bonding-agents-sbr-latex": { cards: BONDING_AGENT_CARDS },
  "concrete-primers-realkalisation": { cards: CONCRETE_PRIMER_CARDS },
  "concrete-repair-adhesives": p(ADHESIVES),
  // repair mortars
  "repair-mortars-polymer-modified": { cards: REF_CARDS as unknown as RefCard[] },
  "cementitious-repair-mortars": { cards: CEMENTITIOUS_CARDS },
  "high-build-repair-mortars": { cards: HIGH_BUILD_CARDS },
  "epoxy-repair-mortars": { cards: EPOXY_MORTAR_CARDS },
  "micro-concrete": { cards: MICRO_CONCRETE_CARDS },
  "cement-aggregates": p(CEMENT_AGG),
  // grouts
  "structural-grouts": { cards: STRUCTURAL_GROUT_CARDS },
  // curing
  "curing-compounds": { cards: CURING_COMPOUND_CARDS },
  "curing-sheeting": p(CURING_SHEET),
  // finishing
  "fairing-finishing-coats": { cards: FAIRING_FINISHING_CARDS },
};
