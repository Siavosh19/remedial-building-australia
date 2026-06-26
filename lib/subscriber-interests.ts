// Shared, client-safe constants for newsletter subscription.
// Kept OUT of the API route so client components (e.g. NewsletterSignup) can
// import these without pulling server-only modules into the client bundle.

export const SUBSCRIBER_INTERESTS = [
  "All Topics",
  "Concrete Repair & Spalling",
  "Waterproofing & Membranes",
  "Façade & External Envelope",
  "Building Compliance & NCC",
  "Strata & Class 2 Buildings",
  "Fire Compliance",
  "Repair Systems & Products",
] as const;

export type SubscriberInterest = (typeof SUBSCRIBER_INTERESTS)[number];
