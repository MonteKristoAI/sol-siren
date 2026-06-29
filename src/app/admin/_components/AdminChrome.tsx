"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  MessagesSquare,
  Bot,
  Tag,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inventory", label: "Inventory", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/chats", label: "Concierge Chats", icon: MessagesSquare },
  { href: "/admin/concierge", label: "Bot Knowledge", icon: Bot },
  { href: "/admin/labels", label: "History Cards", icon: Tag },
  { href: "/admin/blog", label: "Blog", icon: FileText },
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

  return (
    <div className="min-h-screen bg-[#FAF7F1] text-[#1A1A1A] font-body">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 transform border-r border-[#E4DAC9] bg-[#1A1A1A] text-[#F5EFE6] transition-transform md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <span className="font-display text-lg tracking-fashion">SOL SIREN</span>
          <button className="md:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="mt-2 flex flex-col gap-1 px-3">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors ${
                  active ? "bg-[#5C1F1F] text-[#F5EFE6]" : "text-[#C9BBA6] hover:bg-white/5 hover:text-[#F5EFE6]"
                }`}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={logout}
          className="absolute bottom-5 left-3 right-3 flex items-center gap-3 rounded px-3 py-2 text-sm text-[#C9BBA6] hover:bg-white/5 hover:text-[#F5EFE6]"
        >
          <LogOut size={17} /> Sign out
        </button>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="md:pl-60">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#E4DAC9] bg-[#FAF7F1]/95 px-5 backdrop-blur">
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </button>
            <h1 className="font-display text-xl tracking-wide text-[#1A1A1A]">{title}</h1>
          </div>
          <div>{action}</div>
        </header>
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
}
