import { useWishlist } from '../../hooks/useWishlist';
import styles from '../CartPage/CartPage.module.css'
import Loader from '../../components/Loader/Loader';
import { useEffect, useState } from 'react';
import { fetchProductsByIds } from '../../services/productService';

// Тип Product — адаптуй під свій проект, якщо потрібно
import type { Product } from '../../types/product';

export default function WishlistPage() {
  const { wishlist, isInitialized } = useWishlist();
  const [showLoader, setShowLoader] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (isInitialized) {
      // Симуляція затримки для лоадера
      const timer = setTimeout(() => setShowLoader(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isInitialized]);

useEffect(() => {
  if (!isInitialized) return;

  async function fetchProducts() {
    if (wishlist.length === 0) {
      setProducts([]);
      return;
    }

    try {
      const loadedProducts = await fetchProductsByIds(wishlist);
      setProducts(loadedProducts);
    } catch (error) {
      console.error('Помилка при завантаженні товарів:', error);
    }
  }

  fetchProducts();
}, [wishlist, isInitialized]);

  if (!isInitialized || showLoader) {
    return <Loader />;
  }

  const hasNoProducts = wishlist.length === 0;

  return (
    <section className={styles.section}>
      <div className={`${styles.container} ${styles.productPage} ${styles.wishlistContainer}`}>
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
              <h2 className={styles.notFoundTitle}>Товари не знайдено</h2>
              <p className={styles.notFoundDescription}>
                Ваш список побажань порожній.
                <br />
                Додайте товари, щоб вони з’явились тут.
              </p>
            </div>
          ) : (
            <ul className={styles.products}>
              {products.map(product => (
                <li key={product.id} className={styles.products__item}>
                  <img
                    className={styles.products__image}
                    src={product.thumbnail}
                    alt={product.description}
                  />
                  <p className={styles.products__title}>{product.title}</p>
                  <p className={styles.products__brand}>
                    <span className={styles['products__brand--bold']}>
                      Brand: {product.brand}
                    </span>
                  </p>
                  <p className={styles.products__category}>{product.category}</p>
                  <p className={styles.products__price}>Price: {product.price} грн.</p>
                </li>
              ))}
            </ul>
          )}
        </main>
        </div>
    </section>
  );
}
