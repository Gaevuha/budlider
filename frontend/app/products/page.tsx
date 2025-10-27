// app/products/page.tsx
import { getProducts } from "@/lib/api";
import ProductList from "@/components/ProductList/ProductList";

const Products = async () => {
  const response = await getProducts();
  return (
    <section className="section">
      <div className="container">
        {response?.products?.length > 0 && (
          <ProductList products={response.products} />
        )}
      </div>
    </section>
  );
};

export default Products;
