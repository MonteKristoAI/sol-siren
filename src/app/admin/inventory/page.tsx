"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Plus, ExternalLink, Loader2, Star, Trash2, UploadCloud } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import RichText from "../_components/RichText";
import { uploadImages } from "../_components/uploadImages";
import { api, money } from "../_components/api";
import { SIZE_FIT_FIELDS, stripSizeFit, type SizeFit } from "@/lib/admin/size-fit";

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
        <Link
          href="/admin/add-piece"
          className="flex items-center gap-2 rounded bg-[#1A1A1A] px-3 py-2 text-sm text-[#F5EFE6] hover:opacity-90"
        >
          <Plus size={16} /> Add piece
        </Link>
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
                        {p.status === "DRAFT" ? (
                          <Act disabled={isBusy} onClick={() => act(p.id, "makeLive")} kind="go">Make live</Act>
                        ) : p.status !== "ARCHIVED" && !p.tags.includes("sold") && !p.tags.includes("archive") ? (
                          <Act disabled={isBusy} onClick={() => act(p.id, "archive")} kind="danger">Archive (sold)</Act>
                        ) : (
                          <Act disabled={isBusy} onClick={() => act(p.id, "unarchive")}>Back to live</Act>
                        )}
                        {p.status === "ACTIVE" && !p.tags.includes("archive") && !p.tags.includes("sold") && (
                          <>
                            {reserved ? (
                              <Act disabled={isBusy} onClick={() => act(p.id, "unreserve")}>Release hold</Act>
                            ) : (
                              <Act disabled={isBusy} onClick={() => act(p.id, "reserve")}>Hold</Act>
                            )}
                            <Act disabled={isBusy} onClick={() => act(p.id, "backToDraft")}>Back to draft</Act>
                          </>
                        )}
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

function Act({ children, onClick, disabled, kind }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; kind?: "danger" | "go" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded border px-2.5 py-1 text-xs transition-colors disabled:opacity-40 ${
        kind === "danger"
          ? "border-[#d9b8b8] text-[#5C1F1F] hover:bg-[#f7eaea]"
          : kind === "go"
          ? "border-transparent bg-[#2f5a2f] text-white hover:bg-[#274a27]"
          : "border-[#E4DAC9] text-[#1A1A1A] hover:bg-[#F5EFE6]"
      }`}
    >
      {children}
    </button>
  );
}

function Modal({ title, children, onClose, wide }: { title: string; children: React.ReactNode; onClose: () => void; wide?: boolean }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className={`max-h-[92vh] w-full overflow-y-auto rounded-lg bg-white p-6 shadow-xl ${wide ? "max-w-2xl" : "max-w-lg"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 font-semibold text-xl">{title}</h2>
        {children}
      </div>
    </div>
  );
}

const FIELD = "w-full rounded border border-[#E4DAC9] px-3 py-2 text-sm outline-none focus:border-[#B8A48A]";

type Media = { id: string; url: string; ready?: boolean };

function EditDialog({ product, onClose, onSaved }: { product: Product; onClose: () => void; onSaved: () => void }) {
  const [title, setTitle] = useState(product.title);
  const [productType, setProductType] = useState(product.productType);
  const [tags, setTags] = useState(product.tags.join(", "));
  const [story, setStory] = useState(stripSizeFit(product.descriptionHtml || product.description));
  const [sizeFit, setSizeFit] = useState<SizeFit>({});
  const [price, setPrice] = useState(product.price?.toString() || "");
  const [media, setMedia] = useState<Media[]>([]);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    api<{ media: Media[] }>(`/product-media?id=${encodeURIComponent(product.id)}`).then((d) => setMedia(d.media)).catch(() => {});
    api<{ meta: Record<string, string> }>(`/piece-meta?id=${encodeURIComponent(product.id)}`)
      .then((d) => { if (d.meta.size_fit) { try { setSizeFit(JSON.parse(d.meta.size_fit)); } catch {} } })
      .catch(() => {});
  }, [product.id]);

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
            descriptionHtml: story,
            sizeFit,
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
    <Modal title="Edit piece" onClose={onClose} wide>
      <div className="space-y-4">
        <PhotoManager productId={product.id} media={media} setMedia={setMedia} />

        <Labeled label="Name (the listing title)"><input className={FIELD} value={title} onChange={(e) => setTitle(e.target.value)} /></Labeled>
        <div className="grid grid-cols-2 gap-3">
          <Labeled label="Category"><input className={FIELD} value={productType} onChange={(e) => setProductType(e.target.value)} /></Labeled>
          <Labeled label="Price (USD)"><input className={FIELD} type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></Labeled>
        </div>
        <Labeled label="Tags (era, material, comma separated)"><input className={FIELD} value={tags} onChange={(e) => setTags(e.target.value)} /></Labeled>

        <div>
          <span className="mb-1 block text-xs uppercase tracking-wider text-[#8a7d68]">Story</span>
          <RichText value={story} onChange={setStory} />
        </div>

        <SizeFitFields value={sizeFit} onChange={setSizeFit} />

        {err && <p className="text-sm text-[#5C1F1F]">{err}</p>}
        <div className="flex justify-end gap-2 pt-1">
          <button onClick={onClose} className="rounded border border-[#E4DAC9] px-4 py-2 text-sm">Cancel</button>
          <button onClick={save} disabled={saving} className="rounded bg-[#1A1A1A] px-4 py-2 text-sm text-[#F5EFE6] disabled:opacity-50">
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function PhotoManager({ productId, media, setMedia }: { productId: string; media: Media[]; setMedia: (m: Media[]) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [err, setErr] = useState("");

  async function refetch() {
    try {
      const d = await api<{ media: Media[] }>(`/product-media?id=${encodeURIComponent(productId)}`);
      setMedia(d.media);
    } catch {}
  }

  async function addFiles(list: FileList | null) {
    const files = Array.from(list || []).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;
    setBusy(true); setErr("");
    try {
      const urls = await uploadImages(files, setProgress);
      if (urls.length) {
        setProgress("Attaching…");
        const res = await api<{ media: Media[] }>("/product-media", { method: "POST", body: JSON.stringify({ id: productId, resourceUrls: urls }) });
        setMedia(res.media);
        // Shopify processes new images for a moment; refresh so the final photo swaps in.
        setTimeout(refetch, 2500);
        setTimeout(refetch, 6000);
      }
    } catch (e: any) { setErr(e.message); }
    finally { setBusy(false); setProgress(""); if (fileRef.current) fileRef.current.value = ""; }
  }
  async function remove(mediaId: string) {
    setBusy(true); setErr("");
    try {
      await api("/product-media", { method: "DELETE", body: JSON.stringify({ id: productId, mediaIds: [mediaId] }) });
      setMedia(media.filter((m) => m.id !== mediaId));
    } catch (e: any) { setErr(e.message); }
    finally { setBusy(false); }
  }
  async function makeCover(mediaId: string) {
    const ordered = [mediaId, ...media.filter((m) => m.id !== mediaId).map((m) => m.id)];
    setBusy(true); setErr("");
    try {
      await api("/product-media", { method: "PATCH", body: JSON.stringify({ id: productId, orderedIds: ordered }) });
      setMedia([media.find((m) => m.id === mediaId)!, ...media.filter((m) => m.id !== mediaId)]);
    } catch (e: any) { setErr(e.message); }
    finally { setBusy(false); }
  }

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-[#8a7d68]">Photos</span>
        <div className="flex items-center gap-2">
          {busy && progress && <span className="text-xs text-[#8a7d68]">{progress}</span>}
          <button onClick={() => fileRef.current?.click()} disabled={busy}
            className="flex items-center gap-1.5 rounded border border-[#E4DAC9] px-2.5 py-1 text-xs hover:bg-[#F5EFE6] disabled:opacity-50">
            <UploadCloud size={13} /> Add photos
          </button>
        </div>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
      </div>
      {media.length === 0 ? (
        <div className="rounded border border-dashed border-[#D8CBB4] bg-[#FAF7F1] px-4 py-6 text-center text-xs text-[#8a7d68]">
          {busy ? (progress || "Working…") : "No photos yet. Click Add photos."}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-2">
          {media.map((m, i) => (
            <div key={m.id} className="group relative aspect-[3/4] overflow-hidden rounded border border-[#E4DAC9] bg-[#F0E8D9]">
              {m.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center"><Loader2 className="animate-spin text-[#b6a890]" size={16} /></div>
              )}
              {i === 0 && <span className="absolute left-1 top-1 rounded bg-[#1A1A1A]/80 px-1.5 py-0.5 text-[10px] text-[#F5EFE6]">cover</span>}
              <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1 bg-black/40 py-1 opacity-0 transition-opacity group-hover:opacity-100">
                {i !== 0 && (
                  <button onClick={() => makeCover(m.id)} disabled={busy} title="Make cover" className="rounded p-1 text-white hover:bg-white/20"><Star size={13} /></button>
                )}
                <button onClick={() => remove(m.id)} disabled={busy} title="Remove" className="rounded p-1 text-white hover:bg-white/20"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {err && <p className="mt-1 text-xs text-[#5C1F1F]">{err}</p>}
    </div>
  );
}

function SizeFitFields({ value, onChange }: { value: SizeFit; onChange: (v: SizeFit) => void }) {
  return (
    <div className="rounded-lg border border-[#E4DAC9] bg-[#FAF7F1] p-3">
      <div className="mb-2 text-xs uppercase tracking-wider text-[#8a7d68]">Size &amp; Fit (shows on the listing)</div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {SIZE_FIT_FIELDS.map((f) => (
          <label key={f.key} className="block">
            <span className="mb-0.5 block text-[11px] text-[#8a7d68]">{f.label}{f.key !== "estimatedSize" ? ' (in)' : ''}</span>
            <input
              className="w-full rounded border border-[#E4DAC9] bg-white px-2.5 py-1.5 text-sm outline-none focus:border-[#B8A48A]"
              value={value[f.key] || ""}
              placeholder={f.placeholder}
              onChange={(e) => onChange({ ...value, [f.key]: e.target.value })}
            />
          </label>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-[#8a7d68]">Just numbers are fine (we add the inch mark). Ranges like 40-42 work too.</p>
    </div>
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
