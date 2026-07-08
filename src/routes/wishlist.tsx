import { createFileRoute, Link } from "@tanstack/react-router";
import { useWishlist } from "@/lib/store";
import { useProductsStore } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Dilip Furniture" },
      { name: "description", content: "Pieces you've saved for later." },
      { property: "og:title", content: "Wishlist" },
      { property: "og:description", content: "Pieces you've saved." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const slugs = useWishlist((s) => s.slugs);
  const products = useProductsStore((state) => state.products);
  const items = products.filter((p) => slugs.includes(p.slug));

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">Saved</p>
      <h1 className="font-display text-5xl">Your Wishlist</h1>
      {items.length === 0 ? (
        <div className="text-center py-32">
          <p className="font-display text-2xl">Your wishlist is empty</p>
          <p className="text-muted-foreground mt-2 mb-8">Save pieces you love for later.</p>
          <Link to="/sofas" className="inline-block bg-foreground text-background px-8 py-3 text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition">Browse Collections</Link>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
          {items.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
