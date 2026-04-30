import { redirect } from "next/navigation";

// Demo /checkout page deprecated — checkout now redirects directly to
// Shopify-hosted checkout from the cart drawer (CartDrawer.tsx).
// Anyone landing here gets sent back to /shop.
export default function CheckoutPage() {
  redirect("/shop");
}
