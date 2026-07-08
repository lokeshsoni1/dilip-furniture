import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { categoryMeta } from "@/lib/products";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections Hub — Dilip Furniture" },
      { name: "description", content: "Browse our hand-finished furniture collections by category. Master-crafted sofas, beds, dining tables, and interior decor." },
    ],
  }),
  component: CollectionsHubPage,
});

function CollectionsHubPage() {
  const categories = Object.entries(categoryMeta);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
      <div className="max-w-2xl mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Portfolio</p>
        <h1 className="font-display text-5xl md:text-6xl">Our Collections</h1>
        <p className="mt-6 text-muted-foreground">Considered geometry and master craftsmanship across every home collection.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(([key, meta], i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <Link to={`/collections/${key}`} className="group block relative overflow-hidden rounded-lg aspect-[4/3] border border-border/30">
              <img
                src={meta.image}
                alt={meta.title}
                className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-103"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-x-6 bottom-6 text-background flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-widest text-accent font-medium mb-1.5">{meta.tagline}</span>
                <h3 className="font-display text-2xl md:text-3xl flex items-center gap-2 group-hover:text-accent transition duration-300">
                  {meta.title} <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
