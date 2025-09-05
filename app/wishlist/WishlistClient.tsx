'use client';

import { useWishlist } from '../../context/WishlistContext';
import styles from './WishlistPage.module.css';
import Loader from '../../components/Loader/Loader';
import { useEffect, useState } from 'react';
import { fetchProductsByIds } from '@/lib/api';
import type { Product } from '../../types/product';
import Image from 'next/image';

export default function WishlistClient() {
  const { wishlist } = useWishlist();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      if (wishlist.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        const ids = wishlist.map(p => p.id);
        const loadedProducts = await fetchProductsByIds(ids);
        setProducts(loadedProducts);
      } catch (error) {
        console.error('Помилка при завантаженні товарів:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [wishlist]);

  if (loading) return <Loader />;

  const hasNoProducts = wishlist.length === 0;

  return (
    <section className={styles.section}>
      <div
        className={`${styles.container} ${styles.productPage} ${styles.wishlistContainer}`}
      >
        <main>
          {hasNoProducts ? (
            <div className={styles.notFound}>
              <div className={styles.notFoundIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#213538"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
              </div>
              <h2 className={styles.notFoundTitle}>
                Ваш список бажань порожній
              </h2>
              <p className={styles.notFoundDescription}>
                Додайте товари, щоб вони з’явились тут.
              </p>
            </div>
          ) : (
            <ul className={styles.products}>
              {products.map(product => (
                <li key={product.id} className={styles.productsItem}>
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={300}
                    height={300}
                    style={{
                      width: '300px',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                    className={styles.productsImage}
                    priority={true}
                  />
                  <p className={styles.productsTitle}>{product.title}</p>
                  <p className={styles.productsBrand}>
                    <span className={styles.productsBrandBold}>
                      Brand: {product.brand}
                    </span>
                  </p>
                  <p className={styles.productsCategory}>{product.category}</p>
                  <p className={styles.productsPrice}>
                    Price: {product.price} грн.
                  </p>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </section>
  );
}
