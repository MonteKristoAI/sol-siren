import { getAllProducts, toUIProduct } from "@/lib/shopify";
import { archiveProducts } from "@/lib/archive-products";
import JewelryClient from "./JewelryClient";

export const revalidate = 60;

export default async function Page() {
  const live = (await getAllProducts()).map(toUIProduct);
  const products = [...live, ...archiveProducts];
  return <JewelryClient products={products} />;
}
