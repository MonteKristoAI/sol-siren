import Hero from "@/components/Hero";
import FeaturedShop from "@/components/FeaturedShop";
import ShopByCategory from "@/components/ShopByCategory";
import AboutSection from "@/components/AboutSection";
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
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
