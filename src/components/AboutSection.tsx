import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1000&q=80&auto=format&fit=crop";

const AboutSection = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="about" className="bg-background py-24 md:py-32 px-6 md:px-16 overflow-hidden">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 md:gap-16 items-center">
        {/* Image */}
        <motion.div
          ref={imgRef}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative aspect-[3/4] overflow-hidden"
        >
          <motion.img
            src={ABOUT_IMAGE}
            alt="Editorial fashion lifestyle"
            className="h-full w-full object-cover"
            style={{ y: imgY }}
            loading="lazy"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex flex-col justify-center"
        >
          <p className="font-body text-[10px] tracking-ultra-wide uppercase text-muted-foreground mb-4">
            About
          </p>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-foreground">
            Timeless pieces.
            <br />
            Modern attitude.
          </h2>

          <div className="w-12 h-[1px] bg-border my-8" />

          <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
            Born from a love of vintage silhouettes and an eye for the
            contemporary, Sol Siren Vintage is a celebration of confidence,
            individuality, and the quiet power of dressing with intention. Every
            piece is curated to feel both familiar and entirely new.
          </p>

          <p className="mt-5 font-body text-sm text-muted-foreground leading-relaxed max-w-md">
            We believe in fewer, better things — garments that carry a story and
            grow more beautiful with time.
          </p>

          <Link
            to="/shop"
            className="mt-10 inline-flex items-center gap-2 font-body text-[10px] tracking-ultra-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-70 transition-opacity duration-300 self-start"
          >
            Explore the Collection →
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
