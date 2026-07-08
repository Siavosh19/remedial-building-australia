import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

// Public listings are active AND not past expiry. published_at drives ordering.
export function activeJobWhere(extra?: Prisma.JobWhereInput): Prisma.JobWhereInput {
  return {
    status: "active",
    OR: [{ expires_at: null }, { expires_at: { gt: new Date() } }],
    ...extra,
  };
}

export function baseJobSlug(title: string, location: string): string {
  const raw = `${title} ${location}`
    .toLowerCase()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[çc]/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return raw.slice(0, 70).replace(/-+$/g, "") || "job";
}

// Produce a slug unique across the jobs table (title-location, then -2, -3, …).
export async function uniqueJobSlug(title: string, location: string, ignoreId?: number): Promise<string> {
  const base = baseJobSlug(title, location);
  let candidate = base;
  let n = 1;
  // Small bounded loop — collisions are rare.
  for (;;) {
    const existing = await prisma.job.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!existing || existing.id === ignoreId) return candidate;
    n += 1;
    candidate = `${base}-${n}`;
  }
}

// Try to match a job's company to a published directory Company for the optional
// "View Company Profile" link. Name-based, case-insensitive, best-effort.
export async function findDirectoryCompany(companyName: string) {
  if (!companyName?.trim()) return null;
  return prisma.company.findFirst({
    where: { name: { equals: companyName.trim(), mode: "insensitive" }, status: "published" },
    select: { id: true, slug: true, name: true, logo_url: true },
  });
}
