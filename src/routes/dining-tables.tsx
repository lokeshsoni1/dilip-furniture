import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/dining-tables")({
  head: () => ({
    meta: [
      { title: "Dining Tables — Dilip Furniture" },
      { name: "description", content: "Explore our dining tables collection. Heirloom craftsmanship, hand-finished and delivered in 15–20 days." },
      { property: "og:title", content: "Dining Tables — Dilip Furniture" },
      { property: "og:description", content: "Heirloom dining tables, hand-finished in India." },
    ],
  }),
  component: () => <CategoryPage category="dining-tables" />,
});
