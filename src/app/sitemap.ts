import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/shopify";
import { archiveProducts } from "@/lib/archive-products";
import { blogPosts } from "@/data/blog";

const BASE = "https://www.solsirenvintage.com";

// Refresh the sitemap hourly so newly listed Shopify pieces show up for crawlers.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/jewelry`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/archive`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/gift-cards`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/shipping-returns`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const blog: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  let liveProducts: MetadataRoute.Sitemap = [];
  try {
    const live = await getAllProducts();
    liveProducts = live.map((p) => ({
      url: `${BASE}/product/${p.handle}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    liveProducts = [];
  }

  const archived: MetadataRoute.Sitemap = archiveProducts.map((p) => ({
    url: `${BASE}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.3,
  }));

  return [...staticRoutes, ...blog, ...liveProducts, ...archived];
}
