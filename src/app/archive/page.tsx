import { getAllProducts, toUIProduct, normalizeCategory } from "@/lib/shopify";
import ArchiveClient from "./ArchiveClient";

export const revalidate = 60;

const ARCHIVE_TAGS = ["archive", "sold"];

export default async function Page({
  searchParams,
}: {
  searchParams: { category?: string | string[] };
}) {
  // Pieces archived in the admin (tagged) join the legacy static archive here,
  // so the brand archive stays complete and current.
  let shopifyArchived: ReturnType<typeof toUIProduct>[] = [];
  try {
    shopifyArchived = (await getAllProducts())
      .filter((p) => p.tags.some((t) => ARCHIVE_TAGS.includes(t.toLowerCase())))
      .map(toUIProduct)
      .map((u) => ({ ...u, sold: true }));
  } catch {
    shopifyArchived = [];
  }
  return (
    <ArchiveClient
      shopifyArchived={shopifyArchived}
      initialCategory={normalizeCategory(searchParams.category)}
    />
  );
}
