import { getAllProducts, toUIProduct } from "@/lib/shopify";
import JewelryClient from "./JewelryClient";

export const revalidate = 60;

export default async function Page() {
  const products = (await getAllProducts()).map(toUIProduct);
  return <JewelryClient products={products} />;
}
