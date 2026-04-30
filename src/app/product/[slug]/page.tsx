import { Metadata } from 'next';
import products from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = products.find((p) => p.slug === params.slug || p.id === params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found | Sol Siren',
    };
  }

  return {
    title: `${product.name} | Sol Siren`,
    description: product.description || `Discover the vintage ${product.name} at Sol Siren.`,
    openGraph: {
      images: [product.image],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductDetailClient />;
}
