import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/sofas")({
  head: () => ({
    meta: [
      { title: "Sofas — Dilip Furniture" },
      { name: "description", content: "Explore our sofas collection. Heirloom craftsmanship, hand-finished and delivered in 15–20 days." },
      { property: "og:title", content: "Sofas — Dilip Furniture" },
      { property: "og:description", content: "Heirloom sofas, hand-finished in India." },
    ],
  }),
  component: () => <CategoryPage category="sofas" />,
});
