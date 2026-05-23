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
  "Building Commission NSW": "/Images/Categories/facade-external-envelope.jpg",
  "DBP Act": "/Images/Categories/facade-external-envelope.jpg",
  "Class 2 Buildings": "/Images/Categories/basements-substructure.jpg",
  "Strata Defects": "/Images/Categories/internal-defects-finishes.jpg",
  "Waterproofing Defects": "/Images/Categories/waterproofing-water-ingress.jpg",
  "Façade Defects": "/Images/Categories/facade-external-envelope.jpg",
  "Concrete Repair": "/Images/Categories/concrete-structural-defects.jpg",
  "Building Defects": "/Images/Categories/concrete-structural-defects.jpg",
  "Remedial Construction": "/Images/Categories/basements-substructure.jpg",
  "Product & Material Updates": "/Images/Categories/miscellaneous-other.jpg",
  "New Construction Systems": "/Images/Categories/miscellaneous-other.jpg",
  "Other": "/Images/Categories/miscellaneous-other.jpg",
};

export function getCategoryImage(category: string): string {
  return CATEGORY_IMAGES[category] ?? "/Images/Categories/miscellaneous-other.jpg";
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}
