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
    select: { id: true, name: true, parent_id: true },
    orderBy: [{ display_order: "asc" }, { name: "asc" }],
  });
  const nameById = new Map(categories.map((c) => [c.id, c.name]));

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

  // Flat, searchable list of selectable categories (parent context in the label).
  const options = categories
    .filter((c) => withBiz.has(c.id))
    .map((c) => ({
      id: c.id,
      name: c.parent_id && nameById.get(c.parent_id) ? `${nameById.get(c.parent_id)} › ${c.name}` : c.name,
      children: [] as { id: number; name: string }[],
    }));

  return (
    <QuoteRequestForm
      categories={options}
      defaults={{
        contactName: user.full_name ?? "",
        contactEmail: user.email,
        contactPhone: user.phone ?? "",
        companyName: profile?.company_name ?? "",
      }}
    />
  );
}
