export interface CategoryEnrichment {
  advantages: string[];
  disadvantages: string[];
  description: string;
}

export const CATEGORY_ENRICHMENT: Record<string, CategoryEnrichment> = {
  "repair-mortars-polymer-modified": {
    description:
      "Polymer-modified repair mortars are cementitious products containing styrene-butadiene rubber (SBR) or acrylic polymers, used to reinstate concrete that has been removed due to spalling, delamination, or corrosion-induced cover loss. They are the default repair material for concrete spall repairs on Class 2 apartment buildings, carparks, and civil structures where spalled cover is cut back to clean, sound concrete and the area is reinstated to profile. The polymer component significantly improves bond strength, flexibility, and durability over straight cement mortar, and most products comply with EN 1504-3 Class R3/R4 requirements adopted in Australian practice. Applied by trowel or spray in layers up to 30–50 mm, with a bond coat primer applied to the prepared substrate immediately before placement. A bonding agent or primer coat is essential; without it, premature delamination is common.",
    advantages: [
      "Bond to existing concrete typically >2.0 MPa pull-off strength when correctly prepared",
      "Polymer modification improves flexibility and freeze-thaw resistance over plain cement mortar",
      "Suitable for structural and cosmetic repairs, 5–100 mm depth range",
    ],
    disadvantages: [
      "Colour match to existing concrete is not guaranteed without specialist colour service",
      "Requires minimum CSP 3–4 surface preparation — bond will fail on unprepared surfaces",
    ],
  },
  "cementitious-repair-mortars": {
    description:
      "Cementitious repair mortars are cement-based patching compounds used to fill voids, spalls, and defects in concrete where structural demands are lower than those requiring polymer modification. Commonly used by general concretors and remedial contractors for cosmetic repairs, honeycombed concrete reinstatement, and non-structural surface restoration on buildings, retaining walls, and civil works. They are mixed with water on site and applied by trowel or screed board, relying on mechanical and chemical adhesion to the substrate with the assistance of an SBR bonding agent. Most products comply with AS 3600 requirements for strength and exposure class when correctly placed and wet cured. Best suited to large-volume applications where cost efficiency outweighs the performance benefits of polymer-modified alternatives.",
    advantages: [
      "Cost-effective for large-volume general repairs — familiar to most concretors",
      "Good compressive strength when correctly placed and wet cured",
    ],
    disadvantages: [
      "Higher shrinkage risk than polymer-modified — wet curing regime mandatory",
      "Not suitable for thin-section (<10 mm) or structurally critical repairs",
    ],
  },
  "epoxy-repair-mortars": {
    description:
      "Epoxy repair mortars are two- or three-component systems (resin, hardener, and dry filler aggregate) used where high compressive strength, early return to service, or chemical resistance is required beyond what cementitious products can deliver. Specified for industrial floors, loading dock edges, trafficked ramps, precast nibs, and structural repairs where thin-section placement or rapid strength gain is critical — typically trafficable within 2–4 hours. The epoxy binder provides bond strengths and compressive strengths significantly higher than cementitious alternatives and resists oils, solvents, and abrasive wear. Application requires careful component mixing ratios and temperature management; the system is rigid when cured, which can cause stress at the repair perimeter if thermal movement is not accounted for. Typically installed by specialist concrete repair contractors.",
    advantages: [
      "High compressive strength — typically 60–80 MPa at 28 days",
      "Resistant to chemical attack and abrasion; high early strength (trafficable in 2–4 hours)",
    ],
    disadvantages: [
      "Rigid when cured — thermal expansion mismatch may cause delamination at repair perimeter",
      "Substantially higher material cost than cementitious alternatives",
    ],
  },
  "bonding-agents-sbr-latex": {
    description:
      "SBR bonding agents and latex admixtures are water-based polymer emulsions used to improve adhesion between new repair materials and existing concrete or masonry substrates. Applied by brush or roller to the prepared substrate immediately before the repair mortar is placed — the mortar must go on before the bond coat skins over, which is a critical timing requirement. SBR latex also functions as a mortar admixture, added directly to the mix at approximately 10% of the water weight to improve flexibility, reduce shrinkage, and enhance workability. Without a bond coat in most repair mortar systems, premature delamination is the predictable result. Specified as part of a complete repair system by engineers in accordance with EN 1504-4 adhesion bonding requirements.",
    advantages: [
      "Significantly improves mortar-to-substrate bond strength when applied correctly",
      "SBR types double as mortar admixture — added to mix at 10% of water weight",
    ],
    disadvantages: [
      "Must be applied wet-on-wet — mortar must go on before the bond coat skins over",
      "Not a standalone waterproofing product — bond improvement only",
    ],
  },
  "rebar-primers-inhibitors": {
    description:
      "Rebar primers and corrosion inhibitors are specialist coatings applied to cleaned, exposed reinforcing steel before repair mortar is placed to re-cover it. After concrete is broken back to expose corroded rebar, the steel must be mechanically cleaned to remove all rust, scale, and contamination, then primed immediately to prevent new oxidation forming during the repair process. Epoxy zinc-rich primers provide a sacrificial electrochemical barrier while the mortar is placed and cures; migrating-type inhibitors may also be applied to adjacent unbroken concrete to address residual chloride contamination. The primer coat is a mandatory system component in all chloride-affected or carbonation-induced corrosion repair specifications — omitting it significantly reduces repair service life. Structural engineers specify these as part of a compliant EN 1504-7 reinforcement protection system.",
    advantages: [
      "Creates a robust corrosion barrier between cleaned steel and repair mortar",
      "Zinc-rich formulations provide sacrificial cathodic protection of surrounding steel",
    ],
    disadvantages: [
      "Effectiveness entirely dependent on thorough steel preparation — ineffective on contamination",
      "Epoxy types have a limited pot life after mixing — typically 30–60 min",
    ],
  },
  "corrosion-inhibitors-mci": {
    description:
      "Migrating corrosion inhibitors (MCI) are chemical compounds — typically amine-based or amino alcohol formulations — applied to the surface of existing concrete to penetrate through the cover depth and form a protective barrier on the reinforcing steel below. Unlike physical repair methods, MCIs do not require concrete breakout, making them suitable for treating large areas of at-risk concrete where corrosion risk is identified but full repair is not yet warranted or economically feasible. Commonly used in carparks, facades, and marine structures with known chloride ingress, as part of a broader corrosion management strategy. Effectiveness depends on concrete cover depth and porosity, and independent core sampling with testing is recommended to verify penetration to rebar level. Specified by corrosion engineers and building consultants as a complementary or interim treatment alongside physical repair.",
    advantages: [
      "Migrating inhibitors penetrate existing cover concrete — no breakout required",
      "Surface-applied treatment can arrest active corrosion where full repair is not feasible",
    ],
    disadvantages: [
      "Penetration depth depends on cover quality and porosity — independent testing required",
      "Not a substitute for full repair in severely corroded or section-loss structures",
    ],
  },
  "epoxy-zinc-rich-primers": {
    description:
      "Epoxy zinc-rich primers are two-component coatings applied to blast-cleaned or mechanically prepared reinforcing steel to provide both a physical barrier and sacrificial cathodic protection. The zinc-rich pigment in the cured film acts sacrificially — the zinc oxidises preferentially, protecting exposed steel at coating defects or holidays. Applied to rebar exposed during concrete breakout in corrosion repair works, they form the first protective layer in the complete repair system before repair mortar is placed. The steel must be prepared to a minimum Sa 2.5 standard (near-white blast clean or mechanical equivalent) to achieve the adhesion required for long-term performance; application to contaminated or rusted steel is ineffective. Part of a system that includes a structural repair mortar and, where required, a migrating corrosion inhibitor applied to adjacent concrete.",
    advantages: [
      "Dual protection — barrier coating plus zinc sacrificial action on cleaned rebar",
      "Achieves good adhesion to blast-cleaned or mechanically prepared steel",
    ],
    disadvantages: [
      "Requires minimum Sa 2.5 (near-white blast) surface preparation — cannot be applied to rust",
      "Overcoating window must be strictly observed — too early or too late reduces adhesion",
    ],
  },
  "cathodic-protection": {
    description:
      "Cathodic protection (CP) systems are electrochemical solutions to reinforcement corrosion that address the problem at its fundamental cause — by impressing a small protective electrical current onto the reinforcing steel, oxidation (corrosion) is arrested rather than managed. Used on bridges, carparks, marine structures, and heritage buildings where large-scale concrete breakout would be uneconomical or architecturally unacceptable, CP systems extend structure life significantly without requiring major demolition. Systems include embedded anodes (zinc sacrificial, titanium mesh-activated, or discrete impressed-current types) connected to a control and monitoring unit on the building. Required design and installation is by a specialist corrosion engineer accredited in CP systems; ongoing monitoring data is used to verify system performance and adjust output over the service life. An engineered, long-term solution used by building managers and body corporates as an alternative to full concrete replacement.",
    advantages: [
      "Addresses the electrochemical root cause of corrosion — extends structure life without full breakout",
      "Performance is measurable — system can be monitored and adjusted over service life",
    ],
    disadvantages: [
      "High capital cost — requires specialist design and installation by accredited applicator",
      "Ongoing operational and monitoring costs over the system's full service life",
    ],
  },
  "injection-resins-pu-flexible": {
    description:
      "Polyurethane (PU) flexible injection resins are used to seal cracks in concrete and masonry that are subject to ongoing movement, seasonal thermal cycling, or water ingress. The resin is pumped under low pressure through ports installed along the crack at regular intervals, filling the void and curing to a flexible elastomeric material that accommodates future movement. Expanding foam variants react with moisture present in the crack to form a water-stopping seal, making them the product of choice for wet and actively leaking cracks in basements, water-retaining structures, and below-grade construction. This is a sealing solution, not a structural one — PU injection does not restore tensile continuity across the crack. The cause of cracking should be investigated and, where active movement is ongoing, addressed before injection is undertaken.",
    advantages: [
      "Flexible when cured — accommodates future movement in live or dynamic cracks",
      "Expanding foam variants effectively seal water-active and wet cracks",
    ],
    disadvantages: [
      "Not structural — does not restore tensile continuity or section strength across the crack",
      "May re-open if crack movement exceeds the product's elongation capacity",
    ],
  },
  "injection-resins-epoxy-rigid": {
    description:
      "Epoxy rigid injection resins are structural adhesives injected under pressure into concrete cracks to restore full load transfer and tensile continuity across the fracture plane. The low-viscosity resin penetrates hairline cracks as narrow as 0.1 mm, bonding both crack faces as it cures to a high-strength rigid solid. Used by remedial engineers to repair structural cracks in beams, slabs, columns, and walls where continuity must be restored — typically specified as a precondition for the structure to return to its intended load use. The crack must be dry or only slightly damp for adequate bond development, and the multi-step injection process (port installation, chase sealing, low-pressure injection, grouting) requires experienced and licensed applicators with specialist equipment. Structural engineer sign-off is generally required after completion.",
    advantages: [
      "Restores structural continuity and full load transfer across the repaired crack",
      "Low viscosity variants penetrate hairline cracks down to 0.1–0.2 mm width",
    ],
    disadvantages: [
      "Rigid — crack may re-open or migrate if the original movement cause is not addressed",
      "Requires crack to be dry or only slightly damp — not effective in wet conditions",
    ],
  },
  "crack-injection-ports": {
    description:
      "Crack injection ports are small plastic fittings installed along the length of a concrete crack at regular intervals to provide controlled entry points for injection resins and grouts. They can be surface-mounted with structural adhesive (adhesive-bonded ports) or drilled and mechanically fixed into the crack (drill-in ports), and connect via Schrader or Luer fittings to injection pumps or cartridge guns. Correctly spaced ports — typically 150–300 mm centres depending on crack width, depth, and resin viscosity — are critical to ensuring the void is completely filled without uninjected zones remaining. After injection is complete, all ports are removed or broken off, holes are plugged with repair mortar, and the surface is restored. A consumable item — part of every crack injection system regardless of the resin type used.",
    advantages: [
      "Low unit cost — essential consumable component of any crack injection system",
      "Quick to install with surface-mount adhesive or drill-in methods",
    ],
    disadvantages: [
      "Must be correctly spaced (typically 150–300 mm) to ensure full resin penetration",
      "Surface-mount types can detach if substrate is not properly cleaned before bonding",
    ],
  },
  "sealants-polyurethane": {
    description:
      "Polyurethane sealants are flexible, movement-accommodating joint compounds used to seal construction joints, control joints, perimeter gaps, and dynamic cracks in concrete, masonry, and facade systems. In remedial building work they are specified to reinstate deteriorated joint sealant that has cracked, debonded, or lost elasticity, allowing water to penetrate into building structure and causing subsequent damage. Most products accommodate ±25–35% of joint width in movement and are paintable once cured, making them the default choice for restoration work where the finished appearance must match surrounding surfaces. Joint preparation — removing all existing sealant, priming the substrate, and installing a correctly sized backer rod — is as important as product selection for achieving a long service life. Widely used by waterproofing contractors, facade engineers, and remedial building practitioners.",
    advantages: [
      "Excellent movement accommodation — typically rated ±25–35% of joint width",
      "Paintable when cured — can be colour-matched to adjacent surfaces",
    ],
    disadvantages: [
      "Requires compatible primer on porous or chemically reactive substrates",
      "Cure rate is temperature-dependent — very slow below 10°C",
    ],
  },
  "sealants-silicone": {
    description:
      "Silicone sealants are high-performance movement-joint compounds used in exposed external locations, wet areas, and applications requiring long service life and resistance to UV degradation. In remedial building work they are used to replace failed silicone at balcony threshold joints, window perimeters, facade system interfaces, and waterproofing membrane terminations where polyurethane products would degrade under ongoing UV exposure. Silicone cures to a permanently flexible, water-resistant rubber that maintains its elastic properties across a temperature range of −50°C to +150°C and resists UV, ozone, and weathering better than most organic sealants. Unlike polyurethane, silicone is not paintable — colour must be selected at the time of installation. Incompatibility with polyurethane and adhesives means all silicone must be fully removed and substrate cleaned before a replacement sealant of a different chemistry can be applied.",
    advantages: [
      "Outstanding weather and UV resistance — preferred for exposed external applications",
      "Wide service temperature range (−50°C to +150°C), long service life",
    ],
    disadvantages: [
      "Not paintable — colour selection at time of application is permanent",
      "Incompatible with polyurethane sealants — surface contamination causes adhesion failure",
    ],
  },
  "backer-rods": {
    description:
      "Backer rods are closed-cell or open-cell foam cylinders inserted into a joint recess before sealant application, providing a backing that controls sealant depth and prevents three-sided adhesion. Correct sealant geometry — approximately 2:1 width-to-depth ratio — is critical for sealant performance: too deep a bead cannot stretch freely and will tear at the bond line under joint movement; three-sided adhesion prevents the sealant from functioning as intended. Backer rods are installed in all sealant joint reinstatements in concrete and masonry, whether the joint is an original construction joint or a chased slot cut specifically for new sealant. Diameter selection is based on joint width — the backer rod should compress approximately 25% when pushed into the joint to create a firm, consistent backing. Closed-cell polyethylene types are required with silicone sealants to prevent off-gassing and surface bubbling.",
    advantages: [
      "Maintains correct 2:1 width-to-depth sealant aspect ratio, preventing three-sided adhesion",
      "Reduces sealant volume required — improves economy on long joint runs",
    ],
    disadvantages: [
      "Over-sized backer rod stretches and may crack the sealant — diameter selection is critical",
      "Closed-cell type only with silicone sealants — open-cell causes off-gassing and bubbling",
    ],
  },
  "epoxy-anchoring-adhesives": {
    description:
      "Epoxy anchoring adhesives are two-component cartridge or pail products used to chemically fix reinforcing bars, dowels, rods, and anchor bolts into drilled holes in concrete or masonry. They are used wherever structural connections must be established into existing concrete without access to cast-in provisions — rebar laps, connection dowels, structural tie-backs, new column base plates, and post-installed anchors for new structural members. Products are selected based on anchor diameter, embedment depth, required load capacity, and environmental conditions, and ETA-assessed products are required for structural applications per AS 5216. Holes must be cleaned of all dust and debris — typically by compressed air blowing and brushing — to achieve full bond development between the adhesive, the anchor, and the concrete. Temperature management is important: bond strength is reduced below 10°C and pot life is shortened above 30°C.",
    advantages: [
      "High bond strength for rebar installation, dowels, and structural anchors in concrete",
      "Fast-cure formulations available for early loading requirements",
    ],
    disadvantages: [
      "Temperature sensitive — strength significantly reduced below 10°C",
      "Cannot be used in water-saturated holes without a specialist water-tolerant formulation",
    ],
  },
  "cfrp-strips-laminates": {
    description:
      "Carbon fibre reinforced polymer (CFRP) strips are thin, pre-cured composite laminates bonded to the tension face of concrete elements to restore or increase flexural, shear, or axial capacity. Specified by structural engineers as a non-invasive strengthening solution for beams, slabs, columns, and walls where load conditions have changed, section capacity has been reduced by corrosion or damage, or a change-of-use upgrade is required without adding structural depth or self-weight. CFRP is the lightest and highest-strength structural strengthening material available, with tensile strength typically 3–5× structural steel at less than 20% of the weight, and it does not corrode in aggressive environments. Application requires specialist accredited applicators, meticulous concrete surface preparation (minimum CSP 4), and a structural engineer overseeing the work to ensure the laminate is correctly positioned and bonded. Full-depth epoxy bond to sound concrete must be verified by tap testing after cure.",
    advantages: [
      "High tensile strength-to-weight ratio — up to 10× structural steel at less than 20% of the weight",
      "No corrosion risk — suitable for aggressive and marine-exposure environments",
    ],
    disadvantages: [
      "Highest material and installation cost of all structural strengthening options",
      "Not inherently fire-rated — additional intumescent protection is typically required",
    ],
  },
  "epoxy-laminating-resins": {
    description:
      "Epoxy laminating resins are the structural bonding matrix used in CFRP strengthening systems, applied between the prepared concrete substrate and the carbon fibre laminate or fabric to ensure full composite action is achieved. The resin must simultaneously wet out the fibre reinforcement and bond to the concrete surface — it is the critical interface between two very different materials and must be compatible with both the CFRP product and the concrete. Applied with notched trowels or rollers to achieve a controlled bond-line thickness, the resin must be correctly metered and mixed within its open time; temperature significantly affects working life and cure rate. Products are system-specific — they are not interchangeable between CFRP brands or systems, and must be used as specified in the engineer's repair scheme documentation. The complete laminate system is then covered with a top coat resin for protection.",
    advantages: [
      "Specifically formulated for CFRP bonding — ensures correct chemical key to fibre and concrete",
      "Viscosity engineered for correct fibre wet-out and inter-laminar bond",
    ],
    disadvantages: [
      "Short working life — typically 30–60 min at 20°C, faster in hot weather",
      "Not interchangeable between CFRP system brands — use the specified matched system only",
    ],
  },
  "non-shrink-grouts": {
    description:
      "Non-shrink grouts are precision cementitious or epoxy-based compounds used to fill the gap between structural steel baseplates, machinery bases, precast concrete connections, and any bearing surface where complete contact and zero shrinkage is essential for full load transfer. Any gap left by normal cement shrinkage beneath a loaded baseplate represents a stress concentration and a failure point — non-shrink grouts use expansive agents to offset shrinkage and ensure complete bearing contact. In remedial works they are used to reinstate deteriorated grout pads under columns, lift pits, and plant items, and to fill voids in precast structural connections. Available in free-flow, flowable, and trowel grades to suit placement geometry and access constraints. Very sensitive to over-watering on site — excess water reduces final strength and compromises the non-shrink characteristic.",
    advantages: [
      "Zero shrinkage ensures complete bearing under baseplates and precast connections",
      "High early compressive strength — typically 20–30 MPa at 24 hours",
    ],
    disadvantages: [
      "Very sensitive to water addition — excess water on site dramatically reduces final strength",
      "Must be placed in a single continuous pour — cold joints are a serious defect",
    ],
  },
  "structural-anchors-dowels": {
    description:
      "Structural anchors and dowels are stainless steel bars, rods, or proprietary fixings installed into existing concrete or masonry to connect new repair sections, tie loose or delaminated elements, or transfer load across a construction interface. Common applications include tying delaminated concrete facades back to the primary structure, installing shear dowels at construction joints, connecting new repair pours to existing slabs, and stabilising cracked masonry panels or parapets. Selection of anchor type, diameter, embedment length, and spacing pattern is the structural engineer's responsibility, supported by product ETA assessment and load testing data per AS 5216. Stainless steel grade 316 is specified for aggressive and coastal environments to ensure the anchor itself does not corrode and cause the very failure mechanism it was installed to prevent. Hole diameter, depth, and cleanliness are critical to developing the specified design bond.",
    advantages: [
      "Restores structural connection, load transfer, and continuity across a repaired section",
      "Grade 316 stainless steel provides long-term corrosion resistance in aggressive environments",
    ],
    disadvantages: [
      "Requires structural engineer specification for load, spacing, and minimum embedment depth",
      "Minimum edge distances and spacing must be strictly observed per manufacturer ETA data",
    ],
  },
  "reinforcement-mesh": {
    description:
      "Stainless steel reinforcement mesh is used in concrete overlays, slab reinstatements, and repair sections where corrosion resistance of the embedded reinforcement is required for long-term durability. The primary application is in carparks, marine structures, balconies, and podium slabs exposed to chloride from de-icing salts or marine spray, where mild steel mesh would eventually corrode and cause the repair to spall — replicating the original defect. Grade 316 stainless does not corrode under chloride exposure, eliminating the risk of spalling from the new overlay throughout its design service life. The mesh is cut to fit the repair geometry and placed at correct cover depth with appropriate plastic or stainless spacers before repair mortar is placed over it. Significantly more expensive than conventional mild steel mesh, it is specified on the basis of whole-of-life cost and residual risk rather than initial cost.",
    advantages: [
      "Distributes loads and controls crack propagation in concrete overlays and repair slabs",
      "Grade 316 stainless resists chloride-induced corrosion in exposed or marine environments",
    ],
    disadvantages: [
      "Requires minimum 20 mm cover concrete — cannot be used in very thin overlays",
      "Stainless steel mesh is significantly more expensive than mild steel mesh — budget impact",
    ],
  },
  "lime-repointing-mortars": {
    description:
      "Lime repointing mortars are blends of natural hydraulic lime (NHL) and sand used to reinstate deteriorated mortar joints in historic, heritage, or older masonry construction. Portland cement repointing of pre-1960s brickwork is one of the most common causes of accelerated masonry deterioration — the hard, impermeable cement mortar traps moisture within the wall, which migrates through the softer masonry units and causes spalling and salt crystallisation damage. Lime mortar is softer and more permeable than the surrounding brickwork, allowing moisture to evaporate preferentially through the joint and protecting the masonry from within. Specified by heritage consultants and building inspectors for repointing works on pre-war and inter-war brick buildings; the correct NHL classification and aggregate grading must match the original mortar properties to avoid stress concentrations. Slow-curing and requires protection from rain, frost, and direct sun during the curing period.",
    advantages: [
      "Breathable — allows moisture vapour to escape, protecting masonry from dampness",
      "Correct compressive strength match protects masonry units from stress concentration",
    ],
    disadvantages: [
      "Slow curing — requires protection from rain and frost for minimum 72 hours",
      "Must be sourced from specialist lime mortar suppliers to ensure correct NHL classification",
    ],
  },
  "sealant-primers": {
    description:
      "Sealant primers are solvent- or water-based chemical adhesion promoters applied to joint substrate surfaces before sealant installation to improve bond strength, adhesion width, and long-term service life. Most sealant manufacturer systems require a compatible primer on both porous substrates (concrete, masonry, fibre cement) and non-porous substrates (glass, aluminium, anodised surfaces) to achieve warranted adhesion performance. In remedial joint reinstatement — where the substrate surface may be contaminated with old sealant residue, laitance, or calcium deposits — correct priming is especially critical to establishing reliable bond. Primers are product-specific: using a primer from a different brand can reduce rather than improve adhesion, and the specified application and overcoating window (typically 30–90 minutes) must be strictly observed before sealant placement. Part of a warranted joint sealing system — omitting the primer voids the product warranty.",
    advantages: [
      "Improves sealant adhesion and service life on porous or chemically reactive substrates",
      "Required component in the manufacturer's warranted system — do not omit",
    ],
    disadvantages: [
      "Application and overcoating adhesion window must be strictly observed (typically 30–90 min)",
      "Product-specific — primers are not interchangeable between different sealant brands",
    ],
  },
  "curing-compounds": {
    description:
      "Curing compounds are liquid coatings — typically acrylic or wax-based emulsions — applied by roller or spray to freshly placed concrete or repair mortar surfaces to form a continuous membrane that retards moisture evaporation during the critical early curing period. Proper curing is essential for repair mortars: rapid moisture loss in the first 24–72 hours causes plastic shrinkage cracking and prevents full strength and bond development. A curing compound provides a practical, single-coat alternative to continuous wet curing with hessian and polythene, significantly reducing labour on exposed horizontal surfaces. The membrane must be fully removed — typically by mechanical abrasion — before any subsequent overlay, coating, or bonded topping is applied, as curing compound residue on the surface will prevent adhesion. Products should comply with AS 2990 or equivalent curing efficiency standards.",
    advantages: [
      "Single-coat application significantly reduces labour vs wet curing methods",
      "Liquid-applied film prevents rapid moisture loss and plastic shrinkage cracking",
    ],
    disadvantages: [
      "Residue must be mechanically removed before any coating or overlay is applied",
      "Not suitable as sole curing method for high-performance or structurally critical concrete",
    ],
  },
  "curing-sheeting": {
    description:
      "Polythene curing sheeting is heavy-duty plastic film used to cover freshly placed concrete or repair mortar and maintain a moist, closed environment throughout the required curing period — typically 3 to 7 days for repair mortars and specialist cementitious systems. Wet curing is the most reliable method of achieving full design strength and minimising shrinkage cracking; the sheet traps evaporating moisture within the repair, keeping the surface hydrated without requiring continuous water application. Unlike curing compounds, polythene sheeting leaves no surface residue and is therefore preferred in repairs that will subsequently receive bonded overlays, coatings, or primers where adhesion is critical. The sheet must be weighted or taped down to maintain contact with the fresh surface, kept wet between changes if not continuous, and re-applied promptly if disturbed by wind or site traffic.",
    advantages: [
      "Low-cost wet curing — no residue on surface, no adhesion concerns for overlays",
      "Ideal for horizontal surfaces where liquid compounds may run off",
    ],
    disadvantages: [
      "Labour-intensive to install, keep wet, and maintain over the full curing period",
      "Wind uplift on exposed sites — must be weighted or taped down continuously",
    ],
  },
  "formwork-timber": {
    description:
      "Formwork timber — typically dressed all round (DAR) pine or hardwood framing members — provides the structural framework and support for formed concrete sections including repair pours, cast-in-situ column encasements, slab edge works, and structural infills. In remedial concrete works, timber formwork is constructed to encase columns, beams, and slab soffits where the repaired section must be confined during placement and curing to achieve the design profile. The formwork system must be designed by or under the supervision of an experienced formwork carpenter to safely resist the imposed fresh concrete head pressure without deflection or blowout. Most formwork in remedial work uses DAR pine framing with plywood sheet facing, secured with form ties and braced with props. Formwork is typically stripped within 24–72 hours once the repair mortar or concrete achieves sufficient green strength.",
    advantages: [
      "Flexible and easy to cut, notch, and fix with standard carpentry tools on site",
      "Readily available from all timber merchants and hardware stores",
    ],
    disadvantages: [
      "Requires experienced formwork carpenter to design and brace for safe concrete loads",
      "Moisture cycles cause swelling and warping — affects formed surface quality",
    ],
  },
  "formwork-plywood": {
    description:
      "Structural formwork plywood — typically 17 mm film-faced or marine-grade ply — is used as the formed face of concrete and repair mortar pours where a smooth, consistent surface finish is required. In remedial works it is used for column encasements, beam soffit shutters, and slab edge forms where the aesthetic quality of the formed face is important for the completed repair. Plywood is fixed to the timber framing with nails or screws, treated with a form release agent before every pour, and stripped after the concrete achieves sufficient strength for self-support. Edges must be sealed with tape or sealant to prevent moisture penetrating the face veneers and causing delamination during wet curing, which would leave an uneven surface impression on subsequent pours. With good maintenance, plywood panels can be reused multiple times, reducing material cost on larger repair programmes.",
    advantages: [
      "Provides smooth, consistent concrete face finish with proper release agent",
      "Multiple reuses possible with edge sealing and release agent maintenance",
    ],
    disadvantages: [
      "Edges must be sealed — moisture delamination at exposed edges is a major failure mode",
      "Bowing between supports requires closer stud spacing on large panels",
    ],
  },
  "form-release-agents": {
    description:
      "Form release oils and compounds are chemical agents applied to formwork surfaces before concrete or repair mortar is cast against them, preventing the hardened material from bonding to the form face and enabling clean, damage-free stripping. Without a release agent applied to every formed surface, stripping causes surface tears, honeycombing, aggregate pull-out, and structural damage to the repair — and the damaged surface would require further remediation. Most products are light petroleum, plant oil, or emulsion-based, applied in a thin, even coat by brush, roller, or pump spray. The agent must be kept strictly off reinforcing steel and any substrate surface where the repair mortar must form a bond, as contamination will cause adhesion failure of the repair. An essential consumable item on every concrete repair job that involves formed sections.",
    advantages: [
      "Prevents bond between concrete and formwork — essential for damage-free stripping",
      "Extends formwork reuse life and reduces labour for cleaning between pours",
    ],
    disadvantages: [
      "Must be kept strictly off rebar and substrate where bond is required",
      "Over-application causes surface staining and bug holes in the formed concrete face",
    ],
  },
  "tie-wire-fixings": {
    description:
      "Tie wire is annealed mild steel or galvanised wire, typically 1.6 mm diameter, used to secure reinforcing bars at intersections and maintain the designed bar spacing and cover depth within the rebar cage prior to concrete or repair mortar placement. In remedial rebar works, tie wire is used to fix new replacement or supplementary bars alongside or adjacent to corroded steel, and to fix mesh sheets and fabric reinforcement at the correct cover depth with plastic or stainless spacers. The wire itself does not carry structural load — its purpose is to maintain the cage geometry during mortar placement and vibration, ensuring the designed concrete cover and reinforcement arrangement are achieved. Stainless or galvanised wire is required in aggressive or marine environments where carbon steel tie wire tails could initiate surface corrosion staining on the repair surface.",
    advantages: [
      "Very low cost — minimal addition to project materials budget",
      "Simple to use with standard pliers or hand tying tools",
    ],
    disadvantages: [
      "Protruding tails must be bent in — exposed ends can initiate surface corrosion",
      "Not structural — tie wire positions the rebar cage only, does not carry load",
    ],
  },
  "cement-aggregates": {
    description:
      "Portland cement, clean washed sand, and graded coarse aggregate are the fundamental raw materials for site-batched concrete and repair mortars used in remedial works where pre-bagged proprietary products are not specified or where large volumes make site batching more economical. Mix design — cement-to-aggregate ratios, water-to-cement ratio, and aggregate grading — must be controlled by an experienced operator to achieve the required compressive strength and minimise shrinkage cracking; poor proportioning affects all performance properties. Portland cement should comply with AS 3972 Type GP and aggregates with AS 2758.1 for cleanliness, particle shape, and grading. Site-batched mixes are commonly used for void-filling, large encasement pours, concrete slabs, and screed beds where the volume is too large for pre-bagged products. The water-to-cement ratio is the single most important variable — excess mix water causes reduced strength, increased shrinkage, and reduced durability.",
    advantages: [
      "Available through general builders suppliers — cost-effective for large-volume fills",
      "Can be custom-batched on site to meet specific mix design requirements",
    ],
    disadvantages: [
      "Mix quality is entirely operator-dependent — poor proportioning affects all properties",
      "Shrinkage must be managed through correct w/c ratio — excess water causes cracking",
    ],
  },
  "abrasives-blades-tools": {
    description:
      "Diamond cutting blades, crack chasing blades, and angle grinder abrasive discs are the principal cutting and surface preparation tools used in concrete remediation works before any repair product is placed. Diamond blades are used to saw-cut around the perimeter of spalled areas, saw-chase cracks for injection port preparation, and cut existing sealant joints for reinstatement — they require water cooling on reinforced concrete to prevent overheating and blade glazing. Angle grinder discs are used for concrete surface profiling, removal of carbonated or contaminated laitance, and preparation of feathered edges at repair perimeters to achieve the minimum CSP (concrete surface profile) specified by the repair mortar manufacturer. Both are consumable items; blade and disc selection (bond hardness, diamond concentration, grit size) must match the concrete hardness and application to achieve cost-effective service life. Use of these tools generates respirable crystalline silica (RCS) dust — a mandatory silica risk assessment and RPF3 respirator are required.",
    advantages: [
      "Diamond blades provide precise, clean cuts through reinforced concrete",
      "Available from tool hire, hardware, and abrasives suppliers nationally",
    ],
    disadvantages: [
      "Consumable — blades blunt rapidly on hard or abrasive aggregates",
      "Generates respirable silica dust — RPF3 respirator and engineering controls mandatory",
    ],
  },
  "edge-forms-accessories": {
    description:
      "Edge forms are steel or plastic angle section profiles pinned or adhesive-anchored to slab perimeters and step edges to contain and shape repair mortar placed at slab edges, step nosings, and kerb returns where a free-standing vertical formed face is required without full framework. Common applications include slab edge spall repairs on carpark decks, step nosing reinstatement on stair flights, and kerb and gutter edge repairs where mortar would otherwise slump before achieving sufficient green strength to self-support. The form section is levelled and aligned to the finished profile before mortar is placed against it, and stripped after initial set or left permanently as an edge angle protection depending on product type. Steel angle forms are reusable; plastic 'stay-in-place' forms provide permanent edge protection and are sometimes specified on carpark deck edges as a protective element. Essential on any edge repair where a sharp, defined arris is required.",
    advantages: [
      "Ensures consistent slab edge profile and prevents mortar slumping during placement",
      "Steel and plastic angle forms are reusable across multiple pours",
    ],
    disadvantages: [
      "Requires precise levelling and alignment before mortar placement",
      "Profile must suit local edge geometry — custom forms may be required",
    ],
  },
  "moisture-suppression-primers": {
    description:
      "Moisture suppression primers are the critical first step in any magnesite flooring encapsulation or overlay system. Magnesite (magnesium oxychloride screed) is hygroscopic — it absorbs moisture from below and generates osmotic pressure that destroys adhesive bonds and blisters coatings and floor coverings. A moisture-tolerant epoxy primer forms a vapour-suppressing membrane directly over the prepared magnesite surface, dramatically reducing moisture vapour emission rate (MVER) to levels compatible with self-levelling underlayments and adhesive floor covering systems. Independent in-situ moisture testing to ASTM F2170 (relative humidity probe) or anhydrous calcium chloride testing to AS 1884 is mandatory before primer selection — different primers have different maximum RH tolerances. Two-part epoxy systems are preferred where moisture levels are elevated. Correct primer selection and application is the single most important factor in the long-term performance of a magnesite overlay system.",
    advantages: [
      "Creates a vapour-suppressing membrane that prevents moisture-driven failure of overlays and adhesives",
      "Two-part epoxy systems tolerant of high substrate RH — appropriate for moisture-affected magnesite",
    ],
    disadvantages: [
      "Application over friable, actively corroding, or heavily contaminated magnesite will fail — full assessment and spot repair mandatory first",
      "Each system has a maximum RH tolerance — independent testing required to select appropriate primer",
    ],
  },
  "self-levelling-underlayments": {
    description:
      "Self-levelling underlayments (SLUs) are poured cement-based compounds that spread under their own flow to produce a smooth, flat surface over prepared and primed magnesite prior to installation of new floor coverings. They are essential in magnesite remediation where the existing screed surface has become uneven, damaged, or corroded, and where hard floor coverings such as timber, vinyl, tile, or carpet require a flat, stable substrate within tight planarity tolerances (typically ±3 mm under a 3 m straight edge). SLUs must be applied over a moisture-suppression primer — never directly to unprepared or damp magnesite. Products are mixed with a measured volume of water and poured onto the primed surface, spreading to a uniform thickness of 3–20 mm without screeding. Coverage is approximately 1.6–1.7 kg/m² per mm of depth. Rapid-setting variants allow floor coverings to be installed within 24 hours.",
    advantages: [
      "Produces a flat substrate within tight planarity tolerances required for hard floor coverings",
      "Self-levels without screeding — faster and more consistent than hand-laid screeds",
    ],
    disadvantages: [
      "Must not be applied directly to magnesite — moisture suppression primer is a mandatory prerequisite",
      "Application requires a continuous pour — cold joints between pours may crack or curl at edges",
    ],
  },
  "floor-patching-compounds": {
    description:
      "Floor patching compounds are thin-section repair mortars used to fill localised depressions, spalled areas, saw-cut edges, and surface irregularities in magnesite or concrete substrates before a self-levelling compound or floor covering is applied. They are trowel-applied and can feather to a near-zero edge — unlike self-levelling compounds which have a minimum 2–3 mm application thickness. Commonly used as a pre-levelling repair step to address spot damage and high-to-low transitions too deep or too localised for SLU alone. Polymer-modified types offer improved adhesion and reduced shrinkage. Rapid-setting variants allow same-day progression to SLC application. Must be applied over a primed surface and must not be used to fill large-volume deficiencies where an SLU would be more appropriate.",
    advantages: [
      "Can be feathered to near-zero edge for localised transitions and surface irregularities",
      "Rapid-setting formulations allow same-day progression to self-levelling compound application",
    ],
    disadvantages: [
      "Not suitable for large-volume levelling — use self-levelling compound for areas exceeding 5 mm depth over large areas",
      "Requires surface priming — adhesion will fail on unprimed or contaminated substrates",
    ],
  },
  "floor-grinding-preparation": {
    description:
      "Surface preparation by mechanical grinding is mandatory before any magnesite encapsulation or overlay system. The grinding process achieves CSP 2 surface profile (ICRI 310.2), removes surface laitance, contaminants, old adhesive residues, and loose material, and opens the substrate pores for primer penetration and adhesion. CRITICAL SAFETY REQUIREMENT: magnesite dust is a respiratory and skin irritant containing magnesium chloride compounds. All grinding of magnesite must be carried out with M-class or H-class HEPA dust extraction connected directly to the grinder at all times. Under no circumstances should magnesite be ground dry without extraction. Collected dust must be disposed of as chemical waste and not emptied into general building waste. Full PPE including P2 respirator, eye protection, and nitrile gloves is mandatory. A Safe Work Method Statement (SWMS) is required under WHS regulations before commencing magnesite grinding on any commercial or Class 2 building site.",
    advantages: [
      "Mechanical grinding achieves consistent CSP 2 profile required for primer adhesion",
      "Diamond tooling allows controlled material removal without damaging underlying concrete slab",
    ],
    disadvantages: [
      "HEPA M-class or H-class extraction is mandatory — dry grinding without extraction is not acceptable",
      "SWMS required under WHS regulations before commencing — magnesite dust is a hazardous substance",
    ],
  },
};

export const MATERIAL_PRICES: Record<string, string> = {
  "Concrete repair mortar (polymer-modified)": "$80 – $110 / bag (20–25 kg)",
  "Cementitious repair mortar": "$65 – $95 / bag (20–25 kg)",
  "Epoxy repair mortar": "$130 – $195 / kit (5 kg)",
  "Bonding agent / SBR latex": "$45 – $75 / 5 L",
  "Reinforcement primer (epoxy/zinc-rich)": "$90 – $150 / kit (1 L)",
  "Reinforcement primer (2-part epoxy)": "$90 – $150 / kit (1 L)",
  "Curing compound (acrylic)": "$35 – $60 / 5 L",
  "Polythene sheeting (curing)": "$15 – $35 / roll",
  "Formwork timber (DAR pine)": "$8 – $18 / lin. m",
  "Formwork plywood (17 mm)": "$75 – $130 / sheet",
  "Formwork (full encasement)": "$85 – $180 / m² (installed)",
  "Form release oil": "$28 – $50 / 5 L",
  "Tie wire (1.6 mm)": "$12 – $22 / roll",
  "Portland cement": "$18 – $28 / 20 kg bag",
  "Sand (washed river sand)": "$60 – $95 / tonne",
  "Coarse aggregate (10 mm)": "$50 – $85 / tonne",
  "Saw-cut crack chaser blade (diamond)": "$90 – $280 / blade",
  "Saw-cut crack chaser blade": "$90 – $280 / blade",
  "Angle grinder disc (grinding)": "$5 – $18 / disc",
  "Masking tape": "$5 – $12 / roll",
  "Rust inhibitor / corrosion inhibitor (migrating)": "$95 – $175 / 5 L",
  "Epoxy zinc-rich primer": "$90 – $160 / kit (1 L)",
  "Cathodic protection anodes (zinc/titanium)": "$180 – $900+ / engineered system",
  "Stainless steel rebar (316 grade)": "$50 – $110 / 6 m bar",
  "Epoxy adhesive (rebar anchoring)": "$55 – $95 / 300 mL",
  "Epoxy adhesive (anchoring)": "$55 – $95 / 300 mL",
  "Epoxy adhesive (port adhesive)": "$45 – $85 / 300 mL",
  "Epoxy paste (port adhesive)": "$45 – $85 / 300 mL",
  "Carbon-fibre reinforcement strip (CFRP)": "$90 – $190 / m",
  "Epoxy laminating resin (CFRP bonding)": "$120 – $200 / kit (1 L)",
  "CFRP epoxy primer & laminating resin": "$120 – $200 / kit (1 L)",
  "Polyurethane injection resin (flexible)": "$85 – $150 / 600 mL",
  "Polyurethane injection resin (expanding)": "$85 – $155 / 600 mL",
  "Epoxy injection resin (rigid, structural)": "$95 – $175 / 300 mL",
  "Flexible epoxy injection resin": "$95 – $175 / 300 mL",
  "Crack injection ports (surface-mounted)": "$2 – $8 / port",
  "Crack injection ports": "$2 – $8 / port",
  "Polyurethane sealant (flexible joint)": "$25 – $55 / 600 mL",
  "Polyurethane sealant (movement joint)": "$25 – $55 / 600 mL",
  "Polyurethane sealant": "$25 – $55 / 600 mL",
  "Backer rod (closed-cell foam)": "$2 – $6 / lin. m",
  "Backer rod": "$2 – $6 / lin. m",
  "Silicone sealant (movement joint)": "$20 – $45 / 300 mL",
  "Primer for sealant (silicone/polyurethane)": "$35 – $70 / 500 mL",
  "Primer for sealant": "$35 – $70 / 500 mL",
  "Helical stainless-steel tie bars (Helifix)": "$12 – $28 / bar",
  "Masonry repair mortar": "$65 – $95 / 20 kg bag",
  "Lime mortar (repointing)": "$55 – $90 / 20 kg bag",
  "Stainless steel dowels / anchors": "$8 – $50 / anchor (size dependent)",
  "Post-installed anchor bolts (stainless)": "$15 – $70 / bolt (size dependent)",
  "Non-shrink grout": "$55 – $95 / 25 kg bag",
  "Concrete repair mortar": "$75 – $105 / 20 kg bag",
  "Epoxy repair mortar (structural)": "$130 – $195 / kit (5 kg)",
  "Stainless steel reinforcement mesh": "$85 – $165 / m²",
  "Edge form (steel/plastic angle)": "$18 – $45 / lin. m",
  "Wire brush (steel)": "$8 – $22 / brush",
  "Grit blast media (steel grit)": "$45 – $95 / 25 kg bag",
};

// Product image URLs — verified live May 2026.
// Key: "brandKey_categorySlug" (category-level, index 0) or "brandKey_categorySlug_N" (per-row).
// Sika: consumer-range products stocked at Bunnings — use Bunnings CDN (proxied via next/image).
// Ardex, Fosroc: trade products sourced from WPD Group (wpdgroup.com.au) Shopify CDN.
// Tremco and Parchem have no publicly accessible product images — cards show a branded gradient.
// Rule: only include images verified to match the exact product shown in the data.
export const BRAND_PRODUCT_IMAGES: Record<string, string> = {
  // ── Sika (Bunnings CDN and WPD) ─────────────────────────────────────────────
  // Polymer-modified mortars: row 0 = MonoTop-352NFG, row 2 = MonoTop-412N (fine)
  "brandSika_repair-mortars-polymer-modified":
    "https://media.bunnings.com.au/api/public/content/13c0492d1b5f4ca7b9dc8e025f35f45d?v=ecc39504&t=w300dpr1",
  "brandSika_repair-mortars-polymer-modified_2":
    "https://www.wpdgroup.com.au/cdn/shop/products/SikaMonotop412NFG_800x.jpg",
  // Cementitious: MonoTop-436N (no confirmed WPD image for 436N — gradient placeholder shown)
  "brandSika_sealants-polyurethane":
    "https://media.bunnings.com.au/api/public/content/35762044046948889102e2099935dcd0?v=f3087bba&t=w300dpr1",
  "brandSika_sealants-silicone":
    "https://media.bunnings.com.au/api/public/content/f6ae311c9aa84fdb9e28d7ce316e0144?v=5ce5227d&t=w300dpr1",
  "brandSika_epoxy-anchoring-adhesives":
    "https://media.bunnings.com.au/api/public/content/0b5421f6721946e18f9903f545cc9174?v=a270a795&t=w300dpr1",
  "brandSika_sealant-primers":
    "https://media.bunnings.com.au/api/public/content/76d878305ec041cbb479f5e0cb556408?v=d1d7ff34&t=w300dpr1",
  "brandSika_non-shrink-grouts":
    "https://media.bunnings.com.au/api/public/content/8fa6f36841874b5a972f21c70207c8f5?v=27cfd2fa&t=w300dpr1",
  // ── Ardex (WPD Group / Waterproofing Direct CDN) ─────────────────────────────
  // Polymer-modified: row 0 = BR 340 (general/high-build)
  "brandArdex_repair-mortars-polymer-modified":
    "https://www.wpdgroup.com.au/cdn/shop/products/Ardex_BR_34_1600x1600_6fc6e9cb-f966-4c54-b7ee-3b97bed5e6a4_800x.jpg",
  // Cementitious: BR 340
  "brandArdex_cementitious-repair-mortars":
    "https://www.wpdgroup.com.au/cdn/shop/products/Ardex_BR_34_1600x1600_6fc6e9cb-f966-4c54-b7ee-3b97bed5e6a4_800x.jpg",
  "brandArdex_bonding-agents-sbr-latex":
    "https://www.wpdgroup.com.au/cdn/shop/products/ArdexP511600x1600_dee7f23d-3936-4bb3-a9d5-b90db1e9f814_800x.jpg",
  // ── Fosroc (WPD Group / Waterproofing Direct CDN) ────────────────────────────
  // Polymer-modified: row 0 = Renderoc HB, row 1 = Renderoc LA55
  "brandFosroc_repair-mortars-polymer-modified":
    "https://www.wpdgroup.com.au/cdn/shop/products/FosrocRenderocHB_800x.jpg",
  "brandFosroc_repair-mortars-polymer-modified_1":
    "https://www.wpdgroup.com.au/cdn/shop/products/FosrocRenderocLA55_800x.jpg",
  "brandFosroc_bonding-agents-sbr-latex":
    "https://www.wpdgroup.com.au/cdn/shop/products/FosrocNitobondHAR_800x.jpg",
  "brandFosroc_rebar-primers-inhibitors":
    "https://www.wpdgroup.com.au/cdn/shop/products/FosrocNitoprimeZincrich_800x.jpg",
  "brandFosroc_epoxy-zinc-rich-primers":
    "https://www.wpdgroup.com.au/cdn/shop/products/FosrocNitoprimeZincrich_800x.jpg",
  "brandFosroc_sealants-polyurethane":
    "https://www.wpdgroup.com.au/cdn/shop/products/NitosealPU4001600x1600_800x.jpg",
  // ── Ardex sealants (WPD Group / Waterproofing Direct CDN) ────────────────────
  "brandArdex_sealants-polyurethane":
    "https://www.wpdgroup.com.au/cdn/shop/products/ArdexST_800x.jpg",
  "brandArdex_sealants-silicone":
    "https://www.wpdgroup.com.au/cdn/shop/files/Ardex_SE_800x.png",
  // ── Tremco — only confirmed product-matched images included ──────────────────
  "brandTremco_sealants-polyurethane":
    "https://www.wpdgroup.com.au/cdn/shop/files/TremcoDymonic100_800x.jpg",
  // ── Injection resins — epoxy rigid (Sikadur 52, Ardex RA144) ─────────────────
  "brandSika_injection-resins-epoxy-rigid":
    "https://www.wpdgroup.com.au/cdn/shop/files/Sikadur_52_800x.png",
  "brandArdex_injection-resins-epoxy-rigid":
    "https://www.wpdgroup.com.au/cdn/shop/products/ArdexRA1441600x1600_800x.jpg",
  // ── Injection resins — PU flexible (Ardex RA56) ───────────────────────────────
  "brandArdex_injection-resins-pu-flexible":
    "https://www.wpdgroup.com.au/cdn/shop/products/ArdexRA561600x1600_e9b7cebf-a0c1-435a-afc8-fa9824afc176_800x.jpg",
  // ── Corrosion inhibitors / rebar primers / epoxy zinc-rich (Sika Ferrogard-903+)
  "brandSika_corrosion-inhibitors-mci":
    "https://www.wpdgroup.com.au/cdn/shop/products/SIKA-FERROGARD-903-PLUS_800x.png",
  "brandSika_rebar-primers-inhibitors":
    "https://www.wpdgroup.com.au/cdn/shop/products/SIKA-FERROGARD-903-PLUS_800x.png",
  "brandSika_epoxy-zinc-rich-primers":
    "https://www.wpdgroup.com.au/cdn/shop/products/SIKA-FERROGARD-903-PLUS_800x.png",
  // ── Crack injection ports (Ardex T-Port) ─────────────────────────────────────
  "brandArdex_crack-injection-ports":
    "https://www.wpdgroup.com.au/cdn/shop/products/ArdexInjectionT-Port1600x1600_800x.jpg",
  // ── Sealant primers ───────────────────────────────────────────────────────────
  "brandArdex_sealant-primers":
    "https://www.wpdgroup.com.au/cdn/shop/products/ArdexMultiprimer_5ad94c2a-6efb-4f1b-9710-7ab7edece8ce_800x.jpg",
  "brandTremco_sealant-primers":
    "https://www.wpdgroup.com.au/cdn/shop/files/Vulkem-171-Primer_800x.png",
  // ── Epoxy anchoring adhesives (Ardex RA88 Plus) ───────────────────────────────
  "brandArdex_epoxy-anchoring-adhesives":
    "https://www.wpdgroup.com.au/cdn/shop/files/Ardex_RA88_Plus_254_ml_800x.png",
};

export interface RetailerPrice {
  name: string;
  url: string;
  price: string;
  gst: "inc GST" | "exc GST";
}

// Online retailer prices — max 3 per brand+category, cheapest first.
// Retailers: Bldcare (bldcare.com.au), Komerco (komerco.com.au),
//            Waterproofing Direct (wpdgroup.com.au), Bunnings.
// All prices inc GST as shown on each retailer site.
export const RETAILER_PRICES: Record<string, RetailerPrice[]> = {
  // ── Sika — Polymer-modified repair mortars ───────────────────────────────────
  "brandSika_repair-mortars-polymer-modified": [
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/sika-monotop-352-nfg-20kg", price: "$66.50", gst: "inc GST" },
    { name: "Komerco", url: "https://komerco.com.au/products/sika-monotop-352-nfg", price: "$72.95", gst: "inc GST" },
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-products/184-sika-monotop-352-nfg-20kg-bag.html", price: "$75.00", gst: "inc GST" },
  ],
  // ── Ardex — Polymer-modified repair mortars ──────────────────────────────────
  "brandArdex_repair-mortars-polymer-modified": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-products/65-ardex-br-340-microtec-fibre-reinforced-patching-mortar-20kg.html", price: "$71.50", gst: "inc GST" },
    { name: "Komerco", url: "https://komerco.com.au/products/ardex-br-340", price: "$81.50", gst: "inc GST" },
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/ardex-br-340-high-build-patching-mortar-20kg", price: "$100.46", gst: "inc GST" },
  ],
  // ── Fosroc — Polymer-modified repair mortars ─────────────────────────────────
  "brandFosroc_repair-mortars-polymer-modified": [
    { name: "Komerco", url: "https://komerco.com.au/products/fosroc-renderoc-hb40", price: "$79.95", gst: "inc GST" },
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-repair-mortars/278-fosroc-renderoc-hb40-20kg.html", price: "$83.50", gst: "inc GST" },
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/fos-renderoc-hb40-20kg", price: "$121.66", gst: "inc GST" },
  ],
  // ── Sika — Cementitious repair mortars ──────────────────────────────────────
  "brandSika_cementitious-repair-mortars": [
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/sika-monotop-436-n-20kg", price: "$57.50", gst: "inc GST" },
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-products/288-sika-monotop-436n-20kg.html", price: "$68.00", gst: "inc GST" },
    { name: "Komerco", url: "https://komerco.com.au/products/monotop-436n", price: "$71.50", gst: "inc GST" },
  ],
  // ── Ardex — Cementitious repair mortars (BR 340 — same product as polymer-modified row 0)
  "brandArdex_cementitious-repair-mortars": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-products/65-ardex-br-340-microtec-fibre-reinforced-patching-mortar-20kg.html", price: "$71.50", gst: "inc GST" },
    { name: "Komerco", url: "https://komerco.com.au/products/ardex-br-340", price: "$81.50", gst: "inc GST" },
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/ardex-br-340-high-build-patching-mortar-20kg", price: "$100.46", gst: "inc GST" },
  ],
  // ── Fosroc — Cementitious (Renderoc GP — no confirmed online retail URL; contact Fosroc directly)
  // ── Sika — Epoxy repair mortars ──────────────────────────────────────────────
  "brandSika_epoxy-repair-mortars": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-products/260-sikaquick-2500-20kg.html", price: "$70.00", gst: "inc GST" },
    { name: "Komerco", url: "https://komerco.com.au/products/sika-quick-2500-au", price: "$73.95", gst: "inc GST" },
    { name: "Bunnings", url: "https://www.bunnings.com.au/sika-20kg-sikaquick-2500-au-rapid-hardening-repair-mortar_p0760435", price: "$79.53", gst: "inc GST" },
  ],
  // ── Fosroc — Bonding agents / SBR latex ─────────────────────────────────────
  "brandFosroc_bonding-agents-sbr-latex": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-repair-mortars/281-fosroc-nitobond-har.html", price: "$74.00", gst: "inc GST" },
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/fosroc-nitobond-har", price: "$105.65", gst: "inc GST" },
  ],
  // ── Ardex — Rebar primers ────────────────────────────────────────────────────
  "brandArdex_rebar-primers-inhibitors": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-products/64-ardex-br10-zinc-primer-1l.html", price: "$124.00", gst: "inc GST" },
  ],
  // ── Fosroc — Rebar primers ───────────────────────────────────────────────────
  "brandFosroc_rebar-primers-inhibitors": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-repair-mortars/254-fosroc-nitoprime-zincrich-1l.html", price: "$142.00", gst: "inc GST" },
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/nitoprimezincrich-1l-drum", price: "$230.02", gst: "inc GST" },
  ],
  // ── Ardex — Epoxy zinc-rich primers ─────────────────────────────────────────
  "brandArdex_epoxy-zinc-rich-primers": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-products/64-ardex-br10-zinc-primer-1l.html", price: "$124.00", gst: "inc GST" },
  ],
  // ── Fosroc — Epoxy zinc-rich primers ────────────────────────────────────────
  "brandFosroc_epoxy-zinc-rich-primers": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-repair-mortars/254-fosroc-nitoprime-zincrich-1l.html", price: "$142.00", gst: "inc GST" },
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/nitoprimezincrich-1l-drum", price: "$230.02", gst: "inc GST" },
  ],
  // ── Sika — Polyurethane sealants ─────────────────────────────────────────────
  "brandSika_sealants-polyurethane": [
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/sikaflex-construction-ap", price: "$19.44", gst: "inc GST" },
    { name: "Bunnings", url: "https://www.bunnings.com.au/sika-310ml-white-sikaflex-pro-polyurethane-sealant-310ml-white_p0083587", price: "$24.03", gst: "inc GST" },
  ],
  // ── Fosroc — Polyurethane sealants ───────────────────────────────────────────
  "brandFosroc_sealants-polyurethane": [
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/nitoseal-pu400", price: "$22.96", gst: "inc GST" },
  ],
  // ── Tremco — Polyurethane sealants ───────────────────────────────────────────
  "brandTremco_sealants-polyurethane": [
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/tremco-dymonic-100", price: "$29.08", gst: "inc GST" },
  ],
  // ── Sika — Silicone sealants ─────────────────────────────────────────────────
  "brandSika_sealants-silicone": [
    { name: "Bunnings", url: "https://www.bunnings.com.au/sika-300ml-grey-sikaseal-roof-and-gutter-silicone-sealant_p1210303", price: "$15.00", gst: "inc GST" },
  ],
  // ── Ardex — Silicone sealants ────────────────────────────────────────────────
  "brandArdex_sealants-silicone": [
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/ardex-se", price: "$23.15", gst: "inc GST" },
  ],
  // ── Sika — Epoxy anchoring adhesives ────────────────────────────────────────
  "brandSika_epoxy-anchoring-adhesives": [
    { name: "Bunnings", url: "https://www.bunnings.com.au/sika-250ml-grey-anchorfix-3001-chemical-anchoring-adhesive_p0349114", price: "$39.95", gst: "inc GST" },
    { name: "Bldcare", url: "https://www.bldcare.com.au/sealants-adhesives/344-sika-anchorfix-3001-250ml.html", price: "$53.50", gst: "inc GST" },
  ],
  // ── Sika — Sealant primers ───────────────────────────────────────────────────
  "brandSika_sealant-primers": [
    { name: "Bunnings", url: "https://www.bunnings.com.au/sika-250ml-black-pigmented-polyurethane-primer-209-d_p1210055", price: "$99.99", gst: "inc GST" },
  ],
  // ── Sika — Non-shrink grouts ─────────────────────────────────────────────────
  "brandSika_non-shrink-grouts": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-products/43-sika-grout-212-hp-20kg-bag.html", price: "$34.50", gst: "inc GST" },
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/sikagrout-212-hp-20kg", price: "$42.67", gst: "inc GST" },
    { name: "Bunnings", url: "https://www.bunnings.com.au/sika-20kg-deep-pour-cement-grout_p0960343", price: "$60.90", gst: "inc GST" },
  ],
  // ── Ardex — Non-shrink grouts ────────────────────────────────────────────────
  "brandArdex_non-shrink-grouts": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-products/151-ardex-bg-90-general-purpose-construction-grout-20kg.html", price: "$23.00", gst: "inc GST" },
  ],
  // ── Fosroc — Non-shrink grouts ───────────────────────────────────────────────
  "brandFosroc_non-shrink-grouts": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-products/240-fosroc-conbextra-c-au-20kg.html", price: "$39.00", gst: "inc GST" },
    { name: "Bldcare (Deep Pour)", url: "https://www.bldcare.com.au/concrete-products/290-fosroc-conbextra-deep-pour-20kg-bag.html", price: "$64.00", gst: "inc GST" },
  ],
  // ── Ardex — Epoxy repair mortars (RA88 Plus) ─────────────────────────────────
  "brandArdex_epoxy-repair-mortars": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-products/84-ardex-ra-88-multi-purpose-epoxy-repair-adhesive-254ml.html", price: "$62.00", gst: "inc GST" },
  ],
  // ── Fosroc — Epoxy repair mortars (Nitomortar AP) ────────────────────────────
  "brandFosroc_epoxy-repair-mortars": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/epoxy-repair/251-fosroc-nitomortar-ap-3l-kit.html", price: "$188.00", gst: "inc GST" },
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/fosroc-nitomortar-ap-kit", price: "$225.77", gst: "inc GST" },
  ],
  // ── Sika — Injection resins epoxy rigid (Sikadur 52) ─────────────────────────
  "brandSika_injection-resins-epoxy-rigid": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/crack-repair-injection/36-sikadur-52-normal-450ml-twin-cartridge-pack.html", price: "$86.00", gst: "inc GST" },
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/sika-sikadur-52-epoxy-joint-adhesive", price: "$103.84", gst: "inc GST" },
  ],
  // ── Ardex — Injection resins epoxy rigid (RA144) ─────────────────────────────
  "brandArdex_injection-resins-epoxy-rigid": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-products/122-ardex-ra-144-low-viscosity-structural-concrete-crack-injection-epoxy-470ml.html", price: "$92.50", gst: "inc GST" },
  ],
  // ── Fosroc — Injection resins epoxy rigid (Nitofill LV) ──────────────────────
  "brandFosroc_injection-resins-epoxy-rigid": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/crack-repair-injection/246-fosroc-nitofill-lv-450ml-twin-cartridge.html", price: "$85.00", gst: "inc GST" },
  ],
  // ── Ardex — Injection resins PU flexible (RA56) ───────────────────────────────
  "brandArdex_injection-resins-pu-flexible": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-products/83-ardex-ra-56-hybrid-polyurethane-crack-spall-repair-254ml.html", price: "$67.00", gst: "inc GST" },
  ],
  // ── Sika — Crack injection ports ─────────────────────────────────────────────
  "brandSika_crack-injection-ports": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-products/26-sika-injection-flange-for-52-crack-injection-system-20-pack.html", price: "$70.00", gst: "inc GST" },
  ],
  // ── Ardex — Crack injection ports (T-Port 25pk) ──────────────────────────────
  "brandArdex_crack-injection-ports": [
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/ardex-injection-t-port-25-pack", price: "$215.50", gst: "inc GST" },
  ],
  // ── Fosroc — Crack injection ports (Nitofill LV Flange 50pk) ─────────────────
  "brandFosroc_crack-injection-ports": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/crack-repair-injection/249-fosroc-nitofill-lv-flange-50-pack.html", price: "$171.00", gst: "inc GST" },
  ],
  // ── Ardex — Epoxy anchoring adhesives (RA88 Plus) ────────────────────────────
  "brandArdex_epoxy-anchoring-adhesives": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-products/84-ardex-ra-88-multi-purpose-epoxy-repair-adhesive-254ml.html", price: "$62.00", gst: "inc GST" },
  ],
  // ── Fosroc — Epoxy anchoring adhesives (Nitobond EP) ─────────────────────────
  "brandFosroc_epoxy-anchoring-adhesives": [
    { name: "Bldcare", url: "https://www.bldcare.com.au/concrete-repair-mortars/304-fosroc-nitobond-ep.html", price: "$145.00", gst: "inc GST" },
  ],
  // ── Sika — Corrosion inhibitors MCI (Ferrogard-903+) ─────────────────────────
  "brandSika_corrosion-inhibitors-mci": [
    { name: "Waterproofing Direct", url: "https://www.wpdgroup.com.au/products/sika-ferrogard-903-plus-20ltr", price: "$510.40", gst: "inc GST" },
  ],
};

export interface BrandSupplier {
  name: string;
  url: string;
}

// Manufacturer / brand supplier contacts — shown on every product card regardless of
// whether the product is available online. All trade brands require direct contact.
export const BRAND_SUPPLIERS: Record<string, BrandSupplier> = {
  brandArdex:   { name: "Ardex Australia",               url: "https://www.ardex.com.au" },
  brandSika:    { name: "Sika Australia",                url: "https://aus.sika.com" },
  brandFosroc:  { name: "Fosroc Australia",              url: "https://www.fosroc.com/en-au" },
  brandTremco:  { name: "Tremco CPG Australia",          url: "https://www.tremcosealants.com.au" },
  brandParchem: { name: "Parchem Construction Supplies", url: "https://www.parchem.com.au" },
};

// Technical Data Sheet (TDS) URLs — keyed by exact productName from the data.
// Only confirmed product-page URLs are included; brand homepage fallback is handled
// by the "Brand Site" button in the component.
// Sources: WPD Group (wpdgroup.com.au) product pages, verified May 2026.
export const PRODUCT_TDS_URLS: Record<string, string> = {
  // Repair mortars — polymer-modified
  "Sika MonoTop-352NFG":
    "https://www.wpdgroup.com.au/products/sika-monotop-352-nfg-20kg",
  "Ardex BR 340":
    "https://www.wpdgroup.com.au/products/ardex-br-340-high-build-patching-mortar-20kg",
  "Fosroc Renderoc HB":
    "https://www.wpdgroup.com.au/products/fos-renderoc-hb40-20kg",
  "Fosroc Renderoc LA":
    "https://www.wpdgroup.com.au/products/renderoc-la55-20kg",
  // Rebar primers & corrosion inhibitors
  "Fosroc Nitoprime Zincrich":
    "https://www.wpdgroup.com.au/products/nitoprimezincrich-1l-drum",
  "Sika Ferrogard-903+":
    "https://www.wpdgroup.com.au/products/sika-ferrogard-903-plus-20ltr",
  // Sealants
  "Tremco Dymonic 100":
    "https://www.wpdgroup.com.au/products/tremco-dymonic-100",
  "Fosroc Nitoseal PU400":
    "https://www.wpdgroup.com.au/products/nitoseal-pu400",
  "Ardex SE":
    "https://www.wpdgroup.com.au/products/ardex-se",
  // Injection resins
  "Sika Injection-451 N / Sikadur-52":
    "https://www.wpdgroup.com.au/products/sika-sikadur-52-epoxy-joint-adhesive",
  // Anchoring adhesives
  "Fosroc Nitobond EP":
    "https://www.bldcare.com.au/concrete-repair-mortars/304-fosroc-nitobond-ep.html",
};

// ── Per-product card enrichment ──────────────────────────────────────────────
// Keyed by exact productName (text before first " – " in brand field value).
// Falls back to CATEGORY_ENRICHMENT[cat.slug] advantages/disadvantages when
// a product is not listed here.
export interface ProductCardEnrichment {
  advantages: string[];
  disadvantages: string[];
}

export const PRODUCT_CARD_ENRICHMENT: Record<string, ProductCardEnrichment> = {

  // ── Polymer-modified repair mortars ─────────────────────────────────────────

  "Sika MonoTop-352NFG": {
    advantages: [
      "EN 1504-3 R3 certified — meets structural repair requirements for Australian remedial practice",
      "Overhead and vertical application without sagging — suitable for soffit and column repairs",
      "Fibre-reinforced matrix resists plastic and drying shrinkage cracking",
      "Available at Bunnings — stocked nationally for immediate procurement",
    ],
    disadvantages: [
      "Requires Sika-approved SBR bond coat or epoxy primer before application — cannot go direct to substrate",
      "Colour match to weathered concrete is not guaranteed — consult Sika colour-matching service",
      "Maximum 40 mm per layer — multiple passes required for deep spalls",
    ],
  },

  "Ardex BR 340": {
    advantages: [
      "MicroTec micro-fibre technology integrated into the mix — reduced bond coat requirement on sound concrete",
      "High-build to 50 mm in a single pass — reduces number of layers on medium to large spalls",
      "EN 1504-3 R3 performance with >2.0 MPa pull-off bond strength",
      "Stocked by Bldcare, Komerco, and Waterproofing Direct for online ordering",
    ],
    disadvantages: [
      "Higher cost per bag than standard polymer-modified grades",
      "Substrate and ambient temperature minimum 5°C — cold weather delays cure",
      "Not suitable for feathered edges or thin cosmetic profiling — use Ardex Feather Finish for sections below 5 mm",
    ],
  },

  "Fosroc Renderoc HB": {
    advantages: [
      "EN 1504-3 R3 structural repair mortar — consistent performance on vertical and horizontal faces",
      "Stable on vertical faces without formwork in sections up to 40 mm depth",
      "High compressive strength >35 MPa at 28 days for structural reinstatement",
      "Chloride-free formulation — suitable for carbonation and chloride-affected structures",
    ],
    disadvantages: [
      "Requires Fosroc Nitobond EP or SBR bond coat — do not omit in chloride-affected repairs",
      "Not formulated low-alkali — do not specify for AAR-affected substrates; use Renderoc LA instead",
      "Shorter working time at high ambient temperatures — pre-stage placement sequence in summer",
    ],
  },

  "Fosroc Renderoc LA": {
    advantages: [
      "Low-alkali formulation specifically designed for AAR (alkali-aggregate reaction) affected substrates",
      "EN 1504-3 structural grade — large-area application for extensive spall repairs on AAR-damaged structures",
      "Reduces risk of further AAR expansion in replacement repair mortar",
      "Low-shrinkage characteristic suited to large horizontal and vertical area repairs",
    ],
    disadvantages: [
      "Niche specification — appropriate only for confirmed or suspected AAR-affected structures; engineer must specify",
      "Not a direct substitute for Renderoc HB — performance and mix characteristics differ",
      "Higher cost than standard Renderoc grades; requires Fosroc specialist involvement to specify correctly",
    ],
  },

  "Sika MonoTop-412N": {
    advantages: [
      "Fine aggregate for cosmetic, thin-section, and profile repairs from 0 to 10 mm depth",
      "EN 1504-3 R3 structural-grade bond strength even in thin sections",
      "Can be feathered to near-zero at repair edges — ideal for blending into surrounding concrete",
      "Normal-setting time provides adequate workable window for trowel finishing",
    ],
    disadvantages: [
      "Not suitable for deep structural spalls — maximum 10 mm single layer; use MonoTop-352NFG for deeper sections",
      "Fine grade requires careful mix water control — excess water causes shrinkage cracking",
      "Colour matching to aged concrete requires sponge-float technique before cure — applicator skill dependent",
    ],
  },

  "Sika MonoTop-620": {
    advantages: [
      "EN 1504-3 R4 — highest structural classification in the Sika polymer-modified range",
      "Single-layer application up to 75 mm depth — significantly reduces passes on deep spalls",
      "Reduced formwork requirement — self-supporting on vertical faces at full thickness",
      "High early strength — suitable for fast-track programmes on trafficked structures",
    ],
    disadvantages: [
      "Highest material cost in the Sika polymer-modified range — specify only where repair depth justifies it",
      "Rigid formulation — engineer should evaluate joint design at repair perimeter where thermal movement exists",
      "Trade supply only via Sika distributors — not available at Bunnings",
    ],
  },

  "Ardex BR 345": {
    advantages: [
      "Thixotropic rheology suited for vertical and overhead application with low sag — reliable for carpark soffit and beam repairs",
      "EN 1504-3 R3 structural performance — appropriate for structural spall reinstatement",
      "Part of the Ardex BR structural repair mortar system — Ardex-warranted when used with Ardex P 51 bonding primer",
      "Good adhesion with Ardex P 51 bond coat on prepared concrete substrates",
    ],
    disadvantages: [
      "Maximum application depth per lift is limited — deep spalls require multiple passes or formwork",
      "Thixotropic rheology requires hand application — not suited to spray equipment",
      "Confirm current product code and specification with Ardex Australia before specifying",
    ],
  },

  "Ardex Feather Finish": {
    advantages: [
      "Polymer-modified feather-edge compound — can be applied to near-zero thickness at repair edges",
      "Fine aggregate suitable for cosmetic profiling, surface fairing, and thin-section patching to 10 mm",
      "Part of the Ardex floor levelling system — compatible with Ardex P 51 primer and floor toppings",
      "Single-component — no specialist mixing equipment required",
    ],
    disadvantages: [
      "Not a structural repair mortar — do not specify where EN 1504-3 R3/R4 structural compliance is required",
      "Cosmetic application only — does not address sub-surface substrate condition",
      "Not suitable for trafficked surfaces without protective topping",
    ],
  },

  "Fosroc Renderoc FC": {
    advantages: [
      "Fine cosmetic mortar for blowholes, form-face blemishes, and surface defects in architectural concrete",
      "Featherable to thin sections at edges — low visible repair line when correctly finished",
      "EN 1504-3 R2 compliance — meets minimum classification for cosmetic concrete repairs",
      "Low-shrinkage formulation reduces risk of cosmetic crack re-opening post-repair",
    ],
    disadvantages: [
      "EN 1504-3 R2 only — not suitable for structural repairs; use Renderoc HB for structural applications",
      "Cosmetic quality is heavily applicator-dependent — requires skilled concretor for acceptable finish",
      "Cannot address underlying substrate condition — cosmetic layer only",
    ],
  },

  // ── Cementitious repair mortars ──────────────────────────────────────────────

  "Sika MonoTop-436N": {
    advantages: [
      "General purpose cementitious repair mortar — cost-effective for large-area non-structural repairs",
      "Apply in layers up to 50 mm — suitable for honeycombing void fill and large substrate reinstatement",
      "Stocked by Waterproofing Direct, Bldcare, and Komerco for online ordering",
      "Standard SBR bond coat procedure — familiar to most concrete repair contractors",
    ],
    disadvantages: [
      "Higher shrinkage than polymer-modified grades — wet curing for minimum 72 hours is critical to limit shrinkage cracking",
      "Not specified for structural spall repairs requiring EN 1504-3 R3 — use MonoTop-352NFG for structural applications",
      "Colour varies with water content — consistent mix water essential for uniform appearance",
    ],
  },

  "Tremco Eucocrete RM": {
    advantages: [
      "Tremco Eucocrete RM is the confirmed Tremco cementitious repair mortar for general purpose void fill and substrate reinstatement",
      "Eucocrete product line is the primary concrete repair system for Tremco CPG Australia",
      "Compatible with other Tremco CPG system components including primers and coatings",
    ],
    disadvantages: [
      "Tremco distribution is more limited than Sika, Fosroc or Ardex — confirm local availability with Tremco CPG Australia",
      "Verify current product name and specification with Tremco representative before specifying",
      "Standard cementitious shrinkage risk — wet curing is mandatory",
    ],
  },

  "Mapei Mapegrout Fast-Set": {
    advantages: [
      "Fast-setting cementitious repair mortar from the Mapei/Parchem system",
      "Rapid return to service — useful on horizontal surfaces subject to early foot traffic",
      "General purpose grade suitable for honeycombing and surface void fill",
    ],
    disadvantages: [
      "Fast setting shortens working time — placement sequence must be pre-staged, especially in warm conditions",
      "Confirm current Mapei/Parchem product availability and formulation with Parchem Construction Supplies",
      "Cementitious shrinkage — wet curing regime required regardless of fast-setting characteristic",
    ],
  },

  "Fosroc Renderoc GP": {
    advantages: [
      "EN 1504-3 R3 compliant repair mortar at a cost closer to cementitious grades",
      "Versatile — honeycombed concrete, spall fill, and substrate reinstatement across multiple defect types",
      "Low heat of hydration — suitable for mass concrete repair work where thermal cracking is a risk",
      "Fosroc system compatibility — technical datasheets and ITP documentation available from Fosroc Australia",
    ],
    disadvantages: [
      "Not stocked by major online retailers — contact Fosroc Australia directly for supply and current pricing",
      "Requires Fosroc Nitobond SBR or Nitobond EP bond coat — must be applied wet-on-wet",
      "Greater shrinkage than polymer-modified grade — extended wet curing required per Fosroc ITP documentation",
    ],
  },

  // ── Epoxy repair mortars ─────────────────────────────────────────────────────

  "Ardex RA 88 Plus": {
    advantages: [
      "Multi-purpose 2-part epoxy adhesive and repair mortar — structural performance in thin sections from 3 mm",
      "High compressive and bond strength — epoxy matrix achieves >50 MPa compressive, >3.5 MPa pull-off bond",
      "Rapid strength gain — trafficable surface typically within 4–6 hours at 20°C",
      "Chemical resistance to oils, fuels, and cleaning agents — suited to loading areas, plant rooms, and car parks",
    ],
    disadvantages: [
      "Rigid when cured — thermal expansion mismatch with surrounding concrete; edge cracking risk on large repair areas",
      "Short pot life after mixing — must be placed and finished within 20–40 min at 20°C",
      "Higher material cost than cementitious alternatives — specify only where early strength or chemical resistance justifies epoxy",
    ],
  },

  "Sika Sikadur-42 / Sika MonoTop Epoxy": {
    advantages: [
      "Sikadur-42 is an EN 1504-6 precision epoxy grout — specified for structural baseplate grouting, starter bars, and heavy-duty floor patches",
      "High load-bearing capacity — designed for machine bases, column baseplates, and structural connection grouting",
      "Pre-packaged component pails provide consistent mix ratio — reduces field measurement error",
      "Available through Bldcare and Waterproofing Direct",
    ],
    disadvantages: [
      "Not a surface cosmetic repair product — strictly for structural applications requiring EN 1504-6 precision grout performance",
      "Temperature-sensitive: below 10°C curing slows significantly; above 30°C pot life drops below 15 min",
      "Incompatible with SBR bond coats — epoxy primer required on substrate",
    ],
  },

  "Fosroc Nitomortar 50": {
    advantages: [
      "EN 1504-3 R4 — highest structural classification epoxy mortar for industrial floors, loading docks, and ramps",
      "Exceptional compressive strength typically >80 MPa at 28 days — exceeds most concrete substrates",
      "High abrasion and impact resistance — suited to surfaces subject to wheeled loads and forklift traffic",
      "Three-component system provides consistent aggregate loading and mix ratio",
    ],
    disadvantages: [
      "Highest material cost per square metre in the repair mortar category — warranted only by R4 performance requirements",
      "Rigid system — stress concentration at repair perimeter; engineer must design joint or tapered edges for large repairs",
      "Requires specialist applicator — correct aggregate blending, mixing, and compaction is critical to rated performance",
    ],
  },

  "Tremco Eucocrete HBM": {
    advantages: [
      "Polymer-modified structural repair mortar from the Tremco CPG Eucocrete concrete repair system",
      "Suitable for structural spall reinstatement and substrate rebuilding on horizontal and vertical faces",
      "Compatible with Tremco CPG corrosion protection primers and system components",
    ],
    disadvantages: [
      "Tremco distribution network is smaller than Sika or Fosroc — confirm local availability with Tremco CPG Australia before specifying",
      "Confirm current product name, specification, and EN 1504-3 compliance class with Tremco representative before specifying",
      "Standard polymer-modified cementitious shrinkage risk — wet curing regime required",
    ],
  },

  "Fosroc Nitomortar AP": {
    advantages: [
      "All-purpose 3-part structural epoxy repair mortar from the Fosroc Nitomortar range — confirmed current Australian product",
      "High compressive strength from epoxy binder — structural performance for heavily loaded repair zones",
      "Suitable for concrete reinstatement, floor joint edges, industrial floor repairs, and machine bases",
      "Available via Parchem Construction Supplies (Fosroc distributor in Australia)",
    ],
    disadvantages: [
      "Short working time at temperatures above 25°C — component pre-staging and organised placement sequence mandatory",
      "Rigid epoxy binder — not suitable for joints subject to ongoing movement",
      "Confirm current product name, batch size, and supply lead time with Fosroc/Parchem before specifying",
    ],
  },

  // ── Bonding agents & SBR latex ───────────────────────────────────────────────

  "Ardex P 51": {
    advantages: [
      "Dual function: apply undiluted as a substrate bonding primer, or add to cementitious mortar mix as an SBR admixture",
      "Improves mortar flexibility, reduces shrinkage, and increases bond pull-off strength on existing concrete",
      "Specified component in the Ardex repair system — part of Ardex warranted application",
      "Water-based — easy clean-up, low VOC, suitable for enclosed spaces",
    ],
    disadvantages: [
      "Must be applied wet-on-wet as bond coat — if it dries before mortar placement it becomes a bond breaker",
      "Not a waterproofing coating — SBR improves bond strength only; it is not a substitute for membrane waterproofing",
      "Admixture dilution ratio must strictly follow the Ardex data sheet — do not over-dose",
    ],
  },

  "Sika Latex SBR": {
    advantages: [
      "Part of the Sika MonoTop repair system — specified alongside Sika repair mortars in Sika system documentation",
      "Dual use: brush-on bond coat to prepared substrate, or added to cementitious mortar at ~10% of mixing water by weight",
      "Improves flexibility, tensile adhesion, and carbonation resistance of cementitious repair mortars",
      "Available in 5 L and 20 L drums from Sika distributors",
    ],
    disadvantages: [
      "Timing is critical — mortar must be placed before the SBR bond coat skins over, typically within 30 min at 20°C",
      "Does not qualify as an epoxy bond coat — where EN 1504-4 or engineer specification requires epoxy primer, use Sika Icosit EP Primer",
      "Not suitable as a standalone waterproofing treatment",
    ],
  },

  "Fosroc Nitobond SBR": {
    advantages: [
      "Standard bond coat for all Fosroc repair mortars — specified component in the complete Fosroc repair system",
      "SBR emulsion provides mechanical and chemical key for repair mortar on prepared concrete",
      "Adds flexibility to mortar mix when used as an admixture — reduces early shrinkage cracking",
      "Compatible with Nitobond EP for dual-coat priming on chloride-affected substrates",
    ],
    disadvantages: [
      "Wet-on-wet application required — if allowed to dry before mortar placement, bond improvement is lost and delamination risk increases",
      "Not an epoxy primer — for chloride-affected structural repairs, engineer may require Nitobond EP epoxy primer in addition",
      "Shelf life limited once opened — use within manufacturer-specified period",
    ],
  },

  "Tremco THC Bonding Agent": {
    advantages: [
      "Acrylic polymer bonding primer from the Tremco CPG repair system",
      "Applied to prepared concrete substrate before Tremco repair mortar placement",
      "Water-based acrylic — low VOC, quick dry for site efficiency",
    ],
    disadvantages: [
      "Verify current product name and formulation with Tremco CPG Australia before specifying",
      "Acrylic type only — confirm compatibility with specific mortar; epoxy primer may be required in some engineer specifications",
      "Tremco distribution is more limited than Sika/Fosroc/Ardex — confirm local availability",
    ],
  },

  // ── Curing compounds ─────────────────────────────────────────────────────────

  // Ardex WB2 removed — no confirmed current Australian curing compound product from Ardex
  // For Ardex repair mortars, wet hessian curing or Fosroc Concure WB30 / Sika Antisol E should be specified

  "Sika Antisol E": {
    advantages: [
      "Acrylic resin curing compound with AS 2990 compliance — established product for Australian remedial practice",
      "Spray-applied — fast and uniform coverage on large horizontal surfaces",
      "Suitable for fresh repair mortar and concrete curing during plastic and early hardening phase",
      "Available from Sika distributors nationally",
    ],
    disadvantages: [
      "Curing film must be fully removed by mechanical abrasion before applying coatings, overlays, or bonded toppings",
      "Does not substitute for the minimum 7-day wet cure required by AS 3600 in structural concrete aggressive exposure classes",
      "Acrylic membrane damaged by rain within 2 hours of application — protect or re-apply if early rain occurs",
    ],
  },

  "Fosroc Concure WB30": {
    advantages: [
      "Water-based wax emulsion curing compound — current Australian SKU in the Fosroc Concure range (WB30)",
      "Low VOC formulation — preferred on enclosed or confined sites where solvent-based products are not permitted",
      "AS 2990 compliant curing efficiency — consistent moisture retention during early cure period",
    ],
    disadvantages: [
      "Residue must be completely removed by mechanical preparation before any bonded overlay or coating system is applied",
      "Not suitable as sole curing method for structurally critical repairs in severe exposure classes",
      "Confirm current product designation and coverage rate with Fosroc Australia before specifying",
    ],
  },

  "Tremco Eucocrete WB Cure": {
    advantages: [
      "Water-based acrylic curing compound from the Tremco CPG Eucocrete concrete repair system",
      "AS 2990 compliant — single-coat spray or roller applied film forms a moisture-retaining barrier",
      "Low VOC — suitable for use on enclosed or partially enclosed sites",
    ],
    disadvantages: [
      "Film must be mechanically removed before any bonded topping, overlay or coating is applied",
      "Not suitable as the sole curing method for structural concrete in aggressive exposure classes",
      "Confirm current product name and availability with Tremco CPG Australia before specifying",
    ],
  },

  "Mapei Mapecure S": {
    advantages: [
      "Mapei acrylic curing compound — part of the Mapei/Parchem concrete repair system",
      "Spray or roller applied — single-coat coverage on freshly placed repair mortar or concrete",
      "AS 2990 curing efficiency — moisture retention during plastic and early hardening stages",
    ],
    disadvantages: [
      "Membrane must be removed by grinding or scarifying before any subsequent bonded product application",
      "Curing function only — not a structural waterproof membrane",
      "Verify compatibility with specific Mapei mortar being used with Parchem representative",
    ],
  },
};

// ── Per-product technical specifications ─────────────────────────────────────
// Keyed by exact productName. Displayed as chips below the product card header.
export interface ProductTechSpecs {
  enClass: string | null;
  repairDepth: string | null;
  orientation: string | null;
  structural: string | null;
  fibreReinforced: boolean;
}

export const PRODUCT_TECH_SPECS: Record<string, ProductTechSpecs> = {
  // ── Polymer-modified repair mortars ─────────────────────────────────────────
  "Sika MonoTop-352NFG":   { enClass: "EN 1504-3 R3", repairDepth: "5–40 mm",  orientation: "H / V / O", structural: "Structural",     fibreReinforced: true  },
  "Ardex BR 340":          { enClass: "EN 1504-3 R3", repairDepth: "5–50 mm",  orientation: "H / V / O", structural: "Structural",     fibreReinforced: true  },
  "Fosroc Renderoc HB":    { enClass: "EN 1504-3 R3", repairDepth: "10–40 mm", orientation: "H / V",     structural: "Structural",     fibreReinforced: false },
  "Fosroc Renderoc LA":    { enClass: "EN 1504-3 R3", repairDepth: "10–40 mm", orientation: "H / V",     structural: "Structural",     fibreReinforced: false },
  "Sika MonoTop-412N":     { enClass: "EN 1504-3 R3", repairDepth: "0–10 mm",  orientation: "H / V / O", structural: "Structural",     fibreReinforced: false },
  "Sika MonoTop-620":      { enClass: "EN 1504-3 R4", repairDepth: "10–75 mm", orientation: "H / V",     structural: "Structural",     fibreReinforced: true  },
  "Ardex BR 345":          { enClass: "EN 1504-3 R3", repairDepth: "3–20 mm",  orientation: "V / O",     structural: "Structural",     fibreReinforced: true  },
  "Ardex Feather Finish":  { enClass: null,           repairDepth: "0–10 mm",  orientation: "H / V",     structural: "Non-structural", fibreReinforced: false },
  "Fosroc Renderoc FC":    { enClass: "EN 1504-3 R2", repairDepth: "0–5 mm",   orientation: "H / V / O", structural: "Cosmetic",       fibreReinforced: false },
  // ── Cementitious repair mortars ──────────────────────────────────────────────
  "Sika MonoTop-436N":     { enClass: "EN 1504-3 R2", repairDepth: "3–50 mm",  orientation: "H / V",     structural: "Non-structural", fibreReinforced: false },
  "Fosroc Renderoc GP":    { enClass: "EN 1504-3 R3", repairDepth: "5–40 mm",  orientation: "H / V",     structural: "Structural",     fibreReinforced: false },
  // ── Epoxy repair mortars ─────────────────────────────────────────────────────
  "Ardex RA 88 Plus":                     { enClass: "EN 1504-3 R4", repairDepth: "3–25 mm",  orientation: "H / V", structural: "Structural", fibreReinforced: false },
  "Sika Sikadur-42 / Sika MonoTop Epoxy": { enClass: "EN 1504-6",    repairDepth: "10–75 mm", orientation: "H",     structural: "Structural", fibreReinforced: false },
  "Fosroc Nitomortar 50":                 { enClass: "EN 1504-3 R4", repairDepth: "5–50 mm",  orientation: "H / V", structural: "Structural", fibreReinforced: false },
  "Tremco Eucocrete HBM":                 { enClass: "EN 1504-3 R3", repairDepth: "5–50 mm",  orientation: "H / V", structural: "Structural", fibreReinforced: false },
  "Fosroc Nitomortar AP":                 { enClass: "EN 1504-3 R4", repairDepth: "variable", orientation: "H",     structural: "Structural", fibreReinforced: false },
  // ── Bonding agents ───────────────────────────────────────────────────────────
  "Ardex P 51":          { enClass: "EN 1504-4", repairDepth: null, orientation: null, structural: null, fibreReinforced: false },
  "Sika Latex SBR":      { enClass: "EN 1504-4", repairDepth: null, orientation: null, structural: null, fibreReinforced: false },
  "Fosroc Nitobond SBR": { enClass: "EN 1504-4", repairDepth: null, orientation: null, structural: null, fibreReinforced: false },
  // ── Curing compounds ─────────────────────────────────────────────────────────
  "Sika Antisol E":    { enClass: "AS 2990", repairDepth: null, orientation: null, structural: null, fibreReinforced: false },
  "Fosroc Concure WB30": { enClass: "AS 2990", repairDepth: null, orientation: null, structural: null, fibreReinforced: false },
  "Tremco Eucocrete WB Cure":{ enClass: "AS 2990", repairDepth: null, orientation: null, structural: null, fibreReinforced: false },
  "Mapei Mapecure S":  { enClass: "AS 2990", repairDepth: null, orientation: null, structural: null, fibreReinforced: false },
};

// ── Category technical info for TechnicalAccordionClient ─────────────────────
// Keyed by product category slug. Used in page.tsx to replace the generic
// hardcoded techInfo object with category-specific technical content.
export const CATEGORY_TECH_INFO: Record<string, {
  typicalApplications: string[];
  selectionCriteria: string[];
  limitations: string[];
  standardsNotes: string[];
  suitableDefects: string[];
  typicalSubstrates: string[];
}> = {

  "repair-mortars-polymer-modified": {
    typicalApplications: [
      "Reinstatement of concrete cover lost due to carbonation-induced or chloride-induced reinforcement corrosion",
      "Structural spall repair on Class 2 apartment buildings, carparks, and civil structures",
      "Soffit, column, beam, and slab edge repairs where overhead or vertical application is required",
      "Repair of concrete damaged by impact, fire, or mechanical damage requiring structural reinstatement",
      "Replacement of failed previous repair material where bond or cohesion has been lost",
    ],
    selectionCriteria: [
      "Confirm EN 1504-3 class required by the engineer: R3 for structural repairs, R4 for heavy-duty or industrial applications",
      "Measure repair depth per location — fine grade 0–10 mm, standard grade 5–40 mm, high-build up to 75 mm",
      "Confirm application orientation — select mortar with verified overhead and vertical approval where soffit repairs are involved",
      "Substrate condition: SSD (saturated surface dry) is required — substrate must not be wet or bone dry; achieve CSP 3–4 minimum",
      "Match product to the specified repair system — use manufacturer bond coat and rebar primer as system components",
    ],
    limitations: [
      "Substrate and ambient temperature must be ≥5°C and ≤35°C at time of application — cold weather delays cure; high temperatures shorten working time",
      "Surface preparation minimum CSP 3–4 must be achieved — bond will fail on unscratched, smooth, or contaminated surfaces",
      "Maximum layer thickness varies by product — never exceed single-layer limit stated in the product data sheet",
      "Polymer-modified mortars are NOT inherently waterproof — separate waterproofing system required where hydrostatic pressure or waterproof membrane is specified",
      "Colour match to aged concrete is not guaranteed — manage client expectations and consider the need for a colour-matched topping",
    ],
    standardsNotes: [
      "EN 1504-3: Products for structural and non-structural repair (R2, R3, R4) — the classification system adopted in Australian remedial practice",
      "AS 3600: Concrete Structures — defines exposure classifications (A, B1, B2, C, U) and minimum cover requirements that drive repair specification",
      "AS 1379: Specification and supply of concrete — applies where site-batched mixes are used alongside proprietary repair products",
      "Manufacturer ITP (Inspection and Test Plan) — bond coat timing, repair layer thickness, curing method, and temperature controls must be observed on every project",
    ],
    suitableDefects: [
      "Concrete spalling from carbonation-induced reinforcement corrosion — most common defect in Class 2 remedial practice",
      "Concrete spalling from chloride-induced reinforcement corrosion in coastal, carpark, or marine environments",
      "Impact or mechanical damage to concrete cover requiring structural reinstatement",
      "Honeycombed concrete following poor compaction — where engineer specifies structural mortar grade",
      "Post-breakout substrate reinstatement after rebar preparation and priming",
    ],
    typicalSubstrates: [
      "In-situ reinforced concrete — slabs, beams, columns, walls, soffits, carpark decks",
      "Precast concrete panels — facade, balcony, spandrel elements",
      "Post-tensioned concrete decks and soffits (structural engineer sign-off required before repair)",
      "Masonry with appropriate primer — bond coat compatibility must be confirmed with manufacturer",
    ],
  },

  "cementitious-repair-mortars": {
    typicalApplications: [
      "Reinstatement of honeycombed concrete discovered after formwork removal on building structures",
      "Large-area non-structural void filling on retaining walls, piers, and civil structures",
      "General cosmetic and levelling repairs where structural polymer-modified grade is not required",
      "Substrate reinstatement before application of protective coatings or bonded overlays",
      "Cost-effective fill for large concrete pour defects in low-exposure environments",
    ],
    selectionCriteria: [
      "Confirm repair is non-structural or that the engineer has specified cementitious grade — EN 1504-3 R2 is typically applicable",
      "Verify repair depth is appropriate — cementitious grade is not suitable for thin-section work below 10 mm",
      "SBR bond coat is mandatory — do not apply cementitious mortar directly to concrete substrate without a bond coat applied wet-on-wet",
      "Wet curing regime must be achievable on site — cementitious mortars are vulnerable to plastic shrinkage without adequate moisture retention during curing",
      "Exposure class of structure: for aggressive exposure classifications (B1, B2, C, U), structural polymer-modified grade is typically required",
    ],
    limitations: [
      "Higher shrinkage than polymer-modified mortars — wet curing for minimum 72 hours (preferably 7 days) is critical to limit cracking",
      "Not suitable for thin-section or feathered repairs below 10 mm — use fine polymer-modified mortar instead",
      "Cementitious grade is not EN 1504-3 R3 structural — do not specify for structural spall repairs in aggressive exposure",
      "Colour variation between repair and original concrete is likely — manage client expectations accordingly",
      "Do not over-water on site — excess water reduces final strength and significantly increases shrinkage",
    ],
    standardsNotes: [
      "EN 1504-3: Classification R2 for non-structural repair mortars — confirms minimum compressive strength and bond pull-off requirements",
      "AS 3600: Concrete Structures — exposure classifications determine whether cementitious grade is acceptable for the structure's environment",
      "Manufacturer data sheet — minimum CSP preparation level, bond coat specification, and wet curing requirements must be strictly observed",
    ],
    suitableDefects: [
      "Honeycombed concrete from poor compaction during placement — the primary non-structural application",
      "Form-face surface blemishes and void fill after formwork removal",
      "Non-structural concrete surface repairs and substrate levelling",
      "Large-area substrate reinstatement before protective coating application",
    ],
    typicalSubstrates: [
      "In-situ concrete — slabs, walls, and columns in non-aggressive exposure conditions",
      "Precast concrete with honeycombing or surface defects requiring fill",
      "Masonry walls requiring mortar fill or surface reinstatement",
      "Previously repaired concrete — confirm SBR bond coat compatibility before placement",
    ],
  },

  "epoxy-repair-mortars": {
    typicalApplications: [
      "Industrial floor repairs at loading docks, trafficked ramps, and warehouse floors subject to wheeled and forklift loads",
      "Structural thin-section repairs requiring early return to service — trafficable within 2–6 hours at 20°C",
      "Repairs to precast nibs, bearing pads, and column base connections requiring EN 1504-3 R4 or EN 1504-6",
      "Chemical-resistant floor patching in food production, plant rooms, and laboratories",
      "Baseplate grouting and structural connection grouting where precision and high compressive strength are required",
    ],
    selectionCriteria: [
      "Confirm EN 1504-3 R4 or EN 1504-6 is specified by the engineer — epoxy is not the default repair mortar for Class 2 residential work",
      "Repair depth: most trowel-grade epoxy mortars suit 3–50 mm; use flowable grade for congested rebar or deep formed voids",
      "Application temperature: pot life shortens rapidly above 25°C — plan placement and delivery sequence accordingly",
      "Chemical resistance: confirm solvent or chemical type against product-specific chemical resistance data before specifying",
      "Rigid formulation — joint design at repair perimeter must be considered for large repairs to manage differential thermal movement",
    ],
    limitations: [
      "Short pot life after mixing — typically 20–40 min at 20°C; all preparation and staging must be complete before mixing",
      "Rigid when cured — coefficient of thermal expansion differs from concrete; delamination at repair perimeter is possible over time on large repairs",
      "Substantially higher material and application cost compared to all cementitious alternatives",
      "Substrate must be dry or only slightly damp — moisture significantly reduces epoxy bond strength",
      "Strict component metering and mixing required — field variation in mix ratio directly degrades performance",
    ],
    standardsNotes: [
      "EN 1504-3 R4: Highest structural repair mortar classification — specified for heavily trafficked or high structural load applications",
      "EN 1504-6: Products for anchoring reinforcing bar and structural connection — applicable to precision epoxy grouts for baseplate grouting",
      "AS 3600: Exposure classification requirements — engineer-directed use only in structures where epoxy performance is justified",
      "Manufacturer mixing and application ITP must be strictly observed — critical for component ratios, pot life management, and cure temperature range",
    ],
    suitableDefects: [
      "High-load industrial floor spalling, joint edge damage, and slab nosing failure",
      "Structural repairs to precast elements requiring early return to service",
      "Thin-section structural repairs where reduced cover prevents use of polymer-modified mortars",
      "Chemical-resistant patching in aggressive service environments",
    ],
    typicalSubstrates: [
      "Industrial concrete floors — slabs on grade and suspended slabs subject to wheeled traffic",
      "Precast structural elements — nibs, corbels, bearing pads",
      "Concrete ramps, bridges, and multi-deck carparks requiring rapid strength gain",
      "Dry concrete substrates prepared to minimum CSP 4 — blast clean or mechanical scarification",
    ],
  },

  "bonding-agents-sbr-latex": {
    typicalApplications: [
      "Bond coat applied to prepared concrete substrate immediately before polymer-modified or cementitious repair mortar is placed",
      "Admixture added to site-batched cementitious mortars at approximately 10% of mixing water to improve flexibility and bond",
      "Interface primer at the new repair / existing concrete boundary to prevent premature delamination",
      "Improving adhesion of screeds and overlays to existing concrete substrates",
    ],
    selectionCriteria: [
      "EN 1504-4 adhesion bonding: confirm SBR type is acceptable under the engineer's specification — epoxy primer may be required for structural repairs or chloride-affected substrates",
      "Timing: apply bond coat and place mortar wet-on-wet — confirm open time on the data sheet, typically 15–30 min at 20°C",
      "Substrate temperature: below 10°C SBR dries slowly; above 30°C open time shortens — adjust placement timing to conditions",
      "Confirm system compatibility: use manufacturer-specified bond coat with manufacturer's repair mortar — cross-brand priming may not be warranted",
    ],
    limitations: [
      "Must be applied wet-on-wet — if allowed to dry before mortar placement it acts as a bond breaker and causes delamination, not a bond enhancer",
      "SBR is NOT a structural epoxy primer — for EN 1504-4 or engineer-specified epoxy bond coat requirements, use a two-part epoxy adhesion promoter",
      "Not a waterproofing product — SBR admixture reduces mortar permeability but does not create a waterproof barrier",
      "Diluted SBR used as admixture must be accurately metered — excess SBR can delay set and reduce final compressive strength",
    ],
    standardsNotes: [
      "EN 1504-4: Structural bonding products — SBR bond coats comply with EN 1504-4 for non-structural adhesion bonding applications",
      "AS 3600: No specific clause for bond coat products — refer to manufacturer data sheet and repair system specification documentation",
      "Manufacturer-specific system warranty typically requires use of the manufacturer's own bond coat with their repair mortar",
    ],
    suitableDefects: [
      "All repair mortar placements onto existing concrete — bond coat is a mandatory system component in virtually every repair specification",
      "Screed-to-substrate interface preparation for overlays and toppings",
      "Latex admixture for improved cementitious mortar flexibility on structures subject to thermal or live movement",
    ],
    typicalSubstrates: [
      "Prepared concrete at minimum CSP 3 — substrate must be mechanically prepared before bond coat application",
      "Masonry — confirm compatibility with specific SBR product before use",
      "Existing cured repair mortar to be overlaid (confirm bond coat compatibility)",
    ],
  },

  "curing-compounds": {
    typicalApplications: [
      "Spray or roller application to freshly finished repair mortar and concrete slabs immediately after surface set",
      "Curing horizontal surfaces where continuous wet hessian curing would require excessive labour or is impractical on site",
      "Accelerated early-age moisture retention in hot, dry, or windy conditions when plastic shrinkage cracking risk is elevated",
      "Curing repair mortar applied to vertical faces and soffits where wet curing sheeting cannot be held in contact with the surface",
    ],
    selectionCriteria: [
      "AS 2990 compliance is required — confirm the product has current test data demonstrating the required curing efficiency standard",
      "Water-based acrylic types are preferred for most remedial work — easier to remove by mechanical abrasion before bonded overlays",
      "Do not use wax-based or solvent-based curing compounds where a bonded overlay, coating, or adhesive will follow — removal is harder and residue risk is greater",
      "Apply at the correct coverage rate from the data sheet — under-application leaves film gaps and reduces curing effectiveness",
    ],
    limitations: [
      "Curing compound film must be mechanically removed (grinding, scarifying) before any bonded topping, coating, or adhesive is applied — residue prevents adhesion",
      "Not suitable as the sole curing method for high-performance structural concrete, post-tensioned slabs, or repairs in severe exposure classes per AS 3600 requirements",
      "Acrylic membrane damaged by rain within 1–2 hours of application — monitor weather forecast and plan re-application if early rainfall occurs",
      "Do not apply to surfaces that will receive polished or exposed aggregate finish — membrane impairs the final surface treatment",
    ],
    standardsNotes: [
      "AS 2990: Curing of Portland cement concrete — defines efficiency requirements for liquid membrane-forming curing compounds",
      "AS 3600 Section 19: Specifies minimum curing periods for concrete in various exposure conditions — curing compound use must demonstrate equivalent curing effectiveness",
      "Manufacturer application data sheet — coverage rate, application conditions, and subsequent overlay timing must be observed",
    ],
    suitableDefects: [
      "Fresh repair mortar requiring moisture retention after trowel finishing",
      "Concrete slab repairs and overlays requiring curing after placement and finish",
      "Post-spray repair mortar to soffits and vertical faces after initial set",
    ],
    typicalSubstrates: [
      "Freshly finished concrete and repair mortar — horizontal surfaces, screeds, slab overlays",
      "Vertical and overhead repair mortar after initial set — where wet sheeting cannot be held in contact",
      "Exposed aggregate and brushed concrete where film-type curing is compatible with the intended final finish",
    ],
  },
};
