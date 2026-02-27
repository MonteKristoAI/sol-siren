import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Handle hash scrolling after navigation to home
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-16 py-4 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Link to="/">
        <img
          src={logo}
          alt="Sol Siren Vintage"
          className="h-14 md:h-16 ml-2 md:ml-6 select-none"
          draggable={false}
        />
      </Link>

      <div className="flex items-center gap-8 md:gap-12">
        {[
          { label: "Shop", to: "/shop" },
          { label: "About", to: "/#about" },
          { label: "Contact", to: "/#contact" },
        ].map((item) => {
          const linkClass = "relative font-body text-xs tracking-ultra-wide uppercase text-foreground/80 hover:text-foreground transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:bottom-[-2px] after:left-0 after:bg-foreground after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left";

          if (item.to.startsWith("/#")) {
            const sectionId = item.to.slice(2);
            const handleClick = (e: React.MouseEvent) => {
              if (isHome) {
                e.preventDefault();
                document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
              }
            };
            return (
              <Link key={item.label} to={item.to.startsWith("/#") ? `/${item.to.slice(1)}` : item.to} onClick={handleClick} className={linkClass}>
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
