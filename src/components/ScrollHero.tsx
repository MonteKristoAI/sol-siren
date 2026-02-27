import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const ScrollHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Logo transforms
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.35]);
  const logoX = useTransform(scrollYProgress, [0, 0.5], ["0%", "-38%"]);
  const logoY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-90%"]);

  // Content
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.4, 0.65], [60, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {/* Center logo */}
        <motion.div
          style={{ scale: logoScale, x: logoX, y: logoY }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <img
            src={logo}
            alt="Sol Siren Vintage"
            className="w-[280px] md:w-[400px] lg:w-[480px] select-none"
            draggable={false}
          />
        </motion.div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-16"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-foreground">
            TIMELESS VINTAGE.
          </h1>
          <p className="mt-6 font-body text-sm md:text-base tracking-ultra-wide uppercase text-muted-foreground font-light">
            Refined pieces inspired by past decades.
          </p>
          <Button variant="editorial" size="lg" className="mt-12 px-12 py-6">
            Explore Collection →
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollHero;
