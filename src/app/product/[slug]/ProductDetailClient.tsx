"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Truck, RotateCcw, ChevronDown, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { UIProduct } from "@/lib/shopify";
import { event, gidToId } from "@/lib/metaPixel";
import Footer from "@/components/Footer";

const ProductDetailClient = ({ product }: { product: UIProduct }) => {
  const router = useRouter();

  // Meta Pixel: ViewContent when a product detail page is opened.
  useEffect(() => {
    event("ViewContent", {
      content_ids: [gidToId(product.variantId || product.id)],
      content_name: product.name,
      content_type: "product",
      value: product.price,
      currency: "USD",
    });
  }, [product.id, product.variantId, product.name, product.price]);

  return (
    <>
      <main className="bg-background pt-24 md:pt-28 pb-20">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-6 md:px-16 mb-8">
          <nav className="font-body text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-16 grid grid-cols-1 md:grid-cols-[60%_40%] gap-10 md:gap-16">
          <ImageGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>
      </main>
      <Footer />
    </>
  );
};

/* ================================================================== */
const ImageGallery = ({ images, name }: { images: string[]; name: string }) => {
  const [active, setActive] = useState(0);
  const hasMultiple = images.length > 1;

  const prevImage = () => setActive((prev) => (prev - 1 + images.length) % images.length);
  const nextImage = () => setActive((prev) => (prev + 1) % images.length);

  return (
    <div>
      {/* Main image */}
      <div className="group relative aspect-[4/5] max-h-[70vh] overflow-hidden border border-border bg-muted">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={active}
            src={images[active]}
            alt={`${name} – view ${active + 1}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {/* Navigation arrows */}
        {hasMultiple && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {hasMultiple && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-20 h-24 border overflow-hidden transition-all duration-200 ${
                active === i ? "border-foreground" : "border-border opacity-60 hover:opacity-100"
              }`}
            >
              <img src={src} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ================================================================== */
const ProductInfo = ({ product }: { product: UIProduct }) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const hasSizes = product.sizes && product.sizes.length > 0;

  const handleAdd = () => {
    if (hasSizes && !selectedSize) {
      setSizeError(true);
      return;
    }
    // One-of-a-kind: a single unit per piece, always.
    addItem({
      id: product.variantId || product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      variant: product.variant,
      selectedSize: selectedSize || undefined,
    });
    // Meta Pixel: AddToCart.
    const contentId = gidToId(product.variantId || product.id);
    event("AddToCart", {
      content_ids: [contentId],
      content_name: product.name,
      content_type: "product",
      value: product.price,
      currency: "USD",
      contents: [{ id: contentId, quantity: 1, item_price: product.price }],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleSizeSelect = (s: string) => {
    setSelectedSize(s);
    setSizeError(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col justify-start md:sticky md:top-28"
    >
      <h1 className="font-display text-3xl md:text-4xl font-light text-foreground">{product.name}</h1>
      <p className="mt-2 font-body text-xs tracking-wide text-muted-foreground">{product.variant}</p>
      <p className="mt-4 font-body text-xl font-medium text-foreground">${product.price}.00</p>

      {product.descriptionHtml ? (
        <div
          className="mt-6 font-body text-sm text-muted-foreground leading-relaxed max-w-md prose prose-sm prose-neutral [&_p]:mb-3 [&_strong]:text-foreground"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      ) : product.description ? (
        <p className="mt-6 font-body text-sm text-muted-foreground leading-relaxed max-w-md whitespace-pre-line">
          {product.description}
        </p>
      ) : null}

      <p className="mt-4 font-body text-[11px] italic text-muted-foreground/70 max-w-md">
        Vintage items may show minor wear consistent with age. Each piece is one-of-one and carries its own history.
      </p>

      <div className="w-full h-[1px] bg-border my-8" />

      {/* Size selector — only if sizes exist */}
      {hasSizes && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <p className="font-body text-[10px] tracking-ultra-wide uppercase text-muted-foreground">Size</p>
            {selectedSize && (
              <span className="flex items-center gap-1 font-body text-[10px] text-[#5a7d5a]">
                <Check size={12} /> Size selected
              </span>
            )}
          </div>
          <motion.div
            className="flex flex-wrap gap-2"
            animate={sizeError ? { x: [0, -6, 6, -4, 4, 0] } : {}}
            transition={{ duration: 0.15 }}
          >
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => handleSizeSelect(s)}
                className={`px-4 py-2 border font-body text-xs tracking-wide transition-all duration-200 ${
                  selectedSize === s
                    ? "border-foreground bg-foreground text-primary-foreground"
                    : "border-border text-foreground hover:border-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </motion.div>
          <div
            className="overflow-hidden transition-all duration-300"
            style={{ maxHeight: sizeError ? 24 : 0, opacity: sizeError ? 1 : 0 }}
          >
            <p className="mt-2 font-body text-[11px] text-[#c0392b]/80">Please select a size.</p>
          </div>
        </div>
      )}

      {/* One of a kind — no quantity choice, only one exists */}
      {!product.sold && (
        <p className="mt-6 font-body text-[10px] tracking-ultra-wide uppercase text-muted-foreground">
          One of a kind · only one available
        </p>
      )}

      {/* Add to Cart */}
      {product.sold ? (
        <div className="mt-8 space-y-2">
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 bg-muted text-muted-foreground py-4 font-body text-[10px] tracking-ultra-wide uppercase cursor-not-allowed border border-muted-foreground/30"
          >
            Sold Out
          </button>
          <p className="font-body text-[11px] text-muted-foreground/70 text-center italic">
            This piece has been sold and is no longer available.
          </p>
        </div>
      ) : (
        <button
          onClick={handleAdd}
          className={`mt-8 w-full flex items-center justify-center gap-2 bg-foreground text-primary-foreground py-4 font-body text-[10px] tracking-ultra-wide uppercase transition-all duration-300 ${
            !hasSizes || selectedSize ? "hover:bg-foreground/90" : "opacity-75 hover:opacity-85"
          }`}
        >
          <ShoppingBag size={14} />
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      )}

      {/* Shipping + sizing notes */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Truck size={14} className="flex-shrink-0" />
          <span className="font-body text-xs">Complimentary shipping on ALL orders.</span>
        </div>
        <div className="flex items-start gap-2 text-muted-foreground">
          <RotateCcw size={14} className="flex-shrink-0 mt-0.5" />
          <span className="font-body text-xs leading-relaxed">
            Not sure about sizing? Send us your bust, waist and shoulder measurements
            before ordering, and we'll tell you honestly if it's right for you. Please
            choose with intention. All sales are final, as each piece is one-of-one.
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailClient;
