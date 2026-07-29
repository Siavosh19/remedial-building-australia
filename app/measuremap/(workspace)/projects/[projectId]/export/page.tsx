import { notFound } from "next/navigation";
import { requireMeasureMapUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import { getEstimateData } from "@/lib/measuremap/estimating";
import ExportWorkspace from "@/components/measuremap/export/ExportWorkspace";

export default async function ExportPage({ params }: { params: Promise<{ projectId: string }> }) {
  const user = await requireMeasureMapUser();
  const { projectId } = await params;
  const project = await getOwnedProject(user.id, projectId);
  if (!project) notFound();
  const { categories, items } = await getEstimateData(user.id, projectId);
  return (
    <ExportWorkspace
      projectName={project.project_name || project.full_address}
      reference={project.project_reference || ""}
      categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      items={items}
    />
  );
}
