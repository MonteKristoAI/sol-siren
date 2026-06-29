"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";
import { api } from "../_components/api";

export default function SettingsPage() {
  const [shopify, setShopify] = useState<boolean | null>(null);
  const [retell, setRetell] = useState<boolean | null>(null);

  useEffect(() => {
    api("/products").then(() => setShopify(true)).catch(() => setShopify(false));
    api("/chats").then(() => setRetell(true)).catch(() => setRetell(false));
  }, []);

  return (
    <AdminChrome title="Settings">
      <div className="max-w-2xl space-y-6">
        <Section title="Connections">
          <Row label="Shopify (store, products, orders)" ok={shopify} />
          <Row label="Concierge chat (Retell)" ok={retell} />
          <Row label="Store" value="sol-siren-vintage.myshopify.com" />
        </Section>

        <Section title="Your login">
          <p className="text-sm text-[#5a5246]">
            You sign in with a password. To change it, ask MonteKristo to rotate the
            admin password, takes a minute. Your session stays signed in for 30 days on this device.
          </p>
        </Section>

        <Section title="Tips">
          <ul className="list-disc space-y-1 pl-5 text-sm text-[#5a5246]">
            <li>Mark a sold piece via <b>Inventory → Archive</b>; it stays on the site under your brand archive.</li>
            <li>Print a packaging card for any piece in <b>History Cards</b>.</li>
            <li>Update what the chatbot knows in <b>Bot Knowledge</b>; it publishes instantly.</li>
          </ul>
        </Section>
      </div>
    </AdminChrome>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#E4DAC9] bg-white p-5">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#8a7d68]">{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, ok, value }: { label: string; ok?: boolean | null; value?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#F0E8D9] py-2 text-sm last:border-0">
      <span>{label}</span>
      {value ? (
        <span className="text-[#8a7d68]">{value}</span>
      ) : ok == null ? (
        <span className="text-[#b6a890]">checking…</span>
      ) : ok ? (
        <span className="flex items-center gap-1 text-[#2f5a2f]"><CheckCircle2 size={15} /> Connected</span>
      ) : (
        <span className="flex items-center gap-1 text-[#5C1F1F]"><XCircle size={15} /> Issue</span>
      )}
    </div>
  );
}
