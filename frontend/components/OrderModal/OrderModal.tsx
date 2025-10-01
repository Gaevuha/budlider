'use client';

import { useState } from 'react';
import styles from './OrderModal.module.css';
import 'izitoast/dist/css/iziToast.min.css';

interface Props {
  onClose: () => void;
  clearCart: () => void;
  totalPrice: number;
}

export default function OrderModal({ onClose, clearCart, totalPrice }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const iziToast = (await import('izitoast')).default;

    iziToast.success({
      title: 'Успіх!',
      message: 'Ваше замовлення успішно оформлено. Чекайте на дзвінок',
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
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        <h2>Оформлення замовлення</h2>
        <p>Сума до оплати: {totalPrice.toFixed(2)} грн</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Ім'я:
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </label>
          <label>
            E-mail:
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Телефон:
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </label>
          <label>
            Адреса:
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
          </label>
          <button type="submit" className={styles.submitBtn}>
            Підтвердити замовлення
          </button>
        </form>
      </div>
    </div>
  );
}
