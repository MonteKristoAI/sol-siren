"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Search, ExternalLink, Eye, EyeOff } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import { api, money } from "../_components/api";

type Product = {
  id: string; handle: string; title: string; status: string; productType: string;
  tags: string[]; featuredImage: string | null; price: number | null; currency: string;
};
type Legacy = { id: string; handle: string; title: string; productType: string; price: number; featuredImage: string | null };

export default function ArchivePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [legacy, setLegacy] = useState<Legacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true);
    try {
      const [{ products }, siteArchive] = await Promise.all([
        api<{ products: Product[] }>("/products"),
        api<{ items: Legacy[] }>("/site-archive").catch(() => ({ items: [] as Legacy[] })),
      ]);
      setProducts(products);
      setLegacy(siteArchive.items || []);
      setErr("");
    } catch (e: any) { setErr(e.message); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  async function act(id: string, action: string, payload?: any) {
    setBusy(id);
    try { await api("/products", { method: "PATCH", body: JSON.stringify({ id, action, payload }) }); await load(); }
    catch (e: any) { alert(e.message); }
    finally { setBusy(null); }
  }

  const archived = useMemo(
    () => products.filter((p) => p.status === "ARCHIVED" || p.tags.includes("archive") || p.tags.includes("sold"))
      .filter((p) => !q || p.title.toLowerCase().includes(q.toLowerCase())),
    [products, q]
  );
  const legacyFiltered = useMemo(
    () => legacy.filter((p) => !q || p.title.toLowerCase().includes(q.toLowerCase())),
    [legacy, q]
  );

  return (
    <AdminChrome title="Archive">
      <p className="mb-4 max-w-2xl text-sm text-[#5a5246]">
        Sold and retired pieces. They stay on the site as your <b>brand archive</b>, proof of what has passed
        through your hands. Hide the price on any piece, or bring one back to the live shop.
      </p>
      {err && <div className="mb-4 rounded border border-[#d9b8b8] bg-[#f7eaea] px-4 py-3 text-sm text-[#5C1F1F]">{err}</div>}

      <div className="mb-4 flex w-72 items-center gap-2 rounded border border-[#E4DAC9] bg-white px-3 py-2">
        <Search size={16} className="text-[#8a7d68]" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search archive" className="w-full bg-transparent text-sm outline-none" />
      </div>

      {loading ? (
        <p className="flex items-center gap-2 text-[#8a7d68]"><Loader2 className="animate-spin" size={16} /> Loading…</p>
      ) : archived.length === 0 && legacyFiltered.length === 0 ? (
        <div className="rounded-lg border border-[#E4DAC9] bg-white p-10 text-center text-[#8a7d68]">
          No archived pieces yet. Move a sold piece here from <b>Inventory</b>.
        </div>
      ) : (
        <div className="space-y-8">
          {archived.length > 0 && (
            <Grid>
              {archived.map((p) => {
                const hidden = p.tags.includes("price-hidden");
                const isBusy = busy === p.id;
                return (
                  <Card key={p.id} img={p.featuredImage} title={p.title.split(" — ")[0]} sub={p.productType}
                    price={hidden ? "price hidden" : money(p.price, p.currency)}>
                    <button disabled={isBusy} onClick={() => act(p.id, "priceHidden", { hidden: !hidden })}
                      className="flex items-center gap-1 rounded border border-[#E4DAC9] px-2.5 py-1 text-xs hover:bg-[#F5EFE6] disabled:opacity-40">
                      {hidden ? <><Eye size={12} /> Show price</> : <><EyeOff size={12} /> Hide price</>}
                    </button>
                    <button disabled={isBusy} onClick={() => act(p.id, "unarchive")}
                      className="rounded border border-[#E4DAC9] px-2.5 py-1 text-xs hover:bg-[#F5EFE6] disabled:opacity-40">Back to live</button>
                    <a href={`https://www.solsirenvintage.com/product/${p.handle}`} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1 rounded border border-[#E4DAC9] px-2.5 py-1 text-xs hover:bg-[#F5EFE6]">View <ExternalLink size={11} /></a>
                  </Card>
                );
              })}
            </Grid>
          )}

          {legacyFiltered.length > 0 && (
            <div>
              <h2 className="mb-1 text-sm font-semibold uppercase tracking-widest text-[#8a7d68]">From the site archive</h2>
              <p className="mb-3 text-xs text-[#8a7d68]">Older sold pieces shown on the site but not stored in Shopify. View only, ask MonteKristo if you want them moved into Shopify so you can manage them here.</p>
              <Grid>
                {legacyFiltered.map((p) => (
                  <Card key={p.id} img={p.featuredImage} title={p.title} sub={p.productType} price={money(p.price)}>
                    <a href={`https://www.solsirenvintage.com/archive`} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1 rounded border border-[#E4DAC9] px-2.5 py-1 text-xs hover:bg-[#F5EFE6]">View on site <ExternalLink size={11} /></a>
                  </Card>
                ))}
              </Grid>
            </div>
          )}
        </div>
      )}
    </AdminChrome>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
}
function Card({ img, title, sub, price, children }: { img: string | null; title: string; sub: string; price: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#E4DAC9] bg-white">
      <div className="flex gap-3 p-3">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt="" className="h-20 w-16 rounded object-cover" />
        ) : <div className="h-20 w-16 rounded bg-[#F0E8D9]" />}
        <div className="min-w-0">
          <div className="truncate font-medium">{title}</div>
          <div className="text-xs text-[#8a7d68]">{sub}</div>
          <div className="mt-1 text-sm text-[#5a5246]">{price}</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-[#F0E8D9] p-2.5">{children}</div>
    </div>
  );
}
