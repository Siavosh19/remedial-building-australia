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

  const parents = categories
    .filter((c) => c.parent_id === null)
    .map((p) => ({
      id: p.id,
      name: p.name,
      children: categories.filter((c) => c.parent_id === p.id).map((c) => ({ id: c.id, name: c.name })),
    }));

  return (
    <QuoteRequestForm
      categories={parents}
      defaults={{
        contactName: user.full_name ?? "",
        contactEmail: user.email,
        contactPhone: user.phone ?? "",
        companyName: profile?.company_name ?? "",
      }}
    />
  );
}
