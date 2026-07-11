import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentDirectoryUser } from "@/lib/directory-auth";

export const dynamic = "force-dynamic";

// Airbnb-style role switch. One login, two dashboards:
//   ?to=client   → ensure the account has a ClientProfile (provision on first
//                  switch), then land on the client portal.
//   ?to=business → land on the business dashboard (the overview handles the
//                  "no listing yet" case with a create-listing prompt).
export async function GET(request: Request) {
  const user = await getCurrentDirectoryUser();
  if (!user) {
    return NextResponse.redirect(new URL("/directory/login", request.url));
  }

  const to = new URL(request.url).searchParams.get("to");

  if (to === "client") {
    const existing = await prisma.clientProfile.findUnique({
      where: { user_id: user.id },
      select: { id: true },
    });
    if (!existing) {
      await prisma.clientProfile.create({
        data: {
          user_id: user.id,
          client_type: "other",
          company_name: null,
        },
      });
    }
    return NextResponse.redirect(new URL("/client/dashboard", request.url));
  }

  // Default / to=business
  return NextResponse.redirect(new URL("/directory/dashboard", request.url));
}
