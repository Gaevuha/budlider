import { notFound } from "next/navigation";
import ProductsClient from "./Products.client";
import { getProducts, ProductListResponse } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function ProductsByCategory({ params }: Props) {
  const { slug } = await params;
  const category = slug?.[0] || "All";
  const categoryParam =
    category.toLowerCase() === "all" ? undefined : category.toLowerCase();

  const data: ProductListResponse = {
    products: [],
    total: 0,
  };

  try {
    const fetched = await getProducts("", 1, 9, categoryParam);
    data.products = fetched.products || [];
    data.total = fetched.total || 0;
  } catch {
    notFound();
  }

  if (!data.products || data.products.length === 0) {
    notFound();
  }

  return <ProductsClient initialData={data} initialCategory={category} />;
}
