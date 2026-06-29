"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Printer, FileDown, Search, Check, PackageCheck } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import { api } from "../_components/api";

type Product = {
  id: string; handle: string; title: string; productType: string; tags: string[]; description: string;
};

function eraOf(tags: string[]): string {
  const t = tags.find((x) => /^(19|20)\d0s$/i.test(x)) || tags.find((x) => /\b(19|20)\d0s\b/.test(x));
  return t || "";
}
const MATERIALS = ["Shearling", "Mongolian Lamb", "Tibetan Lamb", "Fox Fur", "Mink", "Faux Fur", "Fur", "Boarskin", "Suede", "Leather", "Wool", "Cashmere", "Mohair"];
function materialOf(p: Product): string {
  const hay = `${p.tags.join(" ")} ${p.title}`;
  const m = MATERIALS.find((x) => new RegExp(x, "i").test(hay));
  return m || p.productType || "";
}
function defaultCare(material: string): string {
  const m = material.toLowerCase();
  if (/fur|shearling|lamb|mink|fox/.test(m))
    return "Store on a wide, padded hanger inside the breathable garment bag, away from heat and direct light. Never use plastic. Clean only with a furrier experienced in vintage pieces.";
  if (/leather|suede|boarskin/.test(m))
    return "Keep on a shaped hanger in the garment bag, away from damp and direct sun. Spot clean gently; for anything more, use a leather specialist familiar with vintage.";
  if (/wool|cashmere|mohair/.test(m))
    return "Hang on a wide hanger in the garment bag. Air rather than over-clean. Professional clean only, by someone who handles vintage wool.";
  return "Store on a wide hanger in the breathable garment bag, away from heat and direct light. Professional clean only, by someone experienced with vintage garments.";
}

export default function LabelsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<Product | null>(null);

  // editable card fields
  const [name, setName] = useState("");
  const [era, setEra] = useState("");
  const [material, setMaterial] = useState("");
  const [story, setStory] = useState("");
  const [care, setCare] = useState("");
  const [included, setIncluded] = useState(false);
  const [savedMeta, setSavedMeta] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<{ products: Product[] }>("/products").then((d) => setProducts(d.products)).catch((e) => setErr(e.message)).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => products.filter((p) => p.title.toLowerCase().includes(q.toLowerCase())), [products, q]);

  async function select(p: Product) {
    setSel(p);
    setSavedMeta(false);
    const cleanStory = p.description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const mat = materialOf(p);
    setName(p.title.split(" — ")[0].split(" - ")[0].trim());
    setEra(eraOf(p.tags));
    setMaterial(mat);
    setStory(cleanStory);
    setCare(defaultCare(mat));
    setIncluded(false);
    try {
      const { meta } = await api<{ meta: Record<string, string> }>(`/piece-meta?id=${encodeURIComponent(p.id)}`);
      if (meta.care_notes) setCare(meta.care_notes);
      if (meta.story_override) setStory(meta.story_override);
      if (meta.history_card_status) {
        try { setIncluded(!!JSON.parse(meta.history_card_status).included); } catch {}
      }
    } catch {}
  }

  async function saveMeta() {
    if (!sel) return;
    setBusy(true);
    try {
      await api("/piece-meta", { method: "POST", body: JSON.stringify({ id: sel.id, key: "care_notes", value: care, type: "multi_line_text_field" }) });
      await api("/piece-meta", { method: "POST", body: JSON.stringify({ id: sel.id, key: "story_override", value: story, type: "multi_line_text_field" }) });
      setSavedMeta(true);
      setTimeout(() => setSavedMeta(false), 2500);
    } catch (e: any) { alert(e.message); }
    finally { setBusy(false); }
  }

  async function markIncluded() {
    if (!sel) return;
    setBusy(true);
    try {
      await api("/piece-meta", {
        method: "POST",
        body: JSON.stringify({ id: sel.id, key: "history_card_status", value: JSON.stringify({ printed: true, included: true }), type: "json" }),
      });
      setIncluded(true);
    } catch (e: any) { alert(e.message); }
    finally { setBusy(false); }
  }

  return (
    <AdminChrome
      title="History Cards"
      action={sel && (
        <div className="flex gap-2 print:hidden">
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded border border-[#E4DAC9] bg-white px-3 py-2 text-sm hover:bg-[#F5EFE6]"><FileDown size={15} /> Save as PDF</button>
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded bg-[#1A1A1A] px-3 py-2 text-sm text-[#F5EFE6]"><Printer size={15} /> Print</button>
        </div>
      )}
    >
      <p className="mb-4 max-w-2xl text-sm text-[#5a5246] print:hidden">
        Make the card that goes in the box with each coat. Pick a piece, the name, era, material, story and
        care notes fill in automatically; edit anything, then print it or save a PDF. Mark it included so you
        know it shipped with the order.
      </p>
      {err && <div className="mb-4 rounded border border-[#d9b8b8] bg-[#f7eaea] px-4 py-3 text-sm text-[#5C1F1F] print:hidden">{err}</div>}

      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* picker */}
        <div className="print:hidden">
          <div className="mb-3 flex items-center gap-2 rounded border border-[#E4DAC9] bg-white px-3 py-2">
            <Search size={16} className="text-[#8a7d68]" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a piece" className="w-full bg-transparent text-sm outline-none" />
          </div>
          {loading ? (
            <p className="flex items-center gap-2 text-[#8a7d68]"><Loader2 className="animate-spin" size={16} /> Loading…</p>
          ) : (
            <ul className="max-h-[62vh] divide-y divide-[#F0E8D9] overflow-y-auto rounded-lg border border-[#E4DAC9] bg-white">
              {filtered.map((p) => (
                <li key={p.id}>
                  <button onClick={() => select(p)} className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[#FAF7F1] ${sel?.id === p.id ? "bg-[#F5EFE6]" : ""}`}>
                    {p.title.split(" — ")[0]}
                    <span className="block text-xs text-[#8a7d68]">{p.productType}{eraOf(p.tags) && ` · ${eraOf(p.tags)}`}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* editor + card */}
        <div>
          {!sel ? (
            <div className="rounded-lg border border-dashed border-[#E4DAC9] p-12 text-center text-[#8a7d68] print:hidden">Select a piece to build its card.</div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {/* edit fields */}
              <div className="space-y-3 print:hidden">
                <Field label="Name"><input className={F} value={name} onChange={(e) => setName(e.target.value)} /></Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Era / decade"><input className={F} value={era} onChange={(e) => setEra(e.target.value)} /></Field>
                  <Field label="Material"><input className={F} value={material} onChange={(e) => setMaterial(e.target.value)} /></Field>
                </div>
                <Field label="Story"><textarea className={`${F} h-28`} value={story} onChange={(e) => setStory(e.target.value)} /></Field>
                <Field label="Care notes"><textarea className={`${F} h-24`} value={care} onChange={(e) => setCare(e.target.value)} /></Field>
                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={saveMeta} disabled={busy} className="rounded border border-[#E4DAC9] px-3 py-2 text-sm hover:bg-[#F5EFE6] disabled:opacity-50">
                    {savedMeta ? "Saved" : "Save text"}
                  </button>
                  <button onClick={markIncluded} disabled={busy || included} className={`flex items-center gap-2 rounded px-3 py-2 text-sm ${included ? "bg-[#eef5ee] text-[#2f5a2f]" : "bg-[#1A1A1A] text-[#F5EFE6]"} disabled:opacity-70`}>
                    {included ? <><Check size={15} /> Included in package</> : <><PackageCheck size={15} /> Mark included</>}
                  </button>
                </div>
              </div>

              {/* printable card */}
              <div className="mx-auto w-full max-w-md">
                <div className="card-print rounded-lg border border-[#1A1A1A] bg-[#FAF7F1] p-10 text-center">
                  <div className="font-display text-xs uppercase tracking-fashion text-[#5C1F1F]">Sol Siren Vintage</div>
                  <div className="my-5 h-px bg-[#B8A48A]" />
                  <h2 className="font-display text-3xl tracking-wide text-[#1A1A1A]">{name}</h2>
                  {(era || material) && <p className="mt-1 font-body text-lg text-[#5a5246]">{[era, material].filter(Boolean).join(" · ")}</p>}
                  {story && <p className="mt-5 font-body text-base leading-relaxed text-[#2A2520]">{story.slice(0, 460)}{story.length > 460 ? "…" : ""}</p>}
                  {care && (<><div className="my-5 h-px bg-[#B8A48A]" /><p className="font-body text-xs uppercase tracking-wide text-[#8a7d68]">Care</p><p className="mt-1 font-body text-sm leading-relaxed text-[#2A2520]">{care}</p></>)}
                  <div className="my-6 h-px bg-[#B8A48A]" />
                  <p className="font-body text-sm italic text-[#8a7d68]">A garment with a past, ready for its next chapter.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `@media print { body * { visibility: hidden; } .card-print, .card-print * { visibility: visible; } .card-print { position: absolute; left: 0; top: 0; width: 100%; border: none; } }` }} />
    </AdminChrome>
  );
}

const F = "w-full rounded border border-[#E4DAC9] px-3 py-2 text-sm outline-none focus:border-[#B8A48A]";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-wider text-[#8a7d68]">{label}</span>
      {children}
    </label>
  );
}
