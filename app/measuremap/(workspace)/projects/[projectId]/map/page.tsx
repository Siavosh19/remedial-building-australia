import { notFound } from "next/navigation";
import { requireMeasureMapUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import { listItems, listCategories } from "@/lib/measuremap/estimating";
import MapWorkspaceLoader from "@/components/measuremap/map/MapWorkspaceLoader";

export default async function MapPage({ params }: { params: Promise<{ projectId: string }> }) {
  const user = await requireMeasureMapUser();
  const { projectId } = await params;
  const project = await getOwnedProject(user.id, projectId);
  if (!project) notFound();

  const [initialItems, initialCategories] = await Promise.all([
    listItems(user.id, projectId),
    listCategories(user.id, projectId),
  ]);

  return (
    <MapWorkspaceLoader
      project={{
        id: project.id,
        latitude: project.latitude,
        longitude: project.longitude,
        full_address: project.full_address,
      }}
      initialItems={initialItems}
      initialCategories={initialCategories}
    />
  );
}
