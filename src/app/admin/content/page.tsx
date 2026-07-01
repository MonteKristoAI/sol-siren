"use client";

import { ExternalLink } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";

const PAGES = [
  { label: "Home", url: "https://www.solsirenvintage.com/" },
  { label: "Shop", url: "https://www.solsirenvintage.com/shop" },
  { label: "Jewelry", url: "https://www.solsirenvintage.com/jewelry" },
  { label: "Archive", url: "https://www.solsirenvintage.com/archive" },
  { label: "Blog", url: "https://www.solsirenvintage.com/blog" },
  { label: "Gift Cards", url: "https://www.solsirenvintage.com/gift-cards" },
];

const POLICIES = [
  { label: "FAQ", url: "https://www.solsirenvintage.com/faq" },
  { label: "Shipping & Returns", url: "https://www.solsirenvintage.com/shipping-returns" },
];

export default function SitePagesPage() {
  return (
    <AdminChrome title="Site Pages">
      <p className="mb-6 max-w-2xl text-sm text-[#5a5246]">
        Every page on your site, plus your policies. Open any to review it live. Copy and layout are handled
        by MonteKristo, so if you want wording changed, note it and send it over.
      </p>

      <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#8a7d68]">Pages</h2>
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PAGES.map((p) => (
          <a key={p.label} href={p.url} target="_blank" rel="noreferrer"
             className="flex items-center justify-between rounded-lg border border-[#E4DAC9] bg-white p-4 transition-shadow hover:shadow-sm">
            <span className="font-medium">{p.label}</span>
            <ExternalLink size={14} className="text-[#b6a890]" />
          </a>
        ))}
      </div>

      <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#8a7d68]">FAQ &amp; Policies</h2>
      <p className="mb-3 text-xs text-[#8a7d68]">These are what the site and the concierge quote to customers.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {POLICIES.map((d) => (
          <a key={d.label} href={d.url} target="_blank" rel="noreferrer"
             className="flex items-center justify-between rounded-lg border border-[#E4DAC9] bg-white p-4 transition-shadow hover:shadow-sm">
            <span className="font-medium">{d.label}</span>
            <ExternalLink size={14} className="text-[#b6a890]" />
          </a>
        ))}
      </div>
    </AdminChrome>
  );
}
