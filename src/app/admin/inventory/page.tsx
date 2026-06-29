"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Plus, ExternalLink, Loader2 } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import { api, money } from "../_components/api";

export default function InventoryPage() {
  return (
    <Suspense fallback={null}>
      <InventoryInner />
    </Suspense>
  );
}

type Product = {
  id: string;
  handle: string;
  title: string;
  status: "ACTIVE" | "ARCHIVED" | "DRAFT";
  productType: string;
  tags: string[];
  createdAt: string;
  descriptionHtml: string;
  description: string;
  featuredImage: string | null;
  price: number | null;
  currency: string;
  variantId: string | null;
};

type Filter = "all" | "live" | "reserved" | "sold" | "draft";

function InventoryInner() {
  const params = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [busy, setBusy] = useState<string | null>(null);
  const [edit, setEdit] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const f = params.get("filter");
    if (f === "reserved" || f === "sold" || f === "draft") setFilter(f);
  }, [params]);

  async function load() {
    setLoading(true);
    try {
      const { products } = await api<{ products: Product[] }>("/products");
      setProducts(products);
      setErr("");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  async function act(id: string, action: string, payload?: any) {
    setBusy(id);
    try {
      await api("/products", { method: "PATCH", body: JSON.stringify({ id, action, payload }) });
      await load();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setBusy(null);
    }
  }

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filter === "live" && !(p.status === "ACTIVE" && !p.tags.includes("reserved"))) return false;
      if (filter === "reserved" && !p.tags.includes("reserved")) return false;
      if (filter === "sold" && !(p.status === "ARCHIVED" || p.tags.includes("sold"))) return false;
      if (filter === "draft" && p.status !== "DRAFT") return false;
      if (q && !p.title.toLowerCase().includes(q.toLowerCase()) && !p.productType.toLowerCase().includes(q.toLowerCase()))
        return false;
      return true;
    });
  }, [products, filter, q]);

  const counts = useMemo(
    () => ({
      all: products.length,
      live: products.filter((p) => p.status === "ACTIVE" && !p.tags.includes("reserved")).length,
      reserved: products.filter((p) => p.tags.includes("reserved")).length,
      sold: products.filter((p) => p.status === "ARCHIVED" || p.tags.includes("sold")).length,
      draft: products.filter((p) => p.status === "DRAFT").length,
    }),
    [products]
  );

  return (
    <AdminChrome
      title="Inventory"
      action={
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 rounded bg-[#1A1A1A] px-3 py-2 text-sm text-[#F5EFE6] hover:opacity-90"
        >
          <Plus size={16} /> New piece
        </button>
      }
    >
      {err && <div className="mb-4 rounded border border-[#d9b8b8] bg-[#f7eaea] px-4 py-3 text-sm text-[#5C1F1F]">{err}</div>}

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded border border-[#E4DAC9] bg-white px-3 py-2">
          <Search size={16} className="text-[#8a7d68]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name or category"
            className="w-56 bg-transparent text-sm outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1">
          {(["all", "live", "reserved", "sold", "draft"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded px-3 py-1.5 text-sm capitalize ${
                filter === f ? "bg-[#5C1F1F] text-[#F5EFE6]" : "bg-white text-[#1A1A1A] border border-[#E4DAC9]"
              }`}
            >
              {f} <span className="opacity-60">{counts[f]}</span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="flex items-center gap-2 text-[#8a7d68]"><Loader2 className="animate-spin" size={16} /> Loading pieces…</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[#E4DAC9] bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E4DAC9] text-left text-xs uppercase tracking-wider text-[#8a7d68]">
                <th className="px-4 py-3">Piece</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0E8D9]">
              {filtered.map((p) => {
                const reserved = p.tags.includes("reserved");
                const isBusy = busy === p.id;
                return (
                  <tr key={p.id} className="align-middle">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.featuredImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.featuredImage} alt="" className="h-12 w-10 rounded object-cover" />
                        ) : (
                          <div className="h-12 w-10 rounded bg-[#F0E8D9]" />
                        )}
                        <div>
                          <div className="font-medium">{p.title.split(" — ")[0]}</div>
                          <a
                            href={`https://www.solsirenvintage.com/product/${p.handle}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-[#8a7d68] hover:text-[#5C1F1F]"
                          >
                            view <ExternalLink size={11} />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#5a5246]">{p.productType || "—"}</td>
                    <td className="px-4 py-3">{money(p.price, p.currency)}</td>
                    <td className="px-4 py-3"><StatusBadge p={p} reserved={reserved} /></td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1.5">
                        {p.status !== "ARCHIVED" && !p.tags.includes("sold") ? (
                          <Act disabled={isBusy} onClick={() => act(p.id, "markSold")} kind="danger">Mark sold</Act>
                        ) : (
                          <Act disabled={isBusy} onClick={() => act(p.id, "restore")}>Restore</Act>
                        )}
                        {p.status === "ACTIVE" &&
                          (reserved ? (
                            <Act disabled={isBusy} onClick={() => act(p.id, "unreserve")}>Release hold</Act>
                          ) : (
                            <Act disabled={isBusy} onClick={() => act(p.id, "reserve")}>Hold</Act>
                          ))}
                        <Act disabled={isBusy} onClick={() => setEdit(p)}>Edit</Act>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-[#8a7d68]">No pieces match.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {edit && <EditDialog product={edit} onClose={() => setEdit(null)} onSaved={() => { setEdit(null); load(); }} />}
      {creating && <CreateDialog onClose={() => setCreating(false)} onCreated={() => { setCreating(false); load(); }} />}
    </AdminChrome>
  );
}

function StatusBadge({ p, reserved }: { p: Product; reserved: boolean }) {
  let label = "Live";
  let cls = "bg-[#e6efe6] text-[#2f5a2f]";
  if (p.status === "ARCHIVED" || p.tags.includes("sold")) { label = "Sold"; cls = "bg-[#efe1e1] text-[#5C1F1F]"; }
  else if (p.status === "DRAFT") { label = "Draft"; cls = "bg-[#eee] text-[#555]"; }
  else if (reserved) { label = "On hold"; cls = "bg-[#f3ead2] text-[#7a5c12]"; }
  return <span className={`rounded-full px-2.5 py-1 text-xs ${cls}`}>{label}</span>;
}

function Act({ children, onClick, disabled, kind }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; kind?: "danger" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded border px-2.5 py-1 text-xs transition-colors disabled:opacity-40 ${
        kind === "danger"
          ? "border-[#d9b8b8] text-[#5C1F1F] hover:bg-[#f7eaea]"
          : "border-[#E4DAC9] text-[#1A1A1A] hover:bg-[#F5EFE6]"
      }`}
    >
      {children}
    </button>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 font-display text-xl">{title}</h2>
        {children}
      </div>
    </div>
  );
}

const FIELD = "w-full rounded border border-[#E4DAC9] px-3 py-2 text-sm outline-none focus:border-[#B8A48A]";

function EditDialog({ product, onClose, onSaved }: { product: Product; onClose: () => void; onSaved: () => void }) {
  const [title, setTitle] = useState(product.title);
  const [productType, setProductType] = useState(product.productType);
  const [tags, setTags] = useState(product.tags.join(", "));
  const [desc, setDesc] = useState(product.descriptionHtml || product.description);
  const [price, setPrice] = useState(product.price?.toString() || "");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function save() {
    setSaving(true);
    setErr("");
    try {
      await api("/products", {
        method: "PATCH",
        body: JSON.stringify({
          id: product.id,
          action: "updateDetails",
          payload: {
            title,
            productType,
            tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
            descriptionHtml: desc,
          },
        }),
      });
      if (price && Number(price) !== product.price && product.variantId) {
        await api("/products", {
          method: "PATCH",
          body: JSON.stringify({ id: product.id, action: "setPrice", payload: { variantId: product.variantId, price: Number(price) } }),
        });
      }
      onSaved();
    } catch (e: any) {
      setErr(e.message);
      setSaving(false);
    }
  }

  return (
    <Modal title="Edit piece" onClose={onClose}>
      <div className="space-y-3">
        <Labeled label="Name"><input className={FIELD} value={title} onChange={(e) => setTitle(e.target.value)} /></Labeled>
        <div className="grid grid-cols-2 gap-3">
          <Labeled label="Category"><input className={FIELD} value={productType} onChange={(e) => setProductType(e.target.value)} /></Labeled>
          <Labeled label="Price (USD)"><input className={FIELD} type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></Labeled>
        </div>
        <Labeled label="Tags (comma separated — era, material…)"><input className={FIELD} value={tags} onChange={(e) => setTags(e.target.value)} /></Labeled>
        <Labeled label="Description (HTML)"><textarea className={`${FIELD} h-40`} value={desc} onChange={(e) => setDesc(e.target.value)} /></Labeled>
        {err && <p className="text-sm text-[#5C1F1F]">{err}</p>}
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="rounded border border-[#E4DAC9] px-4 py-2 text-sm">Cancel</button>
          <button onClick={save} disabled={saving} className="rounded bg-[#1A1A1A] px-4 py-2 text-sm text-[#F5EFE6] disabled:opacity-50">
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function CreateDialog({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [productType, setProductType] = useState("Fur");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function create() {
    if (!title.trim()) { setErr("Name is required"); return; }
    setSaving(true);
    setErr("");
    try {
      await api("/products", {
        method: "POST",
        body: JSON.stringify({
          title,
          productType,
          price: price ? Number(price) : undefined,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          descriptionHtml: desc,
          imageUrls: images.split(/[\n,]/).map((s) => s.trim()).filter(Boolean),
        }),
      });
      onCreated();
    } catch (e: any) {
      setErr(e.message);
      setSaving(false);
    }
  }

  return (
    <Modal title="Add a new piece (saved as draft)" onClose={onClose}>
      <div className="space-y-3">
        <Labeled label="Name (e.g. TALLULAH — Vintage 1970s Shearling Coat)">
          <input className={FIELD} value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
        </Labeled>
        <div className="grid grid-cols-2 gap-3">
          <Labeled label="Category">
            <select className={FIELD} value={productType} onChange={(e) => setProductType(e.target.value)}>
              {["Fur", "Leather", "Penny Lane / Afghan", "Overcoat", "Apres Ski", "Jewelry"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Labeled>
          <Labeled label="Price (USD)"><input className={FIELD} type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></Labeled>
        </div>
        <Labeled label="Tags (era, material…)"><input className={FIELD} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="1970s, Shearling, Vintage" /></Labeled>
        <Labeled label="Story / description (HTML ok)"><textarea className={`${FIELD} h-28`} value={desc} onChange={(e) => setDesc(e.target.value)} /></Labeled>
        <Labeled label="Image URLs (one per line)"><textarea className={`${FIELD} h-20`} value={images} onChange={(e) => setImages(e.target.value)} placeholder="https://…/photo-1.jpg" /></Labeled>
        <p className="text-xs text-[#8a7d68]">Created as a Draft in Shopify so you review and set it live there.</p>
        {err && <p className="text-sm text-[#5C1F1F]">{err}</p>}
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="rounded border border-[#E4DAC9] px-4 py-2 text-sm">Cancel</button>
          <button onClick={create} disabled={saving} className="rounded bg-[#1A1A1A] px-4 py-2 text-sm text-[#F5EFE6] disabled:opacity-50">
            {saving ? "Creating…" : "Create draft"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-wider text-[#8a7d68]">{label}</span>
      {children}
    </label>
  );
}
