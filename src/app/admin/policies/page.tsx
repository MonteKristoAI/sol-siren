"use client";

import { ExternalLink } from "lucide-react";
import AdminChrome from "../_components/AdminChrome";

const DOCS = [
  { label: "FAQ", url: "https://www.solsirenvintage.com/faq" },
  { label: "Shipping & Returns", url: "https://www.solsirenvintage.com/shipping-returns" },
];

export default function PoliciesPage() {
  return (
    <AdminChrome title="FAQ / Policies">
      <p className="mb-4 max-w-2xl text-sm text-[#5a5246]">
        Your published policies and FAQ. These are what the site and the concierge bot quote to customers.
        To change the wording, update it here in note form and send to MonteKristo, or edit the concierge
        knowledge directly in <span className="font-medium">Bot Knowledge</span>.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {DOCS.map((d) => (
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
