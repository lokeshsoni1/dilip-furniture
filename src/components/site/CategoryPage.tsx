import { motion } from "framer-motion";
import { ProductCard } from "@/components/site/ProductCard";
import { categoryMeta, useProductsStore } from "@/lib/products";

export function CategoryPage({ category }: { category: string }) {
  const meta = categoryMeta[category];
  const products = useProductsStore((state) => state.products);
  const items = products.filter((p) => p.category === category);

  return (
    <>
      <section className="relative h-[55vh] min-h-[380px] -mt-16 sm:-mt-20 overflow-hidden">
        <motion.img
          src={meta.image}
          alt={meta.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
        />
        <div className="absolute inset-0 bg-foreground/45" />
        <div className="relative h-full flex flex-col justify-end pb-16 px-6 lg:px-10 max-w-7xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xs uppercase tracking-[0.3em] text-background/80 mb-3">Collection</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="font-display text-5xl md:text-7xl text-background">{meta.title}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }} className="text-background/85 text-lg mt-4 max-w-xl">{meta.tagline}</motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-border">
          <p className="text-sm text-muted-foreground">{items.length} {items.length === 1 ? "piece" : "pieces"}</p>
          <div className="flex gap-2 text-xs uppercase tracking-widest">
            {["All", "Bestseller", "New"].map((f) => (
              <button key={f} className="px-4 py-2 border border-border hover:border-foreground transition">{f}</button>
            ))}
          </div>
        </div>

        {items.length ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
            {items.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        ) : (
          <div className="text-center py-32">
            <p className="font-display text-2xl">New pieces arriving soon</p>
            <p className="text-muted-foreground mt-2">This collection is being curated.</p>
          </div>
        )}
      </div>
    </>
  );
}
