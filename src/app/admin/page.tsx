"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";
import AdminChrome from "./_components/AdminChrome";
import { api, fmtDate, money } from "./_components/api";

type Sample = { title: string; handle: string };
type Stats = {
  pieces: { live: number; draft: number; archived: number; reserved: number; total: number };
  orders: { thisMonth: number; unfulfilled: number; revenueThisMonth: number };
  todo: {
    ordersToFulfill: number;
    missingMeasurements: { count: number; sample: Sample[] };
    missingCards: { count: number; sample: Sample[] };
    newInquiries: number | null;
    similarPieceRequests: number | null;
  };
  aging: { title: string; handle: string; createdAt: string }[];
  recentOrders: { name: string; customer: string; total: number; currency: string; createdAt: string; country: string | null }[];
};

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
        <div className="space-y-8">
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#8a7d68]">What needs you today</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Task n={s.todo.ordersToFulfill} label="orders to fulfill" href="/admin/fulfillment" tone={s.todo.ordersToFulfill ? "warn" : "calm"} />
              <Task n={s.todo.newInquiries} label="new contact requests" href="/admin/inbox" tone={s.todo.newInquiries ? "warn" : "calm"} soon={s.todo.newInquiries === null} />
              <Task n={s.todo.similarPieceRequests} label="similar-piece requests" href="/admin/inbox" tone={s.todo.similarPieceRequests ? "info" : "calm"} soon={s.todo.similarPieceRequests === null} />
              <Task n={s.todo.missingMeasurements.count} label="pieces missing measurements" href="/admin/inventory" sample={s.todo.missingMeasurements.sample} tone={s.todo.missingMeasurements.count ? "info" : "calm"} />
              <Task n={s.todo.missingCards.count} label="pieces missing a history card" href="/admin/labels" sample={s.todo.missingCards.sample} tone={s.todo.missingCards.count ? "info" : "calm"} />
              <Task n={s.aging.length} label="pieces live a long time" href="/admin/inventory" sample={s.aging} tone="info" />
            </div>
          </section>

          <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Stat label="Live pieces" value={s.pieces.live} sub={`${s.pieces.total} total`} href="/admin/inventory" />
            <Stat label="In archive" value={s.pieces.archived} sub="still shown on site" href="/admin/archive" />
            <Stat label="On hold" value={s.pieces.reserved} href="/admin/inventory?filter=reserved" />
            <Stat label="Revenue (month)" value={money(s.orders.revenueThisMonth)} sub={`${s.orders.thisMonth} orders`} />
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Recent orders">
              {s.recentOrders.length === 0 ? (
                <Empty>No orders yet.</Empty>
              ) : (
                <ul className="divide-y divide-[#F0E8D9]">
                  {s.recentOrders.map((o) => (
                    <li key={o.name} className="flex items-center justify-between py-2.5 text-sm">
                      <span>
                        <span className="font-medium">{o.name}</span> <span className="text-[#8a7d68]">· {o.customer}</span>
                        {o.country && <span className="text-[#8a7d68]"> · {o.country}</span>}
                      </span>
                      <span>{money(o.total, o.currency)} <span className="ml-2 text-[#8a7d68]">{fmtDate(o.createdAt)}</span></span>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
            <Panel title="Been live longest" subtitle="Candidates for fresh photos, a feature, or the archive.">
              {s.aging.length === 0 ? (
                <Empty>Nothing live yet.</Empty>
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
            </Panel>
          </div>
        </div>
      )}
    </AdminChrome>
  );
}

function Task({
  n, label, href, sample, tone, soon,
}: {
  n: number | null; label: string; href: string; sample?: Sample[]; tone: "warn" | "info" | "calm"; soon?: boolean;
}) {
  const ring = tone === "warn" ? "border-[#d9b8b8]" : "border-[#E4DAC9]";
  const numCls = tone === "warn" && n ? "text-[#5C1F1F]" : "text-[#1A1A1A]";
  return (
    <Link href={href} className={`block rounded-lg border ${ring} bg-white p-4 transition-shadow hover:shadow-sm`}>
      <div className="flex items-baseline justify-between">
        <span className={`text-3xl font-semibold ${numCls}`}>{soon ? "—" : n ?? 0}</span>
        <ArrowRight size={15} className="text-[#b6a890]" />
      </div>
      <div className="mt-1 text-sm text-[#5a5246]">
        {label}
        {soon && <span className="ml-1 text-xs text-[#b6a890]">(with Inbox)</span>}
      </div>
      {sample && sample.length > 0 && (
        <div className="mt-2 truncate text-xs text-[#8a7d68]">
          {sample.map((x) => x.title).slice(0, 3).join(", ")}{sample.length > 3 ? "…" : ""}
        </div>
      )}
    </Link>
  );
}

function Stat({ label, value, sub, href }: { label: string; value: React.ReactNode; sub?: string; href?: string }) {
  const inner = (
    <div className="rounded-lg border border-[#E4DAC9] bg-white p-5 transition-shadow hover:shadow-sm">
      <div className="text-xs uppercase tracking-widest text-[#8a7d68]">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-[#1A1A1A]">{value}</div>
      {sub && <div className="mt-1 text-sm text-[#8a7d68]">{sub}</div>}
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-[#E4DAC9] bg-white p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      {subtitle ? <p className="mb-3 mt-0.5 text-xs text-[#8a7d68]">{subtitle}</p> : <div className="mb-3" />}
      {children}
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-[#8a7d68]">{children}</p>;
}
function Banner({ msg }: { msg: string }) {
  return (
    <div className="flex items-center gap-2 rounded border border-[#d9b8b8] bg-[#f7eaea] px-4 py-3 text-sm text-[#5C1F1F]">
      <AlertCircle size={16} /> {msg}
    </div>
  );
}
