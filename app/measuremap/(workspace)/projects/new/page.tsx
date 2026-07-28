import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireMeasureMapUser } from "@/lib/measuremap/access";
import NewProjectForm from "@/components/measuremap/NewProjectForm";

export default async function NewProjectPage() {
  await requireMeasureMapUser("/measuremap/projects/new");

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Link href="/measuremap" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>
      <h1 className="mt-4 text-xl font-bold tracking-tight text-slate-900">New project</h1>
      <p className="mt-1 text-sm text-slate-500">Every project is anchored to a physical address. The aerial map opens on it once created.</p>

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6">
        <NewProjectForm />
      </div>
    </main>
  );
}
