import { getProducts } from "@/lib/api";
import ProductList from "@/components/ProductList/ProductList";

const Products = async () => {
  const response = await getProducts();

  return (
    <section className="section">
      <div className="container">
        {response?.products?.length > 0 ? (
          // ProductList тепер клієнтський, Loader всередині нього
          <ProductList products={response.products} />
        ) : (
          <p>Товари відсутні</p>
        )}
      </div>
    </section>
  );
};

export default Products;
