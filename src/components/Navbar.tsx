import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { useCart } from "@/contexts/CartContext";

const shopCategories = [
  { label: "All Products", to: "/shop" },
  { label: "Women", to: "/shop?category=women" },
  { label: "Men", to: "/shop?category=men" },
  { label: "Outerwear", to: "/shop?category=outerwear" },
  { label: "Accessories", to: "/shop?category=accessories" },
];

const Navbar = () => {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (isHome && location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isHome, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = "relative font-body text-xs tracking-ultra-wide uppercase text-foreground/80 hover:text-foreground transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-[-2px] after:left-0 after:bg-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left";

  return (
    <nav
      className={`fixed top-[28px] left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-16 py-4 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Link to="/" onClick={(e) => { if (isHome) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } }}>
        <img
          src={logo}
          alt="Sol Siren Vintage"
          className="h-14 md:h-16 ml-2 md:ml-6 select-none"
          draggable={false}
        />
      </Link>

      <div className="flex items-center gap-8 md:gap-12">
        {/* Home */}
        <Link
          to="/"
          onClick={(e) => { if (isHome) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } }}
          className={linkClass}
        >
          Home
        </Link>

        {/* Shop with dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setShopOpen(true)}
          onMouseLeave={() => setShopOpen(false)}
        >
          <Link
            to="/shop"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={linkClass}
          >
            Shop
          </Link>
          <AnimatePresence>
            {shopOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
              >
                <div className="bg-background border border-border shadow-sm min-w-[180px] py-2">
                  {shopCategories.map((cat) => (
                    <Link
                      key={cat.to}
                      to={cat.to}
                      onClick={() => {
                        setShopOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="block px-5 py-2.5 font-body text-[11px] tracking-wide uppercase text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* About, Blog & Contact */}
        {[
          { label: "About", to: "/#about" },
          { label: "Blog", to: "/blog" },
          { label: "Contact", to: "/#contact" },
        ].map((item) => {
          if (item.to.startsWith("/#")) {
            const sectionId = item.to.slice(2);
            const handleClick = (e: React.MouseEvent) => {
              if (isHome) {
                e.preventDefault();
                document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
              }
            };
            return (
              <Link key={item.label} to={`/${item.to.slice(1)}`} onClick={handleClick} className={linkClass}>
                {item.label}
              </Link>
            );
          }
          return (
            <Link key={item.label} to={item.to} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={linkClass}>
              {item.label}
            </Link>
          );
        })}

        <button
          onClick={openCart}
          className="relative text-foreground/80 hover:text-foreground transition-colors duration-300"
        >
          <ShoppingBag size={18} />
          {count > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center bg-foreground text-primary-foreground font-body text-[9px] font-medium rounded-full"
            >
              {count}
            </motion.span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
