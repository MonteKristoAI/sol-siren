import { Metadata } from "next";
import Link from "next/link";
import { getProductByHandle, toUIProduct } from "@/lib/shopify";
import { findArchiveByHandle } from "@/lib/archive-products";
import ProductDetailClient from "./ProductDetailClient";
import Footer from "@/components/Footer";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductByHandle(params.slug);
  if (product) {
    return {
      title: `${product.title} | Sol Siren`,
      description: product.description?.slice(0, 160) || `Discover the vintage ${product.title} at Sol Siren.`,
      openGraph: {
        images: product.featuredImage ? [product.featuredImage.url] : [],
      },
    };
  }
  const archived = findArchiveByHandle(params.slug);
  if (archived) {
    return {
      title: `${archived.name} | Sol Siren (Sold)`,
      description: archived.description?.slice(0, 160) || `${archived.name} — previously sold at Sol Siren.`,
      openGraph: { images: archived.image ? [archived.image] : [] },
    };
  }
  return { title: "Product Not Found | Sol Siren" };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const live = await getProductByHandle(params.slug);
  if (live) {
    return <ProductDetailClient product={toUIProduct(live)} />;
  }

  const archived = findArchiveByHandle(params.slug);
  if (archived) {
    return <ProductDetailClient product={archived} />;
  }

  return (
    <>
      <main className="bg-background pt-28 min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="font-display text-3xl text-foreground">Product not found.</h1>
        <Link href="/shop" className="mt-6 font-body text-sm text-muted-foreground underline">
          Back to Shop
        </Link>
      </main>
      <Footer />
    </>
  );
}
