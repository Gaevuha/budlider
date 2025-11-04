// app/(public routes)/products/page.tsx

import { getProducts } from "@/lib/api";
import ProductList from "@/components/ProductList/ProductList";

const Products = async () => {
  const response = await getProducts();

  return (
    <div>
      {response?.products?.length > 0 ? (
        <ProductList products={response.products} />
      ) : (
        <p>Товари відсутні</p>
      )}
    </div>
  );
};

export default Products;
