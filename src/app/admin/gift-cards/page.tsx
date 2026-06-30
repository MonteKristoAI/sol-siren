"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Copy, Check, Gift, X, Ban } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import { api, fmtDate, money } from "../_components/api";

type GiftCard = {
  id: string; maskedCode: string; balance: number; initialValue: number; currency: string;
  enabled: boolean; expiresOn: string | null; note: string | null; createdAt: string;
};
type Created = { code: string; balance: number; currency: string; expiresOn: string | null };

const FIELD = "w-full rounded border border-[#E4DAC9] px-3 py-2 text-sm outline-none focus:border-[#B8A48A]";

export default function GiftCardsPage() {
  const [items, setItems] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState<Created | null>(null);
  const [detail, setDetail] = useState<GiftCard | null>(null);

  async function load() {
    try {
      const { giftCards } = await api<{ giftCards: GiftCard[] }>("/giftcards");
      setItems(giftCards);
    } catch (e: any) { setErr(e.message); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  function expired(g: GiftCard) {
    return g.expiresOn && new Date(g.expiresOn).getTime() < Date.now();
  }

  return (
    <AdminChrome
      title="Gift Cards"
      action={
        <button onClick={() => { setCreated(null); setCreating(true); }} className="flex items-center gap-2 rounded bg-[#1A1A1A] px-3 py-2 text-sm text-[#F5EFE6]">
          <Plus size={16} /> Create gift card
        </button>
      }
    >
      <p className="mb-4 max-w-2xl text-sm text-[#5a5246]">
        Make a one-off gift card whenever you like, set the amount and how long it stays valid. The code works at
        checkout on the site and the balance is tracked automatically. Click any card to see details or deactivate it.
      </p>
      {err && <div className="mb-4 rounded border border-[#d9b8b8] bg-[#f7eaea] px-4 py-3 text-sm text-[#5C1F1F]">{err}</div>}

      {loading ? (
        <p className="flex items-center gap-2 text-[#8a7d68]"><Loader2 className="animate-spin" size={16} /> Loading…</p>
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-[#E4DAC9] bg-white p-10 text-center text-[#8a7d68]">No gift cards yet. Create your first one.</div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-[#E4DAC9] bg-white">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#E4DAC9] text-left text-xs uppercase tracking-wider text-[#8a7d68]">
              <th className="px-4 py-3">Code</th><th className="px-4 py-3">Balance</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Expires</th><th className="px-4 py-3">Issued</th>
            </tr></thead>
            <tbody className="divide-y divide-[#F0E8D9]">
              {items.map((g) => (
                <tr key={g.id} onClick={() => setDetail(g)} className="cursor-pointer hover:bg-[#FAF7F1]">
                  <td className="px-4 py-3 font-mono">{g.maskedCode}</td>
                  <td className="px-4 py-3">{money(g.balance, g.currency)}{g.balance !== g.initialValue && <span className="text-[#8a7d68]"> / {money(g.initialValue, g.currency)}</span>}</td>
                  <td className="px-4 py-3">
                    {!g.enabled ? <span className="text-[#8a7d68]">Disabled</span>
                      : expired(g) ? <span className="text-[#7a5c12]">Expired</span>
                      : g.balance <= 0 ? <span className="text-[#8a7d68]">Used up</span>
                      : <span className="text-[#2f5a2f]">Active</span>}
                  </td>
                  <td className="px-4 py-3 text-[#8a7d68]">{g.expiresOn ? fmtDate(g.expiresOn) : "—"}</td>
                  <td className="px-4 py-3 text-[#8a7d68]">{fmtDate(g.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {creating && <CreateModal onClose={() => setCreating(false)} onCreated={(c) => { setCreated(c); setCreating(false); load(); }} />}
      {created && <CodeModal created={created} onClose={() => setCreated(null)} />}
      {detail && <DetailDrawer card={detail} onClose={() => setDetail(null)} onChanged={() => { setDetail(null); load(); }} />}
    </AdminChrome>
  );
}

function DetailDrawer({ card, onClose, onChanged }: { card: GiftCard; onClose: () => void; onChanged: () => void }) {
  const [busy, setBusy] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [err, setErr] = useState("");

  async function deactivate() {
    setBusy(true); setErr("");
    try {
      await api("/giftcards", { method: "PATCH", body: JSON.stringify({ id: card.id, action: "deactivate" }) });
      onChanged();
    } catch (e: any) { setErr(e.message); setBusy(false); }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={onClose}>
      <div className="flex h-full w-full max-w-sm flex-col bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#E4DAC9] px-5 py-4">
          <h2 className="text-lg font-semibold">Gift card</h2>
          <button onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <Row label="Code" value={card.maskedCode} mono />
          <Row label="Balance" value={money(card.balance, card.currency)} />
          <Row label="Original value" value={money(card.initialValue, card.currency)} />
          <Row label="Status" value={card.enabled ? "Active" : "Disabled"} />
          <Row label="Expires" value={card.expiresOn ? fmtDate(card.expiresOn) : "No expiry"} />
          <Row label="Issued" value={fmtDate(card.createdAt)} />
          {card.note && <Row label="Note" value={card.note} />}

          {err && <p className="mt-4 text-sm text-[#5C1F1F]">{err}</p>}

          {card.enabled && (
            <div className="mt-6 rounded-lg border border-[#d9b8b8] bg-[#fbf3f3] p-4">
              <p className="text-sm text-[#5a5246]">Deactivating stops this code from working at checkout. Shopify does not allow permanently deleting a gift card, so this is how you cancel one.</p>
              {!confirm ? (
                <button onClick={() => setConfirm(true)} className="mt-3 flex items-center gap-2 rounded border border-[#d9b8b8] px-3 py-2 text-sm text-[#5C1F1F] hover:bg-[#f7eaea]">
                  <Ban size={15} /> Deactivate this card
                </button>
              ) : (
                <div className="mt-3 flex gap-2">
                  <button onClick={deactivate} disabled={busy} className="rounded bg-[#5C1F1F] px-3 py-2 text-sm text-[#F5EFE6] disabled:opacity-50">
                    {busy ? "Deactivating…" : "Yes, deactivate"}
                  </button>
                  <button onClick={() => setConfirm(false)} className="rounded border border-[#E4DAC9] px-3 py-2 text-sm">Cancel</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between border-b border-[#F0E8D9] py-2.5 text-sm last:border-0">
      <span className="text-[#8a7d68]">{label}</span>
      <span className={`text-right ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}

function CreateModal({ onClose, onCreated }: { onClose: () => void; onCreated: (c: Created) => void }) {
  const [amount, setAmount] = useState("50");
  const [expiry, setExpiry] = useState("365");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  async function create() {
    const amt = Number(amount);
    if (!amt || amt <= 0) { setErr("Enter an amount"); return; }
    setSaving(true); setErr("");
    try {
      const { giftCard } = await api<{ giftCard: Created }>("/giftcards", {
        method: "POST",
        body: JSON.stringify({ amount: amt, expiresInDays: expiry ? Number(expiry) : null, note: note || undefined }),
      });
      onCreated(giftCard);
    } catch (e: any) { setErr(e.message); setSaving(false); }
  }

  return (
    <Modal title="Create a gift card" onClose={onClose}>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Labeled label="Amount (USD)"><input className={FIELD} type="number" value={amount} onChange={(e) => setAmount(e.target.value)} autoFocus /></Labeled>
          <Labeled label="Valid for (days, blank = no expiry)"><input className={FIELD} type="number" value={expiry} onChange={(e) => setExpiry(e.target.value)} /></Labeled>
        </div>
        <Labeled label="Note (optional — who it's for)"><input className={FIELD} value={note} onChange={(e) => setNote(e.target.value)} /></Labeled>
        {err && <p className="text-sm text-[#5C1F1F]">{err}</p>}
        <div className="flex justify-end gap-2 pt-1">
          <button onClick={onClose} className="rounded border border-[#E4DAC9] px-4 py-2 text-sm">Cancel</button>
          <button onClick={create} disabled={saving} className="rounded bg-[#1A1A1A] px-4 py-2 text-sm text-[#F5EFE6] disabled:opacity-50">{saving ? "Creating…" : "Create"}</button>
        </div>
      </div>
    </Modal>
  );
}

function CodeModal({ created, onClose }: { created: Created; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <Modal title="Gift card created" onClose={onClose}>
      <div className="text-center">
        <Gift size={26} className="mx-auto text-[#5C1F1F]" />
        <p className="mt-2 text-sm text-[#5a5246]">Copy this code now, it is shown only once. The customer enters it at checkout.</p>
        <div className="my-4 flex items-center justify-center gap-2">
          <code className="rounded bg-[#F5EFE6] px-4 py-3 text-lg font-semibold tracking-widest">{created.code}</code>
          <button onClick={() => { navigator.clipboard?.writeText(created.code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="rounded border border-[#E4DAC9] p-3 hover:bg-[#F5EFE6]" aria-label="Copy">
            {copied ? <Check size={18} className="text-[#2f5a2f]" /> : <Copy size={18} />}
          </button>
        </div>
        <p className="text-sm text-[#8a7d68]">{money(created.balance, created.currency)}{created.expiresOn ? ` · valid until ${fmtDate(created.expiresOn)}` : " · no expiry"}</p>
        <button onClick={onClose} className="mt-5 rounded bg-[#1A1A1A] px-5 py-2 text-sm text-[#F5EFE6]">Done</button>
      </div>
    </Modal>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-xl font-semibold">{title}</h2>
        {children}
      </div>
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
