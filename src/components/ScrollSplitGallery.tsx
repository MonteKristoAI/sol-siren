import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const IMAGE_1 =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1400&h=900&q=80&auto=format&fit=crop&crop=faces";
const IMAGE_2 =
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1400&h=900&q=80&auto=format&fit=crop&crop=center";
const IMAGE_3 =
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&h=900&q=80&auto=format&fit=crop&crop=center";

const ScrollSplitGallery = () => {
  const isMobile = useIsMobile();
  if (isMobile) return <MobileGallery />;
  return <DesktopGallery />;
};

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const FULL_DIST = 1500;

const DesktopGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scene 1 (0.00–0.33): Image 1 splits up/down, Image 2 revealed underneath
  const s1Top = useTransform(scrollYProgress, [0.07, 0.33], [0, -FULL_DIST], { ease: easeInOutCubic });
  const s1Bot = useTransform(scrollYProgress, [0.07, 0.33], [0, FULL_DIST], { ease: easeInOutCubic });
  // Hide Image 1 halves once Scene 1 ends
  const s1Opacity = useTransform(scrollYProgress, [0.33, 0.335], [1, 0]);

  // Scene 2 (0.33–0.66): Image 2 splits L/R, Image 3 revealed underneath
  const s2Left = useTransform(scrollYProgress, [0.40, 0.66], [0, -FULL_DIST], { ease: easeInOutCubic });
  const s2Right = useTransform(scrollYProgress, [0.40, 0.66], [0, FULL_DIST], { ease: easeInOutCubic });
  // Image 2 halves appear at scene 2 start (Image 2 was full-screen, now becomes split halves)
  // and disappear after scene 2 ends
  const s2HalvesOpacity = useTransform(scrollYProgress, [0.33, 0.335, 0.66, 0.665], [0, 1, 1, 0]);

  // Scene 3 (0.66–1.0): Image 3 parallax
  const img3Scale = useTransform(scrollYProgress, [0.66, 1], [1.04, 1]);
  const img3Y = useTransform(scrollYProgress, [0.66, 1], [20, 0]);

  const labelOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[600vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* z-10: Image 3 – always mounted, always visible as deepest layer */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{ scale: img3Scale, y: img3Y }}
        >
          <img src={IMAGE_3} alt="Gallery image 3" className="h-full w-full object-cover" loading="lazy" />
          <Overlay />
        </motion.div>

        {/* z-20: Image 2 – always mounted full-screen from the start.
            Revealed as Image 1 splits. Hidden once Scene 2 split begins
            (replaced by split halves). */}
        <motion.div
          className="absolute inset-0 z-20"
          style={{ opacity: useTransform(scrollYProgress, [0.395, 0.4], [1, 0]) }}
        >
          <img src={IMAGE_2} alt="Gallery image 2" className="h-full w-full object-cover" loading="lazy" />
          <Overlay />
        </motion.div>

        {/* z-[25]: Image 2 split halves – only during Scene 2 */}
        <motion.div
          className="absolute inset-0 z-[25]"
          style={{ x: s2Left, opacity: s2HalvesOpacity, clipPath: "inset(0 50% 0 0)" }}
        >
          <img src={IMAGE_2} alt="Gallery image 2 – left" className="h-full w-full object-cover" loading="lazy" />
          <Overlay />
        </motion.div>
        <motion.div
          className="absolute inset-0 z-[25]"
          style={{ x: s2Right, opacity: s2HalvesOpacity, clipPath: "inset(0 0 0 50%)" }}
        >
          <img src={IMAGE_2} alt="Gallery image 2 – right" className="h-full w-full object-cover" loading="lazy" />
          <Overlay />
        </motion.div>

        {/* z-30: Image 1 split halves – top layer during Scene 1 */}
        <motion.div
          className="absolute inset-0 z-30"
          style={{ y: s1Top, opacity: s1Opacity, clipPath: "inset(0 0 50% 0)" }}
        >
          <img src={IMAGE_1} alt="Gallery image 1 – top" className="h-full w-full object-cover" loading="lazy" />
          <Overlay />
        </motion.div>
        <motion.div
          className="absolute inset-0 z-30"
          style={{ y: s1Bot, opacity: s1Opacity, clipPath: "inset(50% 0 0 0)" }}
        >
          <img src={IMAGE_1} alt="Gallery image 1 – bottom" className="h-full w-full object-cover" loading="lazy" />
          <Overlay />
        </motion.div>

        {/* Vignette – pointer-events-none so it doesn't block visuals */}
        <div className="pointer-events-none absolute inset-0 z-40 shadow-[inset_0_0_120px_40px_rgba(0,0,0,0.35)]" />

        <motion.p
          style={{ opacity: labelOpacity }}
          className="absolute bottom-10 left-1/2 z-50 -translate-x-1/2 font-body text-[10px] tracking-ultra-wide uppercase text-white/60 select-none"
        >
          Scroll to explore
        </motion.p>
      </div>
    </section>
  );
};

const MobileGallery = () => (
  <section className="flex flex-col">
    {[IMAGE_1, IMAGE_2, IMAGE_3].map((src, i) => (
      <div key={i} className="relative h-screen w-full snap-start">
        <img src={src} alt={`Gallery image ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
        <Overlay />
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_20px_rgba(0,0,0,0.3)]" />
      </div>
    ))}
  </section>
);

const Overlay = () => <div className="absolute inset-0 bg-black/20" />;

export default ScrollSplitGallery;
