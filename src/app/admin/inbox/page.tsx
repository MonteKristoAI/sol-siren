"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Mail, X, Tag } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import { api, fmtDate } from "../_components/api";

type Inquiry = {
  id: string; name: string; email: string; subject: string; message: string;
  inquiryType: string; status: string; relatedProduct: string; createdAt: string;
};
const STATUSES = ["New", "Replied", "Waiting", "Closed"];
type Filter = "All" | "New" | "Replied" | "Waiting" | "Closed";

const STATUS_CLS: Record<string, string> = {
  New: "bg-[#efe1e1] text-[#5C1F1F]",
  Replied: "bg-[#e6efe6] text-[#2f5a2f]",
  Waiting: "bg-[#f3ead2] text-[#7a5c12]",
  Closed: "bg-[#eee] text-[#666]",
};

export default function InboxPage() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<Inquiry | null>(null);

  async function load() {
    try {
      const { inquiries } = await api<{ inquiries: Inquiry[] }>("/inbox");
      setItems(inquiries);
      setErr("");
    } catch (e: any) { setErr(e.message); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: items.length };
    STATUSES.forEach((s) => (c[s] = items.filter((i) => i.status === s).length));
    return c;
  }, [items]);

  const filtered = filter === "All" ? items : items.filter((i) => i.status === filter);

  return (
    <AdminChrome title="Inbox">
      <p className="mb-4 max-w-2xl text-sm text-[#5a5246]">
        Messages from the site contact form. Reply by email, track each one, and put a piece on hold if
        someone is asking about it.
      </p>
      {err && <div className="mb-4 rounded border border-[#d9b8b8] bg-[#f7eaea] px-4 py-3 text-sm text-[#5C1F1F]">{err}</div>}

      <div className="mb-4 flex flex-wrap gap-1">
        {(["All", ...STATUSES] as Filter[]).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded px-3 py-1.5 text-sm ${filter === f ? "bg-[#5C1F1F] text-[#F5EFE6]" : "border border-[#E4DAC9] bg-white"}`}>
            {f} <span className="opacity-60">{counts[f] ?? 0}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <p className="flex items-center gap-2 text-[#8a7d68]"><Loader2 className="animate-spin" size={16} /> Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-[#E4DAC9] bg-white p-10 text-center text-[#8a7d68]">
          {items.length === 0 ? "No messages yet. They land here the moment someone uses the site contact form." : "Nothing in this status."}
        </div>
      ) : (
        <ul className="divide-y divide-[#F0E8D9] overflow-hidden rounded-lg border border-[#E4DAC9] bg-white">
          {filtered.map((i) => (
            <li key={i.id}>
              <button onClick={() => setOpen(i)} className="flex w-full items-center gap-4 px-4 py-3 text-left hover:bg-[#FAF7F1]">
                <span className={`w-20 flex-shrink-0 rounded-full px-2 py-1 text-center text-xs ${STATUS_CLS[i.status] || ""}`}>{i.status}</span>
                <span className="min-w-0 flex-1">
                  <span className="font-medium">{i.name}</span>
                  <span className="ml-2 text-xs text-[#8a7d68]">{i.inquiryType}</span>
                  <span className="block truncate text-sm text-[#5a5246]">{i.subject || i.message}</span>
                </span>
                <span className="whitespace-nowrap text-xs text-[#8a7d68]">{fmtDate(i.createdAt)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && <Drawer inquiry={open} onClose={() => setOpen(null)} onChanged={() => { load(); }} />}
    </AdminChrome>
  );
}

function Drawer({ inquiry, onClose, onChanged }: { inquiry: Inquiry; onClose: () => void; onChanged: () => void }) {
  const [status, setStatus] = useState(inquiry.status);
  const [busy, setBusy] = useState(false);
  const [held, setHeld] = useState(false);
  const [err, setErr] = useState("");

  async function changeStatus(s: string) {
    setBusy(true); setErr("");
    try { await api("/inbox", { method: "PATCH", body: JSON.stringify({ id: inquiry.id, status: s }) }); setStatus(s); onChanged(); }
    catch (e: any) { setErr(e.message); }
    finally { setBusy(false); }
  }

  async function holdPiece() {
    if (!inquiry.relatedProduct) return;
    setBusy(true); setErr("");
    try { await api("/products", { method: "PATCH", body: JSON.stringify({ id: inquiry.relatedProduct, action: "reserve" }) }); setHeld(true); }
    catch (e: any) { setErr(e.message); }
    finally { setBusy(false); }
  }

  const mailto = `mailto:${inquiry.email}?subject=${encodeURIComponent("Re: " + (inquiry.subject || "Your message to Sol Siren"))}`;
  const isGid = inquiry.relatedProduct.startsWith("gid://");

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#E4DAC9] px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">{inquiry.name}</h2>
            <a href={`mailto:${inquiry.email}`} className="text-sm text-[#5C1F1F]">{inquiry.email}</a>
          </div>
          <button onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className={`rounded-full px-2.5 py-1 ${STATUS_CLS[status] || ""}`}>{status}</span>
            <span className="rounded-full bg-[#F5EFE6] px-2.5 py-1 text-[#7a5c12]">{inquiry.inquiryType}</span>
            <span className="rounded-full bg-[#F5EFE6] px-2.5 py-1 text-[#8a7d68]">{fmtDate(inquiry.createdAt)}</span>
          </div>
          {inquiry.subject && <div><div className="text-xs uppercase tracking-wider text-[#8a7d68]">Subject</div><div className="text-sm">{inquiry.subject}</div></div>}
          <div>
            <div className="text-xs uppercase tracking-wider text-[#8a7d68]">Message</div>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-[#2A2520]">{inquiry.message}</p>
          </div>
          {inquiry.relatedProduct && (
            <div><div className="text-xs uppercase tracking-wider text-[#8a7d68]">About a piece</div><div className="text-sm">{inquiry.relatedProduct}</div></div>
          )}
          {err && <p className="text-sm text-[#5C1F1F]">{err}</p>}
        </div>

        <div className="space-y-3 border-t border-[#E4DAC9] p-5">
          <a href={mailto} className="flex w-full items-center justify-center gap-2 rounded bg-[#1A1A1A] px-4 py-2.5 text-sm text-[#F5EFE6]">
            <Mail size={15} /> Reply by email
          </a>
          {isGid && (
            <button onClick={holdPiece} disabled={busy || held} className="flex w-full items-center justify-center gap-2 rounded border border-[#E4DAC9] px-4 py-2.5 text-sm hover:bg-[#F5EFE6] disabled:opacity-60">
              <Tag size={15} /> {held ? "Piece put on hold" : "Put the piece on hold"}
            </button>
          )}
          <div>
            <div className="mb-1.5 text-xs uppercase tracking-wider text-[#8a7d68]">Set status</div>
            <div className="flex flex-wrap gap-1.5">
              {STATUSES.map((s) => (
                <button key={s} onClick={() => changeStatus(s)} disabled={busy || status === s}
                  className={`rounded border px-2.5 py-1 text-xs disabled:opacity-100 ${status === s ? "border-[#1A1A1A] bg-[#1A1A1A] text-[#F5EFE6]" : "border-[#E4DAC9] hover:bg-[#F5EFE6]"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
