// Shared constants + label maps for the Industry Jobs board. Kept framework-free
// so both server and client components can import from here.

export const JOB_CATEGORY_GROUPS: { group: string; categories: string[] }[] = [
  {
    group: "Strata & Property",
    categories: [
      "Strata Manager",
      "Building Manager",
      "Facilities Manager",
      "Property Manager",
      "Owners Corporation Manager",
      "Asset Manager",
    ],
  },
  {
    group: "Consulting & Engineering",
    categories: [
      "Building Consultant",
      "Remedial Engineer",
      "Structural Engineer",
      "Façade Engineer",
      "Waterproofing Consultant",
      "Building Surveyor",
      "Quantity Surveyor",
      "Superintendent",
      "Design Practitioner",
      "Project Manager",
    ],
  },
  {
    group: "Construction",
    categories: [
      "Remedial Builder",
      "Site Manager",
      "Contract Administrator",
      "Estimator",
      "Waterproofing Contractor",
      "Concrete Repair Technician",
      "Façade Contractor",
      "Roofer",
      "Carpenter",
      "Renderer",
      "Painter",
      "Glazier",
      "Tiler",
      "Rope Access Technician",
      "Scaffolder",
    ],
  },
  {
    group: "Suppliers",
    categories: ["Technical Sales", "Product Specialist", "Sales Representative"],
  },
  {
    group: "Administration",
    categories: [
      "Office Administrator",
      "Reception",
      "Scheduler",
      "Accounts",
      "Administration Assistant",
    ],
  },
];

export function jobCategorySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[ç]/g, "c")
    .replace(/[èéêë]/g, "e")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const AU_STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"] as const;
export type AuState = (typeof AU_STATES)[number];

export const EMPLOYMENT_TYPES = [
  { value: "full_time", label: "Full-time" },
  { value: "part_time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "casual", label: "Casual" },
  { value: "temporary", label: "Temporary" },
  { value: "apprenticeship", label: "Apprenticeship / Traineeship" },
] as const;

export const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry level" },
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead / Principal" },
  { value: "executive", label: "Executive / Management" },
] as const;

// Coarse salary bands used by the homepage filter (matched against the free-text
// salary field with a numeric sniff — the stored value stays human-readable).
export const SALARY_BANDS = [
  { value: "under-80k", label: "Under $80k", min: 0, max: 80000 },
  { value: "80-120k", label: "$80k – $120k", min: 80000, max: 120000 },
  { value: "120-160k", label: "$120k – $160k", min: 120000, max: 160000 },
  { value: "160k-plus", label: "$160k+", min: 160000, max: Infinity },
] as const;

export const employmentTypeLabel = (v: string | null | undefined) =>
  EMPLOYMENT_TYPES.find((t) => t.value === v)?.label ?? "";
export const experienceLevelLabel = (v: string | null | undefined) =>
  EXPERIENCE_LEVELS.find((t) => t.value === v)?.label ?? "";

export const JOB_APPLICATION_STATUSES = ["new", "reviewed", "contacted", "closed"] as const;

export const DEFAULT_JOB_PRICING = [
  {
    key: "standard",
    name: "Standard Job Listing",
    description: "A 30-day job listing on the Industry Jobs board.",
    kind: "listing",
    amount_cents: 24900,
    duration_days: 30,
    display_order: 1,
    features: [
      "Live for 30 days",
      "Appears in Latest Jobs + search",
      "Applications emailed to you + saved in your dashboard",
      "One-click renew",
    ],
  },
  {
    key: "featured",
    name: "Featured Job Listing",
    description: "A 30-day listing with a Featured badge and priority placement.",
    kind: "listing",
    amount_cents: 39900,
    duration_days: 30,
    display_order: 2,
    features: [
      "Everything in Standard",
      "Featured badge",
      "Top placement in Featured Jobs",
      "Highlighted card styling",
    ],
  },
] as const;
