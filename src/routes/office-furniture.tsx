import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/office-furniture")({
  head: () => ({
    meta: [
      { title: "Office Furniture — Dilip Furniture" },
      { name: "description", content: "Explore our office furniture collection. Heirloom craftsmanship, hand-finished and delivered in 15–20 days." },
      { property: "og:title", content: "Office Furniture — Dilip Furniture" },
      { property: "og:description", content: "Heirloom office furniture, hand-finished in India." },
    ],
  }),
  component: () => <CategoryPage category="office-furniture" />,
});
