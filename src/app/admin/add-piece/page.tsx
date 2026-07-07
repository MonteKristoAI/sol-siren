"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, UploadCloud, X } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import RichText from "../_components/RichText";
import { api } from "../_components/api";
import { SIZE_FIT_FIELDS, type SizeFit } from "@/lib/admin/size-fit";

const FIELD = "w-full rounded border border-[#E4DAC9] px-3 py-2 text-sm outline-none focus:border-[#B8A48A]";
const CATS = ["Fur", "Leather", "Penny Lane / Afghan", "Overcoat", "Apres Ski", "Jewelry"];

type Pic = { file: File; url: string };

export default function AddPiecePage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [productType, setProductType] = useState("Fur");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [desc, setDesc] = useState("");
  const [sizeFit, setSizeFit] = useState<SizeFit>({});
  const [pics, setPics] = useState<Pic[]>([]);
  const [saving, setSaving] = useState(false);
  const [stage, setStage] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = Array.from(list)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({ file: f, url: URL.createObjectURL(f) }));
    setPics((p) => [...p, ...next]);
  }
  function removePic(i: number) {
    setPics((p) => p.filter((_, idx) => idx !== i));
  }

  async function create() {
    if (!title.trim()) { setErr("Name is required"); return; }
    setSaving(true); setErr("");
    try {
      let imageUrls: string[] = [];
      if (pics.length) {
        setStage(`Uploading ${pics.length} photo${pics.length > 1 ? "s" : ""}…`);
        const fd = new FormData();
        pics.forEach((p) => fd.append("files", p.file));
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const j = await res.json();
        if (!res.ok) throw new Error(j.error || "upload failed");
        imageUrls = j.urls;
      }
      setStage("Creating draft…");
      await api("/products", {
        method: "POST",
        body: JSON.stringify({
          title, productType,
          price: price ? Number(price) : undefined,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          descriptionHtml: desc,
          sizeFit,
          imageUrls,
        }),
      });
      setDone(true);
      setTimeout(() => router.push("/admin/inventory"), 1200);
    } catch (e: any) {
      setErr(e.message); setSaving(false); setStage("");
    }
  }

  return (
    <AdminChrome title="Add a Piece">
      <div className="max-w-2xl">
        <p className="mb-5 text-sm text-[#5a5246]">
          New pieces are created as a <b>draft</b> in Shopify so you can review before it goes live.
          Drop the photos straight in, no links needed.
        </p>
        {done ? (
          <div className="flex items-center gap-2 rounded-lg border border-[#cfe0cf] bg-[#eef5ee] px-4 py-4 text-[#2f5a2f]"><Check size={18} /> Draft created. Taking you to Inventory…</div>
        ) : (
          <div className="space-y-4 rounded-lg border border-[#E4DAC9] bg-white p-6">
            <Labeled label="Name (e.g. TALLULAH — Vintage 1970s Shearling Coat)">
              <input className={FIELD} value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
            </Labeled>
            <div className="grid grid-cols-2 gap-4">
              <Labeled label="Category">
                <select className={FIELD} value={productType} onChange={(e) => setProductType(e.target.value)}>
                  {CATS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Labeled>
              <Labeled label="Price (USD)"><input className={FIELD} type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></Labeled>
            </div>
            <Labeled label="Tags — era, material, decade (comma separated)">
              <input className={FIELD} value={tags} onChange={(e) => setTags(e.target.value)} placeholder="1970s, Shearling, Vintage" />
            </Labeled>
            <div>
              <span className="mb-1 block text-xs uppercase tracking-wider text-[#8a7d68]">Story / description</span>
              <RichText value={desc} onChange={setDesc} minHeight={110} />
            </div>

            <div className="rounded-lg border border-[#E4DAC9] bg-[#FAF7F1] p-3">
              <div className="mb-2 text-xs uppercase tracking-wider text-[#8a7d68]">Size &amp; Fit (shows on the listing)</div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {SIZE_FIT_FIELDS.map((f) => (
                  <label key={f.key} className="block">
                    <span className="mb-0.5 block text-[11px] text-[#8a7d68]">{f.label}{f.key !== "estimatedSize" ? " (in)" : ""}</span>
                    <input
                      className="w-full rounded border border-[#E4DAC9] bg-white px-2.5 py-1.5 text-sm outline-none focus:border-[#B8A48A]"
                      value={sizeFit[f.key] || ""}
                      placeholder={f.placeholder}
                      onChange={(e) => setSizeFit({ ...sizeFit, [f.key]: e.target.value })}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Photos */}
            <div>
              <span className="mb-1 block text-xs uppercase tracking-wider text-[#8a7d68]">Photos</span>
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#D8CBB4] bg-[#FAF7F1] px-4 py-8 text-center hover:border-[#B8A48A]"
              >
                <UploadCloud size={24} className="text-[#b6a890]" />
                <p className="mt-2 text-sm text-[#5a5246]">Drop photos here or click to choose</p>
                <p className="text-xs text-[#8a7d68]">JPG or PNG. First photo becomes the cover.</p>
                <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
              </div>
              {pics.length > 0 && (
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {pics.map((p, i) => (
                    <div key={i} className="group relative aspect-[3/4] overflow-hidden rounded border border-[#E4DAC9]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.url} alt="" className="h-full w-full object-cover" />
                      {i === 0 && <span className="absolute left-1 top-1 rounded bg-[#1A1A1A]/80 px-1.5 py-0.5 text-[10px] text-[#F5EFE6]">cover</span>}
                      <button onClick={() => removePic(i)} className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white opacity-0 group-hover:opacity-100" aria-label="Remove">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {err && <p className="text-sm text-[#5C1F1F]">{err}</p>}
            <div className="flex items-center justify-end gap-3">
              {stage && <span className="text-sm text-[#8a7d68]">{stage}</span>}
              <button onClick={create} disabled={saving} className="rounded bg-[#1A1A1A] px-5 py-2.5 text-sm text-[#F5EFE6] disabled:opacity-50">
                {saving ? "Working…" : "Create draft"}
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminChrome>
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
