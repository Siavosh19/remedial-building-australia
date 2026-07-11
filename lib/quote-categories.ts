import { prisma } from "@/lib/prisma";

// Grouped work-category tree for the quote-request form. Only offers categories
// that actually have published businesses (as a main or approved secondary
// category) — otherwise a client hits a dead-end "no matching businesses" result.
export async function getQuoteCategoryTree() {
  const categories = await prisma.category.findMany({
    where: { is_active: true },
    select: { id: true, name: true, slug: true, parent_id: true },
    orderBy: [{ display_order: "asc" }, { name: "asc" }],
  });

  const [mainCats, secCats] = await Promise.all([
    prisma.company.findMany({
      where: { status: "published", main_category_id: { not: null } },
      select: { main_category_id: true },
      distinct: ["main_category_id"],
    }),
    prisma.companyCategory.findMany({
      where: { is_approved: true, company: { status: "published" } },
      select: { category_id: true },
      distinct: ["category_id"],
    }),
  ]);
  const withBiz = new Set<number>([
    ...mainCats.map((c) => c.main_category_id).filter((x): x is number => x != null),
    ...secCats.map((c) => c.category_id),
  ]);

  const childrenBiz = categories.filter((c) => c.parent_id != null && withBiz.has(c.id));
  const parentsWithBizChild = new Set(childrenBiz.map((c) => c.parent_id!));
  const topLevel = categories.filter(
    (c) => c.parent_id == null && (withBiz.has(c.id) || parentsWithBizChild.has(c.id)),
  );
  return [...topLevel, ...childrenBiz].map((c) => ({ id: c.id, name: c.name, slug: c.slug, parent_id: c.parent_id }));
}
