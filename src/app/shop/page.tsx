import { getAllProducts, toUIProduct } from "@/lib/shopify";
import { archiveProducts } from "@/lib/archive-products";
import ShopClient from "./ShopClient";

export const revalidate = 60;

export default async function Page({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  let live = [] as ReturnType<typeof toUIProduct>[];
  try {
    live = (await getAllProducts()).map(toUIProduct);
  } catch {
    // If Shopify is briefly unreachable, still render the archive grid
    // rather than failing the whole route (and looking "parked" to crawlers).
    live = [];
  }
  const products = [...live, ...archiveProducts];
  return <ShopClient products={products} initialCategory={searchParams.category || "all"} />;
}
