'use client';

import { useState } from 'react';
import styles from './OrderModal.module.css';
import 'izitoast/dist/css/iziToast.min.css';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function OrderModal({
  isOpen,
  onClose,
  onConfirm,
}: OrderModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

    onConfirm(); // викликаємо clearCart() з батьківського компонента
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          &times;
        </button>
        <h2>Оформлення замовлення</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Ім&apos;я
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </label>
          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Телефон
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
          </label>
          <label>
            Адреса
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
