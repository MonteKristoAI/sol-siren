import Hero from "@/components/Hero";
import FeaturedShop from "@/components/FeaturedShop";
import ShopByCategory from "@/components/ShopByCategory";
import ReviewsSection from "@/components/ReviewsSection";
import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getAllProducts, toUIProduct } from "@/lib/shopify";

export const revalidate = 60;

export default async function Page() {
  const products = (await getAllProducts()).map(toUIProduct);
  return (
    <main className="bg-background">
      <Hero />
      <FeaturedShop products={products} />
      <ShopByCategory />
      <ReviewsSection />
      <AboutSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
