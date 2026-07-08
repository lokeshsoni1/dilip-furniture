import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Building, Percent, Calendar, Layers } from "lucide-react";

export const Route = createFileRoute("/trade-program")({
  head: () => ({
    meta: [
      { title: "Trade Program — Dilip Furniture" },
      { name: "description", content: "Exclusive trade benefits for interior designers, architects, and home stylists. Customized bulk pricing and bespoke engineering." },
    ],
  }),
  component: TradeProgramPage,
});

function TradeProgramPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-10 py-20">
      <div className="max-w-3xl mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Partnership</p>
        <h1 className="font-display text-5xl md:text-6xl text-balance">Trade Partner Program</h1>
        <p className="mt-6 text-muted-foreground text-base sm:text-lg">
          We collaborate closely with leading interior designers, architects, and high-end developers. Gain access to priority customization pipelines, bulk pricing, and specialized joinery consultations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="p-6 rounded-lg bg-secondary/15 border border-border/30 flex gap-4">
          <Percent className="size-6 text-accent shrink-0 mt-1" />
          <div>
            <h3 className="font-display text-xl mb-2">Bespoke Pricing Structure</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tiered pricing metrics tailored for project budgets of all sizes. Designers receive trade discounts of 15% to 25% depending on volume, with no minimum order constraints.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-secondary/15 border border-border/30 flex gap-4">
          <Calendar className="size-6 text-accent shrink-0 mt-1" />
          <div>
            <h3 className="font-display text-xl mb-2">Dedicated Timelines</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Expedited production cycles for tight commercial project schedules. Get precise weekly photo reports on wood curing, handcrafting stages, and dispatch routing.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-secondary/15 border border-border/30 flex gap-4">
          <Layers className="size-6 text-accent shrink-0 mt-1" />
          <div>
            <h3 className="font-display text-xl mb-2">Bespoke Custom Engineering</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Provide your blueprint CAD drawings or raw specifications. Our engineering atelier works with you to produce robust structural frames, scaling furniture to match custom floor plans.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-lg bg-secondary/15 border border-border/30 flex gap-4">
          <Building className="size-6 text-accent shrink-0 mt-1" />
          <div>
            <h3 className="font-display text-xl mb-2">Commercial Project Support</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Whether furnishing a boutique hotel or residential penthouse suites, our white-glove logistics team manages complex on-site setups and assembly.
            </p>
          </div>
        </div>
      </div>

      {/* Trade Sign Up form */}
      <div className="max-w-xl mx-auto p-8 rounded-lg border border-border/80 bg-secondary/10 backdrop-blur-sm">
        <h3 className="font-display text-2xl text-center mb-2">Apply for Membership</h3>
        <p className="text-xs text-muted-foreground text-center mb-6">Complete the partner profile below. Our trade concierge will respond within 24 hours.</p>
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Thank you for your application. Our Trade Concierge will reach out soon.");
            (e.target as HTMLFormElement).reset();
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Full Name</label>
            <input type="text" required className="w-full mt-1.5 bg-background border border-border px-3 py-2 text-sm outline-none focus:border-accent text-foreground" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Company / Firm Name</label>
            <input type="text" required className="w-full mt-1.5 bg-background border border-border px-3 py-2 text-sm outline-none focus:border-accent text-foreground" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Professional Email Address</label>
            <input type="email" required className="w-full mt-1.5 bg-background border border-border px-3 py-2 text-sm outline-none focus:border-accent text-foreground" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Website / Portfolio Link</label>
            <input type="url" placeholder="https://" className="w-full mt-1.5 bg-background border border-border px-3 py-2 text-sm outline-none focus:border-accent text-foreground" />
          </div>
          <Button type="submit" className="w-full h-11 rounded-none text-xs uppercase tracking-widest font-semibold bg-foreground text-background hover:bg-accent hover:text-accent-foreground mt-6">
            Submit Application
          </Button>
        </form>
      </div>
    </div>
  );
}
