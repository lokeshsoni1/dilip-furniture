import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/luxury-decor")({
  head: () => ({
    meta: [
      { title: "Luxury Decor — Dilip Furniture" },
      { name: "description", content: "Explore our luxury decor collection. Heirloom craftsmanship, hand-finished and delivered in 15–20 days." },
      { property: "og:title", content: "Luxury Decor — Dilip Furniture" },
      { property: "og:description", content: "Heirloom luxury decor, hand-finished in India." },
    ],
  }),
  component: () => <CategoryPage category="luxury-decor" />,
});
