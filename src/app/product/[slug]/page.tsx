import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductByHandle, toUIProduct } from "@/lib/shopify";
import ProductDetailClient from "./ProductDetailClient";
import Footer from "@/components/Footer";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductByHandle(params.slug);
  if (!product) {
    return { title: "Product Not Found | Sol Siren" };
  }
  return {
    title: `${product.title} | Sol Siren`,
    description: product.description?.slice(0, 160) || `Discover the vintage ${product.title} at Sol Siren.`,
    openGraph: {
      images: product.featuredImage ? [product.featuredImage.url] : [],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const shopifyProduct = await getProductByHandle(params.slug);
  if (!shopifyProduct) {
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
  return <ProductDetailClient product={toUIProduct(shopifyProduct)} />;
}
