import { Suspense } from "react";
import { getAllProducts, toUIProduct } from "@/lib/shopify";
import ArchiveClient from "./ArchiveClient";

export const revalidate = 60;

const ARCHIVE_TAGS = ["archive", "sold"];

export default async function Page() {
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
    <Suspense>
      <ArchiveClient shopifyArchived={shopifyArchived} />
    </Suspense>
  );
}
