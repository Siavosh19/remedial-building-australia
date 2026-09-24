import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import NewSchemeForm from "./NewSchemeForm";

export const dynamic = "force-dynamic";

export default async function NewSchemePage() {
  const user = await getCurrentDirectoryUser();
  if (!user) redirect("/directory/login?next=/client/strata/new");

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <Link href="/client/strata" className="text-xs font-semibold text-slate-500 hover:text-slate-700">
          ← Strata management
        </Link>
        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">Set up a scheme</h1>
        <p className="mt-1 text-sm text-slate-500">
          You can change any of this later. Next you will enter the lots and their entitlements.
        </p>
      </div>

      <NewSchemeForm />
    </div>
  );
}
