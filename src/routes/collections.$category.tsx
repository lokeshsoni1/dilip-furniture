import { createFileRoute } from "@tanstack/react-router";
import { CategoryPage } from "@/components/site/CategoryPage";

export const Route = createFileRoute("/collections/$category")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.category.charAt(0).toUpperCase() + params.category.slice(1).replace("-", " ")} Collection — Dilip Furniture` },
      { name: "description", content: `Explore our premium hand-finished ${params.category.replace("-", " ")} collection.` },
    ],
  }),
  component: CollectionsCategoryPage,
});

function CollectionsCategoryPage() {
  const { category } = Route.useParams();
  return <CategoryPage category={category} />;
}
