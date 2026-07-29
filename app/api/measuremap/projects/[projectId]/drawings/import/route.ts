import { NextRequest, NextResponse } from "next/server";
import { getMeasureMapApiUser } from "@/lib/measuremap/access";
import { getOwnedProject } from "@/lib/measuremap/projects";
import { createDrawingWithFile } from "@/lib/measuremap/drawings";

type Ctx = { params: Promise<{ projectId: string }> };
const MAX_BYTES = 40 * 1024 * 1024; // 40 MB
const CT_EXT: Record<string, string> = { "application/pdf": ".pdf", "image/png": ".png", "image/jpeg": ".jpg", "image/webp": ".webp" };
const ALLOWED_CT = Object.keys(CT_EXT);

// Turn a cloud "share" link into a direct-download link where we can.
function normalizeImportUrl(raw: string): string {
  try {
    const u = new URL(raw);
    const h = u.hostname.toLowerCase();
    if (h.includes("dropbox.com")) { u.searchParams.set("dl", "1"); return u.toString(); }
    if (h.includes("drive.google.com")) {
      const m = u.pathname.match(/\/file\/d\/([^/]+)/);
      const id = m?.[1] || u.searchParams.get("id");
      if (id) return `https://drive.google.com/uc?export=download&id=${id}`;
    }
    if (h.includes("1drv.ms") || h.includes("onedrive.live.com") || h.includes("sharepoint.com")) { u.searchParams.set("download", "1"); return u.toString(); }
    return raw;
  } catch { return raw; }
}

function filenameFrom(url: string, contentDisposition: string | null, contentType: string): string {
  let name = "";
  if (contentDisposition) { const m = /filename\*?=(?:UTF-8'')?"?([^";]+)"?/i.exec(contentDisposition); if (m) { try { name = decodeURIComponent(m[1]); } catch { name = m[1]; } } }
  if (!name) { try { name = decodeURIComponent(new URL(url).pathname.split("/").pop() || ""); } catch { /* ignore */ } }
  name = (name.split("?")[0] || "").trim();
  if (!/\.(pdf|png|jpe?g|webp)$/i.test(name)) name = (name || "plan") + (CT_EXT[contentType] || ".pdf");
  return name.replace(/[/\\]+/g, "_").slice(0, 180) || "plan.pdf";
}

// POST { url } → fetch the file server-side and store it as a drawing.
export async function POST(request: NextRequest, ctx: Ctx) {
  const user = await getMeasureMapApiUser(request);
  if (!user) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { projectId } = await ctx.params;
  if (!(await getOwnedProject(user.id, projectId))) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json().catch(() => null);
  const raw = typeof body?.url === "string" ? body.url.trim() : "";
  if (!/^https?:\/\//i.test(raw)) return NextResponse.json({ error: "Enter a valid http(s) link" }, { status: 400 });

  let resp: Response;
  try { resp = await fetch(normalizeImportUrl(raw), { redirect: "follow" }); }
  catch { return NextResponse.json({ error: "Couldn't reach that link" }, { status: 400 }); }
  if (!resp.ok) return NextResponse.json({ error: `Link returned ${resp.status}. Make sure it's shared/public.` }, { status: 400 });

  const contentType = (resp.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
  const bytes = Buffer.from(await resp.arrayBuffer());
  if (bytes.length === 0) return NextResponse.json({ error: "That link returned no file" }, { status: 400 });
  if (bytes.length > MAX_BYTES) return NextResponse.json({ error: "File too large (max 40 MB)" }, { status: 400 });

  const filename = filenameFrom(resp.url || raw, resp.headers.get("content-disposition"), contentType);
  const okType = ALLOWED_CT.includes(contentType) || /\.(pdf|png|jpe?g|webp)$/i.test(filename);
  if (!okType) return NextResponse.json({ error: "That link isn't a PDF or image — use a direct/share link to the file, not a web page." }, { status: 400 });

  const drawing = await createDrawingWithFile(user.id, projectId, { filename, mimeType: contentType || null, bytes, size: bytes.length });
  if (!drawing) return NextResponse.json({ error: "Import failed" }, { status: 500 });
  return NextResponse.json({ drawing });
}
