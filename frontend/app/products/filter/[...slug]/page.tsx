import ProductsClient from "./Products.client";
import { getProducts, ProductListResponse } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function ProductsByCategory({ params }: Props) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug;
  const slugString = slugArray?.[0] ?? "all";
  const category =
    slugString.toLowerCase() === "all" ? undefined : slugString.toLowerCase();
  let initialData: ProductListResponse | undefined = undefined;
  try {
    initialData = await getProducts(category, 9, 0);
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }

  return (
    <ProductsClient initialCategory={slugString} initialData={initialData} />
  );
}
