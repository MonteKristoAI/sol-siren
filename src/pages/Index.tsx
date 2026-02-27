import ScrollHero from "@/components/ScrollHero";
import ScrollSplitGallery from "@/components/ScrollSplitGallery";
import FeaturedShop from "@/components/FeaturedShop";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-background">
      <ScrollHero />
      <ScrollSplitGallery />
      <FeaturedShop />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
