import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useCart, useWishlist } from "@/lib/store";
import { formatINR, type Product } from "@/lib/products";
import { toast } from "sonner";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const wished = useWishlist((s) => s.has(product.slug));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      className="group"
    >
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative overflow-hidden rounded-md bg-secondary aspect-[4/5]">
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(product.slug);
              toast(wished ? "Removed from wishlist" : "Added to wishlist");
            }}
            aria-label="Wishlist"
            className="absolute top-3 right-3 size-9 grid place-items-center rounded-full bg-background/90 backdrop-blur hover:scale-110 transition"
          >
            <Heart className={`size-4 ${wished ? "fill-accent text-accent" : ""}`} />
          </button>
          {product.mrp && (
            <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-foreground text-background px-2 py-1 rounded-sm">
              Save {Math.round((1 - product.price / product.mrp) * 100)}%
            </span>
          )}
          <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                add(product);
                toast.success(`${product.name} added to cart`);
              }}
              className="w-full bg-foreground text-background py-2.5 text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground transition"
            >
              <ShoppingBag className="size-3.5" /> Quick Add
            </button>
          </div>
        </div>
        <div className="pt-4 space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Star className="size-3 fill-accent text-accent" />
            <span>{product.rating}</span>
            <span>·</span>
            <span>{product.reviews} reviews</span>
          </div>
          <h3 className="font-display text-lg leading-tight text-foreground">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="text-foreground font-medium">{formatINR(product.price)}</span>
            {product.mrp && (
              <span className="text-xs line-through text-muted-foreground">{formatINR(product.mrp)}</span>
            )}
          </div>
          <div className="flex gap-1 pt-1">
            {product.colors.map((c) => (
              <span key={c} className="size-3 rounded-full ring-1 ring-border" style={{ background: c }} />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
