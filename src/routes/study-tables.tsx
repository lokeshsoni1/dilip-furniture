import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/study-tables")({
  head: () => ({
    meta: [
      { title: "Study Tables — Dilip Furniture" },
      { name: "description", content: "Explore our study tables collection. Heirloom craftsmanship, hand-finished and delivered in 15–20 days." },
      { property: "og:title", content: "Study Tables — Dilip Furniture" },
      { property: "og:description", content: "Heirloom study tables, hand-finished in India." },
    ],
  }),
  component: () => <CategoryPage category="study-tables" />,
});
