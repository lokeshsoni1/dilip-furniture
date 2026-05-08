import { Link, useLocation } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_ROUTES = new Set([
  "/", "/sofas", "/chairs", "/beds", "/dining-tables", "/coffee-tables",
  "/wardrobes", "/tv-units", "/study-tables", "/office-furniture", "/luxury-decor",
]);
import { useCart, useWishlist } from "@/lib/store";
import { Button } from "@/components/ui/button";

const categories = [
  { label: "Sofas", to: "/sofas" },
  { label: "Chairs", to: "/chairs" },
  { label: "Beds", to: "/beds" },
  { label: "Dining", to: "/dining-tables" },
  { label: "Coffee Tables", to: "/coffee-tables" },
  { label: "Wardrobes", to: "/wardrobes" },
  { label: "TV Units", to: "/tv-units" },
  { label: "Study", to: "/study-tables" },
  { label: "Office", to: "/office-furniture" },
  { label: "Decor", to: "/luxury-decor" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCart((s) => s.count());
  const setCartOpen = useCart((s) => s.setOpen);
  const wishCount = useWishlist((s) => s.slugs.length);
  const { pathname } = useLocation();
  const hasHero = HERO_ROUTES.has(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On hero pages: hide navbar at top, reveal on scroll. On other pages: always visible solid.
  const hidden = hasHero && !scrolled && !mobileOpen;
  const solid = scrolled || !hasHero;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? -96 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          solid ? "glass shadow-soft border-b border-border/50" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-4">
          <button
            aria-label="Menu"
            className="lg:hidden p-2 -ml-2 text-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </button>

          <Link to="/" className="font-display text-xl sm:text-2xl tracking-wide text-foreground">
            Dilip <span className="text-accent">Furniture</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {categories.slice(0, 6).map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="text-foreground/80 hover:text-foreground underline-gold py-1"
                activeProps={{ className: "text-foreground" }}
              >
                {c.label}
              </Link>
            ))}
            <Link to="/about" className="text-foreground/80 hover:text-foreground underline-gold py-1">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" aria-label="Search" className="hidden sm:inline-flex">
              <Search className="size-[18px]" />
            </Button>
            <Link to="/wishlist" aria-label="Wishlist" className="relative p-2 hover:text-accent transition">
              <Heart className="size-[18px]" />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] rounded-full size-4 grid place-items-center font-medium">
                  {wishCount}
                </span>
              )}
            </Link>
            <button
              aria-label="Cart"
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:text-accent transition"
            >
              <ShoppingBag className="size-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] rounded-full size-4 grid place-items-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>
            <Button variant="ghost" size="icon" aria-label="Account" className="hidden sm:inline-flex">
              <User className="size-[18px]" />
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-border">
              <span className="font-display text-xl">Dilip Furniture</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close">
                <X className="size-5" />
              </button>
            </div>
            <nav className="px-8 py-10 flex flex-col gap-5">
              {categories.map((c, i) => (
                <motion.div
                  key={c.to}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.05 * i } }}
                >
                  <Link
                    to={c.to}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-3xl text-foreground"
                  >
                    {c.label}
                  </Link>
                </motion.div>
              ))}
              <div className="border-t border-border my-6" />
              <Link to="/about" onClick={() => setMobileOpen(false)} className="text-lg">About</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="text-lg">Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
