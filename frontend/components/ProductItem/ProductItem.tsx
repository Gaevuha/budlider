"use client";
// components/NoteItem/NoteItem.tsx

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductItem.module.css";

type Props = {
  item: Product;
};

const ProductItem = ({ item }: Props) => {
  return (
    <li className={styles.products__item}>
      <Link href={`/products/${item.id}`} className={styles.products__link}>
        <Image
          src={item.thumbnail}
          alt={item.title}
          width={300}
          height={300}
          className={styles.products__image}
          priority
        />
        <p className={styles.products__title}>{item.title}</p>
        <p className={styles.products__brand}>
          <span className={styles["products__brand--bold"]}>
            Бренд: {item.brand}
          </span>
        </p>
        <p className={styles.products__category}>Категорія: {item.category}</p>
        <p className={styles.products__price}>Ціна: {item.price} грн.</p>
      </Link>
    </li>
  );
};

export default ProductItem;
