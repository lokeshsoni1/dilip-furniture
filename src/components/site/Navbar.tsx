import { Link, useLocation } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, Check } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, useWishlist, useUserStore } from "@/lib/store";
import { useProductsStore, Product } from "@/lib/products";
import { Button } from "@/components/ui/button";

const HERO_ROUTES = new Set([
  "/", "/sofas", "/chairs", "/beds", "/dining-tables", "/coffee-tables",
  "/wardrobes", "/tv-units", "/study-tables", "/office-furniture", "/luxury-decor",
]);

const collectionCategories = [
  { label: "Sofas", to: "/collections/sofas" },
  { label: "Beds", to: "/collections/beds" },
  { label: "Dining Tables", to: "/collections/dining-tables" },
  { label: "Chairs", to: "/collections/chairs" },
  { label: "Coffee Tables", to: "/collections/coffee-tables" },
  { label: "Wardrobes", to: "/collections/wardrobes" },
  { label: "TV Units", to: "/collections/tv-units" },
  { label: "Study Tables", to: "/collections/study-tables" },
  { label: "Luxury Decor", to: "/collections/luxury-decor" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  const cartCount = useCart((s) => s.count());
  const setCartOpen = useCart((s) => s.setOpen);
  const wishCount = useWishlist((s) => s.slugs.length);
  const role = useUserStore((s) => s.role);
  const setRole = useUserStore((s) => s.setRole);
  const products = useProductsStore((s) => s.products);
  const { pathname } = useLocation();
  const hasHero = HERO_ROUTES.has(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Real-time search indexer
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, products]);

  // Focus input when search bar opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  const hidden = hasHero && !scrolled && !mobileOpen;
  const solid = scrolled || !hasHero;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed z-50 transition-all duration-500 ${
          solid
            ? "top-4 left-4 right-4 mx-auto max-w-6xl glass shadow-luxury border border-border/40 rounded-2xl sm:rounded-full"
            : "top-0 left-0 right-0 bg-transparent"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4 transition-all duration-500 ${
            solid ? "h-14 sm:h-16" : "h-16 sm:h-20"
          }`}
        >
          <button
            aria-label="Menu"
            className="lg:hidden p-2 -ml-2 text-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </button>

          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display text-xl sm:text-2xl tracking-wide text-foreground"
          >
            Dilip <span className="text-accent">Furniture</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm relative">
            <Link to="/" className="text-foreground/80 hover:text-foreground underline-gold py-1">
              Home
            </Link>

            {/* Desktop collections mega dropdown */}
            <div
              className="relative group py-1"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <button className="text-foreground/80 hover:text-foreground flex items-center gap-1 cursor-pointer">
                Collections <ChevronDown className={`size-3 transition-transform duration-200 ${collectionsOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {collectionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50 w-[580px]"
                  >
                    <div className="bg-background/95 backdrop-blur-md border border-border p-6 rounded-lg shadow-luxury grid grid-cols-3 gap-4">
                      {collectionCategories.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="px-4 py-3 rounded-md bg-secondary/20 hover:bg-accent/10 hover:text-accent font-display text-base transition-all duration-200 text-foreground/90 border border-border/10"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/articles" className="text-foreground/80 hover:text-foreground underline-gold py-1">
              Articles
            </Link>
            <Link to="/faqs" className="text-foreground/80 hover:text-foreground underline-gold py-1">
              FAQs
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-foreground underline-gold py-1">
              About
            </Link>
            <Link to="/contact" className="text-foreground/80 hover:text-foreground underline-gold py-1">
              Contact
            </Link>
          </nav>

          {/* Action icons */}
          <div className="flex items-center gap-1 sm:gap-2 relative">
            
            {/* Search toggler / input */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden mr-2"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search furniture..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs bg-secondary/50 border border-border/80 rounded-full px-4 py-1.5 focus:border-accent outline-none text-foreground"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Search"
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  if (searchOpen) setSearchQuery("");
                }}
                className="hover:text-accent"
              >
                {searchOpen ? <X className="size-[18px]" /> : <Search className="size-[18px]" />}
              </Button>

              {/* Glassmorphism search dropdown */}
              <AnimatePresence>
                {searchOpen && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-3 w-[320px] max-h-[380px] overflow-y-auto bg-background/90 backdrop-blur-lg border border-border/80 rounded-lg shadow-luxury p-3 space-y-2 z-50"
                  >
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground px-2 pb-1.5 border-b border-border/30">
                      Search Results ({searchResults.length})
                    </p>
                    {searchResults.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/products/${item.slug}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="flex gap-3 p-2 hover:bg-secondary/40 rounded transition"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-10 object-cover rounded bg-secondary shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                          <p className="text-[10px] text-muted-foreground capitalize">{item.category.replace("-", " ")}</p>
                        </div>
                        <span className="text-xs font-semibold text-accent pr-1">
                          ₹{(item.price / 1000).toFixed(0)}k
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/wishlist" aria-label="Wishlist" className="relative p-2 hover:text-accent transition">
              <Heart className="size-[18px]" />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] rounded-full size-4 grid place-items-center font-medium animate-pulse">
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

            {/* Profile / Account state Modal trigger */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Account"
              onClick={() => setAuthModalOpen(true)}
              className={`hover:text-accent relative ${role === "admin" ? "text-accent border border-accent/20 rounded-full" : ""}`}
            >
              <User className="size-[18px]" />
              {role === "admin" && (
                <span className="absolute top-0 right-0 size-2 bg-accent rounded-full animate-ping" />
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Account Privilege Modal */}
      <AnimatePresence>
        {authModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-background border border-border p-6 rounded-lg shadow-luxury relative mx-4"
            >
              <button
                onClick={() => setAuthModalOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
              <h2 className="font-display text-2xl mb-2 text-foreground">Select Access Privilege</h2>
              <p className="text-xs text-muted-foreground mb-6">Choose your system mode. Admin unlocks AI designer panels.</p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setRole("customer");
                    setAuthModalOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-md border text-left transition ${
                    role === "customer"
                      ? "border-accent bg-accent/5 text-foreground"
                      : "border-border hover:bg-secondary/40 text-foreground/80"
                  }`}
                >
                  <div>
                    <p className="font-medium text-sm">Demo Customer Login</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Explore standard retail products & checkout flow.</p>
                  </div>
                  {role === "customer" && <Check className="size-4 text-accent" />}
                </button>

                <button
                  onClick={() => {
                    setRole("admin");
                    setAuthModalOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-md border text-left transition ${
                    role === "admin"
                      ? "border-accent bg-accent/5 text-foreground"
                      : "border-border hover:bg-secondary/40 text-foreground/80"
                  }`}
                >
                  <div>
                    <p className="font-medium text-sm">Admin Console Entrance</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Unlocks AI Image generation tools on product pages.</p>
                  </div>
                  {role === "admin" && <Check className="size-4 text-accent" />}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
            <nav className="px-8 py-10 flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-10rem)]">
              <Link to="/" onClick={() => setMobileOpen(false)} className="font-display text-3xl">Home</Link>
              
              <div className="border-t border-border my-2" />
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Collections</p>
              {collectionCategories.map((c) => (
                <Link
                  key={c.to}
                  to={c.to}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-2xl text-foreground/90 pl-3"
                >
                  {c.label}
                </Link>
              ))}
              
              <div className="border-t border-border my-2" />
              <Link to="/articles" onClick={() => setMobileOpen(false)} className="text-lg">Articles</Link>
              <Link to="/faqs" onClick={() => setMobileOpen(false)} className="text-lg">FAQs</Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="text-lg">Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
