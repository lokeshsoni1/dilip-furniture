import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/tv-units")({
  head: () => ({
    meta: [
      { title: "TV Units — Dilip Furniture" },
      { name: "description", content: "Explore our tv units collection. Heirloom craftsmanship, hand-finished and delivered in 15–20 days." },
      { property: "og:title", content: "TV Units — Dilip Furniture" },
      { property: "og:description", content: "Heirloom tv units, hand-finished in India." },
    ],
  }),
  component: () => <CategoryPage category="tv-units" />,
});
