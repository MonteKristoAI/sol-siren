"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import { api, fmtDate, money } from "../_components/api";

type GiftCard = { id: string; maskedCode: string; balance: number; currency: string; enabled: boolean; createdAt: string };

export default function GiftCardsPage() {
  const [items, setItems] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    api<{ giftCards: GiftCard[] }>("/giftcards")
      .then((d) => setItems(d.giftCards))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminChrome title="Gift Cards">
      <p className="mb-4 max-w-2xl text-sm text-[#5a5246]">Gift cards issued in your store and their remaining balance.</p>
      {err && <div className="mb-4 rounded border border-[#d9b8b8] bg-[#f7eaea] px-4 py-3 text-sm text-[#5C1F1F]">{err}</div>}
      {loading ? (
        <p className="flex items-center gap-2 text-[#8a7d68]"><Loader2 className="animate-spin" size={16} /> Loading…</p>
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-[#E4DAC9] bg-white p-10 text-center text-[#8a7d68]">No gift cards issued yet.</div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[#E4DAC9] bg-white">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#E4DAC9] text-left text-xs uppercase tracking-wider text-[#8a7d68]">
              <th className="px-4 py-3">Code</th><th className="px-4 py-3">Balance</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Issued</th>
            </tr></thead>
            <tbody className="divide-y divide-[#F0E8D9]">
              {items.map((g) => (
                <tr key={g.id}>
                  <td className="px-4 py-3 font-mono">{g.maskedCode}</td>
                  <td className="px-4 py-3">{money(g.balance, g.currency)}</td>
                  <td className="px-4 py-3">{g.enabled ? <span className="text-[#2f5a2f]">Active</span> : <span className="text-[#8a7d68]">Disabled</span>}</td>
                  <td className="px-4 py-3 text-[#8a7d68]">{fmtDate(g.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminChrome>
  );
}
