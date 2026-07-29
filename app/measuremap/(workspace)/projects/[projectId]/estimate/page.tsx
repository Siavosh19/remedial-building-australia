import { notFound } from "next/navigation";
import { requireMeasureMapUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import { getEstimateData } from "@/lib/measuremap/estimating";
import EstimateWorkspace from "@/components/measuremap/estimate/EstimateWorkspace";

export default async function EstimatePage({ params }: { params: Promise<{ projectId: string }> }) {
  const user = await requireMeasureMapUser();
  const { projectId } = await params;
  const project = await getOwnedProject(user.id, projectId);
  if (!project) notFound();

  const { categories, items } = await getEstimateData(user.id, projectId);
  return <EstimateWorkspace projectId={project.id} initialCategories={categories} initialItems={items} />;
}
