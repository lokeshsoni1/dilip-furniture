import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — Dilip Furniture" },
      { name: "description", content: "Got queries? Find information on customized high-end wooden crafts, sizing requests, shipping times, and warranties." },
    ],
  }),
  component: FaqsPage,
});

const faqs = [
  {
    q: "What is your standard production and delivery timeline?",
    a: "Every piece of Dilip Furniture is crafted, hand-finished, and quality-tested in our atelier. Our standard white-glove delivery timeline across India is 15 to 20 days. This includes complimentary assembly at your residence.",
  },
  {
    q: "Can I customize the dimensions or materials of a piece?",
    a: "Absolutely. We offer comprehensive customization options for sizes, select fabrics (Belgian linen, Italian boucle, leather), and wood finishes. To start a custom joinery request, please contact our concierge team directly or use the AI ambassador widget.",
  },
  {
    q: "What types of wood and materials do you use?",
    a: "We work exclusively with premium kiln-dried solids: high-grade teak, walnut, and ash frames. Our upholstery range includes genuine full-grain Italian leathers and high-durability boucles sourced directly from premium European mills.",
  },
  {
    q: "Do your furniture pieces come with a warranty?",
    a: "Yes. Every signature piece is backed by a 10-year structural warranty covering frame integrity and craftsmanship durability. We believe in crafting furniture built to last lifetimes.",
  },
  {
    q: "How do I care for my solid wood furniture?",
    a: "Solid wood is natural and breathes over time. We recommend dusting daily with a soft dry cloth. Avoid exposing wooden surfaces to direct sunlight or moisture. We also offer lifetime restoration services if needed.",
  },
  {
    q: "Do you offer international shipping?",
    a: "While our standard white-glove shipping resides within India, we can facilitate international crated shipping. Please reach out to our concierge team with your location and collection list for a custom quote.",
  },
  {
    q: "Can I choose a custom fabric for my order?",
    a: "Yes. Customers can provide their own upholstery fabrics (COM) or choose from our bespoke swatch cards. Contact our team prior to placing your order to align on fabric length requirements.",
  },
];

function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-10 py-20">
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">Concierge</p>
        <h1 className="font-display text-5xl">Frequently Asked Questions</h1>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
          Find information regarding customized orders, delivery timelines, wood quality, and atelier policies.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="border border-border/60 rounded-md bg-secondary/10 overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-secondary/20 transition-colors duration-250"
              >
                <span className="font-display text-lg sm:text-xl pr-4">{faq.q}</span>
                <span className="shrink-0 text-accent p-1 rounded bg-secondary/35">
                  {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-border/30 pt-4 bg-background/30">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
