export const VALID_CATEGORIES = [
  "Building Commission NSW",
  "DBP Act",
  "Class 2 Buildings",
  "Waterproofing Defects",
  "Façade Defects",
  "Concrete Repair",
  "Strata Defects",
  "Building Defects",
  "Remedial Construction",
  "Product & Material Updates",
  "New Construction Systems",
  "Other",
] as const;

export type NewsCategory = typeof VALID_CATEGORIES[number];

export const FILTER_CATEGORIES = ["All", ...VALID_CATEGORIES] as const;

export const CATEGORY_IMAGES: Record<string, string> = {
  "Building Commission NSW":  "/Images/News2-Building-Commissioner.jpg",
  "DBP Act":                  "/Images/News4-Design%20practiotioner.jpg",
  "Class 2 Buildings":        "/Images/News3-class%202%20building%20Registration.jpg",
  "Strata Defects":           "/Images/News8-Apartment.jpg",
  "Waterproofing Defects":    "/Images/News9waterproroing%20defects%20planterbxoes.jpg",
  "Façade Defects":           "/Images/News5-Cladding.jpg",
  "Concrete Repair":          "/Images/News7-Concrete%20Spalling.jpg",
  "Building Defects":         "/Images/News7-Concrete%20Spalling.jpg",
  "Remedial Construction":    "/Images/News10-NCC-Building%20Codes-Standard.jpg",
  "Product & Material Updates": "/Images/News10-NCC-Building%20Codes-Standard.jpg",
  "New Construction Systems": "/Images/News10-NCC-Building%20Codes-Standard.jpg",
  "Other":                    "/Images/News11-No%20title.png",
};

export function getCategoryImage(category: string): string {
  return CATEGORY_IMAGES[category] ?? "/Images/News11-No%20title.png";
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}
