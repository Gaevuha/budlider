'use client';

import { useRef } from 'react';
import styles from './SearchForm.module.css';

interface Props {
  action: (formData: FormData) => void; // Next.js action
}

export default function SearchForm({ action }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // блокуємо спливання
    if (inputRef.current) {
      inputRef.current.value = '';
      // НЕ викликаємо action при очищенні
    }
  };

  return (
    <form
      className={styles['search-form']}
      action={async (formData: FormData) => {
        await action(formData); // викликаємо тільки при сабміті
      }}
    >
      <input
        ref={inputRef}
        className={styles['search-form__input']}
        type="text"
        name="searchValue"
        placeholder="Введіть назву товару"
      />
      <button
        type="button" // важливо, щоб не був submit
        className={styles['search-form__btn-clear']}
        onClick={handleClear}
        aria-label="Очистити пошук"
      >
        ×
      </button>
      <button type="submit" className={styles['search-form__btn']}>
        Пошук
      </button>
    </form>
  );
}
