import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/coffee-tables")({
  head: () => ({
    meta: [
      { title: "Coffee Tables — Dilip Furniture" },
      { name: "description", content: "Explore our coffee tables collection. Heirloom craftsmanship, hand-finished and delivered in 15–20 days." },
      { property: "og:title", content: "Coffee Tables — Dilip Furniture" },
      { property: "og:description", content: "Heirloom coffee tables, hand-finished in India." },
    ],
  }),
  component: () => <CategoryPage category="coffee-tables" />,
});
