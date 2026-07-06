# Waterproofing repair-system rewrite — progress tracker

Method = the spec-card-rebuild prompt (schema-first per category, AU manufacturer TDS only,
relabels KEY PROPERTIES / PERFORMANCE HIGHLIGHTS / CAUTIONS / KEY WARNINGS + Advanced Technical
Data, typed selector JSON, `CONFIRM — <field>` for anything not on the AU TDS, no improvising).
Backup: `_backups/waterproofing-pre-rewrite-20260620.tar.gz`. Deploy ONCE at the very end.

SELECTOR: two-tier grouping DONE (not deployed) — landing has "Concrete & Structural"
(holds the 4 existing paths) + "Waterproofing & Water Ingress" (Soon). Build the
Waterproofing selector paths LAST, after the product pages are revised.

CLASS 2 / NCC RULE (all membranes): add a KEY PROPERTIES field "Class 2 / NCC tested"
= documented AU test evidence ONLY (named CSIRO/BRANZ report, CodeMark, or CSIRO
assessment to AS 4858 / AS 4654 / AS 3740). Bare "complies to AS…" marketing = NOT
asserted. Unverified defaults to "N/A" (kp uses `vals[i] ?? "N/A"`; verified cards pass
the 8th value). VERIFICATION METHOD (critical): check each product's OWN AU page/TDS for the cited
certificate/report number — NOT a brand-level search (that gave false negatives, e.g.
SikaTile-110 missed). Bar = documented test certificate/report OR named certifying body
(CSIRO/BRANZ/CodeMark). Manufacturer self-claims ("Tested to…" / "complies") with NO
document/body = leave BLANK (not asserted).
Verified (membranes, evidence): WPM 157, 155, 130, 310, 909, 002 (Ardex BRANZ/AS certs);
SikaTile-110 (BRANZ DCDC13205-003 / DC14429-03); Davco K10 (BRANZ DC13205-001 / DC14429-04);
Gripset 38FC (CSIRO TA 349 + BRANZ CodeMark); Mapelastic Smart (CSIRO); Nitoproof 750
(CSIRO SW8554), 410 (ISO17025), 810 (AS cert docs); Bostik Platinum (BRANZ certified).
Blank (no doc found): Sikalastic-487/WPU/1K, Gripset P39/RD, Bostik PU, Tremco 350R,
Crommelin Wetite/Rapid, Westox FCM. Retry (fetch failed): Davco K11 Flex (404),
Mapelastic Foundation (403).

WARRANTY (all membranes): KEY PROPERTIES field "Warranty" — default "CONFIRM — manufacturer
/ system warranty" (warranties are usually system/applicator-based). Fill specific terms in
the END certification pass.
CERTIFIED-ONLY NOTE (all membrane sections): amber note in IntroSection — for Class 2 balcony/
roof/podium, specify only a membrane with current AU test certification; N/A ≠ approved.
NEVER remove a membrane for lacking a certificate (keep all; cert = advantage in KEY PROPERTIES).
END PASS (after the whole section is built): deep per-product dig of CodeMark register + each
manufacturer's certificates/warranty pages → upgrade N/A certs and CONFIRM warranties to cited.

Chemical/material categories = FULL schema-first treatment. Hardware/commodity categories
(drains, grates, pedestals, abrasives, flood-test, termination bars, backer rod, protection
boards, filter fabric, ballast) = lighter treatment (selection facts, no fabricated specs).

## Balcony / roof / planter / podium  (/repair-systems/balcony-waterproofing-failure)
### Membrane Systems
- [x] liquid-applied-membranes-polyurethane (13) ✓ DONE — new format, 13 sourced cards
      (puMembranesData.ts + PUProductSection rebuilt). Research: waterproofing-research-01-pu-membranes.md
- [x] liquid-applied-membranes-acrylic (6) ✓ DONE — new format (acrylicMembranesData.ts + section rebuilt)
- [x] sheet-membranes-torch-on (11) ✓ DONE — WPM 150/185 Class-2 verified (BRANZ); rest blank
- [x] sheet-membranes-cold-applied (6) ✓ DONE — new format + per-page Class-2 verify
      (WPM 1000 / 117 / Butynol verified; BRW-PFN/HD, WPM 116 blank)
- [x] cementitious-flexible-membranes (7) ✓ DONE — new format (cementitiousMembranesData.ts + section rebuilt)
- [x] hdpe-sheet-membrane-systems (5) ✓ DONE — PVC single-ply (shared pvcSheetCards.ts); Wolfin IB/GWSK, Cosmofin NATA-verified + 20yr warranty
- [x] single-ply-membrane-systems-ballasted (4) ✓ DONE — shares PVC cards (Wolfin IB, Cosmofin, Fatrafol, Sarnafil)
- [x] tpo-fpo-sheet-membranes-exposed (2) ✓ DONE — WPM 715 BRANZ-verified; 717 flagged (page 404)
- [x] hot-melt-rubberised-asphalt-systems (4) ✓ DONE — niche/imported (Henry, SikaShield, Soprema, mastic); AU availability flagged, none AU-cert
### Preparation & Priming
- [x] primers-bonding-agents (10) ✓ DONE — system components (no Class-2/warranty field)
- [ ] reinforcing-fabric-mesh (5)
- [ ] abrasives-blades-tools (11) [commodity]
- [ ] membrane-termination-bars-accessories (3) [commodity]
### Screeds, Falls & Tile Build-up
- [x] screed-systems-polymer-modified (7) ✓ DONE
- [x] screed-systems-self-levelling (4) ✓ DONE
- [x] tile-adhesive-systems (15) ✓ DONE (no deploy yet)
- [x] tile-sealants-silicone-sanitary (5) ✓ DONE (no deploy yet)
### Drainage & Penetrations
- [ ] drainage-puddle-flanges-floor-wastes (5) [commodity]
- [ ] drainage-linear-grates-channel-drains (6) [commodity]
- [ ] penetration-collars (6) [commodity]
- [ ] drainage-podium-outlets-scuppers (0 — empty, skip/confirm)
- [ ] gutter-lining-systems / balcony edge trims (5) [commodity]
- [x] flashing-compound-systems (7) ✓ DONE (no deploy yet)
### Joints & Movement
- [ ] backer-rod-bond-breaker-tape (3) [commodity]
- [ ] expansion-joint-cover-systems-trafficable (3) [commodity]
### Protection & Overburden
- [ ] protection-boards (6) [commodity]
- [x] root-resistant-membrane-systems (7) ✓ DONE — Wolfin/Cosmofin NATA; rest blank (no deploy yet)
- [ ] tapered-insulation-board-systems (6) [commodity]
- [ ] pedestal-systems-adjustable-height (5) [commodity]
- [ ] drainage-cell-systems (0 — empty)
- [ ] filter-fabric-systems (0 — empty)
- [ ] ballast-systems (0 — empty)
- [x] vapour-control-layers-warm-roof (4) ✓ DONE (no deploy yet)
### Testing & QA
- [ ] flood-test-equipment (5) [commodity]

## Rising damp  (/repair-systems/rising-damp) — 7 dirs
- [ ] (enumerate when reached)

## Basement water ingress  (/repair-systems/basement-water-ingress) — 9 dirs
- [ ] (enumerate when reached)

## Penetrating damp  (/repair-systems/penetrating-damp) — 2 dirs
- [ ] (enumerate when reached)
