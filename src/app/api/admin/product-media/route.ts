import {
  getProductMedia,
  addProductMedia,
  deleteProductMedia,
  reorderProductMedia,
} from "@/lib/admin/shopify-extra";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET ?id=gid -> { media: [{id,url}] }
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return Response.json({ error: "id required" }, { status: 400 });
  try {
    return Response.json({ media: await getProductMedia(id) });
  } catch (e) {
    return Response.json({ error: msg(e) }, { status: 502 });
  }
}

// POST { id, resourceUrls } -> attach staged images (from /api/admin/upload)
export async function POST(req: Request) {
  let b: { id?: string; resourceUrls?: string[] };
  try {
    b = await req.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }
  if (!b.id || !b.resourceUrls?.length) return Response.json({ error: "id and resourceUrls required" }, { status: 400 });
  try {
    await addProductMedia(b.id, b.resourceUrls);
    return Response.json({ ok: true, media: await getProductMedia(b.id) });
  } catch (e) {
    return Response.json({ error: msg(e) }, { status: 502 });
  }
}

// DELETE { id, mediaIds }
export async function DELETE(req: Request) {
  let b: { id?: string; mediaIds?: string[] };
  try {
    b = await req.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }
  if (!b.id || !b.mediaIds?.length) return Response.json({ error: "id and mediaIds required" }, { status: 400 });
  try {
    await deleteProductMedia(b.id, b.mediaIds);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: msg(e) }, { status: 502 });
  }
}

// PATCH { id, orderedIds } -> reorder (first = cover)
export async function PATCH(req: Request) {
  let b: { id?: string; orderedIds?: string[] };
  try {
    b = await req.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }
  if (!b.id || !b.orderedIds?.length) return Response.json({ error: "id and orderedIds required" }, { status: 400 });
  try {
    await reorderProductMedia(b.id, b.orderedIds);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: msg(e) }, { status: 502 });
  }
}

function msg(e: unknown) {
  return e instanceof Error ? e.message : "error";
}
