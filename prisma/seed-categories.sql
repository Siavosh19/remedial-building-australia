INSERT INTO categories (name, slug, description, display_order, is_active) VALUES
  ('Waterproofing', 'waterproofing', 'Waterproofing membranes, coatings, and systems for balconies, roofs, basements and wet areas', 1, true),
  ('Concrete Repair', 'concrete-repair', 'Structural and cosmetic concrete repair including crack injection, spalling, and surface restoration', 2, true),
  ('Facade Remediation', 'facade-remediation', 'External envelope repairs including render, cladding, brickwork, and sealant replacement', 3, true),
  ('Structural Engineering', 'structural-engineering', 'Structural assessment, design, and remediation for buildings and structures', 4, true),
  ('Building Inspection', 'building-inspection', 'Defect identification, condition reports, and technical due diligence for Class 2 buildings', 5, true),
  ('Leak Investigation', 'leak-investigation', 'Water ingress diagnosis and leak detection for roofs, facades, and below-grade structures', 6, true),
  ('Roof Repairs', 'roof-repairs', 'Roof membrane replacement, flashing repairs, box gutter remediation, and drainage upgrades', 7, true),
  ('Balcony & Podium Repairs', 'balcony-podium-repairs', 'Balcony and podium deck repairs including waterproofing, tiling, and structural reinforcement', 8, true),
  ('Strata Remedial Works', 'strata-remedial-works', 'Specialist remedial building contractors for strata-titled residential and commercial buildings', 9, true),
  ('Corrosion & Reinforcement', 'corrosion-reinforcement', 'Steel reinforcement repair, cathodic protection, and anti-corrosion coatings', 10, true),
  ('Joint & Sealant Works', 'joint-sealant-works', 'Control joint replacement, expansion joint systems, and sealant remediation', 11, true),
  ('Drainage & Plumbing', 'drainage-plumbing', 'Stormwater, drainage design, pipe relining, and hydraulic remediation', 12, true)
ON CONFLICT (slug) DO NOTHING;
