import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Truck, Award, Hammer, Sparkles, Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import roomBedroom from "@/assets/room-bedroom.jpg";
import roomLiving from "@/assets/room-living.jpg";
import roomDining from "@/assets/room-dining.jpg";
import { ProductCard } from "@/components/site/ProductCard";
import { bestsellers, trending, categoryMeta, useProductsStore } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dilip Furniture — Timeless craftsmanship for modern living" },
      { name: "description", content: "Discover hand-finished luxury sofas, beds, dining tables and decor. Heirloom furniture delivered across India in 15–20 days." },
      { property: "og:title", content: "Dilip Furniture — Timeless Craftsmanship" },
      { property: "og:description", content: "Heirloom luxury furniture, hand-finished in India." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const categoryGrid = ["sofas", "beds", "dining-tables", "chairs", "coffee-tables", "wardrobes", "tv-units", "study-tables", "luxury-decor"] as const;

const testimonials = [
  { name: "Aanya Mehta", city: "Mumbai", text: "The Walnut Symphony Sofa transformed our living room. Craftsmanship beyond expectation." },
  { name: "Rohan Kapoor", city: "Bengaluru", text: "Five-star concierge experience. The bed feels like it belongs in a Milan showroom." },
  { name: "Ishita Verma", city: "Delhi", text: "Quiet luxury in every detail. Delivered on time and assembled flawlessly." },
];

function Home() {
  const [tIdx, setTIdx] = useState(0);
  const bestsellersList = useProductsStore((state) => state.products.filter((p) => p.bestseller).slice(0, 8));

  return (
    <>
      {/* HERO */}
      <section className="relative h-[100svh] -mt-16 sm:-mt-20 overflow-hidden">
        <motion.img
          src={heroImg}
          alt="Luxury living room with cream sofas and golden hour light"
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: [0.2, 0.8, 0.2, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/15 to-foreground/70" />
        <div className="relative h-full flex flex-col justify-end pb-20 md:pb-28 px-6 lg:px-16 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-background/75 mb-6"
          >
            Spring Collection · 2026
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display font-light text-background leading-[1.05] tracking-tight text-balance text-[clamp(2.5rem,6vw,5.25rem)] max-w-[18ch]"
          >
            Timeless craftsmanship<br className="hidden sm:block" /> for modern living
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="text-background/80 text-sm sm:text-base max-w-md mt-6 leading-relaxed"
          >
            Heirloom pieces, hand-finished by master craftsmen.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button asChild className="h-12 px-8 text-xs tracking-widest uppercase bg-background text-foreground hover:bg-accent hover:text-accent-foreground rounded-none">
              <Link to="/sofas">Shop Collections</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-8 text-xs tracking-widest uppercase bg-transparent border-background/40 text-background hover:bg-background hover:text-foreground rounded-none">
              <Link to="/about">Our Story</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <Section eyebrow="Featured" title="The new collections">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { key: "sofas", img: roomLiving, label: "The Living Room" },
            { key: "beds", img: roomBedroom, label: "The Bedroom" },
            { key: "dining-tables", img: roomDining, label: "The Dining Room" },
          ].map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <Link to={`/${c.key}` as any} className="group block">
                <div className="relative overflow-hidden rounded-md aspect-[4/5]">
                  <motion.img src={c.img} alt={c.label} loading="lazy" className="w-full h-full object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 1.2 }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <div className="absolute inset-x-6 bottom-6 text-background">
                    <h3 className="font-display text-3xl">{c.label}</h3>
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest mt-2 underline-gold">
                      Explore <ArrowRight className="size-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* BESTSELLERS */}
      <Section eyebrow="Bestsellers" title="Pieces our clients love">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
          {bestsellersList.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>
      </Section>

      {/* SHOP BY CATEGORY */}
      <Section eyebrow="Categories" title="Shop by category">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categoryGrid.map((key, i) => {
            const c = categoryMeta[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
              >
                <Link to={`/${key}` as any} className="group block relative overflow-hidden rounded-md aspect-square">
                  <motion.img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 1 }} />
                  <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-2xl md:text-3xl text-background">{c.title}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ROOM INSPIRATIONS */}
      <Section eyebrow="Inspiration" title="Rooms styled by Dilip">
        <div className="grid md:grid-cols-2 gap-6">
          {[{ img: roomLiving, t: "An Editorial Living Room" }, { img: roomBedroom, t: "A Quiet Master Suite" }].map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.7 }} className="relative overflow-hidden rounded-md aspect-[4/3] group">
              <img src={r.img} alt={r.t} loading="lazy" className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-background">
                <h3 className="font-display text-3xl">{r.t}</h3>
                <button className="text-xs uppercase tracking-widest border border-background/50 px-4 py-2 hover:bg-background hover:text-foreground transition">Shop the Look</button>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* WHY CHOOSE */}
      <Section eyebrow="The Dilip Standard" title="Why discerning homes choose us">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Hammer, t: "Master Craftsmanship", d: "Hand-finished by artisans with decades of training." },
            { icon: Award, t: "Premium Materials", d: "Solid teak, Italian leather, Belgian linen." },
            { icon: Truck, t: "15–20 Day Delivery", d: "White-glove delivery and assembly across India." },
            { icon: Sparkles, t: "Lifetime Care", d: "Restoration and care for the lifetime of the piece." },
          ].map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="text-center">
              <div className="size-14 mx-auto rounded-full bg-secondary grid place-items-center mb-4">
                <f.icon className="size-5 text-accent" />
              </div>
              <h3 className="font-display text-xl mb-2">{f.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section eyebrow="Reviews" title="From the homes we've furnished">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div key={tIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-0.5 mb-6">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-accent text-accent" />)}
            </div>
            <p className="font-display text-2xl md:text-3xl text-balance leading-snug">"{testimonials[tIdx].text}"</p>
            <p className="mt-6 text-sm text-muted-foreground tracking-wide">— {testimonials[tIdx].name}, {testimonials[tIdx].city}</p>
          </motion.div>
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setTIdx(i)} aria-label={`Slide ${i + 1}`} className={`h-1 transition-all ${tIdx === i ? "w-10 bg-foreground" : "w-4 bg-border"}`} />
            ))}
          </div>
        </div>
      </Section>

      {/* TRENDING + OFFER */}
      <Section eyebrow="Trending Now" title="Most coveted this season">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
          {trending().map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 relative overflow-hidden rounded-md p-12 md:p-20 text-center gradient-warm border border-border"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Limited release</p>
          <h3 className="font-display text-4xl md:text-5xl text-balance">Up to 20% off our heritage collection</h3>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">A rare moment to acquire heirloom pieces with our compliments.</p>
          <Button asChild className="mt-8 h-12 px-10 text-xs tracking-widest uppercase rounded-none">
            <Link to="/sofas">Shop the offer</Link>
          </Button>
        </motion.div>
      </Section>

      {/* NEWSLETTER */}
      <section className="px-6 lg:px-10 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Inner Circle</p>
          <h2 className="font-display text-4xl md:text-5xl">Join the inner circle</h2>
          <p className="mt-4 text-muted-foreground">Private previews, atelier stories, and first access to limited releases.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex gap-0 max-w-md mx-auto border-b border-border focus-within:border-foreground transition">
            <input type="email" required placeholder="your@email.com" className="flex-1 bg-transparent py-3 outline-none text-sm" />
            <button className="text-xs uppercase tracking-widest font-medium hover:text-accent transition">Subscribe →</button>
          </form>
        </motion.div>
      </section>
    </>
  );
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="px-6 lg:px-10 py-20 md:py-28 mx-auto max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12 md:mb-16 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{eyebrow}</p>
        <h2 className="font-display text-4xl md:text-5xl text-balance">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}
