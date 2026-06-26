import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getDirectoryUserFromRequest } from "@/lib/directory-auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

type Params = { params: Promise<{ id: string }> };

const BUCKET = "quote-request-files";
const MAX_BYTES = 25 * 1024 * 1024;

export async function POST(request: NextRequest, { params }: Params) {
  const user = await getDirectoryUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { id } = await params;
  const deliveryId = Number(id);
  if (!Number.isInteger(deliveryId)) return NextResponse.json({ error: "Invalid ID." }, { status: 400 });

  const company = await prisma.company.findFirst({
    where: { users: { some: { user_id: user.id } } },
    select: { id: true },
  });
  if (!company) return NextResponse.json({ error: "Company not found." }, { status: 404 });

  const delivery = await prisma.quoteRequestDelivery.findFirst({
    where: { id: deliveryId, company_id: company.id },
    select: { id: true, request_id: true },
  });
  if (!delivery) return NextResponse.json({ error: "Lead request not found." }, { status: 404 });

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "File must be 25 MB or smaller." }, { status: 400 });

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "File storage not configured." }, { status: 503 });
  }

  const supabase = supabaseAdmin;
  await supabase.storage.createBucket(BUCKET, { public: true }).catch(() => {});

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "pdf";
  const safe = `quotes/${delivery.request_id}/${company.id}-${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(safe, buffer, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (uploadError) return NextResponse.json({ error: "Upload failed: " + uploadError.message }, { status: 500 });

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(safe);

  // Also surface the quote document to the client on the request.
  await prisma.$transaction([
    prisma.quoteRequestDelivery.update({ where: { id: deliveryId }, data: { quote_doc_url: urlData.publicUrl } }),
    prisma.quoteRequestFile.create({
      data: {
        request_id: delivery.request_id,
        file_type: "document",
        url: urlData.publicUrl,
        filename: file.name,
        size_bytes: file.size,
        content_type: file.type || null,
        uploaded_by: "business",
      },
    }),
  ]);

  return NextResponse.json({ success: true, url: urlData.publicUrl });
}
