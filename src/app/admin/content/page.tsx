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

export default function ContentPage() {
  return (
    <AdminChrome title="Content / Pages">
      <p className="mb-4 max-w-2xl text-sm text-[#5a5246]">
        Your site pages. Open any to review it live. Copy and layout changes are handled by MonteKristo,
        so if you want wording updated, note it and send it over and we will push it.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PAGES.map((p) => (
          <a key={p.label} href={p.url} target="_blank" rel="noreferrer"
             className="flex items-center justify-between rounded-lg border border-[#E4DAC9] bg-white p-4 transition-shadow hover:shadow-sm">
            <span className="font-medium">{p.label}</span>
            <ExternalLink size={14} className="text-[#b6a890]" />
          </a>
        ))}
      </div>
    </AdminChrome>
  );
}
