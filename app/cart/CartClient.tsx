'use client';

import { useCart } from '@/context/CartContext';
import styles from './CartPage.module.css';
import Image from 'next/image';
import 'izitoast/dist/css/iziToast.min.css';
import Loader from '@/components/Loader/Loader';
import { useState, useEffect } from 'react';

export default function CartClient() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(true);

  const totalItems = cart?.length ?? 0;
  const totalPrice = cart?.reduce((sum, p) => sum + p.price, 0) ?? 0;
  const totalPriceFixed = totalPrice.toFixed(2);

  useEffect(() => {
    // імітуємо затримку
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // оформлення замовлення
  const handleCheckout = async () => {
    const iziToast = (await import('izitoast')).default;

    iziToast.success({
      title: 'Успіх!',
      message: 'Ваше замовлення успішно відправлено. Чекайте на дзвінок',
      position: 'topCenter',
      timeout: 3000,
      theme: 'light',
      overlay: false,
      maxWidth: 400,
      titleColor: '#fff',
      messageColor: '#fff',
      backgroundColor: '#28a745',
      icon: 'fa fa-check-circle',
      iconColor: '#fff',
      transitionIn: 'fadeInDown',
      transitionOut: 'fadeOutUp',
    });

    clearCart();
  };

  return (
    <main>
      <section className="section">
        <div className={`${styles['product-page']} container`}>
          {/* Лоадер */}
          {loading ? (
            <Loader />
          ) : totalItems > 0 ? (
            <ul className={styles.products}>
              {cart.map(product => (
                <li key={product.id} className={styles['products__item']}>
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
                    className={styles['products__image']}
                    priority={true}
                  />
                  <p className={styles['products__title']}>{product.title}</p>
                  <p className={styles['products__brand']}>
                    <span className={styles['products__brand--bold']}>
                      Бренд:
                    </span>{' '}
                    Chic Cosmetics
                  </p>
                  <p className={styles['products__category']}>
                    Категорія: beauty
                  </p>
                  <p className={styles['products__price']}>{product.price} $</p>
                  <button
                    className={styles['btn-cart']}
                    onClick={() => removeFromCart(product.id)}
                  >
                    Видалити з кошика
                  </button>
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
              <h2 className={styles['not-found__title']}>Товари не знайдено</h2>
              <p className={styles['not-found__description']}>
                Нам не вдалося знайти жодного елемента, що відповідає вашому
                пошуку.
                <br />
                Будь ласка, спробуйте інші слова для пошуку.
              </p>
            </div>
          )}

          {/* Сайдбар */}
          <aside className={styles.sidebar}>
            <div className={styles['cart-summary']}>
              <div className={styles['cart-summary__inner']}>
                <h2 className={styles['cart-summary__title']}>
                  Ваше замовлення
                </h2>
                <ul className={styles['cart-summary__list']}>
                  <li className={styles['cart-summary__item']}>
                    <span className={styles['cart-summary__label']}>
                      Кількість:
                    </span>
                    <span className={styles['cart-summary__value']}>
                      {totalItems}
                    </span>
                  </li>
                  <li className={styles['cart-summary__item']}>
                    <span className={styles['cart-summary__label']}>
                      Всього до сплати:
                    </span>
                    <span className={styles['cart-summary__value']}>
                      {totalPriceFixed} грн.
                    </span>
                  </li>
                  <li className={styles['cart-summary__item']}>
                    <span className={styles['cart-summary__label']}>
                      Доставка:
                    </span>
                    <span className={styles['cart-summary__value']}>
                      35 грн/км
                    </span>
                  </li>
                </ul>

                {totalItems > 0 && (
                  <>
                    <button
                      className={styles['cart-summary__btn']}
                      onClick={handleCheckout}
                    >
                      Оформити замовлення
                    </button>
                    <button
                      onClick={clearCart}
                      className={`${styles['cart-summary__btn']} ${styles['cart-summary__btn--clear']}`}
                    >
                      Очистити кошик
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
