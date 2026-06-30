import { listProducts, listOrders } from "@/lib/admin/shopify-admin";
import { getProductsMeta } from "@/lib/admin/shopify-extra";
import { countNewInquiries } from "@/lib/admin/inbox";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MEAS_RE = /(\d+\s*(cm|in\b|inch|"|”)|bust|chest|length|shoulder|sleeve|waist|measurement)/i;

export async function GET() {
  try {
    const [products, orders, newInquiries] = await Promise.all([
      listProducts().catch(() => []),
      listOrders(50).catch(() => []),
      countNewInquiries().catch(() => 0),
    ]);

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    const isArchived = (p: any) => p.status === "ARCHIVED" || p.tags.includes("archive") || p.tags.includes("sold");
    const live = products.filter((p) => p.status === "ACTIVE" && !isArchived(p));
    const archivedCount = products.filter(isArchived).length;
    const draft = products.filter((p) => p.status === "DRAFT").length;
    const reserved = products.filter((p) => p.tags.includes("reserved")).length;

    const ordersThisMonth = orders.filter((o) => new Date(o.createdAt).getTime() >= monthStart);
    const unfulfilled = orders.filter((o) => /unfulfilled|partial/i.test(o.fulfillmentStatus));
    const revenueThisMonth = ordersThisMonth.reduce((s, o) => s + o.total, 0);

    const missingMeasurements = live
      .filter((p) => !MEAS_RE.test(`${p.description} ${p.tags.join(" ")}`))
      .map((p) => ({ title: p.title.split(" — ")[0], handle: p.handle }));

    let missingCards: { title: string; handle: string }[] = [];
    try {
      const meta = await getProductsMeta(live.map((p) => p.id));
      missingCards = live
        .filter((p) => !meta[p.id]?.history_card_status)
        .map((p) => ({ title: p.title.split(" — ")[0], handle: p.handle }));
    } catch {
      missingCards = [];
    }

    const aging = live
      .slice()
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .slice(0, 6)
      .map((p) => ({ title: p.title.split(" — ")[0], handle: p.handle, createdAt: p.createdAt }));

    return Response.json({
      pieces: { live: live.length, draft, archived: archivedCount, reserved, total: products.length },
      orders: { thisMonth: ordersThisMonth.length, unfulfilled: unfulfilled.length, revenueThisMonth },
      todo: {
        ordersToFulfill: unfulfilled.length,
        missingMeasurements: { count: missingMeasurements.length, sample: missingMeasurements.slice(0, 6) },
        missingCards: { count: missingCards.length, sample: missingCards.slice(0, 6) },
        newInquiries,
      },
      aging,
      recentOrders: orders.slice(0, 5),
    });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
}
