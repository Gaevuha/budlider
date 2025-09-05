'use client';

import { useCart } from '@/context/CartContext';
import styles from './CartPage.module.css';
import Image from 'next/image';

export default function CartClient() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalItems = cart?.length ?? 0;
  const totalPrice = cart?.reduce((sum, p) => sum + p.price, 0) ?? 0;
  const totalPriceFixed = totalPrice.toFixed(2);

  return (
    <main>
      <section className="section">
        <div className={`${styles['product-page']} container`}>
          {totalItems > 0 ? (
            <ul className={styles.products}>
              {cart.map(product => (
                <li key={product.id} className={styles['products__item']}>
                  <div className={styles['products__card']}>
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={200}
                      height={200}
                      className={styles['products__image']}
                      priority={true}
                    />
                    <p className={styles['products__title']}>{product.title}</p>
                    <p className={styles['products__brand']}>
                      <span className={styles['products__brand--bold']}>
                        Brand:
                      </span>{' '}
                      Chic Cosmetics
                    </p>
                    <p className={styles['products__category']}>
                      Category: beauty
                    </p>
                    <p className={styles['products__price']}>
                      {product.price} $
                    </p>
                    <button
                      className="btn"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div
              className={`${styles['not-found']} ${styles['not-found--visible']}`}
            >
              <div className={styles['not-found__icon']}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#265e5e"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
              </div>
              <h2 className={styles['not-found__title']}>No Products Found</h2>
              <p className={styles['not-found__description']}>
                We couldn&apos;t find any items matching your search.
                <br />
                Please try different keywords.
              </p>
            </div>
          )}

          <aside className={styles.sidebar}>
            <div className={styles['cart-summary']}>
              <div className={styles['cart-summary__inner']}>
                <h2 className={styles['cart-summary__title']}>Order Summary</h2>
                <ul className={styles['cart-summary__list']}>
                  <li className={styles['cart-summary__item']}>
                    <span className={styles['cart-summary__label']}>
                      Items:
                    </span>
                    <span className={styles['cart-summary__value']}>
                      {totalItems}
                    </span>
                  </li>
                  <li className={styles['cart-summary__item']}>
                    <span className={styles['cart-summary__label']}>
                      Total:
                    </span>
                    <span className={styles['cart-summary__value']}>
                      ${totalPriceFixed}
                    </span>
                  </li>
                  <li className={styles['cart-summary__item']}>
                    <span className={styles['cart-summary__label']}>
                      Shipping:
                    </span>
                    <span className={styles['cart-summary__value']}>Free</span>
                  </li>
                </ul>

                {totalItems > 0 && (
                  <>
                    <button className={styles['cart-summary__btn']}>
                      Buy products
                    </button>
                    <button
                      onClick={clearCart}
                      className={`${styles['cart-summary__btn']} ${styles['cart-summary__btn--clear']}`}
                    >
                      Clear cart
                    </button>
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
