import { NextRequest, NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/directory-auth";
import { createClient } from "@supabase/supabase-js";

// URL is a public project identifier (not a secret) — hardcode a fallback so
// this route does not depend on NEXT_PUBLIC_SUPABASE_URL being set in the env,
// matching the other working upload routes.
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://krttmsatnftkdnbtwouy.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const BUCKET = "article-images";

export async function POST(request: NextRequest) {
  const user = await getAdminFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return NextResponse.json({ error: "Storage not configured." }, { status: 503 });
  }

  const formData = await request.formData().catch(() => null);
  if (!formData) return NextResponse.json({ error: "Invalid form data." }, { status: 400 });

  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided." }, { status: 400 });

  const ALLOWED = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type. Allowed: JPG, PNG, WebP, GIF." }, { status: 400 });
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large. Maximum 10MB." }, { status: 400 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  // Ensure the bucket exists and is public so getPublicUrl() returns a URL that
  // actually loads. Both calls are idempotent and safe to run on every upload.
  await supabase.storage.createBucket(BUCKET, { public: true }).catch(() => {});
  await supabase.storage.updateBucket(BUCKET, { public: true }).catch(() => {});

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `insights/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type,
    upsert: false,
  });

  if (uploadError) {
    return NextResponse.json({ error: "Upload failed: " + uploadError.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return NextResponse.json({ url: urlData.publicUrl, path });
}

export async function DELETE(request: NextRequest) {
  const user = await getAdminFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { path } = await request.json().catch(() => ({}));
  if (!path || typeof path !== "string") return NextResponse.json({ error: "path required" }, { status: 400 });

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return NextResponse.json({ ok: true });
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  await supabase.storage.from(BUCKET).remove([path]);
  return NextResponse.json({ ok: true });
}
