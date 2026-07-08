import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { activeJobWhere } from "@/lib/jobs";

export const dynamic = "force-dynamic";

// Public: latest active jobs for the homepage panel. Featured first, then newest.
export async function GET() {
  try {
    const rows = await prisma.job.findMany({
      where: activeJobWhere(),
      orderBy: [{ is_featured: "desc" }, { published_at: "desc" }, { created_at: "desc" }],
      take: 6,
      select: {
        slug: true, title: true, company_name: true, location: true, state: true,
        salary: true, is_featured: true, employment_type: true,
      },
    });
    return NextResponse.json({ jobs: rows });
  } catch (err) {
    console.error("[industry-jobs/latest] failed:", err);
    return NextResponse.json({ jobs: [] });
  }
}
