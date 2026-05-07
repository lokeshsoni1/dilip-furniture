import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/wardrobes")({
  head: () => ({
    meta: [
      { title: "Wardrobes — Dilip Furniture" },
      { name: "description", content: "Explore our wardrobes collection. Heirloom craftsmanship, hand-finished and delivered in 15–20 days." },
      { property: "og:title", content: "Wardrobes — Dilip Furniture" },
      { property: "og:description", content: "Heirloom wardrobes, hand-finished in India." },
    ],
  }),
  component: () => <CategoryPage category="wardrobes" />,
});
