"use client";

import { useEffect, useState } from "react";
import { Globe, Loader2 } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import { api, fmtDate, money } from "../_components/api";

type ShipTo = { city: string; province: string; country: string } | null;
type Order = {
  name: string;
  createdAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  total: number;
  currency: string;
  customer: string;
  email: string;
  country: string | null;
  ship: ShipTo;
  items: string[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    api<{ orders: Order[] }>("/orders")
      .then((d) => setOrders(d.orders))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  const intl = (c: string | null) => c && !/united states|usa|us/i.test(c);

  return (
    <AdminChrome title="Orders">
      {err && <div className="mb-4 rounded border border-[#d9b8b8] bg-[#f7eaea] px-4 py-3 text-sm text-[#5C1F1F]">{err}</div>}
      {loading ? (
        <p className="flex items-center gap-2 text-[#8a7d68]"><Loader2 className="animate-spin" size={16} /> Loading orders…</p>
      ) : orders.length === 0 ? (
        <div className="rounded-lg border border-[#E4DAC9] bg-white p-10 text-center text-[#8a7d68]">
          No orders yet. They appear here the moment Shopify records a sale.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[#E4DAC9] bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E4DAC9] text-left text-xs uppercase tracking-wider text-[#8a7d68]">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Fulfilment</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E8D9]">
              {orders.map((o) => (
                <tr key={o.name}>
                  <td className="px-4 py-3 font-medium">{o.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span>{o.customer}</span>
                      {intl(o.country) && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#f3ead2] px-2 py-0.5 text-xs text-[#7a5c12]">
                          <Globe size={11} /> {o.country}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#8a7d68]">
                      {[o.ship?.city, o.ship?.country].filter(Boolean).join(", ")}
                      {o.email && <span>{o.ship?.city ? " · " : ""}{o.email}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#5a5246]">{o.items.join(", ") || "—"}</td>
                  <td className="px-4 py-3">{money(o.total, o.currency)}</td>
                  <td className="px-4 py-3 text-[#5a5246]">{o.financialStatus}</td>
                  <td className="px-4 py-3">
                    <span className={/unfulfilled|partial/i.test(o.fulfillmentStatus) ? "text-[#5C1F1F]" : "text-[#2f5a2f]"}>
                      {o.fulfillmentStatus || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#8a7d68]">{fmtDate(o.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-xs text-[#8a7d68]">International orders (leather/fur customs) are flagged. Fulfil orders in Shopify; this is your read view.</p>
    </AdminChrome>
  );
}
