import allLocalProducts from "@/data/products";
import type { UIProduct } from "@/lib/shopify";

// Sold/archived items — historical pieces no longer on Shopify
// (Shopify holds only active inventory). Returned in the same UIProduct
// shape as Shopify products so pages can merge the two sources.

function localToUIProduct(p: (typeof allLocalProducts)[number]): UIProduct {
  return {
    id: p.id,
    variantId: "", // not purchasable
    name: p.name,
    variant: p.variant,
    price: p.price,
    image: p.image,
    images: p.images || [p.image],
    slug: p.slug,
    category: p.category,
    sold: true,
    description: p.description || "",
    descriptionHtml: "",
    sizes: p.sizes || [],
  };
}

export const archiveProducts: UIProduct[] = allLocalProducts
  .filter((p) => p.sold)
  .map(localToUIProduct);

export function findArchiveByHandle(handle: string): UIProduct | null {
  return archiveProducts.find((p) => p.slug === handle || p.id === handle) || null;
}
