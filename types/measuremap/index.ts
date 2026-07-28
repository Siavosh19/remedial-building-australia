// Shared MeasureMap domain types. Kept dependency-free so it can be imported by
// both server and (dynamically loaded) client code without pulling in heavy libs.

export type MeasureMapRole = "owner" | "tester" | "subscriber";
export type AccessStatus = "active" | "inactive";

export type ProjectStatus = "active" | "archived";

export type SourceType = "map" | "drawing";

export type MeasurementType = "length" | "perimeter" | "area" | "count";

/** Internal storage unit is always metric. `ea` = count. */
export type Unit = "m" | "m2" | "ea";

export type ScaleStatus = "unscaled" | "scaled";

/** Metric length units offered during scale calibration. */
export type CalibrationUnit = "mm" | "cm" | "m";

export const UNIT_FOR_TYPE: Record<MeasurementType, Unit> = {
  length: "m",
  perimeter: "m",
  area: "m2",
  count: "ea",
};

/** Practical construction-markup palette for takeoff items. */
export const TAKEOFF_COLOURS: string[] = [
  "#e11d48", // rose
  "#f97316", // orange
  "#eab308", // amber
  "#22c55e", // green
  "#06b6d4", // cyan
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#64748b", // slate
  "#000000", // black
];

export const MEASUREMAP_OWNER_EMAIL = "remedial.building2@mail.com";
