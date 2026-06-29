"use client";

import { useEffect, useState } from "react";
import { Loader2, Globe, X, Check } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import { api, fmtDate, money } from "../_components/api";

type Order = {
  id: string; name: string; createdAt: string; financialStatus: string; fulfillmentStatus: string;
  total: number; currency: string; customer: string; country: string | null; items: string[];
};

const CHECKLIST: { key: string; label: string }[] = [
  { key: "cleaned", label: "Garment cleaned / checked" },
  { key: "card", label: "History card printed" },
  { key: "bag", label: "Garment bag included" },
  { key: "hanger", label: "Hanger included" },
  { key: "note", label: "Thank-you note included" },
  { key: "tracking", label: "Tracking added" },
  { key: "shopify", label: "Fulfilled in Shopify" },
];

export default function FulfillmentPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState<Order | null>(null);

  useEffect(() => {
    api<{ orders: Order[] }>("/orders")
      .then((d) => setOrders(d.orders))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  const needs = orders.filter((o) => /unfulfilled|partial/i.test(o.fulfillmentStatus));
  const rest = orders.filter((o) => !/unfulfilled|partial/i.test(o.fulfillmentStatus));

  return (
    <AdminChrome title="Fulfillment">
      <p className="mb-4 max-w-2xl text-sm text-[#5a5246]">
        Orders ready to ship, with a packing checklist for each so every parcel leaves with the card,
        the garment bag, the hanger, and a note. Mark items off as you pack.
      </p>
      {err && <div className="mb-4 rounded border border-[#d9b8b8] bg-[#f7eaea] px-4 py-3 text-sm text-[#5C1F1F]">{err}</div>}

      {loading ? (
        <p className="flex items-center gap-2 text-[#8a7d68]"><Loader2 className="animate-spin" size={16} /> Loading…</p>
      ) : orders.length === 0 ? (
        <div className="rounded-lg border border-[#E4DAC9] bg-white p-10 text-center text-[#8a7d68]">
          No orders yet. When a piece sells, it shows here with its packing checklist.
        </div>
      ) : (
        <>
          <Group title="Ready to ship" orders={needs} onOpen={setOpen} empty="Nothing waiting to ship." />
          {rest.length > 0 && <div className="mt-8"><Group title="Fulfilled" orders={rest} onOpen={setOpen} muted /></div>}
        </>
      )}

      {open && <ChecklistDrawer order={open} onClose={() => setOpen(null)} />}
    </AdminChrome>
  );
}

function Group({ title, orders, onOpen, empty, muted }: { title: string; orders: Order[]; onOpen: (o: Order) => void; empty?: string; muted?: boolean }) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#8a7d68]">{title}</h2>
      {orders.length === 0 ? (
        <p className="text-sm text-[#8a7d68]">{empty}</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[#E4DAC9] bg-white">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-[#F0E8D9]">
              {orders.map((o) => (
                <tr key={o.id} className={muted ? "opacity-70" : ""}>
                  <td className="px-4 py-3 font-medium">{o.name}</td>
                  <td className="px-4 py-3">{o.customer}{o.country && !/united states|usa/i.test(o.country) && (
                    <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-[#f3ead2] px-2 py-0.5 text-xs text-[#7a5c12]"><Globe size={11} /> {o.country}</span>
                  )}</td>
                  <td className="px-4 py-3 text-[#5a5246]">{o.items.join(", ")}</td>
                  <td className="px-4 py-3">{money(o.total, o.currency)}</td>
                  <td className="px-4 py-3 text-[#8a7d68]">{fmtDate(o.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => onOpen(o)} className="rounded border border-[#E4DAC9] px-2.5 py-1 text-xs hover:bg-[#F5EFE6]">Packing checklist</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ChecklistDrawer({ order, onClose }: { order: Order; onClose: () => void }) {
  const [state, setState] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api<{ checklist: Record<string, boolean> }>(`/order-meta?id=${encodeURIComponent(order.id)}`)
      .then((d) => setState(d.checklist || {}))
      .catch(() => setState({}))
      .finally(() => setLoading(false));
  }, [order.id]);

  async function toggle(key: string) {
    const next = { ...state, [key]: !state[key] };
    setState(next);
    setSaving(true);
    try { await api("/order-meta", { method: "POST", body: JSON.stringify({ id: order.id, checklist: next }) }); }
    catch (e: any) { alert(e.message); }
    finally { setSaving(false); }
  }

  const doneCount = CHECKLIST.filter((c) => state[c.key]).length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <div className="flex h-full w-full max-w-sm flex-col bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#E4DAC9] px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">{order.name}</h2>
            <p className="text-xs text-[#8a7d68]">{order.customer} · {doneCount}/{CHECKLIST.length} packed{saving && " · saving…"}</p>
          </div>
          <button onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {loading ? (
            <p className="flex items-center gap-2 text-[#8a7d68]"><Loader2 className="animate-spin" size={16} /> Loading…</p>
          ) : (
            <ul className="space-y-2">
              {CHECKLIST.map((c) => (
                <li key={c.key}>
                  <button onClick={() => toggle(c.key)} className="flex w-full items-center gap-3 rounded border border-[#E4DAC9] px-3 py-2.5 text-left text-sm hover:bg-[#FAF7F1]">
                    <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border ${state[c.key] ? "border-[#2f5a2f] bg-[#2f5a2f] text-white" : "border-[#C9BBA6]"}`}>
                      {state[c.key] && <Check size={13} />}
                    </span>
                    <span className={state[c.key] ? "text-[#8a7d68] line-through" : ""}>{c.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
