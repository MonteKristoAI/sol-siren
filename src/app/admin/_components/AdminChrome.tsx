"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Truck,
  Archive,
  Tag,
  Inbox,
  FolderOpen,
  Gift,
  FileText,
  ScrollText,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

type NavItem = { href: string; label: string; icon: any; group: string };

const NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, group: "" },

  { href: "/admin/inventory", label: "Inventory", icon: Package, group: "Catalog" },
  { href: "/admin/add-piece", label: "Add Piece", icon: PlusCircle, group: "Catalog" },
  { href: "/admin/archive", label: "Archive", icon: Archive, group: "Catalog" },
  { href: "/admin/collections", label: "Collections", icon: FolderOpen, group: "Catalog" },

  { href: "/admin/orders", label: "Orders", icon: ShoppingBag, group: "Orders" },
  { href: "/admin/fulfillment", label: "Fulfillment", icon: Truck, group: "Orders" },
  { href: "/admin/labels", label: "History Cards", icon: Tag, group: "Orders" },

  { href: "/admin/inbox", label: "Inbox", icon: Inbox, group: "Customers" },

  { href: "/admin/gift-cards", label: "Gift Cards", icon: Gift, group: "Store" },
  { href: "/admin/content", label: "Content / Pages", icon: FileText, group: "Store" },
  { href: "/admin/policies", label: "FAQ / Policies", icon: ScrollText, group: "Store" },
  { href: "/admin/settings", label: "Settings", icon: Settings, group: "Store" },
];

export default function AdminChrome({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  let lastGroup = "";

  return (
    <div className="min-h-screen bg-[#FAF7F1] text-[#1A1A1A]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 transform flex-col overflow-y-auto border-r border-[#E4DAC9] bg-[#1A1A1A] text-[#F5EFE6] transition-transform md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 flex-shrink-0 items-center justify-between px-5">
          <span className="text-lg font-semibold tracking-fashion">SOL SIREN</span>
          <button className="md:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 px-3 pb-4">
          {NAV.map((item) => {
            const { href, label, icon: Icon, group } = item;
            const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            const showGroup = !!group && group !== lastGroup;
            lastGroup = group;
            return (
              <div key={href}>
                {showGroup && (
                  <div className="mb-1 mt-4 px-3 text-[10px] uppercase tracking-widest text-[#7d7058]">
                    {group}
                  </div>
                )}
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors ${
                    active ? "bg-[#5C1F1F] text-[#F5EFE6]" : "text-[#C9BBA6] hover:bg-white/5 hover:text-[#F5EFE6]"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              </div>
            );
          })}
          <button
            onClick={logout}
            className="mt-4 flex items-center gap-3 rounded px-3 py-2 text-sm text-[#C9BBA6] hover:bg-white/5 hover:text-[#F5EFE6]"
          >
            <LogOut size={16} /> Sign out
          </button>
        </nav>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setOpen(false)} />}

      <div className="md:pl-60">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#E4DAC9] bg-[#FAF7F1]/95 px-5 backdrop-blur">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
            <h1 className="text-xl font-semibold tracking-wide text-[#1A1A1A]">{title}</h1>
          </div>
          <div>{action}</div>
        </header>
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
}
