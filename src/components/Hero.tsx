import { Link } from "react-router-dom";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1800&q=80&auto=format&fit=crop";

const Hero = () => {
  return (
    <section className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden">
      <img
        src={HERO_IMAGE}
        alt="New collection lifestyle"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-foreground/30" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <p className="font-body text-[10px] md:text-xs tracking-ultra-wide uppercase text-white/80 mb-4">
          Spring / Summer 2026
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-white">
          New Collection
        </h1>
        <p className="mt-4 font-body text-sm md:text-base text-white/80 max-w-md">
          Effortless elegance for the modern wardrobe.
        </p>
        <Link
          to="/shop"
          className="mt-10 inline-block border border-white bg-white/10 backdrop-blur-sm text-white px-10 py-3 font-body text-[10px] tracking-ultra-wide uppercase hover:bg-white hover:text-foreground transition-colors duration-300"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
