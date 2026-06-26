// Backer rod & bond-breaker tape. Hardware → no Class-2/warranty. Lighter treatment.
// appInfo: Type · Material · Size / diameter · Use · Notes.
import type { RefCard } from "../../_components/ProductSpecCardV2";
const KEYS = ["Type", "Material", "Size / diameter", "Use", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));
const card = (brand: string, rangeName: string, shortType: string, vals: string[], bestFor: string[], avoidWhere: string[], warnings: string[], description: string, techExtra: { label: string; value: string; source?: string }[] = []): RefCard => ({
  brand, rangeName, shortType, badges: [{ label: "Backer rod / bond breaker", tone: "navy" }],
  appInfo: kp(vals), bestFor, avoidWhere, warnings,
  advanced: { description, designCriteria: "", techData: [{ label: "Type", value: vals[0], source: brand }, { label: "Material", value: vals[1], source: brand }, ...techExtra] },
});

export const BACKER_ROD_CARDS: RefCard[] = [
  card("Nomaflex / Carpenter Co.", "Nomaflex Closed-Cell Backer Rod", "Closed-cell PE backer rod — round",
    ["Backer rod (round)", "Closed-cell polyethylene foam", "Range of diameters to suit joint width (confirm)", "Sealant depth control; prevents three-sided adhesion", "Select diameter ~25% over joint width for a snug interference fit"],
    ["Movement, expansion and perimeter joints needing controlled sealant depth and two-sided adhesion only"],
    ["Open-cell foam joints — open-cell absorbs sealant and defeats the rod"],
    ["Select diameter ~25% larger than the joint width; confirm sealant chemistry compatibility and diameter range with the supplier"],
    "Nomaflex is a closed-cell polyethylene foam backer rod that controls sealant depth and prevents three-sided adhesion in movement joints, installed by compressing into the joint before sealant. Select the diameter ~25% over the joint width and confirm range and compatibility with the supplier."),
  card("Tremco CPG Australia", "Tremco Closed Cell Backer Rod", "Closed-cell PE backer rod — round (Tremco systems)",
    ["Backer rod (round)", "Closed-cell polyethylene foam", "Range of diameters (confirm)", "Sealant depth control; prevents three-sided adhesion", "Accessory within Tremco sealant systems (Spectrem, Vulkem)"],
    ["Joints sealed with Tremco sealant systems where matched accessory backer rod is specified"],
    ["Open-cell foam joints"],
    ["Confirm the Tremco product designation, diameter range and sealant compatibility with Tremco CPG Australia"],
    "Tremco CPG supplies a closed-cell polyethylene foam backer rod as an accessory within Tremco sealant systems to set joint geometry and prevent three-sided adhesion. Confirm the product designation and diameter range with Tremco CPG Australia."),
  card("Various — confirm with supplier", "Polyethylene Bond Breaker Tape", "Self-adhesive PE bond-breaker tape — flat",
    ["Bond-breaker tape (flat)", "Polyethylene film, self-adhesive", "Various tape widths (confirm)", "Bond breaking at the joint base where round rod cannot seat", "For shallow, saw-cut or rebated flat-bottomed joints"],
    ["Shallow, saw-cut or rebated joints where round backer rod cannot seat — provides two-sided adhesion at a flat base"],
    ["Deep joints needing backer-rod depth control (use rod instead)"],
    ["Tape must be fully adhered to the joint base with no voids or lifted edges; confirm a system-compatible tape with the sealant manufacturer"],
    "Polyethylene bond-breaker tape is a self-adhesive PE film applied to a flat joint base where round backer rod cannot seat — in shallow, saw-cut or rebated joints — so the sealant bonds to two faces only. It must be fully adhered with no voids; confirm a compatible tape with the sealant manufacturer."),
  card("Various — confirm with supplier", "Open-Cell (Soft) Backer Rod", "Open-cell PE/PU backer rod — round (specialist use)",
    ["Backer rod (round, open-cell / soft)", "Open-cell / soft polyurethane or PE foam", "Range of diameters (confirm)", "Depth control in irregular joints where a soft rod seats better", "Specify only where the sealant manufacturer permits — not for typical wet-area joints"],
    ["Irregular or variable-width joints where a soft, compressible rod seats better and the sealant manufacturer permits it"],
    ["Standard wet-area movement joints — closed-cell rod is the default", "Wet / immersed joints unless the sealant manufacturer confirms it"],
    ["Open-cell foam can absorb sealant and moisture — use only where the sealant manufacturer specifically permits open-cell rod"],
    "Open-cell (soft) backer rod is a compressible rod sometimes used in irregular or variable-width joints where a soft rod seats better. Because open-cell foam can absorb sealant and moisture, it is a specialist option — use only where the sealant manufacturer specifically permits it, with closed-cell rod the default for wet-area joints."),
];
