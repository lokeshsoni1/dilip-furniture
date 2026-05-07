import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import heroImg from "@/assets/hero.jpg";
import roomLiving from "@/assets/room-living.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dilip Furniture" },
      { name: "description", content: "The story of Dilip Furniture: a family atelier crafting heirloom furniture for modern Indian homes." },
      { property: "og:title", content: "About Dilip Furniture" },
      { property: "og:description", content: "A family atelier of master craftsmen." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: About,
});

const timeline = [
  { y: "1978", t: "A small workshop opens in Jodhpur with three master craftsmen." },
  { y: "1995", t: "Dilip begins exporting to Europe, refining the modern Indian aesthetic." },
  { y: "2010", t: "The atelier moves to a 40,000 sq ft heritage workshop." },
  { y: "2024", t: "Dilip Furniture launches direct-to-home across India." },
];

function About() {
  return (
    <>
      <section className="relative h-[60vh] -mt-16 sm:-mt-20 overflow-hidden">
        <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/45" />
        <div className="relative h-full grid place-items-center text-center px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-background/80 mb-4">Since 1978</p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-display text-5xl md:text-7xl text-background max-w-4xl mx-auto text-balance">
              An atelier of patient hands and heirloom intent
            </motion.h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Our story</p>
        <h2 className="font-display text-4xl">Quiet luxury, made in India</h2>
        <p className="mt-6 text-foreground/80 leading-relaxed">
          Dilip began as a single workshop in Jodhpur, where master craftsmen shaped solid teak by hand. Four decades later, our atelier still carries the same conviction: that the best furniture is built with patience, not haste — to be lived with for generations.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 pb-24 grid md:grid-cols-2 gap-10 items-center">
        <img src={roomLiving} alt="Atelier" className="rounded-md aspect-[4/5] object-cover" />
        <div className="space-y-8">
          {timeline.map((m, i) => (
            <motion.div key={m.y} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-6 border-l-2 border-accent/30 pl-6">
              <div>
                <p className="font-display text-3xl text-accent">{m.y}</p>
                <p className="mt-2 text-foreground/80">{m.t}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="text-center py-20 gradient-warm">
        <h2 className="font-display text-4xl">Visit our world</h2>
        <Link to="/contact" className="inline-block mt-8 bg-foreground text-background px-10 py-4 text-xs uppercase tracking-widest hover:bg-accent hover:text-accent-foreground transition">
          Contact the atelier
        </Link>
      </section>
    </>
  );
}
