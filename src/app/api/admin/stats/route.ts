import { listProducts, listOrders } from "@/lib/admin/shopify-admin";
import { listChats } from "@/lib/admin/retell-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

    const active = products.filter((p) => p.status === "ACTIVE").length;
    const draft = products.filter((p) => p.status === "DRAFT").length;
    const sold = products.filter((p) => p.status === "ARCHIVED" || p.tags.includes("sold")).length;
    const reserved = products.filter((p) => p.tags.includes("reserved")).length;

    const ordersThisMonth = orders.filter((o) => new Date(o.createdAt).getTime() >= monthStart);
    const unfulfilled = orders.filter((o) => /unfulfilled|partial/i.test(o.fulfillmentStatus)).length;
    const revenueThisMonth = ordersThisMonth.reduce((s, o) => s + o.total, 0);

    const chatsThisWeek = chats.filter((c) => (c.start_timestamp || 0) >= weekAgo).length;

    // pieces live longest without selling (aging) — top 5 oldest ACTIVE
    const aging = products
      .filter((p) => p.status === "ACTIVE")
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .slice(0, 5)
      .map((p) => ({ title: p.title, handle: p.handle, createdAt: p.createdAt }));

    return Response.json({
      pieces: { active, draft, sold, reserved, total: products.length },
      orders: { thisMonth: ordersThisMonth.length, unfulfilled, revenueThisMonth },
      chats: { total: chats.length, thisWeek: chatsThisWeek },
      aging,
      recentOrders: orders.slice(0, 5),
    });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "error" }, { status: 502 });
  }
}
