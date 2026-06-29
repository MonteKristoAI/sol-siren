"use client";

import { useEffect, useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import { api, fmtDate } from "../_components/api";

type Collection = { id: string; title: string; handle: string; productsCount: number; updatedAt: string };

export default function CollectionsPage() {
  const [items, setItems] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    api<{ collections: Collection[] }>("/collections")
      .then((d) => setItems(d.collections))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminChrome title="Collections">
      <p className="mb-4 max-w-2xl text-sm text-[#5a5246]">Your shop collections (Fur, Leather, Penny Lane, and so on). Editing membership is done in Shopify; this is your overview.</p>
      {err && <div className="mb-4 rounded border border-[#d9b8b8] bg-[#f7eaea] px-4 py-3 text-sm text-[#5C1F1F]">{err}</div>}
      {loading ? (
        <p className="flex items-center gap-2 text-[#8a7d68]"><Loader2 className="animate-spin" size={16} /> Loading…</p>
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-[#E4DAC9] bg-white p-10 text-center text-[#8a7d68]">No collections.</div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <a key={c.id} href={`https://www.solsirenvintage.com/shop?category=${c.handle}`} target="_blank" rel="noreferrer"
               className="rounded-lg border border-[#E4DAC9] bg-white p-4 transition-shadow hover:shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium">{c.title}</span>
                <ExternalLink size={13} className="text-[#b6a890]" />
              </div>
              <div className="mt-1 text-sm text-[#8a7d68]">{c.productsCount} pieces · updated {fmtDate(c.updatedAt)}</div>
            </a>
          ))}
        </div>
      )}
    </AdminChrome>
  );
}
