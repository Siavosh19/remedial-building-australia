import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

const BUCKET = "directory-media";

const PHOTO_LIMITS: Record<string, number> = {
  basic: 5, // Free Listing
  claimed: 15, // Silver
  featured: 15, // Gold
};

export async function POST(request: NextRequest) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    include: { media: true },
  });
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

  const formData = await request.formData().catch(() => null);
  if (!formData) return NextResponse.json({ error: "Invalid form data." }, { status: 400 });

  const file = formData.get("file") as File | null;
  const mediaType = String(formData.get("mediaType") ?? "photo"); // "logo" | "photo"

  if (!file) return NextResponse.json({ error: "No file provided." }, { status: 400 });
  if (!["logo", "photo"].includes(mediaType)) return NextResponse.json({ error: "Invalid media type." }, { status: 400 });

  // Photo limit check
  if (mediaType === "photo") {
    const photoCount = company.media.filter((m) => m.media_type === "photo").length;
    const limit = PHOTO_LIMITS[company.plan_type] ?? 0;
    if (photoCount >= limit) {
      return NextResponse.json({ error: `Your plan allows up to ${limit} project photos.` }, { status: 400 });
    }
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "File storage not configured." }, { status: 503 });
  }

  const supabase = supabaseAdmin;
  // Ensure the bucket exists (idempotent — self-heals on first upload).
  await supabase.storage.createBucket(BUCKET, { public: true }).catch(() => {});

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeName = `${company.id}/${mediaType}-${Date.now()}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(safeName, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (uploadError) {
    return NextResponse.json({ error: "Upload failed: " + uploadError.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(safeName);
  const publicUrl = urlData.publicUrl;

  const media = await prisma.companyMedia.create({
    data: {
      company_id: company.id,
      media_type: mediaType,
      url: publicUrl,
      filename: file.name,
      size_bytes: file.size,
      sort_order: company.media.length,
    },
  });

  // If logo, also update company.logo_url
  if (mediaType === "logo") {
    await prisma.company.update({ where: { id: company.id }, data: { logo_url: publicUrl } });
  }

  return NextResponse.json({ success: true, media });
}
