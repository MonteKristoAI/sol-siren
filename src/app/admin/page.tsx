"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminChrome from "./_components/AdminChrome";
import { api, fmtDate, money } from "./_components/api";

type Stats = {
  pieces: { active: number; draft: number; sold: number; reserved: number; total: number };
  orders: { thisMonth: number; unfulfilled: number; revenueThisMonth: number };
  chats: { total: number; thisWeek: number };
  aging: { title: string; handle: string; createdAt: string }[];
  recentOrders: { name: string; customer: string; total: number; currency: string; createdAt: string; country: string | null }[];
};

function Stat({ label, value, sub, href }: { label: string; value: React.ReactNode; sub?: string; href?: string }) {
  const inner = (
    <div className="rounded-lg border border-[#E4DAC9] bg-white p-5 transition-shadow hover:shadow-sm">
      <div className="text-xs uppercase tracking-widest text-[#8a7d68]">{label}</div>
      <div className="mt-2 font-semibold text-3xl text-[#1A1A1A]">{value}</div>
      {sub && <div className="mt-1 text-sm text-[#8a7d68]">{sub}</div>}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

export default function Dashboard() {
  const [s, setS] = useState<Stats | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    api<Stats>("/stats").then(setS).catch((e) => setErr(e.message));
  }, []);

  return (
    <AdminChrome title="Dashboard">
      {err && <Banner msg={err} />}
      {!s && !err && <p className="text-[#8a7d68]">Loading…</p>}
      {s && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Stat label="Live pieces" value={s.pieces.active} sub={`${s.pieces.total} total in store`} href="/admin/inventory" />
            <Stat label="On hold" value={s.pieces.reserved} sub="reserved for a buyer" href="/admin/inventory?filter=reserved" />
            <Stat label="Sold / archived" value={s.pieces.sold} href="/admin/inventory?filter=sold" />
            <Stat label="Drafts" value={s.pieces.draft} sub="not yet live" href="/admin/inventory?filter=draft" />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Stat label="Orders this month" value={s.orders.thisMonth} href="/admin/orders" />
            <Stat label="Needs fulfilling" value={s.orders.unfulfilled} href="/admin/orders" />
            <Stat label="Revenue (month)" value={money(s.orders.revenueThisMonth)} />
            <Stat label="Chats this week" value={s.chats.thisWeek} sub={`${s.chats.total} on record`} href="/admin/chats" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-[#E4DAC9] bg-white p-5">
              <h2 className="mb-3 font-semibold text-lg">Recent orders</h2>
              {s.recentOrders.length === 0 ? (
                <p className="text-sm text-[#8a7d68]">No orders yet.</p>
              ) : (
                <ul className="divide-y divide-[#F0E8D9]">
                  {s.recentOrders.map((o) => (
                    <li key={o.name} className="flex items-center justify-between py-2.5 text-sm">
                      <span>
                        <span className="font-medium">{o.name}</span>{" "}
                        <span className="text-[#8a7d68]">· {o.customer}</span>
                        {o.country && <span className="text-[#8a7d68]"> · {o.country}</span>}
                      </span>
                      <span className="text-right">
                        {money(o.total, o.currency)}
                        <span className="ml-2 text-[#8a7d68]">{fmtDate(o.createdAt)}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-lg border border-[#E4DAC9] bg-white p-5">
              <h2 className="mb-1 font-semibold text-lg">Been live longest</h2>
              <p className="mb-3 text-xs text-[#8a7d68]">Pieces that may want fresh photos or a feature.</p>
              {s.aging.length === 0 ? (
                <p className="text-sm text-[#8a7d68]">Nothing live yet.</p>
              ) : (
                <ul className="divide-y divide-[#F0E8D9]">
                  {s.aging.map((p) => (
                    <li key={p.handle} className="flex items-center justify-between py-2.5 text-sm">
                      <span className="truncate pr-3">{p.title}</span>
                      <span className="whitespace-nowrap text-[#8a7d68]">since {fmtDate(p.createdAt)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminChrome>
  );
}

function Banner({ msg }: { msg: string }) {
  return <div className="rounded border border-[#d9b8b8] bg-[#f7eaea] px-4 py-3 text-sm text-[#5C1F1F]">{msg}</div>;
}
