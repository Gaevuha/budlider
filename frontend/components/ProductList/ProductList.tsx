// components/NoteList/NoteList.tsx

import { Product } from "@/lib/api";
import ProductItem from "@/components/ProductItem/ProductItem";
import styles from "./ProductList.module.css";

type Props = {
  products: Product[];
};

const ProductList = ({ products }: Props) => {
  return (
    <ul className={styles.products}>
      {products.map((product) => (
        <ProductItem key={product.id} item={product} />
      ))}
    </ul>
  );
};

export default ProductList;
