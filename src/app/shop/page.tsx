import { Suspense } from "react";
import { getAllProducts, toUIProduct } from "@/lib/shopify";
import { archiveProducts } from "@/lib/archive-products";
import ShopClient from "./ShopClient";

export const revalidate = 60;

export default async function Page() {
  const live = (await getAllProducts()).map(toUIProduct);
  const products = [...live, ...archiveProducts];
  return (
    <Suspense>
      <ShopClient products={products} />
    </Suspense>
  );
}
