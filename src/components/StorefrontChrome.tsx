"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import ChatWidget from "@/components/ChatWidget";
import MetaPixel from "@/components/MetaPixel";

// Renders the storefront chrome (nav, cart, concierge, pixel) on every public
// page, but stays out of the way on /admin so the portal has its own shell.
export default function StorefrontChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return <>{children}</>;
  return (
    <>
      <MetaPixel />
      <Navbar />
      <CartDrawer />
      <ChatWidget />
      {children}
    </>
  );
}
