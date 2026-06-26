import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClientUserFromRequest } from "@/lib/directory-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { FILE_TYPE_IDS } from "@/lib/quote-options";

const BUCKET = "quote-request-files";
const MAX_BYTES = 25 * 1024 * 1024; // 25 MB per file

export async function POST(request: NextRequest) {
  const user = await getClientUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const formData = await request.formData().catch(() => null);
  if (!formData) return NextResponse.json({ error: "Invalid form data." }, { status: 400 });

  const file = formData.get("file") as File | null;
  const requestId = Number(formData.get("requestId"));
  const fileTypeRaw = String(formData.get("fileType") ?? "document");
  const fileType = (FILE_TYPE_IDS as readonly string[]).includes(fileTypeRaw) ? fileTypeRaw : "document";

  if (!file) return NextResponse.json({ error: "No file provided." }, { status: 400 });
  if (!Number.isInteger(requestId)) return NextResponse.json({ error: "Invalid request reference." }, { status: 400 });
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Each file must be 25 MB or smaller." }, { status: 400 });
  }

  // The request must belong to this client and still be open.
  const quoteRequest = await prisma.clientQuoteRequest.findFirst({
    where: { id: requestId, client_user_id: user.id },
    select: { id: true, status: true },
  });
  if (!quoteRequest) return NextResponse.json({ error: "Request not found." }, { status: 404 });
  if (quoteRequest.status === "closed") {
    return NextResponse.json({ error: "This request is closed and can no longer accept files." }, { status: 400 });
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "File storage not configured." }, { status: 503 });
  }

  const supabase = supabaseAdmin;
  // Idempotent — self-heals the bucket on first upload.
  await supabase.storage.createBucket(BUCKET, { public: true }).catch(() => {});

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const safe = `${requestId}/${fileType}-${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(safe, buffer, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (uploadError) {
    return NextResponse.json({ error: "Upload failed: " + uploadError.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(safe);

  const saved = await prisma.quoteRequestFile.create({
    data: {
      request_id: requestId,
      file_type: fileType,
      url: urlData.publicUrl,
      filename: file.name,
      size_bytes: file.size,
      content_type: file.type || null,
      uploaded_by: "client",
    },
  });

  return NextResponse.json({ success: true, file: saved });
}
