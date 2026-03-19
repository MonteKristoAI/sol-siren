import type { Product } from "@/contexts/CartContext";

export type ProductCategory = "fur" | "leather" | "penny-lane-afghan" | "overcoat" | "apres-ski";

export interface ProductWithSlug extends Product {
  slug: string;
  description: string;
  images: string[];
  sizes: string[];
  category: ProductCategory;
}

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const products: ProductWithSlug[] = [];

export default products;
