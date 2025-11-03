"use client";

// app/wishlist/WishlistClient.tsx

import Image from "next/image";
import styles from "./WishlistPage.module.css";
import { useWishlistContext } from "@/hooks/useWishlistContext";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader/Loader";

export default function WishlistClient() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlistContext();
  const { addToCart, isInCart } = useCart(); // підключаємо CartContext
  const [loading, setLoading] = useState(true);

  // імітуємо завантаження
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <main>
      <section className="section">
        <div className="container">
          {wishlist.length === 0 ? (
            <div
              className={`${styles.notFound} ${styles["notFound--visible"]}`}
            >
              <div className={styles.notFoundIcon}>
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
              <h2 className={styles.notFoundTitle}>Список бажань порожній</h2>
              <p className={styles.notFoundDescription}>
                Дякуємо, що завітали до нашого магазину! <br />
                Перегляньте наші пропозиції та знайдіть те, що вам сподобається!
              </p>
            </div>
          ) : (
            <>
              <ul className={styles.wishlist}>
                {wishlist.map((product) => (
                  <li key={product.id} className={styles.productsItem}>
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={300}
                      height={300}
                      style={{
                        width: "300px",
                        height: "auto",
                        objectFit: "contain",
                      }}
                      className={styles.productsImage}
                      priority
                    />
                    <p className={styles.productsTitle}>{product.title}</p>
                    <p className={styles.productsBrand}>
                      <span className={styles.productsBrandBold}>Бренд:</span>{" "}
                      {product.brand}
                    </p>
                    <p className={styles.productsCategory}>
                      Категорія: {product.category}
                    </p>
                    <p className={styles.productsPrice}>{product.price} $</p>

                    <div className={styles["wishlist-btn-item"]}>
                      <button
                        className={styles["btn-cart"]}
                        onClick={() => removeFromWishlist(product.id)}
                      >
                        Видалити з побажань
                      </button>

                      <button
                        className={styles["btn-cart"]}
                        onClick={() => addToCart(product)}
                        disabled={isInCart(product.id)}
                      >
                        {isInCart(product.id) ? "У кошику" : "Додати до кошика"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <button className={styles["btn-cart"]} onClick={clearWishlist}>
                  Очистити список бажань
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
