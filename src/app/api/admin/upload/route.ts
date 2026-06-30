import { stageUpload } from "@/lib/admin/shopify-extra";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Accepts multipart files under "files", stages each to Shopify, returns
// resourceUrls usable as product media originalSource.
export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const files = form.getAll("files").filter((f) => f instanceof File) as File[];
    if (files.length === 0) return Response.json({ error: "no files" }, { status: 400 });
    const urls: string[] = [];
    for (const f of files) {
      const buf = Buffer.from(await f.arrayBuffer());
      urls.push(await stageUpload(f.name || "photo.jpg", f.type || "image/jpeg", buf));
    }
    return Response.json({ urls });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
}
