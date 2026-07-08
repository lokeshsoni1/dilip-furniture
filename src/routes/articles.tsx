import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Articles & Editorial — Dilip Furniture" },
      { name: "description", content: "Explore stories on heirloom design philosophy, luxury styling guides, and master-craftsmanship at Dilip Furniture." },
    ],
  }),
  component: ArticlesPage,
});

const articles = [
  {
    title: "The Art of Heirloom Joinery: Wood That Lasts Lifetimes",
    category: "Master Craftsmanship",
    date: "July 2026",
    excerpt: "At the heart of Dilip Furniture is an uncompromising dedication to solid wood, hand-cut joinery, and patience. Read how we design furniture to outlast generations.",
    image: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504423/Dining_room_with_wood_theme_202607081523_dcjga6.jpg",
    readTime: "6 min read",
  },
  {
    title: "Curating a Modern Minimalist Living Room with Quiet Luxury",
    category: "Luxury Styling Guide",
    date: "June 2026",
    excerpt: "A curated space is not about what is missing, but what remains. Discover the styling principles that balance high-end comfort with architectural presence.",
    image: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504423/Luxury_living_room_interior_warm__202607081522_mah2su.jpg",
    readTime: "4 min read",
  },
  {
    title: "A Quiet Master Bedroom Suite: An Ode to Restful Nights",
    category: "Design Philosophy",
    date: "May 2026",
    excerpt: "Designing your bedroom requires looking beyond basic function. We explore how textures, soft lighting, and solid walnut frames establish true restfulness.",
    image: "https://res.cloudinary.com/dbpdexty8/image/upload/v1783504425/Master_suite_lounge_with_chairs_202607081522_myy2a5.jpg",
    readTime: "5 min read",
  },
];

function ArticlesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
      <div className="max-w-2xl mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Editorial</p>
        <h1 className="font-display text-5xl md:text-6xl">Atelier Journal</h1>
        <p className="mt-6 text-muted-foreground">Stories on heritage design, premium styling rules, and master-craftsmanship.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {articles.map((article, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group flex flex-col h-full bg-secondary/20 rounded-lg overflow-hidden border border-border/30 hover:border-border transition-all duration-350"
          >
            <div className="aspect-[16/10] overflow-hidden bg-secondary relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transform transition duration-700 group-hover:scale-103"
                loading="lazy"
              />
              <span className="absolute top-4 left-4 bg-background/95 backdrop-blur-[2px] text-foreground text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm font-medium border border-border/20">
                {article.category}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3 font-medium">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="font-display text-2xl group-hover:text-accent transition duration-300 mb-3 leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>
              <button className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-foreground group-hover:text-accent transition-colors duration-200 mt-auto">
                Read Article <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
