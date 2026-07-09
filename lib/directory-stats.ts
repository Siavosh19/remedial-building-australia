import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

// Single shared source of truth for the "active directory businesses" total.
// Active = published and not suspended (the same set the directory surfaces).
// Cached for an hour so it isn't re-queried on every render.
export const getActiveBusinessCount = unstable_cache(
  async (): Promise<number> => prisma.company.count({ where: { status: "published", suspended: false } }),
  ["active-business-count"],
  { revalidate: 3600 },
);

// Canonical display label for the total — rounded DOWN to the nearest 100 with a "+"
// so it's marketing-friendly but never overstates the real DB count. Use this
// everywhere a total is shown so the figure is identical across pages.
export function formatBusinessCount(n: number): string {
  const floored = Math.max(0, Math.floor(n / 100) * 100);
  return `${floored.toLocaleString("en-AU")}+`;
}
