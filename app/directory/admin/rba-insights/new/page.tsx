import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { InsightEditor } from "../InsightEditor";

export default async function NewInsightPage() {
  const user = await getCurrentDirectoryUser();
  if (!user || !["admin", "super_admin"].includes(user.role)) redirect("/directory/login");

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <Link href="/directory/admin/rba-insights" className="text-lg font-bold text-slate-900 hover:text-black">
          ← RBA Insights
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">New Article</h1>
      </div>
      <InsightEditor />
    </div>
  );
}
