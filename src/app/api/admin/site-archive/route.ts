import { archiveProducts } from "@/lib/archive-products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Legacy sold pieces that live on the site's /archive but are NOT Shopify
// products (hardcoded in src/data/products.ts). Read-only here.
export async function GET() {
  const items = archiveProducts.map((p) => ({
    id: p.id,
    title: p.name,
    handle: p.slug,
    productType: p.category,
    price: p.price,
    featuredImage: p.image,
  }));
  return Response.json({ items });
}
