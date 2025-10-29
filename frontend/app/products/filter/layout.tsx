// app/products/filter/layout.tsx
import css from "./LayoutProducts.module.css";

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const ProductsLayout = ({ children, sidebar }: Props) => {
  return (
    <section className="section">
      <div className={`${css.container} container`}>
        <div className={css.sidebar}>{sidebar}</div>
        <div className={css.productsWrapper}>{children}</div>
      </div>
    </section>
  );
};

export default ProductsLayout;
