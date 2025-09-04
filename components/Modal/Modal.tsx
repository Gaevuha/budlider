import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import type { Product } from '../../types/product';
import styles from './Modal.module.css';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist'; // якщо будеш реалізовувати Wishlist

interface ModalProps {
  product: Product;
  onClose: () => void;
}

export default function Modal({ product, onClose }: ModalProps) {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist(); // для Wishlist
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  // Слідкуємо за станом кошика
  useEffect(() => {
    setInCart(isInCart(product.id));
  }, [isInCart, product.id]);

  // Слідкуємо за станом wishlist
  useEffect(() => {
    setInWishlist(isInWishlist(product.id));
  }, [isInWishlist, product.id]);

  // Обробка клавіші Escape для закриття модального вікна
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // Обробка кнопки додавання/видалення товару в кошик
  const handleCartClick = () => {
    if (inCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
    setInCart(!inCart);
  };

  // Обробка кнопки додавання/видалення товару у wishlist
  const handleWishlistClick = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
    setInWishlist(!inWishlist);
  };

  return ReactDOM.createPortal(
    <div
      className={`${styles.modal} ${styles['modal--is-open']}`}
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
          <img
            className={styles.modalProduct__img}
            src={product.thumbnail}
            alt={product.description}
          />
          <div className={styles.modalProduct__content}>
            <h2 id="modal-title" className={styles.modalProduct__title}>{product.title}</h2>
            <ul className={styles.modalProduct__tags}>
              <li className={styles.modalProduct__tag}>{product.category}</li>
              <li className={styles.modalProduct__tag}>{product.brand}</li>
            </ul>
            <p className={styles.modalProduct__description}>{product.description}</p>
            <p className={styles.modalProduct__shippingInformation}>Shipping: Ships overnight</p>
            <p className={styles.modalProduct__returnPolicy}>Return Policy: No return policy</p>
            <p className={styles.modalProduct__price}>Price: {product.price} $</p>
            <button className={styles.modalProduct__buyBtn} type="button">
              Купити
            </button>
          </div>
        </div>

        <div className={styles.modalProduct__actions}>
          <button
            className={`${styles.modalProduct__btn} ${styles['modalProduct__btn--wishlist']}`}
            type="button"
            onClick={handleWishlistClick}
          >
            {inWishlist ? 'Видалити з побажань' : 'Додати до побажань'}
          </button>
          <button
            className={`${styles.modalProduct__btn} ${styles['modalProduct__btn--cart']}`}
            type="button"
            onClick={handleCartClick}
          >
            {inCart ? 'Видалити з кошика' : 'Додати до кошика'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
