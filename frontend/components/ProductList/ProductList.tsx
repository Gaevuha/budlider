// components/ProductList/ProductList.tsx

"use client";

// import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import ProductItem from "@/components/ProductItem/ProductItem";
import styles from "./ProductList.module.css";
// import Loader from "@/components/Loader/Loader";

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Імітуємо коротке завантаження Loader
  //   const timer = setTimeout(() => setLoading(false), 300);
  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) return <Loader />;

  return (
    <ul className={styles.products}>
      {products.map((product) => (
        <ProductItem key={product.id} item={product} />
      ))}
    </ul>
  );
}
