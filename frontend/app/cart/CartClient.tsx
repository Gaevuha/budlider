"use client";

// app/cart/CartClient.tsx;

import { useCart } from "@/context/CartContext";
import styles from "./CartPage.module.css";
import Image from "next/image";
import "izitoast/dist/css/iziToast.min.css";
import Loader from "@/components/Loader/Loader";
import { useState, useEffect } from "react";
import OrderModal from "@/components/OrderModal/OrderModalClient";

export default function CartClient() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const [loading, setLoading] = useState(true);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // ✅ враховує кількість товарів
  const totalItems = cart?.reduce((sum, p) => sum + (p.quantity || 1), 0) ?? 0;
  const totalPrice =
    cart?.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0) ?? 0;
  const totalPriceFixed = totalPrice.toFixed(2);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenOrderModal = () => setIsOrderModalOpen(true);
  const handleCloseOrderModal = () => setIsOrderModalOpen(false);

  return (
    <main>
      <section className="section">
        <div className={`${styles["product-page"]} container`}>
          {/* Лоадер */}
          {loading ? (
            <Loader />
          ) : totalItems > 0 ? (
            <ul className={styles.products}>
              {cart.map((product) => (
                <li key={product.id} className={styles["products__item"]}>
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={300}
                    height={300}
                    className={styles["products__image"]}
                    priority={true}
                  />
                  <p className={styles["products__title"]}>{product.title}</p>
                  <p className={styles["products__brand"]}>
                    <span className={styles["products__brand--bold"]}>
                      Бренд:
                    </span>{" "}
                    Chic Cosmetics
                  </p>
                  <p className={styles["products__category"]}>
                    Категорія: beauty
                  </p>
                  <p className={styles["products__price"]}>{product.price} $</p>

                  <button
                    className={styles["btn-cart"]}
                    onClick={() => removeFromCart(product.id)}
                  >
                    Видалити з кошика
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div
              className={`${styles["not-found"]} ${styles["not-found--visible"]}`}
            >
              <div className={styles["not-found__icon"]}>
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
              <h2 className={styles["not-found__title"]}>Кошик порожній</h2>
              <p className={styles["not-found__description"]}>
                Дякуємо, що завітали до нашого магазину!
                <br />
                Перегляньте наші пропозиції та знайдіть те, що вам сподобається!
              </p>
            </div>
          )}

          {/* Сайдбар */}
          <aside className={styles.sidebar}>
            <div className={styles["cart-summary"]}>
              <div className={styles["cart-summary__inner"]}>
                <h2 className={styles["cart-summary__title"]}>
                  Ваше замовлення
                </h2>
                <ul className={styles["cart-summary__list"]}>
                  {cart.map((product) => (
                    <li
                      key={product.id}
                      className={styles["cart-summary__item"]}
                    >
                      <span className={styles["cart-summary__label"]}>
                        {product.title}:
                      </span>
                      <div className={styles["cart-summary__value-wrapper"]}>
                        <button
                          className={styles["quantity-btn"]}
                          onClick={() => decreaseQuantity(product.id)}
                        >
                          −
                        </button>
                        <span className={styles["cart-summary__value"]}>
                          {product.quantity}
                        </span>
                        <button
                          className={styles["quantity-btn"]}
                          onClick={() => increaseQuantity(product.id)}
                        >
                          +
                        </button>
                      </div>
                    </li>
                  ))}

                  {/* ✅ сума оновлюється динамічно */}
                  <li className={styles["cart-summary__item"]}>
                    <span className={styles["cart-summary__label"]}>
                      Всього до сплати:
                    </span>
                    <span className={styles["cart-summary__value"]}>
                      {totalPriceFixed} грн.
                    </span>
                  </li>

                  <li className={styles["cart-summary__item"]}>
                    <span className={styles["cart-summary__label"]}>
                      Доставка:
                    </span>
                    <span className={styles["cart-summary__value"]}>
                      35 грн/км
                    </span>
                  </li>
                </ul>

                {cart.length > 0 && (
                  <>
                    <button
                      className={styles["cart-summary__btn"]}
                      onClick={handleOpenOrderModal}
                    >
                      Оформити замовлення
                    </button>
                    <button
                      onClick={clearCart}
                      className={`${styles["cart-summary__btn"]} ${styles["cart-summary__btn--clear"]}`}
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

      {/* Модальне вікно */}
      {isOrderModalOpen && (
        <OrderModal
          isOpen={isOrderModalOpen}
          onClose={handleCloseOrderModal}
          onConfirm={clearCart}
        />
      )}
    </main>
  );
}
