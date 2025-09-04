import { useCart } from '../../hooks/useCart';
import styles from './CartPage.module.css';
import Loader from '../../components/Loader/Loader';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { cartItems, isInitialized } = useCart();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (isInitialized) {
      const timer = setTimeout(() => setShowLoader(false), 1000); // Затримка 1.5с
      return () => clearTimeout(timer);
    }
  }, [isInitialized]);

  if (!isInitialized || showLoader) {
    return <Loader />;
  }

  const hasNoProducts = cartItems.length === 0;
  const totalCount = cartItems.length;
  const totalPrice = cartItems.reduce((sum, p) => sum + p.price, 0).toFixed(2);

  return (
    <section className={styles.section}>
      <div className={`${styles.container} ${styles.productPage}`}>
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
                Нам не вдалося знайти жодного елемента, що відповідає вашому запиту.
                <br />
                Будь ласка, спробуйте інші ключові слова.
              </p>
            </div>
          ) : (
            <ul className={styles.products}>
              {cartItems.map(product => (
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

        <aside className={styles.sidebar}>
          <div className={styles.cartSummary}>
            <div className={styles.cartSummaryInner}>
              <h2 className={styles.cartSummaryTitle}>Ваше замовлення</h2>
              <ul className={styles.cartSummaryList}>
                <li className={styles.cartSummaryItem}>
                  <span className={styles.cartSummaryLabel}>Кількість:</span>
                  <span className={styles.cartSummaryValue}>{totalCount}</span>
                </li>
                <li className={styles.cartSummaryItem}>
                  <span className={styles.cartSummaryLabel}>Всього:</span>
                  <span className={styles.cartSummaryValue}>{totalPrice}грн.</span>
                </li>
                <li className={styles.cartSummaryItem}>
                  <span className={styles.cartSummaryLabel}>Доставка:</span>
                  <span className={styles.cartSummaryValue}>Безкоштовно</span>
                </li>
              </ul>

              <div className={styles.cartSummaryPromo}>
                <p className={styles.cartSummaryHint}>
                  Застосуйте промокод під час оформлення замовлення
                </p>
              </div>
              <button className={styles.cartSummaryBtn}>Купити</button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
