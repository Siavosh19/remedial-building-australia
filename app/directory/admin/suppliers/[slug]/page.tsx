import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SupplierDetailClient from "./SupplierDetailClient";

export const dynamic = "force-dynamic";

export default async function AdminSupplierDetailPage({ params }: { params: { slug: string } }) {
  const supplier = await prisma.supplier.findUnique({
    where: { slug: params.slug },
    include: {
      products: {
        orderBy: { created_at: "desc" },
      },
      users: {
        select: { id: true, email: true, full_name: true, role: true, created_at: true },
      },
      update_requests: {
        orderBy: { created_at: "desc" },
        take: 10,
      },
    },
  });

  if (!supplier) notFound();

  const auditLogs = await prisma.auditLog.findMany({
    where: { entity_type: "supplier", entity_id: String(supplier.id) },
    orderBy: { created_at: "desc" },
    take: 20,
  });

  return (
    <SupplierDetailClient
      supplier={JSON.parse(JSON.stringify(supplier))}
      auditLogs={JSON.parse(JSON.stringify(auditLogs))}
    />
  );
}
