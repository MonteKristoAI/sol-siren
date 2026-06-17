"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { createCart } from "@/lib/shopify";
import { event, gidToId } from "@/lib/metaPixel";

const CartDrawer = () => {
  const { items, count, subtotal, isOpen, closeCart, removeItem } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const router = useRouter();

  const handleCheckout = async () => {
    if (items.length === 0 || checkoutLoading) return;
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      // Meta Pixel: InitiateCheckout — the last step we control before the
      // hand-off to Shopify-hosted checkout (Purchase fires on Shopify's side).
      event("InitiateCheckout", {
        content_ids: items.map((i) => gidToId(i.id)),
        content_type: "product",
        num_items: count,
        value: subtotal,
        currency: "USD",
        contents: items.map((i) => ({ id: gidToId(i.id), quantity: i.qty, item_price: i.price })),
      });
      // The cart item id IS the Shopify variant ID (set when added)
      const lines = items.map((item) => ({
        merchandiseId: item.id,
        quantity: item.qty,
      }));
      const cart = await createCart(lines);
      // Give the InitiateCheckout pixel beacon a tick to flush before the hard
      // cross-domain redirect to Shopify-hosted checkout cancels any in-flight request.
      await new Promise((r) => setTimeout(r, 300));
      window.location.href = cart.checkoutUrl;
    } catch (e) {
      console.error("Checkout error:", e);
      setCheckoutError(e instanceof Error ? e.message : "Could not start checkout");
      setCheckoutLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-foreground/30 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 right-0 bottom-0 z-[95] w-full max-w-md bg-background border-l border-border flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="font-display text-xl font-light text-foreground">
                Cart{count > 0 && <span className="ml-2 font-body text-xs text-muted-foreground">({count})</span>}
              </h2>
              <button onClick={closeCart} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {items.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag size={32} className="text-muted-foreground/40" />
                  <p className="font-body text-sm text-muted-foreground">Your cart is empty.</p>
                </div>
              )}
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-24 object-cover border border-border flex-shrink-0" />
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="font-display text-base font-light text-foreground truncate">{item.name}</h4>
                      <p className="font-body text-xs text-muted-foreground">${item.price}.00</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-body text-[10px] tracking-wide uppercase text-muted-foreground">One of a kind</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto font-body text-[10px] tracking-wide uppercase text-muted-foreground hover:text-destructive transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs tracking-ultra-wide uppercase text-muted-foreground">Subtotal</span>
                  <span className="font-body text-base font-medium text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                {checkoutError && (
                  <p className="text-[11px] text-[#c0392b] font-body">{checkoutError}</p>
                )}
                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full bg-foreground text-primary-foreground py-3 font-body text-[10px] tracking-ultra-wide uppercase hover:bg-foreground/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {checkoutLoading ? (
                    <><Loader2 size={14} className="animate-spin" /> Loading checkout...</>
                  ) : (
                    "Checkout"
                  )}
                </button>
                <button
                  onClick={() => { closeCart(); router.push("/shop"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="w-full border border-border py-3 font-body text-[10px] tracking-ultra-wide uppercase text-foreground hover:bg-muted transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>

          {/* Demo checkout modal */}
          <AnimatePresence>
            {showCheckout && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4"
                onClick={() => setShowCheckout(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-background border border-border p-10 max-w-sm w-full text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ShoppingBag size={32} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-display text-xl text-foreground">Demo Checkout</h3>
                  <p className="mt-3 font-body text-sm text-muted-foreground leading-relaxed">
                    This is a demo store — no payment will be collected.
                  </p>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="mt-6 w-full border border-foreground bg-foreground text-primary-foreground py-3 font-body text-[10px] tracking-ultra-wide uppercase hover:bg-foreground/90 transition-colors"
                  >
                    Got it
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
