"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Printer, Search } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import { api } from "../_components/api";

type Product = {
  id: string;
  handle: string;
  title: string;
  productType: string;
  tags: string[];
  description: string;
  featuredImage: string | null;
};

// derive an era like "1970s" from tags
function era(tags: string[]): string {
  const t = tags.find((x) => /^\d{4}s$/.test(x) || /\b(19|20)\d0s\b/.test(x));
  return t || "";
}

export default function LabelsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
    api<{ products: Product[] }>("/products")
      .then((d) => setProducts(d.products))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => products.filter((p) => p.title.toLowerCase().includes(q.toLowerCase())),
    [products, q]
  );

  const name = selected ? selected.title.split(" — ")[0].split(" - ")[0].trim() : "";
  const story = selected ? selected.description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "";

  return (
    <AdminChrome
      title="History Cards"
      action={
        selected && (
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded bg-[#1A1A1A] px-3 py-2 text-sm text-[#F5EFE6]">
            <Printer size={16} /> Print card
          </button>
        )
      }
    >
      <p className="mb-4 max-w-2xl text-sm text-[#5a5246] print:hidden">
        Pick a piece to generate its packaging card — the name, era, and story that goes in the box with the coat.
      </p>
      {err && <div className="mb-4 rounded border border-[#d9b8b8] bg-[#f7eaea] px-4 py-3 text-sm text-[#5C1F1F] print:hidden">{err}</div>}

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="print:hidden">
          <div className="mb-3 flex items-center gap-2 rounded border border-[#E4DAC9] bg-white px-3 py-2">
            <Search size={16} className="text-[#8a7d68]" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a piece" className="w-full bg-transparent text-sm outline-none" />
          </div>
          {loading ? (
            <p className="flex items-center gap-2 text-[#8a7d68]"><Loader2 className="animate-spin" size={16} /> Loading…</p>
          ) : (
            <ul className="max-h-[60vh] divide-y divide-[#F0E8D9] overflow-y-auto rounded-lg border border-[#E4DAC9] bg-white">
              {filtered.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => setSelected(p)}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[#FAF7F1] ${selected?.id === p.id ? "bg-[#F5EFE6]" : ""}`}
                  >
                    {p.title.split(" — ")[0]}
                    <span className="block text-xs text-[#8a7d68]">{p.productType} {era(p.tags) && `· ${era(p.tags)}`}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          {!selected ? (
            <div className="rounded-lg border border-dashed border-[#E4DAC9] p-12 text-center text-[#8a7d68] print:hidden">
              Select a piece to preview its card.
            </div>
          ) : (
            <div className="mx-auto w-full max-w-md">
              {/* Printable card */}
              <div className="card-print rounded-lg border border-[#1A1A1A] bg-[#FAF7F1] p-10 text-center">
                <div className="font-display text-xs uppercase tracking-fashion text-[#5C1F1F]">Sol Siren Vintage</div>
                <div className="my-5 h-px bg-[#B8A48A]" />
                <h2 className="font-display text-3xl tracking-wide text-[#1A1A1A]">{name}</h2>
                {era(selected.tags) && <p className="mt-1 font-body text-lg text-[#5a5246]">{era(selected.tags)} · {selected.productType}</p>}
                {story && <p className="mt-5 font-body text-base leading-relaxed text-[#2A2520]">{story.slice(0, 420)}{story.length > 420 ? "…" : ""}</p>}
                <div className="my-6 h-px bg-[#B8A48A]" />
                <p className="font-body text-sm italic text-[#8a7d68]">A garment with a past, ready for its next chapter.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .card-print, .card-print * { visibility: visible; }
          .card-print { position: absolute; left: 0; top: 0; width: 100%; border: none; }
        }
      `}</style>
    </AdminChrome>
  );
}
