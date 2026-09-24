import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";
import AcceptInviteClient from "./AcceptInviteClient";

export const dynamic = "force-dynamic";

export default async function AcceptInvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  const user = await getCurrentDirectoryUser();
  if (!user) redirect(`/directory/login?next=/client/strata/invite/${encodeURIComponent(token)}`);

  const invite = await prisma.strataMember.findUnique({
    where: { invite_token: token },
    include: { scheme: { select: { name: true, plan_number: true, state: true } } },
  });

  const valid = invite && invite.status === "invited";
  const wrongAccount = valid && invite.email.toLowerCase() !== user.email.toLowerCase();

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <h1 className="text-2xl font-extrabold text-slate-900">Scheme invitation</h1>

      {!valid ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">
            This invitation is no longer valid. It may have already been accepted or withdrawn.
          </p>
          <Link
            href="/client/strata"
            className="mt-4 inline-block rounded-xl bg-sky-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
          >
            Go to strata management
          </Link>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">You have been invited to help manage</p>
          <p className="mt-1 text-lg font-bold text-slate-900">{invite.scheme.name}</p>
          <p className="mt-1 text-sm text-slate-500">
            {invite.scheme.plan_number ? `${invite.scheme.plan_number} · ` : ""}
            {invite.scheme.state} · as {invite.role}
          </p>

          <div className="mt-5">
            {wrongAccount ? (
              <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
                This invitation was sent to <strong>{invite.email}</strong>, but you are signed in as{" "}
                <strong>{user.email}</strong>. Sign in with the invited address to accept it.
              </p>
            ) : (
              <>
                <p className="mb-4 text-sm text-slate-500">
                  Accepting gives you access to this scheme&apos;s records, including other owners&apos; contact
                  details. Only accept if you are part of this scheme.
                </p>
                <AcceptInviteClient token={token} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
