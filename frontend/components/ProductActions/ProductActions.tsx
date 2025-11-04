"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import styles from "@/app/(public routes)/products/[id]/DetailProduct.module.css";

type Props = {
  product: Product;
};

export default function ProductActions({ product }: Props) {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  // Перевірка, чи товар у кошику
  useEffect(() => {
    queueMicrotask(() => setInCart(isInCart(product.id)));
  }, [isInCart, product.id]);

  // Перевірка, чи товар у списку бажань
  useEffect(() => {
    queueMicrotask(() => setInWishlist(isInWishlist(product.id)));
  }, [isInWishlist, product.id]);

  const handleCartClick = () => {
    if (inCart) removeFromCart(product.id);
    else addToCart(product);
    setInCart(!inCart);
  };

  const handleWishlistClick = () => {
    if (inWishlist) removeFromWishlist(product.id);
    else addToWishlist(product);
    setInWishlist(!inWishlist);
  };

  return (
    <div className={styles.productPage__actions}>
      <button
        className={`${styles.productPage__btn} ${styles["productPage__btn--wishlist"]}`}
        onClick={handleWishlistClick}
      >
        {inWishlist ? "Видалити з побажань" : "Додати до побажань"}
      </button>

      <button
        className={`${styles.productPage__btn} ${styles["productPage__btn--cart"]}`}
        onClick={handleCartClick}
      >
        {inCart ? "Видалити з кошика" : "Додати до кошика"}
      </button>
    </div>
  );
}
