import { notFound } from "next/navigation";
import { requireMeasureMapUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import { listDrawings } from "@/lib/measuremap/drawings";
import PlansWorkspace from "@/components/measuremap/plans/PlansWorkspace";

export default async function DrawingsPage({ params }: { params: Promise<{ projectId: string }> }) {
  const user = await requireMeasureMapUser();
  const { projectId } = await params;
  const project = await getOwnedProject(user.id, projectId);
  if (!project) notFound();

  const drawings = await listDrawings(user.id, projectId);
  return <PlansWorkspace projectId={project.id} initialDrawings={drawings} />;
}
