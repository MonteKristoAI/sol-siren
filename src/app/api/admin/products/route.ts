import {
  listProducts,
  setStatus,
  addTags,
  removeTags,
  updateDetails,
  setPrice,
  createDraftProduct,
} from "@/lib/admin/shopify-admin";
import { moveToArchive, restoreToLive, setPriceHidden, setMetafield, makeProductLive } from "@/lib/admin/shopify-extra";
import { composeDescription, isSizeFitEmpty } from "@/lib/admin/size-fit";

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
      case "makeLive":
        await makeProductLive(b.id);
        break;
      case "backToDraft":
        // Draft is the reverse of makeLive. Shopify drops a draft product from
        // every sales channel on its own, so it leaves the site within the
        // storefront's revalidate window. makeLive republishes it.
        await setStatus(b.id, "DRAFT");
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
      case "updateDetails": {
        const payload = { ...(b.payload || {}) };
        // Size & Fit: compose into the description (shown on site) + save raw for reload.
        if (payload.sizeFit) {
          payload.descriptionHtml = composeDescription(payload.descriptionHtml || "", payload.sizeFit);
          await setMetafield(
            b.id,
            "size_fit",
            isSizeFitEmpty(payload.sizeFit) ? "{}" : JSON.stringify(payload.sizeFit),
            "json"
          );
          delete payload.sizeFit;
        }
        await updateDetails(b.id, payload);
        break;
      }
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
    const descriptionHtml = b.sizeFit
      ? composeDescription(b.descriptionHtml || "", b.sizeFit)
      : b.descriptionHtml;
    const product = await createDraftProduct({
      title: b.title,
      descriptionHtml,
      productType: b.productType,
      tags: b.tags,
      price: b.price != null ? Number(b.price) : undefined,
      imageUrls: b.imageUrls,
    });
    if (b.sizeFit && !isSizeFitEmpty(b.sizeFit) && product?.id) {
      await setMetafield(product.id, "size_fit", JSON.stringify(b.sizeFit), "json").catch(() => {});
    }
    return Response.json({ ok: true, product });
  } catch (e) {
    return Response.json({ error: msg(e) }, { status: 502 });
  }
}

function msg(e: unknown) {
  return e instanceof Error ? e.message : "error";
}
