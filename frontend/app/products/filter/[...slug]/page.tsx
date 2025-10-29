// app/products/filter/[...slug]/page.tsx
import { getProducts } from "@/lib/api";
import ProductList from "@/components/ProductList/ProductList";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const ProductsByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];
  const response = await getProducts(category);

  return (
    <>
      {response?.products?.length > 0 && (
        <ProductList products={response.products} />
      )}
    </>
  );
};

export default ProductsByCategory;
