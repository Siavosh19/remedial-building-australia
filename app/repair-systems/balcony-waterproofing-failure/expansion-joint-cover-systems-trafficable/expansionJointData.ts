// Trafficable expansion-joint cover systems for balcony/podium decks. Selection
// facts only → no Class-2/NCC or warranty fields, no invented numbers (unknown = "").
// appInfo: Type · Material · Movement / format · Use · Notes.
import type { RefCard } from "../../_components/ProductSpecCardV2";
const KEYS = ["Type", "Material", "Movement / format", "Use", "Notes"];
const kp = (vals: string[]) => KEYS.map((label, i) => ({ label, value: vals[i] ?? "" }));
const card = (
  brand: string, rangeName: string, shortType: string, vals: string[],
  bestFor: string[], avoidWhere: string[], warnings: string[],
  description: string, techData: { label: string; value: string; source?: string }[],
): RefCard => ({
  brand, rangeName, shortType, badges: [{ label: "Trafficable EJ cover", tone: "navy" }],
  appInfo: kp(vals), bestFor, avoidWhere, warnings,
  advanced: { description, designCriteria: "", techData },
});

export const EXPANSION_JOINT_CARDS: RefCard[] = [
  card(
    "Schlüter Systems", "Schlüter DILEX-EKE",
    "Tile-embedded PVC / CPE corner movement-joint profile",
    ["Corner / movement-joint profile (tile-embedded)", "Recycled rigid PVC legs + CPE movement zone", "~5 mm CPE movement zone; surface (tile-plane) format", "Movement / corner joints within tiled balcony, terrace & podium decks", "Profile sized to tile thickness; CPE zone UV-resistant for external use"],
    ["Movement joints at floor/wall junctions and within the tile plane of a trafficable tiled deck"],
    ["Structural joints with large vertical differential movement (confirm magnitude with Schlüter)"],
    ["Tile adhesive under the anchor legs must be continuous and void-free or the profile detaches", "The membrane must still be detailed correctly at the joint faces before the profile"],
    "Schlüter DILEX-EKE is a corner/movement-joint profile with recycled rigid PVC anchor legs and a ~5 mm CPE movement zone, bedded into the tile adhesive on each side of a joint in a tiled balcony, terrace or podium deck. The CPE zone is UV-resistant for external use; size the profile to the tile thickness and confirm the movement accommodation with Schlüter Australia.",
    [{ label: "Material", value: "Recycled rigid PVC legs + CPE movement zone", source: "Schlüter Systems" }, { label: "Movement zone", value: "~5 mm wide (CPE)", source: "Schlüter Systems" }, { label: "Install", value: "Anchor legs bedded in tile adhesive each side" }],
  ),
  card(
    "Sika Australia", "Sikaflex Expansion Joint System",
    "PU sealant trafficable deck joint (with Combitec cover option)",
    ["Sealant-based movement joint (cover-profile option)", "Polyurethane sealant (or Sika Combitec metal cover)", "Saw-cut / formed joint; field-replaceable sealant", "Trafficable balcony & podium deck expansion joints", "Backer rod + primer required; confirm the current Sikaflex product and traffic rating"],
    ["Sealing a trafficable deck expansion joint flush with the surface, with a field-replaceable seal"],
    ["Vehicular loading unless the specific product is rated for it (confirm with Sika)"],
    ["Sealant must be used over a backer rod — three-sided adhesion fails under movement", "Sealant-only joints have a service life and need periodic inspection / re-sealing"],
    "Sika supplies trafficable PU sealant joint systems for balcony and podium decks — the joint is saw-cut/formed, primed, backer-rodded and sealed with a traffic-rated Sikaflex sealant flush to the surface; Sika Combitec metal cover profiles are an alternative. Confirm the current Sikaflex product designation, traffic rating and movement class with Sika Australia.",
    [{ label: "Material", value: "Polyurethane sealant (or Combitec metal cover)", source: "Sika Australia" }, { label: "Format", value: "Saw-cut / formed joint over backer rod", source: "Sika Australia" }, { label: "Primer", value: "Sika primer required (confirm selection)" }],
  ),
  card(
    "Tremco CPG Australia", "Tremco Emshield DFR",
    "EPDM dual-flange trafficable expansion-joint cover",
    ["Dual-flange cover profile (recessed)", "EPDM rubber centre element + metal retaining flanges", "Mechanically fixed flanges; EPDM accommodates movement", "Trafficable balcony & podium deck expansion joints", "EPDM is UV/ozone-resistant; maintainable/replaceable; confirm AU designation"],
    ["A maintainable, mechanically fixed trafficable EJ cover for foot (and some light vehicular) traffic"],
    ["Hollow / delaminated substrate that won't hold the flange fixings under traffic"],
    ["Requires correct recess preparation in the substrate — not a surface-only system", "Retaining-flange fixings must be into sound substrate"],
    "Tremco Emshield DFR is a dual-flanged EPDM expansion-joint cover for trafficable decks — metal retaining flanges are mechanically fixed each side and the EPDM centre element spans the joint, making it maintainable and replaceable. It needs correct recess preparation; confirm the current Australian product designation, movement range and traffic rating with Tremco CPG Australia.",
    [{ label: "Material", value: "EPDM centre element + metal flanges", source: "Tremco CPG Australia" }, { label: "Fixing", value: "Mechanically fixed dual flanges (recessed)", source: "Tremco CPG Australia" }],
  ),
];
