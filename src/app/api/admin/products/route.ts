import {
  listProducts,
  setStatus,
  addTags,
  removeTags,
  updateDetails,
  setPrice,
  createDraftProduct,
} from "@/lib/admin/shopify-admin";
import { moveToArchive, restoreToLive, setPriceHidden } from "@/lib/admin/shopify-extra";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json({ products: await listProducts() });
  } catch (e) {
    return Response.json({ error: msg(e) }, { status: 502 });
  }
}

export async function PATCH(req: Request) {
  let b: { id?: string; action?: string; payload?: any };
  try {
    b = await req.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }
  if (!b.id || !b.action) return Response.json({ error: "id and action required" }, { status: 400 });
  try {
    switch (b.action) {
      case "markSold":
      case "archive":
        // Archived pieces stay ACTIVE + tagged so they remain on the site's
        // brand archive (not hidden). See shopify-extra.moveToArchive.
        await moveToArchive(b.id);
        await removeTags(b.id, ["reserved"]);
        break;
      case "restore":
      case "unarchive":
        await restoreToLive(b.id);
        break;
      case "priceHidden":
        await setPriceHidden(b.id, !!b.payload?.hidden);
        break;
      case "reserve":
        await addTags(b.id, ["reserved"]);
        break;
      case "unreserve":
        await removeTags(b.id, ["reserved"]);
        break;
      case "setStatus":
        await setStatus(b.id, b.payload?.status);
        break;
      case "updateDetails":
        await updateDetails(b.id, b.payload || {});
        break;
      case "setPrice":
        if (!b.payload?.variantId) return Response.json({ error: "variantId required" }, { status: 400 });
        await setPrice(b.id, b.payload.variantId, Number(b.payload.price));
        break;
      default:
        return Response.json({ error: "unknown action" }, { status: 400 });
    }
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: msg(e) }, { status: 502 });
  }
}

export async function POST(req: Request) {
  let b: any;
  try {
    b = await req.json();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }
  if (!b.title) return Response.json({ error: "title required" }, { status: 400 });
  try {
    const product = await createDraftProduct({
      title: b.title,
      descriptionHtml: b.descriptionHtml,
      productType: b.productType,
      tags: b.tags,
      price: b.price != null ? Number(b.price) : undefined,
      imageUrls: b.imageUrls,
    });
    return Response.json({ ok: true, product });
  } catch (e) {
    return Response.json({ error: msg(e) }, { status: 502 });
  }
}

function msg(e: unknown) {
  return e instanceof Error ? e.message : "error";
}
