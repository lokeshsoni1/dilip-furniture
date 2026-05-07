import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/beds")({
  head: () => ({
    meta: [
      { title: "Beds — Dilip Furniture" },
      { name: "description", content: "Explore our beds collection. Heirloom craftsmanship, hand-finished and delivered in 15–20 days." },
      { property: "og:title", content: "Beds — Dilip Furniture" },
      { property: "og:description", content: "Heirloom beds, hand-finished in India." },
    ],
  }),
  component: () => <CategoryPage category="beds" />,
});
