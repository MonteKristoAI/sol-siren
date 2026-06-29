import { getMetafield, setMetafield } from "@/lib/admin/shopify-extra";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET ?id=gid://shopify/Order/123 -> { checklist: {...} }
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return Response.json({ error: "id required" }, { status: 400 });
  try {
    const raw = await getMetafield(id, "packing_checklist");
    return Response.json({ checklist: raw ? JSON.parse(raw) : {} });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
}

// POST { id, checklist:{...} }
export async function POST(req: Request) {
  let b: { id?: string; checklist?: Record<string, boolean> };
  try {
    b = await req.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }
  if (!b.id || !b.checklist) return Response.json({ error: "id and checklist required" }, { status: 400 });
  try {
    await setMetafield(b.id, "packing_checklist", JSON.stringify(b.checklist), "json");
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
}
