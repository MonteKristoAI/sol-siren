import { listProducts, listOrders } from "@/lib/admin/shopify-admin";
import { listChats } from "@/lib/admin/retell-admin";
import { getProductsMeta } from "@/lib/admin/shopify-extra";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MEAS_RE = /(\d+\s*(cm|in\b|inch|"|”)|bust|chest|length|shoulder|sleeve|waist|measurement)/i;

export async function GET() {
  try {
    const [products, orders, chats] = await Promise.all([
      listProducts().catch(() => []),
      listOrders(50).catch(() => []),
      listChats(50).catch(() => []),
    ]);

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const isArchived = (p: any) => p.status === "ARCHIVED" || p.tags.includes("archive") || p.tags.includes("sold");
    const live = products.filter((p) => p.status === "ACTIVE" && !isArchived(p));
    const archivedCount = products.filter(isArchived).length;
    const draft = products.filter((p) => p.status === "DRAFT").length;
    const reserved = products.filter((p) => p.tags.includes("reserved")).length;

    const ordersThisMonth = orders.filter((o) => new Date(o.createdAt).getTime() >= monthStart);
    const unfulfilled = orders.filter((o) => /unfulfilled|partial/i.test(o.fulfillmentStatus));
    const revenueThisMonth = ordersThisMonth.reduce((s, o) => s + o.total, 0);

    const chatsThisWeek = chats.filter((c) => (c.start_timestamp || 0) >= weekAgo).length;
    const chatsWaiting = chats.filter((c) => c.chat_status === "ongoing").length;

    // Pieces missing measurements (no size info in description)
    const missingMeasurements = live
      .filter((p) => !MEAS_RE.test(`${p.description} ${p.tags.join(" ")}`))
      .map((p) => ({ title: p.title.split(" — ")[0], handle: p.handle }));

    // Pieces missing a prepared history card (no ss_admin history_card_status metafield)
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
      chats: { total: chats.length, thisWeek: chatsThisWeek, waiting: chatsWaiting },
      todo: {
        ordersToFulfill: unfulfilled.length,
        chatsWaiting,
        missingMeasurements: { count: missingMeasurements.length, sample: missingMeasurements.slice(0, 6) },
        missingCards: { count: missingCards.length, sample: missingCards.slice(0, 6) },
        // Filled once the Inbox (contact requests) ships in phase 2:
        newInquiries: null,
        similarPieceRequests: null,
      },
      aging,
      recentOrders: orders.slice(0, 5),
    });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
}
