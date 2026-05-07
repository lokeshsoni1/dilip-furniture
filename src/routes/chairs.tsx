import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/chairs")({
  head: () => ({
    meta: [
      { title: "Chairs — Dilip Furniture" },
      { name: "description", content: "Explore our chairs collection. Heirloom craftsmanship, hand-finished and delivered in 15–20 days." },
      { property: "og:title", content: "Chairs — Dilip Furniture" },
      { property: "og:description", content: "Heirloom chairs, hand-finished in India." },
    ],
  }),
  component: () => <CategoryPage category="chairs" />,
});
