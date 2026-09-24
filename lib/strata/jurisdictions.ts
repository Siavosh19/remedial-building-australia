// ── Strata jurisdiction label packs ──────────────────────────────────────────
// Strata law differs in every state and territory, and so does the vocabulary.
// Rather than branch on jurisdiction in code, the whole module reads its wording
// from one of these packs. No logic depends on which pack is in use.
//
// Just as important as the words: the module NEVER asserts what the law requires.
// Notice periods, grace days, interest rates and spending limits are settings the
// committee enters for their own scheme — this file only supplies labels and the
// name of the authority a committee can check with.

import type { LocationState } from "@prisma/client";

export type StrataLabels = {
  /** The legal entity that owns the common property. */
  body: string;
  /** The elected group that runs it day to day. */
  committee: string;
  /** What the registered plan is called. */
  planNumber: string;
  /** What contributions are called. */
  levy: string;
  /** The figure contributions are apportioned on. */
  levyBasis: string;
  /** The figure voting / ownership share is based on. */
  ownershipBasis: string;
  /**
   * True where the two bases above are genuinely DIFFERENT numbers for a lot
   * (VIC lot liability vs lot entitlement; QLD contribution vs interest
   * schedule). Where false, a scheme normally holds the same figure in both.
   */
  separateBases: boolean;
  /** Default name for the day-to-day operating fund. */
  fund1: string;
  /** Default name for the long-term / capital fund. */
  fund2: string;
  /** Who a committee can check their own obligations with. */
  authority: string;
};

const DEFAULTS: StrataLabels = {
  body: "Owners corporation",
  committee: "Committee",
  planNumber: "Plan number",
  levy: "Contribution",
  levyBasis: "Unit entitlement",
  ownershipBasis: "Unit entitlement",
  separateBases: false,
  fund1: "Administrative fund",
  fund2: "Sinking fund",
  authority: "your state or territory strata authority",
};

export const JURISDICTIONS: Record<LocationState, StrataLabels> = {
  NSW: {
    ...DEFAULTS,
    body: "Owners corporation",
    committee: "Strata committee",
    planNumber: "Strata plan number",
    levy: "Levy",
    fund1: "Administrative fund",
    fund2: "Capital works fund",
    authority: "NSW Fair Trading",
  },
  VIC: {
    ...DEFAULTS,
    body: "Owners corporation",
    committee: "Committee",
    planNumber: "Plan of subdivision number",
    levy: "Fee",
    // Victoria splits the two: liability carries the fees, entitlement carries
    // the ownership share and the votes.
    levyBasis: "Lot liability",
    ownershipBasis: "Lot entitlement",
    separateBases: true,
    fund1: "Administrative fund",
    fund2: "Maintenance fund",
    authority: "Consumer Affairs Victoria",
  },
  QLD: {
    ...DEFAULTS,
    body: "Body corporate",
    committee: "Committee",
    planNumber: "Community titles scheme number",
    levy: "Contribution",
    // Queensland also splits them, across two separate schedules.
    levyBasis: "Contribution schedule lot entitlement",
    ownershipBasis: "Interest schedule lot entitlement",
    separateBases: true,
    fund1: "Administrative fund",
    fund2: "Sinking fund",
    authority: "the Commissioner for Body Corporate and Community Management",
  },
  WA: {
    ...DEFAULTS,
    body: "Strata company",
    committee: "Council of owners",
    planNumber: "Strata plan number",
    levy: "Levy",
    fund1: "Administrative fund",
    fund2: "Reserve fund",
    authority: "Landgate",
  },
  SA: {
    ...DEFAULTS,
    body: "Strata or community corporation",
    committee: "Management committee",
    planNumber: "Strata or community plan number",
    fund1: "Administrative fund",
    fund2: "Sinking fund",
    authority: "Consumer and Business Services SA",
  },
  TAS: {
    ...DEFAULTS,
    body: "Body corporate",
    planNumber: "Strata plan number",
    fund1: "Administrative fund",
    fund2: "Sinking fund",
    authority: "Consumer, Building and Occupational Services",
  },
  ACT: {
    ...DEFAULTS,
    body: "Owners corporation",
    committee: "Executive committee",
    planNumber: "Units plan number",
    fund1: "General fund",
    fund2: "Sinking fund",
    authority: "Access Canberra",
  },
  NT: {
    ...DEFAULTS,
    body: "Body corporate",
    planNumber: "Unit plan number",
    fund1: "Administrative fund",
    fund2: "Sinking fund",
    authority: "NT Consumer Affairs",
  },
};

export function labelsFor(state: LocationState | null | undefined): StrataLabels {
  if (!state) return DEFAULTS;
  return JURISDICTIONS[state] ?? DEFAULTS;
}

export const STATE_OPTIONS: LocationState[] = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

/**
 * A permanent, human-quotable payment reference for a lot. Owners quote it on
 * the transfer so the payment can be matched to the right lot without guessing.
 * Deterministic, so re-running it never changes an existing reference.
 */
export function paymentReference(planNumber: string | null, schemeId: number, lotNumber: string) {
  const plan = (planNumber ?? `S${schemeId}`).replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 12);
  const lot = lotNumber.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 6);
  return `${plan || `S${schemeId}`}-${lot.padStart(2, "0")}`;
}
