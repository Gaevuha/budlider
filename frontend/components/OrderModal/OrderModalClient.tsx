"use client";

import styles from "./OrderModal.module.css";
import { submitOrder } from "./Order";
import { useTransition } from "react";
import "izitoast/dist/css/iziToast.min.css";
import { FaEnvelope, FaPhone, FaUser, FaHome } from "react-icons/fa";

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
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  async function handleAction(formData: FormData) {
    const result = await submitOrder(formData);

    if (result.success) {
      const iziToast = (await import("izitoast")).default;
      iziToast.success({
        title: "Успіх!",
        message: "Ваше замовлення успішно відправлено. Чекайте на дзвінок",
        position: "topCenter",
        timeout: 3000,
        backgroundColor: "#28a745",
        messageColor: "#fff",
        titleColor: "#fff",
      });

      onConfirm(); // очищення кошика
      onClose(); // закрити модалку
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          &times;
        </button>
        <h2>Оформлення замовлення</h2>

        <form
          action={(formData) => startTransition(() => handleAction(formData))}
          className={styles.form}
        >
          <label className={styles.inputWrapper}>
            <FaUser className={styles.icon} />
            <input type="text" name="name" placeholder="Ім'я" required />
          </label>

          <label className={styles.inputWrapper}>
            <FaEnvelope className={styles.icon} />
            <input type="email" name="email" placeholder="E-mail" required />
          </label>

          <label className={styles.inputWrapper}>
            <FaPhone className={styles.icon} />
            <input type="tel" name="phone" placeholder="Телефон" required />
          </label>

          <label className={styles.inputWrapper}>
            <FaHome className={styles.icon} />
            <input type="text" name="address" placeholder="Адреса" required />
          </label>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isPending}
          >
            {isPending ? "Відправка..." : "Підтвердити замовлення"}
          </button>
        </form>
      </div>
    </div>
  );
}
