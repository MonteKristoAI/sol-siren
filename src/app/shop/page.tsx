import { getAllProducts, toUIProduct } from "@/lib/shopify";
import ShopClient from "./ShopClient";

export const revalidate = 60;

const ARCHIVE_TAGS = ["archive", "sold"];

export default async function Page({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  let live = [] as ReturnType<typeof toUIProduct>[];
  try {
    // The live shop shows active pieces only. Sold / archived pieces (tagged in
    // the admin) drop out of the shop and live in /archive instead.
    live = (await getAllProducts())
      .filter((p) => !p.tags.some((t) => ARCHIVE_TAGS.includes(t.toLowerCase())))
      .map(toUIProduct);
  } catch {
    live = [];
  }
  return <ShopClient products={live} initialCategory={searchParams.category || "all"} />;
}
