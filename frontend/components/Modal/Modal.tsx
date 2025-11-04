// components/Modal/Modal.tsx

"use client";

import { useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import type { Product } from "@/types/product";
import styles from "./Modal.module.css";
import ProductActions from "@/components/ProductActions/ProductActions";

interface ModalProps {
  product: Product;
  onClose: () => void;
}

export default function Modal({ product, onClose }: ModalProps) {
  // Закриття модалки по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return ReactDOM.createPortal(
    <div
      className={`${styles.modal} ${styles["modal--is-open"]}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.modal__closeBtn}
          onClick={onClose}
          type="button"
          aria-label="Закрити"
        ></button>

        <div className={styles.modalProduct}>
          <div className={styles.modalProduct__img}>
            <Image
              src={product.thumbnail}
              alt={product.description || product.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className={styles.modalProduct__content}>
            <h2 id="modal-title" className={styles.modalProduct__title}>
              {product.title}
            </h2>
            <ul className={styles.modalProduct__tags}>
              <li className={styles.modalProduct__tag}>{product.category}</li>
              <li className={styles.modalProduct__tag}>{product.brand}</li>
            </ul>
            <p className={styles.modalProduct__description}>
              {product.description}
            </p>
            <p className={styles.modalProduct__shippingInformation}>
              Доставка: Доставка на адресу замовника
            </p>
            <p className={styles.modalProduct__returnPolicy}>
              Політика повернення: Повернення протягом 14 днів
            </p>
            <p className={styles.modalProduct__price}>
              Ціна: {product.price} грн.
            </p>
            <button className={styles.modalProduct__buyBtn} type="button">
              Купити
            </button>
            <ProductActions product={product} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
