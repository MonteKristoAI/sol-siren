import { getProductsMeta, setMetafield } from "@/lib/admin/shopify-extra";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET ?id=gid://shopify/Product/123  -> { meta: { history_card_status, care_notes, story_override } }
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return Response.json({ error: "id required" }, { status: 400 });
  try {
    const all = await getProductsMeta([id]);
    return Response.json({ meta: all[id] || {} });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
}

// POST { id, key, value, type? }
export async function POST(req: Request) {
  let b: { id?: string; key?: string; value?: string; type?: any };
  try {
    b = await req.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }
  if (!b.id || !b.key) return Response.json({ error: "id and key required" }, { status: 400 });
  try {
    await setMetafield(b.id, b.key, b.value ?? "", b.type);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
}
