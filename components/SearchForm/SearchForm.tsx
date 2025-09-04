'use client';

import { useRef } from 'react';
import styles from './SearchForm.module.css';

interface Props {
  action: (formData: FormData) => void;
}

export default function SearchForm({ action }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      action(new FormData()); // Очищаємо пошук
    }
  };

  return (
    <form
      className={styles['search-form']}
      action={async (formData: FormData) => {
        await action(formData);
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
        type="button"
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
