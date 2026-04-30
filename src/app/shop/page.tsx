import { Suspense } from "react";
import { getAllProducts, toUIProduct } from "@/lib/shopify";
import ShopClient from "./ShopClient";

export const revalidate = 60;

export default async function Page() {
  const products = (await getAllProducts()).map(toUIProduct);
  return (
    <Suspense>
      <ShopClient products={products} />
    </Suspense>
  );
}
