'use client';

import { useEffect, useState } from 'react';
import type { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './DetailProduct.module.css';

type Props = {
  product: Product;
};

export default function ProductActions({ product }: Props) {
  const { addToCart, removeFromCart, cart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    setInCart(cart.some(p => p.id === product.id));
  }, [cart, product.id]);

  useEffect(() => {
    setInWishlist(isInWishlist(product.id));
  }, [isInWishlist, product.id]);

  const handleCartClick = () => {
    if (inCart) removeFromCart(product.id);
    else addToCart(product);
  };

  const handleWishlistClick = () => {
    if (inWishlist) removeFromWishlist(product.id);
    else addToWishlist(product);
    setInWishlist(!inWishlist);
  };

  return (
    <div className={styles.productPage__actions}>
      <button
        className={`${styles.productPage__btn} ${styles['productPage__btn--wishlist']}`}
        onClick={handleWishlistClick}
      >
        {inWishlist ? 'Видалити з побажань' : 'Додати до побажань'}
      </button>

      <button
        className={`${styles.productPage__btn} ${styles['productPage__btn--cart']}`}
        onClick={handleCartClick}
      >
        {inCart ? 'Видалити з кошика' : 'Додати до кошика'}
      </button>
    </div>
  );
}
