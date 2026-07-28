import { redirect } from "next/navigation";

// Opening a project lands on the Overview/Home page (organized project summary).
// Map Measure, Plans & Takeoffs and Export are tabs off it. The parent layout
// already checks access + ownership.
export default async function ProjectIndexPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  redirect(`/measuremap/projects/${projectId}/overview`);
}
