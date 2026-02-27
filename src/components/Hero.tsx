import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1800&q=80&auto=format&fit=crop";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen bg-foreground overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row items-center min-h-screen">
        {/* Text Block — Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 md:py-0 md:w-1/2"
        >
          <p className="font-body text-[10px] tracking-ultra-wide uppercase text-background/50 mb-6">
            New Collection
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wide text-background leading-[1.1]">
            Past Decades.<br />
            Present Energy.
          </h1>
          <p className="mt-5 font-body text-sm md:text-base text-background/60 max-w-md leading-relaxed">
            Vintage-inspired essentials crafted for confidence, movement, and individuality.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-block font-body text-[11px] tracking-ultra-wide uppercase text-background/80 hover:text-background border-b border-background/30 hover:border-background pb-1 transition-all duration-300 w-fit"
          >
            Explore the Collection →
          </Link>
        </motion.div>

        {/* Image — Right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="md:w-1/2 w-full h-[60vh] md:h-screen relative"
        >
          <img
            src={HERO_IMAGE}
            alt="Model wearing new collection"
            className="absolute inset-0 w-full h-full object-cover object-center shadow-[-30px_0_60px_-15px_rgba(0,0,0,0.5)]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
