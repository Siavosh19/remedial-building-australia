import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentClientUser } from "@/lib/directory-auth";
import QuoteRequestForm from "@/components/client/QuoteRequestForm";

export const dynamic = "force-dynamic";

export default async function NewQuoteRequestPage() {
  const user = await getCurrentClientUser();
  if (!user) redirect("/directory/login");

  const profile = await prisma.clientProfile.findUnique({ where: { user_id: user.id } });

  const categories = await prisma.category.findMany({
    where: { is_active: true },
    select: { id: true, name: true, slug: true, parent_id: true },
    orderBy: [{ display_order: "asc" }, { name: "asc" }],
  });

  // Only offer categories that actually have published businesses (as a main or
  // approved secondary category) — otherwise the client hits a dead-end
  // "no matching businesses" result for a category nobody is listed under.
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

  // Tree for the same grouped browse used by the directory search: parent groups
  // plus only the subcategories that actually have businesses (no dead-ends).
  const childrenBiz = categories.filter((c) => c.parent_id != null && withBiz.has(c.id));
  const neededParents = new Set(childrenBiz.map((c) => c.parent_id!));
  const groups = categories.filter((c) => neededParents.has(c.id));
  const categoryTree = [...groups, ...childrenBiz].map((c) => ({ id: c.id, name: c.name, slug: c.slug, parent_id: c.parent_id }));

  return (
    <QuoteRequestForm
      categories={categoryTree}
      defaults={{
        contactName: user.full_name ?? "",
        contactEmail: user.email,
        contactPhone: user.phone ?? "",
        companyName: profile?.company_name ?? "",
      }}
    />
  );
}
