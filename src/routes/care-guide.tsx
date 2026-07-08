import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, Sparkles, Wind, Droplets } from "lucide-react";

export const Route = createFileRoute("/care-guide")({
  head: () => ({
    meta: [
      { title: "Care & Maintenance Guide — Dilip Furniture" },
      { name: "description", content: "Learn how to clean, condition, and preserve your solid teak wood, Italian leather, and luxury fabrics." },
    ],
  }),
  component: CareGuidePage,
});

function CareGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-10 py-20">
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Preservation</p>
        <h1 className="font-display text-5xl">Care & Maintenance</h1>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
          Our heirloom pieces are engineered to outlast generations. Follow this styling and maintenance framework to preserve their beauty.
        </p>
      </div>

      <div className="space-y-12">
        <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-lg bg-secondary/10 border border-border/40">
          <h2 className="font-display text-2xl flex items-center gap-3 text-foreground mb-4">
            <Sparkles className="size-5 text-accent" /> Solid Teak & Walnut Wood Polishing
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Solid wood is organic and dynamically adjusts to surrounding humidity levels. Dust daily with a dry micro-fiber cloth in the direction of the wood grain. Avoid placing pieces in direct sun exposure or adjacent to air conditioning vents, which can cause micro-fissures. Once or twice a year, apply a high-quality natural beeswax polish using soft circular motions to restore the natural hand-rubbed oil finish.
          </p>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-8 rounded-lg bg-secondary/10 border border-border/40">
          <h2 className="font-display text-2xl flex items-center gap-3 text-foreground mb-4">
            <Shield className="size-5 text-accent" /> Premium Leather Conditioning
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Our full-grain Italian leather absorbs oils and develops a rich vintage patina over time. Wipe down surfaces weekly with a clean damp cloth to remove microscopic dust particles. Do not use chemical household cleaners, solvent polishes, or abrasive soaps, as they will strip the hide's natural protective coat. Apply a premium pH-balanced leather conditioner every 6 to 12 months to prevent cracking.
          </p>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-8 rounded-lg bg-secondary/10 border border-border/40">
          <h2 className="font-display text-2xl flex items-center gap-3 text-foreground mb-4">
            <Wind className="size-5 text-accent" /> Fabric Discoloration Prevention
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Belgian linens and Italian boucles can fade under intense UV rays. Rotate cushions periodically to distribute wear and direct light exposure. In case of localized spills, blot immediately with a white absorbent cloth. Do not rub, as this pushes the liquid deeper into the textile fibers. Use distilled water and mild soap for spot cleaning.
          </p>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-8 rounded-lg bg-secondary/10 border border-border/40">
          <h2 className="font-display text-2xl flex items-center gap-3 text-foreground mb-4">
            <Droplets className="size-5 text-accent" /> Humidity & Environmental Maintenance
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Maintain room humidity levels between 40% and 60% for ideal wood stability. Use coasters under cold drinks and hot pots to prevent thermal rings. If local humidity changes drastically, inspect joineries and oil them to keep mechanisms smooth.
          </p>
        </motion.section>
      </div>
    </div>
  );
}
