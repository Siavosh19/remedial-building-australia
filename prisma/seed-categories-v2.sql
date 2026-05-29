-- Full category replacement
-- 1. Clear FK references so we can delete all categories
UPDATE companies SET main_category_id = NULL WHERE main_category_id IS NOT NULL;
DELETE FROM company_categories;
UPDATE leads SET category_id = NULL, subcategory_id = NULL;
-- 2. Delete all existing categories (children first, then parents)
DELETE FROM categories WHERE parent_id IS NOT NULL;
DELETE FROM categories WHERE parent_id IS NULL;

-- 3. Insert 20 parent categories
INSERT INTO categories (name, slug, parent_id, display_order, is_active) VALUES
  ('Consultants & Practitioners',  'consultants-practitioners',  NULL, 1,  true),
  ('Remedial Contractors',          'remedial-contractors',        NULL, 2,  true),
  ('Joints & Movement',             'joints-movement',             NULL, 3,  true),
  ('Waterproofing',                 'waterproofing',               NULL, 4,  true),
  ('Roofing',                       'roofing',                     NULL, 5,  true),
  ('Masonry & Brick Repair',        'masonry-brick-repair',        NULL, 6,  true),
  ('Facade & External Envelope',    'facade-external-envelope',    NULL, 7,  true),
  ('Access Systems',                'access-systems',              NULL, 8,  true),
  ('Investigation & Testing',       'investigation-testing',       NULL, 9,  true),
  ('Hazardous Materials',           'hazardous-materials',         NULL, 10, true),
  ('Demolition & Strip-Out',        'demolition-strip-out',        NULL, 11, true),
  ('Plumbing & Drainage',           'plumbing-drainage',           NULL, 12, true),
  ('Electrical',                    'electrical',                  NULL, 13, true),
  ('Passive Fire & Compliance',     'passive-fire-compliance',     NULL, 14, true),
  ('Specialist Trades',             'specialist-trades',           NULL, 15, true),
  ('Landscaping & Grounds',         'landscaping-grounds',         NULL, 16, true),
  ('Cleaning & Maintenance',        'cleaning-maintenance',        NULL, 17, true),
  ('Legal, Insurance & Finance',    'legal-insurance-finance',     NULL, 18, true),
  ('Technology & Software',         'technology-software',         NULL, 19, true),
  ('Suppliers & Materials',         'suppliers-materials',         NULL, 20, true),
  ('Fire Services',                 'fire-services',               NULL, 21, true),
  ('Mechanical / HVAC',             'mechanical-hvac',             NULL, 22, true),
  ('Lifts & Vertical Transport',    'lifts-vertical-transport',    NULL, 23, true),
  ('Security & Building Access',    'security-building-access',    NULL, 24, true),
  ('General Strata Maintenance',    'general-strata-maintenance',  NULL, 25, true),
  ('Waste / Environmental Services','waste-environmental-services',NULL, 26, true);

-- 4. Insert subcategories for each parent

-- 1. Consultants & Practitioners (25)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Remedial Consultants',                          'remedial-consultants',                    1),
  ('Structural Engineers',                           'structural-engineers',                    2),
  ('Facade Engineers',                               'facade-engineers',                        3),
  ('Waterproofing Consultants',                      'waterproofing-consultants',               4),
  ('Building Surveyors',                             'building-surveyors',                      5),
  ('DBP Design Practitioners',                       'dbp-design-practitioners',                6),
  ('DBP Building Practitioners',                     'dbp-building-practitioners',              7),
  ('Fire Engineers',                                 'fire-engineers',                          8),
  ('Access Consultants',                             'access-consultants',                      9),
  ('Quantity Surveyors',                             'quantity-surveyors',                      10),
  ('Forensic Building Consultants',                  'forensic-building-consultants',           11),
  ('Dilapidation Consultants',                       'dilapidation-consultants',                12),
  ('Strata Remedial Consultants',                    'strata-remedial-consultants',             13),
  ('Project Managers / Owner''s Project Managers',   'project-managers-owners-project-managers', 14),
  ('Acoustic Consultants',                           'acoustic-consultants',                    15),
  ('Environmental Consultants',                      'environmental-consultants',               16),
  ('OC / Strata Managers',                           'oc-strata-managers',                      17),
  ('Structural Inspection Consultants',              'structural-inspection-consultants',       18),
  ('Concrete Diagnostic Consultants',                'concrete-diagnostic-consultants',         19),
  ('Corrosion Engineers',                            'corrosion-engineers',                     20),
  ('Building Envelope Consultants',                  'building-envelope-consultants',           21),
  ('Cladding Compliance Consultants',                'cladding-compliance-consultants',         22),
  ('Facade Auditors / Inspectors',                   'facade-auditors-inspectors',              23),
  ('Window Replacement Consultants',                 'window-replacement-consultants',          24),
  ('Hydraulic Consultants',                          'hydraulic-consultants',                   25)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'consultants-practitioners';

-- 2. Remedial Contractors (16)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Remedial Builders',                 'remedial-builders',                   1),
  ('Concrete Spalling Contractors',     'concrete-spalling-contractors',       2),
  ('Concrete Cancer Repair Contractors','concrete-cancer-repair-contractors',  3),
  ('Balcony Repair Contractors',        'balcony-repair-contractors',          4),
  ('Facade Repair Contractors',         'facade-repair-contractors',           5),
  ('Crack Injection Contractors',       'crack-injection-contractors',         6),
  ('Carbon Fibre / FRP Contractors',    'carbon-fibre-frp-contractors',        7),
  ('Structural Steel Contractors',      'structural-steel-contractors',        8),
  ('Grouting Contractors',              'grouting-contractors',                9),
  ('Sealant Contractors',               'sealant-contractors',                 10),
  ('Protective Coating Contractors',    'protective-coating-contractors',      11),
  ('Basement Remediation Contractors',  'basement-remediation-contractors',    12),
  ('Cathodic Protection Specialists',   'cathodic-protection-specialists',     13),
  ('Galvanic Anode Installers',         'galvanic-anode-installers',           14),
  ('Shotcrete Contractors',             'shotcrete-contractors',               15),
  ('Micro-Concrete Contractors',        'micro-concrete-contractors',          16)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'remedial-contractors';

-- 3. Joints & Movement (4)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Expansion Joint Contractors',        'expansion-joint-contractors',         1),
  ('Control Joint Contractors',          'control-joint-contractors',           2),
  ('Movement Joint System Suppliers',    'movement-joint-system-suppliers',     3),
  ('Architectural Joint Specialists',    'architectural-joint-specialists',     4)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'joints-movement';

-- 4. Waterproofing (13)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Licensed Waterproofers',                 'licensed-waterproofers',                1),
  ('Remedial Waterproofing Contractors',     'remedial-waterproofing-contractors',    2),
  ('Balcony Waterproofing Contractors',      'balcony-waterproofing-contractors',     3),
  ('Roof Waterproofing Contractors',         'roof-waterproofing-contractors',        4),
  ('Podium Waterproofing Contractors',       'podium-waterproofing-contractors',      5),
  ('Basement Waterproofing Contractors',     'basement-waterproofing-contractors',    6),
  ('Planter Box Waterproofing Contractors',  'planter-box-waterproofing-contractors', 7),
  ('Negative Side Waterproofing Contractors','negative-side-waterproofing-contractors',8),
  ('Liquid Membrane Contractors',            'liquid-membrane-contractors',           9),
  ('Sheet Membrane Contractors',             'sheet-membrane-contractors',            10),
  ('Waterproofing Inspectors',               'waterproofing-inspectors',              11),
  ('Flood Testing Services',                 'flood-testing-services',               12),
  ('Injection Waterproofing Contractors',    'injection-waterproofing-contractors',  13)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'waterproofing';

-- 5. Roofing (8)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Roofing Contractors',            'roofing-contractors',             1),
  ('Metal Roofing Contractors',      'metal-roofing-contractors',       2),
  ('Membrane Roofing Contractors',   'membrane-roofing-contractors',    3),
  ('Torch-On Membrane Contractors',  'torch-on-membrane-contractors',   4),
  ('Box Gutter Contractors',         'box-gutter-contractors',          5),
  ('Flashing Contractors',           'flashing-contractors',            6),
  ('Skylight Contractors',           'skylight-contractors',            7),
  ('Roof Leak Repair Contractors',   'roof-leak-repair-contractors',    8)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'roofing';

-- 6. Masonry & Brick Repair (12)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Bricklayers',                          'bricklayers',                           1),
  ('Brick Repointing Contractors',         'brick-repointing-contractors',          2),
  ('Brick Replacement Contractors',        'brick-replacement-contractors',         3),
  ('Brick Crack Repair Specialists',       'brick-crack-repair-specialists',        4),
  ('Masonry Stitching / Helifix Installers','masonry-stitching-helifix-installers', 5),
  ('Heritage Masonry Contractors',         'heritage-masonry-contractors',          6),
  ('Cavity Flashing Repair Contractors',   'cavity-flashing-repair-contractors',    7),
  ('Corroded Lintel Repair Contractors',   'corroded-lintel-repair-contractors',    8),
  ('Parapet Repair Contractors',           'parapet-repair-contractors',            9),
  ('Stone Restoration Contractors',        'stone-restoration-contractors',         10),
  ('Masonry Cleaning Contractors',         'masonry-cleaning-contractors',          11),
  ('Efflorescence Treatment Contractors',  'efflorescence-treatment-contractors',   12)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'masonry-brick-repair';

-- 7. Facade & External Envelope (17)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Cladding Contractors',                  'cladding-contractors',                   1),
  ('ACP Replacement Contractors',           'acp-replacement-contractors',            2),
  ('Renderers',                             'renderers',                              3),
  ('Render Repair Contractors',             'render-repair-contractors',              4),
  ('Facade Coating Contractors',            'facade-coating-contractors',             5),
  ('Facade Access Contractors',             'facade-access-contractors',              6),
  ('Aluminium Window Contractors',          'aluminium-window-contractors',           7),
  ('Window Replacement Contractors',        'window-replacement-contractors',         8),
  ('Timber Window Contractors',             'timber-window-contractors',              9),
  ('Timber Window Restoration Specialists', 'timber-window-restoration-specialists',  10),
  ('Heritage Window Contractors',           'heritage-window-contractors',            11),
  ('Window Waterproofing Specialists',      'window-waterproofing-specialists',       12),
  ('Window Leak Repair Contractors',        'window-leak-repair-contractors',         13),
  ('Glaziers',                              'glaziers',                               14),
  ('Balustrade Contractors',                'balustrade-contractors',                 15),
  ('Louvres / Screens Contractors',         'louvres-screens-contractors',            16),
  ('Curtain Wall Contractors',              'curtain-wall-contractors',               17)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'facade-external-envelope';

-- 8. Access Systems (13)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Scaffold Companies',            'scaffold-companies',             1),
  ('Swing Stage Providers',         'swing-stage-providers',          2),
  ('Mast Climber Providers',        'mast-climber-providers',         3),
  ('Hoist Providers',               'hoist-providers',                4),
  ('Rope Access Contractors',       'rope-access-contractors',        5),
  ('BMU Providers',                 'bmu-providers',                  6),
  ('Height Safety Contractors',     'height-safety-contractors',      7),
  ('Anchor Point Installers',       'anchor-point-installers',        8),
  ('Static Line Installers',        'static-line-installers',         9),
  ('Temporary Edge Protection',     'temporary-edge-protection',      10),
  ('Traffic Control',               'traffic-control',                11),
  ('Hoarding Companies',            'hoarding-companies',             12),
  ('Gantry Contractors',            'gantry-contractors',             13)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'access-systems';

-- 9. Investigation & Testing (12)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Leak Detection Specialists',          'leak-detection-specialists',           1),
  ('Concrete Scanning',                   'concrete-scanning',                    2),
  ('NDT Testing',                         'ndt-testing',                          3),
  ('Corrosion Testing',                   'corrosion-testing',                    4),
  ('Concrete Testing Labs',               'concrete-testing-labs',                5),
  ('Drone Inspection',                    'drone-inspection',                     6),
  ('Thermography / Infrared Inspection',  'thermography-infrared-inspection',     7),
  ('Geotechnical Engineers',              'geotechnical-engineers',               8),
  ('Structural Monitoring',               'structural-monitoring',                9),
  ('Moisture Testing',                    'moisture-testing',                     10),
  ('CCTV Drain Inspection',               'cctv-drain-inspection',                11),
  ('Waterproofing Inspectors',            'waterproofing-inspectors-testing',     12)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'investigation-testing';

-- 10. Hazardous Materials (6)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Asbestos Consultants',               'asbestos-consultants',                1),
  ('Asbestos Removal Contractors',       'asbestos-removal-contractors',        2),
  ('Mould Remediation Contractors',      'mould-remediation-contractors',       3),
  ('Lead Paint Contractors',             'lead-paint-contractors',              4),
  ('Hazardous Materials Consultants',    'hazardous-materials-consultants',     5),
  ('Contaminated Materials Disposal',    'contaminated-materials-disposal',     6)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'hazardous-materials';

-- 11. Demolition & Strip-Out (6)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Selective Demolition Contractors',     'selective-demolition-contractors',     1),
  ('Tile & Screed Strip-Out Contractors',  'tile-screed-strip-out-contractors',    2),
  ('Concrete Breaking Contractors',        'concrete-breaking-contractors',        3),
  ('Hydro-Demolition Contractors',         'hydro-demolition-contractors',         4),
  ('Concrete Saw Cutting',                 'concrete-saw-cutting',                 5),
  ('Core Drilling',                        'core-drilling',                        6)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'demolition-strip-out';

-- 12. Plumbing & Drainage (20)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('General Plumbers',                         'general-plumbers',                          1),
  ('Emergency Plumbers',                       'emergency-plumbers',                        2),
  ('Commercial Plumbers',                      'commercial-plumbers',                       3),
  ('Remedial Plumbers',                        'remedial-plumbers',                         4),
  ('Roof Plumbers',                            'roof-plumbers',                             5),
  ('Gas Fitters',                              'gas-fitters',                               6),
  ('Hot Water System Contractors',             'hot-water-system-contractors',              7),
  ('Backflow Prevention Specialists',          'backflow-prevention-specialists',           8),
  ('Pipe Relining Contractors',                'pipe-relining-contractors',                 9),
  ('Drainage Contractors',                     'drainage-contractors',                      10),
  ('Stormwater Contractors',                   'stormwater-contractors',                    11),
  ('Stormwater Pit & Grate Contractors',       'stormwater-pit-grate-contractors',          12),
  ('Stormwater Harvesting Contractors',        'stormwater-harvesting-contractors',         13),
  ('Stormwater Detention System Contractors',  'stormwater-detention-system-contractors',   14),
  ('Stormwater Design Consultants',            'stormwater-design-consultants',             15),
  ('Civil Drainage Contractors',               'civil-drainage-contractors',                16),
  ('Downpipe Contractors',                     'downpipe-contractors',                      17),
  ('Pump System Contractors',                  'pump-system-contractors',                   18),
  ('Sewer Contractors',                        'sewer-contractors',                         19),
  ('Grease Trap Contractors',                  'grease-trap-contractors',                   20)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'plumbing-drainage';

-- 13. Electrical (13)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('General Electricians',               'general-electricians',                1),
  ('Commercial Electricians',            'commercial-electricians',             2),
  ('Emergency Electricians',             'emergency-electricians',              3),
  ('Strata Electricians',                'strata-electricians',                 4),
  ('Switchboard Upgrades',               'switchboard-upgrades',                5),
  ('Lighting Contractors',               'lighting-contractors',                6),
  ('Data & Communications Electricians', 'data-communications-electricians',    7),
  ('Solar & Battery Installers',         'solar-battery-installers',            8),
  ('EV Charging Installers',             'ev-charging-installers',              9),
  ('Security & Access Electricians',     'security-access-electricians',        10),
  ('Test & Tag Contractors',             'test-tag-contractors',                11),
  ('Intercom & CCTV Contractors',        'intercom-cctv-contractors',           12),
  ('Emergency Lighting Contractors',     'emergency-lighting-contractors',      13)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'electrical';

-- 14. Passive Fire & Compliance (6)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Passive Fire Contractors',                  'passive-fire-contractors',                   1),
  ('Fire Stopping Contractors',                 'fire-stopping-contractors',                  2),
  ('Fire Door Contractors',                     'fire-door-contractors',                      3),
  ('Certifiers / Principal Certifying Authority','certifiers-principal-certifying-authority',  4),
  ('NCC Compliance Consultants',                'ncc-compliance-consultants',                 5),
  ('WHS Consultants',                           'whs-consultants',                            6)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'passive-fire-compliance';

-- 15. Specialist Trades (8)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Tilers',                      'tilers',                       1),
  ('Screeders',                   'screeders',                    2),
  ('Painters',                    'painters',                     3),
  ('Carpenters',                  'carpenters',                   4),
  ('Steel Fabricators',           'steel-fabricators',            5),
  ('Concrete Pumping',            'concrete-pumping',             6),
  ('Caulking Contractors',        'caulking-contractors',         7),
  ('Epoxy Flooring Contractors',  'epoxy-flooring-contractors',   8)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'specialist-trades';

-- 16. Landscaping & Grounds (11)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Landscape Contractors',           'landscape-contractors',            1),
  ('Landscape Designers',             'landscape-designers',              2),
  ('Irrigation Contractors',          'irrigation-contractors',           3),
  ('Garden Maintenance Contractors',  'garden-maintenance-contractors',   4),
  ('Tree Services / Arborists',       'tree-services-arborists',          5),
  ('Turf Suppliers & Installers',     'turf-suppliers-installers',        6),
  ('Retaining Wall Contractors',      'retaining-wall-contractors',       7),
  ('Paving Contractors',              'paving-contractors',               8),
  ('Outdoor Drainage Contractors',    'outdoor-drainage-contractors',     9),
  ('Pool & Water Feature Contractors','pool-water-feature-contractors',   10),
  ('Strata Grounds Maintenance',      'strata-grounds-maintenance',       11)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'landscaping-grounds';

-- 17. Cleaning & Maintenance (12)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Strata Cleaning Companies',                'strata-cleaning-companies',                 1),
  ('Commercial Cleaners',                      'commercial-cleaners',                       2),
  ('Window Cleaners',                          'window-cleaners',                           3),
  ('High-Rise Window Cleaning (Rope Access)',  'high-rise-window-cleaning-rope-access',     4),
  ('Pressure Washing Contractors',             'pressure-washing-contractors',              5),
  ('Car Park Cleaners',                        'car-park-cleaners',                         6),
  ('Bin Room Cleaners',                        'bin-room-cleaners',                         7),
  ('Common Area Cleaners',                     'common-area-cleaners',                      8),
  ('Graffiti Removal Contractors',             'graffiti-removal-contractors',              9),
  ('Waste Management Contractors',             'waste-management-contractors',              10),
  ('Pest Control Contractors',                 'pest-control-contractors',                  11),
  ('Pool Maintenance Contractors',             'pool-maintenance-contractors',              12)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'cleaning-maintenance';

-- 18. Legal, Insurance & Finance (6)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Building Defect Lawyers',                    'building-defect-lawyers',                     1),
  ('Strata Insurance Brokers',                   'strata-insurance-brokers',                    2),
  ('Remedial Finance / Strata Loan Providers',   'remedial-finance-strata-loan-providers',      3),
  ('Expert Witnesses (Building)',                'expert-witnesses-building',                   4),
  ('Mediators / Adjudicators',                   'mediators-adjudicators',                      5),
  ('Owners Corporation Lawyers',                 'owners-corporation-lawyers',                  6)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'legal-insurance-finance';

-- 19. Technology & Software (5)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('BIM / Digital Twin Consultants',   'bim-digital-twin-consultants',    1),
  ('Asset Management Software',        'asset-management-software',       2),
  ('Defect Management Platforms',      'defect-management-platforms',     3),
  ('Strata Reporting Software',        'strata-reporting-software',       4),
  ('Building Information Platforms',   'building-information-platforms',  5)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'technology-software';

-- 20. Suppliers & Materials (15)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Waterproofing Suppliers',          'waterproofing-suppliers',           1),
  ('Concrete Repair Suppliers',        'concrete-repair-suppliers',         2),
  ('Sealant Suppliers',                'sealant-suppliers',                 3),
  ('Coating Suppliers',                'coating-suppliers',                 4),
  ('Roofing Material Suppliers',       'roofing-material-suppliers',        5),
  ('Facade Material Suppliers',        'facade-material-suppliers',         6),
  ('Brick / Masonry Suppliers',        'brick-masonry-suppliers',           7),
  ('Access Equipment Suppliers',       'access-equipment-suppliers',        8),
  ('Safety Equipment Suppliers',       'safety-equipment-suppliers',        9),
  ('Testing Equipment Suppliers',      'testing-equipment-suppliers',       10),
  ('Epoxy / Injection Resin Suppliers','epoxy-injection-resin-suppliers',   11),
  ('Expansion Joint Suppliers',        'expansion-joint-suppliers',         12),
  ('Carbon Fibre / FRP Suppliers',     'carbon-fibre-frp-suppliers',        13),
  ('Formwork Suppliers',               'formwork-suppliers',                14),
  ('Signage / Hoarding Suppliers',     'signage-hoarding-suppliers',        15)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'suppliers-materials';

-- 21. Fire Services (5)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Fire Sprinkler Contractors',               'fire-sprinkler-contractors',               1),
  ('Fire Detection / Alarm Contractors',       'fire-detection-alarm-contractors',         2),
  ('Fire Panel Technicians',                   'fire-panel-technicians',                   3),
  ('Hydrant / Hose Reel Contractors',          'hydrant-hose-reel-contractors',            4),
  ('Annual Fire Safety Statement Providers',   'annual-fire-safety-statement-providers',   5)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'fire-services';

-- 22. Mechanical / HVAC (4)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Mechanical Ventilation Contractors',   'mechanical-ventilation-contractors',   1),
  ('Exhaust Fan Contractors',              'exhaust-fan-contractors',              2),
  ('Car Park Ventilation Contractors',     'car-park-ventilation-contractors',     3),
  ('Air Conditioning Contractors',         'air-conditioning-contractors',         4)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'mechanical-hvac';

-- 23. Lifts & Vertical Transport (3)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Lift Maintenance Contractors',   'lift-maintenance-contractors',   1),
  ('Lift Modernisation Contractors', 'lift-modernisation-contractors', 2),
  ('Lift Consultants',               'lift-consultants',               3)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'lifts-vertical-transport';

-- 24. Security & Building Access (5)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Locksmiths',                   'locksmiths',                   1),
  ('Automatic Door Contractors',   'automatic-door-contractors',   2),
  ('Garage Door Contractors',      'garage-door-contractors',      3),
  ('Access Control Contractors',   'access-control-contractors',   4),
  ('Intercom Contractors',         'intercom-contractors',         5)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'security-building-access';

-- 25. General Strata Maintenance (4)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Handyman Services',                  'handyman-services',                  1),
  ('Building Maintenance Contractors',   'building-maintenance-contractors',   2),
  ('Emergency Make-Safe Contractors',    'emergency-make-safe-contractors',    3),
  ('After-Hours Maintenance Contractors','after-hours-maintenance-contractors', 4)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'general-strata-maintenance';

-- 26. Waste / Environmental Services (4)
INSERT INTO categories (name, slug, parent_id, display_order, is_active)
SELECT sub.name, sub.slug, c.id, sub.ord, true
FROM (VALUES
  ('Skip Bin Companies',                        'skip-bin-companies',                         1),
  ('Rubbish Removal',                           'rubbish-removal',                            2),
  ('Flood Restoration / Drying Contractors',    'flood-restoration-drying-contractors',       3),
  ('Odour Treatment / Sanitising Contractors',  'odour-treatment-sanitising-contractors',     4)
) AS sub(name, slug, ord)
JOIN categories c ON c.slug = 'waste-environmental-services';

-- Verify counts
SELECT
  (SELECT COUNT(*) FROM categories WHERE parent_id IS NULL) AS parent_count,
  (SELECT COUNT(*) FROM categories WHERE parent_id IS NOT NULL) AS subcategory_count,
  (SELECT COUNT(*) FROM categories) AS total_count;
