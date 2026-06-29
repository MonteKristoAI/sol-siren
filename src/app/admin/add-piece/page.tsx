"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import { api } from "../_components/api";

const FIELD = "w-full rounded border border-[#E4DAC9] px-3 py-2 text-sm outline-none focus:border-[#B8A48A]";
const CATS = ["Fur", "Leather", "Penny Lane / Afghan", "Overcoat", "Apres Ski", "Jewelry"];

export default function AddPiecePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [productType, setProductType] = useState("Fur");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
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
      setDone(true);
      setTimeout(() => router.push("/admin/inventory"), 1200);
    } catch (e: any) {
      setErr(e.message);
      setSaving(false);
    }
  }

  return (
    <AdminChrome title="Add a Piece">
      <div className="max-w-2xl">
        <p className="mb-5 text-sm text-[#5a5246]">
          New pieces are created as a <b>draft</b> in Shopify so you can review the photos and details
          before setting it live. Give it a name, an era, and its story.
        </p>
        {done ? (
          <div className="flex items-center gap-2 rounded-lg border border-[#cfe0cf] bg-[#eef5ee] px-4 py-4 text-[#2f5a2f]">
            <Check size={18} /> Draft created. Taking you to Inventory…
          </div>
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
            <Labeled label="Story / description"><textarea className={`${FIELD} h-32`} value={desc} onChange={(e) => setDesc(e.target.value)} /></Labeled>
            <Labeled label="Image URLs (one per line)"><textarea className={`${FIELD} h-20`} value={images} onChange={(e) => setImages(e.target.value)} placeholder="https://…/photo-1.jpg" /></Labeled>
            {err && <p className="text-sm text-[#5C1F1F]">{err}</p>}
            <div className="flex justify-end">
              <button onClick={create} disabled={saving} className="rounded bg-[#1A1A1A] px-5 py-2.5 text-sm text-[#F5EFE6] disabled:opacity-50">
                {saving ? "Creating…" : "Create draft"}
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
